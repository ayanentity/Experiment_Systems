import { MusicalNote } from "./notes";
import { QuizQuestion } from "./quiz";

/**
 * 最終コース用の問題（1問のみ）
 * 約20音の長いフレーズ、休符も含む
 *
 * フレーズ構成:
 * ド・レ・ミ・ファ・ソ・休符・ソ・ファ・ミ・レ・ド・休符・
 * ミ・ソ・ド・休符・レ・ファ・ラ・休符・ド・シ・ラ・ソ・ファ・ミ・レ・ド
 *
 * 音符のみ（解答）: 20音
 * 再生シーケンス（休符含む）: 24音
 */
export const FINAL_QUESTION: QuizQuestion = {
  id: "final1",
  imagePath: "/images/final/final_question.png",
  // ユーザーが選択すべき音符のみ（休符なし、20音）
  correctAnswer: [
    MusicalNote.DO,  // 1
    MusicalNote.RE,  // 2
    MusicalNote.MI,  // 3
    MusicalNote.FA,  // 4
    MusicalNote.SO,  // 5
    MusicalNote.SO,  // 6
    MusicalNote.FA,  // 7
    MusicalNote.MI,  // 8
    MusicalNote.RE,  // 9
    MusicalNote.DO,  // 10
    MusicalNote.MI,  // 11
    MusicalNote.SO,  // 12
    MusicalNote.DO,  // 13
    MusicalNote.RE,  // 14
    MusicalNote.FA,  // 15
    MusicalNote.LA,  // 16
    MusicalNote.DO,  // 17
    MusicalNote.SI,  // 18
    MusicalNote.LA,  // 19
    MusicalNote.SO,  // 20
  ],
  // 実際の演奏順（休符を含む、24音）
  playbackSequence: [
    MusicalNote.DO,   // 1
    MusicalNote.RE,   // 2
    MusicalNote.MI,   // 3
    MusicalNote.FA,   // 4
    MusicalNote.SO,   // 5
    MusicalNote.REST, // 休符1
    MusicalNote.SO,   // 6
    MusicalNote.FA,   // 7
    MusicalNote.MI,   // 8
    MusicalNote.RE,   // 9
    MusicalNote.DO,   // 10
    MusicalNote.REST, // 休符2
    MusicalNote.MI,   // 11
    MusicalNote.SO,   // 12
    MusicalNote.DO,   // 13
    MusicalNote.REST, // 休符3
    MusicalNote.RE,   // 14
    MusicalNote.FA,   // 15
    MusicalNote.LA,   // 16
    MusicalNote.REST, // 休符4
    MusicalNote.DO,   // 17
    MusicalNote.SI,   // 18
    MusicalNote.LA,   // 19
    MusicalNote.SO,   // 20
  ],
  description: "最終課題！20音の長いフレーズを正確に答えてください（休符は無視）",
};
