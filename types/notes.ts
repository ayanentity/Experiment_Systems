export enum MusicalNote {
  DO = "do",
  RE = "re",
  MI = "mi",
  FA = "fa",
  SO = "so",
  LA = "la",
  SI = "si",
  REST = "rest",
}

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
  [MusicalNote.REST]: { label: "休符", filename: "" },
};

export const ALL_NOTES = [
  MusicalNote.DO,
  MusicalNote.RE,
  MusicalNote.MI,
  MusicalNote.FA,
  MusicalNote.SO,
  MusicalNote.LA,
  MusicalNote.SI,
] as const;
