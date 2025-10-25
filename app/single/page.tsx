"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SingleNoteQuizPlayer } from "@/components/quiz/SingleNoteQuizPlayer";
import { generateSingleNoteQuestions } from "@/types/singleNoteQuiz";

/**
 * 単音コースページ
 * 全21問、7つの音階が各3回ずつ順不同で出題
 */
export default function SingleCoursePage() {
  // クイズが完了したかどうかの状態
  const [isCompleted, setIsCompleted] = useState(false);

  // 問題を生成（各音階3回ずつ = 21問）
  // useMemoでコンポーネント再レンダリング時に問題が変わらないようにする
  const questions = useMemo(() => generateSingleNoteQuestions(3), []);

  // クイズ完了時の処理
  const handleComplete = () => {
    setIsCompleted(true);
  };

  // クイズ完了後の結果画面
  if (isCompleted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <main className="flex min-h-screen w-full max-w-4xl flex-col items-center justify-center gap-8 py-16 px-8 bg-white dark:bg-black">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="text-6xl">🎉</div>
            <h1 className="text-4xl font-bold text-black dark:text-zinc-50">
              単音コース完了！
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              お疲れ様でした！
            </p>
          </div>

          <div className="flex gap-4">
            <Button onClick={() => setIsCompleted(false)} size="lg">
              もう一度挑戦
            </Button>
            <Link href="/">
              <Button variant="outline" size="lg">
                コース選択に戻る
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  // クイズプレイ画面
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-4xl flex-col items-center justify-center gap-8 py-16 px-8 bg-white dark:bg-black">
        <SingleNoteQuizPlayer
          questions={questions}
          courseName="単音コース"
          onComplete={handleComplete}
        />

        <Link href="/">
          <Button variant="ghost" size="sm">
            コース選択に戻る
          </Button>
        </Link>
      </main>
    </div>
  );
}
