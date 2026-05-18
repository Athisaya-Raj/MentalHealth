import React, { useState, useEffect } from 'react';

const ManageTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);

  const fetchTeachers = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/admin/teachers');
      const data = await res.json();
      setTeachers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this teacher?')) return;
    try {
      await fetch(`http://localhost:5000/api/admin/teachers/${id}`, { method: 'DELETE' });
      fetchTeachers();
    } catch (err) {
      console.error(err);
    }
  };

  const handleFileUpload = async () => {
    if (!file) return alert('Please select a file');
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const text = e.target.result;
        const parsed = JSON.parse(text); 
        
        await fetch('http://localhost:5000/api/admin/upload-teachers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ teachers: parsed })
        });
        alert('Upload successful');
        fetchTeachers();
      } catch (err) {
        alert('Invalid file format. Please upload a valid JSON array.');
        console.error(err);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="admin-panel">
      <div className="admin-panel-header">
        <h3>Manage Teachers</h3>
        <div className="admin-actions">
          <div className="file-upload-wrapper">
            <input type="file" className="file-input" accept=".json" onChange={e => setFile(e.target.files[0])} />
            <button className="btn-secondary" onClick={handleFileUpload}>Upload JSON</button>
          </div>
          <button className="btn-primary">+ Add Teacher</button>
        </div>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Department</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? <tr><td colSpan="5">Loading...</td></tr> : teachers.map(t => (
              <tr key={t._id}>
                <td>{t.name}</td>
                <td>{t.username}</td>
                <td>{t.department}</td>
                <td>{t.email}</td>
                <td>
                  <button className="btn-delete" onClick={() => handleDelete(t._id)}>Delete</button>
                </td>
              </tr>
            ))}
            {!loading && teachers.length === 0 && (
              <tr><td colSpan="5">No teachers found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageTeachers;
