
import React, { useState } from 'react';
import { LIBRARY_RESOURCES, LibraryItem, ICONS } from '../constants';

const ResourcesLibrary: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<LibraryItem | null>(null);

  const handleResourceClick = (item: LibraryItem) => {
    // If it has internal content (rich description), show modal first
    if (item.internalContent) {
      setSelectedItem(item);
    } else {
      // Otherwise, direct link
      window.open(item.link, '_blank', 'noopener,noreferrer');
    }
  };

  const handleOpenSource = (link: string) => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex flex-col h-full w-full max-w-5xl mx-auto p-8 pt-24 overflow-y-auto">
      {/* Internal Content Viewer Modal - 100% Opaque bg-void */}
      {selectedItem && (
        <div className="fixed inset-0 z-[200] bg-black/98 backdrop-blur-2xl flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-[#050505] border border-blue-900/40 rounded-[2.5rem] w-full max-w-2xl max-h-[85vh] flex flex-col shadow-[0_30px_100px_rgba(0,0,0,1)] overflow-hidden">
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-black/40">
              <div>
                <span className="text-[10px] uppercase font-black text-orange-500 tracking-[0.3em] mb-2 block">{selectedItem.type} Summary</span>
                <h3 className="text-2xl font-mystic text-white">{selectedItem.title}</h3>
              </div>
              <button 
                onClick={() => setSelectedItem(null)} 
                className="p-3 text-gray-500 hover:text-white bg-white/5 rounded-full transition-all border border-white/5"
              >
                <ICONS.Close />
              </button>
            </div>
            <div className="p-10 overflow-y-auto flex-1 custom-scrollbar bg-[#050505]">
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-200 text-lg leading-relaxed font-light whitespace-pre-wrap">
                  {selectedItem.internalContent}
                </p>
              </div>
              <div className="mt-12 p-10 bg-blue-900/10 rounded-3xl border border-blue-800/20 text-center">
                <p className="text-[11px] text-blue-400 font-bold uppercase tracking-[0.2em] mb-8">Mastery Resource Gateway</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={() => handleOpenSource(selectedItem.link)}
                    className="px-10 py-5 bg-orange-500 hover:bg-orange-400 rounded-2xl text-[10px] font-black uppercase tracking-widest transition shadow-lg shadow-orange-900/30 text-black transform hover:-translate-y-1"
                  >
                    Open Full {selectedItem.type}
                  </button>
                  <a 
                    href="https://www.mindsets.eu/book-online" 
                    target="_blank" 
                    className="px-10 py-5 bg-blue-600 hover:bg-blue-500 rounded-2xl text-[10px] font-black uppercase tracking-widest transition shadow-lg shadow-blue-900/30 text-white transform hover:-translate-y-1"
                  >
                    Join Training
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mb-12">
        <h2 className="text-4xl font-mystic text-white tracking-widest mb-2">Resources Library</h2>
        <p className="text-sm text-gray-400 uppercase tracking-widest">Digital Archive of SeTs Ryu Knowledge</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
        {LIBRARY_RESOURCES.map((res, i) => (
          <div 
            key={i} 
            onClick={() => handleResourceClick(res)}
            className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-blue-500/50 hover:bg-blue-900/10 transition group cursor-pointer flex flex-col h-full"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-[9px] uppercase font-bold text-orange-500 tracking-widest">{res.type}</span>
              <div className="w-2 h-2 rounded-full bg-blue-500/50 group-hover:bg-blue-400 transition-colors"></div>
            </div>
            <h3 className="text-lg font-bold text-white mb-4 group-hover:text-blue-400 transition flex-1">{res.title}</h3>
            <p className="text-xs text-gray-500 leading-relaxed mb-6 line-clamp-3">{res.description}</p>
            <div className="mt-auto flex items-center text-[10px] text-blue-500 font-bold uppercase tracking-widest">
              {res.internalContent ? "Learn More & Open" : "Open Source"} <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-10 bg-gradient-to-br from-blue-900/20 to-transparent border border-blue-800/20 rounded-3xl text-center">
        <h3 className="text-xl font-mystic text-white mb-4">SeTs Ryu Knowledge Vault</h3>
        <p className="text-gray-400 text-sm max-w-2xl mx-auto mb-8 leading-relaxed">
          The SeTs Ryu library is hosted on our central media managers. Click any resource above to access original documents, podcasts, and video explainers.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://www.mindsets.eu/blog" target="_blank" className="px-10 py-4 bg-white/5 border border-white/20 rounded-full hover:bg-white/10 transition text-xs uppercase tracking-[0.2em] font-bold">
            Visit Full Digital Library
          </a>
          <a href="https://www.youtube.com/@Eye_Of_Gnosis" target="_blank" className="px-10 py-4 bg-red-600/10 border border-red-500/20 rounded-full hover:bg-red-600/20 transition text-xs uppercase tracking-[0.2em] font-bold text-red-400">
            YouTube Channel
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResourcesLibrary;
