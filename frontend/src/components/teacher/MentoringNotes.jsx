import React, { useState } from 'react';
import './teacher.css';

const MentoringNotes = ({ data = [] }) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch real notes on mount
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const teacherId = localStorage.getItem('teacherId') || 'teacher';
        const res = await fetch(`http://localhost:5000/api/notes?mentor_id=${teacherId}`);
        const json = await res.json();
        if (Array.isArray(json)) setNotes(json);
      } catch (err) {
        console.error('Failed to fetch notes:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote || !selectedStudent) return;
    
    try {
      const res = await fetch('http://localhost:5000/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ student_id: selectedStudent, note: newNote })
      });
      const savedNote = await res.json();
      setNotes([savedNote, ...notes]);
      setNewNote('');
      setSelectedStudent('');
    } catch (err) {
      console.error('Failed to save note:', err);
    }
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
            {loading ? (
              <p style={{ color: '#64748b' }}>Loading notes...</p>
            ) : notes.length === 0 ? (
              <p style={{ color: '#64748b' }}>No mentee notes available.</p>
            ) : (
              notes.map(note => (
                <div key={note._id || note.id} className="note-card">
                  <div className="note-header">
                    <strong>{note.student_id || note.studentId}</strong>
                    <span className="note-date">
                      {note.timestamp ? new Date(note.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : note.date}
                    </span>
                  </div>
                  <p>{note.note || note.content}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentoringNotes;
