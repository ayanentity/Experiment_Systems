"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

/**
 * 事前テスト完了画面
 */
export default function PreTestCompletePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-4xl flex-col items-center justify-center gap-8 py-16 px-8 bg-white dark:bg-black">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="text-6xl">🎉</div>
          <h1 className="text-4xl font-bold text-black dark:text-zinc-50">
            事前テストお疲れ様でした！
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-md">
            回答は記録されました。次は基礎コースの練習に進みましょう。
          </p>
        </div>

        <Link href="/basic/wait">
          <Button size="lg" className="text-lg px-8 py-6">
            基礎コースへ進む
          </Button>
        </Link>
      </main>
    </div>
  );
}











