
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { NodeData, UserProgress } from './types';
import { MIND_MAP_DATA, COLORS, ICONS } from './constants';
import SolarSystem from './components/SolarSystem';
import InfoCard from './components/InfoCard';
import AICoach from './components/AICoach';
import Comparator from './components/Comparator';
import ProgressTracker from './components/ProgressTracker';
import ResourcesLibrary from './components/ResourcesLibrary';

const App: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);
  const [isWormhole, setIsWormhole] = useState(false);
  const [activeTab, setActiveTab] = useState<'map' | 'library' | 'compare' | 'progress'>('map');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const appRef = useRef<HTMLDivElement>(null);

  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('sets_ryu_progress');
    if (saved) {
      const data = JSON.parse(saved);
      const savedDate = new Date(data.joinDate);
      const now = new Date();
      const diffMonths = (now.getTime() - savedDate.getTime()) / (1000 * 60 * 60 * 24 * 30.44);
      if (diffMonths > 4) {
        return { visitedNodes: [], quizScores: {}, flashcardProgress: {}, joinDate: new Date().toISOString() };
      }
      return data;
    }
    return { visitedNodes: [], quizScores: {}, flashcardProgress: {}, joinDate: new Date().toISOString() };
  });

  useEffect(() => {
    localStorage.setItem('sets_ryu_progress', JSON.stringify(progress));
  }, [progress]);

  const handleNodeClick = useCallback((node: NodeData) => {
    setIsWormhole(true);
    setTimeout(() => {
      setSelectedNode(node);
      setIsWormhole(false);
      setProgress(prev => ({
        ...prev,
        visitedNodes: Array.from(new Set([...prev.visitedNodes, node.id]))
      }));
    }, 800);
  }, []);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      appRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div ref={appRef} className="relative h-screen w-screen overflow-hidden bg-black text-white font-inter">
      {/* Background Stars */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full blur-[1px]"></div>
        <div className="absolute top-1/3 left-1/2 w-1.5 h-1.5 bg-blue-200 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 left-1/4 w-1 h-1 bg-white rounded-full"></div>
        <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-blue-100 rounded-full"></div>
      </div>

      {/* Wormhole Overlay - Multi-layered Tunneling */}
      {isWormhole && (
        <div className="absolute inset-0 z-[100] flex items-center justify-center pointer-events-none overflow-hidden bg-black/20 backdrop-blur-sm">
          <div className="wormhole-layer w-64 h-64"></div>
          <div className="wormhole-layer w-64 h-64"></div>
          <div className="wormhole-layer w-64 h-64"></div>
        </div>
      )}

      {/* Header Branding */}
      <header className="absolute top-0 left-0 w-full p-6 z-40 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.3)]">
             <svg viewBox="0 0 100 100" className="w-10 h-10">
               <circle cx="50" cy="50" r="45" fill="none" stroke="black" strokeWidth="2"/>
               <path d="M50 10 L50 90 M10 50 L90 50" stroke="black" strokeWidth="1"/>
               <text x="50" y="55" textAnchor="middle" fontSize="12" fontWeight="bold" fontFamily="Cinzel">SETS</text>
             </svg>
          </div>
          <div>
            <h1 className="text-2xl font-mystic font-bold tracking-widest text-white leading-none">SeTs Ryu</h1>
            <p className="text-[10px] tracking-[0.2em] text-blue-300 opacity-80 uppercase mt-1">[ Sound in Body, Sound in Mind ]</p>
          </div>
        </div>
        
        <nav className="hidden md:flex gap-8 items-center">
          <button onClick={() => setActiveTab('map')} className={`text-xs tracking-widest uppercase hover:text-yellow-400 transition ${activeTab === 'map' ? 'text-yellow-400 border-b border-yellow-400' : 'text-white'}`}>The Map</button>
          <button onClick={() => setActiveTab('library')} className={`text-xs tracking-widest uppercase hover:text-yellow-400 transition ${activeTab === 'library' ? 'text-yellow-400 border-b border-yellow-400' : 'text-white'}`}>Resources Library</button>
          <button onClick={() => setActiveTab('compare')} className={`text-xs tracking-widest uppercase hover:text-yellow-400 transition ${activeTab === 'compare' ? 'text-yellow-400 border-b border-yellow-400' : 'text-white'}`}>Comparator</button>
          <button onClick={() => setActiveTab('progress')} className={`text-xs tracking-widest uppercase hover:text-yellow-400 transition ${activeTab === 'progress' ? 'text-yellow-400 border-b border-yellow-400' : 'text-white'}`}>Study Progress</button>
          <button onClick={toggleFullscreen} className="text-white hover:text-yellow-400 transition ml-4 p-2 bg-white/5 rounded-full" title="Toggle Fullscreen">
            <ICONS.Fullscreen />
          </button>
        </nav>
      </header>

      {/* Main content Area */}
      <main className="h-full w-full relative">
        {activeTab === 'map' && (
          <SolarSystem data={MIND_MAP_DATA} onNodeClick={handleNodeClick} visitedNodes={progress.visitedNodes} />
        )}
        {activeTab === 'library' && <ResourcesLibrary />}
        {activeTab === 'compare' && <Comparator />}
        {activeTab === 'progress' && <ProgressTracker progress={progress} />}
      </main>

      {/* Detail Panel */}
      {selectedNode && selectedNode.id !== 'ai-coach' && (
        <InfoCard 
          node={selectedNode} 
          onClose={() => setSelectedNode(null)} 
          progress={progress}
          onQuizComplete={(score) => setProgress(p => ({...p, quizScores: {...p.quizScores, [selectedNode.id]: score}}))}
        />
      )}

      {/* AI Coach Modal if selected via map */}
      {selectedNode?.id === 'ai-coach' && (
        <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center">
          <div className="relative w-full max-w-4xl h-[80vh]">
            <button onClick={() => setSelectedNode(null)} className="absolute -top-12 right-0 text-white p-2 hover:bg-white/10 rounded-full transition"><ICONS.Close /></button>
            <AICoach progress={progress} />
          </div>
        </div>
      )}

      {/* Persistent Mobile Navigation */}
      <div className="md:hidden absolute bottom-0 left-0 w-full flex justify-around bg-black/90 p-4 border-t border-blue-900 z-40">
        <button onClick={() => setActiveTab('map')} className="text-[10px] uppercase flex flex-col items-center gap-1">
          <ICONS.Brain /> Map
        </button>
        <button onClick={() => setActiveTab('compare')} className="text-[10px] uppercase flex flex-col items-center gap-1">
          <ICONS.Compare /> Compare
        </button>
        <button onClick={() => setActiveTab('progress')} className="text-[10px] uppercase flex flex-col items-center gap-1 text-yellow-400">
          <ICONS.Chart /> Progress
        </button>
      </div>
    </div>
  );
};

export default App;
