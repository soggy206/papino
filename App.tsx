
import React, { useState, useMemo, useCallback } from 'react';
import { Medicine } from './types';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import MedicineTable from './components/MedicineTable';
import Button from './components/Button';
import Modal from './components/Modal';
import MedicineForm from './components/MedicineForm';
import { PlusIcon } from './components/icons/PlusIcon';
import Pagination from './components/Pagination';
import { useDebounce } from './hooks/useDebounce';

// Mock Data
const initialMedicines: Medicine[] = [
    { id: 'NDC-12345-001', name: 'Atorvastatin', genericName: 'Atorvastatin', strength: '20mg', manufacturer: 'Pfizer', category: 'Cholesterol', quantity: 150, expiryDate: '2025-12-31' },
    { id: 'NDC-54321-002', name: 'Lisinopril', genericName: 'Lisinopril', strength: '10mg', manufacturer: 'Merck', category: 'Blood Pressure', quantity: 200, expiryDate: '2026-06-30' },
    { id: 'NDC-67890-003', name: 'Metformin', genericName: 'Metformin', strength: '500mg', manufacturer: 'Bristol Myers Squibb', category: 'Diabetes', quantity: 80, expiryDate: '2024-11-30' },
    { id: 'NDC-09876-004', name: 'Amoxicillin', genericName: 'Amoxicillin', strength: '250mg', manufacturer: 'GSK', category: 'Antibiotic', quantity: 120, expiryDate: '2025-08-15' },
    { id: 'NDC-11223-005', name: 'Albuterol', genericName: 'Albuterol', strength: '90mcg', manufacturer: 'Teva', category: 'Asthma', quantity: 50, expiryDate: '2024-09-01' },
    { id: 'NDC-44556-006', name: 'Ibuprofen', genericName: 'Ibuprofen', strength: '200mg', manufacturer: 'Johnson & Johnson', category: 'Pain Relief', quantity: 300, expiryDate: '2027-01-20' },
    { id: 'NDC-77889-007', name: 'Omeprazole', genericName: 'Omeprazole', strength: '20mg', manufacturer: 'AstraZeneca', category: 'Acid Reflux', quantity: 95, expiryDate: '2025-05-10' },
    { id: 'NDC-33221-008', name: 'Losartan', genericName: 'Losartan', strength: '50mg', manufacturer: 'Organon', category: 'Blood Pressure', quantity: 110, expiryDate: '2026-02-28' },
    { id: 'NDC-66554-009', name: 'Gabapentin', genericName: 'Gabapentin', strength: '300mg', manufacturer: 'Pfizer', category: 'Neuropathic Pain', quantity: 70, expiryDate: '2024-10-31' },
    { id: 'NDC-99887-010', name: 'Sertraline', genericName: 'Sertraline', strength: '50mg', manufacturer: 'Viatris', category: 'Antidepressant', quantity: 60, expiryDate: '2025-07-22' }
];

const ITEMS_PER_PAGE = 8;

const App: React.FC = () => {
    const [medicines, setMedicines] = useState<Medicine[]>(initialMedicines);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMedicine, setEditingMedicine] = useState<Medicine | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    const filteredMedicines = useMemo(() => {
        return medicines.filter(med =>
            med.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
            med.genericName.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
            med.manufacturer.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
            med.category.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        );
    }, [medicines, debouncedSearchTerm]);

    const paginatedMedicines = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredMedicines.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredMedicines, currentPage]);

    const totalPages = Math.ceil(filteredMedicines.length / ITEMS_PER_PAGE);

    const handleOpenModal = (medicine: Medicine | null = null) => {
        setEditingMedicine(medicine);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingMedicine(null);
    };

    const handleSaveMedicine = (medicine: Medicine) => {
        if (editingMedicine) {
            setMedicines(medicines.map(m => (m.id === medicine.id ? medicine : m)));
        } else {
            setMedicines([...medicines, { ...medicine, id: `NDC-${Date.now()}` }]);
        }
        handleCloseModal();
    };

    const handleDeleteMedicine = useCallback((id: string) => {
        if(window.confirm('Are you sure you want to delete this medicine?')) {
            setMedicines(medicines.filter(m => m.id !== id));
        }
    }, [medicines]);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };
    
    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">
            <Header />
            <main className="container mx-auto p-4 md:p-8">
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                        <h2 className="text-2xl font-bold text-gray-700">Medicine Inventory</h2>
                        <div className="flex items-center gap-4 w-full md:w-auto">
                           <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                            <Button onClick={() => handleOpenModal()} className="flex items-center gap-2">
                                <PlusIcon />
                                Add Medicine
                            </Button>
                        </div>
                    </div>
                    <MedicineTable 
                        medicines={paginatedMedicines} 
                        onEdit={handleOpenModal}
                        onDelete={handleDeleteMedicine}
                    />
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </main>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <MedicineForm
                    medicine={editingMedicine}
                    onSave={handleSaveMedicine}
                    onCancel={handleCloseModal}
                />
            </Modal>
        </div>
    );
};

export default App;
