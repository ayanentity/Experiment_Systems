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

  constructor(
    private viewModel: QuizViewModel,
    private audioPlayer: AudioPlayer
  ) {}

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
    if (this.viewModel.userAnswer.length === this.viewModel.requiredAnswerCount) {
      this.checkAnswer();
    }
  }

  /**
   * 回答を採点する
   */
  private checkAnswer() {
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

    if ("note" in question) {
      // SingleNoteQuestion
      this.audioPlayer.playNote(question.note);
    } else {
      // Question (複音)
      await this.audioPlayer.playSequence(question.playbackSequence);
    }
  }

  /**
   * 次の問題に進む
   */
  handleNext() {
    this.viewModel.nextQuestion();
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
    this.viewModel.complete();
  }
}
