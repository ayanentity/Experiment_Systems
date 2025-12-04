"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

/**
 * 事後テスト待機画面
 */
export default function PostTestWaitPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-4xl flex-col items-center justify-center gap-12 py-16 px-8 bg-white dark:bg-black">
        {/* ヘッダー */}
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-5xl font-bold leading-tight tracking-tight text-black dark:text-zinc-50">
            事後テスト
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            練習の成果を試しましょう
          </p>
        </div>

        {/* 説明 */}
        <div className="w-full max-w-2xl p-6 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-200 dark:border-yellow-800 rounded-lg">
          <h2 className="text-xl font-bold text-yellow-900 dark:text-yellow-100 mb-3 text-center">
            事後テストについて
          </h2>
          <p className="text-sm text-yellow-800 dark:text-yellow-200 text-center leading-relaxed">
            事前テストと同じ形式で、練習の成果を確認します。
            集中して挑戦しましょう。
          </p>
        </div>

        {/* スタートボタン */}
        <Link href="/post-test">
          <Button size="lg" className="text-lg px-8 py-6">
            事後テストを開始
          </Button>
        </Link>
      </main>
    </div>
  );
}

