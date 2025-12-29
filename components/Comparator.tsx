
import React, { useState } from 'react';
import { ICONS } from '../constants';

const COMPARISON_DB: Record<string, any> = {
  'The Monad': { origin: 'Infinite source', nature: 'Absolute silence', goal: 'Return to oneness', mechanics: 'Memory/Gnosis' },
  'The Matrix': { origin: 'Demiurge construct', nature: 'Simulated reality', goal: 'Harvest energy', mechanics: 'Algorithm/Fear' },
  'Chi Kung': { origin: 'Bio-energetic mastery', nature: 'Active meditation', goal: 'Sovereign health', mechanics: 'Breath/Vagus nerve' },
  'Cognitive Psych': { origin: 'Modern neurology', nature: 'Scientific analysis', goal: 'Behavioral balance', mechanics: 'Neuroplasticity' },
};

const Comparator: React.FC = () => {
  const [topicA, setTopicA] = useState("The Monad");
  const [topicB, setTopicB] = useState("The Matrix");

  const dataA = COMPARISON_DB[topicA];
  const dataB = COMPARISON_DB[topicB];

  return (
    <div className="flex flex-col h-full w-full max-w-5xl mx-auto p-8 pt-24">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-4xl font-mystic text-white tracking-widest mb-2">The Comparator</h2>
          <p className="text-sm text-gray-400 uppercase tracking-widest">Bridging Ancient Gnosis & Modern Science</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 text-xs uppercase bg-white/5 border border-white/10 px-4 py-2 rounded hover:bg-white/10 transition">
            Share Via Email
          </button>
          <button className="flex items-center gap-2 text-xs uppercase bg-white/5 border border-white/10 px-4 py-2 rounded hover:bg-white/10 transition">
            Download PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-1">
          <label className="block text-[10px] uppercase text-blue-500 mb-2">Subject Alpha</label>
          <select 
            value={topicA} 
            onChange={(e) => setTopicA(e.target.value)}
            className="w-full bg-white/5 border border-blue-900/40 p-4 rounded-xl text-white outline-none focus:border-yellow-500 transition"
          >
            {Object.keys(COMPARISON_DB).map(k => <option key={k} value={k}>{k}</option>)}
          </select>
        </div>
        <div className="col-span-1 flex items-end justify-center pb-4">
          <ICONS.Compare />
        </div>
        <div className="col-span-1">
          <label className="block text-[10px] uppercase text-blue-500 mb-2">Subject Beta</label>
          <select 
            value={topicB} 
            onChange={(e) => setTopicB(e.target.value)}
            className="w-full bg-white/5 border border-blue-900/40 p-4 rounded-xl text-white outline-none focus:border-yellow-500 transition"
          >
            {Object.keys(COMPARISON_DB).map(k => <option key={k} value={k}>{k}</option>)}
          </select>
        </div>
      </div>

      <div className="mt-12 bg-black/40 rounded-3xl border border-white/5 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/5">
            <tr>
              <th className="p-6 text-[10px] uppercase text-gray-500 w-1/4">Metric</th>
              <th className="p-6 text-sm font-bold text-blue-400">{topicA}</th>
              <th className="p-6 text-sm font-bold text-orange-400">{topicB}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {['origin', 'nature', 'goal', 'mechanics'].map(attr => (
              <tr key={attr} className="hover:bg-white/[0.02] transition">
                <td className="p-6 text-[10px] uppercase text-gray-500 font-mono">{attr}</td>
                <td className="p-6 text-sm text-gray-200">{dataA[attr]}</td>
                <td className="p-6 text-sm text-gray-200">{dataB[attr]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 p-8 bg-blue-900/10 rounded-3xl border border-blue-800/20 italic text-sm text-blue-300 leading-relaxed">
        <strong>Master's Note:</strong> The relationship between {topicA} and {topicB} illustrates the multi-layered complexity of our existence. While one may represent the structure, the other represents the mastery within it. Both are essential for complete Gnosis.
      </div>
    </div>
  );
};

export default Comparator;
