import React from 'react';
import { X, Sparkles, Loader } from 'lucide-react' // Assuming you use lucide-react, or remove if using standard icons

export default function AiHelperModal({ title, content, isLoading, onClose }) {
  if (!title && !isLoading) return null;

  // This function turns Markdown symbols into real UI elements
  const formatContent = (text) => {
    if (!text) return null;

    return text.split('\n').map((line, index) => {
      // 1. Handle Headings (Lines starting with ##)
      if (line.trim().startsWith('##')) {
        return (
          <h3 key={index} className="text-lg font-bold text-green-800 mt-4 mb-2 border-b pb-1 border-green-100">
            {line.replace(/#/g, '').trim()}
          </h3>
        );
      }

      // 2. Handle Bullet Points (Lines starting with *)
      if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
        const cleanLine = line.replace(/^[\*\-]\s/, '');
        return (
          <div key={index} className="flex items-start mb-2 ml-2">
            <span className="text-green-600 mr-2 mt-1">•</span>
            <p className="text-gray-700 leading-relaxed">{parseBold(cleanLine)}</p>
          </div>
        );
      }

      // 3. Handle Empty Lines (Spacing)
      if (line.trim() === '') {
        return <div key={index} className="h-3"></div>;
      }

      // 4. Standard Paragraphs
      return (
        <p key={index} className="mb-2 text-gray-700 leading-relaxed">
          {parseBold(line)}
        </p>
      );
    });
  };

  // Helper to handle **Bold** text inside lines
  const parseBold = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-bold text-gray-900">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-green-50 to-white border-b flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-xl">✨</span> 
            <h2 className="text-xl font-bold text-green-900 truncate pr-4">
              {title || "AI Assistant"}
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-700"
          >
            <span className="text-2xl font-bold">×</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto bg-white custom-scrollbar">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-600"></div>
              <p className="text-gray-500 animate-pulse">Consulting AI Expert...</p>
              <p className="text-xs text-gray-400">(Translating to Hindi...)</p>
            </div>
          ) : (
            <div className="prose prose-green max-w-none">
              {/* Render the formatted content */}
              {formatContent(content)}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors shadow-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}