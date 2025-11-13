"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { QuizResult } from "../../../domain/models/QuizResult";
import { NOTE_CONFIG } from "../../../domain/models/MusicalNote";

interface QuizResultViewProps {
  result: QuizResult;
  onRetry: () => void;
}

/**
 * クイズ結果表示コンポーネント
 */
export function QuizResultView({ result, onRetry }: QuizResultViewProps) {
  const { courseName, totalQuestions, correctCount, questions } = result;
  const incorrectCount = totalQuestions - correctCount;
  const accuracy = Math.round((correctCount / totalQuestions) * 100);

  // 間違えた問題のみ抽出
  const incorrectQuestions = questions.filter((q) => !q.isCorrect);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-4xl flex-col items-center justify-center gap-8 py-16 px-8 bg-white dark:bg-black">
        <div className="flex flex-col items-center gap-6 text-center w-full">
          {/* ヘッダー */}
          <div className="text-6xl">{accuracy === 100 ? "🎉" : "📊"}</div>
          <h1 className="text-4xl font-bold text-black dark:text-zinc-50">
            {courseName}完了！
          </h1>

          {/* 正解率 */}
          <div className="flex flex-col items-center gap-2">
            <div className="text-6xl font-bold text-black dark:text-zinc-50">
              {accuracy}%
            </div>
            <p className="text-xl text-zinc-600 dark:text-zinc-400">
              {totalQuestions}問中{correctCount}問正解
            </p>
          </div>

          {/* 統計情報 */}
          <div className="grid grid-cols-2 gap-4 w-full max-w-md mt-4">
            <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-700 dark:text-green-400">
                {correctCount}
              </div>
              <div className="text-sm text-green-600 dark:text-green-500">
                正解
              </div>
            </div>
            <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <div className="text-2xl font-bold text-red-700 dark:text-red-400">
                {incorrectCount}
              </div>
              <div className="text-sm text-red-600 dark:text-red-500">
                不正解
              </div>
            </div>
          </div>

          {/* 間違えた問題の詳細 */}
          {incorrectQuestions.length > 0 && (
            <div className="w-full max-w-2xl mt-8">
              <h2 className="text-2xl font-bold text-black dark:text-zinc-50 mb-4">
                間違えた問題
              </h2>
              <div className="flex flex-col gap-3">
                {incorrectQuestions.map((question) => (
                  <div
                    key={question.questionIndex}
                    className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-zinc-600 dark:text-zinc-400">
                        問題 {question.questionIndex + 1}
                      </div>
                      <div className="flex gap-4 text-sm">
                        <div>
                          <span className="text-zinc-600 dark:text-zinc-400">
                            正解:{" "}
                          </span>
                          <span className="font-bold text-green-700 dark:text-green-400">
                            {question.correctAnswer
                              .map((note) => NOTE_CONFIG[note].label)
                              .join(", ")}
                          </span>
                        </div>
                        <div>
                          <span className="text-zinc-600 dark:text-zinc-400">
                            回答:{" "}
                          </span>
                          <span className="font-bold text-red-700 dark:text-red-400">
                            {question.userAnswer
                              .map((note) => NOTE_CONFIG[note].label)
                              .join(", ")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 完璧な場合のメッセージ */}
          {accuracy === 100 && (
            <p className="text-lg text-zinc-600 dark:text-zinc-400 mt-4">
              パーフェクト！全問正解です！
            </p>
          )}
        </div>

        {/* アクションボタン */}
        <div className="flex gap-4 mt-4">
          <Button onClick={onRetry} size="lg">
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
