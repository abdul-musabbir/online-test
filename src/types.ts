export interface Question {
  id: number;
  text: string;
  image?: string;
  options: string[];
  correctAnswer: number;
}

export interface UserAnswer {
  questionId: number;
  selectedAnswer: number | null;
}

export interface ExamResult {
  score: number;
  attemptsLeft: number;
  answers: UserAnswer[];
}