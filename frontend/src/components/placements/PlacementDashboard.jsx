import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ProgressIndicator from "./ProgressIndicator";
import QuestionCard      from "./QuestionCard";
import CompletionCard    from "./CompletionCard";

// ── Single CSS import for the whole module ──
import "./placements.css";

// ================================================================
// QUESTION DATA
// fieldKey matches the answers state keys.
// shortLabel is used in the completion summary.
// ================================================================
const QUESTIONS = [
  {
    fieldKey:   "preparationFrequency",
    shortLabel: "Preparation",
    question:   "How often are you preparing for placements right now?",
    options: [
      { id: "not-started",  emoji: "📅", label: "Not started yet" },
      { id: "occasional",   emoji: "📖", label: "Preparing occasionally" },
      { id: "regularly",    emoji: "💻", label: "Practicing regularly" },
      { id: "daily",        emoji: "🔥", label: "Preparing daily" },
    ],
  },
  {
    fieldKey:   "preparationChallenge",
    shortLabel: "Challenge",
    question:   "What is the biggest challenge affecting your preparation?",
    options: [
      { id: "workload",     emoji: "⏳", label: "Academic workload" },
      { id: "dont-know",   emoji: "📚", label: "Don't know where to start" },
      { id: "overwhelmed", emoji: "😓", label: "Feeling overwhelmed" },
      { id: "comparison",  emoji: "👥", label: "Comparing with friends" },
      { id: "no-issues",   emoji: "🙂", label: "No major issues" },
    ],
  },
  {
    fieldKey:   "internshipStatus",
    shortLabel: "Internship",
    question:   "What is your internship status right now?",
    options: [
      { id: "looking",    emoji: "🔍", label: "Looking for opportunities" },
      { id: "applied",    emoji: "📨", label: "Applied but waiting for response" },
      { id: "ongoing",    emoji: "🧑‍💻", label: "Currently doing an internship" },
      { id: "completed",  emoji: "🚀", label: "Completed an internship" },
    ],
  },
  {
    fieldKey:   "interviewConfidence",
    shortLabel: "Confidence",
    question:   "If placements started tomorrow, how ready would you feel?",
    options: [
      { id: "not-ready",   emoji: "😟", label: "Not ready" },
      { id: "slight",      emoji: "😐", label: "Slightly prepared" },
      { id: "moderate",    emoji: "🙂", label: "Moderately prepared" },
      { id: "confident",   emoji: "😎", label: "Very confident" },
    ],
  },
];

// ================================================================
// PlacementDashboard
// ================================================================
function PlacementDashboard() {
  const navigate = useNavigate();

  // Which question we're on (0-indexed); null = all done
  const [currentStep, setCurrentStep] = useState(0);

  // Collected answers — keys match QUESTIONS[n].fieldKey
  const [answers, setAnswers] = useState({
    preparationFrequency: "",
    preparationChallenge: "",
    internshipStatus:     "",
    interviewConfidence:  "",
  });

  // Whether the flow is complete
  const isDone = currentStep >= QUESTIONS.length;

  useEffect(() => {
    const submitData = async () => {
      if (isDone) {
        try {
          const studentId = localStorage.getItem("studentId") || "dummy-student-id";
          
          let confidenceLevel = 3;
          if (answers.interviewConfidence === "not-ready") confidenceLevel = 1;
          else if (answers.interviewConfidence === "slight") confidenceLevel = 2;
          else if (answers.interviewConfidence === "moderate") confidenceLevel = 3;
          else if (answers.interviewConfidence === "confident") confidenceLevel = 4;

          let preparationLevel = 3;
          if (answers.preparationFrequency === "not-started") preparationLevel = 1;
          else if (answers.preparationFrequency === "occasional") preparationLevel = 2;
          else if (answers.preparationFrequency === "regularly") preparationLevel = 3;
          else if (answers.preparationFrequency === "daily") preparationLevel = 4;

          const payload = {
            studentId,
            preparationLevel,
            problemsSolved: 0,
            confidenceLevel,
            needsHelp: answers.preparationChallenge !== "no-issues"
          };

          await fetch("http://localhost:5000/api/surveys/placement", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
        } catch (e) {
          console.error("Failed to submit placement checkin", e);
        }
      }
    };
    submitData();
  }, [isDone, answers]);

  // Called by QuestionCard when a user picks an answer
  const handleAnswer = (optionId) => {
    const fieldKey = QUESTIONS[currentStep].fieldKey;

    // Save answer
    setAnswers((prev) => ({ ...prev, [fieldKey]: optionId }));

    // Advance to next question (or completion)
    setCurrentStep((prev) => prev + 1);
  };

  // Restart the whole check-in
  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({
      preparationFrequency: "",
      preparationChallenge: "",
      internshipStatus:     "",
      interviewConfidence:  "",
    });
  };

  return (
    <div className="pl-page">

      {/* ── Page Header ── */}
      <header className="pl-header">
        <button className="pl-header__back" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <span className="pl-header__eyebrow">Wellbeing Module</span>
        <h1 className="pl-header__title">Placement Check-In</h1>
        <p className="pl-header__subtitle">
          4 quick questions · Under 60 seconds · Tap an option to proceed
        </p>
      </header>

      {/* ── Progress bar (hidden on completion screen) ── */}
      {!isDone && (
        <ProgressIndicator
          current={currentStep + 1}
          total={QUESTIONS.length}
        />
      )}

      {/* ── Main content: question card OR completion card ── */}
      {isDone ? (
        <CompletionCard
          answers={answers}
          questions={QUESTIONS}
          onReset={handleReset}
        />
      ) : (
        /*
          Key prop forces React to unmount + remount QuestionCard
          on each step, triggering the entrance animation fresh.
        */
        <QuestionCard
          key={currentStep}
          questionNumber={currentStep + 1}
          question={QUESTIONS[currentStep].question}
          options={QUESTIONS[currentStep].options}
          selectedId={answers[QUESTIONS[currentStep].fieldKey]}
          onAnswer={handleAnswer}
        />
      )}

    </div>
  );
}

export default PlacementDashboard;