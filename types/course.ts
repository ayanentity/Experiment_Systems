/**
 * コースの種類
 */
export enum CourseType {
  BASIC = "basic",
  SINGLE = "single",
  MULTIPLE = "multiple",
  FINAL = "final",
}

/**
 * コース情報の型定義
 */
export type Course = {
  /** コースID */
  id: CourseType;
  /** コース名 */
  name: string;
  /** コースの説明 */
  description: string;
  /** 問題数 */
  questionCount: number;
  /** コースのURL */
  path: string;
  /** 難易度（1-4） */
  difficulty: number;
};

/**
 * 全コースの情報
 */
export const COURSES: Course[] = [
  {
    id: CourseType.BASIC,
    name: "基礎コース",
    description: "7つの音階を覚えよう！各音2回ずつ、全14問",
    questionCount: 14,
    path: "/basic",
    difficulty: 1,
  },
  {
    id: CourseType.SINGLE,
    name: "単音コース",
    description: "音階をしっかり身につけよう！各音3回ずつ、全21問",
    questionCount: 21,
    path: "/single",
    difficulty: 2,
  },
  {
    id: CourseType.MULTIPLE,
    name: "複音コース",
    description: "複数の音符を聴き取ろう！2〜4音、休符あり、全21問",
    questionCount: 21,
    path: "/multiple",
    difficulty: 3,
  },
  {
    id: CourseType.FINAL,
    name: "最終コース",
    description: "長いフレーズに挑戦！約20音、休符あり",
    questionCount: 1,
    path: "/final",
    difficulty: 4,
  },
];
