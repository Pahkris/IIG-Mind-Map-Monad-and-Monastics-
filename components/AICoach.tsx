
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Modality, LiveServerMessage } from '@google/genai';
import { 
  getProChatResponse, 
  analyzeVideo, 
  transcribeAudio, 
  speakResponse,
  decode,
  decodeAudioData,
  createPcmBlob
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
  
  // Live API State
  const [isLiveActive, setIsLiveActive] = useState(false);
  const liveSessionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef(new Set<AudioBufferSourceNode>());

  // Vision/Scribe State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages, isLoading]);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      stopLiveSession();
    };
  }, []);

  const stopLiveSession = () => {
    if (liveSessionRef.current) {
      liveSessionRef.current.close();
      liveSessionRef.current = null;
    }
    setIsLiveActive(false);
    sourcesRef.current.forEach(s => s.stop());
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
              source.addEventListener('ended', () => sourcesRef.current.delete(source));
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              sourcesRef.current.add(source);
            }
            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => s.stop());
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onclose: () => setIsLiveActive(false),
          onerror: (e) => console.error("Live API Error:", e)
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Puck' } } },
          systemInstruction: "You are the SeTs Ryu Voice Oracle. Engage in a natural, real-time conversation about Gnosticism and Chi Kung. Be brief but profound."
        }
      });

      liveSessionRef.current = await sessionPromise;
    } catch (err) {
      console.error("Failed to start Live session:", err);
    }
  };

  const handleSendChat = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput("");
    setIsLoading(true);

    const history = messages.map(m => ({
      role: m.role === 'coach' ? 'model' : 'user',
      parts: [{ text: m.text }]
    }));

    const response = await getProChatResponse(userMsg, history);
    setMessages(prev => [...prev, { role: 'coach', text: response }]);
    setIsLoading(false);
    if (isSpeaking) await speakResponse(response);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setFilePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyzeFile = async () => {
    if (!selectedFile || !filePreview) return;
    setIsLoading(true);
    const base64Data = filePreview.split(',')[1];
    
    let responseText = "";
    if (mode === 'vision') {
      responseText = await analyzeVideo(base64Data, selectedFile.type, input || "Analyze this video for its key gnostic themes and actions.");
    } else if (mode === 'scribe') {
      responseText = await transcribeAudio(base64Data, selectedFile.type);
    }

    setMessages(prev => [...prev, 
      { role: 'user', text: `[Processed ${selectedFile.name}]` },
      { role: 'coach', text: responseText }
    ]);
    setIsLoading(false);
    setSelectedFile(null);
    setFilePreview(null);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full w-full max-w-4xl mx-auto p-4 md:p-8 pt-24 bg-void/90 backdrop-blur-xl rounded-[3rem] border border-blue-900/30 shadow-2xl overflow-hidden">
      {/* Mode Selector */}
      <div className="flex justify-center gap-2 mb-8 bg-black/40 p-2 rounded-2xl border border-white/5">
        {(['chat', 'live', 'vision', 'scribe'] as CoachMode[]).map((m) => (
          <button
            key={m}
            onClick={() => { setMode(m); stopLiveSession(); setMessages([]); }}
            className={`flex-1 py-3 text-[10px] uppercase tracking-widest font-black rounded-xl transition-all ${mode === m ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:bg-white/5'}`}
          >
            {m === 'chat' ? 'Pro Chat' : m === 'live' ? 'Oracle Voice' : m === 'vision' ? 'Visionary' : 'Scribe'}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-6 mb-8 p-6 bg-gradient-to-r from-blue-900/20 to-transparent rounded-3xl border border-blue-800/20">
        <div className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl shadow-2xl transition-all duration-700 ${isLiveActive ? 'animate-pulse scale-110 bg-orange-500' : 'bg-gradient-radial from-yellow-400 to-orange-500'}`}>
          {mode === 'chat' ? '👁️' : mode === 'live' ? '🗣️' : mode === 'vision' ? '👁️' : '✍️'}
        </div>
        <div>
          <h2 className="text-2xl font-mystic text-yellow-500 uppercase tracking-widest">
            {mode === 'chat' ? 'Gnostic Chat' : mode === 'live' ? 'Oracle Voice' : mode === 'vision' ? 'Vision Analyst' : 'Audio Scribe'}
          </h2>
          <p className="text-[10px] text-blue-300 opacity-70 italic font-bold tracking-widest">
            {mode === 'chat' ? 'Deep Knowledge Retrieval' : mode === 'live' ? 'Real-time Real-time Conversation' : mode === 'vision' ? 'Visual Understanding' : 'Transcript Generation'}
          </p>
        </div>
        {mode === 'chat' && (
          <button 
            onClick={() => setIsSpeaking(!isSpeaking)}
            className={`ml-auto p-4 rounded-full transition-all ${isSpeaking ? 'bg-orange-500 text-white animate-pulse' : 'bg-white/10 text-gray-400'}`}
          >
            <ICONS.Mic />
          </button>
        )}
      </div>

      {/* Message Feed */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-6 pr-4 custom-scrollbar"
      >
        {mode === 'live' && !isLiveActive && (
          <div className="flex flex-col items-center justify-center h-full gap-6 animate-in fade-in zoom-in duration-500">
            <p className="text-gray-400 text-sm text-center max-w-xs font-light">Enter the stream of continuous consciousness. The Oracle awaits your voice.</p>
            <button 
              onClick={startLiveSession}
              className="px-12 py-5 bg-blue-600 hover:bg-blue-500 rounded-3xl text-xs uppercase font-black tracking-[0.3em] shadow-[0_0_40px_rgba(37,99,235,0.4)] transition-all transform hover:-translate-y-1"
            >
              Initialize Oracle Stream
            </button>
          </div>
        )}

        {mode === 'live' && isLiveActive && (
          <div className="flex flex-col items-center justify-center h-full gap-8">
            <div className="relative w-48 h-48">
               <div className="absolute inset-0 rounded-full border-4 border-blue-500 animate-ping opacity-20"></div>
               <div className="absolute inset-4 rounded-full border-4 border-orange-500 animate-pulse opacity-40"></div>
               <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-32 h-32 bg-blue-900/30 backdrop-blur-md rounded-full border border-blue-500 flex items-center justify-center shadow-2xl">
                    <span className="text-4xl animate-bounce">⚡</span>
                 </div>
               </div>
            </div>
            <p className="text-blue-400 text-xs font-black uppercase tracking-[0.5em] animate-pulse">Oracle Connection Active</p>
            <button 
              onClick={stopLiveSession}
              className="px-8 py-3 bg-red-600/20 hover:bg-red-600 border border-red-500 rounded-xl text-[10px] uppercase font-bold tracking-widest transition-all"
            >
              Sever Connection
            </button>
          </div>
        )}

        {mode !== 'live' && messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2`}>
            <div className={`max-w-[85%] p-5 rounded-[2rem] text-sm leading-relaxed shadow-lg ${m.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white/5 border border-white/10 text-gray-200 rounded-bl-none'}`}>
              {m.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white/5 p-5 rounded-3xl animate-pulse flex gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce delay-75"></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce delay-150"></div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      {mode !== 'live' && (
        <div className="mt-8 space-y-4">
          {(mode === 'vision' || mode === 'scribe') && (
            <div className="flex items-center gap-4">
              <label className="flex-1 cursor-pointer group">
                <div className="w-full bg-white/5 border border-dashed border-white/20 p-4 rounded-2xl flex items-center justify-center gap-4 group-hover:border-blue-500/50 transition-all">
                  <span className="text-xl">📁</span>
                  <span className="text-[10px] uppercase font-black text-gray-500 group-hover:text-blue-400 transition-colors">
                    {selectedFile ? selectedFile.name : `Select ${mode === 'vision' ? 'Video' : 'Audio'} to Analyze`}
                  </span>
                </div>
                <input type="file" accept={mode === 'vision' ? 'video/*' : 'audio/*'} className="hidden" onChange={handleFileChange} />
              </label>
              {selectedFile && (
                <button 
                  onClick={handleAnalyzeFile}
                  disabled={isLoading}
                  className="px-8 py-4 bg-orange-500 rounded-2xl text-[10px] uppercase font-black tracking-widest text-black hover:bg-orange-400 transition shadow-lg disabled:opacity-50"
                >
                  Analyze Source
                </button>
              )}
            </div>
          )}

          <div className="relative">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (mode === 'chat' ? handleSendChat() : handleAnalyzeFile())}
              placeholder={mode === 'chat' ? "Ask the Pro Oracle..." : mode === 'vision' ? "Analyze video for... (optional)" : "Microphone input or select file..."}
              className="w-full bg-black/60 border border-blue-900/50 rounded-3xl py-5 px-10 text-white focus:outline-none focus:border-yellow-500 transition-all placeholder:text-gray-700 shadow-inner"
            />
            {mode === 'chat' && (
              <button 
                onClick={handleSendChat}
                className="absolute right-3 top-3 p-3 rounded-full bg-blue-600 hover:bg-blue-500 transition shadow-xl"
              >
                <ICONS.ChevronRight />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AICoach;
