import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { NodeData } from '../types';
import { COLORS, ICONS } from '../constants';

interface SolarSystemProps {
  data: NodeData;
  onNodeClick: (node: NodeData) => void;
  visitedNodes: string[];
  warpFactor: number;
  setWarpFactor: (val: number) => void;
  isWarping?: boolean;
}

const SolarSystem: React.FC<SolarSystemProps> = ({ data, onNodeClick, visitedNodes, warpFactor, setWarpFactor, isWarping = false }) => {
  const [rotation, setRotation] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [dragRotation, setDragRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [showNavPop, setShowNavPop] = useState(false);
  const [streaks, setStreaks] = useState<{ id: number, x: number, y: number, color: string, speed: number, length: number }[]>([]);
  const lastMousePos = useRef({ x: 0, y: 0 });

  const rotationIncrement = useMemo(() => 0.15 * warpFactor, [warpFactor]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => setRotation(prev => (prev + rotationIncrement) % 360), 16);
    return () => clearInterval(interval);
  }, [isPaused, rotationIncrement]);

  useEffect(() => {
    if (isWarping) {
      const colors = ['#3b82f6', '#f5a623', '#ffffff', '#a855f7'];
      const newStreaks = Array.from({ length: 65 }).map((_, i) => ({
        id: Math.random(),
        x: (Math.random() - 0.5) * 2800,
        y: (Math.random() - 0.5) * 2800,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: 0.35 + Math.random() * 0.45,
        length: 150 + Math.random() * 350
      }));
      setStreaks(newStreaks);
      const timer = setTimeout(() => setStreaks([]), 850);
      return () => clearTimeout(timer);
    }
  }, [isWarping]);

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - lastMousePos.current.x;
    const deltaY = e.clientY - lastMousePos.current.y;
    setDragRotation(prev => ({ x: Math.max(-80, Math.min(80, prev.x + deltaY * 0.2)), y: prev.y + deltaX * 0.2 }));
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

  const ThreeDSphere = ({ size, color, label, isMonad = false }: any) => {
    const bg = isMonad 
      ? `radial-gradient(circle at 30% 30%, #ffffff 0%, #d1d1d1 40%, #888888 70%, #444444 100%)` 
      : `radial-gradient(circle at 35% 35%, ${color} 0%, ${color}CC 30%, #000 90%)`;

    return (
      <div className="relative flex items-center justify-center transition-all duration-500 group-hover/obj:scale-125" style={{ width: size, height: size, transformStyle: 'preserve-3d' }}>
        <div className="absolute inset-0 rounded-full overflow-hidden ring-1 ring-white/10 shadow-[inset_-10px_-10px_30px_rgba(0,0,0,0.8)]" style={{ background: bg }} />
        <div className="absolute inset-0 rounded-full" style={{ background: bg, transform: 'rotateY(90deg)', filter: 'brightness(0.6)' }} />
        <div className="absolute inset-0 rounded-full" style={{ background: bg, transform: 'rotateX(90deg)', filter: 'brightness(0.4)' }} />
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none" style={{ transform: `rotateX(${-dragRotation.x}deg) rotateY(${-dragRotation.y}deg)` }}>
          <span className={`uppercase font-black tracking-[0.2em] text-center px-2 drop-shadow-[0_2px_10px_rgba(0,0,0,1)] text-white group-hover/obj:text-yellow-400 transition-colors ${isMonad ? 'text-2xl font-mystic' : 'text-[11px]'}`}>
            {label}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing" style={{ perspective: '1500px' }} onMouseDown={onMouseDown}>
      <div className="absolute inset-0 z-[150] pointer-events-none" style={{ transformStyle: 'preserve-3d' }}>
        {streaks.map(s => (
          <div key={s.id} className="warp-trail-streak" style={{ '--tx': `${s.x}px`, '--ty': `${s.y}px`, '--color': s.color, height: `${s.length}px`, animationDuration: `${s.speed}s`, left: '50%', top: '50%' } as any} />
        ))}
      </div>

      <div className="relative w-full h-full flex items-center justify-center transition-transform duration-300" style={{ transform: `rotateX(${dragRotation.x}deg) rotateY(${dragRotation.y}deg)`, transformStyle: 'preserve-3d' }}>
        <div onClick={() => onNodeClick(data)} className="group/obj absolute w-72 h-72 flex items-center justify-center cursor-pointer" style={{ zIndex: 500, transformStyle: 'preserve-3d' }}>
          <ThreeDSphere size={280} color="#ffffff" label={data.label} isMonad />
        </div>

        {data.subNodes?.map((planet, index) => {
          const angle = (index * (360 / data.subNodes!.length) + rotation) * (Math.PI / 180);
          const x = Math.cos(angle) * 380;
          const y = Math.sin(angle) * 100;
          const z = Math.sin(angle) * 380;
          return (
            <div key={planet.id} className="absolute" style={{ transform: `translate3d(${x}px, ${y}px, ${z}px) scale(${1 + (z / 1200)})`, zIndex: Math.round(z + 500), transformStyle: 'preserve-3d' }}>
              <div className="relative cursor-pointer group/obj" onClick={() => onNodeClick(planet)}>
                <ThreeDSphere size={128} color={planet.color} label={planet.label} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="absolute bottom-10 left-10 z-[1000] bg-black/85 p-6 rounded-3xl border border-white/10 w-80 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
           <span className="text-[10px] uppercase font-black text-blue-400 tracking-[0.2em]">Warp Factor</span>
           <span className="text-[11px] font-mono text-white bg-blue-900/40 px-3 py-1 rounded-full border border-blue-500/30">x{warpFactor.toFixed(1)}</span>
        </div>
        <input type="range" min="0.5" max="10" step="0.1" value={warpFactor} onChange={(e) => setWarpFactor(parseFloat(e.target.value))} className="w-full h-1 cursor-pointer accent-orange-500" />
      </div>
    </div>
  );
};

export default SolarSystem;