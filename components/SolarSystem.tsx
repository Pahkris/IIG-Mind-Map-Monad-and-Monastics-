
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
  const [showNavPop, setShowNavPop] = useState(false); // 2. Navigation Guide collapsed by default
  const lastMousePos = useRef({ x: 0, y: 0 });

  const SYSTEM_CENTER_Z = 500;
  const rotationIncrement = useMemo(() => 0.15 * warpFactor, [warpFactor]);
  const flowSpeed = useMemo(() => `${1.2 / Math.max(1, warpFactor)}s`, [warpFactor]);

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
      x: Math.max(-80, Math.min(80, prev.x + deltaY * 0.2)),
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

  const resetView = () => setDragRotation({ x: 0, y: 0 });

  // 1. Enhanced 3D Sphere Renderer with Realistic Shading
  const ThreeDSphere = ({ size, color, label, isMoon = false, isMonad = false }: { size: number, color: string, label: string, isMoon?: boolean, isMonad?: boolean }) => {
    const shadowColor = '#000000';
    const textureUrl = 'https://www.transparenttextures.com/patterns/carbon-fibre.png';
    
    // Complex radial gradient for realistic 3D volume
    const bg = isMonad 
      ? `radial-gradient(circle at 30% 30%, #ffffff 0%, #d1d1d1 40%, #888888 70%, #444444 100%)` 
      : `radial-gradient(circle at 35% 35%, ${color} 0%, ${color}CC 30%, ${shadowColor} 90%)`;

    return (
      <div className="relative flex items-center justify-center transition-all duration-300 group-hover/obj:scale-110" style={{ width: size, height: size, transformStyle: 'preserve-3d' }}>
        {/* Core Volumetric layers to simulate a solid sphere */}
        <div className="absolute inset-0 rounded-full overflow-hidden ring-1 ring-white/10 shadow-[inset_-10px_-10px_30px_rgba(0,0,0,0.8)]" 
             style={{ background: bg, transform: 'translateZ(0px)' }}>
          <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-center bg-cover" style={{ backgroundImage: `url(${textureUrl})` }}></div>
        </div>
        
        {/* Cross Planes for volumetric depth when tilting */}
        <div className="absolute inset-0 rounded-full" 
             style={{ background: bg, transform: 'rotateY(90deg)', filter: 'brightness(0.6)' }}></div>
        <div className="absolute inset-0 rounded-full" 
             style={{ background: bg, transform: 'rotateX(90deg)', filter: 'brightness(0.4)' }}></div>

        {/* Realistic Specular Highlight (Atmosphere/Reflection) */}
        <div className="absolute inset-0 rounded-full pointer-events-none opacity-60" 
             style={{ background: 'radial-gradient(circle at 30% 30%, white 0%, transparent 40%)', transform: 'translateZ(2px)' }}></div>
        
        {/* Rim Lighting Glow */}
        <div className="absolute inset-0 rounded-full ring-2 ring-white/5 opacity-40 group-hover/obj:opacity-100 transition-opacity" 
             style={{ transform: 'translateZ(-1px)', boxShadow: `0 0 15px ${color}40` }}></div>
        
        {/* 3. Billboarded Label (Readable at all angles) */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none" 
             style={{ transform: `rotateX(${-dragRotation.x}deg) rotateY(${-dragRotation.y - (isMonad ? 0 : 0)}deg)` }}>
          <span className={`uppercase font-black tracking-widest text-center px-2 drop-shadow-[0_2px_10px_rgba(0,0,0,1)] ${isMoon ? 'text-[8px] text-white/80 group-hover/obj:text-white group-hover/obj:scale-110' : isMonad ? 'text-2xl text-black' : 'text-[11px] text-white group-hover/obj:text-yellow-400 group-hover/obj:scale-105'} transition-all`}>
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
      {/* 2. Navigation Guide - Top Left Corner (Collapsed by default) */}
      <div className="absolute top-24 left-10 z-[1000] flex flex-col items-start select-none">
        <button 
          onClick={() => setShowNavPop(!showNavPop)}
          className="text-[11px] text-blue-400 border-b border-blue-900/50 hover:text-white hover:border-blue-400 transition-all uppercase tracking-widest font-black flex items-center gap-2"
        >
          {showNavPop ? <ICONS.Close /> : <ICONS.ChevronRight />}
          Navigation Guide
        </button>
        {showNavPop && (
          <div className="mt-4 w-80 bg-void/98 border border-blue-900/40 p-8 rounded-3xl backdrop-blur-xl shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
            <h5 className="text-[10px] font-black text-yellow-500 uppercase mb-4 tracking-[0.3em] border-b border-white/5 pb-2">System Mastery Guide</h5>
            <ul className="text-[10px] space-y-3 text-gray-400 leading-relaxed font-medium">
              <li><span className="text-blue-500 font-black mr-2">DRAG:</span> Tilt the plane using the mouse to see 3D objects from any side.</li>
              <li><span className="text-blue-500 font-black mr-2">3D SPHERES:</span> Objects feature realistic shading, specular highlights, and textures.</li>
              <li><span className="text-blue-500 font-black mr-2">TRACKER:</span> View current orientation and reset to center via the Bottom-Right HUD.</li>
              <li><span className="text-blue-500 font-black mr-2">HOVER:</span> Detailed data summaries appear on hover for all major bodies.</li>
              <li><span className="text-blue-500 font-black mr-2">WARP:</span> Intensifies starfield velocity and rotation orbital mechanics.</li>
            </ul>
            <button onClick={() => setShowNavPop(false)} className="mt-6 w-full py-2 bg-white/5 rounded-xl text-[9px] text-gray-400 hover:text-white uppercase tracking-widest border border-white/10 font-bold transition-all">Minimize HUD</button>
          </div>
        )}
      </div>

      {/* 3. Plane Tracker (Pitch & Yaw) - Bottom Right Corner */}
      <div className="absolute bottom-10 right-10 z-[1000] flex flex-col items-end select-none">
        <div 
          onClick={resetView}
          className="group cursor-pointer bg-black/60 backdrop-blur-md border border-blue-500/30 p-4 rounded-xl flex items-center gap-6 shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:border-blue-500/60 transition-all"
        >
          <div className="flex flex-col text-right">
            <div className="flex justify-end gap-4 mb-2">
              <span className="text-[10px] text-blue-400 font-mono uppercase tracking-widest">Pitch:</span>
              <span className="text-[10px] text-white font-mono">{dragRotation.x.toFixed(1)}°</span>
            </div>
            <div className="flex justify-end gap-4">
              <span className="text-[10px] text-blue-400 font-mono uppercase tracking-widest">Yaw:</span>
              <span className="text-[10px] text-white font-mono">{dragRotation.y.toFixed(1)}°</span>
            </div>
            <div className="mt-3 text-[9px] text-yellow-500 uppercase font-black tracking-widest group-hover:text-white transition-colors">
              Reset View Origin
            </div>
          </div>

          <div className="relative w-16 h-16 border border-white/10 rounded-full flex items-center justify-center overflow-hidden">
            <div className="absolute top-0 bottom-0 left-1/2 w-px bg-blue-500/30"></div>
            <div className="absolute left-0 right-0 top-1/2 h-px bg-blue-500/30"></div>
            <div 
              className="absolute w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6] transition-transform duration-100"
              style={{ transform: `translate(${(dragRotation.y / 90) * 32}px, ${(-dragRotation.x / 90) * 32}px)` }}
            ></div>
            <div className="absolute inset-0 border-2 border-dashed border-white/5 rounded-full animate-spin-slow"></div>
          </div>
        </div>
      </div>

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
          className="group/obj absolute w-64 h-64 flex items-center justify-center cursor-pointer transition-all duration-700"
          style={{ 
            zIndex: SYSTEM_CENTER_Z,
            transform: 'translate3d(0, 0, 0)',
            transformStyle: 'preserve-3d'
          }}
        >
          <ThreeDSphere size={256} color="#ffffff" label={data.label} isMonad />
          <div className="absolute inset-0 bg-white/10 rounded-full animate-ping pointer-events-none"></div>
        </div>

        {/* Orbit Plane Circle */}
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
          const strokeWidth = 2 + depthFactor * 3;
          const opacity = 0.4 + depthFactor * 0.4;

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
                <line className="link-energy" x1="50%" y1="50%" x2={`${50 + (x / 14)}%`} y2={`${50 + (y / 14)}%`} stroke={planet.color} strokeWidth={strokeWidth * 1.5} strokeDasharray="20 40" strokeLinecap="round" strokeOpacity={opacity * 0.8} />
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
              <div 
                className="relative pointer-events-auto cursor-pointer group/obj transition-all duration-500" 
                onClick={() => onNodeClick(planet)}
              >
                <ThreeDSphere size={128} color={planet.color} label={planet.label} />
                
                {isVisited && (
                  <div className="absolute top-0 right-0 w-6 h-6 bg-yellow-400 rounded-full animate-pulse shadow-[0_0_25px_#f5a623] z-30"></div>
                )}
                
                {/* Planet Information Pop-up */}
                <div 
                  className="absolute -bottom-36 left-1/2 -translate-x-1/2 w-64 opacity-0 group-hover/obj:opacity-100 transition-all duration-500 bg-black/95 backdrop-blur-xl p-5 rounded-2xl border border-white/10 text-center z-[100] scale-90 group-hover/obj:scale-100 shadow-[0_10px_40px_rgba(0,0,0,0.8)] pointer-events-none"
                  style={{ transform: `translateX(-50%) rotateX(${-dragRotation.x}deg) rotateY(${-dragRotation.y}deg)` }}
                >
                  <h4 className="text-[12px] font-black text-yellow-500 mb-2 uppercase tracking-widest">{planet.label}</h4>
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
                      className="relative pointer-events-auto cursor-pointer group/obj transition-transform duration-300"
                    >
                      <ThreeDSphere size={52} color={moon.color} label={moon.label} isMoon />
                      
                      {/* Moon Information Pop-up on Hover */}
                      <div 
                        className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-48 opacity-0 group-hover/obj:opacity-100 transition-all duration-500 bg-black/95 backdrop-blur-xl p-3 rounded-xl border border-blue-500/30 text-center z-[100] scale-75 group-hover/obj:scale-100 shadow-2xl pointer-events-none"
                        style={{ transform: `translateX(-50%) rotateX(${-dragRotation.x}deg) rotateY(${-dragRotation.y}deg)` }}
                      >
                        <h4 className="text-[9px] font-black text-blue-400 mb-1 uppercase tracking-widest">{moon.label}</h4>
                        <p className="text-[8px] text-gray-400 leading-tight italic">{moon.description}</p>
                      </div>
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
        <div 
          className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-110 pointer-events-none"
          style={{ transform: `translateX(-50%) rotateX(${-dragRotation.x}deg) rotateY(${-dragRotation.y}deg)` }}
        >
          <div className="bg-black/90 backdrop-blur-md px-4 py-2 rounded-xl border border-yellow-500/30 text-[10px] text-yellow-500 uppercase font-black tracking-widest shadow-2xl">
            SeTs Ryu AI Coach
          </div>
        </div>
      </div>

      {/* Consolidated Controls - Bottom Left */}
      <div className="absolute bottom-10 left-10 z-[1000] flex flex-col gap-4">
        <div className="bg-black/85 backdrop-blur-xl p-6 rounded-3xl border border-white/10 w-80 shadow-[0_20px_50px_rgba(0,0,0,0.8)] animate-in fade-in slide-in-from-left-4 duration-500">
           <div className="flex justify-between items-center mb-4">
             <div className="flex items-center gap-3">
               <span className="text-[10px] uppercase font-black text-blue-400 tracking-[0.2em]">Warp Factor</span>
               <button 
                 onClick={() => setIsPaused(!isPaused)}
                 className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-blue-400 hover:text-white transition-all shadow-inner active:scale-95"
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
