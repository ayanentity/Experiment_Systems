import { useState, useMemo, useCallback, useEffect } from "react";
import { Question, SingleNoteQuestion } from "../../domain/models/Question";
import { QuizViewModel } from "../viewmodels/QuizViewModel";
import { QuizPresenter } from "../presenters/QuizPresenter";
import { AudioPlayer } from "../../infrastructure/audio/AudioPlayer";
import { MusicalNote } from "../../domain/models/MusicalNote";

/**
 * クイズプレゼンターを使用するカスタムフック
 */
export function useQuizPresenter(
  questions: Question[] | SingleNoteQuestion[],
  courseName: string
) {
  // 再レンダリングをトリガーするための状態
  const [, forceUpdate] = useState({});

  // ビューモデルを作成
  const viewModel = useMemo(() => {
    return new QuizViewModel(questions, courseName, () => {
      forceUpdate({});
    });
  }, [questions, courseName]);

  // オーディオプレイヤーを作成
  const audioPlayer = useMemo(() => new AudioPlayer(), []);

  // プレゼンターを作成
  const presenter = useMemo(
    () => new QuizPresenter(viewModel, audioPlayer),
    [viewModel, audioPlayer]
  );

  // 表示用のタイマー状態（残り時間）
  const [questionStartAt, setQuestionStartAt] = useState<number>(() => Date.now());
  const [now, setNow] = useState<number>(() => Date.now());

  // ビューモデルから現在の状態を取得（依存関係用）
  const state = viewModel.state;
  const progress = viewModel.progress;
  const currentQuestion = viewModel.currentQuestion;

  // 問題が変わったら開始時刻をリセット
  useEffect(() => {
    setQuestionStartAt(Date.now());
    setNow(Date.now());
  }, [progress]);

  // 残り時間更新用のインターバル
  useEffect(() => {
    if (state !== "answering") return;

    const id = setInterval(() => {
      setNow(Date.now());
    }, 200);

    return () => clearInterval(id);
  }, [state, progress]);

  // 制限時間（ミリ秒）を計算
  const timeLimitMs =
    // 単音: 一律5秒
    "note" in currentQuestion
      ? 5000
      : // 事前/事後テスト: 一律15秒
      currentQuestion.id === "pre_practice_test" ||
        currentQuestion.id === "post_practice_test"
      ? 15000
      : // 複音: 音の数 × 5秒
        currentQuestion.correctAnswer.length * 5000;

  // 残り時間（ミリ秒）
  const timeLeftMs = Math.max(0, timeLimitMs - (now - questionStartAt));

  // audio要素への参照を設定する関数
  const setAudioRef = useCallback(
    (note: MusicalNote, element: HTMLAudioElement | null) => {
      audioPlayer.setAudioRef(note, element);
    },
    [audioPlayer]
  );

  return {
    // 状態
    currentQuestion: viewModel.currentQuestion,
    userAnswer: viewModel.userAnswer,
    state: viewModel.state,
    correctCount: viewModel.correctCount,
    progress: viewModel.progress,
    total: viewModel.total,
    isMultiNote: viewModel.isMultiNote,
    isCompleted: viewModel.isCompleted,
    requiredAnswerCount: viewModel.requiredAnswerCount,
    timeLimitMs,
    timeLeftMs,

    // アクション
    handleNoteClick: (note: MusicalNote) => presenter.handleNoteClick(note),
    handleNext: () => presenter.handleNext(),
    handleReset: () => presenter.handleReset(),
    handleComplete: () => presenter.handleComplete(),

    // 結果取得
    getQuizResult: () => viewModel.getQuizResult(),

    // オーディオ
    setAudioRef,
    getAudioPath: (note: MusicalNote) => audioPlayer.getAudioPath(note),
  };
}
