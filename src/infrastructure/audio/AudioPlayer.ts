import { MusicalNote, NOTE_CONFIG } from "../../domain/models/MusicalNote";

/**
 * 音声再生を管理するクラス
 */
export class AudioPlayer {
  private audioElements: Record<MusicalNote, HTMLAudioElement | null> = {} as Record<
    MusicalNote,
    HTMLAudioElement | null
  >;

  /**
   * audio要素への参照を設定
   */
  setAudioRef(note: MusicalNote, element: HTMLAudioElement | null) {
    this.audioElements[note] = element;
  }

  /**
   * 単一の音を再生
   */
  playNote(note: MusicalNote): void {
    const audio = this.audioElements[note];
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }
  }

  /**
   * 音階のシーケンスを順番に再生（休符対応）
   */
  async playSequence(
    notes: MusicalNote[],
    intervalMs: number = 500
  ): Promise<void> {
    for (const note of notes) {
      if (note === MusicalNote.REST) {
        // 休符の場合は待機のみ
        await new Promise((resolve) => setTimeout(resolve, intervalMs));
      } else {
        const audio = this.audioElements[note];
        if (audio) {
          audio.currentTime = 0;
          audio.play();
        }
        await new Promise((resolve) => setTimeout(resolve, intervalMs));
      }
    }
  }

  /**
   * 音声ファイルのパスを取得
   */
  getAudioPath(note: MusicalNote): string {
    return `/audio/${NOTE_CONFIG[note].filename}`;
  }
}
