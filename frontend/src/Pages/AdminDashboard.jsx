import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar';
import ManageStudents from '../components/admin/ManageStudents';
import ManageTeachers from '../components/admin/ManageTeachers';
import AssignMentees from '../components/admin/AssignMentees';
import '../components/admin/admin.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('students');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'students': return <ManageStudents />;
      case 'teachers': return <ManageTeachers />;
      case 'assign':   return <AssignMentees />;
      default:         return <ManageStudents />;
    }
  };

  return (
    <div className="admin-layout">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />
      <div className="admin-main">
        <header className="admin-header">
          <h2>Admin Control Panel</h2>
          <div className="admin-profile">
            <span>Administrator</span>
            <div className="admin-avatar">A</div>
          </div>
        </header>
        <div className="admin-content-area">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
