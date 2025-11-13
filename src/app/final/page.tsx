"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { QuizPlayer } from "@/src/ui/components/organisms/QuizPlayer";
import { QuizResultView } from "@/src/ui/components/organisms/QuizResultView";
import { FinalQuestionRepository } from "@/src/infrastructure/repositories/QuestionRepository";
import { QuizResultRepository } from "@/src/infrastructure/storage/QuizResultRepository";
import { QuizResult } from "@/src/domain/models/QuizResult";

/**
 * 最終コースページ
 * 1問のみ、約20音の長いフレーズ、休符あり
 */
export default function FinalCoursePage() {
  const [isCompleted, setIsCompleted] = useState(false);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  const courseName = "最終コース";

  // 最終問題を取得
  const repository = new FinalQuestionRepository();
  const question = repository.get();

  const handleComplete = () => {
    setIsCompleted(true);
  };

  // クイズ完了時にローカルストレージから結果を読み込む
  useEffect(() => {
    if (isCompleted) {
      const repository = new QuizResultRepository();
      const result = repository.getByCourseName(courseName);
      setQuizResult(result);
    }
  }, [isCompleted]);

  const handleRetry = () => {
    setIsCompleted(false);
    setQuizResult(null);
  };

  // クイズ完了後の結果画面
  if (isCompleted && quizResult) {
    return <QuizResultView result={quizResult} onRetry={handleRetry} />;
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
          courseName={courseName}
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
