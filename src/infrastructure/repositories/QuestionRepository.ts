import { MusicalNote } from "../../domain/models/MusicalNote";
import { Question, SingleNoteQuestion } from "../../domain/models/Question";
import { GenerateSingleNoteQuestionsUseCase } from "../../domain/usecases/GenerateQuestions";

/**
 * 単音問題リポジトリ
 */
export class SingleNoteQuestionRepository {
  private generateUseCase = new GenerateSingleNoteQuestionsUseCase();

  /**
   * 単音問題を生成する
   * @param repeatCount 各音階を何回ずつ出題するか
   * @returns 生成された問題配列
   */
  generate(repeatCount: number): SingleNoteQuestion[] {
    return this.generateUseCase.execute(repeatCount, (note) => {
      // 楽譜画像は public/question/singletone/{a|b|c|d|e|f|g}.png を使用
      // MusicalNote とファイル名の対応（固定ド）
      const map: Record<MusicalNote, string> = {
        [MusicalNote.LA]: "a",
        [MusicalNote.SI]: "b",
        [MusicalNote.DO]: "c",
        [MusicalNote.RE]: "d",
        [MusicalNote.MI]: "e",
        [MusicalNote.FA]: "f",
        [MusicalNote.SO]: "g",
        [MusicalNote.C2]: "c2",
        [MusicalNote.REST]: "", // 休符は単音問題では使用しない
      };
      const filename = map[note];
      return `/question/singletone/${filename}.png`;
    });
  }
}

/**
 * 複音問題リポジトリ
 */
export class MultipleNoteQuestionRepository {
  private questions: Question[] = this.buildQuestionsFromPhrasetone();

  /**
   * public/question/phrasetone 配下のファイル名から問題を生成
   * 例: ccee.png -> imagePath: /question/phrasetone/ccee.png
   *      correctAnswer: [ド, ド, ミ, ミ]
   *      playbackSequence: [ド, ド, ミ, ミ]（c2 を含む場合は最後だけ高いド）
   */
  private buildQuestionsFromPhrasetone(): Question[] {
    const filenames = [
      "aaa.png",
      "baga.png",
      "bagf.png",
      "afc2a.png",
      "c2aaf.png",
      "ccee.png",
      "cdcd.png",
      "cdef.png",
      "cg.png",
      "ddd.png",
      "dg.png",
      "ec.png",
      "eded.png",
      "eee.png",
      "egaf.png",
      "egcd.png",
      "ffdd.png",
      "gabc2.png",
      "gg.png",
      "ggfd.png",
    ];

    const parseTokenToNoteForAnswer = (token: string): MusicalNote => {
      switch (token) {
        case "c":
          return MusicalNote.DO;
        case "c2":
          return MusicalNote.C2;
        case "d":
          return MusicalNote.RE;
        case "e":
          return MusicalNote.MI;
        case "f":
          return MusicalNote.FA;
        case "g":
          return MusicalNote.SO;
        case "a":
          return MusicalNote.LA;
        case "b":
          return MusicalNote.SI;
        default:
          throw new Error(`Unknown note token for answer: ${token}`);
      }
    };

    const parseTokenToNoteForPlayback = (token: string): MusicalNote => {
      switch (token) {
        case "c":
          return MusicalNote.DO;
        case "c2":
          return MusicalNote.C2;
        case "d":
          return MusicalNote.RE;
        case "e":
          return MusicalNote.MI;
        case "f":
          return MusicalNote.FA;
        case "g":
          return MusicalNote.SO;
        case "a":
          return MusicalNote.LA;
        case "b":
          return MusicalNote.SI;
        default:
          throw new Error(`Unknown note token for playback: ${token}`);
      }
    };

    const parseName = (nameWithoutExt: string) => {
      const tokens: string[] = [];
      for (let i = 0; i < nameWithoutExt.length; ) {
        if (nameWithoutExt.startsWith("c2", i)) {
          tokens.push("c2");
          i += 2;
        } else {
          tokens.push(nameWithoutExt[i]);
          i += 1;
        }
      }

      const correctAnswer = tokens.map((t) => parseTokenToNoteForAnswer(t));
      const playbackSequence = tokens.map((t) =>
        parseTokenToNoteForPlayback(t)
      );

      return { correctAnswer, playbackSequence };
    };

    return filenames.map((filename, index) => {
      const name = filename.replace(".png", "");
      let { correctAnswer, playbackSequence } = parseName(name);

      // 4音の問題を明示的に定義（ファイル名に基づく）
      // bagf, baga, ggfd, ffdd, egaf, egcd, eded, ccee, cdcd, cdef などの4文字問題
      if (name === "bagf") {
        correctAnswer = [
          MusicalNote.SI,
          MusicalNote.LA,
          MusicalNote.SO,
          MusicalNote.FA,
        ];
        playbackSequence = [
          MusicalNote.SI,
          MusicalNote.LA,
          MusicalNote.SO,
          MusicalNote.FA,
        ];
      } else if (name === "baga") {
        correctAnswer = [
          MusicalNote.SI,
          MusicalNote.LA,
          MusicalNote.SO,
          MusicalNote.LA,
        ];
        playbackSequence = [
          MusicalNote.SI,
          MusicalNote.LA,
          MusicalNote.SO,
          MusicalNote.LA,
        ];
      }

      const question = {
        id: `p${index + 1}`,
        imagePath: `/question/phrasetone/${filename}`,
        correctAnswer,
        playbackSequence,
        description: "このフレーズを順番に答えてください",
      };

      return question;
    });
  }

  /**
   * 全ての複音問題を取得
   */
  getAll(): Question[] {
    return this.questions;
  }
}

/**
 * 最終問題リポジトリ
 */
export class FinalQuestionRepository {
  private question: Question = {
    id: "final1",
    imagePath: "/images/final/final_question.png",
    correctAnswer: [
      MusicalNote.DO,
      MusicalNote.RE,
      MusicalNote.MI,
      MusicalNote.FA,
      MusicalNote.SO,
      MusicalNote.SO,
      MusicalNote.FA,
      MusicalNote.MI,
      MusicalNote.RE,
      MusicalNote.DO,
      MusicalNote.MI,
      MusicalNote.SO,
      MusicalNote.DO,
      MusicalNote.RE,
      MusicalNote.FA,
      MusicalNote.LA,
      MusicalNote.DO,
      MusicalNote.SI,
      MusicalNote.LA,
      MusicalNote.SO,
    ],
    playbackSequence: [
      MusicalNote.DO,
      MusicalNote.RE,
      MusicalNote.MI,
      MusicalNote.FA,
      MusicalNote.SO,
      MusicalNote.REST,
      MusicalNote.SO,
      MusicalNote.FA,
      MusicalNote.MI,
      MusicalNote.RE,
      MusicalNote.DO,
      MusicalNote.REST,
      MusicalNote.MI,
      MusicalNote.SO,
      MusicalNote.DO,
      MusicalNote.REST,
      MusicalNote.RE,
      MusicalNote.FA,
      MusicalNote.LA,
      MusicalNote.REST,
      MusicalNote.DO,
      MusicalNote.SI,
      MusicalNote.LA,
      MusicalNote.SO,
    ],
    description:
      "最終課題！20音の長いフレーズを正確に答えてください（休符は無視）",
  };

  /**
   * 最終問題を取得
   */
  get(): Question {
    return this.question;
  }
}

/**
 * 事前テスト用問題リポジトリ
 */
export class PrePracticeTestQuestionRepository {
  private question: Question = {
    id: "pre_practice_test",
    imagePath: "/question/test/pre_practice_test.png",
    // c→e→f→g→e→g→g→f→g→a→f→a→b→c2→a
    correctAnswer: [
      MusicalNote.DO,
      MusicalNote.MI,
      MusicalNote.FA,
      MusicalNote.SO,
      MusicalNote.MI,
      MusicalNote.SO,
      MusicalNote.SO,
      MusicalNote.FA,
      MusicalNote.SO,
      MusicalNote.LA,
      MusicalNote.FA,
      MusicalNote.LA,
      MusicalNote.SI,
      MusicalNote.C2,
      MusicalNote.LA,
    ],
    // テストでは回答後に音を鳴らさない仕様のため、再生シーケンスは空配列
    playbackSequence: [],
    description: "事前テスト",
  };

  get(): Question {
    return this.question;
  }
}

/**
 * 事後テスト用問題リポジトリ
 */
export class PostPracticeTestQuestionRepository {
  private question: Question = {
    id: "post_practice_test",
    imagePath: "/question/test/post_practice_test.png",
    // g→g→a→b→c2→a→c→f→g→a→f→e→f→g→e
    correctAnswer: [
      MusicalNote.SO,
      MusicalNote.SO,
      MusicalNote.LA,
      MusicalNote.SI,
      MusicalNote.C2,
      MusicalNote.LA,
      MusicalNote.DO,
      MusicalNote.FA,
      MusicalNote.SO,
      MusicalNote.LA,
      MusicalNote.FA,
      MusicalNote.MI,
      MusicalNote.FA,
      MusicalNote.SO,
      MusicalNote.MI,
    ],
    // テストでは回答後に音を鳴らさない仕様のため、再生シーケンスは空配列
    playbackSequence: [],
    description: "事後テスト",
  };

  get(): Question {
    return this.question;
  }
}
