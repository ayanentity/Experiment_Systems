"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

/**
 * 単音コースページ
 * 全21問、7つの音階が各3回ずつ順不同で出題
 */
export default function SingleCoursePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-4xl flex-col items-center justify-center gap-8 py-16 px-8 bg-white dark:bg-black">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-4xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            単音コース
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            全21問 - 7つの音階が各3回ずつ出題されます
          </p>
        </div>

        <div className="text-center text-zinc-500 dark:text-zinc-400">
          <p>（実装予定）</p>
        </div>

        <Link href="/">
          <Button variant="outline" size="lg">
            コース選択に戻る
          </Button>
        </Link>
      </main>
    </div>
  );
}
