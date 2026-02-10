import React, { useState, useRef } from 'react';

const SchemeCard = ({ title, description, link, bgColor, onAiHelpClick }) => (
    <div
        className={`rounded-xl shadow-lg text-white p-6 flex flex-col justify-between transform hover:-translate-y-1 transition-all duration-300 h-full ${bgColor}`}
    >
        <div>
            <h3 className="text-xl font-bold mb-3 leading-snug">{title}</h3>
            {description && (
                <p className="text-sm text-white/80 leading-relaxed line-clamp-3">{description}</p>
            )}
        </div>
        <div className="mt-5 flex flex-wrap gap-2 items-center justify-between">
            <a
                href={link}
                className="font-semibold hover:underline text-sm flex items-center gap-1"
            >
                Learn More <span>&rarr;</span>
            </a>
            <button
                onClick={() => onAiHelpClick(title, description)}
                className="bg-white/20 text-white px-3 py-1 rounded-full hover:bg-white/30 transition duration-300 text-xs font-semibold"
            >
                ✨ Explain Scheme
            </button>
        </div>
    </div>
);

export default function SchemesSection({ schemes, onAiHelpClick }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const cardsPerPage = 3; // show 3 at a time (adjust as needed)
    const totalPages = Math.ceil(schemes.length / cardsPerPage);

    const handlePrev = () => {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => Math.min(prev + 1, totalPages - 1));
    };

    const visibleSchemes = schemes.slice(
        currentIndex * cardsPerPage,
        currentIndex * cardsPerPage + cardsPerPage
    );

    return (
        <section id="schemes" className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                Latest Government Schemes
            </h2>

            {/* Carousel wrapper */}
            <div className="relative flex items-center gap-3">

                {/* Left Arrow */}
                <button
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className={`flex-shrink-0 w-10 h-10 rounded-full border-2 flex items-center justify-center shadow-md transition-all duration-200
                        ${currentIndex === 0
                            ? 'border-gray-200 text-gray-300 cursor-not-allowed bg-white'
                            : 'border-green-500 text-green-600 hover:bg-green-500 hover:text-white cursor-pointer bg-white'
                        }`}
                    aria-label="Previous"
                >
                    &#8249;
                </button>

                {/* Cards */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {visibleSchemes.map((scheme) => (
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

                {/* Right Arrow */}
                <button
                    onClick={handleNext}
                    disabled={currentIndex >= totalPages - 1}
                    className={`flex-shrink-0 w-10 h-10 rounded-full border-2 flex items-center justify-center shadow-md transition-all duration-200
                        ${currentIndex >= totalPages - 1
                            ? 'border-gray-200 text-gray-300 cursor-not-allowed bg-white'
                            : 'border-green-500 text-green-600 hover:bg-green-500 hover:text-white cursor-pointer bg-white'
                        }`}
                    aria-label="Next"
                >
                    &#8250;
                </button>
            </div>

            {/* Dot Indicators */}
            {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-6">
                    {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentIndex(i)}
                            className={`w-2.5 h-2.5 rounded-full transition-all duration-200
                                ${i === currentIndex
                                    ? 'bg-green-500 w-5'
                                    : 'bg-gray-300 hover:bg-gray-400'
                                }`}
                            aria-label={`Page ${i + 1}`}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}