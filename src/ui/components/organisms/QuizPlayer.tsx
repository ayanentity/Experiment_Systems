"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { QuizHeader } from "../molecules/QuizHeader";
import { NoteButtonGroup } from "../molecules/NoteButtonGroup";
import { ResultDisplay } from "../molecules/ResultDisplay";
import { useQuizPresenter } from "../../../presentation/hooks/useQuizPresenter";
import { Question, SingleNoteQuestion } from "../../../domain/models/Question";
import { ALL_NOTES, NOTE_CONFIG } from "../../../domain/models/MusicalNote";

/**
 * クイズプレイヤーのProps
 */
interface QuizPlayerProps {
  questions: Question[] | SingleNoteQuestion[];
  courseName: string;
  onComplete: () => void;
}

/**
 * クイズプレイヤーコンポーネント（Organism）
 */
export function QuizPlayer({ questions, courseName, onComplete }: QuizPlayerProps) {
  const {
    currentQuestion,
    userAnswer,
    state,
    correctCount,
    progress,
    total,
    isMultiNote,
    requiredAnswerCount,
    handleNoteClick,
    handleNext,
    handleReset,
    setAudioRef,
    getAudioPath,
  } = useQuizPresenter(questions);

  // 問題が変わったらonCompleteをチェック
  if (progress > total) {
    onComplete();
    return null;
  }

  // 正解の音符配列を取得
  const correctAnswer =
    "note" in currentQuestion ? [currentQuestion.note] : currentQuestion.correctAnswer;

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-4xl">
      {/* ヘッダー */}
      <QuizHeader
        courseName={courseName}
        progress={progress}
        total={total}
        correctCount={correctCount}
      />

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

        {"description" in currentQuestion && currentQuestion.description && (
          <p className="text-lg text-zinc-700 dark:text-zinc-300">
            {currentQuestion.description}
          </p>
        )}

        {!("description" in currentQuestion) && (
          <p className="text-lg text-zinc-700 dark:text-zinc-300">
            この音符は何の音でしょう？
          </p>
        )}

        {/* 選択中の表示（複音の場合） */}
        {isMultiNote && state === "answering" && (
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

        {/* 結果表示 */}
        <ResultDisplay
          state={state}
          userAnswer={userAnswer}
          correctAnswer={correctAnswer}
        />
      </div>

      {/* 音階ボタン */}
      <NoteButtonGroup
        onNoteClick={handleNoteClick}
        disabled={state !== "answering"}
      />

      {/* コントロールボタン */}
      <div className="flex gap-3">
        {state === "answering" && userAnswer.length > 0 && (
          <Button onClick={handleReset} variant="outline" size="lg">
            リセット
          </Button>
        )}
        {state !== "answering" && (
          <Button onClick={handleNext} size="lg">
            {progress < total ? "次の問題" : "結果を見る"}
          </Button>
        )}
      </div>

      {/* 音声要素 */}
      {ALL_NOTES.map((note) => (
        <audio
          key={note}
          ref={(el) => setAudioRef(note, el)}
          src={getAudioPath(note)}
          preload="auto"
        />
      ))}
    </div>
  );
}
