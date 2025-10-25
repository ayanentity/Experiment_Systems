"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { QuizPlayer } from "@/src/ui/components/organisms/QuizPlayer";
import { SingleNoteQuestionRepository } from "@/src/infrastructure/repositories/QuestionRepository";

/**
 * 基礎コースページ
 * 全14問、7つの音階が各2回ずつ順不同で出題
 */
export default function BasicCoursePage() {
  const [isCompleted, setIsCompleted] = useState(false);

  // 問題を生成（各音階2回ずつ = 14問）
  const questions = useMemo(() => {
    const repository = new SingleNoteQuestionRepository();
    return repository.generate(2);
  }, []);

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
              基礎コース完了！
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
        <QuizPlayer
          questions={questions}
          courseName="基礎コース"
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
