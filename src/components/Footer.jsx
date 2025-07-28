import React from 'react';

export default function Footer() {
    return (
        <footer id="contact" className="bg-gray-800 text-white">
            <div className="container mx-auto px-6 py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Farmer's Hub</h4>
                        <p className="text-gray-400">Providing timely and accurate information to empower the agricultural community.</p>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul>
                            <li className="mb-2"><a href="#schemes" className="text-gray-400 hover:text-white">Schemes</a></li>
                            <li className="mb-2"><a href="#seeds" className="text-gray-400 hover:text-white">Seeds</a></li>
                            <li className="mb-2"><a href="#forum" className="text-gray-400 hover:text-white">Community</a></li>
                            <li className="mb-2"><a href="#events" className="text-gray-400 hover:text-white">Events</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
                        <p className="text-gray-400 mb-2"><i className="fas fa-map-marker-alt mr-2"></i>Kothri Kalan, MP, India</p>
                        <p className="text-gray-400 mb-2"><i className="fas fa-phone-alt mr-2"></i>+91 12345 67890</p>
                        <p className="text-gray-400"><i className="fas fa-envelope mr-2"></i>info@farmershub.gov</p>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-facebook-f fa-lg"></i></a>
                            <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-twitter fa-lg"></i></a>
                            <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-youtube fa-lg"></i></a>
                            <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-whatsapp fa-lg"></i></a>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500">
                    <p>&copy; 2025 Farmer's Knowledge Hub. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};