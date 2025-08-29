
import React, { useState, useMemo } from 'react';
import { Medicine } from '../types';
import { EditIcon } from './icons/EditIcon';
import { TrashIcon } from './icons/TrashIcon';
import { SortIcon } from './icons/SortIcon';

interface MedicineTableProps {
    medicines: Medicine[];
    onEdit: (medicine: Medicine) => void;
    onDelete: (id: string) => void;
}

type SortKey = keyof Medicine;
type SortOrder = 'asc' | 'desc';

const MedicineTable: React.FC<MedicineTableProps> = ({ medicines, onEdit, onDelete }) => {
    const [sortKey, setSortKey] = useState<SortKey>('name');
    const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

    const handleSort = (key: SortKey) => {
        if (sortKey === key) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortOrder('asc');
        }
    };
    
    const sortedMedicines = useMemo(() => {
        return [...medicines].sort((a, b) => {
            const valA = a[sortKey];
            const valB = b[sortKey];

            if (valA < valB) {
                return sortOrder === 'asc' ? -1 : 1;
            }
            if (valA > valB) {
                return sortOrder === 'asc' ? 1 : -1;
            }
            return 0;
        });
    }, [medicines, sortKey, sortOrder]);

    const headers: { key: SortKey; label: string }[] = [
        { key: 'name', label: 'Medicine Name' },
        { key: 'genericName', label: 'Generic Name' },
        { key: 'strength', label: 'Strength' },
        { key: 'manufacturer', label: 'Manufacturer' },
        { key: 'quantity', label: 'Quantity' },
        { key: 'expiryDate', label: 'Expiry Date' },
    ];
    
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead className="bg-gray-100">
                    <tr>
                        {headers.map(header => (
                             <th key={header.key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort(header.key)}>
                                <div className="flex items-center gap-2">
                                  {header.label}
                                  {sortKey === header.key && <SortIcon order={sortOrder} />}
                                </div>
                            </th>
                        ))}
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {sortedMedicines.length > 0 ? (
                        sortedMedicines.map(med => (
                            <tr key={med.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{med.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{med.genericName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{med.strength}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{med.manufacturer}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{med.quantity}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{med.expiryDate}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex items-center gap-4">
                                        <button onClick={() => onEdit(med)} className="text-blue-600 hover:text-blue-800 transition-colors"><EditIcon /></button>
                                        <button onClick={() => onDelete(med.id)} className="text-red-600 hover:text-red-800 transition-colors"><TrashIcon /></button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7} className="text-center py-10 text-gray-500">
                                No medicines found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default MedicineTable;
