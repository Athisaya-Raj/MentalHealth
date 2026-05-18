import React, { useState, useEffect } from 'react';

const AssignMentees = () => {
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [selectedStudents, setSelectedStudents] = useState(new Set());

  const fetchData = async () => {
    setLoading(true);
    try {
      const [resT, resS] = await Promise.all([
        fetch('http://localhost:5000/api/admin/teachers'),
        fetch('http://localhost:5000/api/admin/students')
      ]);
      const dataT = await resT.json();
      const dataS = await resS.json();
      setTeachers(dataT);
      setStudents(dataS);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleStudent = (id) => {
    const newSet = new Set(selectedStudents);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedStudents(newSet);
  };

  const handleAssign = async () => {
    if (!selectedTeacher) return alert('Please select a teacher');
    if (selectedStudents.size === 0) return alert('Please select at least one student');

    try {
      const res = await fetch('http://localhost:5000/api/admin/assign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teacherId: selectedTeacher,
          studentIds: Array.from(selectedStudents)
        })
      });
      const data = await res.json();
      if (res.ok) {
        alert('Successfully assigned mentees!');
        setSelectedStudents(new Set());
        fetchData(); // refresh to show updated assignments
      } else {
        alert(data.message || 'Failed to assign');
      }
    } catch (err) {
      console.error(err);
      alert('Error assigning students');
    }
  };

  return (
    <div className="admin-panel">
      <div className="admin-panel-header">
        <h3>Assign Mentees to Teachers</h3>
        <button className="btn-primary" onClick={handleAssign}>
          Assign Selected
        </button>
      </div>

      {loading ? <p>Loading data...</p> : (
        <div className="assign-container">
          
          <div className="form-group">
            <label>1. Select Teacher</label>
            <select 
              className="form-select"
              value={selectedTeacher} 
              onChange={e => setSelectedTeacher(e.target.value)}
            >
              <option value="">-- Choose a Teacher --</option>
              {teachers.map(t => (
                <option key={t._id} value={t._id}>{t.name} ({t.department})</option>
              ))}
            </select>

            <div style={{ marginTop: '24px' }}>
              <label>Current Assignment Stats:</label>
              <p style={{ fontSize: '0.9rem', color: '#64748b' }}>
                {selectedTeacher ? 
                  `${students.filter(s => s.mentor_id === selectedTeacher).length} students currently assigned.` 
                  : 'Select a teacher to view stats.'}
              </p>
            </div>
          </div>

          <div className="form-group">
            <label>2. Select Students ({selectedStudents.size} selected)</label>
            <div className="student-list-box">
              {students.map(s => {
                const isAssignedToCurrent = selectedTeacher && s.mentor_id === selectedTeacher;
                const isAssignedToOther = s.mentor_id && s.mentor_id !== 'teacher' && s.mentor_id !== selectedTeacher;

                return (
                  <label key={s._id} className="student-checkbox-item">
                    <input 
                      type="checkbox" 
                      checked={selectedStudents.has(s._id)}
                      onChange={() => toggleStudent(s._id)}
                    />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontWeight: 500, color: '#1e293b' }}>
                        {s.name} ({s.registerNumber})
                      </span>
                      <span style={{ fontSize: '0.75rem', color: isAssignedToCurrent ? '#22c55e' : (isAssignedToOther ? '#f59e0b' : '#94a3b8') }}>
                        {isAssignedToCurrent ? 'Already assigned to this teacher' : (s.mentor_id === 'teacher' || !s.mentor_id ? 'Unassigned' : 'Assigned to another teacher')}
                      </span>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default AssignMentees;
