"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

/**
 * 複音コース待機画面
 */
export default function MultipleWaitPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-4xl flex-col items-center justify-center gap-12 py-16 px-8 bg-white dark:bg-black">
        {/* ヘッダー */}
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-5xl font-bold leading-tight tracking-tight text-black dark:text-zinc-50">
            複音コース
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            2〜4音のフレーズを練習します（全20問）
          </p>
        </div>

        {/* 説明 */}
        <div className="w-full max-w-2xl p-6 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg">
          <h2 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-3 text-center">
            複音コースについて
          </h2>
          <p className="text-sm text-blue-800 dark:text-blue-200 text-center leading-relaxed">
            複数の音を順番に答える練習です。休符も含まれます。
          </p>
        </div>

        {/* スタートボタン */}
        <Link href="/multiple">
          <Button size="lg" className="text-lg px-8 py-6">
            複音コースを開始
          </Button>
        </Link>
      </main>
    </div>
  );
}

