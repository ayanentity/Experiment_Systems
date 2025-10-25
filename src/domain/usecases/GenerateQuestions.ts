import { MusicalNote } from "../models/MusicalNote";
import { SingleNoteQuestion } from "../models/Question";

/**
 * Fisher-Yatesアルゴリズムで配列をシャッフル
 */
function shuffle<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

/**
 * 単音問題を生成するユースケース
 */
export class GenerateSingleNoteQuestionsUseCase {
  /**
   * 単音問題を生成する
   * @param repeatCount 各音階を何回ずつ出題するか
   * @param imagePathTemplate 画像パスのテンプレート関数
   * @returns 生成された問題配列（シャッフル済み）
   */
  execute(
    repeatCount: number,
    imagePathTemplate: (note: MusicalNote) => string
  ): SingleNoteQuestion[] {
    const questions: SingleNoteQuestion[] = [];
    const notes = [
      MusicalNote.DO,
      MusicalNote.RE,
      MusicalNote.MI,
      MusicalNote.FA,
      MusicalNote.SO,
      MusicalNote.LA,
      MusicalNote.SI,
    ];

    notes.forEach((note) => {
      for (let i = 0; i < repeatCount; i++) {
        questions.push({
          note,
          imagePath: imagePathTemplate(note),
        });
      }
    });

    return shuffle(questions);
  }
}
