import { useState, useMemo, useCallback } from "react";
import { Question, SingleNoteQuestion } from "../../domain/models/Question";
import { QuizViewModel } from "../viewmodels/QuizViewModel";
import { QuizPresenter } from "../presenters/QuizPresenter";
import { AudioPlayer } from "../../infrastructure/audio/AudioPlayer";
import { MusicalNote } from "../../domain/models/MusicalNote";

/**
 * クイズプレゼンターを使用するカスタムフック
 */
export function useQuizPresenter(questions: Question[] | SingleNoteQuestion[]) {
  // 再レンダリングをトリガーするための状態
  const [, forceUpdate] = useState({});

  // ビューモデルを作成
  const viewModel = useMemo(() => {
    return new QuizViewModel(questions, () => {
      forceUpdate({});
    });
  }, [questions]);

  // オーディオプレイヤーを作成
  const audioPlayer = useMemo(() => new AudioPlayer(), []);

  // プレゼンターを作成
  const presenter = useMemo(
    () => new QuizPresenter(viewModel, audioPlayer),
    [viewModel, audioPlayer]
  );

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

    // アクション
    handleNoteClick: (note: MusicalNote) => presenter.handleNoteClick(note),
    handleNext: () => presenter.handleNext(),
    handleReset: () => presenter.handleReset(),
    handleComplete: () => presenter.handleComplete(),

    // オーディオ
    setAudioRef,
    getAudioPath: (note: MusicalNote) => audioPlayer.getAudioPath(note),
  };
}
