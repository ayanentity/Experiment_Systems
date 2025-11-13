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
 * 時間を秒数に変換してフォーマット
 */
function formatTime(ms: number): string {
  const seconds = (ms / 1000).toFixed(1);
  return `${seconds}秒`;
}

/**
 * クイズ結果表示コンポーネント
 */
export function QuizResultView({ result, onRetry }: QuizResultViewProps) {
  const {
    courseName,
    totalQuestions,
    correctCount,
    questions,
    averageResponseTimeMs,
    totalTimeMs,
  } = result;
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

          {/* 時間情報 */}
          <div className="grid grid-cols-2 gap-4 w-full max-w-md mt-2">
            <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                {formatTime(averageResponseTimeMs)}
              </div>
              <div className="text-sm text-blue-600 dark:text-blue-500">
                平均回答時間
              </div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
              <div className="text-2xl font-bold text-purple-700 dark:text-purple-400">
                {formatTime(totalTimeMs)}
              </div>
              <div className="text-sm text-purple-600 dark:text-purple-500">
                合計時間
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
                {incorrectQuestions.map((question) => {
                  const totalResponseTime = question.responseTimesMs.reduce(
                    (sum, time) => sum + time,
                    0
                  );
                  return (
                    <div
                      key={question.questionIndex}
                      className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="text-sm text-zinc-600 dark:text-zinc-400">
                          問題 {question.questionIndex + 1}
                        </div>
                        <div className="text-xs text-zinc-500 dark:text-zinc-500">
                          回答時間: {formatTime(totalResponseTime)}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 text-sm">
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
                        {question.responseTimesMs.length > 1 && (
                          <div className="text-xs text-zinc-500 dark:text-zinc-500 mt-1">
                            各回答時間:{" "}
                            {question.responseTimesMs
                              .map((time) => formatTime(time))
                              .join(" → ")}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
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
