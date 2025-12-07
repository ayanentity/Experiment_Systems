"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { QuizHeader } from "../molecules/QuizHeader";
import { NoteButtonGroup } from "../molecules/NoteButtonGroup";
import { ResultDisplay } from "../molecules/ResultDisplay";
import { useQuizPresenter } from "../../../presentation/hooks/useQuizPresenter";
import { Question, SingleNoteQuestion } from "../../../domain/models/Question";
import {
  ALL_NOTES,
  NOTE_CONFIG,
  MusicalNote,
} from "../../../domain/models/MusicalNote";
import { QuizResultRepository } from "../../../infrastructure/storage/QuizResultRepository";

/**
 * クイズプレイヤーのProps
 */
interface QuizPlayerProps {
  questions: Question[] | SingleNoteQuestion[];
  courseName: string;
  onComplete: () => void;
  /** 各問題ごとの正誤表示を隠す（テスト用） */
  hideResult?: boolean;
}

/**
 * クイズプレイヤーコンポーネント（Organism）
 */
export function QuizPlayer({
  questions,
  courseName,
  onComplete,
  hideResult = false,
}: QuizPlayerProps) {
  const {
    currentQuestion,
    userAnswer,
    state,
    correctCount,
    progress,
    total,
    isMultiNote,
    isCompleted,
    requiredAnswerCount,
    timeLimitMs,
    timeLeftMs,
    isPlayingAudio,
    handleNoteClick,
    handleNext,
    handleReset,
    getQuizResult,
    setAudioRef,
    getAudioPath,
  } = useQuizPresenter(questions, courseName);

  // 正解の音符配列を取得
  const correctAnswer =
    "note" in currentQuestion
      ? [currentQuestion.note]
      : currentQuestion.correctAnswer;

  // 単音問題の画像パスを状態に応じて切り替える
  const getSingleNoteImagePath = (note: MusicalNote) => {
    const map: Record<MusicalNote, string> = {
      [MusicalNote.LA]: "a",
      [MusicalNote.SI]: "b",
      [MusicalNote.DO]: "c",
      [MusicalNote.RE]: "d",
      [MusicalNote.MI]: "e",
      [MusicalNote.FA]: "f",
      [MusicalNote.SO]: "g",
      [MusicalNote.C2]: "",
      [MusicalNote.REST]: "", // 使用しない
    };
    const base = map[note];
    if (!base) return "";
    if (state === "answering") {
      return `/question/singletone/${base}.png`;
    }
    return `/question/singletoneAnswer/${base}_answer.png`;
  };

  // 表示する画像パスを決定
  const getPhraseToneImagePath = (basePath: string) => {
    if (!basePath.startsWith("/question/phrasetone/")) {
      return basePath;
    }
    if (state === "answering") {
      return basePath;
    }
    // /question/phrasetone/xxxx.png -> /question/phrasetoneAnswer/xxxx_answer.png
    const filename = basePath.replace("/question/phrasetone/", "");
    const name = filename.replace(".png", "");
    return `/question/phrasetoneAnswer/${name}_answer.png`;
  };

  const displayImageSrc =
    "note" in currentQuestion
      ? getSingleNoteImagePath(currentQuestion.note)
      : getPhraseToneImagePath(currentQuestion.imagePath);

  const totalSeconds =
    timeLimitMs === Infinity ? null : Math.round(timeLimitMs / 1000);
  const leftSeconds =
    timeLeftMs === Infinity ? null : Math.max(0, Math.ceil(timeLeftMs / 1000));

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-4xl">
      {/* ヘッダー */}
      <QuizHeader
        courseName={courseName}
        progress={progress}
        total={total}
        correctCount={correctCount}
      />

      {/* 残り時間表示（基礎コース以外） */}
      {timeLimitMs !== Infinity && (
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          残り時間: {leftSeconds} / {totalSeconds} 秒
        </p>
      )}

      {/* 問題画像と状態表示 */}
      <div className="flex flex-col items-center gap-6 w-full">
        <div className="relative w-full max-w-2xl aspect-3/1 bg-zinc-100 dark:bg-zinc-900 rounded-lg overflow-hidden border-2 border-zinc-200 dark:border-zinc-800">
          <Image
            src={displayImageSrc}
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

        {/* 結果表示（テストモードでは非表示） */}
        {!hideResult && (
          <ResultDisplay
            state={state}
            userAnswer={userAnswer}
            correctAnswer={correctAnswer}
          />
        )}
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
          <Button
            onClick={() => {
              if (isCompleted) {
                // ローカルストレージに保存
                const repository = new QuizResultRepository();
                const quizResult = getQuizResult();
                repository.save(quizResult);

                // 結果画面に遷移
                onComplete();
              } else {
                handleNext();
              }
            }}
            size="lg"
            disabled={isPlayingAudio}
          >
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
