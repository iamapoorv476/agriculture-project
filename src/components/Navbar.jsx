import React, { useState } from 'react';

export default function Navbar({ setPage }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleNavClick = (pageName) => {
        setPage(pageName);
        setIsMenuOpen(false); // Close mobile menu on click
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <button onClick={() => handleNavClick('home')} className="text-2xl font-bold text-green-700">
                        <i className="fas fa-seedling mr-2"></i>Farmer's Hub
                    </button>
                    <div className="hidden md:flex items-center space-x-6">
                        <button onClick={() => handleNavClick('home')} className="text-gray-600 hover:text-green-700 transition duration-300">Home</button>
                        <button onClick={() => handleNavClick('schemes')} className="text-gray-600 hover:text-green-700 transition duration-300">New Schemes</button>
                        <button onClick={() => handleNavClick('seeds')} className="text-gray-600 hover:text-green-700 transition duration-300">Seed Info</button>
                        <button onClick={() => handleNavClick('community')} className="text-gray-600 hover:text-green-700 transition duration-300">Community</button>
                        <button onClick={() => handleNavClick('events')} className="text-gray-600 hover:text-green-700 transition duration-300">Events</button>
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
                <button onClick={() => handleNavClick('home')} className="block w-full text-left py-2 px-4 text-sm text-gray-600 hover:bg-green-50">Home</button>
                <button onClick={() => handleNavClick('schemes')} className="block w-full text-left py-2 px-4 text-sm text-gray-600 hover:bg-green-50">New Schemes</button>
                <button onClick={() => handleNavClick('seeds')} className="block w-full text-left py-2 px-4 text-sm text-gray-600 hover:bg-green-50">Seed Info</button>
                <button onClick={() => handleNavClick('community')} className="block w-full text-left py-2 px-4 text-sm text-gray-600 hover:bg-green-50">Community</button>
                <button onClick={() => handleNavClick('events')} className="block w-full text-left py-2 px-4 text-sm text-gray-600 hover:bg-green-50">Events</button>
            </div>
        </nav>
    );
};
