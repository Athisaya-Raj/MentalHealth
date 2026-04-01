import React from 'react';
import './teacher.css';

const StressHeatmap = () => {
  // Mock data for Timetable Stress Heatmap
  // Rows: Time slots, Columns: Days (Mon-Fri)
  // Value: 1 (Low) to 5 (High)
  const heatmapData = [
    { time: '08:00 AM', Mon: 2, Tue: 3, Wed: 5, Thu: 2, Fri: 4 },
    { time: '09:00 AM', Mon: 3, Tue: 4, Wed: 5, Thu: 3, Fri: 4 },
    { time: '10:00 AM', Mon: 4, Tue: 5, Wed: 4, Thu: 4, Fri: 3 },
    { time: '11:00 AM', Mon: 2, Tue: 2, Wed: 3, Thu: 5, Fri: 2 },
    { time: '01:00 PM', Mon: 5, Tue: 3, Wed: 2, Thu: 4, Fri: 1 },
    { time: '02:00 PM', Mon: 4, Tue: 2, Wed: 2, Thu: 3, Fri: 1 },
    { time: '03:00 PM', Mon: 3, Tue: 1, Wed: 1, Thu: 2, Fri: 1 },
  ];

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

  const getColor = (value) => {
    switch(value) {
      case 1: return '#e8f5e9'; // Low stress (Light green)
      case 2: return '#c8e6c9';
      case 3: return '#ffcc80'; // Moderate (Orange)
      case 4: return '#ef5350'; // High (Light red)
      case 5: return '#d32f2f'; // Very High (Dark red)
      default: return '#f5f5f5';
    }
  };

  return (
    <div className="heatmap-container">
      <h4>Weekly Timetable Stress Heatmap</h4>
      <p className="chart-subtext">Darker red indicates high stress reporting (e.g. back-to-back heavy classes).</p>
      
      <div className="heatmap-grid-wrapper">
        <table className="heatmap-table">
          <thead>
            <tr>
              <th>Time / Day</th>
              {days.map(day => <th key={day}>{day}</th>)}
            </tr>
          </thead>
          <tbody>
            {heatmapData.map((row, idx) => (
              <tr key={idx}>
                <td className="time-col">{row.time}</td>
                {days.map(day => (
                  <td 
                    key={day} 
                    className="heatmap-cell"
                    style={{ backgroundColor: getColor(row[day]) }}
                    title={`Stress Level: ${row[day]}/5`}
                  >
                    {row[day]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="heatmap-legend">
        <span>Low Stress</span>
        <div className="gradient-bar"></div>
        <span>High Stress</span>
      </div>
    </div>
  );
};

export default StressHeatmap;
