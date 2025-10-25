/**
 * 進捗表示のProps
 */
interface ProgressIndicatorProps {
  current: number;
  total: number;
  correctCount: number;
}

/**
 * 進捗表示コンポーネント（Atom）
 */
export function ProgressIndicator({
  current,
  total,
  correctCount,
}: ProgressIndicatorProps) {
  return (
    <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
      <span>
        問題 {current} / {total}
      </span>
      <span>|</span>
      <span>正解数: {correctCount}</span>
    </div>
  );
}
