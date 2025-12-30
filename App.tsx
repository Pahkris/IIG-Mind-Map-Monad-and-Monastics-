
import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
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
  const [warpFactor, setWarpFactor] = useState(1);
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
    setWarpFactor(prev => Math.min(10, prev + 5));
    
    setTimeout(() => {
      setSelectedNode(node);
      setIsWormhole(false);
      setWarpFactor(prev => Math.max(1, prev - 5));
      setProgress(prev => ({
        ...prev,
        visitedNodes: Array.from(new Set([...prev.visitedNodes, node.id]))
      }));
    }, 800);
  }, []);

  const handleQuizComplete = useCallback((nodeId: string, score: number) => {
    setProgress(prev => ({
      ...prev,
      quizScores: { ...prev.quizScores, [nodeId]: score },
      lastQuizResult: { nodeId, score }
    }));
  }, []);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      appRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  const backgroundStars = useMemo(() => {
    const stars: any[] = [];
    
    // Helper to add fixed constellation groups (Positions tailored for Helsinki's Feb sky)
    const addConstellation = (startX: number, startY: number, offsets: {x: number, y: number, b?: number}[]) => {
      offsets.forEach((off, i) => {
        stars.push({
          id: `const-${startX}-${startY}-${i}`,
          x: startX + off.x,
          y: startY + off.y,
          size: (off.b || 1) * 2,
          angle: Math.random() * Math.PI * 2,
          speedBase: Math.random() * 0.4 + 0.05,
          opacity: (off.b || 0.8) * 0.9,
          delay: Math.random() * 10
        });
      });
    };

    // Orion (The Hunter) - Prominent in Southern Feb sky
    addConstellation(70, 60, [
      {x: 0, y: 0, b: 1.2}, {x: 6, y: -2, b: 1}, // Shoulders (Betelgeuse, Bellatrix)
      {x: 2, y: 4, b: 0.8}, {x: 3, y: 4.2, b: 0.8}, {x: 4, y: 4.4, b: 0.8}, // Belt
      {x: 1, y: 10, b: 1.1}, {x: 7, y: 8, b: 0.9} // Feet (Rigel, Saiph)
    ]);

    // Ursa Major (Big Dipper) - High in Northern Feb sky
    addConstellation(15, 20, [
      {x: 0, y: 0, b: 0.9}, {x: 5, y: -1, b: 0.8}, {x: 8, y: 3, b: 1}, {x: 3, y: 4, b: 0.7}, // Bowl
      {x: -4, y: -2, b: 0.8}, {x: -8, y: -1, b: 0.7}, {x: -12, y: -4, b: 0.9} // Handle
    ]);

    // Cassiopeia (The Queen) - "W" shape
    addConstellation(40, 15, [
      {x: 0, y: 0, b: 0.9}, {x: 3, y: 4, b: 0.8}, {x: 7, y: 1, b: 1}, {x: 10, y: 5, b: 0.8}, {x: 14, y: 2, b: 0.9}
    ]);

    // Random noise stars (filling the rest)
    for (let i = 0; i < 120; i++) {
      stars.push({
        id: `noise-${i}`,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1.8 + 0.4,
        angle: Math.random() * Math.PI * 2,
        speedBase: Math.random() * 0.4 + 0.05,
        opacity: Math.random() * 0.5 + 0.3, // Slightly brightened
        delay: Math.random() * 10
      });
    }

    return stars;
  }, []);

  return (
    <div 
      ref={appRef} 
      className="relative h-screen w-screen overflow-hidden bg-black text-white font-inter"
      style={{ '--warp-intensity': warpFactor } as any}
    >
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {backgroundStars.map(star => {
          const distance = 200 + (warpFactor * 100);
          const moveX = Math.cos(star.angle) * distance;
          const moveY = Math.sin(star.angle) * distance;
          const duration = (25 / Math.max(0.5, warpFactor));

          return (
            <div 
              key={star.id}
              className="absolute rounded-full bg-white transition-opacity duration-1000"
              style={{
                top: `${star.y}%`,
                left: `${star.x}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: star.opacity,
                boxShadow: `0 0 ${star.size * 2.5}px rgba(255,255,255,0.9)`,
                animation: `star-glide-${star.id.replace(/-/g, '')} ${duration}s linear infinite`,
                animationDelay: `-${star.delay}s`
              }}
            >
              <style>{`
                @keyframes star-glide-${star.id.replace(/-/g, '')} {
                  0% { transform: translate(0, 0) scale(0.5); opacity: 0; }
                  20% { opacity: ${star.opacity}; }
                  80% { opacity: ${star.opacity}; }
                  100% { transform: translate(${moveX}px, ${moveY}px) scale(${1 + warpFactor * 0.2}); opacity: 0; }
                }
              `}</style>
            </div>
          );
        })}
        <div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.18)_0%,black_100%)]"
          style={{ opacity: warpFactor > 5 ? 0.6 : 0.3 }}
        ></div>
      </div>

      {isWormhole && (
        <div className="absolute inset-0 z-[100] flex items-center justify-center pointer-events-none overflow-hidden bg-black/20 backdrop-blur-sm">
          <div className="portal-flash-overlay"></div>
          <div className="wormhole-layer w-64 h-64"></div>
          <div className="wormhole-layer w-64 h-64"></div>
          <div className="wormhole-layer w-64 h-64"></div>
          <div className="wormhole-layer w-64 h-64"></div>
        </div>
      )}

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

      <main className="h-full w-full relative">
        {activeTab === 'map' && (
          <SolarSystem 
            data={MIND_MAP_DATA} 
            onNodeClick={handleNodeClick} 
            visitedNodes={progress.visitedNodes} 
            warpFactor={warpFactor}
            setWarpFactor={setWarpFactor}
          />
        )}
        {activeTab === 'library' && <ResourcesLibrary />}
        {activeTab === 'compare' && <Comparator />}
        {activeTab === 'progress' && <ProgressTracker progress={progress} />}
      </main>

      {selectedNode && selectedNode.id !== 'ai-coach' && (
        <InfoCard 
          node={selectedNode} 
          onClose={() => setSelectedNode(null)} 
          progress={progress}
          onQuizComplete={(score) => handleQuizComplete(selectedNode.id, score)}
          onNavigate={handleNodeClick}
        />
      )}

      {selectedNode?.id === 'ai-coach' && (
        <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center">
          <div className="relative w-full max-w-4xl h-[80vh]">
            <button onClick={() => setSelectedNode(null)} className="absolute -top-12 right-0 text-white p-2 hover:bg-white/10 rounded-full transition"><ICONS.Close /></button>
            <AICoach progress={progress} />
          </div>
        </div>
      )}

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
