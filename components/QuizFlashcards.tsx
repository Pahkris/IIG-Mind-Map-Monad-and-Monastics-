
import React, { useState } from 'react';

interface QuizFlashcardsProps {
  nodeId: string;
  mode: 'quiz' | 'flashcards';
  onComplete: (score: number) => void;
}

const QUIZ_DATA: Record<string, any[]> = {
  'matrix': [
    { question: "Who is the 'Blind Architect' of the Matrix?", options: ["The Monad", "The Demiurge", "The Archons"], answer: 1 },
    { question: "What do Archons feed on?", options: ["Direct Sunlight", "Etheric Knowledge", "Emotional Loops"], answer: 2 }
  ],
  'chi-kung': [
    { question: "Which nerve is crucial for 'Sound in Body'?", options: ["Optic", "Vagus", "Sciatic"], answer: 1 },
    { question: "Active meditation focuses on...", options: ["Sitting Still", "Bio-energetic Mastery", "Reading Texts"], answer: 1 }
  ],
  'default': [
    { question: "What is Gnosis?", options: ["Blind Faith", "Direct Knowing", "Hierarchical Order"], answer: 1 }
  ]
};

const FLASH_DATA: Record<string, any[]> = {
  'matrix': [
    { front: "Archon", back: "A parasitic entity that harvest fear energy." },
    { front: "The Matrix", back: "The simulated stage set of our current physical reality." }
  ],
  'default': [
    { front: "The Monad", back: "The absolute one; the ultimate source." }
  ]
};

const QuizFlashcards: React.FC<QuizFlashcardsProps> = ({ nodeId, mode, onComplete }) => {
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const data = (mode === 'quiz' ? QUIZ_DATA[nodeId] : FLASH_DATA[nodeId]) || (mode === 'quiz' ? QUIZ_DATA['default'] : FLASH_DATA['default']);

  const handleNext = (choice?: number) => {
    if (mode === 'quiz') {
      if (choice === data[index].answer) setScore(s => s + 1);
    }
    
    if (index < data.length - 1) {
      setIndex(i => i + 1);
      setShowAnswer(false);
    } else {
      setFinished(true);
      if (mode === 'quiz') onComplete(Math.round(((score + (choice === data[index].answer ? 1 : 0)) / data.length) * 100));
    }
  };

  if (finished) {
    return (
      <div className="p-8 bg-blue-900/20 rounded-2xl text-center border border-blue-800/40">
        <h4 className="text-xl font-mystic mb-2 text-white">Assessment Complete</h4>
        {mode === 'quiz' && <p className="text-yellow-500 font-bold text-4xl mb-4">{Math.round((score/data.length)*100)}%</p>}
        <p className="text-gray-400 text-sm">You have deepened your resonance with this frequency.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white/5 rounded-2xl border border-white/10 min-h-[300px] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <span className="text-[10px] text-gray-500 uppercase">Item {index + 1} of {data.length}</span>
        <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 transition-all" style={{ width: `${((index + 1) / data.length) * 100}%` }}></div>
        </div>
      </div>

      {mode === 'quiz' ? (
        <div className="flex-1">
          <h4 className="text-lg font-bold text-white mb-6 leading-tight">{data[index].question}</h4>
          <div className="space-y-3">
            {data[index].options.map((opt: string, i: number) => (
              <button 
                key={i} 
                onClick={() => handleNext(i)}
                className="w-full text-left p-4 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-blue-900/10 transition text-sm"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center cursor-pointer group" onClick={() => setShowAnswer(!showAnswer)}>
          <div className={`transition-all duration-700 w-full ${showAnswer ? 'rotate-y-180' : ''}`}>
             {!showAnswer ? (
               <div className="p-8">
                 <p className="text-[10px] uppercase text-blue-500 mb-4 tracking-widest">Question</p>
                 <h4 className="text-2xl font-mystic text-white">{data[index].front}</h4>
                 <p className="mt-8 text-[8px] text-gray-600 italic">Click to flip...</p>
               </div>
             ) : (
               <div className="p-8 bg-blue-900/10 rounded-xl">
                 <p className="text-[10px] uppercase text-orange-500 mb-4 tracking-widest">Enlightenment</p>
                 <p className="text-gray-200 text-sm leading-relaxed">{data[index].back}</p>
                 <button 
                  onClick={(e) => { e.stopPropagation(); handleNext(); }}
                  className="mt-8 px-6 py-2 bg-blue-600 rounded-full text-xs uppercase tracking-widest font-bold"
                 >Next</button>
               </div>
             )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizFlashcards;
