import React, { useState, useEffect } from 'react';
import { db } from './firebase'; 
import { collection, getDocs } from 'firebase/firestore';

// Import Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AiHelperModal from './components/AiHelperModal';

// Import Pages
import HomePage from './pages/HomePage';
import SchemesPage from './pages/SchemesPage';
import SeedsPage from './pages/SeedsPage';
import CommunityPage from './pages/CommunityPage';
import EventsPage from './pages/EventsPage';


export default function App() {
    const [page, setPage] = useState('home');
    const [schemes, setSchemes] = useState([]);
    const [seeds, setSeeds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalState, setModalState] = useState({ title: null, content: '', isLoading: false });

    const getAiHelp = async (title, description, type) => {
        let prompt;
        let modalTitle;

        if (type === 'scheme') {
            prompt = `Explain the government scheme "${title}" with the description "${description}" in simple terms for a farmer in Madhya Pradesh, India. Focus on the key benefits, eligibility, and how to apply. Format the response clearly with headings.`;
            modalTitle = `✨ AI Explanation for: ${title}`;
        } else {
            prompt = `I am a farmer in Madhya Pradesh, India. Please provide advice about the seed variety "${title}" which is described as "${description}". Is this a good choice for my region? What are the benefits, potential risks, and best practices for planting this seed here?`;
            modalTitle = `✨ AI Advisor for: ${title}`;
        }

        setModalState({ title: modalTitle, content: '', isLoading: true });

        try {
            const chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
            const payload = { contents: chatHistory };
            const apiKey = "";
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error(`API call failed with status: ${response.status}`);
            
            const result = await response.json();
            
            if (result.candidates && result.candidates[0]?.content.parts[0]) {
                const text = result.candidates[0].content.parts[0].text;
                setModalState({ title: modalTitle, content: text, isLoading: false });
            } else {
                throw new Error("Invalid response structure from API.");
            }
        } catch (error) {
            console.error("Error calling Gemini API:", error);
            setModalState({ title: modalTitle, content: `Sorry, we couldn't get advice from our AI assistant at the moment. Please try again later.\n\nError: ${error.message}`, isLoading: false });
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const seedsCollectionRef = collection(db, 'seeds');
                const seedsSnapshot = await getDocs(seedsCollectionRef);
                const seedsList = seedsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setSeeds(seedsList);

                const schemesCollectionRef = collection(db, 'schemes');
                const schemesSnapshot = await getDocs(schemesCollectionRef);
                const schemesList = schemesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setSchemes(schemesList);
            } catch (error) {
                console.error("Error fetching data from Firestore: ", error);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    const renderPage = () => {
        switch (page) {
            case 'home':
                return <HomePage />;
            case 'schemes':
                return <SchemesPage schemes={schemes} onAiHelpClick={getAiHelp} />;
            case 'seeds':
                return <SeedsPage seeds={seeds} onAiHelpClick={getAiHelp} />;
            case 'community':
                return <CommunityPage />;
            case 'events':
                return <EventsPage />;
            default:
                return <HomePage />;
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen"><div className="text-2xl">Loading...</div></div>;
    }

    return (
        <div className="bg-gray-50 flex flex-col min-h-screen">
            <Navbar setPage={setPage} />
            <main className="flex-grow">
                {renderPage()}
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
