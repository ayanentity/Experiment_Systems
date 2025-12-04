"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { QuizPlayer } from "@/src/ui/components/organisms/QuizPlayer";
import { QuizResultView } from "@/src/ui/components/organisms/QuizResultView";
import { PrePracticeTestQuestionRepository } from "@/src/infrastructure/repositories/QuestionRepository";
import { QuizResultRepository } from "@/src/infrastructure/storage/QuizResultRepository";
import { QuizResult } from "@/src/domain/models/QuizResult";

/**
 * 事前テストページ
 * 1問のみの長いフレーズ
 */
export default function PrePracticeTestPage() {
  const [isCompleted, setIsCompleted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  const courseName = "事前テスト";

  // テスト問題を取得
  const repository = new PrePracticeTestQuestionRepository();
  const question = repository.get();

  const handleComplete = () => {
    setIsCompleted(true);
  };

  // 「結果を見る」ボタン押下後に結果を読み込む
  useEffect(() => {
    if (isCompleted && showResult) {
      const repository = new QuizResultRepository();
      const result = repository.getByCourseName(courseName);
      setQuizResult(result);
    }
  }, [isCompleted, showResult, courseName]);

  const handleRetry = () => {
    setIsCompleted(false);
    setShowResult(false);
    setQuizResult(null);
  };

  // 結果表示画面（テスト成績）
  if (isCompleted && showResult && quizResult) {
    return <QuizResultView result={quizResult} onRetry={handleRetry} />;
  }

  // テスト完了後のメッセージ画面（正誤は見せない）
  if (isCompleted && !showResult) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <main className="flex min-h-screen w-full max-w-4xl flex-col items-center justify-center gap-8 py-16 px-8 bg-white dark:bg-black">
          <div className="flex flex-col items-center gap-6 text-center">
            <h1 className="text-4xl font-bold text-black dark:text-zinc-50">
              テストお疲れ様です！
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              回答は記録されました。
            </p>
          </div>

          <div className="flex gap-4">
            <Button onClick={() => setShowResult(true)} size="lg">
              結果を見る（テスト成績）
            </Button>
            <Link href="/pre-test/complete">
              <Button variant="outline" size="lg">
                次へ進む
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  // テストプレイ画面
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-4xl flex-col items-center justify-center gap-8 py-16 px-8 bg-white dark:bg-black">
        {/* 注意書き */}
        <div className="w-full max-w-2xl p-4 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-200 dark:border-yellow-800 rounded-lg">
          <p className="text-sm text-yellow-800 dark:text-yellow-200 text-center">
            ⚠️ 事前テスト：結果は後でまとめて表示されます。まずは集中して答えてみましょう。
          </p>
        </div>

        <QuizPlayer
          questions={[question]}
          courseName={courseName}
          onComplete={handleComplete}
          hideResult
        />

      </main>
    </div>
  );
}



