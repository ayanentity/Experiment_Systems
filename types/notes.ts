/**
 * 音階のenum定義
 * ド(DO)からシ(SI)までの7音階と休符(REST)
 */
export enum MusicalNote {
  DO = "do",
  RE = "re",
  MI = "mi",
  FA = "fa",
  SO = "so",
  LA = "la",
  SI = "si",
  C2 = "c2",
  REST = "rest", // 休符（無音）
}

/**
 * 各音階の表示ラベルと音声ファイル名の設定
 * Record型で全ての音階に対する設定を保証
 */
export const NOTE_CONFIG: Record<
  MusicalNote,
  { label: string; filename: string }
> = {
  [MusicalNote.DO]: { label: "ド", filename: "c.wav" },
  [MusicalNote.RE]: { label: "レ", filename: "d.wav" },
  [MusicalNote.MI]: { label: "ミ", filename: "e.wav" },
  [MusicalNote.FA]: { label: "ファ", filename: "f.wav" },
  [MusicalNote.SO]: { label: "ソ", filename: "g.wav" },
  [MusicalNote.LA]: { label: "ラ", filename: "a.wav" },
  [MusicalNote.SI]: { label: "シ", filename: "b.wav" },
  [MusicalNote.C2]: { label: "高いド", filename: "c2.wav" },
  [MusicalNote.REST]: { label: "休符", filename: "" }, // 休符は音声ファイルなし
};

/**
 * UIに表示する音階のリスト（休符は含まない）
 * ユーザーが選択できるボタンとして表示される
 */
export const ALL_NOTES = [
  MusicalNote.DO,
  MusicalNote.RE,
  MusicalNote.MI,
  MusicalNote.FA,
  MusicalNote.SO,
  MusicalNote.LA,
  MusicalNote.SI,
  MusicalNote.C2,
] as const;
