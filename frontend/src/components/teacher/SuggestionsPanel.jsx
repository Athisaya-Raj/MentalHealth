// components/teacher/SuggestionsPanel.jsx
// ---------------------------------------------------------------
// Scrollable list of anonymised student feedback comments,
// colour-coded by stress level, with a side summary panel.
//
// Props (all optional — defaults to dummy data):
//   feedbackList: Array<{
//     id: string,
//     author: string,          // anonymised label, e.g. "Student #14"
//     text: string,            // feedback comment
//     stressLevel: 'low' | 'moderate' | 'high',
//     timestamp: string,       // display string
//   }>
//   summaryStats: {
//     totalComments: number,
//     actionableItems: number,
//     avgSentiment: string,    // e.g. "Negative"
//   }
// ---------------------------------------------------------------

import React from 'react';

// ----- Default dummy data -----
const DEFAULT_FEEDBACK = [
  {
    id: '1',
    author: 'Student #07',
    text: 'We have three major exams in the same week. It is very hard to prepare for all of them together without feeling completely exhausted.',
    stressLevel: 'high',
    timestamp: '2 hours ago',
  },
  {
    id: '2',
    author: 'Student #22',
    text: 'The workload this semester feels manageable so far, but the back-to-back lab sessions on Tuesdays are tiring.',
    stressLevel: 'moderate',
    timestamp: '5 hours ago',
  },
  {
    id: '3',
    author: 'Student #31',
    text: 'I think the current pace is fine. Having office hours available really helps when I get stuck.',
    stressLevel: 'low',
    timestamp: '1 day ago',
  },
  {
    id: '4',
    author: 'Student #15',
    text: 'Four assignments due on the same Friday is overwhelming. Could we spread them out across the week?',
    stressLevel: 'high',
    timestamp: '1 day ago',
  },
  {
    id: '5',
    author: 'Student #09',
    text: 'The subject content is interesting but the reading list is very long on top of everything else.',
    stressLevel: 'moderate',
    timestamp: '2 days ago',
  },
  {
    id: '6',
    author: 'Student #44',
    text: 'Classes are good. I wish we had a short break between Period 2 and Period 3 on Wednesdays.',
    stressLevel: 'low',
    timestamp: '2 days ago',
  },
  {
    id: '7',
    author: 'Student #38',
    text: 'Honestly struggling to sleep because I am thinking about the upcoming assessment schedule.',
    stressLevel: 'high',
    timestamp: '3 days ago',
  },
];

const DEFAULT_SUMMARY = {
  totalComments: 142,
  actionableItems: 38,
  avgSentiment: 'Mixed',
};

const STRESS_LABEL = {
  low: 'Low Stress',
  moderate: 'Moderate',
  high: 'High Stress',
};

const SuggestionsPanel = ({
  feedbackList = DEFAULT_FEEDBACK,
  summaryStats = DEFAULT_SUMMARY,
}) => {
  return (
    <div className="suggestions-panel-grid">

      {/* Scrollable feedback list */}
      <div className="t-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px 12px', borderBottom: '1px solid #e5e7eb' }}>
          <p className="t-card__title" style={{ margin: 0 }}>Student Feedback Comments</p>
          <p className="t-card__subtitle" style={{ margin: '4px 0 0' }}>
            Anonymised — backend: fetched from survey free-text responses, sorted by recency
          </p>
        </div>

        {/* Scrollable area */}
        <div className="suggestions-scroll" style={{ padding: '16px 20px' }}>
          {feedbackList.map((item) => (
            <div
              key={item.id}
              className={`suggestion-card suggestion-card--${item.stressLevel}`}
            >
              <div className="suggestion-card__meta">
                <span className="suggestion-card__author">{item.author}</span>
                <span className={`suggestion-card__badge badge--${item.stressLevel}`}>
                  {STRESS_LABEL[item.stressLevel]}
                </span>
              </div>
              <p className="suggestion-card__text">"{item.text}"</p>
              <span className="suggestion-card__timestamp">🕐 {item.timestamp}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Side summary */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* Summary stats */}
        <div className="t-card">
          <p className="t-card__title">Feedback Summary</p>
          <p className="t-card__subtitle" style={{ marginBottom: 12 }}>
            Backend: aggregate counts from NLP pipeline
          </p>

          <div className="suggestions-summary">
            <div className="summary-stat">
              <div className="summary-stat__value">{summaryStats.totalComments}</div>
              <div className="summary-stat__label">Total Comments</div>
            </div>
            <div className="summary-stat">
              <div className="summary-stat__value" style={{ color: '#1a56db' }}>
                {summaryStats.actionableItems}
              </div>
              <div className="summary-stat__label">Actionable Items</div>
            </div>
            <div className="summary-stat">
              <div className="summary-stat__value" style={{ color: '#f59e0b' }}>
                {summaryStats.avgSentiment}
              </div>
              <div className="summary-stat__label">Avg Sentiment</div>
            </div>
          </div>
        </div>

        {/* Quick action card */}
        <div className="t-card" style={{ background: '#eff6ff', border: '1px solid #bfdbfe' }}>
          <p className="t-card__title" style={{ color: '#1e40af' }}>💡 Quick Actions</p>
          <ul style={{
            margin: '8px 0 0', padding: '0 0 0 18px',
            fontSize: '0.82rem', color: '#1e40af', lineHeight: 2
          }}>
            <li>Review high-stress comments</li>
            <li>Schedule a class discussion</li>
            <li>Redistribute assignment deadlines</li>
            <li>Export report for admin</li>
          </ul>
        </div>
      </div>

    </div>
  );
};

export default SuggestionsPanel;