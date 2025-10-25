import { MusicalNote } from "./MusicalNote";

/**
 * クイズ問題の基本インターフェース
 */
export interface Question {
  /** 問題ID */
  id: string;
  /** 楽譜画像のパス */
  imagePath: string;
  /** 正解の音符配列（ユーザーが押すべきボタン、休符は含まない） */
  correctAnswer: MusicalNote[];
  /** 正解音声の再生シーケンス（休符を含む実際の演奏順） */
  playbackSequence: MusicalNote[];
  /** 問題の説明文 */
  description?: string;
}

/**
 * 単音問題の型定義
 */
export interface SingleNoteQuestion {
  /** 正解の音階 */
  note: MusicalNote;
  /** その音階専用の画像パス */
  imagePath: string;
}

/**
 * クイズの状態
 */
export type QuizState = "answering" | "correct" | "incorrect";

/**
 * クイズの結果
 */
export interface QuizResult {
  isCorrect: boolean;
  userAnswer: MusicalNote[];
  correctAnswer: MusicalNote[];
}
