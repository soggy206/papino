
import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto px-4 md:px-8 py-4">
                <h1 className="text-3xl font-bold text-blue-600">PharmaSys</h1>
                <p className="text-gray-500">Your Modern Pharmacy Management Solution</p>
            </div>
        </header>
    );
};

export default Header;
