"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { COURSES } from "@/types/course";

/**
 * メインページ - コース選択画面
 */
export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-4xl flex-col items-center justify-center gap-12 py-16 px-8 bg-white dark:bg-black">
        {/* ヘッダー */}
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-5xl font-bold leading-tight tracking-tight text-black dark:text-zinc-50">
            音階クイズ
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            コースを選択してクイズを始めましょう
          </p>
        </div>

        {/* コース選択カード */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
          {COURSES.map((course) => (
            <Link key={course.id} href={course.path}>
              <div className="group relative overflow-hidden rounded-lg border-2 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 transition-all hover:border-zinc-400 dark:hover:border-zinc-600 hover:shadow-lg cursor-pointer">
                {/* 難易度バッジ */}
                <div className="absolute top-4 right-4">
                  <div className="flex gap-1">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${
                          i < course.difficulty
                            ? "bg-blue-500"
                            : "bg-zinc-300 dark:bg-zinc-700"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* コース情報 */}
                <div className="flex flex-col gap-3">
                  <h2 className="text-2xl font-bold text-black dark:text-zinc-50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {course.name}
                  </h2>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {course.description}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs font-medium text-zinc-500 dark:text-zinc-500">
                      問題数: {course.questionCount}問
                    </span>
                  </div>
                </div>

                {/* ホバー時の矢印 */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg
                    className="w-5 h-5 text-blue-600 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* フッター */}
        <div className="text-center text-sm text-zinc-500 dark:text-zinc-500 mt-8">
          <p>各コースをクリックして始めましょう</p>
        </div>
      </main>
    </div>
  );
}
