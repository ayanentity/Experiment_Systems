import { MusicalNote } from "../../domain/models/MusicalNote";
import { Question, SingleNoteQuestion } from "../../domain/models/Question";
import { AnswerQuestionUseCase } from "../../domain/usecases/AnswerQuestion";
import { AudioPlayer } from "../../infrastructure/audio/AudioPlayer";
import { QuizViewModel } from "../viewmodels/QuizViewModel";

/**
 * クイズのプレゼンター（UIロジック）
 */
export class QuizPresenter {
  private answerUseCase = new AnswerQuestionUseCase();
  private timeoutId: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private viewModel: QuizViewModel,
    private audioPlayer: AudioPlayer,
    private courseName: string
  ) {
    // 初期問題の制限時間タイマーを開始（基礎コース以外）
    if (this.courseName !== "基礎コース") {
      this.startTimeoutForCurrentQuestion();
    }
  }

  /**
   * 現在の問題に対する制限時間（ミリ秒）を取得
   * 基礎コース: 制限なし（Infinity）
   * 単音: 一律 5秒
   * 複音: 音の数 × 5秒（2音:10秒, 3音:15秒, 4音:20秒, ...）
   * 事前/事後テスト: 一律 45秒
   */
  private getTimeLimitMs(question: Question | SingleNoteQuestion): number {
    // 基礎コースは制限時間なし
    if (this.courseName === "基礎コース") {
      return Infinity;
    }

    // テスト用問題は一律45秒
    if (!("note" in question)) {
      if (
        question.id === "pre_practice_test" ||
        question.id === "post_practice_test"
      ) {
        return 45000;
      }
    }

    if ("note" in question) {
      // 単音
      return 5000;
    }
    const length = question.correctAnswer.length;
    return length * 5000;
  }

  /**
   * 現在の問題用のタイマーを開始
   */
  private startTimeoutForCurrentQuestion() {
    // 基礎コースはタイマーを開始しない
    if (this.courseName === "基礎コース") {
      return;
    }

    this.clearTimeoutIfNeeded();
    const question = this.viewModel.currentQuestion;
    const limitMs = this.getTimeLimitMs(question);

    // 制限時間が無限大の場合はタイマーを開始しない
    if (limitMs === Infinity) {
      return;
    }

    this.timeoutId = setTimeout(() => {
      this.handleTimeout();
    }, limitMs);
  }

  /**
   * 進行中のタイマーをクリア
   */
  private clearTimeoutIfNeeded() {
    if (this.timeoutId !== null) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  /**
   * 制限時間切れ時の処理
   * 回答中のまま制限時間を超えた場合、不正解として扱い、
   * 正解のフレーズを再生する
   */
  private handleTimeout() {
    // 既に回答済みなら何もしない
    if (this.viewModel.state !== "answering") return;

    // 不正解として状態を更新（ユーザーの入力が不足/空でもよい）
    this.viewModel.setState("incorrect");

    // タイマーはここで完了扱いにする
    this.timeoutId = null;

    // 1秒後に正解の音声を再生
    setTimeout(() => {
      this.playCorrectAnswer();
    }, 1000);
  }

  /**
   * 音階ボタンがクリックされた時の処理
   */
  handleNoteClick(note: MusicalNote) {
    // 回答中以外はクリック無効
    if (this.viewModel.state !== "answering") return;

    // 休符以外は音を鳴らす
    if (note !== MusicalNote.REST) {
      this.audioPlayer.playNote(note);
    }

    // 回答を追加
    this.viewModel.addAnswer(note);

    // 必要な音数に達したら自動採点
    if (
      this.viewModel.userAnswer.length === this.viewModel.requiredAnswerCount
    ) {
      this.checkAnswer();
    }
  }

  /**
   * 回答を採点する
   */
  private checkAnswer() {
    // ユーザーが規定回数答えた時点でタイマーはクリア
    this.clearTimeoutIfNeeded();
    const question = this.viewModel.currentQuestion;
    let correctAnswer: MusicalNote[];

    // SingleNoteQuestion か Question かで分岐
    if ("note" in question) {
      correctAnswer = [question.note];
    } else {
      correctAnswer = question.correctAnswer;
    }

    const result = this.answerUseCase.execute(
      this.viewModel.userAnswer,
      correctAnswer
    );

    // 状態を更新
    this.viewModel.setState(result.isCorrect ? "correct" : "incorrect");

    // 正解の場合はカウントアップ
    if (result.isCorrect) {
      this.viewModel.incrementCorrectCount();
    }

    // 回答結果を記録
    this.viewModel.recordCurrentQuestionResult(result.isCorrect);

    // 正解音声を再生
    setTimeout(() => {
      this.playCorrectAnswer();
    }, 1000);
  }

  /**
   * 正解の音声を再生
   */
  private async playCorrectAnswer() {
    const question = this.viewModel.currentQuestion;

    // 再生開始を通知
    this.viewModel.setIsPlayingAudio(true);

    try {
      if ("note" in question) {
        // SingleNoteQuestion
        await this.audioPlayer.playNote(question.note);
      } else {
        // Question (複音) - 間隔なしで連続再生
        await this.audioPlayer.playSequence(question.playbackSequence, 0);
      }
    } finally {
      // 再生終了を通知
      this.viewModel.setIsPlayingAudio(false);
    }
  }

  /**
   * 次の問題に進む
   */
  handleNext() {
    this.viewModel.nextQuestion();
    // 次の問題のタイマーを開始（基礎コース以外）
    if (!this.viewModel.isCompleted && this.courseName !== "基礎コース") {
      this.startTimeoutForCurrentQuestion();
    }
  }

  /**
   * 回答をリセット
   */
  handleReset() {
    this.viewModel.resetAnswer();
  }

  /**
   * クイズを完了
   */
  handleComplete() {
    // クイズ完了時はタイマーを停止
    this.clearTimeoutIfNeeded();
    this.viewModel.complete();
  }
}
