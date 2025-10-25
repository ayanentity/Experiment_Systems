"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MultipleNoteQuizPlayer } from "@/components/quiz/MultipleNoteQuizPlayer";
import { MULTIPLE_NOTE_QUESTIONS } from "@/types/multipleNoteQuiz";

/**
 * 複音コースページ
 * 全21問、2〜4音の複音問題、休符あり
 */
export default function MultipleCoursePage() {
  // クイズが完了したかどうかの状態
  const [isCompleted, setIsCompleted] = useState(false);

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
              複音コース完了！
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
        <MultipleNoteQuizPlayer
          questions={MULTIPLE_NOTE_QUESTIONS}
          courseName="複音コース"
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
