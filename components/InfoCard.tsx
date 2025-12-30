
import React, { useState } from 'react';
import { NodeData, UserProgress, DetailedInfo } from '../types';
import { COLORS, ICONS, MIND_MAP_DATA } from '../constants';
import QuizFlashcards from './QuizFlashcards';

interface InfoCardProps {
  node: NodeData;
  onClose: () => void;
  progress: UserProgress;
  onQuizComplete: (score: number) => void;
  onNavigate: (node: NodeData) => void;
}

const InfoCard: React.FC<InfoCardProps> = ({ node, onClose, progress, onQuizComplete, onNavigate }) => {
  const [view, setView] = useState<'info' | 'quiz' | 'flashcards'>('info');
  const [activeDetail, setActiveDetail] = useState<DetailedInfo | null>(null);
  const [detailTab, setDetailTab] = useState<'context' | 'techniques' | 'mindsets'>('context');

  const findNodeById = (id: string, searchNode: NodeData = MIND_MAP_DATA): NodeData | null => {
    if (searchNode.id === id) return searchNode;
    if (searchNode.subNodes) {
      for (const sub of searchNode.subNodes) {
        const found = findNodeById(id, sub);
        if (found) return found;
      }
    }
    return null;
  };

  const relatedLinks: Record<string, string[]> = {
    'monad': ['matrix', 'chi-kung'],
    'matrix': ['monad', 'cognition', 'archons'],
    'chi-kung': ['monad', 'vagus'],
    'cognition': ['matrix', 'neuroplasticity'],
    'vagus': ['chi-kung', 'breath'],
    'archons': ['matrix', 'demiurge'],
    'demiurge': ['matrix', 'archons'],
    'neuroplasticity': ['cognition', 'chi-kung']
  };

  const handleNavigateToRelated = (id: string) => {
    const target = findNodeById(id);
    if (target) {
      onNavigate(target);
    }
  };

  return (
    <div className="absolute top-0 right-0 h-full w-full md:w-[500px] bg-void z-[110] border-l border-blue-900/50 shadow-[-20px_0_60px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col">
      {/* Sub-layer Detailed Info (100% Opaque Overlay) */}
      {activeDetail && (
        <div className="absolute inset-0 z-[120] bg-[#050505] flex flex-col animate-in slide-in-from-right duration-300">
          <div className="p-8 border-b border-white/5 bg-black">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-[10px] text-orange-500 uppercase tracking-[0.3em] font-black block mb-1">In-Depth Gnosis</span>
                <h3 className="text-3xl font-mystic text-white leading-tight tracking-wide">
                  {activeDetail.title}
                </h3>
              </div>
              <button 
                onClick={() => { setActiveDetail(null); setDetailTab('context'); }}
                className="p-3 text-gray-500 hover:text-white hover:bg-white/10 rounded-full transition-all flex items-center justify-center border border-white/10"
                title="Return to List"
              >
                <ICONS.Close />
              </button>
            </div>

            {/* Category Toggle Tabs */}
            <div className="flex gap-1 p-1 bg-black rounded-xl border border-white/5 shadow-inner">
              {(['context', 'techniques', 'mindsets'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setDetailTab(t)}
                  className={`flex-1 py-3 text-[9px] uppercase font-black tracking-widest rounded-lg transition-all duration-300 ${detailTab === t ? 'bg-orange-500 text-black shadow-lg shadow-orange-900/20' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'}`}
                >
                  {t === 'context' ? 'Context' : t === 'techniques' ? 'Techniques' : 'Mind SeTs'}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-[#050505]">
            <div className="animate-in fade-in zoom-in-95 duration-500">
              {detailTab === 'context' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]"></div>
                    <h4 className="text-[11px] font-black text-blue-400 uppercase tracking-widest">Theology and Theory</h4>
                  </div>
                  <div className="p-6 bg-white/[0.03] rounded-3xl border border-white/5">
                    <p className="text-gray-200 text-base leading-relaxed font-light">
                      {activeDetail.context}
                    </p>
                  </div>
                </div>
              )}

              {detailTab === 'techniques' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]"></div>
                    <h4 className="text-[11px] font-black text-green-400 uppercase tracking-widest">Practical Techniques</h4>
                  </div>
                  <div className="space-y-4">
                    {activeDetail.techniques.map((tech, i) => (
                      <div key={i} className="flex gap-5 p-6 bg-white/[0.02] rounded-3xl border border-white/5 hover:border-green-500/20 hover:bg-green-500/[0.02] transition-all group">
                        <div className="w-8 h-8 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500 font-mono font-bold text-xs shrink-0 group-hover:bg-green-500 group-hover:text-black transition-colors">
                          {i + 1}
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed group-hover:text-white">{tech}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {detailTab === 'mindsets' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 shadow-[0_0_8px_#eab308]"></div>
                    <h4 className="text-[11px] font-black text-yellow-500 uppercase tracking-widest">Mind SeTs and Skills</h4>
                  </div>
                  <div className="space-y-4">
                    {activeDetail.mindsets.map((ms, i) => (
                      <div key={i} className="flex gap-5 p-6 bg-white/[0.02] rounded-3xl border border-white/5 hover:border-yellow-500/20 hover:bg-yellow-500/[0.02] transition-all group relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-yellow-500/20 group-hover:bg-yellow-500 transition-colors"></div>
                        <p className="text-gray-300 text-sm leading-relaxed group-hover:text-white italic font-medium pl-2">"{ms}"</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="p-8 border-t border-white/5 bg-black">
            <button 
              onClick={() => { setActiveDetail(null); setDetailTab('context'); }}
              className="w-full py-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[10px] uppercase font-black tracking-[0.4em] text-gray-400 hover:text-white transition-all transform hover:-translate-y-1 active:translate-y-0"
            >
              CLOSE SUB-LAYER
            </button>
          </div>
        </div>
      )}

      {/* Main InfoCard Content (Visible when no detail is active) */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
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
            <div className="animate-in fade-in duration-500">
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
                      className={`flex gap-5 items-start bg-black/40 p-5 rounded-2xl border border-white/5 transition-all duration-300 group ${hasDetail ? 'cursor-pointer hover:border-blue-500/60 hover:bg-blue-900/20 hover:translate-x-1 shadow-md' : ''}`}
                    >
                      <div className="w-6 h-6 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold text-xs group-hover:bg-blue-500 group-hover:text-white transition-colors shrink-0 mt-1">
                        {i + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-300 leading-relaxed text-[13px] font-medium group-hover:text-white transition-colors">{item}</p>
                        {hasDetail && (
                          <div className="flex items-center gap-2 mt-3 text-[10px] text-blue-400 font-extrabold uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
                            <span>Explore Detailed Gnosis</span>
                            <div className="w-4 h-[1px] bg-blue-400"></div>
                            <span className="text-lg leading-none mt-1">→</span>
                          </div>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>

              {relatedLinks[node.id] && (
                <div className="mt-10">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-[10px] text-orange-500 uppercase tracking-widest font-bold">Related Gnosis:</span>
                    <div className="h-px flex-1 bg-white/5 ml-4"></div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {relatedLinks[node.id].map(relId => (
                      <button 
                        key={relId}
                        onClick={() => handleNavigateToRelated(relId)}
                        className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-widest hover:bg-orange-500/20 hover:border-orange-500/40 transition group flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 group-hover:animate-pulse"></span>
                        {relId.replace('-', ' ')}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {view === 'flashcards' && (
            <div className="animate-in fade-in duration-500">
              <QuizFlashcards nodeId={node.id} mode="flashcards" onComplete={() => {}} />
            </div>
          )}

          {view === 'quiz' && (
            <div className="animate-in fade-in duration-500">
              <QuizFlashcards nodeId={node.id} mode="quiz" onComplete={onQuizComplete} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
