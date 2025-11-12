"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { QuizPlayer } from "@/src/ui/components/organisms/QuizPlayer";
import { FinalQuestionRepository } from "@/src/infrastructure/repositories/QuestionRepository";

/**
 * 最終コースページ
 * 1問のみ、約20音の長いフレーズ、休符あり
 */
export default function FinalCoursePage() {
  const [isCompleted, setIsCompleted] = useState(false);

  // 最終問題を取得
  const repository = new FinalQuestionRepository();
  const question = repository.get();

  const handleComplete = () => {
    setIsCompleted(true);
  };

  // クイズ完了後の結果画面
  if (isCompleted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <main className="flex min-h-screen w-full max-w-4xl flex-col items-center justify-center gap-8 py-16 px-8 bg-white dark:bg-black">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="text-6xl">🏆</div>
            <h1 className="text-5xl font-bold text-black dark:text-zinc-50">
              全コース完了！
            </h1>
            <p className="text-2xl text-transparent bg-clip-text bg-gradient-to-rz from-yellow-400 via-orange-500 to-red-500 font-bold">
              おめでとうございます！
            </p>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 mt-4">
              20音の長いフレーズをクリアしました！
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
        {/* 注意書き */}
        <div className="w-full max-w-2xl p-4 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-200 dark:border-yellow-800 rounded-lg">
          <p className="text-sm text-yellow-800 dark:text-yellow-200 text-center">
            ⚠️ 最終課題：20音の長いフレーズです。集中して挑戦しましょう！
          </p>
        </div>

        <QuizPlayer
          questions={[question]}
          courseName="最終コース"
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
