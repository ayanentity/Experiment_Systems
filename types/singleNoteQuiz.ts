import { MusicalNote } from "./notes";

/**
 * 単音問題の型定義
 * 各音階に1つの画像が紐付く
 */
export type SingleNoteQuestion = {
  /** 正解の音階 */
  note: MusicalNote;
  /** その音階専用の画像パス */
  imagePath: string;
};

/**
 * 各音階と画像のマッピング
 * REST（休符）は単音問題では使用しない
 */
export const SINGLE_NOTE_IMAGES: Record<MusicalNote, string> = {
  [MusicalNote.DO]: "/images/single/do.png",
  [MusicalNote.RE]: "/images/single/re.png",
  [MusicalNote.MI]: "/images/single/mi.png",
  [MusicalNote.FA]: "/images/single/fa.png",
  [MusicalNote.SO]: "/images/single/so.png",
  [MusicalNote.LA]: "/images/single/la.png",
  [MusicalNote.SI]: "/images/single/si.png",
  [MusicalNote.C2]: "",
  [MusicalNote.REST]: "", // 単音問題では使用しない
};

/**
 * 配列をシャッフルする関数（Fisher-Yates アルゴリズム）
 * @param array シャッフルする配列
 * @returns シャッフルされた新しい配列
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
 * 単音問題を生成する関数
 * @param repeatCount 各音階を何回ずつ出題するか
 * @returns 生成された問題配列（シャッフル済み）
 */
export function generateSingleNoteQuestions(
  repeatCount: number
): SingleNoteQuestion[] {
  const questions: SingleNoteQuestion[] = [];
  // 休符を除く7つの音階
  const notes = [
    MusicalNote.DO,
    MusicalNote.RE,
    MusicalNote.MI,
    MusicalNote.FA,
    MusicalNote.SO,
    MusicalNote.LA,
    MusicalNote.SI,
  ];

  // 各音をrepeatCount回ずつ追加
  notes.forEach((note) => {
    for (let i = 0; i < repeatCount; i++) {
      questions.push({
        note,
        imagePath: SINGLE_NOTE_IMAGES[note],
      });
    }
  });

  // シャッフルして返す
  return shuffle(questions);
}
