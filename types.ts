
export interface DetailedInfo {
  title: string;
  explanation: string;
  exercises: string[];
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
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}
