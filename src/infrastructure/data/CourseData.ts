import { Course, CourseType } from "../../domain/models/Course";

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
