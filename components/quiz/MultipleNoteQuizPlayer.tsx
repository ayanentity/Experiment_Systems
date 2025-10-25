"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { MusicalNote, NOTE_CONFIG, ALL_NOTES } from "@/types/notes";
import { QuizQuestion } from "@/types/quiz";
import Image from "next/image";

/**
 * 複音クイズプレイヤーコンポーネントのProps
 */
type MultipleNoteQuizPlayerProps = {
  /** 問題リスト */
  questions: QuizQuestion[];
  /** コース名 */
  courseName: string;
  /** クイズ完了時のコールバック */
  onComplete: () => void;
};

/**
 * 複音クイズプレイヤーコンポーネント
 * 2〜4音の複音問題、休符対応
 */
export function MultipleNoteQuizPlayer({
  questions,
  courseName,
  onComplete,
}: MultipleNoteQuizPlayerProps) {
  // 各音階のaudio要素への参照を保持
  const audioRefs = useRef<Record<MusicalNote, HTMLAudioElement | null>>(
    {} as Record<MusicalNote, HTMLAudioElement | null>
  );

  // 現在の問題インデックス
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // ユーザーが選択した音階の配列
  const [userAnswer, setUserAnswer] = useState<MusicalNote[]>([]);
  // クイズの状態（回答中/正解/不正解）
  const [quizState, setQuizState] = useState<
    "answering" | "correct" | "incorrect"
  >("answering");
  // 正解数
  const [correctCount, setCorrectCount] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];
  // 正解に必要な音符の数（休符は含まない）
  const requiredAnswerCount = currentQuestion.correctAnswer.length;
  // 複数音符の問題かどうか
  const isMultiNote = requiredAnswerCount > 1;
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
   * 正解の音声を再生する関数（休符を含む実際の演奏順で再生）
   */
  const playCorrectAnswer = async () => {
    // playbackSequenceを使用して休符を含めた正しい演奏順で再生
    for (const note of currentQuestion.playbackSequence) {
      if (note === MusicalNote.REST) {
        // 休符の場合は何も再生せず待つだけ
        await new Promise((resolve) => setTimeout(resolve, 500));
      } else {
        const audio = audioRefs.current[note];
        if (audio) {
          audio.currentTime = 0;
          audio.play();
        }
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }
  };

  /**
   * 音階ボタンがクリックされたときの処理
   */
  const handleNoteClick = (note: MusicalNote) => {
    // 回答中以外はクリックを無視
    if (quizState !== "answering") return;

    // 休符以外は音を鳴らす
    if (note !== MusicalNote.REST) {
      playNote(note);
    }
    // 既存の回答に新しい音階を追加（イミュータブルに）
    const newAnswer = [...userAnswer, note];
    setUserAnswer(newAnswer);

    // 必要な音数に達したら自動的に採点
    if (newAnswer.length === requiredAnswerCount) {
      checkAnswer(newAnswer);
    }
  };

  /**
   * ユーザーの回答を採点する関数
   */
  const checkAnswer = (answer: MusicalNote[]) => {
    // 配列の長さと全要素が正解と一致するか確認
    const isCorrect =
      answer.length === currentQuestion.correctAnswer.length &&
      answer.every(
        (note, index) => note === currentQuestion.correctAnswer[index]
      );

    // クイズの状態を正解/不正解に更新
    setQuizState(isCorrect ? "correct" : "incorrect");

    // 正解の場合はカウントアップ
    if (isCorrect) {
      setCorrectCount(correctCount + 1);
    }

    // 1秒後に正解の音声を再生
    setTimeout(() => {
      playCorrectAnswer();
    }, 1000);
  };

  /**
   * 次の問題に進む
   */
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setUserAnswer([]);
      setQuizState("answering");
    } else {
      // 全問題完了
      onComplete();
    }
  };

  /**
   * 回答をリセットする処理
   */
  const handleReset = () => {
    setUserAnswer([]);
    setQuizState("answering");
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

      {/* 問題画像と状態表示 */}
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

        {currentQuestion.description && (
          <p className="text-lg text-zinc-700 dark:text-zinc-300">
            {currentQuestion.description}
          </p>
        )}

        {/* 選択中の表示（複音の場合） */}
        {isMultiNote && quizState === "answering" && (
          <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
            <span>
              選択中: {userAnswer.length} / {requiredAnswerCount}
            </span>
            {userAnswer.length > 0 && (
              <span className="font-mono">
                [{userAnswer.map((n) => NOTE_CONFIG[n].label).join(", ")}]
              </span>
            )}
          </div>
        )}

        {/* 正解表示 */}
        {quizState === "correct" && (
          <div className="flex flex-col items-center gap-4 p-6 bg-green-100 dark:bg-green-900/30 rounded-lg border-2 border-green-500">
            <p className="text-2xl font-bold text-green-700 dark:text-green-400">
              正解！
            </p>
            <p className="text-sm text-green-600 dark:text-green-300">
              正解:{" "}
              {currentQuestion.correctAnswer
                .map((n) => NOTE_CONFIG[n].label)
                .join(" → ")}
            </p>
          </div>
        )}

        {/* 不正解表示 */}
        {quizState === "incorrect" && (
          <div className="flex flex-col items-center gap-4 p-6 bg-red-100 dark:bg-red-900/30 rounded-lg border-2 border-red-500">
            <p className="text-2xl font-bold text-red-700 dark:text-red-400">
              不正解
            </p>
            <p className="text-sm text-red-600 dark:text-red-300">
              あなたの回答:{" "}
              {userAnswer.map((n) => NOTE_CONFIG[n].label).join(" → ")}
            </p>
            <p className="text-sm text-red-600 dark:text-red-300">
              正解:{" "}
              {currentQuestion.correctAnswer
                .map((n) => NOTE_CONFIG[n].label)
                .join(" → ")}
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
            variant={userAnswer.includes(note) ? "secondary" : "default"}
            size="lg"
            className="min-w-[80px] h-16 text-lg font-semibold"
            disabled={quizState !== "answering"}
          >
            {NOTE_CONFIG[note].label}
          </Button>
        ))}
      </div>

      {/* コントロールボタン */}
      <div className="flex gap-3">
        {quizState === "answering" && userAnswer.length > 0 && (
          <Button onClick={handleReset} variant="outline" size="lg">
            リセット
          </Button>
        )}
        {quizState !== "answering" && (
          <Button onClick={handleNextQuestion} size="lg">
            {currentQuestionIndex < questions.length - 1
              ? "次の問題"
              : "結果を見る"}
          </Button>
        )}
      </div>

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
