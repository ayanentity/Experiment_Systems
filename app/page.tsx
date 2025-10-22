"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { MusicalNote, NOTE_CONFIG, ALL_NOTES } from "@/types/notes";

export default function Home() {
  const audioRefs = useRef<Record<MusicalNote, HTMLAudioElement | null>>(
    {} as Record<MusicalNote, HTMLAudioElement | null>
  );

  const playNote = (note: MusicalNote) => {
    const audio = audioRefs.current[note];
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-4xl flex-col items-center justify-center gap-12 py-16 px-8 bg-white dark:bg-black">
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="text-4xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            音階プレーヤー
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            各ボタンをクリックして音階を演奏してください
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {ALL_NOTES.map((note) => (
            <Button
              key={note}
              onClick={() => playNote(note)}
              variant="default"
              size="lg"
              className="min-w-[80px] h-16 text-lg font-semibold"
            >
              {NOTE_CONFIG[note].label}
            </Button>
          ))}
        </div>

        {ALL_NOTES.map((note) => (
          <audio
            key={note}
            ref={(el) => {
              audioRefs.current[note] = el;
            }}
            src={`/audio/${NOTE_CONFIG[note].filename}`}
            preload="auto"
          />
        ))}
      </main>
    </div>
  );
}
