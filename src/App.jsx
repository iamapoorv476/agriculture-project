import React, { useState, useEffect } from 'react';

// Mock Data - This will be replaced by data from Firebase
const mockSchemes = [
    { id: 1, title: 'PM-KISAN Scheme Update', description: 'Increased financial aid and easier application process for farmers.', imageUrl: 'https://placehold.co/400x250/34D399/FFFFFF?text=Scheme+1', link: '#', bgColor: 'bg-teal-500 hover:bg-teal-600' },
    { id: 2, title: 'National Horticulture Mission', description: 'New subsidies for modern horticultural practices.', imageUrl: 'https://placehold.co/400x250/60A5FA/FFFFFF?text=Scheme+2', link: '#', bgColor: 'bg-blue-500 hover:bg-blue-600' },
    { id: 3, title: 'Soil Health Card Scheme', description: 'Free soil testing and recommendations for better yield.', imageUrl: 'https://placehold.co/400x250/FBBF24/FFFFFF?text=Scheme+3', link: '#', bgColor: 'bg-amber-500 hover:bg-amber-600' },
];

const mockSeeds = [
    { id: 1, name: 'Drought-Resistant Wheat', description: 'A new variety of wheat that requires 30% less water and offers a higher yield in arid conditions.', imageUrl: 'https://placehold.co/400x250/F59E0B/FFFFFF?text=Wheat+Seed', link: '#' },
    { id: 2, name: 'Fortified Rice Strain', description: 'Genetically enhanced rice with added vitamins and minerals to combat malnutrition.', imageUrl: 'https://placehold.co/400x250/10B981/FFFFFF?text=Rice+Paddy', link: '#' },
    { id: 3, name: 'Pest-Resistant Soybean', description: 'This soybean variant has natural resistance to common pests, reducing the need for pesticides.', imageUrl: 'https://placehold.co/400x250/8B5CF6/FFFFFF?text=Soybean', link: '#' },
];

const mockEvents = [
    { id: 1, title: 'Webinar: Modern Irrigation Techniques', date: 'August 5, 2025', link: '#' },
    { id: 2, title: 'Workshop: Organic Farming Certification', date: 'August 20, 2025', link: '#' },
    { id: 3, title: 'Live Q&A with Agriculture Experts', date: 'September 1, 2025', link: '#' },
];

// Modal Component for displaying AI response
const AiHelperModal = ({ title, content, isLoading, onClose }) => {
    if (!title) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
                <div className="p-4 border-b flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
                </div>
                <div className="p-6 overflow-y-auto">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center h-48">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-600"></div>
                            <p className="mt-4 text-gray-600">✨ Our AI is thinking...</p>
                        </div>
                    ) : (
                        <p className="text-gray-700 whitespace-pre-wrap">{content}</p>
                    )}
                </div>
                 <div className="p-4 border-t text-right">
                    <button onClick={onClose} className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition duration-300">Close</button>
                </div>
            </div>
        </div>
    );
};

// New Scheme Card component to match the screenshot
const SchemeCard = ({ title, description, link, bgColor, onAiHelpClick }) => (
    <div className={`rounded-lg shadow-lg text-white p-6 flex flex-col justify-between transform hover:-translate-y-1 transition-all duration-300 ${bgColor}`}>
        <div>
            <h3 className="text-2xl font-bold mb-4">{title}</h3>
            <p className="text-white/90 mb-4">{description}</p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2 items-center justify-between">
            <a href={link} className="font-semibold hover:underline text-sm">Learn More →</a>
            <button
                onClick={() => onAiHelpClick(title, description)}
                className="bg-white/20 text-white px-3 py-1 rounded-full hover:bg-white/30 transition duration-300 text-xs font-semibold"
            >
                ✨ Explain Scheme
            </button>
        </div>
    </div>
);

// Reusable Card Component for Seeds
const InfoCard = ({ imageUrl, title, description, link, linkText, onAiHelpClick, aiHelpType }) => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 flex flex-col">
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/400x250/cccccc/FFFFFF?text=Image+Not+Found'; }}/>
        <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
            <p className="text-gray-600 mb-4 flex-grow">{description}</p>
            <div className="mt-auto flex flex-wrap gap-2 items-center justify-between">
                 <a href={link} className="text-green-600 font-semibold hover:underline">
                    {linkText} →
                </a>
                <button 
                    onClick={() => onAiHelpClick(title, description)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300 text-sm font-semibold"
                >
                    ✨ {aiHelpType === 'scheme' ? 'Explain Scheme' : 'Get AI Advice'}
                </button>
            </div>
        </div>
    </div>
);

// Navigation Component
const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-green-700 flex items-center">
                        <span className="mr-2">🌱</span>Farmer's Hub
                    </div>
                    <div className="hidden md:flex items-center space-x-6">
                        <a href="#home" className="text-gray-600 hover:text-green-700 transition duration-300">Home</a>
                        <a href="#schemes" className="text-gray-600 hover:text-green-700 transition duration-300">New Schemes</a>
                        <a href="#seeds" className="text-gray-600 hover:text-green-700 transition duration-300">Seed Info</a>
                        <a href="#forum" className="text-gray-600 hover:text-green-700 transition duration-300">Community</a>
                        <a href="#contact" className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition duration-300">Contact Us</a>
                    </div>
                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 focus:outline-none">
                            <span className="text-2xl">☰</span>
                        </button>
                    </div>
                </div>
            </div>
            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden border-t">
                    <a href="#home" className="block py-2 px-4 text-sm text-gray-600 hover:bg-green-50">Home</a>
                    <a href="#schemes" className="block py-2 px-4 text-sm text-gray-600 hover:bg-green-50">New Schemes</a>
                    <a href="#seeds" className="block py-2 px-4 text-sm text-gray-600 hover:bg-green-50">Seed Info</a>
                    <a href="#forum" className="block py-2 px-4 text-sm text-gray-600 hover:bg-green-50">Community</a>
                    <a href="#contact" className="block py-2 px-4 text-sm text-white bg-green-600">Contact Us</a>
                </div>
            )}
        </nav>
    );
};

// Hero Section Component
const Hero = () => (
    <header id="home" className="relative text-white min-h-[500px] flex items-center">
        <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ 
                backgroundImage: "linear-gradient(135deg, #2d5a27 0%, #4a7c59 50%, #2d5a27 100%)"
            }}
        ></div>
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="container mx-auto px-6 py-24 text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">Empowering Farmers with Knowledge</h1>
            <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-3xl mx-auto">Your one-stop dashboard for the latest government schemes, advanced seed technologies, and community support.</p>
            <a href="#schemes" className="inline-block bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-700 transition duration-300">Explore Schemes</a>
        </div>
    </header>
);

// Schemes Section Component
const SchemesSection = ({ schemes, onAiHelpClick }) => (
    <section id="schemes" className="mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Latest Government Schemes</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {schemes.map(scheme => (
                <SchemeCard 
                    key={scheme.id} 
                    title={scheme.title} 
                    description={scheme.description} 
                    link={scheme.link} 
                    bgColor={scheme.bgColor} 
                    onAiHelpClick={onAiHelpClick} 
                />
            ))}
        </div>
    </section>
);

// Seeds Section Component
const SeedsSection = ({ seeds, onAiHelpClick }) => (
    <section id="seeds" className="mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Discover New Seed Varieties</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {seeds.map(seed => (
                <InfoCard key={seed.id} imageUrl={seed.imageUrl} title={seed.name} description={seed.description} link={seed.link} linkText="View Details" onAiHelpClick={onAiHelpClick} aiHelpType="seed"/>
            ))}
        </div>
    </section>
);

// Community Forum Section
const CommunityForum = () => (
    <section id="forum" className="mb-16 bg-green-100 rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Join the Community Forum</h2>
        <p className="text-gray-700 mb-6 max-w-2xl mx-auto">Connect with fellow farmers, share your experiences, ask questions, and learn from the community. Your knowledge can help others succeed.</p>
        <a href="#" className="inline-block bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition duration-300">Start a Discussion</a>
    </section>
);

// Events Section Component
const EventsSection = ({ events }) => (
    <section id="events" className="mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Upcoming Events & Webinars</h2>
        <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="space-y-4">
                {events.map(event => (
                    <div key={event.id} className="flex flex-col sm:flex-row items-center justify-between p-4 border-b last:border-b-0">
                        <div className="text-left">
                            <p className="font-semibold text-lg text-gray-800">{event.title}</p>
                            <p className="text-gray-500">📅 {event.date}</p>
                        </div>
                        <a href={event.link} className="mt-4 sm:mt-0 bg-gray-200 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-300 transition duration-300">Register Now</a>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

// Footer Component
const Footer = () => (
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
                    <p className="text-gray-400 mb-2">📍 Kothri Kalan, MP, India</p>
                    <p className="text-gray-400 mb-2">📞 +91 12345 67890</p>
                    <p className="text-gray-400">✉️ info@farmershub.gov</p>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
                    <div className="flex space-x-4">
                        <a href="#" className="text-gray-400 hover:text-white">📘</a>
                        <a href="#" className="text-gray-400 hover:text-white">🐦</a>
                        <a href="#" className="text-gray-400 hover:text-white">📺</a>
                        <a href="#" className="text-gray-400 hover:text-white">💬</a>
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500">
                <p>&copy; 2025 Farmer's Knowledge Hub. All Rights Reserved.</p>
            </div>
        </div>
    </footer>
);

// Main App Component
export default function App() {
    const [schemes, setSchemes] = useState([]);
    const [seeds, setSeeds] = useState([]);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    const [modalState, setModalState] = useState({ title: null, content: '', isLoading: false });

    // Function to simulate AI help (since we can't use external APIs in artifacts)
    const getAiHelp = async (title, description, type) => {
        let modalTitle;
        let simulatedResponse;

        if (type === 'scheme') {
            modalTitle = `✨ AI Explanation for: ${title}`;
            simulatedResponse = `Here's a detailed explanation of ${title}:

Key Benefits:
• ${description}
• Direct financial support for eligible farmers
• Simplified application process through online portal

Eligibility:
• Valid Aadhaar card required
• Agricultural land ownership documents
• Bank account linked to Aadhaar

How to Apply:
1. Visit the official government portal
2. Fill out the application form
3. Upload required documents
4. Submit and track application status

This scheme is particularly beneficial for farmers in Madhya Pradesh as it addresses local agricultural challenges and provides much-needed financial support.`;
        } else {
            modalTitle = `✨ AI Advisor for: ${title}`;
            simulatedResponse = `Agricultural advice for ${title}:

Suitability for Madhya Pradesh:
• ${description}
• Well-suited for the local climate conditions
• Compatible with existing farming practices in the region

Benefits:
• Higher yield potential
• Better resistance to local pests and diseases
• Reduced input costs

Best Practices:
• Plant during optimal season (consult local agricultural officer)
• Follow recommended spacing and fertilizer schedule
• Monitor for early signs of stress or disease

Recommendation: This seed variety is highly recommended for farmers in your region based on climate compatibility and yield potential.`;
        }

        setModalState({ title: modalTitle, content: '', isLoading: true });

        // Simulate API delay
        setTimeout(() => {
            setModalState({ title: modalTitle, content: simulatedResponse, isLoading: false });
        }, 2000);
    };

    useEffect(() => {
        // Simulate loading delay
        setTimeout(() => {
            setSchemes(mockSchemes);
            setSeeds(mockSeeds);
            setEvents(mockEvents);
            setLoading(false);
        }, 500);
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-600 mx-auto mb-4"></div>
                    <div className="text-2xl text-gray-700">Loading Farmer's Hub...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <Hero />
            <main className="container mx-auto px-6 py-12">
                <SchemesSection schemes={schemes} onAiHelpClick={(title, desc) => getAiHelp(title, desc, 'scheme')} />
                <SeedsSection seeds={seeds} onAiHelpClick={(title, desc) => getAiHelp(title, desc, 'seed')} />
                <CommunityForum />
                <EventsSection events={events} />
            </main>
            <Footer />
            <AiHelperModal 
                title={modalState.title}
                content={modalState.content}
                isLoading={modalState.isLoading}
                onClose={() => setModalState({ title: null, content: '', isLoading: false })}
            />
        </div>
    );
}