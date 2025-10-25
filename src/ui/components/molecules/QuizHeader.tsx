import { ProgressIndicator } from "../atoms/ProgressIndicator";

/**
 * クイズヘッダーのProps
 */
interface QuizHeaderProps {
  courseName: string;
  progress: number;
  total: number;
  correctCount: number;
}

/**
 * クイズヘッダーコンポーネント（Molecule）
 */
export function QuizHeader({
  courseName,
  progress,
  total,
  correctCount,
}: QuizHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <h1 className="text-4xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
        {courseName}
      </h1>
      <ProgressIndicator current={progress} total={total} correctCount={correctCount} />
    </div>
  );
}
