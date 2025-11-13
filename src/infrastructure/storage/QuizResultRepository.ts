import { QuizResult } from "../../domain/models/QuizResult";

const STORAGE_KEY = "quiz_results";

/**
 * クイズ結果をローカルストレージに保存・取得するリポジトリ
 */
export class QuizResultRepository {
  /**
   * すべてのクイズ結果を取得
   */
  getAll(): QuizResult[] {
    if (typeof window === "undefined") return [];

    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return [];
      return JSON.parse(data) as QuizResult[];
    } catch (error) {
      console.error("Failed to load quiz results:", error);
      return [];
    }
  }

  /**
   * 特定のコースの結果を取得
   */
  getByCourseName(courseName: string): QuizResult | null {
    const results = this.getAll();
    return results.find((r) => r.courseName === courseName) || null;
  }

  /**
   * クイズ結果を保存（同じコースがある場合は上書き）
   */
  save(result: QuizResult): void {
    if (typeof window === "undefined") return;

    try {
      const results = this.getAll();
      const existingIndex = results.findIndex(
        (r) => r.courseName === result.courseName
      );

      if (existingIndex >= 0) {
        // 既存のデータを上書き
        results[existingIndex] = result;
      } else {
        // 新規追加
        results.push(result);
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
    } catch (error) {
      console.error("Failed to save quiz result:", error);
    }
  }

  /**
   * 特定のコースの結果を削除
   */
  deleteByCourseName(courseName: string): void {
    if (typeof window === "undefined") return;

    try {
      const results = this.getAll();
      const filtered = results.filter((r) => r.courseName !== courseName);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error("Failed to delete quiz result:", error);
    }
  }

  /**
   * すべてのクイズ結果を削除
   */
  deleteAll(): void {
    if (typeof window === "undefined") return;

    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Failed to delete all quiz results:", error);
    }
  }
}
