"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { QuizPlayer } from "@/src/ui/components/organisms/QuizPlayer";
import { QuizResultView } from "@/src/ui/components/organisms/QuizResultView";
import { SingleNoteQuestionRepository } from "@/src/infrastructure/repositories/QuestionRepository";
import { QuizResultRepository } from "@/src/infrastructure/storage/QuizResultRepository";
import { QuizResult } from "@/src/domain/models/QuizResult";

/**
 * 基礎コースページ
 * 全14問、7つの音階が各2回ずつ順不同で出題
 */
export default function BasicCoursePage() {
  const [isCompleted, setIsCompleted] = useState(false);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  const courseName = "基礎コース";

  // 問題を生成（各音階2回ずつ = 14問）
  const questions = useMemo(() => {
    const repository = new SingleNoteQuestionRepository();
    return repository.generate(2);
  }, []);

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
