import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DailySchedule    from "../components/timetable/dailyschedule";
import LabTheoryBalance from "../components/timetable/labtheorybalance";
import AssignmentLoad   from "../components/timetable/assignmentload";
import TimeAvailability from "../components/timetable/timeavailability";
import BreaksDesign     from "../components/timetable/breaksdesign";
import WeeklyHeatmap    from "../components/timetable/weeklyheatmap";
import MentalImpact     from "../components/timetable/mentalimpact";
import Reflection       from "../components/timetable/reflection";
import "../components/timetable/timetable.css";

const initialState = {
  dailySchedule:    { exhaustionLevel: 5, backToBackClasses: 2, energyAfterCollege: "" },
  labTheoryBalance: { balance: "", labDifficulty: 3, mentalFatigueAfterLabs: 3 },
  assignmentLoad:   { loadIntensity: 5, overlappingDeadlines: null, reviewPressure: 3, weeklySubmissions: 2 },
  timeAvailability: { selfStudyTime: 5, placementPrepTime: 3, extracurricularTime: 2, freeTimeSatisfaction: "" },
  breaksDesign:     { breakSufficiency: 3, lunchTimingRating: "", longGapsFrustration: 3, earlyMorningFatigue: 3 },
  weeklyHeatmap:    { monday: "", tuesday: "", wednesday: "", thursday: "", friday: "" },
  mentalImpact:     { factors: [] },
  reflection:       { biggestStress: "", improvementSuggestions: "" },
};

export default function Timetable() {
  const navigate = useNavigate();
  const [timetableData, setTimetableData] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);

  const updateSection = (section, value) =>
    setTimetableData(prev => ({ ...prev, [section]: value }));

  const handleFinish = async () => {
    console.log("TIMETABLE SUBMITTED", JSON.stringify(timetableData, null, 2));
    try {
      const studentId = localStorage.getItem("studentId");
      await fetch("http://localhost:5000/api/surveys/workload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: studentId || "dummy-student-id",
          hoursStudied: timetableData.timeAvailability.selfStudyTime,
          sleepHours: timetableData.timeAvailability.sleepHours || 6,
          workloadStressLevel: timetableData.assignmentLoad.loadIntensity,
        }),
      });
    } catch (e) {
      console.error("Failed to submit workload data", e);
    }
    setSubmitted(true);
    setTimeout(() => navigate("/student/home"), 1800);
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg,#eff6ff 0%,#f8fafc 40%,#dbeafe 100%)", fontFamily: "var(--font-body)" }}>

      {/* Compact header */}
      <header style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(255,255,255,0.9)", backdropFilter: "blur(16px)", borderBottom: "1px solid var(--blue-100)", boxShadow: "0 2px 12px rgba(30,58,138,0.06)" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <button
            onClick={() => navigate("/student/home")}
            style={{ padding: "7px 14px", borderRadius: 8, border: "1.5px solid var(--blue-200)", background: "var(--blue-50)", color: "var(--blue-700)", fontFamily: "var(--font-body)", fontSize: "0.82rem", fontWeight: 600, cursor: "pointer", flexShrink: 0 }}
          >
            ← Back
          </button>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 700, color: "var(--blue-900)", margin: 0, flex: 1, textAlign: "center" }}>
            🗓 Timetable &amp; Workload
          </h1>
          <button
            onClick={() => navigate("/student/home")}
            style={{ padding: "7px 14px", borderRadius: 8, border: "none", background: "var(--blue-600)", color: "#fff", fontFamily: "var(--font-body)", fontSize: "0.82rem", fontWeight: 700, cursor: "pointer", flexShrink: 0 }}
          >
            🏠 Home
          </button>
        </div>
      </header>

      {/* Survey shown directly — no toggle */}
      <main style={{ maxWidth: 860, margin: "0 auto", padding: "20px 24px 60px" }}>

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, padding: "14px 20px", background: "linear-gradient(135deg,var(--blue-600),var(--blue-800))", borderRadius: 16, boxShadow: "0 4px 16px rgba(30,58,138,0.2)" }}>
          <span style={{ fontSize: "1.4rem" }}>📋</span>
          <div>
            <p style={{ margin: 0, color: "#fff", fontWeight: 700, fontSize: "0.95rem", fontFamily: "var(--font-display)" }}>Timetable and Workload</p>
            <p style={{ margin: 0, color: "rgba(255,255,255,0.7)", fontSize: "0.75rem" }}>How can the timtable and workload be improved</p>
          </div>
        </div>

        <DailySchedule    data={timetableData.dailySchedule}    onUpdate={updateSection} />
        <LabTheoryBalance data={timetableData.labTheoryBalance} onUpdate={updateSection} />
        <AssignmentLoad   data={timetableData.assignmentLoad}   onUpdate={updateSection} />
        <TimeAvailability data={timetableData.timeAvailability} onUpdate={updateSection} />
        <BreaksDesign     data={timetableData.breaksDesign}     onUpdate={updateSection} />
        <WeeklyHeatmap    data={timetableData.weeklyHeatmap}    onUpdate={updateSection} />
        <MentalImpact     data={timetableData.mentalImpact}     onUpdate={updateSection} />
        <Reflection       data={timetableData.reflection}       onUpdate={updateSection} />

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, paddingTop: 8 }}>
          {!submitted ? (
            <>
              <button
                onClick={handleFinish}
                style={{ padding: "14px 48px", borderRadius: "var(--radius-lg)", border: "none", background: "linear-gradient(135deg,#2563eb,#1d4ed8)", color: "white", fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 700, cursor: "pointer", boxShadow: "0 6px 24px rgba(37,99,235,0.35)", transition: "all 200ms ease" }}
                onMouseOver={e => { e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; }}
              >
                ✅ Submit Survey
              </button>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--slate-400)", margin: 0 }}>
                Your responses are confidential and help improve student wellbeing.
              </p>
            </>
          ) : (
            <div style={{ padding: "20px 36px", borderRadius: "var(--radius-xl)", background: "linear-gradient(135deg,#dcfce7,#bbf7d0)", border: "1px solid #86efac", textAlign: "center" }}>
              <div style={{ fontSize: "2rem", marginBottom: 6 }}>🎉</div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700, color: "#15803d", margin: "0 0 4px" }}>Survey Submitted!</h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "#166534", margin: 0 }}>Thank you! Redirecting you home...</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
