import { MusicalNote } from "./MusicalNote";

/**
 * 1問あたりの回答結果
 */
export interface QuestionResult {
  questionIndex: number;
  correctAnswer: MusicalNote[];
  userAnswer: MusicalNote[];
  isCorrect: boolean;
  responseTimesMs: number[]; // 各回答までの時間（ミリ秒）の配列
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
  averageResponseTimeMs: number; // 平均回答時間（ミリ秒）
  totalTimeMs: number; // 全体にかかった時間（ミリ秒）
}
