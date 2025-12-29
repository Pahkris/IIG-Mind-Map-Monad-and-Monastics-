
import React, { useState } from 'react';
import { LIBRARY_RESOURCES, LibraryItem, ICONS } from '../constants';

const ResourcesLibrary: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<LibraryItem | null>(null);

  const handleResourceClick = (item: LibraryItem) => {
    if (item.link === "#internal") {
      setSelectedItem(item);
    } else {
      window.open(item.link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="flex flex-col h-full w-full max-w-5xl mx-auto p-8 pt-24 overflow-y-auto">
      {/* Internal Content Viewer Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-void/80 border border-blue-900/40 rounded-3xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl">
            <div className="p-8 border-b border-white/5 flex justify-between items-center">
              <div>
                <span className="text-[10px] uppercase font-black text-orange-500 tracking-[0.3em] mb-2 block">{selectedItem.type} Access</span>
                <h3 className="text-2xl font-mystic text-white">{selectedItem.title}</h3>
              </div>
              <button onClick={() => setSelectedItem(null)} className="p-3 text-gray-500 hover:text-white bg-white/5 rounded-full transition">
                <ICONS.Close />
              </button>
            </div>
            <div className="p-10 overflow-y-auto flex-1 custom-scrollbar">
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 text-lg leading-relaxed font-light whitespace-pre-wrap">
                  {selectedItem.internalContent || "Detailed content for this resource is currently being archived in the SeTs Ryu digital library. Please check back shortly."}
                </p>
              </div>
              <div className="mt-12 p-6 bg-blue-900/10 rounded-2xl border border-blue-800/20 text-center">
                <p className="text-[11px] text-blue-400 font-bold uppercase tracking-widest mb-4">Study Mastery Action</p>
                <a 
                  href="https://www.mindsets.eu/education-courses" 
                  target="_blank" 
                  className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl text-xs font-bold uppercase tracking-widest transition shadow-lg shadow-blue-900/20"
                >
                  Join Training Programme
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mb-12">
        <h2 className="text-4xl font-mystic text-white tracking-widest mb-2">Resources Library</h2>
        <p className="text-sm text-gray-400 uppercase tracking-widest">The Digital Archive of SeTs Ryu Knowledge</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {LIBRARY_RESOURCES.map((res, i) => (
          <div 
            key={i} 
            onClick={() => handleResourceClick(res)}
            className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-blue-500/50 hover:bg-blue-900/10 transition group cursor-pointer"
          >
            <span className="text-[9px] uppercase font-bold text-orange-500 mb-2 block tracking-widest">{res.type}</span>
            <h3 className="text-lg font-bold text-white mb-4 group-hover:text-blue-400 transition">{res.title}</h3>
            <p className="text-xs text-gray-500 leading-relaxed">{res.description}</p>
            <div className="mt-6 flex items-center text-[10px] text-blue-500 font-bold uppercase tracking-widest">
              {res.link === "#internal" ? "View Internally" : "Open External Resource"} <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 p-10 bg-gradient-to-br from-blue-900/20 to-transparent border border-blue-800/20 rounded-3xl text-center">
        <h3 className="text-xl font-mystic text-white mb-4">Deep Learning Hub</h3>
        <p className="text-gray-400 text-sm max-w-2xl mx-auto mb-8 leading-relaxed">
          The SeTs Ryu library is a curated collection of ancient wisdom and modern cognitive science. 
          Use these resources to supplement your journey through the Monad Mind Map.
        </p>
        <a href="https://www.mindsets.eu/blog" target="_blank" className="px-10 py-4 bg-white/5 border border-white/20 rounded-full hover:bg-white/10 transition text-xs uppercase tracking-[0.2em] font-bold">
          Visit Full Digital Library
        </a>
      </div>
    </div>
  );
};

export default ResourcesLibrary;
