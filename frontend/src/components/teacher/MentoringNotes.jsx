import React, { useState } from 'react';
import './teacher.css';

const MentoringNotes = ({ data = [] }) => {
  const [notes, setNotes] = useState([
    { id: 1, studentId: 'Student #05', date: 'Oct 12, 2023', content: 'Met to discuss lab pressure. Decided to grant a 2-day extension on the upcoming submission.' },
    { id: 2, studentId: 'Student #12', date: 'Oct 10, 2023', content: 'Checking on mid-semester stress. Seems to be managing better after dropping an elective.' }
  ]);
  const [newNote, setNewNote] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNote || !selectedStudent) return;
    
    setNotes([
      {
        id: Date.now(),
        studentId: selectedStudent,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        content: newNote
      },
      ...notes
    ]);
    setNewNote('');
    setSelectedStudent('');
  };

  return (
    <div className="teacher-panel-container">
      <div className="panel-header">
        <h3>Private Mentoring Notes</h3>
        <p>Keep a confidential log of your check-ins and support actions for students.</p>
      </div>

      <div className="notes-layout">
        <div className="note-editor card">
          <h4>New Session Note</h4>
          <form className="note-form" onSubmit={handleAddNote}>
            <div className="form-group">
              <label>Select Student</label>
              <select 
                value={selectedStudent} 
                onChange={(e) => setSelectedStudent(e.target.value)}
                required
              >
                <option value="" disabled>-- Choose a student --</option>
                {Array.from(new Set(data.map(d => d.studentRef))).map(studentRef => (
                  <option key={studentRef} value={studentRef}>{studentRef}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Meeting Summary & Support Actions</label>
              <textarea 
                rows="5" 
                placeholder="E.g., Discussed time management strategies. Recommended visiting the academic counseling center."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                required
              ></textarea>
            </div>
            <button type="submit" className="primary-btn">Save Note</button>
          </form>
        </div>

        <div className="notes-history">
          <h4>History</h4>
          <div className="notes-list">
            {notes.map(note => (
              <div key={note.id} className="note-card">
                <div className="note-header">
                  <strong>{note.studentId}</strong>
                  <span className="note-date">{note.date}</span>
                </div>
                <p>{note.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentoringNotes;
