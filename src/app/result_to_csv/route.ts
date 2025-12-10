import { NextRequest, NextResponse } from "next/server";

interface QuestionResult {
  questionIndex: number;
  correctAnswer: string[];
  userAnswer: string[];
  isCorrect: boolean;
  responseTimesMs: number[];
}

interface QuizResult {
  courseName: string;
  completedAt: string;
  totalQuestions: number;
  correctCount: number;
  questions: QuestionResult[];
  averageResponseTimeMs: number;
  totalTimeMs: number;
}

/**
 * ローカルストレージのクイズ結果をCSVに変換してダウンロード
 * POST /result_to_csv
 * Body: QuizResult[] (JSON)
 */
export async function POST(request: NextRequest) {
  try {
    const results: QuizResult[] = await request.json();

    if (!Array.isArray(results) || results.length === 0) {
      return NextResponse.json(
        { error: "No quiz results provided" },
        { status: 400 }
      );
    }

    // CSVヘッダー
    const headers = [
      "courseName",
      "questionIndex",
      "responseIndex",
      "correctAnswer",
      "userAnswer",
      "responseTimesMs",
    ];

    // CSVデータ行を生成
    const rows: string[][] = [];

    for (const result of results) {
      const courseName = result.courseName;

      for (const question of result.questions) {
        const questionIndex = question.questionIndex;

        // 配列の最大長を取得（correctAnswer, userAnswer, responseTimesMs）
        const maxLength = Math.max(
          question.correctAnswer.length,
          question.userAnswer.length,
          question.responseTimesMs.length
        );

        for (let responseIndex = 0; responseIndex < maxLength; responseIndex++) {
          const correctAnswer = question.correctAnswer[responseIndex] ?? "";
          const userAnswer = question.userAnswer[responseIndex] ?? "";
          const responseTimeMs = question.responseTimesMs[responseIndex] ?? "";

          rows.push([
            courseName,
            questionIndex.toString(),
            responseIndex.toString(),
            correctAnswer,
            userAnswer,
            responseTimeMs.toString(),
          ]);
        }
      }
    }

    // CSVを生成
    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(",")
      ),
    ].join("\n");

    // BOMを追加してExcelでの文字化けを防ぐ
    const bom = "\uFEFF";
    const csvWithBom = bom + csvContent;

    // ファイル名に日時を含める
    const now = new Date();
    const timestamp = now
      .toISOString()
      .replace(/[:.]/g, "-")
      .slice(0, 19);
    const filename = `quiz_results_${timestamp}.csv`;

    return new NextResponse(csvWithBom, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("Failed to generate CSV:", error);
    return NextResponse.json(
      { error: "Failed to generate CSV" },
      { status: 500 }
    );
  }
}

