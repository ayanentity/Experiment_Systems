import { MusicalNote } from "../models/MusicalNote";
import { QuizResult } from "../models/Question";

/**
 * 回答を採点するユースケース
 */
export class AnswerQuestionUseCase {
  /**
   * ユーザーの回答を採点する
   * @param userAnswer ユーザーの回答配列
   * @param correctAnswer 正解の配列
   * @returns 採点結果
   */
  execute(
    userAnswer: MusicalNote[],
    correctAnswer: MusicalNote[]
  ): QuizResult {
    const isCorrect =
      userAnswer.length === correctAnswer.length &&
      userAnswer.every((note, index) => note === correctAnswer[index]);

    return {
      isCorrect,
      userAnswer,
      correctAnswer,
    };
  }
}
