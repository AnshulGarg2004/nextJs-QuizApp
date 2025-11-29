"use client";

import type { CSSProperties, ReactNode } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  type AnswerKey,
  type CategorySelection,
  type Difficulty,
  type Question,
  questionBank,
  TOTAL_QUESTIONS,
} from "./data/questions";
import { InlineDropdown } from "@/components/ui/inline-dropdown";

type Screen = "start" | "quiz" | "results" | "review";

type DropdownOption<TValue> = {
  value: TValue;
  label: string;
  icon?: ReactNode;
  description?: string;
};

const categoryOptions: DropdownOption<CategorySelection>[] = [
  {
    value: "general",
    label: "General Knowledge",
    icon: <i className="fas fa-layer-group" />,
  },
  {
    value: "science",
    label: "Science & Technology",
    icon: <i className="fas fa-flask" />,
  },
  {
    value: "history",
    label: "History",
    icon: <i className="fas fa-landmark" />,
  },
  {
    value: "mixed",
    label: "Mixed Topics",
    icon: <i className="fas fa-shuffle" />,
  },
];

const difficultyOptions: DropdownOption<Difficulty>[] = [
  {
    value: "easy",
    label: "Easy",
    icon: <i className="fas fa-signal" />,
  },
  {
    value: "medium",
    label: "Medium",
    icon: <i className="fas fa-wave-square" />,
  },
  {
    value: "hard",
    label: "Hard",
    icon: <i className="fas fa-mountain" />,
  },
];

const heroHighlights = [
  {
    icon: "fas fa-bolt",
    title: "Live Timer",
    desc: "Dynamic countdown with color warnings & motion feedback.",
  },
  {
    icon: "fas fa-wand-magic-sparkles",
    title: "Smart Hints",
    desc: "Context-aware hints and celebratory micro-interactions.",
  },
  {
    icon: "fas fa-chart-line",
    title: "Deep Analytics",
    desc: "Animated stats, answer review & progression insights.",
  },
];

const infoCards = [
  { label: "Avg. Session", value: "6m 22s", accent: "primary" },
  { label: "Accuracy", value: "82%", accent: "secondary" },
  { label: "Players Online", value: "4,812", accent: "neutral" },
];

const resultsHighlights = [
  { icon: "fas fa-rocket", label: "Streak Builder" },
  { icon: "fas fa-fire", label: "Speed Booster" },
  { icon: "fas fa-user-shield", label: "Mastery Tracker" },
];

interface PerformanceMeta {
  icon: string;
  message: string;
  scoreClass: string;
  toast: string;
  confetti: boolean;
}

const defaultMeta: PerformanceMeta = {
  icon: "fas fa-trophy",
  message: "",
  scoreClass: "",
  toast: "",
  confetti: false,
};

export default function QuizApp() {
  const [screen, setScreen] = useState<Screen>("start");
  const [category, setCategory] = useState<CategorySelection>("general");
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(AnswerKey | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [hintVisible, setHintVisible] = useState(false);
  const [hintDisabled, setHintDisabled] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [score, setScore] = useState(0);
  const [toast, setToast] = useState({ message: "", visible: false });
  const [resultsMeta, setResultsMeta] = useState<PerformanceMeta>(defaultMeta);
  const [containerEffect, setContainerEffect] = useState("");
  const countdownRef = useRef<number | null>(null);
  const toastTimeoutRef = useRef<number | null>(null);
  const warningRef = useRef({ ten: false, five: false });

  const currentQuestion = currentQuestions[currentQuestionIndex];
  const progress = useMemo(() => {
    if (!currentQuestions.length) return 0;
    return ((currentQuestionIndex + 1) / currentQuestions.length) * 100;
  }, [currentQuestionIndex, currentQuestions.length]);

  const percentage = useMemo(() => {
    if (!currentQuestions.length) return 0;
    return Math.round((score / currentQuestions.length) * 100);
  }, [score, currentQuestions.length]);

  const unansweredCount = useMemo(
    () => userAnswers.filter((answer) => answer === null).length,
    [userAnswers]
  );
  const answeredCount = useMemo(
    () => userAnswers.filter((answer) => answer !== null).length,
    [userAnswers]
  );
  const timerProgress = useMemo(
    () => Math.min(100, Math.round(((30 - timeLeft) / 30) * 100)),
    [timeLeft]
  );
  const difficultyLabel = useMemo(
    () => difficultyOptions.find((option) => option.value === difficulty)?.label ?? "Custom",
    [difficulty]
  );
  const categoryLabel = useMemo(
    () => categoryOptions.find((option) => option.value === category)?.label ?? "Quiz",
    [category]
  );

  const showToast = useCallback((message: string, duration = 2000) => {
    setToast({ message, visible: true });
    if (toastTimeoutRef.current) {
      window.clearTimeout(toastTimeoutRef.current);
    }
    toastTimeoutRef.current = window.setTimeout(() => {
      setToast({ message: "", visible: false });
    }, duration);
  }, []);

  const finalizeQuiz = useCallback(() => {
    if (!currentQuestions.length) return;
    const calculatedScore = userAnswers.reduce((total, answer, index) => {
      if (answer && answer === currentQuestions[index].correctAnswer) {
        return total + 1;
      }
      return total;
    }, 0);

    setScore(calculatedScore);
    const performance = getPerformanceMeta(
      Math.round((calculatedScore / currentQuestions.length) * 100),
      hintsUsed
    );
    setResultsMeta(performance);
    setScreen("results");
    setContainerEffect("quiz-complete");

    if (performance.toast) {
      setTimeout(() => showToast(performance.toast, 3000), 500);
    }
  }, [currentQuestions, hintsUsed, showToast, userAnswers]);



  useEffect(() => {
    if (screen !== "quiz" || !currentQuestions.length) {
      return;
    }

    setTimeLeft(30);
    setHintVisible(false);
    setHintDisabled(false);
    warningRef.current = { ten: false, five: false };

    if (countdownRef.current) {
      window.clearInterval(countdownRef.current);
    }

    countdownRef.current = window.setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      if (countdownRef.current) {
        window.clearInterval(countdownRef.current);
      }
    };
  }, [screen, currentQuestionIndex, currentQuestions.length]);

  useEffect(() => {
    if (screen !== "quiz") return;

    if (timeLeft === 10 && !warningRef.current.ten) {
      showToast("⏰ 10 seconds left!", 1000);
      warningRef.current.ten = true;
    }

    if (timeLeft === 5 && !warningRef.current.five) {
      showToast("⚡ Hurry up! 5 seconds!", 1000);
      warningRef.current.five = true;
    }

    if (timeLeft === 0 && currentQuestions.length) {
      showToast("⏰ Time's up! Moving to next question...", 1500);
      if (currentQuestionIndex < currentQuestions.length - 1) {
        setCurrentQuestionIndex((prev) => Math.min(prev + 1, currentQuestions.length - 1));
      } else {
        finalizeQuiz();
      }
    }
  }, [
    currentQuestionIndex,
    currentQuestions.length,
    finalizeQuiz,
    screen,
    showToast,
    timeLeft,
  ]);

  useEffect(() => {
    if (!containerEffect) return;
    const timer = window.setTimeout(() => setContainerEffect(""), 600);
    return () => window.clearTimeout(timer);
  }, [containerEffect]);

  useEffect(() => {
    return () => {
      if (countdownRef.current) window.clearInterval(countdownRef.current);
      if (toastTimeoutRef.current) window.clearTimeout(toastTimeoutRef.current);
    };
  }, []);



  const handleStartQuiz = () => {
    const questions = buildQuestionSet(category, difficulty);
    setCurrentQuestions(questions);
    setUserAnswers(new Array(questions.length).fill(null));
    setCurrentQuestionIndex(0);
    setHintsUsed(0);
    setScore(0);
    setScreen("quiz");
    setHintVisible(false);
    setHintDisabled(false);

    showToast(`🚀 Starting ${difficultyLabel} ${categoryLabel}!`, 2500);
    setContainerEffect("celebrate");
  };

  const handleSelectAnswer = (answer: AnswerKey) => {
    setUserAnswers((prev) => {
      const updated = [...prev];
      updated[currentQuestionIndex] = answer;
      return updated;
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      finalizeQuiz();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleShowHint = () => {
    if (!currentQuestion || hintDisabled) return;
    setHintVisible(true);
    setHintDisabled(true);
    setHintsUsed((prev) => prev + 1);
    showToast("💡 Hint revealed! Use it wisely!", 2000);
  };

  const handleRestart = () => {
    setScreen("start");
    setCurrentQuestions([]);
    setUserAnswers([]);
    setScore(0);
    setHintsUsed(0);
    setTimeLeft(30);
    if (countdownRef.current) {
      window.clearInterval(countdownRef.current);
    }
  };

  const timerClass = timeLeft <= 5 ? "danger" : timeLeft <= 10 ? "warning" : "";

  const progressClass = progress >= 50 ? "progress-fill glow" : "progress-fill";
  const isLastQuestion =
    currentQuestionIndex === currentQuestions.length - 1 &&
    currentQuestions.length > 0;

  const resultsContainerClass = [
    "results-panel glass-panel",
    containerEffect,
    resultsMeta.confetti ? "confetti-effect" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <div className="animated-backdrop">
        <div className="neon-grid" />
        <div className="glow-orb orb-1" />
        <div className="glow-orb orb-2" />
        <div className="glow-orb orb-3" />
       
      </div>

      <div className="particle-field">
        {Array.from({ length: 12 }).map((_, index) => (
          <span key={`particle-${index}`} className={`particle particle-${index + 1}`} />
        ))}
      </div>

      <div id="toast" className={`toast ${toast.visible ? "show" : ""}`}>
        {toast.message}
      </div>

      <div className="experience-shell">
        <section id="start-screen" className={`screen ${screen === "start" ? "active" : ""}`}>
          <div className="hero-grid">
            <div className="hero-panel glass-panel">
              <div className="hero-badge-row">
                <span className="hero-chip gradient">Test Your Ability</span>
                <span className="hero-chip outline">Be a Champion</span>
              </div>
              <h1>
                Master the Quizverse{" "}
                <span className="hero-gradient">with cinematic motion.</span>
              </h1>
              <p className="subtitle">
                Adaptive question engine, kinetic animations, and live analytics bundled into one
                immersive experience.
              </p>

              <div className="hero-stats flex justify-between gap-5 ">
                {infoCards.map((card) => (
                  <div key={card.label} className={`info-card ${card.accent} flex justify-between items-centre`}>
                    <span className="info-label mx-2">{card.label}</span>
                    <span className="info-value">{card.value}</span>
                  </div>
                ))}
              </div>

              <div className="hero-highlight-grid">
                {heroHighlights.map((highlight) => (
                  <div key={highlight.title} className="highlight-card">
                    <div className="icon">
                      <span className="highlight-icon">
                      <i className={highlight.icon} />
                    </span>
                    </div>
                    <div className="content">
                      <p className="highlight-title">{highlight.title}</p>
                      <p className="highlight-desc">{highlight.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="control-panel glass-panel">
              <div className="panel-header">
                <div>
                  <p className="panel-subtitle">Game plan</p>
                  <h3>Configure your challenge</h3>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="flex flex-col gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.35em] text-white/55">
                  <span>Category</span>
                  <InlineDropdown
                    value={category}
                    options={categoryOptions}
                    onChange={(newValue) => setCategory(newValue as CategorySelection)}
                  />
                </div>

                <div className="flex flex-col gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.35em] text-white/55">
                  <span>Difficulty</span>
                  <InlineDropdown
                    value={difficulty}
                    options={difficultyOptions}
                    onChange={(newValue) => setDifficulty(newValue as Difficulty)}
                  />
                </div>
              </div>

              <div className="start-meta-grid">
                <div className="meta-badge">
                  <i className="fas fa-circle-notch" />
                  {TOTAL_QUESTIONS} curated questions
                </div>
                <div className="meta-badge">
                  <i className="fas fa-clock" />
                  30s dynamic timer
                </div>
                <div className="meta-badge">
                  <i className="fas fa-flash" />
                  Reactive hints
                </div>
              </div>

              <button className="btn neon" id="start-quiz" onClick={handleStartQuiz}>
                <span className="btn-glow" />
                <i className="fas fa-play" /> Dive into quiz mode
              </button>
            </div>
          </div>
        </section>

        <section id="quiz-screen" className={`screen ${screen === "quiz" ? "active" : ""}`}>
          <div className="quiz-grid">
            <div className="question-panel glass-panel">
              <div className="quiz-progress-row">
                <div className="progress-label">
                  <span>Progress</span>
                  <strong>
                    {currentQuestionIndex + 1}/{currentQuestions.length || TOTAL_QUESTIONS}
                  </strong>
                </div>
                <div className="progress-bar futuristic">
                  <div
                    id="progress-fill"
                    className={progressClass}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <div id="question-container" className="question-container">
                {currentQuestion ? (
                  <>
                    <div className="question-flair">
                      <span className="pill">{categoryLabel}</span>
                      <span className="pill ghost">{difficultyLabel}</span>
                    </div>
                    <div className="question-header">
                      <h3 className="question-text">{currentQuestion.question}</h3>
                      {currentQuestion.image && (
                        <img
                          src={currentQuestion.image}
                          alt="Question"
                          className="question-image"
                        />
                      )}
                    </div>

                    <div className="answers-container vibrant">
                      {Object.entries(currentQuestion.answers).map(([key, value]) => {
                        const letter = key as AnswerKey;
                        const isSelected = userAnswers[currentQuestionIndex] === letter;
                        return (
                          <label
                            key={`${currentQuestionIndex}-${letter}`}
                            className={`answer-option ${isSelected ? "selected" : ""}`}
                          >
                            <span className="option-blur" />
                            <input
                              type="radio"
                              name={`question-${currentQuestionIndex}`}
                              value={letter}
                              checked={isSelected}
                              onChange={() => handleSelectAnswer(letter)}
                            />
                            <span className="answer-letter">{letter.toUpperCase()}</span>
                            <span className="answer-text">{value}</span>
                            <div className="answer-indicator" />
                          </label>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <p className="question-text shimmer">Calibrating your challenge...</p>
                )}
              </div>

              <div className="quiz-controls split">
                <button
                  id="hint-btn"
                  className="btn ghost"
                  onClick={handleShowHint}
                  disabled={hintDisabled || !currentQuestion?.hint}
                >
                  <i className="fas fa-lightbulb" /> Reveal hint
                </button>

                <div className="navigation-buttons">
                  <button
                    id="prev-btn"
                    className="btn subtle"
                    onClick={handlePreviousQuestion}
                    disabled={currentQuestionIndex === 0}
                  >
                    <i className="fas fa-arrow-left" /> Back
                  </button>
                  <button
                    id="next-btn"
                    className="btn neon"
                    onClick={handleNextQuestion}
                    disabled={userAnswers[currentQuestionIndex] === null}
                  >
                    <span className="btn-glow" />
                    {isLastQuestion ? (
                      <>
                        <i className="fas fa-check" /> Finish
                      </>
                    ) : (
                      <>
                        Next <i className="fas fa-arrow-right" />
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div
                id="hint-display"
                className={`hint-display ribbon ${hintVisible && currentQuestion ? "show" : ""}`}
              >
                <div className="hint-content">
                  <i className="fas fa-lightbulb" />
                  <span id="hint-text">{currentQuestion?.hint}</span>
                </div>
              </div>
            </div>

            <div className="status-panel glass-panel">
              <div
                className={`timer-ring ${timerClass}`}
                style={{ "--timer-progress": `${timerProgress}%` } as CSSProperties}
              >
                <div className="timer-core">
                  <span>{timeLeft}</span>
                  <small>seconds</small>
                </div>
              </div>

              <div className="status-pills">
                <div className="status-pill">
                  <p>Answered</p>
                  <strong>
                    {answeredCount}/{currentQuestions.length || TOTAL_QUESTIONS}
                  </strong>
                </div>
                <div className="status-pill">
                  <p>Hints Used</p>
                  <strong>{hintsUsed}</strong>
                </div>
                <div className="status-pill">
                  <p>Current streak</p>
                  <strong>{Math.max(0, answeredCount - hintsUsed)}</strong>
                </div>
              </div>

              <div className="status-insights">
                <div className="insight-card">
                  <i className="fas fa-mountain" />
                  <div>
                    <p>Difficulty</p>
                    <strong>{difficultyLabel}</strong>
                  </div>
                </div>
                <div className="insight-card">
                  <i className="fas fa-globe" />
                  <div>
                    <p>Category</p>
                    <strong>{categoryLabel}</strong>
                  </div>
                </div>
              </div>

              <div className="status-tip">
                <p>Pro tip</p>
                <span>Use hints wisely — each one nudges your analytics curve.</span>
              </div>
            </div>
          </div>
        </section>

        <section id="results-screen" className={`screen ${screen === "results" ? "active" : ""}`}>
          <div className="results-grid">
            <div className={resultsContainerClass}>
              <div className="results-header">
                <h2 id="results-title">Quiz Complete!</h2>
              </div>

              <div className="results-score-block">
                <div id="score-circle" className={`score-circle neon-ring ${resultsMeta.scoreClass}`}>
                  <span id="final-score">{score}</span>
                  <span className="score-total">/ {currentQuestions.length || TOTAL_QUESTIONS}</span>
                </div>
                <div className="score-context">
                  <div id="score-percentage" className="score-percentage">
                    {percentage}%
                  </div>
                  <p className="performance-text">{resultsMeta.message}</p>
                  <p className="performance-stats">
                    You answered {score} out of {currentQuestions.length || TOTAL_QUESTIONS} questions
                    correctly.{" "}
                    {hintsUsed > 0
                      ? `You used ${hintsUsed} hint${hintsUsed > 1 ? "s" : ""}.`
                      : "You didn't use any hints! 🌟"}
          </p>
        </div>
              </div>

              <div className="result-stats futuristic">
                <div className="stat-item correct">
                  <i className="fas fa-check" />
                  <span>{score} Correct</span>
                </div>
                <div className="stat-item incorrect">
                  <i className="fas fa-times" />
                  <span>
                    {(currentQuestions.length || 0) - score - unansweredCount} Incorrect
                  </span>
                </div>
                {unansweredCount > 0 && (
                  <div className="stat-item unanswered">
                    <i className="fas fa-question" />
                    <span>{unansweredCount} Unanswered</span>
                  </div>
                )}
              </div>

              <div className="results-actions">
                <button id="review-answers" className="btn ghost" onClick={() => setScreen("review")}>
                  <i className="fas fa-eye" /> Review Answers
                </button>
                <button id="restart-quiz" className="btn neon" onClick={handleRestart}>
                  <span className="btn-glow" />
                  <i className="fas fa-redo" /> Take Quiz Again
                </button>
              </div>
            </div>

            <div className="results-side glass-panel">
              <p className="side-label">Unlocked pathways</p>
              <h3>Keep the momentum going</h3>
              <div className="side-highlights">
                {resultsHighlights.map((item) => (
                  <div key={item.label} className="side-highlight">
                    <span>
                      <i className={item.icon} />
                    </span>
                    <p>{item.label}</p>
                  </div>
                ))}
              </div>
              <div className="side-tip">
                <p>Track growth</p>
                <span>Replays strengthen neural retention and unlock pro badges.</span>
              </div>
            </div>
          </div>
        </section>

        <section id="review-screen" className={`screen ${screen === "review" ? "active" : ""}`}>
          <div className="review-stack glass-panel">
            <div className="review-header-row">
              <div className="review-heading">
                <p className="panel-subtitle">Deep dive</p>
                <h3>
                  <i className="fas fa-clipboard-list " />
                  <span className="ans-review">Answer Review</span>
                </h3>
              </div>
              <button
                id="back-to-results"
                className="btn subtle"
                onClick={() => setScreen("results")}
              >
                <i className="fas fa-arrow-left" /> Back to Results
              </button>
            </div>

            <div id="review-content" className="review-content">
              {currentQuestions.map((question, index) => {
                const userAnswer = userAnswers[index];
                const isCorrect = userAnswer === question.correctAnswer;
                const wasAnswered = userAnswer !== null;
                const statusClass = isCorrect
                  ? "correct"
                  : wasAnswered
                    ? "incorrect"
                    : "unanswered";

                return (
                  <div key={`review-${question.question}-${index}`} className={`review-item ${statusClass}`}>
                    <div className="review-header">
                      <span className="question-number">Question {index + 1}</span>
                      <span className="review-status">
                        {isCorrect ? (
                          <>
                            <i className="fas fa-check" /> Correct
                          </>
                        ) : wasAnswered ? (
                          <>
                            <i className="fas fa-times" /> Incorrect
                          </>
                        ) : (
                          <>
                            <i className="fas fa-question" /> Unanswered
                          </>
                        )}
                      </span>
                    </div>

                    <div className="review-question">{question.question}</div>

                    <div className="review-answers">
                      {Object.entries(question.answers).map(([key, value]) => {
                        const letter = key as AnswerKey;
                        const classes = [
                          "review-answer",
                          letter === question.correctAnswer ? "correct-answer" : "",
                          letter === userAnswer ? "user-answer" : "",
                        ]
                          .filter(Boolean)
                          .join(" ");

                        return (
                          <div key={`${index}-${letter}`} className={classes}>
                            <span className="answer-letter">{letter.toUpperCase()}</span>
                            <span className="answer-text">{value}</span>
                            {letter === question.correctAnswer && <i className="fas fa-check tick" />}
                            {letter === userAnswer && letter !== question.correctAnswer && (
                              <i className=" fas fa-times cross" />
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <div className="review-explanation">
                      <strong>Explanation:</strong> {question.explanation}
                    </div>
                  </div>
                );
              })}
            </div>
        </div>
        </section>
    </div>
    </>
  );
}

function buildQuestionSet(category: CategorySelection, difficulty: Difficulty) {
  const allQuestions =
    category === "mixed"
      ? [
          ...questionBank.general,
          ...questionBank.science,
          ...questionBank.history,
        ]
      : questionBank[category];

  return getRandomQuestions(allQuestions, TOTAL_QUESTIONS, difficulty);
}

function getRandomQuestions(
  questions: (typeof questionBank)["general"],
  count: number,
  difficulty: Difficulty
) {
  let filtered = questions.filter((question) => question.difficulty === difficulty);

  if (filtered.length < count) {
    const remaining = questions.filter((question) => !filtered.includes(question));
    filtered = [...filtered, ...remaining];
  }

  return shuffle(filtered).slice(0, Math.min(count, filtered.length));
}

function shuffle<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

function getPerformanceMeta(percentage: number, hintsUsed: number): PerformanceMeta {
  if (percentage >= 90) {
    return {
      icon: "fas fa-trophy",
      message: "Excellent! Outstanding performance!",
      scoreClass: "glow-perfect",
      toast: "🏆 Perfect! You're a quiz master!",
      confetti: true,
    };
  }
  if (percentage >= 70) {
    return {
      icon: "fas fa-medal",
      message: "Great job! You did well!",
      scoreClass: "glow-success",
      toast: "🎉 Well done! Great performance!",
      confetti: false,
    };
  }
  if (percentage >= 50) {
    return {
      icon: "fas fa-thumbs-up",
      message: "Good effort! Keep learning!",
      scoreClass: "",
      toast: "👍 Good try! Keep practicing!",
      confetti: false,
    };
  }
  return {
    icon: "fas fa-redo",
    message: hintsUsed > 0 ? "Keep practicing and refine your strategy!" : "Don't give up! Practice makes perfect!",
    scoreClass: "",
    toast: "💪 Don't give up! You can do better!",
    confetti: false,
  };
}
