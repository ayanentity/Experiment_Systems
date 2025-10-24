"use client";

import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MusicalNote, NOTE_CONFIG, ALL_NOTES } from "@/types/notes";
import { QUIZ_QUESTIONS, QuizState } from "@/types/quiz";
import Image from "next/image";

export default function Home() {
  const audioRefs = useRef<Record<MusicalNote, HTMLAudioElement | null>>(
    {} as Record<MusicalNote, HTMLAudioElement | null>
  );

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState<MusicalNote[]>([]);
  const [quizState, setQuizState] = useState<QuizState>("answering");

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
  const requiredAnswerCount = currentQuestion.correctAnswer.length;
  const isMultiNote = requiredAnswerCount > 1;

  const playNote = (note: MusicalNote) => {
    const audio = audioRefs.current[note];
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }
  };

  const playCorrectAnswer = async () => {
    for (const note of currentQuestion.correctAnswer) {
      await new Promise((resolve) => {
        const audio = audioRefs.current[note];
        if (audio) {
          audio.currentTime = 0;
          audio.play();
          audio.onended = () => resolve(null);
        } else {
          resolve(null);
        }
      });
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
  };

  const handleNoteClick = (note: MusicalNote) => {
    if (quizState !== "answering") return;

    playNote(note);
    const newAnswer = [...userAnswer, note];
    setUserAnswer(newAnswer);

    if (newAnswer.length === requiredAnswerCount) {
      checkAnswer(newAnswer);
    }
  };

  const checkAnswer = (answer: MusicalNote[]) => {
    const isCorrect =
      answer.length === currentQuestion.correctAnswer.length &&
      answer.every((note, index) => note === currentQuestion.correctAnswer[index]);

    setQuizState(isCorrect ? "correct" : "incorrect");

    if (!isCorrect) {
      setTimeout(() => {
        playCorrectAnswer();
      }, 500);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setUserAnswer([]);
      setQuizState("answering");
    } else {
      setCurrentQuestionIndex(0);
      setUserAnswer([]);
      setQuizState("answering");
    }
  };

  const handleReset = () => {
    setUserAnswer([]);
    setQuizState("answering");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-4xl flex-col items-center justify-center gap-8 py-16 px-8 bg-white dark:bg-black">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-4xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            音階クイズ
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            問題 {currentQuestionIndex + 1} / {QUIZ_QUESTIONS.length}
          </p>
        </div>

        <div className="flex flex-col items-center gap-6 w-full">
          <div className="relative w-full max-w-2xl aspect-[3/1] bg-zinc-100 dark:bg-zinc-900 rounded-lg overflow-hidden border-2 border-zinc-200 dark:border-zinc-800">
            <Image
              src={currentQuestion.imagePath}
              alt="楽譜の問題"
              fill
              className="object-contain"
              priority
            />
          </div>

          {currentQuestion.description && (
            <p className="text-lg text-zinc-700 dark:text-zinc-300">
              {currentQuestion.description}
            </p>
          )}

          {isMultiNote && quizState === "answering" && (
            <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <span>
                選択中: {userAnswer.length} / {requiredAnswerCount}
              </span>
              {userAnswer.length > 0 && (
                <span className="font-mono">
                  [{userAnswer.map((n) => NOTE_CONFIG[n].label).join(", ")}]
                </span>
              )}
            </div>
          )}

          {quizState === "correct" && (
            <div className="flex flex-col items-center gap-4 p-6 bg-green-100 dark:bg-green-900/30 rounded-lg border-2 border-green-500">
              <p className="text-2xl font-bold text-green-700 dark:text-green-400">
                正解！
              </p>
              <p className="text-sm text-green-600 dark:text-green-300">
                正解: {currentQuestion.correctAnswer.map((n) => NOTE_CONFIG[n].label).join(" → ")}
              </p>
            </div>
          )}

          {quizState === "incorrect" && (
            <div className="flex flex-col items-center gap-4 p-6 bg-red-100 dark:bg-red-900/30 rounded-lg border-2 border-red-500">
              <p className="text-2xl font-bold text-red-700 dark:text-red-400">
                不正解
              </p>
              <p className="text-sm text-red-600 dark:text-red-300">
                あなたの回答: {userAnswer.map((n) => NOTE_CONFIG[n].label).join(" → ")}
              </p>
              <p className="text-sm text-red-600 dark:text-red-300">
                正解: {currentQuestion.correctAnswer.map((n) => NOTE_CONFIG[n].label).join(" → ")}
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {ALL_NOTES.map((note) => (
            <Button
              key={note}
              onClick={() => handleNoteClick(note)}
              variant={userAnswer.includes(note) ? "secondary" : "default"}
              size="lg"
              className="min-w-[80px] h-16 text-lg font-semibold"
              disabled={quizState !== "answering"}
            >
              {NOTE_CONFIG[note].label}
            </Button>
          ))}
        </div>

        <div className="flex gap-3">
          {quizState === "answering" && userAnswer.length > 0 && (
            <Button onClick={handleReset} variant="outline" size="lg">
              リセット
            </Button>
          )}
          {quizState !== "answering" && (
            <Button onClick={handleNextQuestion} size="lg">
              {currentQuestionIndex < QUIZ_QUESTIONS.length - 1
                ? "次の問題"
                : "最初から"}
            </Button>
          )}
        </div>

        {ALL_NOTES.map((note) => (
          <audio
            key={note}
            ref={(el) => {
              audioRefs.current[note] = el;
            }}
            src={`/audio/${NOTE_CONFIG[note].filename}`}
            preload="auto"
          />
        ))}
      </main>
    </div>
  );
}
