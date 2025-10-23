export enum MusicalNote {
  DO = "do",
  RE = "re",
  MI = "mi",
  FA = "fa",
  SO = "so",
  LA = "la",
  SI = "si",
}

export const NOTE_CONFIG: Record<
  MusicalNote,
  { label: string; filename: string }
> = {
  [MusicalNote.DO]: { label: "ド", filename: "a.wav" },
  [MusicalNote.RE]: { label: "レ", filename: "b.wav" },
  [MusicalNote.MI]: { label: "ミ", filename: "c.wav" },
  [MusicalNote.FA]: { label: "ファ", filename: "d.wav" },
  [MusicalNote.SO]: { label: "ソ", filename: "e.wav" },
  [MusicalNote.LA]: { label: "ラ", filename: "f.wav" },
  [MusicalNote.SI]: { label: "シ", filename: "g.wav" },
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
