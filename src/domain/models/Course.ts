/**
 * コースの種類
 */
export enum CourseType {
  BASIC = "basic",
  SINGLE = "single",
  MULTIPLE = "multiple",
  FINAL = "final",
  PRE_TEST = "pre-test",
  POST_TEST = "post-test",
}

/**
 * コース情報の型定義
 */
export interface Course {
  /** コースID */
  id: CourseType;
  /** コース名 */
  name: string;
  /** 問題数 */
  questionCount: number;
  /** コースのURL */
  path: string;
}
