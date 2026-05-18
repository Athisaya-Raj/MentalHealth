import React, { useState, useEffect } from 'react';

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '', department: '', year: '', classSection: '',
    registerNumber: '', email: '', password: '', mentor_id: '',
    phone: '', parentContact: '', notes: ''
  });
  const [formErrors, setFormErrors] = useState({});

  // Dummy teachers for dropdown (backend integration later)
  const dummyTeachers = [
    { id: 'teacher', name: 'Teacher 1 (CSE)' },
    { id: 'teacher1', name: 'Teacher 2 (ECE)' },
    { id: 'teacher2', name: 'Teacher 3 (IT)' },
  ];

  const fetchStudents = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/admin/students');
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;
    try {
      await fetch(`http://localhost:5000/api/admin/students/${id}`, { method: 'DELETE' });
      fetchStudents();
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
        await fetch('http://localhost:5000/api/admin/upload-students', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ students: parsed })
        });
        alert('Upload successful');
        fetchStudents();
      } catch (err) {
        alert('Invalid file format. Please upload a valid JSON array.');
        console.error(err);
      }
    };
    reader.readAsText(file);
  };

  const openModal = () => {
    setFormData({
      name: '', department: '', year: '', classSection: '',
      registerNumber: '', email: '', password: '', mentor_id: '',
      phone: '', parentContact: '', notes: ''
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSaveStudent = (e) => {
    e.preventDefault();

    // Basic Validation
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Full Name is required';
    if (!formData.department.trim()) errors.department = 'Department is required';
    if (!formData.year.trim()) errors.year = 'Year is required';
    if (!formData.classSection.trim()) errors.classSection = 'Class Section is required';
    if (!formData.registerNumber.trim()) errors.registerNumber = 'Register Number is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    if (!formData.password.trim()) errors.password = 'Password is required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Success (Frontend only for now)
    const newStudent = {
      _id: 'temp-' + Date.now(),
      ...formData
    };

    setStudents(prev => [newStudent, ...prev]);
    setIsModalOpen(false);

    // Optional nice alert (can be replaced with a toast notification later)
    alert('✅ Student successfully added!\n(Note: This is saved in local UI state only for now, pending backend connection)');
  };

  return (
    <div className="admin-panel">
      <div className="admin-panel-header">
        <h3>Manage Students</h3>
        <div className="admin-actions">
          <div className="file-upload-wrapper">
            <input type="file" className="file-input" accept=".json" onChange={e => setFile(e.target.files[0])} />
            <button className="btn-secondary" onClick={handleFileUpload}>Upload JSON</button>
          </div>
          <button className="btn-primary" onClick={openModal}>+ Add Student</button>
        </div>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Register Number</th>
              <th>Department</th>
              <th>Year</th>
              <th>Email</th>
              <th>Assigned Mentor</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? <tr><td colSpan="7">Loading...</td></tr> : students.map(s => (
              <tr key={s._id}>
                <td>{s.name}</td>
                <td>{s.registerNumber}</td>
                <td>{s.department}</td>
                <td>{s.year}</td>
                <td>{s.email}</td>
                <td>{s.mentor_id ? (s.mentor_id === 'teacher' ? 'Default Teacher' : s.mentor_id) : 'Unassigned'}</td>
                <td>
                  <button className="btn-delete" onClick={() => handleDelete(s._id)}>Delete</button>
                </td>
              </tr>
            ))}
            {!loading && students.length === 0 && (
              <tr><td colSpan="7">No students found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ADD STUDENT MODAL */}
      {isModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h2>Add New Student</h2>
              <button className="admin-modal-close" onClick={() => setIsModalOpen(false)}>×</button>
            </div>

            <form onSubmit={handleSaveStudent}>
              <div className="admin-modal-body">

                <div className="form-grid">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input type="text" name="name" className={`form-input ${formErrors.name ? 'input-error' : ''}`} value={formData.name} onChange={handleInputChange} placeholder="e.g. John Doe" />
                    {formErrors.name && <span className="error-text">{formErrors.name}</span>}
                  </div>

                  <div className="form-group">
                    <label>Register Number *</label>
                    <input type="text" name="registerNumber" className={`form-input ${formErrors.registerNumber ? 'input-error' : ''}`} value={formData.registerNumber} onChange={handleInputChange} placeholder="e.g. 3122215001" />
                    {formErrors.registerNumber && <span className="error-text">{formErrors.registerNumber}</span>}
                  </div>

                  <div className="form-group">
                    <label>Department *</label>
                    <select name="department" className={`form-select ${formErrors.department ? 'input-error' : ''}`} value={formData.department} onChange={handleInputChange}>
                      <option value="">Select Department</option>
                      <option value="CSE">CSE</option>
                      <option value="IT">IT</option>
                      <option value="ECE">ECE</option>
                      <option value="EEE">EEE</option>
                      <option value="MECH">MECH</option>
                    </select>
                    {formErrors.department && <span className="error-text">{formErrors.department}</span>}
                  </div>

                  <div className="form-group">
                    <label>Year *</label>
                    <select name="year" className={`form-select ${formErrors.year ? 'input-error' : ''}`} value={formData.year} onChange={handleInputChange}>
                      <option value="">Select Year</option>
                      <option value="1st year">1st Year</option>
                      <option value="2nd year">2nd Year</option>
                      <option value="3rd year">3rd Year</option>
                      <option value="4th year">4th Year</option>
                    </select>
                    {formErrors.year && <span className="error-text">{formErrors.year}</span>}
                  </div>

                  <div className="form-group">
                    <label>Class Section *</label>
                    <select name="classSection" className={`form-select ${formErrors.classSection ? 'input-error' : ''}`} value={formData.classSection} onChange={handleInputChange}>
                      <option value="">Select Section</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                    </select>
                    {formErrors.classSection && <span className="error-text">{formErrors.classSection}</span>}
                  </div>

                  <div className="form-group">
                    <label>Assign Mentor</label>
                    <select name="mentor_id" className="form-select" value={formData.mentor_id} onChange={handleInputChange}>
                      <option value="">Unassigned</option>
                      {dummyTeachers.map(t => (
                        <option key={t.id} value={t.id}>{t.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Email *</label>
                    <input type="email" name="email" className={`form-input ${formErrors.email ? 'input-error' : ''}`} value={formData.email} onChange={handleInputChange} placeholder="student@ssn.edu.in" />
                    {formErrors.email && <span className="error-text">{formErrors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label>Password *</label>
                    <input type="password" name="password" className={`form-input ${formErrors.password ? 'input-error' : ''}`} value={formData.password} onChange={handleInputChange} placeholder="Create a strong password" />
                    {formErrors.password && <span className="error-text">{formErrors.password}</span>}
                  </div>



                  {/*<div className="form-group form-group-full">
                    <label>Additional Notes <span style={{ color: '#94a3b8', fontWeight: 400 }}>(Optional)</span></label>
                    <textarea name="notes" className="form-input" rows="3" value={formData.notes} onChange={handleInputChange} placeholder="Any specific alerts or context regarding the student..."></textarea>
                  </div>*/}

                </div>
              </div>

              <div className="admin-modal-footer">
                <button type="button" className="btn-cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-save">Save Student</button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default ManageStudents;
