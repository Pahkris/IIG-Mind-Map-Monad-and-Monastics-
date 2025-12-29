
import React from 'react';
import { UserProgress } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { COLORS } from '../constants';

interface ProgressTrackerProps {
  progress: UserProgress;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ progress }) => {
  const TOTAL_NODES = 12; // hubs + planets + moons
  const knowledgeData = [
    { name: 'Completed', value: progress.visitedNodes.length },
    { name: 'Remaining', value: Math.max(0, TOTAL_NODES - progress.visitedNodes.length) },
  ];

  const scoreData = Object.entries(progress.quizScores).map(([id, score]) => ({
    name: id.charAt(0).toUpperCase() + id.slice(1),
    score: score
  }));

  const completionPercent = Math.round((progress.visitedNodes.length / TOTAL_NODES) * 100);

  return (
    <div className="flex flex-col h-full w-full max-w-5xl mx-auto p-8 pt-24 overflow-y-auto pb-32">
      <div className="flex justify-between items-start mb-12">
        <div>
          <h2 className="text-4xl font-mystic text-white tracking-widest mb-2">Scholar Progress</h2>
          <p className="text-sm text-gray-400 uppercase tracking-widest">Tracking Your Journey to Inner Sovereignty</p>
        </div>
        <div className="flex flex-col gap-3">
           <a href="https://www.mindsets.eu/book-online" target="_blank" rel="noopener noreferrer" className="bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded-full text-[10px] font-bold tracking-widest shadow-lg shadow-orange-900/40 transition uppercase text-center">
            Workout Classes
          </a>
          <a href="https://www.mindsets.eu/education-courses" target="_blank" rel="noopener noreferrer" className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full text-[10px] font-bold tracking-widest shadow-lg shadow-blue-900/40 transition uppercase text-center">
            Discovery Workshops
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
        {/* Knowledge Coverage Pie Chart */}
        <div className="bg-black/40 p-8 rounded-3xl border border-white/5 h-[400px] flex flex-col">
          <h3 className="text-sm font-bold text-blue-400 mb-4 uppercase tracking-widest text-center">Knowledge Coverage</h3>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={knowledgeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  <Cell fill={COLORS.brandYellow} />
                  <Cell fill="#111" />
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#000', border: 'none', borderRadius: '8px', fontSize: '10px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center mt-4">
            <p className="text-3xl font-bold">{completionPercent}%</p>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest">Total Gnosis Achieved</p>
          </div>
        </div>

        {/* Quiz Scores Bar Chart */}
        <div className="bg-black/40 p-8 rounded-3xl border border-white/5 h-[400px]">
          <h3 className="text-sm font-bold text-blue-400 mb-4 uppercase tracking-widest text-center">Mastery Scores</h3>
          {scoreData.length > 0 ? (
            <ResponsiveContainer width="100%" height="80%">
              <BarChart data={scoreData}>
                <XAxis dataKey="name" stroke="#555" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis hide domain={[0, 100]} />
                <Tooltip 
                  cursor={{fill: '#222'}} 
                  contentStyle={{ backgroundColor: '#000', border: '1px solid #333', fontSize: '10px' }}
                />
                <Bar dataKey="score" fill={COLORS.brandBlue} radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center italic text-gray-600 text-xs">
              Complete your first quiz to see scores...
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-gradient-to-br from-yellow-500/10 to-transparent rounded-2xl border border-yellow-500/20 text-center">
          <p className="text-[10px] text-yellow-500 uppercase font-bold mb-2 tracking-tighter">Total Modules Visited</p>
          <p className="text-4xl font-mystic">{progress.visitedNodes.length}</p>
        </div>
        <div className="p-6 bg-gradient-to-br from-blue-500/10 to-transparent rounded-2xl border border-blue-500/20 text-center">
          <p className="text-[10px] text-blue-500 uppercase font-bold mb-2 tracking-tighter">Flashcards Mastered</p>
          <p className="text-4xl font-mystic">{Object.keys(progress.flashcardProgress).length}</p>
        </div>
        <div className="p-6 bg-gradient-to-br from-orange-500/10 to-transparent rounded-2xl border border-orange-500/20 text-center">
          <p className="text-[10px] text-orange-500 uppercase font-bold mb-2 tracking-tighter">Days Enrolled</p>
          <p className="text-4xl font-mystic">
            {Math.floor((new Date().getTime() - new Date(progress.joinDate).getTime()) / (1000 * 60 * 60 * 24))}
          </p>
        </div>
      </div>
      
      <div className="mt-12 p-4 bg-white/[0.02] rounded-xl text-[8px] font-mono text-gray-600 text-center">
        STUDY_LOG: MONTHLY_REPORT_SENT_TO_SETS.STAFF@GMAIL.COM | ACTIVE_USER_COUNT: 1
      </div>
    </div>
  );
};

export default ProgressTracker;
