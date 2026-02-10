import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AiHelperModal from './components/AiHelperModal';

import HomePage from './pages/HomePage';
import SchemesPage from './pages/SchemesPage';
import SeedsPage from './pages/SeedsPage';
import EventsPage from './pages/EventsPage'; 

export default function App() {
    const [schemes, setSchemes] = useState([]);
    const [seeds, setSeeds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalState, setModalState] = useState({ title: null, content: '', isLoading: false });
    //console.log("Current Key:", import.meta.env.VITE_GEMINI_API_KEY);

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

        // ---------------------------------------------------------
        // 🟢 PASTE YOUR ROW 1 KEY HERE
        // ---------------------------------------------------------
        const apiKey = ""; 

        try {
            if (!apiKey || apiKey === "YOUR_API_KEY_HERE") {
                throw new Error("API Key is missing. Please paste it in App.jsx");
            }

            const chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
            const payload = { contents: chatHistory };
            
            // 🟢 UPDATE: Using 'gemini-2.5-flash' based on your available model list
            const modelName = "gemini-2.5-flash";
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

            console.log(`Connecting to model: ${modelName}`);

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('API Error:', errorData);
                throw new Error(errorData.error?.message || `API Status: ${response.status}`);
            }
            
            const result = await response.json();
            
            if (result.candidates && result.candidates[0]?.content?.parts[0]) {
                const text = result.candidates[0].content.parts[0].text;
                setModalState({ title: modalTitle, content: text, isLoading: false });
            } else {
                throw new Error("AI responded but returned no text.");
            }

        } catch (error) {
            console.error("AI Help Error:", error);
            setModalState({ 
                title: "Connection Error", 
                content: `Something went wrong.\n\n${error.message}`, 
                isLoading: false 
            });
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const seedsSnapshot = await getDocs(collection(db, 'seeds'));
                setSeeds(seedsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

                const schemesSnapshot = await getDocs(collection(db, 'schemes'));
                setSchemes(schemesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-screen"><div className="text-2xl">Loading...</div></div>;
    }

    return (
        <Router>
            <div className="bg-gray-50 flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/schemes" element={<SchemesPage schemes={schemes} onAiHelpClick={getAiHelp} />} />
                        <Route path="/seeds" element={<SeedsPage seeds={seeds} onAiHelpClick={getAiHelp} />} />
                        <Route path="/events" element={<EventsPage />} />
                        <Route path="*" element={<HomePage />} />
                    </Routes>
                </main>
                <Footer />
                <AiHelperModal 
                    title={modalState.title}
                    content={modalState.content}
                    isLoading={modalState.isLoading}
                    onClose={() => setModalState({ title: null, content: '', isLoading: false })}
                />
            </div>
        </Router>
    );
}