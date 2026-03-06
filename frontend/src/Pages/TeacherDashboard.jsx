// Pages/TeacherDashboard.jsx
// ─────────────────────────────────────────────────────────────
// Main Teacher Dashboard page with batch-based analytics.
//
// State:
//   selectedYear: "all" → Department Overview
//   selectedYear: "1st" | "2nd" | "3rd" | "4th" → Year Detail
//
// Data flow:
//   teacherData.json (local) → allData state
//   Filtered slice passed as `data` prop to child components
//
// TODO (backend): Replace JSON import + useEffect data init with:
//   useEffect(() => {
//     fetch('/api/teacher/all-responses')
//       .then(r => r.json())
//       .then(setAllData)
//       .catch(console.error);
//   }, []);
// ─────────────────────────────────────────────────────────────

import React, { useState, useMemo } from 'react';

// Data
import rawData from '../data/teacherData.json';

// Components
import BatchSelector     from '../components/teacher/BatchSelector';
import DepartmentOverview from '../components/teacher/DepartmentOverview';
import YearAnalytics     from '../components/teacher/YearAnalytics';

// Styles
import '../components/teacher/teacher.css';

// ── TeacherDashboard ────────────────────────────────────────

const TeacherDashboard = () => {
  // ── State ─────────────────────────────────────────────────
  const [selectedYear, setSelectedYear] = useState('all');

  // TODO (backend): Replace with API fetch result
  const [allData] = useState(rawData);

  // ── Derived data ──────────────────────────────────────────

  // Filtered slice for the selected year (or all if "all")
  const filteredData = useMemo(() => {
    if (selectedYear === 'all') return allData;
    return allData.filter((r) => r.year === selectedYear);
  }, [allData, selectedYear]);

  // Year summaries for BatchSelector badge counts
  const yearSummaries = useMemo(() => {
    const years = ['1st', '2nd', '3rd', '4th'];
    return years.map((yr) => {
      const rows = allData.filter((r) => r.year === yr);
      if (!rows.length) return { year: yr, riskLevel: 'low', responses: 0 };
      const avgEx = rows.reduce((s, r) => s + r.exhaustion, 0) / rows.length;
      const avgWl = rows.reduce((s, r) => s + r.workload,   0) / rows.length;
      const riskLevel =
        avgEx >= 8 && avgWl >= 8 ? 'high' :
        avgEx >= 5               ? 'moderate' : 'low';
      return { year: yr, riskLevel, responses: rows.length };
    });
  }, [allData]);

  // ── Handlers ──────────────────────────────────────────────

  const handleSelectYear = (year) => setSelectedYear(year);
  const handleBack       = ()     => setSelectedYear('all');

  // ── Render ────────────────────────────────────────────────

  return (
    <div className="teacher-dashboard">

      {/* ── Top Header ──────────────────────────────────── */}
      <header className="t-header">
        <div className="t-header__brand">
          <div className="t-header__logo">🎓</div>
          <div>
            <div className="t-header__title">Teacher Dashboard</div>
            <div className="t-header__sub">
              Mental Health & Academic Workload Monitoring
            </div>
          </div>
        </div>

        <div className="t-header__right">
          <div className="t-header__chip">
            🕐 {new Date().toLocaleDateString('en-GB', {
              day: '2-digit', month: 'short', year: 'numeric'
            })}
          </div>
          <div className="t-header__chip">
            📊 {allData.length} total responses
          </div>
          <div className="t-header__avatar">AS</div>
        </div>
      </header>

      {/* ── Batch/Year Selector ─────────────────────────── */}
      <BatchSelector
        selectedYear={selectedYear}
        onSelectYear={handleSelectYear}
        yearSummaries={yearSummaries}
      />

      {/* ── Main Content ────────────────────────────────── */}
      <main className="t-main">
        {selectedYear === 'all' ? (
          // Department overview
          <DepartmentOverview
            allData={allData}
            onSelectYear={handleSelectYear}
          />
        ) : (
          // Year-specific detail
          <YearAnalytics
            year={selectedYear}
            data={filteredData}
            onBack={handleBack}
          />
        )}
      </main>
    </div>
  );
};

export default TeacherDashboard;