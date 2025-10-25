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
  /** 問題数 */
  questionCount: number;
  /** コースのURL */
  path: string;
};

/**
 * 全コースの情報
 */
export const COURSES: Course[] = [
  {
    id: CourseType.BASIC,
    name: "基礎コース",
    questionCount: 14,
    path: "/basic",
  },
  {
    id: CourseType.SINGLE,
    name: "単音コース",
    questionCount: 21,
    path: "/single",
  },
  {
    id: CourseType.MULTIPLE,
    name: "複音コース",
    questionCount: 21,
    path: "/multiple",
  },
  {
    id: CourseType.FINAL,
    name: "最終コース",
    questionCount: 1,
    path: "/final",
  },
];
