
import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { NodeData } from '../types';
import { COLORS, ICONS } from '../constants';

interface SolarSystemProps {
  data: NodeData;
  onNodeClick: (node: NodeData) => void;
  visitedNodes: string[];
  warpFactor: number;
  setWarpFactor: (val: number) => void;
}

const SolarSystem: React.FC<SolarSystemProps> = ({ data, onNodeClick, visitedNodes, warpFactor, setWarpFactor }) => {
  const [rotation, setRotation] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [dragRotation, setDragRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [showNavPop, setShowNavPop] = useState(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  const SYSTEM_CENTER_Z = 500;
  const rotationIncrement = useMemo(() => 0.15 * warpFactor, [warpFactor]);
  const flowSpeed = useMemo(() => `${1.5 / warpFactor}s`, [warpFactor]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setRotation(prev => (prev + rotationIncrement) % 360);
    }, 16);
    return () => clearInterval(interval);
  }, [isPaused, rotationIncrement]);

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - lastMousePos.current.x;
    const deltaY = e.clientY - lastMousePos.current.y;
    setDragRotation(prev => ({
      x: prev.x + deltaY * 0.2,
      y: prev.y + deltaX * 0.2
    }));
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  }, [isDragging]);

  const onMouseUp = () => setIsDragging(false);

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [onMouseMove]);

  // CSS 3D Sphere Renderer with restored textures and gradients
  const ThreeDSphere = ({ size, color, label, isMoon = false }: { size: number, color: string, label: string, isMoon?: boolean }) => {
    const shadowColor = '#000000';
    const textureUrl = 'https://www.transparenttextures.com/patterns/carbon-fibre.png';

    return (
      <div className="relative group/sphere" style={{ width: size, height: size, transformStyle: 'preserve-3d' }}>
        {/* Main Volumetric Layers */}
        {/* Frontal Face */}
        <div 
          className="absolute inset-0 rounded-full flex items-center justify-center overflow-hidden ring-1 ring-white/10" 
          style={{ 
            background: `radial-gradient(circle at 30% 30%, ${color}, ${shadowColor})`, 
            transform: 'translateZ(0px)' 
          }}
        >
          <div className="absolute inset-0 opacity-40 mix-blend-overlay" style={{ backgroundImage: `url(${textureUrl})` }}></div>
        </div>

        {/* Vertical Intersection Layer */}
        <div 
          className="absolute inset-0 rounded-full flex items-center justify-center overflow-hidden ring-1 ring-white/10" 
          style={{ 
            background: `radial-gradient(circle at 30% 30%, ${color}, ${shadowColor})`, 
            transform: 'rotateY(90deg)',
            filter: 'brightness(0.7)'
          }}
        >
          <div className="absolute inset-0 opacity-40 mix-blend-overlay" style={{ backgroundImage: `url(${textureUrl})` }}></div>
        </div>

        {/* Horizontal Intersection Layer */}
        <div 
          className="absolute inset-0 rounded-full flex items-center justify-center overflow-hidden ring-1 ring-white/10" 
          style={{ 
            background: `radial-gradient(circle at 30% 30%, ${color}, ${shadowColor})`, 
            transform: 'rotateX(90deg)',
            filter: 'brightness(0.5)'
          }}
        >
          <div className="absolute inset-0 opacity-40 mix-blend-overlay" style={{ backgroundImage: `url(${textureUrl})` }}></div>
        </div>
        
        {/* Global Glow/Shading Overlays */}
        <div className="absolute inset-0 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 60%)', transform: 'translateZ(2px)' }}></div>
        <div className="absolute inset-0 rounded-full pointer-events-none shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.8)]" style={{ transform: 'translateZ(3px)' }}></div>
        
        {/* Text content - billboarding to face user */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none" 
          style={{ transform: `rotateX(${-dragRotation.x}deg) rotateY(${-dragRotation.y}deg)` }}>
          <span className={`uppercase font-extrabold tracking-widest text-center px-2 drop-shadow-[0_2px_5px_rgba(0,0,0,1)] ${isMoon ? 'text-[8px]' : 'text-[12px]'}`}>
            {label}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div 
      className="relative w-full h-full flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing" 
      style={{ perspective: '1500px', '--flow-speed': flowSpeed } as any}
      onMouseDown={onMouseDown}
    >
      <div 
        className="relative w-full h-full flex items-center justify-center transition-transform duration-300"
        style={{ 
          transform: `rotateX(${dragRotation.x}deg) rotateY(${dragRotation.y}deg)`,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Central Hub: The Monad */}
        <div 
          onClick={() => onNodeClick(data)}
          className="group absolute w-64 h-64 flex items-center justify-center cursor-pointer transition-all duration-700 hover:scale-110"
          style={{ 
            zIndex: SYSTEM_CENTER_Z,
            transform: 'translate3d(0, 0, 0)',
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Volumetric Monad Geometry */}
          <div className="absolute inset-0 rounded-full bg-white shadow-[0_0_80px_rgba(255,255,255,0.4)] ring-4 ring-white/5" style={{ transform: 'translateZ(0px)' }}></div>
          <div className="absolute inset-0 rounded-full bg-gray-200" style={{ transform: 'rotateY(90deg)' }}></div>
          <div className="absolute inset-0 rounded-full bg-gray-300" style={{ transform: 'rotateX(90deg)' }}></div>
          
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
            style={{ transform: `rotateX(${-dragRotation.x}deg) rotateY(${-dragRotation.y}deg)` }}>
            <span className="text-black font-mystic text-3xl font-bold tracking-widest text-center px-4 leading-tight">
              {data.label}
            </span>
          </div>
          <div className="absolute inset-0 bg-white/10 rounded-full animate-ping pointer-events-none"></div>
        </div>

        {/* Orbit Plane */}
        <div className="absolute w-[950px] h-[950px] border border-blue-500/10 rounded-full pointer-events-none" 
          style={{ transform: 'rotateX(90deg) translateZ(-50px)', zIndex: 1 }}></div>

        {/* Dynamic Energy Links */}
        {data.subNodes?.map((planet, index) => {
          const angle = (index * (360 / data.subNodes!.length) + rotation) * (Math.PI / 180);
          const radius = 380;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * 100;
          const z = Math.sin(angle) * radius;
          const depthFactor = (z + radius) / (radius * 2);
          const strokeWidth = 1 + depthFactor * 2;
          const opacity = 0.2 + depthFactor * 0.5;

          return (
            <div 
              key={`link-container-${planet.id}`}
              className="absolute pointer-events-none"
              style={{ 
                width: '100%', height: '100%', 
                transformStyle: 'preserve-3d',
                zIndex: Math.round(z/2 + SYSTEM_CENTER_Z)
              }}
            >
              <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                <line x1="50%" y1="50%" x2={`${50 + (x / 14)}%`} y2={`${50 + (y / 14)}%`} stroke={planet.color} strokeWidth={strokeWidth} strokeOpacity={opacity * 0.4} />
                <line className="link-energy" x1="50%" y1="50%" x2={`${50 + (x / 14)}%`} y2={`${50 + (y / 14)}%`} stroke={planet.color} strokeWidth={strokeWidth * 1.5} strokeDasharray="15 30" strokeLinecap="round" strokeOpacity={opacity} />
              </svg>
            </div>
          );
        })}

        {/* Planets and Moons System */}
        {data.subNodes?.map((planet, index) => {
          const angle = (index * (360 / data.subNodes!.length) + rotation) * (Math.PI / 180);
          const radius = 380;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * 100;
          const z = Math.sin(angle) * radius;
          const isVisited = visitedNodes.includes(planet.id);

          return (
            <div 
              key={planet.id}
              className="absolute transition-all duration-500 pointer-events-none"
              style={{ 
                transform: `translate3d(${x}px, ${y}px, ${z}px) scale(${1 + (z / 1200)})`,
                zIndex: Math.round(z + SYSTEM_CENTER_Z),
                transformStyle: 'preserve-3d'
              }}
            >
              <div className="relative pointer-events-auto cursor-pointer" onClick={() => onNodeClick(planet)}>
                <ThreeDSphere size={128} color={planet.color} label={planet.label} />
                {isVisited && (
                  <div className="absolute top-2 right-2 w-5 h-5 bg-yellow-400 rounded-full animate-pulse shadow-[0_0_20px_#f5a623] z-30"></div>
                )}
                
                {/* Floating Meta Labels */}
                <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-64 opacity-0 group-hover/sphere:opacity-100 transition-all duration-500 bg-black/90 backdrop-blur-xl p-5 rounded-2xl border border-white/10 text-center z-[100] scale-90 group-hover/sphere:scale-100 shadow-2xl"
                  style={{ transform: `translateX(-50%) rotateX(${-dragRotation.x}deg) rotateY(${-dragRotation.y}deg)` }}>
                  <h4 className="text-[11px] font-black text-yellow-500 mb-2 uppercase tracking-widest">{planet.label}</h4>
                  <p className="text-[10px] text-gray-400 leading-relaxed font-medium">{planet.description}</p>
                </div>
              </div>

              {/* Orbital Moons */}
              {planet.subNodes?.map((moon, mIdx) => {
                const mAngle = (mIdx * (360 / planet.subNodes!.length) + rotation * 2.8) * (Math.PI / 180);
                const mRadius = 115; 
                const mx = Math.cos(mAngle) * mRadius;
                const my = Math.sin(mAngle) * mRadius;

                return (
                  <div key={moon.id} className="absolute pointer-events-none" style={{ transform: `translate(${mx - 24}px, ${my - 24}px)`, transformStyle: 'preserve-3d' }}>
                    <div 
                      onClick={(e) => { e.stopPropagation(); onNodeClick(moon); }}
                      className="pointer-events-auto cursor-pointer hover:scale-125 transition-transform"
                    >
                      <ThreeDSphere size={52} color={moon.color} label={moon.label} isMoon />
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* SeTs AI Coach Hub */}
      <div 
        className="absolute top-32 right-32 z-[1000] cursor-pointer group animate-gentle-glow rounded-full"
        onClick={() => onNodeClick({ id: 'ai-coach', label: 'AI Coach', type: 'coach', color: COLORS.brandYellow, description: 'Ask the Master.', content: [] })}
      >
        <div className="w-24 h-24 bg-gradient-radial from-yellow-400 to-orange-700 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(245,166,35,0.4)] transition-transform duration-500 group-hover:scale-110 border-2 border-white/10">
          <span className="text-4xl filter drop-shadow-lg">👁️</span>
        </div>
      </div>

      {/* Navigation Guide HUD - Top Left */}
      <div className="absolute top-32 left-10 z-[1000] flex flex-col items-start">
        <button 
          onClick={() => setShowNavPop(!showNavPop)}
          className="text-[11px] text-blue-400 border-b border-blue-900/50 hover:text-white hover:border-blue-400 transition-all uppercase tracking-widest font-black"
        >
          Navigation Guide {showNavPop ? '(Collapse)' : '(Expand)'}
        </button>
        {showNavPop && (
          <div className="mt-4 w-80 bg-void/98 border border-blue-900/40 p-8 rounded-3xl backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] animate-in fade-in slide-in-from-top-4 duration-300">
            <h5 className="text-[10px] font-black text-yellow-500 uppercase mb-4 tracking-[0.3em] border-b border-white/5 pb-2">Navigation Mastery</h5>
            <ul className="text-[11px] space-y-4 text-gray-400 leading-relaxed font-medium">
              <li><span className="text-blue-500 font-black mr-2">DRAG:</span> Tilt the 3D plane. Objects maintain volume at all angles.</li>
              <li><span className="text-blue-500 font-black mr-2">SPHERES:</span> Restored original radial textures & carbon-fiber overlays.</li>
              <li><span className="text-blue-500 font-black mr-2">WARP:</span> Dynamically randomized shooting stars speed through the void.</li>
              <li><span className="text-blue-500 font-black mr-2">PAUSE:</span> Toggle icon now integrated into the Warp control panel.</li>
            </ul>
            <button onClick={() => setShowNavPop(false)} className="mt-8 w-full py-3 bg-white/5 rounded-2xl text-[10px] text-gray-400 hover:text-white uppercase tracking-widest border border-white/10 font-bold transition-all">Dismiss HUD</button>
          </div>
        )}
      </div>

      {/* Consolidated Controls - Bottom Left */}
      <div className="absolute bottom-10 left-10 z-[1000] flex flex-col gap-4">
        <div className="bg-black/85 backdrop-blur-xl p-6 rounded-3xl border border-white/10 w-80 shadow-[0_20px_50px_rgba(0,0,0,0.8)] animate-in fade-in slide-in-from-left-4 duration-500">
           <div className="flex justify-between items-center mb-4">
             <div className="flex items-center gap-3">
               <span className="text-[10px] uppercase font-black text-blue-400 tracking-[0.2em]">Warp Factor</span>
               <button 
                 onClick={() => setIsPaused(!isPaused)}
                 className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-blue-400 hover:text-white transition-all shadow-inner"
                 title={isPaused ? "Resume Rotation" : "Pause Rotation"}
               >
                 {isPaused ? <ICONS.Play /> : <ICONS.Pause />}
               </button>
             </div>
             <span className="text-[11px] font-mono text-white bg-blue-900/40 px-3 py-1 rounded-full border border-blue-500/30 font-bold">x{warpFactor.toFixed(1)}</span>
           </div>
           
           <div className="relative px-1">
             <input 
               type="range" min="0.5" max="10" step="0.1" value={warpFactor} 
               onChange={(e) => setWarpFactor(parseFloat(e.target.value))}
               className="w-full h-1 cursor-pointer accent-orange-500"
             />
           </div>
           
           <div className="flex justify-between mt-3">
             <span className="text-[8px] text-gray-500 uppercase font-black tracking-widest">Sub-Light</span>
             <span className="text-[8px] text-gray-500 uppercase font-black tracking-widest">Gnosis Drive</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SolarSystem;
