import { MusicalNote, NOTE_CONFIG } from "../../domain/models/MusicalNote";

/**
 * 音声再生を管理するクラス
 */
export class AudioPlayer {
  private audioElements: Record<MusicalNote, HTMLAudioElement | null> =
    {} as Record<MusicalNote, HTMLAudioElement | null>;
  private noteTimeouts: Record<
    MusicalNote,
    ReturnType<typeof setTimeout> | null
  > = {} as Record<MusicalNote, ReturnType<typeof setTimeout> | null>;
  private readonly NOTE_DURATION_MS = 500;
  private isPlaying: boolean = false;

  /**
   * audio要素への参照を設定
   */
  setAudioRef(note: MusicalNote, element: HTMLAudioElement | null) {
    this.audioElements[note] = element;
  }

  /**
   * 再生中かどうかを取得
   */
  getIsPlaying(): boolean {
    return this.isPlaying;
  }

  /**
   * 単一の音を再生（500msで停止）
   */
  async playNote(note: MusicalNote): Promise<void> {
    const audio = this.audioElements[note];
    if (!audio) return;

    // 既存のタイマーがあればクリア
    if (this.noteTimeouts[note]) {
      clearTimeout(this.noteTimeouts[note]!);
      this.noteTimeouts[note] = null;
    }

    // 再生開始
    this.isPlaying = true;
    audio.currentTime = 0;
    audio.play();

    // 500ms後に停止
    return new Promise<void>((resolve) => {
      this.noteTimeouts[note] = setTimeout(() => {
        audio.pause();
        audio.currentTime = 0;
        this.noteTimeouts[note] = null;
        this.isPlaying = false;
        resolve();
      }, this.NOTE_DURATION_MS);
    });
  }

  /**
   * 音階のシーケンスを順番に再生（休符対応）
   * 各音は500msで停止
   */
  async playSequence(
    notes: MusicalNote[],
    intervalMs: number = 500
  ): Promise<void> {
    // 再生開始
    this.isPlaying = true;

    try {
      for (const note of notes) {
        if (note === MusicalNote.REST) {
          // 休符の場合は待機のみ
          await new Promise((resolve) => setTimeout(resolve, intervalMs));
        } else {
          const audio = this.audioElements[note];
          if (audio) {
            // 既存のタイマーがあればクリア
            if (this.noteTimeouts[note]) {
              clearTimeout(this.noteTimeouts[note]!);
              this.noteTimeouts[note] = null;
            }

            // 音を最初から再生
            audio.currentTime = 0;
            audio.play();

            // 500ms後に停止
            await new Promise<void>((resolve) => {
              this.noteTimeouts[note] = setTimeout(() => {
                audio.pause();
                audio.currentTime = 0;
                this.noteTimeouts[note] = null;
                resolve();
              }, this.NOTE_DURATION_MS);
            });
          }
          // 次の音までの間隔を待つ
          await new Promise((resolve) => setTimeout(resolve, intervalMs));
        }
      }
    } finally {
      // 再生終了
      this.isPlaying = false;
    }
  }

  /**
   * 音声ファイルのパスを取得
   */
  getAudioPath(note: MusicalNote): string {
    return `/audio/${NOTE_CONFIG[note].filename}`;
  }
}
