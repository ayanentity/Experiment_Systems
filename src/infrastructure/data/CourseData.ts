import { Course, CourseType } from "../../domain/models/Course";

/**
 * 全コースの情報
 */
export const COURSES: Course[] = [
  {
    id: CourseType.PRE_TEST,
    name: "事前テスト",
    questionCount: 1,
    path: "/pre-test",
  },
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
  {
    id: CourseType.POST_TEST,
    name: "事後テスト",
    questionCount: 1,
    path: "/post-test",
  },
];
