"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { QuizPlayer } from "@/src/ui/components/organisms/QuizPlayer";
import { QuizResultView } from "@/src/ui/components/organisms/QuizResultView";
import { MultipleNoteQuestionRepository } from "@/src/infrastructure/repositories/QuestionRepository";
import { QuizResultRepository } from "@/src/infrastructure/storage/QuizResultRepository";
import { QuizResult } from "@/src/domain/models/QuizResult";

/**
 * 複音コースページ
 * 全21問、2〜4音の複音問題、休符あり
 */
export default function MultipleCoursePage() {
  const [isCompleted, setIsCompleted] = useState(false);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  const courseName = "複音コース";

  // 複音問題を取得
  const repository = new MultipleNoteQuestionRepository();
  const questions = repository.getAll();

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
        <QuizPlayer
          questions={questions}
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
