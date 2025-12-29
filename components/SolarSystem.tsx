
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { NodeData } from '../types';
import { COLORS, ICONS } from '../constants';

interface SolarSystemProps {
  data: NodeData;
  onNodeClick: (node: NodeData) => void;
  visitedNodes: string[];
}

const SolarSystem: React.FC<SolarSystemProps> = ({ data, onNodeClick, visitedNodes }) => {
  const [rotation, setRotation] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [dragRotation, setDragRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [showNavPop, setShowNavPop] = useState(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  // Baseline Z-index for the center of the system
  const SYSTEM_CENTER_Z = 500;

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.15) % 360);
    }, 16);
    return () => clearInterval(interval);
  }, [isPaused]);

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

  return (
    <div 
      className="relative w-full h-full flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing" 
      style={{ perspective: '1500px' }}
      onMouseDown={onMouseDown}
    >
      <div 
        className="relative w-full h-full flex items-center justify-center transition-transform duration-300"
        style={{ 
          transform: `rotateX(${dragRotation.x}deg) rotateY(${dragRotation.y}deg)`,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Central Hub: The Monad - Set to Center Z */}
        <div 
          onClick={() => onNodeClick(data)}
          className="group absolute w-64 h-64 rounded-full bg-[radial-gradient(circle_at_30%_30%,#ffffff,#cccccc)] flex items-center justify-center cursor-pointer transition-all duration-700 shadow-[0_0_100px_rgba(255,255,255,0.6)] hover:scale-125 border-4 border-white/5"
          style={{ 
            zIndex: SYSTEM_CENTER_Z,
            transform: 'translate3d(0, 0, 0)',
            transformStyle: 'preserve-3d'
          }}
        >
          <div className="absolute inset-0 bg-white/10 rounded-full animate-ping pointer-events-none"></div>
          <span className="text-black font-mystic text-3xl font-bold tracking-widest text-center px-4 leading-tight drop-shadow-md">
            {data.label}
          </span>
          <div className="absolute -bottom-20 opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-110 whitespace-nowrap bg-black/80 backdrop-blur-md px-6 py-3 rounded-xl border border-white/40 text-xs text-white tracking-[0.2em] shadow-[0_0_50px_rgba(255,255,255,0.3)] uppercase z-50">
            Primary Consciousness Hub
          </div>
        </div>

        {/* Orbits Visual Plane - Stays in background */}
        <div className="absolute w-[950px] h-[950px] border border-blue-500/10 rounded-full pointer-events-none" 
          style={{ 
            transform: 'rotateX(90deg) translateZ(-50px)',
            zIndex: 1 
          }}
        ></div>

        {/* Dynamic Relational Links (Lines) - Integrated into 3D Space */}
        {data.subNodes?.map((planet, index) => {
          const angle = (index * (360 / data.subNodes!.length) + rotation) * (Math.PI / 180);
          const radius = 380;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * 100;
          const z = Math.sin(angle) * radius;

          // Vary weight and opacity based on Z to enhance depth perception
          const depthFactor = (z + radius) / (radius * 2); // 0 to 1
          const strokeWidth = 1 + depthFactor * 3;
          const opacity = 0.2 + depthFactor * 0.6;

          return (
            <div 
              key={`link-container-${planet.id}`}
              className="absolute pointer-events-none"
              style={{ 
                width: '100%', 
                height: '100%', 
                transformStyle: 'preserve-3d',
                zIndex: Math.round(z/2 + SYSTEM_CENTER_Z) // Place links between center and planet
              }}
            >
              <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                <defs>
                  <filter id={`glow-${planet.id}`}>
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                <g>
                  {/* Static Connection Line */}
                  <line 
                    x1="50%" y1="50%" 
                    x2={`${50 + (x / 14)}%`} y2={`${50 + (y / 14)}%`}
                    stroke={planet.color} 
                    strokeWidth={strokeWidth}
                    strokeOpacity={opacity * 0.5}
                    filter={`url(#glow-${planet.id})`}
                  />
                  {/* Energy Flow Animation */}
                  <line 
                    className="link-energy"
                    x1="50%" y1="50%" 
                    x2={`${50 + (x / 14)}%`} y2={`${50 + (y / 14)}%`}
                    stroke={planet.color} 
                    strokeWidth={strokeWidth * 0.8} 
                    strokeDasharray="10 20"
                    strokeLinecap="round"
                    strokeOpacity={opacity}
                    filter={`url(#glow-${planet.id})`}
                  />
                </g>
              </svg>
            </div>
          );
        })}

        {/* Planets and Moons */}
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
                transform: `translate3d(${x}px, ${y}px, ${z}px) scale(${1 + (z / 1000)})`,
                zIndex: Math.round(z + SYSTEM_CENTER_Z), // Correctly occlusion: z > 0 is in front of Monad
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Planet Core - Scoped Trigger */}
              <div 
                className="relative group/planet pointer-events-auto cursor-pointer"
                onClick={() => onNodeClick(planet)}
              >
                <div 
                  className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-700 shadow-2xl relative overflow-hidden ring-1 ring-white/20 group-hover/planet:scale-150 group-hover/planet:ring-white/50`}
                  style={{ background: `radial-gradient(circle at 30% 30%, ${planet.color}, #000000)` }}
                >
                  <div className="absolute inset-0 opacity-40 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                  <span className={`text-[12px] uppercase font-extrabold tracking-widest text-center px-2 z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,1)] transition-transform group-hover/planet:scale-110`}>
                    {planet.label}
                  </span>
                  {isVisited && (
                    <div className="absolute top-2 right-2 w-3 h-3 bg-yellow-400 rounded-full animate-pulse shadow-[0_0_15px_#f5a623] z-20"></div>
                  )}
                </div>

                {/* Planet Label - Only triggers on core hover */}
                <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-56 opacity-0 group-hover/planet:opacity-100 group-hover/planet:-translate-y-4 transition-all duration-500 bg-black/95 backdrop-blur-md p-4 rounded-xl border border-blue-500/50 text-center shadow-[0_10px_40px_rgba(0,0,0,0.8)] pointer-events-none z-[100] scale-90 group-hover/planet:scale-110">
                  <h4 className="text-xs font-bold text-yellow-500 mb-2 uppercase tracking-widest">{planet.label}</h4>
                  <p className="text-[10px] text-gray-300 leading-relaxed font-medium">{planet.description}</p>
                  <div className="mt-2 h-px w-full bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
                </div>
              </div>

              {/* Moons - Positioned relative to the planet */}
              {planet.subNodes?.map((moon, mIdx) => {
                const mAngle = (mIdx * (360 / planet.subNodes!.length) + rotation * 2.5) * (Math.PI / 180);
                const mRadius = 110; 
                const mx = Math.cos(mAngle) * mRadius;
                const my = Math.sin(mAngle) * mRadius;

                return (
                  <div key={moon.id} className="absolute pointer-events-none" style={{ transform: `translate(${mx - 16}px, ${my - 16}px)`, transformStyle: 'preserve-3d' }}>
                    {/* SVG Link from Planet to Moon */}
                    <svg className="absolute inset-0 w-24 h-24 pointer-events-none overflow-visible -translate-x-12 -translate-y-12">
                       <line 
                         x1="50%" y1="50%" x2={`${50 + (Math.cos(mAngle) * 45)}%`} y2={`${50 + (Math.sin(mAngle) * 45)}%`}
                         stroke={moon.color} 
                         strokeWidth="0.5" 
                         strokeOpacity="0.4"
                         strokeDasharray="2 2"
                       />
                    </svg>

                    <div 
                      onClick={(e) => { e.stopPropagation(); onNodeClick(moon); }}
                      className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 hover:scale-[2.5] hover:z-[300] group/moon cursor-pointer shadow-lg pointer-events-auto relative"
                      style={{ 
                        background: `radial-gradient(circle at 30% 30%, ${moon.color}, #111)`,
                        boxShadow: `0 0 15px ${moon.color}60`
                      }}
                    >
                      <span className="text-[8px] font-bold text-white text-center leading-[9px] z-10 px-1 drop-shadow-md group-hover/moon:scale-75 transition-transform">{moon.label}</span>
                      <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover/moon:opacity-100 transition-all scale-50 group-hover/moon:scale-100 bg-black/95 px-3 py-1.5 rounded-lg border border-white/30 whitespace-nowrap text-[9px] text-white shadow-2xl z-[400] tracking-wider uppercase">
                        {moon.label} Assessment
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      <div 
        className="absolute top-32 right-32 z-[1000] cursor-pointer group animate-gentle-glow rounded-full"
        onClick={() => onNodeClick({ id: 'ai-coach', label: 'AI Coach', type: 'coach', color: COLORS.brandYellow, description: 'Ask the Master.', content: [] })}
      >
        <div className="w-24 h-24 bg-gradient-radial from-yellow-400 to-orange-700 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(245,166,35,0.4)] transition-transform duration-500 group-hover:scale-110">
          <div className="absolute inset-0 bg-white/5 rounded-full pointer-events-none"></div>
          <span className="text-4xl filter drop-shadow-lg">👁️</span>
        </div>
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
           <p className="text-[11px] text-center font-mystic tracking-[0.3em] text-yellow-500/80 group-hover:text-yellow-400 transition-colors uppercase">SeTs AI Master</p>
        </div>
      </div>

      <div className="absolute bottom-10 left-10 flex flex-col gap-4 z-[1000]">
        <button 
          onClick={() => setIsPaused(!isPaused)}
          className="flex items-center gap-3 px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs uppercase tracking-widest transition shadow-2xl backdrop-blur-sm"
        >
          {isPaused ? <><ICONS.Play /> Resume Rotation</> : <><ICONS.Pause /> Pause Exploration</>}
        </button>
        <div className="relative">
          <button 
            onClick={() => setShowNavPop(!showNavPop)}
            className="text-[11px] text-blue-400 border-b border-blue-900/50 hover:text-white hover:border-blue-400 transition-all uppercase tracking-widest"
          >
            Navigation Guide (Expand)
          </button>
          {showNavPop && (
            <div className="absolute bottom-12 left-0 w-80 bg-void/95 border border-blue-900/40 p-8 rounded-3xl backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] animate-in fade-in slide-in-from-bottom-4 duration-300">
              <h5 className="text-xs font-bold text-yellow-500 uppercase mb-4 tracking-[0.2em] border-b border-white/5 pb-2">Navigation Mastery</h5>
              <ul className="text-[11px] space-y-3 text-gray-300 leading-relaxed font-mono">
                <li><span className="text-blue-500 font-bold mr-2">DRAG:</span> Left-click & hold empty space to tilt the system.</li>
                <li><span className="text-blue-500 font-bold mr-2">HOVER:</span> Core planets zoom 1.5x; moons zoom 2.5x.</li>
                <li><span className="text-blue-500 font-bold mr-2">CLICK:</span> Engage wormhole tunneling for immersion.</li>
                <li><span className="text-blue-500 font-bold mr-2">ENERGY:</span> Moving light pulses indicate the flow of knowledge.</li>
                <li><span className="text-blue-500 font-bold mr-2">OCCLUSION:</span> Planets naturally pass behind the Monad as they orbit.</li>
              </ul>
              <button onClick={() => setShowNavPop(false)} className="mt-6 w-full py-2 bg-white/5 rounded-lg text-[10px] text-gray-400 hover:text-white uppercase tracking-widest border border-white/5">Close Guide</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SolarSystem;
