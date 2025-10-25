import { MusicalNote } from "../../domain/models/MusicalNote";
import { Question, QuizState, SingleNoteQuestion } from "../../domain/models/Question";

/**
 * クイズのビューモデル（状態管理）
 */
export class QuizViewModel {
  // 現在の問題インデックス
  currentQuestionIndex: number = 0;
  // ユーザーの回答
  userAnswer: MusicalNote[] = [];
  // クイズの状態
  state: QuizState = "answering";
  // 正解数
  correctCount: number = 0;
  // クイズ完了フラグ
  isCompleted: boolean = false;

  constructor(
    public questions: Question[] | SingleNoteQuestion[],
    private onStateChange: () => void
  ) {}

  /**
   * 現在の問題を取得
   */
  get currentQuestion(): Question | SingleNoteQuestion {
    return this.questions[this.currentQuestionIndex];
  }

  /**
   * 必要な回答数を取得
   */
  get requiredAnswerCount(): number {
    const question = this.currentQuestion;
    if ("correctAnswer" in question) {
      return question.correctAnswer.length;
    }
    return 1; // SingleNoteQuestion
  }

  /**
   * 進捗状況を取得
   */
  get progress(): number {
    return this.currentQuestionIndex + 1;
  }

  /**
   * 総問題数を取得
   */
  get total(): number {
    return this.questions.length;
  }

  /**
   * 複数音符問題かどうか
   */
  get isMultiNote(): boolean {
    return this.requiredAnswerCount > 1;
  }

  /**
   * 回答を追加
   */
  addAnswer(note: MusicalNote) {
    this.userAnswer = [...this.userAnswer, note];
    this.onStateChange();
  }

  /**
   * 回答をリセット
   */
  resetAnswer() {
    this.userAnswer = [];
    this.state = "answering";
    this.onStateChange();
  }

  /**
   * クイズの状態を更新
   */
  setState(state: QuizState) {
    this.state = state;
    this.onStateChange();
  }

  /**
   * 正解数を増やす
   */
  incrementCorrectCount() {
    this.correctCount++;
    this.onStateChange();
  }

  /**
   * 次の問題に進む
   */
  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.userAnswer = [];
      this.state = "answering";
      this.onStateChange();
    } else {
      this.isCompleted = true;
      this.onStateChange();
    }
  }

  /**
   * クイズを完了にする
   */
  complete() {
    this.isCompleted = true;
    this.onStateChange();
  }
}
