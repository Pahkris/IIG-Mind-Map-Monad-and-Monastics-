
export interface DetailedInfo {
  title: string;
  context: string;        // Theology and Theory
  techniques: string[];   // Practical Techniques
  mindsets: string[];     // Mind SeTs and Skills
}

export interface NodeData {
  id: string;
  label: string;
  type: 'hub' | 'planet' | 'moon' | 'coach';
  color: string;
  description: string;
  content: string[];
  detailedInfo?: Record<number, DetailedInfo>; // Map index of content to detailed info
  subNodes?: NodeData[];
  parentId?: string;
  weight?: number;
}

export interface UserProgress {
  visitedNodes: string[];
  quizScores: Record<string, number>;
  flashcardProgress: Record<string, boolean>;
  joinDate: string;
  lastQuizResult?: { nodeId: string; score: number }; // Track for AI Coach feedback
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}
