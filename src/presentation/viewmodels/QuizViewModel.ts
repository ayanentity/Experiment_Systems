import { MusicalNote } from "../../domain/models/MusicalNote";
import { Question, QuizState, SingleNoteQuestion } from "../../domain/models/Question";
import { QuizResult, QuestionResult } from "../../domain/models/QuizResult";

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
  // 各問題の回答履歴
  private questionResults: QuestionResult[] = [];
  // 時間測定用
  private questionStartTime: number = 0; // 問題開始時刻
  private lastAnswerTime: number = 0; // 前回の回答時刻
  private currentResponseTimes: number[] = []; // 現在の問題の各回答時間
  private quizStartTime: number = Date.now(); // クイズ全体の開始時刻

  constructor(
    public questions: Question[] | SingleNoteQuestion[],
    private courseName: string,
    private onStateChange: () => void
  ) {
    this.startQuestionTimer();
  }

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
    // 回答時間を記録
    const now = Date.now();
    const timeFromStart = this.lastAnswerTime === 0
      ? now - this.questionStartTime  // 1つ目の回答: 問題開始からの時間
      : now - this.lastAnswerTime;    // 2つ目以降: 前回の回答からの時間

    this.currentResponseTimes.push(timeFromStart);
    this.lastAnswerTime = now;

    this.userAnswer = [...this.userAnswer, note];
    this.onStateChange();
  }

  /**
   * 回答をリセット
   */
  resetAnswer() {
    this.userAnswer = [];
    this.currentResponseTimes = [];
    this.lastAnswerTime = 0;
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
      // 次の問題のタイマーを開始
      this.startQuestionTimer();
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

  /**
   * 問題のタイマーを開始
   */
  private startQuestionTimer() {
    this.questionStartTime = Date.now();
    this.lastAnswerTime = 0;
    this.currentResponseTimes = [];
  }

  /**
   * 現在の問題の回答結果を記録
   */
  recordCurrentQuestionResult(isCorrect: boolean) {
    const question = this.currentQuestion;
    const correctAnswer =
      "note" in question ? [question.note] : question.correctAnswer;

    this.questionResults.push({
      questionIndex: this.currentQuestionIndex,
      correctAnswer,
      userAnswer: [...this.userAnswer],
      isCorrect,
      responseTimesMs: [...this.currentResponseTimes],
    });
  }

  /**
   * クイズ結果を取得
   */
  getQuizResult(): QuizResult {
    const totalTimeMs = Date.now() - this.quizStartTime;

    // 各問題の最初の回答時間の平均を計算
    const firstResponseTimes = this.questionResults.map(
      (q) => q.responseTimesMs[0] || 0
    );
    const averageResponseTimeMs =
      firstResponseTimes.reduce((sum, time) => sum + time, 0) /
      firstResponseTimes.length;

    return {
      courseName: this.courseName,
      completedAt: new Date().toISOString(),
      totalQuestions: this.questions.length,
      correctCount: this.correctCount,
      questions: this.questionResults,
      averageResponseTimeMs: Math.round(averageResponseTimeMs),
      totalTimeMs: Math.round(totalTimeMs),
    };
  }
}
