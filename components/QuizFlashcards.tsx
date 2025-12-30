
import React, { useState } from 'react';

interface QuizFlashcardsProps {
  nodeId: string;
  mode: 'quiz' | 'flashcards';
  onComplete: (score: number) => void;
}

const QUIZ_DATA: Record<string, any[]> = {
  'monad': [
    { question: "What is the Absolute Monad considered in Gnostic theology?", options: ["A physical planet", "The infinite source beyond the material", "A simulated architect"], answer: 1 },
    { question: "How is Gnosis defined in SeTs Ryu?", options: ["Academic studying", "Direct knowing through inner awakening", "Blind ritualistic faith"], answer: 1 },
    { question: "The 'Divine Spark' emanates from...", options: ["The Demiurge", "The Archons", "The Absolute Monad"], answer: 2 },
    { question: "Gnosis is said to be something that is...", options: ["Taught by external masters", "Remembered, not taught", "Purchased through tithes"], answer: 1 },
    { question: "The Monad Treatise describes the nature of reality as...", options: ["Purely material", "Multi-layered complexity", "A random accident"], answer: 1 },
    { question: "According to Gnostic thought, the 'blind God' is...", options: ["The Monad", "The Demiurge", "A benevolent savior"], answer: 1 },
    { question: "Sovereignty is achieved by...", options: ["Following social scripts", "Returning to the Source within", "Building more Matrix layers"], answer: 1 },
    { question: "The Absolute is described as being in...", options: ["Constant noise", "Infinite Silence", "Terminal chaos"], answer: 1 },
    { question: "The goal of Gnostic practice is...", options: ["Material wealth", "Return to oneness", "Becoming an Archon"], answer: 1 },
    { question: "In the context of Gnosis, the physical body is...", options: ["The final destination", "A temporary avatar/vessel", "The source of truth"], answer: 1 }
  ],
  'matrix': [
    { question: "Who is the 'Architect' of limited perception in the Matrix?", options: ["The Monad", "The Demiurge", "Zephyr"], answer: 1 },
    { question: "What do Archons primarily feed on?", options: ["Physical nutrients", "Low-frequency emotional loops", "Pure knowledge"], answer: 1 },
    { question: "The Matrix is governed by what kind of loops?", options: ["Quantum circuits", "Cognitive scripts and fear", "Mathematical constants"], answer: 1 },
    { question: "Breaking the cycle of Samsara requires...", options: ["Increasing Matrix engagement", "Gnostic awareness and stillness", "Biological upgrades"], answer: 1 },
    { question: "The Demiurge is often described as 'blind' because...", options: ["He lacks eyes", "He is unaware of the Monad above", "He refuses to see the future"], answer: 1 },
    { question: "Archons act as what in the human psyche?", options: ["Protectors", "Feedback loops/Control systems", "Direct emanations of truth"], answer: 1 },
    { question: "Which resource discusses the historical context of the Demiurge?", options: ["Chi Kung Audio", "Gnostic Theology Overview", "Cognitive Blog"], answer: 1 },
    { question: "The simulation theory parallels which ancient belief?", options: ["Stoicism", "Gnosticism", "Epicureanism"], answer: 1 },
    { question: "What is the primary mechanic of Matrix control?", options: ["Algorithm/Fear", "Love/Cooperation", "Gravity/Mass"], answer: 0 },
    { question: "To 're-hack' neurology is to...", options: ["Destroy the body", "Differentiate between false and true intent", "Forget the Absolute"], answer: 1 }
  ],
  'chi-kung': [
    { question: "Which biological structure is the primary anchor for SeTs Ryu practice?", options: ["The Spine", "The Vagus Nerve", "The Pineal Gland"], answer: 1 },
    { question: "What is the 'Sound in Body' state?", options: ["Listening to loud music", "A resonant frequency shielding from loops", "Vocalizing every thought"], answer: 1 },
    { question: "Mastery of the Vagus nerve leads to...", options: ["Increased stress", "Emotional regulation and sovereignty", "Better vision"], answer: 1 },
    { question: "The Microcosmic Orbit is a loop of...", options: ["Digital data", "Biological energy/Chi", "Social interactions"], answer: 1 },
    { question: "Resonant Chanting primarily stimulates which cavity?", options: ["Abdominal", "Thoracic/Chest", "Cranial"], answer: 1 },
    { question: "The 4-7-8 breath timing is designed to...", options: ["Hyperventilate", "Reset the nervous system", "Build muscle"], answer: 1 },
    { question: "Active Meditation differs from sitting still by focusing on...", options: ["Emptying the mind", "Bio-energetic movement and circulation", "Sleeping"], answer: 1 },
    { question: "Which resource focuses on Vagus nerve mastery?", options: ["The Monad Blog", "Chi Kung Active Meditation Audio", "Research Paper"], answer: 1 },
    { question: "Chi Kung acts as a 'shield' against...", options: ["External physical attacks", "Cognitive loops and external frequencies", "The Absolute"], answer: 1 },
    { question: "Neurological sovereignty is achieved through...", options: ["Bio-energetic mastery", "Reading more news", "Social media engagement"], answer: 0 }
  ],
  'cognition': [
    { question: "What does HADD stand for in cognitive psychology?", options: ["High Active Digital Drive", "Hypersensitive Agency Detection Device", "Human Adaption Deep Data"], answer: 1 },
    { question: "Neuroplasticity allows the practitioner to...", options: ["Freeze the brain in place", "Rewire the avatar for Gnostic intent", "Forget how to breathe"], answer: 1 },
    { question: "The cognitive bias HADD leads humans to see...", options: ["Only facts", "False agency/patterns in random events", "No agency at all"], answer: 1 },
    { question: "Evolutionary psychology suggests religion is a...", options: ["Mistake", "Byproduct of survival adaptations", "Direct command from the Source"], answer: 1 },
    { question: "Understanding HADD helps practitioners...", options: ["Believe in more demons", "Differentiate between simulation scripts and truth", "Become better at math"], answer: 1 },
    { question: "Cognitive 'scripts' are often compared to...", options: ["Software code for the avatar", "Pure divine inspiration", "Random static"], answer: 0 },
    { question: "The goal of cognitive psychology in SeTs Ryu is...", options: ["Behavioral balance and awareness", "Maximum productivity", "Ego inflation"], answer: 0 },
    { question: "Which resource details HADD research?", options: ["Monad Treatise", "Cognitive Adaptations Research Paper", "Chi Kung Podcast"], answer: 1 },
    { question: "Neuroplasticity is the biological mechanism for...", options: ["Aging", "Growth and intentional change", "Decay"], answer: 1 },
    { question: "Evolutionary origins focus on which detection mechanism?", options: ["Sight", "Agency Detection", "Sound"], answer: 1 }
  ],
  'default': [
    { question: "What is the primary goal of the SeTs Ryu journey?", options: ["Accumulating wealth", "Sovereignty and Gnosis", "Following the Demiurge"], answer: 1 }
  ]
};

const FLASH_DATA: Record<string, any[]> = {
  'monad': [
    { front: "Absolute Monad", back: "The infinite, unmanifested source of all existence." },
    { front: "Gnosis", back: "Direct, experiential knowing of the divine within." },
    { front: "Divine Spark", back: "The fragment of the Monad trapped within the material avatar." },
    { front: "Remembrance", back: "The process of awakening to one's true origin beyond the simulation." },
    { front: "Monad Treatise", back: "The foundational text exploring the nature of the Absolute One." },
    { front: "Infinite Silence", back: "The pure state of consciousness associated with the Source." },
    { front: "Sovereignty", back: "Internal state of freedom from external control systems." },
    { front: "The Source", back: "Another name for the Monad; the non-simulated reality." },
    { front: "The Path", back: "The inward journey of returning to the Absolute." },
    { front: "The Avatar", back: "The biological shell used by the spark in the material realm." }
  ],
  'matrix': [
    { front: "Demiurge", back: "The blind architect of the material world who believes he is the only God." },
    { front: "Archons", back: "Control entities/psychic loops that harvest fear and emotional energy." },
    { front: "The Matrix", back: "The simulated construct of reality governed by scripts." },
    { front: "Samsara", back: "The cycle of material birth and death within the simulation." },
    { front: "Agency Script", back: "A false narrative inserted by the Matrix to control human behavior." },
    { front: "Control System", back: "The overall structure used by the Demiurge to hide the Monad." },
    { front: "Gnostic Theology", back: "The study of these material layers and the path of exit." },
    { front: "Cognitive Loop", back: "A repetitive thought pattern that keeps the mind trapped." },
    { front: "The Architect", back: "A common term for the Demiurge; the builder of the physical." },
    { front: "De-hacking", back: "The process of recognizing and ignoring false Matrix signals." }
  ],
  'chi-kung': [
    { front: "Vagus Nerve", back: "The biological anchor for calm and sovereignty in the body." },
    { front: "Sound in Body", back: "A state of internal resonance that shields against external manipulation." },
    { front: "Microcosmic Orbit", back: "The circulation of energy through the central spinal and frontal channels." },
    { front: "Breath Control", back: "The method of regulating the nervous system through specific patterns." },
    { front: "Active Meditation", back: "Meditation through movement and bio-energetic circulation." },
    { front: "Thoracic Resonator", back: "The chest cavity used to create internal shielding frequencies." },
    { front: "4-7-8 Technique", back: "A specific breathing rhythm to switch to parasympathetic mode." },
    { front: "Chi/Energy", back: "The life force cultivated to strengthen the biological vessel." },
    { front: "Vagal Tone", back: "The strength of the Vagus nerve's ability to regulate emotion." },
    { front: "Gnosis Drive", back: "A metaphor for the directed intent used in bio-energetic practice." }
  ],
  'cognition': [
    { front: "HADD", back: "Hypersensitive Agency Detection Device; the bias to see intent where none exists." },
    { front: "Neuroplasticity", back: "The brain's ability to restructure itself through intentional practice." },
    { front: "Evolutionary Psych", back: "The study of how our biological past shapes our simulation perception." },
    { front: "Cognitive Adaptation", back: "A mental trait evolved for survival that can be 're-hacked'." },
    { front: "Habit Loop", back: "The Cue-Routine-Reward cycle that automates the avatar's life." },
    { front: "Cognitive Science", back: "The modern study of the mind used to validate Gnostic observations." },
    { front: "Agency Bias", back: "The tendency to attribute random events to a conscious entity." },
    { front: "Synaptic Pruning", back: "The process by which the brain deletes unused neural connections." },
    { front: "The Avatar Mind", back: "The programmed part of the self that follows biological scripts." },
    { front: "Intentionality", back: "The directed focus of the true self over the biological scripts." }
  ],
  'default': [
    { front: "SeTs Ryu", back: "The synthesis of Gnosis, Chi Kung, and Cognitive Science." }
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
        <button 
          onClick={() => { setIndex(0); setScore(0); setFinished(false); }}
          className="mt-6 px-6 py-2 bg-white/10 rounded-full text-[10px] uppercase tracking-widest hover:bg-white/20 transition"
        >
          Restart
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white/5 rounded-2xl border border-white/10 min-h-[400px] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Resonance {index + 1} / {data.length}</span>
        <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 transition-all shadow-[0_0_10px_#3b82f6]" style={{ width: `${((index + 1) / data.length) * 100}%` }}></div>
        </div>
      </div>

      {mode === 'quiz' ? (
        <div className="flex-1">
          <h4 className="text-lg font-bold text-white mb-6 leading-tight border-b border-white/5 pb-4">{data[index].question}</h4>
          <div className="space-y-3">
            {data[index].options.map((opt: string, i: number) => (
              <button 
                key={i} 
                onClick={() => handleNext(i)}
                className="w-full text-left p-4 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-blue-900/20 hover:translate-x-1 transition-all text-sm group"
              >
                <span className="inline-block w-6 h-6 rounded bg-white/5 mr-3 text-center text-[10px] group-hover:bg-blue-500 transition-colors">{String.fromCharCode(65 + i)}</span>
                {opt}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center cursor-pointer group" onClick={() => setShowAnswer(!showAnswer)}>
          <div className={`transition-all duration-700 w-full ${showAnswer ? 'rotate-y-180' : ''}`}>
             {!showAnswer ? (
               <div className="p-8 border border-dashed border-white/10 rounded-2xl group-hover:border-blue-500/50 transition-colors">
                 <p className="text-[10px] uppercase text-blue-500 mb-4 tracking-[0.3em] font-black">Subject Frequency</p>
                 <h4 className="text-2xl font-mystic text-white tracking-widest">{data[index].front}</h4>
                 <p className="mt-12 text-[9px] text-gray-600 italic tracking-widest uppercase animate-pulse">Touch to reveal Gnosis...</p>
               </div>
             ) : (
               <div className="p-10 bg-blue-900/10 rounded-2xl border border-blue-500/30 shadow-2xl">
                 <p className="text-[10px] uppercase text-orange-500 mb-6 tracking-[0.3em] font-black">Inner Wisdom</p>
                 <p className="text-gray-200 text-base leading-relaxed font-medium mb-10">{data[index].back}</p>
                 <button 
                  onClick={(e) => { e.stopPropagation(); handleNext(); }}
                  className="px-10 py-3 bg-blue-600 hover:bg-blue-500 rounded-full text-[10px] uppercase tracking-widest font-black transition shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                 >Continue Ascent</button>
               </div>
             )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizFlashcards;
