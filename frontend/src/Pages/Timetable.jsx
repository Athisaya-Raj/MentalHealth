import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// ── Components ────────────────────────────────────────────────────────────────
import DailySchedule    from '../components/timetable/dailyschedule';
import LabTheoryBalance from '../components/timetable/labtheorybalance';
import AssignmentLoad   from '../components/timetable/assignmentload';
import TimeAvailability from '../components/timetable/timeavailability';
import BreaksDesign     from '../components/timetable/breaksdesign';
import WeeklyHeatmap    from '../components/timetable/weeklyheatmap';
import MentalImpact     from '../components/timetable/mentalimpact';
import Reflection       from '../components/timetable/reflection';

import '../components/timetable/timetable.css';

// ── Initial State ─────────────────────────────────────────────────────────────
const initialState = {
  dailySchedule: {
    exhaustionLevel:    5,
    backToBackClasses:  2,
    energyAfterCollege: '',
  },
  labTheoryBalance: {
    balance:               '',
    labDifficulty:          3,
    mentalFatigueAfterLabs: 3,
  },
  assignmentLoad: {
    loadIntensity:       5,
    overlappingDeadlines: null,
    reviewPressure:       3,
    weeklySubmissions:    2,
  },
  timeAvailability: {
    selfStudyTime:       5,
    placementPrepTime:   3,
    extracurricularTime: 2,
    freeTimeSatisfaction: '',
  },
  breaksDesign: {
    breakSufficiency:    3,
    lunchTimingRating:   '',
    longGapsFrustration: 3,
    earlyMorningFatigue: 3,
  },
  weeklyHeatmap: {
    monday:    '',
    tuesday:   '',
    wednesday: '',
    thursday:  '',
    friday:    '',
  },
  mentalImpact: {
    factors: [],
  },
  reflection: {
    biggestStress:          '',
    improvementSuggestions: '',
  },
};

// ── Page Component ────────────────────────────────────────────────────────────
export default function Timetable() {
  const navigate = useNavigate();
  const [timetableData, setTimetableData] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);

  /** Generic section updater passed as onUpdate prop to each child */
  const updateSection = (section, value) => {
    setTimetableData(prev => ({ ...prev, [section]: value }));
  };

  /** Finish handler — logs to console, then navigates back */
  const handleFinish = async () => {
    console.log('═══════════════════════════════════════════════');
    console.log('  TIMETABLE MODULE — FORM DATA SUBMITTED');
    console.log('═══════════════════════════════════════════════');
    console.log(JSON.stringify(timetableData, null, 2));
    console.log('═══════════════════════════════════════════════');

    try {
      const studentId = localStorage.getItem("studentId");
      
      const payload = {
        studentId: studentId || "dummy-student-id",
        hoursStudied: timetableData.timeAvailability.selfStudyTime,
        sleepHours: timetableData.timeAvailability.sleepHours || 6, // extract from data if available, defaulting to 6
        workloadStressLevel: timetableData.assignmentLoad.loadIntensity
      };

      await fetch("http://localhost:5000/api/surveys/workload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

    } catch (e) {
      console.error("Failed to submit workload data", e);
    }

    setSubmitted(true);
    setTimeout(() => {
      navigate('/student/home');
    }, 1800);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #eff6ff 0%, #f8fafc 40%, #dbeafe 100%)',
      fontFamily: 'var(--font-body)',
    }}>

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--blue-100)',
        boxShadow: '0 2px 12px rgba(30,58,138,0.06)',
      }}>
        <div style={{
          maxWidth: 860,
          margin: '0 auto',
          padding: '0 24px',
          height: 68,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 20,
        }}>
          {/* Back Button */}
          <button
            onClick={() => navigate('/student/home')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 16px',
              borderRadius: 'var(--radius-md)',
              border: '1.5px solid var(--blue-200)',
              background: 'var(--blue-50)',
              color: 'var(--blue-700)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all var(--transition)',
              flexShrink: 0,
            }}
            onMouseOver={e => {
              e.currentTarget.style.background = 'var(--blue-600)';
              e.currentTarget.style.color = 'white';
              e.currentTarget.style.borderColor = 'var(--blue-600)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.background = 'var(--blue-50)';
              e.currentTarget.style.color = 'var(--blue-700)';
              e.currentTarget.style.borderColor = 'var(--blue-200)';
            }}
          >
            ← Back
          </button>

          {/* Title */}
          <div style={{ flex: 1, textAlign: 'center' }}>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.1rem',
              fontWeight: 700,
              color: 'var(--blue-900)',
              margin: 0,
              letterSpacing: '-0.02em',
            }}>
              Timetable & Workload Module
            </h1>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.72rem',
              color: 'var(--slate-400)',
              margin: '1px 0 0 0',
            }}>
              Student Mental Health Monitoring System
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{ height: 3, background: 'var(--blue-100)' }}>
          <div style={{
            height: '100%',
            width: submitted ? '100%' : '12%',
            background: 'linear-gradient(90deg, #60a5fa, #2563eb)',
            transition: 'width 1.5s ease',
            borderRadius: '0 2px 2px 0',
          }} />
        </div>
      </header>

      {/* ── Page Content ─────────────────────────────────────────────────── */}
      <main style={{ maxWidth: 860, margin: '0 auto', padding: '40px 24px 80px' }}>

        {/* Hero Section */}
        <div style={{
          textAlign: 'center',
          marginBottom: 48,
          padding: '40px 32px',
          background: 'linear-gradient(135deg, var(--blue-600) 0%, var(--blue-800) 100%)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: '0 8px 32px rgba(30,58,138,0.2)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Background decoration */}
          <div style={{
            position: 'absolute',
            top: -40, right: -40,
            width: 180, height: 180,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)',
          }} />
          <div style={{
            position: 'absolute',
            bottom: -30, left: -30,
            width: 130, height: 130,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)',
          }} />

          <div style={{ fontSize: '2.8rem', marginBottom: 12 }}>🎓</div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.8rem',
            fontWeight: 700,
            color: 'white',
            margin: '0 0 10px 0',
            letterSpacing: '-0.03em',
          }}>
            Timetable &amp; Workload Survey
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.95rem',
            color: 'rgba(255,255,255,0.75)',
            maxWidth: 520,
            margin: '0 auto',
            lineHeight: 1.7,
          }}>
            Complete all 8 modules to help us understand how your academic schedule impacts your mental health.
            Your responses are confidential and used only to improve student well-being.
          </p>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 20,
            marginTop: 24,
            flexWrap: 'wrap',
          }}>
            {['~5 mins', 'Confidential', '8 Modules'].map(tag => (
              <span key={tag} style={{
                padding: '6px 16px',
                borderRadius: 100,
                background: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.2)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: 'rgba(255,255,255,0.9)',
              }}>{tag}</span>
            ))}
          </div>
        </div>

        {/* ── Modules ──────────────────────────────────────────────────────── */}
        <DailySchedule
          data={timetableData.dailySchedule}
          onUpdate={updateSection}
        />

        <LabTheoryBalance
          data={timetableData.labTheoryBalance}
          onUpdate={updateSection}
        />

        <AssignmentLoad
          data={timetableData.assignmentLoad}
          onUpdate={updateSection}
        />

        <TimeAvailability
          data={timetableData.timeAvailability}
          onUpdate={updateSection}
        />

        <BreaksDesign
          data={timetableData.breaksDesign}
          onUpdate={updateSection}
        />

        <WeeklyHeatmap
          data={timetableData.weeklyHeatmap}
          onUpdate={updateSection}
        />

        <MentalImpact
          data={timetableData.mentalImpact}
          onUpdate={updateSection}
        />

        <Reflection
          data={timetableData.reflection}
          onUpdate={updateSection}
        />

        {/* ── Finish Button ─────────────────────────────────────────────── */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
          paddingTop: 16,
        }}>
          {!submitted ? (
            <>
              <button
                onClick={handleFinish}
                style={{
                  padding: '18px 56px',
                  borderRadius: 'var(--radius-lg)',
                  border: 'none',
                  background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                  color: 'white',
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 6px 24px rgba(37,99,235,0.35)',
                  transition: 'all 200ms ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  letterSpacing: '-0.01em',
                }}
                onMouseOver={e => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 10px 32px rgba(37,99,235,0.45)';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 6px 24px rgba(37,99,235,0.35)';
                }}
              >
                <span>✅</span>
                Submit
              </button>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.8rem',
                color: 'var(--slate-400)',
                margin: 0,
                textAlign: 'center',
              }}>
                Your responses will be logged and you'll be redirected to the home page.
              </p>
            </>
          ) : (
            <div style={{
              padding: '24px 40px',
              borderRadius: 'var(--radius-xl)',
              background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)',
              border: '1px solid #86efac',
              textAlign: 'center',
              boxShadow: '0 4px 16px rgba(34,197,94,0.15)',
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: 8 }}>🎉</div>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.2rem',
                fontWeight: 700,
                color: '#15803d',
                margin: '0 0 6px 0',
              }}>
                Survey Submitted!
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                color: '#166534',
                margin: 0,
              }}>
                Thank you for your responses. Redirecting you home...
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}