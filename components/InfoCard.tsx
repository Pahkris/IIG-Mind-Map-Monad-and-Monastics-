
import React, { useState } from 'react';
import { NodeData, UserProgress, DetailedInfo } from '../types';
import { COLORS, ICONS } from '../constants';
import QuizFlashcards from './QuizFlashcards';

interface InfoCardProps {
  node: NodeData;
  onClose: () => void;
  progress: UserProgress;
  onQuizComplete: (score: number) => void;
}

const InfoCard: React.FC<InfoCardProps> = ({ node, onClose, progress, onQuizComplete }) => {
  const [view, setView] = useState<'info' | 'quiz' | 'flashcards'>('info');
  const [activeDetail, setActiveDetail] = useState<DetailedInfo | null>(null);

  return (
    <div className="absolute top-0 right-0 h-full w-full md:w-[500px] bg-void/95 border-l border-blue-900/50 z-[110] overflow-y-auto p-8 shadow-[-20px_0_60px_rgba(0,0,0,0.9)] backdrop-blur-xl transition-all duration-500">
      {/* Detailed Sub-layer Pop-up */}
      {activeDetail && (
        <div className="fixed inset-0 md:absolute inset-0 z-[120] bg-black/98 p-8 md:p-12 flex flex-col animate-in fade-in slide-in-from-right-10 duration-500 overflow-y-auto">
          <div className="flex justify-between items-center mb-8">
             <span className="text-[10px] text-orange-500 uppercase tracking-[0.3em] font-bold">In-Depth Gnosis</span>
             <button 
              onClick={() => setActiveDetail(null)} 
              className="p-3 text-gray-500 hover:text-white hover:bg-white/5 rounded-full transition"
            >
              <ICONS.Close />
            </button>
          </div>
          
          <div className="flex-1">
            <h3 className="text-3xl md:text-4xl font-mystic text-white mb-6 tracking-wider leading-tight border-b border-white/5 pb-4">
              {activeDetail.title}
            </h3>
            
            <div className="space-y-8 pb-10">
              <div>
                <h4 className="text-[11px] font-bold text-blue-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  Core Theory
                </h4>
                <p className="text-gray-300 text-base leading-relaxed font-light bg-white/5 p-6 rounded-2xl border border-white/10">
                  {activeDetail.explanation}
                </p>
              </div>

              <div>
                <h4 className="text-[11px] font-bold text-orange-400 uppercase tracking-widest mb-6 flex items-center gap-3">
                  <div className="w-4 h-[1px] bg-orange-400/50"></div>
                  Practical Exercises
                </h4>
                <div className="space-y-4">
                  {activeDetail.exercises.map((ex, i) => (
                    <div key={i} className="group flex items-start gap-5 bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-orange-500/40 hover:bg-orange-500/5 transition duration-300 shadow-lg">
                      <div className="w-8 h-8 rounded-full bg-orange-500/20 text-orange-500 flex items-center justify-center font-bold text-xs group-hover:bg-orange-500 group-hover:text-black transition-colors shrink-0">
                        {i + 1}
                      </div>
                      <span className="text-sm text-gray-200 font-medium pt-1 group-hover:text-white">{ex}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <button 
            onClick={() => setActiveDetail(null)}
            className="mt-6 w-full py-5 bg-blue-600 rounded-2xl font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-blue-500 transition shadow-[0_10px_30px_rgba(37,99,235,0.4)] transform hover:-translate-y-1"
          >
            Return to {node.label}
          </button>
        </div>
      )}

      <div className="flex justify-between items-center mb-10">
        <div className="flex flex-col">
          <span className="text-[10px] text-blue-500 font-mystic uppercase tracking-[0.2em]">{node.type} frequency active</span>
          <div className="h-0.5 w-12 bg-blue-500 mt-1"></div>
        </div>
        <button onClick={onClose} className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-full transition">
          <ICONS.Close />
        </button>
      </div>

      <h2 className="text-5xl font-mystic text-white mb-6 tracking-wider leading-none">{node.label}</h2>
      <p className="text-gray-400 text-sm leading-relaxed mb-10 border-l-2 border-orange-500/50 pl-6 py-1 italic">
        {node.description}
      </p>

      {/* Enhanced View Switcher */}
      <div className="flex gap-2 mb-10 bg-black/40 p-1.5 rounded-2xl border border-white/5">
        {(['info', 'flashcards', 'quiz'] as const).map((v) => (
          <button 
            key={v}
            onClick={() => setView(v)}
            className={`flex-1 py-3 text-[10px] uppercase tracking-[0.2em] font-bold rounded-xl transition-all duration-300 ${view === v ? 'bg-blue-600 text-white shadow-xl scale-[1.02]' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'}`}
          >
            {v === 'info' ? 'Knowledge' : v}
          </button>
        ))}
      </div>

      <div className="space-y-6 pb-20">
        {view === 'info' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Deep Dive Topics:</span>
              <div className="h-px flex-1 bg-white/5 ml-4"></div>
            </div>
            <ul className="space-y-4">
              {node.content.map((item, i) => {
                const hasDetail = !!node.detailedInfo?.[i];
                return (
                  <li 
                    key={i} 
                    onClick={() => hasDetail && setActiveDetail(node.detailedInfo![i])}
                    className={`flex gap-5 items-start bg-black/40 p-5 rounded-2xl border border-white/5 transition-all duration-300 group ${hasDetail ? 'cursor-pointer hover:border-blue-500/60 hover:bg-blue-900/20 hover:translate-x-1' : ''}`}
                  >
                    <div className="w-6 h-6 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold text-xs group-hover:bg-blue-500 group-hover:text-white transition-colors shrink-0 mt-1">
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-300 leading-relaxed text-[13px] font-medium group-hover:text-white transition-colors">{item}</p>
                      {hasDetail && (
                        <div className="flex items-center gap-2 mt-3 text-[10px] text-blue-400 font-extrabold uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
                          <span>Explore Sub-Layer</span>
                          <div className="w-4 h-[1px] bg-blue-400"></div>
                          <span className="text-lg leading-none mt-1">→</span>
                        </div>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="mt-14 p-8 rounded-3xl bg-gradient-to-br from-blue-900/10 via-black to-transparent border border-blue-800/20 shadow-inner">
              <h3 className="text-[11px] font-bold text-blue-400 mb-6 uppercase tracking-[0.2em] flex items-center gap-3">
                <ICONS.Brain />
                Resources Archive
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <a href="https://www.youtube.com/@Eye_Of_Gnosis" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-red-500/40 hover:bg-red-500/5 transition group">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-red-500 group-hover:animate-ping"></div> 
                    <span className="text-[11px] text-gray-400 group-hover:text-white uppercase tracking-widest font-bold">Gnostic Video Explainer</span>
                  </div>
                  <ICONS.ChevronRight />
                </a>
                <a href="https://www.mindsets.eu/post/monad-to-mindsets" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-blue-500/40 hover:bg-blue-500/5 transition group">
                   <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-blue-500 group-hover:animate-ping"></div> 
                    <span className="text-[11px] text-gray-400 group-hover:text-white uppercase tracking-widest font-bold">The Monad Treatise</span>
                  </div>
                  <ICONS.ChevronRight />
                </a>
              </div>
            </div>
          </div>
        )}

        {view === 'flashcards' && (
          <div className="animate-in fade-in slide-in-from-right-2 duration-500">
            <QuizFlashcards nodeId={node.id} mode="flashcards" onComplete={() => {}} />
          </div>
        )}

        {view === 'quiz' && (
          <div className="animate-in fade-in slide-in-from-left-2 duration-500">
            <QuizFlashcards nodeId={node.id} mode="quiz" onComplete={onQuizComplete} />
          </div>
        )}
      </div>

      <div className="mt-16 pt-10 border-t border-white/5 text-center">
        <p className="text-[10px] text-gray-500 mb-6 tracking-[0.3em] uppercase font-extrabold">Practical Sovereignty</p>
        <div className="flex flex-col gap-4">
          <a 
            href="https://www.mindsets.eu/activity-calendar" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group relative px-10 py-5 bg-yellow-500 rounded-2xl overflow-hidden shadow-[0_15px_40px_rgba(245,166,35,0.3)] transform hover:-translate-y-1 transition-all duration-300"
          >
            <div className="relative z-10 flex items-center justify-center gap-3">
              <span className="text-black font-black text-[12px] uppercase tracking-[0.2em]">Activity Calendar</span>
              <ICONS.ChevronRight />
            </div>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
          </a>
          <p className="text-[9px] text-gray-600 italic tracking-wider">Synchronize with our global monastic study groups.</p>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
