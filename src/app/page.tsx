"use client";

import Link from "next/link";
import { COURSES } from "@/src/infrastructure/data/CourseData";

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
                {/* コース情報 */}
                <div className="flex flex-col gap-3">
                  <h2 className="text-2xl font-bold text-black dark:text-zinc-50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {course.name}
                  </h2>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {course.questionCount}問
                  </p>
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
