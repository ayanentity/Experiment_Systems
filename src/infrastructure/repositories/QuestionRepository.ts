import { MusicalNote, NOTE_CONFIG } from "../../domain/models/MusicalNote";
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
  private questions: Question[] = [
    // 2音の問題（休符なし）
    {
      id: "m1",
      imagePath: "/images/multiple/question1.png",
      correctAnswer: [MusicalNote.DO, MusicalNote.MI],
      playbackSequence: [MusicalNote.DO, MusicalNote.MI],
      description: "この2音を順番に答えてください",
    },
    {
      id: "m2",
      imagePath: "/images/multiple/question2.png",
      correctAnswer: [MusicalNote.RE, MusicalNote.FA],
      playbackSequence: [MusicalNote.RE, MusicalNote.FA],
      description: "この2音を順番に答えてください",
    },
    {
      id: "m3",
      imagePath: "/images/multiple/question3.png",
      correctAnswer: [MusicalNote.MI, MusicalNote.SO],
      playbackSequence: [MusicalNote.MI, MusicalNote.SO],
      description: "この2音を順番に答えてください",
    },
    // 2音の問題（休符あり）
    {
      id: "m4",
      imagePath: "/images/multiple/question4.png",
      correctAnswer: [MusicalNote.DO, MusicalNote.SO],
      playbackSequence: [MusicalNote.DO, MusicalNote.REST, MusicalNote.SO],
      description: "この音符を答えてください（休符は無視）",
    },
    {
      id: "m5",
      imagePath: "/images/multiple/question5.png",
      correctAnswer: [MusicalNote.RE, MusicalNote.LA],
      playbackSequence: [MusicalNote.RE, MusicalNote.REST, MusicalNote.LA],
      description: "この音符を答えてください（休符は無視）",
    },
    {
      id: "m6",
      imagePath: "/images/multiple/question6.png",
      correctAnswer: [MusicalNote.FA, MusicalNote.SI],
      playbackSequence: [MusicalNote.REST, MusicalNote.FA, MusicalNote.SI],
      description: "この音符を答えてください（休符は無視）",
    },
    // 3音の問題（休符なし）
    {
      id: "m7",
      imagePath: "/images/multiple/question7.png",
      correctAnswer: [MusicalNote.DO, MusicalNote.MI, MusicalNote.SO],
      playbackSequence: [MusicalNote.DO, MusicalNote.MI, MusicalNote.SO],
      description: "この3音を順番に答えてください",
    },
    {
      id: "m8",
      imagePath: "/images/multiple/question8.png",
      correctAnswer: [MusicalNote.RE, MusicalNote.FA, MusicalNote.LA],
      playbackSequence: [MusicalNote.RE, MusicalNote.FA, MusicalNote.LA],
      description: "この3音を順番に答えてください",
    },
    {
      id: "m9",
      imagePath: "/images/multiple/question9.png",
      correctAnswer: [MusicalNote.MI, MusicalNote.SO, MusicalNote.SI],
      playbackSequence: [MusicalNote.MI, MusicalNote.SO, MusicalNote.SI],
      description: "この3音を順番に答えてください",
    },
    {
      id: "m10",
      imagePath: "/images/multiple/question10.png",
      correctAnswer: [MusicalNote.DO, MusicalNote.RE, MusicalNote.MI],
      playbackSequence: [MusicalNote.DO, MusicalNote.RE, MusicalNote.MI],
      description: "この3音を順番に答えてください",
    },
    // 3音の問題（休符あり）
    {
      id: "m11",
      imagePath: "/images/multiple/question11.png",
      correctAnswer: [MusicalNote.DO, MusicalNote.MI, MusicalNote.SO],
      playbackSequence: [
        MusicalNote.DO,
        MusicalNote.REST,
        MusicalNote.MI,
        MusicalNote.SO,
      ],
      description: "この音符を答えてください（休符は無視）",
    },
    {
      id: "m12",
      imagePath: "/images/multiple/question12.png",
      correctAnswer: [MusicalNote.FA, MusicalNote.LA, MusicalNote.DO],
      playbackSequence: [
        MusicalNote.FA,
        MusicalNote.LA,
        MusicalNote.REST,
        MusicalNote.DO,
      ],
      description: "この音符を答えてください（休符は無視）",
    },
    {
      id: "m13",
      imagePath: "/images/multiple/question13.png",
      correctAnswer: [MusicalNote.SO, MusicalNote.SI, MusicalNote.RE],
      playbackSequence: [
        MusicalNote.REST,
        MusicalNote.SO,
        MusicalNote.SI,
        MusicalNote.RE,
      ],
      description: "この音符を答えてください（休符は無視）",
    },
    {
      id: "m14",
      imagePath: "/images/multiple/question14.png",
      correctAnswer: [MusicalNote.RE, MusicalNote.FA, MusicalNote.SO],
      playbackSequence: [
        MusicalNote.RE,
        MusicalNote.REST,
        MusicalNote.FA,
        MusicalNote.REST,
        MusicalNote.SO,
      ],
      description: "この音符を答えてください（休符は無視）",
    },
    // 4音の問題（休符なし）
    {
      id: "m15",
      imagePath: "/images/multiple/question15.png",
      correctAnswer: [
        MusicalNote.DO,
        MusicalNote.RE,
        MusicalNote.MI,
        MusicalNote.FA,
      ],
      playbackSequence: [
        MusicalNote.DO,
        MusicalNote.RE,
        MusicalNote.MI,
        MusicalNote.FA,
      ],
      description: "この4音を順番に答えてください",
    },
    {
      id: "m16",
      imagePath: "/images/multiple/question16.png",
      correctAnswer: [
        MusicalNote.SO,
        MusicalNote.LA,
        MusicalNote.SI,
        MusicalNote.DO,
      ],
      playbackSequence: [
        MusicalNote.SO,
        MusicalNote.LA,
        MusicalNote.SI,
        MusicalNote.DO,
      ],
      description: "この4音を順番に答えてください",
    },
    {
      id: "m17",
      imagePath: "/images/multiple/question17.png",
      correctAnswer: [
        MusicalNote.MI,
        MusicalNote.FA,
        MusicalNote.SO,
        MusicalNote.LA,
      ],
      playbackSequence: [
        MusicalNote.MI,
        MusicalNote.FA,
        MusicalNote.SO,
        MusicalNote.LA,
      ],
      description: "この4音を順番に答えてください",
    },
    // 4音の問題（休符あり）
    {
      id: "m18",
      imagePath: "/images/multiple/question18.png",
      correctAnswer: [
        MusicalNote.DO,
        MusicalNote.MI,
        MusicalNote.SO,
        MusicalNote.DO,
      ],
      playbackSequence: [
        MusicalNote.DO,
        MusicalNote.REST,
        MusicalNote.MI,
        MusicalNote.SO,
        MusicalNote.DO,
      ],
      description: "この音符を答えてください（休符は無視）",
    },
    {
      id: "m19",
      imagePath: "/images/multiple/question19.png",
      correctAnswer: [
        MusicalNote.RE,
        MusicalNote.FA,
        MusicalNote.LA,
        MusicalNote.SI,
      ],
      playbackSequence: [
        MusicalNote.RE,
        MusicalNote.FA,
        MusicalNote.REST,
        MusicalNote.LA,
        MusicalNote.SI,
      ],
      description: "この音符を答えてください（休符は無視）",
    },
    {
      id: "m20",
      imagePath: "/images/multiple/question20.png",
      correctAnswer: [
        MusicalNote.FA,
        MusicalNote.SO,
        MusicalNote.LA,
        MusicalNote.SI,
      ],
      playbackSequence: [
        MusicalNote.REST,
        MusicalNote.FA,
        MusicalNote.SO,
        MusicalNote.REST,
        MusicalNote.LA,
        MusicalNote.SI,
      ],
      description: "この音符を答えてください（休符は無視）",
    },
    {
      id: "m21",
      imagePath: "/images/multiple/question21.png",
      correctAnswer: [
        MusicalNote.DO,
        MusicalNote.RE,
        MusicalNote.MI,
        MusicalNote.SO,
      ],
      playbackSequence: [
        MusicalNote.REST,
        MusicalNote.DO,
        MusicalNote.REST,
        MusicalNote.RE,
        MusicalNote.MI,
        MusicalNote.REST,
        MusicalNote.SO,
      ],
      description: "この音符を答えてください（休符は無視）",
    },
  ];

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
