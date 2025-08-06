// Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <Link to="/" className="text-2xl font-bold text-green-700">
                        <i className="fas fa-seedling mr-2"></i>Farmer's Hub
                    </Link>
                    <div className="hidden md:flex items-center space-x-6">
                        <Link to="/" className="text-gray-600 hover:text-green-700 transition duration-300">Home</Link>
                        <Link to="/schemes" className="text-gray-600 hover:text-green-700 transition duration-300">New Schemes</Link>
                        <Link to="/seeds" className="text-gray-600 hover:text-green-700 transition duration-300">Seed Info</Link>
                        
                    </div>
                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 focus:outline-none">
                            <i className="fas fa-bars fa-lg"></i>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
                <Link to="/" onClick={() => setIsMenuOpen(false)} className="block w-full text-left py-2 px-4 text-sm text-gray-600 hover:bg-green-50">Home</Link>
                <Link to="/schemes" onClick={() => setIsMenuOpen(false)} className="block w-full text-left py-2 px-4 text-sm text-gray-600 hover:bg-green-50">New Schemes</Link>
                <Link to="/seeds" onClick={() => setIsMenuOpen(false)} className="block w-full text-left py-2 px-4 text-sm text-gray-600 hover:bg-green-50">Seed Info</Link>
               
            </div>
        </nav>
    );
}
