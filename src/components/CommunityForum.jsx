import React from 'react';

export default function CommunityForum() {
    return (
        <section id="forum" className="mb-16 bg-green-100 rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Join the Community Forum</h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">Connect with fellow farmers, share your experiences, ask questions, and learn from the community. Your knowledge can help others succeed.</p>
            <a href="#" className="bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition duration-300">Start a Discussion</a>
        </section>
    );
};