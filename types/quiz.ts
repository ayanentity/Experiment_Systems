import { MusicalNote } from "./notes";

export type QuizQuestion = {
  id: string;
  imagePath: string;
  correctAnswer: MusicalNote[];
  description?: string;
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "q1",
    imagePath: "/images/quiz/question1.png",
    correctAnswer: [MusicalNote.DO],
    description: "この音符は何の音でしょう？",
  },
  {
    id: "q2",
    imagePath: "/images/quiz/question2.png",
    correctAnswer: [MusicalNote.MI],
    description: "この音符は何の音でしょう？",
  },
  {
    id: "q3",
    imagePath: "/images/quiz/question3.png",
    correctAnswer: [MusicalNote.DO, MusicalNote.MI, MusicalNote.SO],
    description: "この和音を左から順番に答えてください",
  },
  {
    id: "q4",
    imagePath: "/images/quiz/question4.png",
    correctAnswer: [MusicalNote.RE, MusicalNote.FA],
    description: "この2つの音符を順番に答えてください",
  },
  {
    id: "q5",
    imagePath: "/images/quiz/question5.png",
    correctAnswer: [MusicalNote.SO],
    description: "この音符は何の音でしょう？",
  },
];

export type QuizState = "answering" | "correct" | "incorrect";
