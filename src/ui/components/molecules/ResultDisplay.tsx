import { MusicalNote, NOTE_CONFIG } from "../../../domain/models/MusicalNote";
import { QuizState } from "../../../domain/models/Question";

/**
 * 結果表示のProps
 */
interface ResultDisplayProps {
  state: QuizState;
  userAnswer?: MusicalNote[];
  correctAnswer: MusicalNote[];
}

/**
 * 結果表示コンポーネント（Molecule）
 */
export function ResultDisplay({
  state,
  userAnswer,
  correctAnswer,
}: ResultDisplayProps) {
  if (state === "answering") return null;

  if (state === "correct") {
    return (
      <div className="flex flex-col items-center gap-4 p-6 bg-green-100 dark:bg-green-900/30 rounded-lg border-2 border-green-500">
        <p className="text-2xl font-bold text-green-700 dark:text-green-400">
          正解！
        </p>
        <p className="text-sm text-green-600 dark:text-green-300">
          正解: {correctAnswer.map((n) => NOTE_CONFIG[n].label).join(" → ")}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-red-100 dark:bg-red-900/30 rounded-lg border-2 border-red-500">
      <p className="text-2xl font-bold text-red-700 dark:text-red-400">
        不正解
      </p>
      {userAnswer && (
        <p className="text-sm text-red-600 dark:text-red-300">
          あなたの回答: {userAnswer.map((n) => NOTE_CONFIG[n].label).join(" → ")}
        </p>
      )}
      <p className="text-sm text-red-600 dark:text-red-300">
        正解: {correctAnswer.map((n) => NOTE_CONFIG[n].label).join(" → ")}
      </p>
    </div>
  );
}
