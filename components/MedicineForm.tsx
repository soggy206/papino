
import React, { useState, useEffect } from 'react';
import { Medicine } from '../types';
import Button from './Button';

interface MedicineFormProps {
    medicine: Medicine | null;
    onSave: (medicine: Medicine) => void;
    onCancel: () => void;
}

const MedicineForm: React.FC<MedicineFormProps> = ({ medicine, onSave, onCancel }) => {
    const [formData, setFormData] = useState<Omit<Medicine, 'id'>>({
        name: '',
        genericName: '',
        strength: '',
        manufacturer: '',
        category: '',
        quantity: 0,
        expiryDate: '',
    });

    useEffect(() => {
        if (medicine) {
            setFormData(medicine);
        } else {
            setFormData({
                name: '', genericName: '', strength: '', manufacturer: '', category: '', quantity: 0, expiryDate: ''
            });
        }
    }, [medicine]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? parseInt(value, 10) || 0 : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ ...formData, id: medicine?.id || '' });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">{medicine ? 'Edit Medicine' : 'Add New Medicine'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Medicine Name</label>
                    <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
                </div>
                 <div>
                    <label htmlFor="genericName" className="block text-sm font-medium text-gray-700">Generic Name</label>
                    <input type="text" name="genericName" id="genericName" value={formData.genericName} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
                </div>
                 <div>
                    <label htmlFor="strength" className="block text-sm font-medium text-gray-700">Strength</label>
                    <input type="text" name="strength" id="strength" value={formData.strength} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
                </div>
                 <div>
                    <label htmlFor="manufacturer" className="block text-sm font-medium text-gray-700">Manufacturer</label>
                    <input type="text" name="manufacturer" id="manufacturer" value={formData.manufacturer} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
                </div>
                 <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                    <input type="text" name="category" id="category" value={formData.category} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
                </div>
                <div>
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
                    <input type="number" name="quantity" id="quantity" value={formData.quantity} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
                </div>
                 <div className="md:col-span-2">
                    <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">Expiry Date</label>
                    <input type="date" name="expiryDate" id="expiryDate" value={formData.expiryDate} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
                </div>
            </div>
            <div className="flex justify-end gap-4 pt-4">
                <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
                <Button type="submit">{medicine ? 'Save Changes' : 'Add Medicine'}</Button>
            </div>
        </form>
    );
};

export default MedicineForm;
