import { MusicalNote } from "./notes";

/**
 * クイズの問題データ型
 */
export type QuizQuestion = {
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
};

/**
 * クイズ問題リスト
 */
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // 単音問題
  {
    id: "q1",
    imagePath: "/images/quiz/question1.png",
    correctAnswer: [MusicalNote.DO],
    playbackSequence: [MusicalNote.DO],
    description: "この音符は何の音でしょう？",
  },
  {
    id: "q2",
    imagePath: "/images/quiz/question2.png",
    correctAnswer: [MusicalNote.MI],
    playbackSequence: [MusicalNote.MI],
    description: "この音符は何の音でしょう？",
  },

  // 複音問題（休符なし）
  {
    id: "q3",
    imagePath: "/images/quiz/question3.png",
    correctAnswer: [MusicalNote.DO, MusicalNote.MI, MusicalNote.SO],
    playbackSequence: [MusicalNote.DO, MusicalNote.MI, MusicalNote.SO],
    description: "この和音を左から順番に答えてください",
  },
  {
    id: "q4",
    imagePath: "/images/quiz/question4.png",
    correctAnswer: [MusicalNote.RE, MusicalNote.FA],
    playbackSequence: [MusicalNote.RE, MusicalNote.FA],
    description: "この2つの音符を順番に答えてください",
  },
  {
    id: "q5",
    imagePath: "/images/quiz/question5.png",
    correctAnswer: [MusicalNote.SO],
    playbackSequence: [MusicalNote.SO],
    description: "この音符は何の音でしょう？",
  },

  // 複音問題（休符あり）
  {
    id: "q6",
    imagePath: "/images/quiz/question6.png",
    correctAnswer: [MusicalNote.DO, MusicalNote.MI], // 解答は音符のみ
    playbackSequence: [MusicalNote.DO, MusicalNote.REST, MusicalNote.MI], // 再生は休符含む
    description: "この3拍のフレーズを音符だけ答えてください",
  },
  {
    id: "q7",
    imagePath: "/images/quiz/question7.png",
    correctAnswer: [MusicalNote.DO, MusicalNote.RE, MusicalNote.FA], // 解答は音符のみ
    playbackSequence: [MusicalNote.DO, MusicalNote.RE, MusicalNote.REST, MusicalNote.FA], // 再生は休符含む
    description: "この4拍のフレーズを音符だけ答えてください",
  },
  {
    id: "q8",
    imagePath: "/images/quiz/question8.png",
    correctAnswer: [MusicalNote.SO, MusicalNote.LA], // 解答は音符のみ
    playbackSequence: [MusicalNote.REST, MusicalNote.SO, MusicalNote.LA], // 再生は休符含む
    description: "このフレーズを音符だけ答えてください",
  },
];

/**
 * クイズの状態
 * - answering: 回答中
 * - correct: 正解
 * - incorrect: 不正解
 */
export type QuizState = "answering" | "correct" | "incorrect";
