"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { MusicalNote, NOTE_CONFIG, ALL_NOTES } from "@/types/notes";
import { SingleNoteQuestion } from "@/types/singleNoteQuiz";
import Image from "next/image";

/**
 * 単音クイズプレイヤーコンポーネントのProps
 */
type SingleNoteQuizPlayerProps = {
  /** 問題リスト */
  questions: SingleNoteQuestion[];
  /** コース名 */
  courseName: string;
  /** クイズ完了時のコールバック */
  onComplete: () => void;
};

/**
 * 単音クイズプレイヤーコンポーネント
 * 基礎コースと単音コースで共通使用
 */
export function SingleNoteQuizPlayer({
  questions,
  courseName,
  onComplete,
}: SingleNoteQuizPlayerProps) {
  // 各音階のaudio要素への参照を保持
  const audioRefs = useRef<Record<MusicalNote, HTMLAudioElement | null>>(
    {} as Record<MusicalNote, HTMLAudioElement | null>
  );

  // 現在の問題インデックス
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // クイズの状態（回答中/正解/不正解）
  const [quizState, setQuizState] = useState<
    "answering" | "correct" | "incorrect"
  >("answering");
  // 正解数
  const [correctCount, setCorrectCount] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = currentQuestionIndex + 1;
  const total = questions.length;

  /**
   * 指定された音階を再生する
   */
  const playNote = (note: MusicalNote) => {
    const audio = audioRefs.current[note];
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }
  };

  /**
   * 正解の音を再生する
   */
  const playCorrectAnswer = () => {
    playNote(currentQuestion.note);
  };

  /**
   * ユーザーが音階ボタンをクリックしたときの処理
   */
  const handleNoteClick = (note: MusicalNote) => {
    // 回答中以外はクリック無効
    if (quizState !== "answering") return;

    // クリックした音を再生
    playNote(note);

    // 正解判定
    const isCorrect = note === currentQuestion.note;
    setQuizState(isCorrect ? "correct" : "incorrect");

    // 正解の場合はカウントアップ
    if (isCorrect) {
      setCorrectCount(correctCount + 1);
    } else {
      // 不正解の場合は1秒後に正解の音を再生
      setTimeout(() => {
        playCorrectAnswer();
      }, 1000);
    }
  };

  /**
   * 次の問題に進む
   */
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setQuizState("answering");
    } else {
      // 全問題完了
      onComplete();
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-4xl">
      {/* ヘッダー */}
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-4xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
          {courseName}
        </h1>
        <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
          <span>
            問題 {progress} / {total}
          </span>
          <span>|</span>
          <span>正解数: {correctCount}</span>
        </div>
      </div>

      {/* 問題画像 */}
      <div className="flex flex-col items-center gap-6 w-full">
        <div className="relative w-full max-w-2xl aspect-3/1 bg-zinc-100 dark:bg-zinc-900 rounded-lg overflow-hidden border-2 border-zinc-200 dark:border-zinc-800">
          <Image
            src={currentQuestion.imagePath}
            alt="楽譜の問題"
            fill
            className="object-contain"
            priority
          />
        </div>

        <p className="text-lg text-zinc-700 dark:text-zinc-300">
          この音符は何の音でしょう？
        </p>

        {/* 正解/不正解の表示 */}
        {quizState === "correct" && (
          <div className="flex flex-col items-center gap-4 p-6 bg-green-100 dark:bg-green-900/30 rounded-lg border-2 border-green-500">
            <p className="text-2xl font-bold text-green-700 dark:text-green-400">
              正解！
            </p>
            <p className="text-sm text-green-600 dark:text-green-300">
              正解: {NOTE_CONFIG[currentQuestion.note].label}
            </p>
          </div>
        )}

        {quizState === "incorrect" && (
          <div className="flex flex-col items-center gap-4 p-6 bg-red-100 dark:bg-red-900/30 rounded-lg border-2 border-red-500">
            <p className="text-2xl font-bold text-red-700 dark:text-red-400">
              不正解
            </p>
            <p className="text-sm text-red-600 dark:text-red-300">
              正解: {NOTE_CONFIG[currentQuestion.note].label}
            </p>
          </div>
        )}
      </div>

      {/* 音階ボタン */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {ALL_NOTES.map((note) => (
          <Button
            key={note}
            onClick={() => handleNoteClick(note)}
            variant="default"
            size="lg"
            className="min-w-[80px] h-16 text-lg font-semibold"
            disabled={quizState !== "answering"}
          >
            {NOTE_CONFIG[note].label}
          </Button>
        ))}
      </div>

      {/* 次へボタン */}
      {quizState !== "answering" && (
        <Button onClick={handleNextQuestion} size="lg">
          {currentQuestionIndex < questions.length - 1
            ? "次の問題"
            : "結果を見る"}
        </Button>
      )}

      {/* 音声要素 */}
      {ALL_NOTES.map((note) => (
        <audio
          key={note}
          ref={(el) => {
            audioRefs.current[note] = el;
          }}
          src={`/audio/${NOTE_CONFIG[note].filename}`}
          preload="auto"
        />
      ))}
    </div>
  );
}
