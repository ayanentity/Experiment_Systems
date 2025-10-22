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
  [MusicalNote.DO]: { label: "ド", filename: "do.wav" },
  [MusicalNote.RE]: { label: "レ", filename: "re.wav" },
  [MusicalNote.MI]: { label: "ミ", filename: "mi.wav" },
  [MusicalNote.FA]: { label: "ファ", filename: "fa.wav" },
  [MusicalNote.SO]: { label: "ソ", filename: "so.wav" },
  [MusicalNote.LA]: { label: "ラ", filename: "la.wav" },
  [MusicalNote.SI]: { label: "シ", filename: "si.wav" },
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
