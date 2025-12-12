"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { QuizResultRepository } from "@/src/infrastructure/storage/QuizResultRepository";
import { QuizResult } from "@/src/domain/models/QuizResult";

/**
 * CSVダウンロード関数
 */
async function downloadCSV(results: QuizResult[]) {
  try {
    const response = await fetch("/result_to_csv", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(results),
    });

    if (!response.ok) {
      throw new Error("Failed to generate CSV");
    }

    // レスポンスからBlobを取得
    const blob = await response.blob();

    // Content-Dispositionヘッダーからファイル名を取得
    const contentDisposition = response.headers.get("Content-Disposition");
    let filename = "quiz_results.csv";
    if (contentDisposition) {
      const match = contentDisposition.match(/filename="(.+)"/);
      if (match) {
        filename = match[1];
      }
    }

    // ダウンロードリンクを作成してクリック
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("CSV download failed:", error);
    alert("CSVのダウンロードに失敗しました");
  }
}

/**
 * 結果一覧画面
 */
export default function ResultsPage() {
  const [results, setResults] = useState<QuizResult[]>([]);

  useEffect(() => {
    const repository = new QuizResultRepository();
    const allResults = repository.getAll();
    setResults(allResults);
  }, []);

  // コースの表示順序を定義
  const courseOrder = [
    "事前テスト",
    "基礎コース",
    "単音コース",
    "複音コース",
    "事後テスト",
  ];

  // 結果をコース順にソート
  const sortedResults = [...results].sort((a, b) => {
    const indexA = courseOrder.indexOf(a.courseName);
    const indexB = courseOrder.indexOf(b.courseName);
    if (indexA === -1 && indexB === -1) return 0;
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  const formatTime = (ms: number): string => {
    const seconds = (ms / 1000).toFixed(1);
    return `${seconds}秒`;
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-4xl flex-col items-center justify-center gap-8 py-16 px-8 bg-white dark:bg-black">
        {/* ヘッダー */}
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-5xl font-bold leading-tight tracking-tight text-black dark:text-zinc-50">
            結果一覧
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            全てのテスト・コースの結果を確認できます
          </p>
        </div>

        {/* 結果がない場合 */}
        {sortedResults.length === 0 && (
          <div className="w-full max-w-2xl p-6 bg-zinc-100 dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 rounded-lg text-center">
            <p className="text-zinc-600 dark:text-zinc-400">
              まだ結果がありません
            </p>
          </div>
        )}

        {/* 結果一覧 */}
        {sortedResults.length > 0 && (
          <div className="w-full max-w-3xl space-y-4">
            {sortedResults.map((result) => {
              const accuracy = Math.round(
                (result.correctCount / result.totalQuestions) * 100
              );
              return (
                <div
                  key={result.courseName}
                  className="bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 rounded-lg p-6"
                >
                  <div className="flex flex-col gap-4">
                    {/* コース名と正解率 */}
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold text-black dark:text-zinc-50">
                        {result.courseName}
                      </h2>
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                        {accuracy}%
                      </div>
                    </div>

                    {/* 統計情報 */}
                    <div className="grid grid-cols-4 gap-4">
                      <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-3">
                        <div className="text-xl font-bold text-green-700 dark:text-green-400">
                          {result.correctCount}
                        </div>
                        <div className="text-xs text-green-600 dark:text-green-500">
                          正解
                        </div>
                      </div>
                      <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-3">
                        <div className="text-xl font-bold text-red-700 dark:text-red-400">
                          {result.totalQuestions - result.correctCount}
                        </div>
                        <div className="text-xs text-red-600 dark:text-red-500">
                          不正解
                        </div>
                      </div>
                      <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                        <div className="text-xl font-bold text-blue-700 dark:text-blue-400">
                          {formatTime(result.averageResponseTimeMs)}
                        </div>
                        <div className="text-xs text-blue-600 dark:text-blue-500">
                          平均時間
                        </div>
                      </div>
                      <div className="bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded-lg p-3">
                        <div className="text-xl font-bold text-purple-700 dark:text-purple-400">
                          {formatTime(result.totalTimeMs)}
                        </div>
                        <div className="text-xs text-purple-600 dark:text-purple-500">
                          合計時間
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* アクションボタン */}
        <div className="flex gap-4 mt-4">
          <Link href="/">
            <Button variant="outline" size="lg">
              最初からやり直す
            </Button>
          </Link>
          {sortedResults.length > 0 && (
            <Button
              variant="default"
              size="lg"
              onClick={() => downloadCSV(sortedResults)}
            >
              CSVダウンロード
            </Button>
          )}
        </div>
      </main>
    </div>
  );
}











