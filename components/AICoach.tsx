
import React, { useState, useEffect, useRef } from 'react';
import { getAIResponse, speakResponse } from '../services/geminiService';
import { UserProgress } from '../types';
import { ICONS, COLORS } from '../constants';

interface AICoachProps {
  progress: UserProgress;
}

const AICoach: React.FC<AICoachProps> = ({ progress }) => {
  const [messages, setMessages] = useState<{role: 'user' | 'coach', text: string}[]>([
    {role: 'coach', text: "Greetings, seeker. I am the SeTs Ryu AI Coach. How may I guide your ascent to the Monad today?"}
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput("");
    setIsLoading(true);

    const context = {
      visitedCount: progress.visitedNodes.length,
      topScores: progress.quizScores,
      lastActive: new Date().toISOString()
    };

    const response = await getAIResponse(userMsg, context);
    setMessages(prev => [...prev, { role: 'coach', text: response }]);
    setIsLoading(false);
    
    if (isSpeaking) {
      await speakResponse(response);
    }
  };

  return (
    <div className="flex flex-col h-full w-full max-w-4xl mx-auto p-8 pt-24 bg-void">
      <div className="flex items-center gap-6 mb-8 p-6 bg-gradient-to-r from-blue-900/20 to-transparent rounded-3xl border border-blue-800/20">
        <div className="w-20 h-20 rounded-full bg-gradient-radial from-yellow-400 to-orange-500 shadow-[0_0_40px_rgba(245,166,35,0.4)] flex items-center justify-center text-4xl">
          👁️
        </div>
        <div>
          <h2 className="text-3xl font-mystic text-yellow-500">The AI Coach</h2>
          <p className="text-sm text-blue-300 opacity-70 italic font-light">"Direct your focus inwards, for there lies the Monad."</p>
        </div>
        <button 
          onClick={() => setIsSpeaking(!isSpeaking)}
          className={`ml-auto p-4 rounded-full transition-all ${isSpeaking ? 'bg-orange-500 text-white shadow-[0_0_20px_rgba(255,127,80,0.5)]' : 'bg-white/10 text-gray-400'}`}
          title="Toggle Voice Output"
        >
          <ICONS.Mic />
        </button>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-6 pr-4 scrollbar-thin scrollbar-thumb-blue-900"
      >
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${m.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white/5 border border-white/10 text-gray-200 rounded-bl-none'}`}>
              {m.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white/5 p-4 rounded-2xl animate-pulse flex gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 relative">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask about Chi Kung, The Matrix, or your progress..."
          className="w-full bg-white/5 border border-blue-900/50 rounded-full py-4 px-8 text-white focus:outline-none focus:border-yellow-500 transition-all placeholder:text-gray-600"
        />
        <button 
          onClick={handleSend}
          className="absolute right-2 top-2 p-2 rounded-full bg-blue-600 hover:bg-blue-500 transition shadow-lg"
        >
          <ICONS.ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default AICoach;
