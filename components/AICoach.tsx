import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Modality, LiveServerMessage } from '@google/genai';
import { 
  speakResponse,
  decode,
  decodeAudioData,
  createPcmBlob,
  analyzeVideo,
  transcribeAudio
} from '../services/geminiService';
import { UserProgress } from '../types';
import { ICONS, COLORS } from '../constants';

interface AICoachProps {
  progress: UserProgress;
}

type CoachMode = 'chat' | 'live' | 'vision' | 'scribe';

const AICoach: React.FC<AICoachProps> = ({ progress }) => {
  const [mode, setMode] = useState<CoachMode>('chat');
  const [messages, setMessages] = useState<{role: 'user' | 'coach', text: string}[]>([
    {role: 'coach', text: "Seeker, I am the SeTs Ryu Master. How shall we manifest your intent today?"}
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const liveSessionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef(new Set<AudioBufferSourceNode>());
  const scrollRef = useRef<HTMLDivElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isLiveActive, setIsLiveActive] = useState(false);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages, isLoading]);

  const stopLiveSession = () => {
    if (liveSessionRef.current) {
      liveSessionRef.current.close();
      liveSessionRef.current = null;
    }
    setIsLiveActive(false);
    sourcesRef.current.forEach(s => { try { s.stop(); } catch(e) {} });
    sourcesRef.current.clear();
  };

  const startLiveSession = async () => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      audioContextRef.current = outputCtx;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        callbacks: {
          onopen: () => {
            setIsLiveActive(true);
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const pcmBlob = createPcmBlob(inputData);
              sessionPromise.then(session => session.sendRealtimeInput({ media: pcmBlob }));
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio) {
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputCtx.currentTime);
              const buffer = await decodeAudioData(decode(base64Audio), outputCtx, 24000, 1);
              const source = outputCtx.createBufferSource();
              source.buffer = buffer;
              source.connect(outputCtx.destination);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              sourcesRef.current.add(source);
            }
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Puck' } } },
          systemInstruction: "You are the SeTs Ryu Master. Engage in brief but deep Gnostic dialogue."
        }
      });
      liveSessionRef.current = await sessionPromise;
    } catch (err) { console.error(err); }
  };

  const handleSendChat = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput("");
    setIsLoading(true);

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: [{ role: 'user', parts: [{ text: userMsg }] }],
        config: {
          systemInstruction: "You are the SeTs Ryu Master. Use Gnostic reasoning to bridge ancient knowledge and modern science. Mention the Akashic Records if relevant to the seeker's query.",
          thinkingConfig: { thinkingBudget: 4000 }
        }
      });
      
      const responseText = response.text || "The Pleroma is silent.";
      setMessages(prev => [...prev, { role: 'coach', text: responseText }]);
      if (isSpeaking) await speakResponse(responseText);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'coach', text: "The stream is disrupted. Focus your intent." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full max-w-4xl mx-auto p-4 md:p-8 pt-24 bg-void/90 backdrop-blur-xl rounded-[3rem] border border-blue-900/30 shadow-2xl overflow-hidden">
      <div className="flex justify-center gap-2 mb-8 bg-black/40 p-2 rounded-2xl border border-white/5">
        {(['chat', 'live', 'vision', 'scribe'] as CoachMode[]).map((m) => (
          <button
            key={m}
            onClick={() => { setMode(m); stopLiveSession(); setMessages([]); }}
            className={`flex-1 py-3 text-[10px] uppercase tracking-widest font-black rounded-xl transition-all ${mode === m ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:bg-white/5'}`}
          >
            {m}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto space-y-6 pr-4 custom-scrollbar" ref={scrollRef}>
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2`}>
            <div className={`max-w-[85%] p-5 rounded-[2rem] text-sm leading-relaxed shadow-lg ${m.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white/5 border border-white/10 text-gray-200 rounded-bl-none'}`}>
              {m.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start items-center gap-4">
            <div className="bg-white/5 p-5 rounded-3xl animate-pulse flex gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce delay-75"></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce delay-150"></div>
            </div>
            <span className="text-[10px] text-gray-600 uppercase font-black tracking-widest italic animate-pulse">Consulting the Akashic Records...</span>
          </div>
        )}
      </div>

      <div className="mt-8 relative">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
          placeholder="Ask the Master..."
          className="w-full bg-black/60 border border-blue-900/50 rounded-3xl py-5 px-10 text-white outline-none focus:border-yellow-500 transition-all"
        />
        <button onClick={handleSendChat} className="absolute right-3 top-3 p-3 rounded-full bg-blue-600 hover:bg-blue-500 transition">
          <ICONS.ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default AICoach;