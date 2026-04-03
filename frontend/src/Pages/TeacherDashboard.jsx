import React, { useState, useEffect } from "react";
import TeacherSidebar from "../components/teacher/TeacherSidebar";
import TeacherOverview from "../components/teacher/TeacherOverview";
import ClassAnalytics from "../components/teacher/ClassAnalytics";
import RiskDetection from "../components/teacher/RiskDetection";
import MenteePanel from "../components/teacher/MenteePanel";
import FeedbackPanel from "../components/teacher/FeedbackPanel";
import PressureMonitor from "../components/teacher/PressureMonitor";
import AlertsPanel from "../components/teacher/AlertsPanel";
import TrendAnalytics from "../components/teacher/TrendAnalytics";
import MentoringNotes from "../components/teacher/MentoringNotes";

import "../components/teacher/teacher.css";
import rawData from "../data/teacherData.json";

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [allData]  = useState(rawData);
  const [alertCount, setAlertCount] = useState(0);

  // Fetch unread alert count for sidebar badge
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res  = await fetch("http://localhost:5000/api/teacher/alerts?mentor_id=teacher");
        const json = await res.json();
        if (Array.isArray(json)) {
          setAlertCount(json.filter(a => a.priority === "high").length);
        }
      } catch (_) {}
    };
    fetchCount();
    const iv = setInterval(fetchCount, 30000);
    return () => clearInterval(iv);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "overview":         return <TeacherOverview   data={allData} onNavigate={setActiveTab} />;
      case "class-analytics":  return <ClassAnalytics    data={allData} />;
      case "risk-detection":   return <RiskDetection     data={allData} />;
      case "mentee-panel":     return <MenteePanel       data={allData} />;
      case "feedback-messages":return <FeedbackPanel     data={allData} />;
      case "academic-pressure":return <PressureMonitor   data={allData} />;
      case "alerts":           return <AlertsPanel       data={allData} />;
      case "trends":           return <TrendAnalytics    data={allData} />;
      case "mentoring-notes":  return <MentoringNotes    data={allData} />;
      default:                 return <TeacherOverview   data={allData} onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="teacher-dashboard-layout">
      <TeacherSidebar activeTab={activeTab} onSelectTab={setActiveTab} alertCount={alertCount} />
      <main className="teacher-main-content">
        <header className="teacher-top-header">
          <div className="teacher-header-left">
            <h2>{renderHeaderTitle(activeTab)}</h2>
          </div>
          <div className="teacher-header-right">
            <span className="teacher-date-badge">
              {new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
            </span>
            {alertCount > 0 && (
              <button
                onClick={() => setActiveTab("alerts")}
                style={{
                  background: "#fef2f2", border: "1.5px solid #fecaca",
                  borderRadius: 50, padding: "5px 12px",
                  fontSize: "0.78rem", fontWeight: 700, color: "#ef4444",
                  cursor: "pointer", display: "flex", alignItems: "center", gap: 5,
                }}
              >
                🔴 {alertCount} High Risk Alert{alertCount !== 1 ? "s" : ""}
              </button>
            )}
            <div className="teacher-avatar">T</div>
          </div>
        </header>
        <div className="teacher-panel-view">{renderContent()}</div>
      </main>
    </div>
  );
};

const renderHeaderTitle = (tab) => {
  const titles = {
    overview:           "Overview",
    "class-analytics":  "Class Analytics",
    "risk-detection":   "Risk Detection",
    "mentee-panel":     "Mentee Monitoring Panel",
    "feedback-messages":"Feedback & Messages",
    "academic-pressure":"Academic Pressure Monitor",
    alerts:             "Recent Alerts",
    trends:             "Well-Being Trends",
    "mentoring-notes":  "Mentoring Notes",
  };
  return titles[tab] || "Teacher Dashboard";
};

export default TeacherDashboard;
