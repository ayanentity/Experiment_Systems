import { MusicalNote } from "./MusicalNote";

/**
 * 1問あたりの回答結果
 */
export interface QuestionResult {
  questionIndex: number;
  correctAnswer: MusicalNote[];
  userAnswer: MusicalNote[];
  isCorrect: boolean;
}

/**
 * コース全体の回答結果
 */
export interface QuizResult {
  courseName: string;
  completedAt: string;
  totalQuestions: number;
  correctCount: number;
  questions: QuestionResult[];
}
