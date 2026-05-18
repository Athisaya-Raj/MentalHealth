import React from 'react';

const AdminSidebar = ({ activeTab, setActiveTab, onLogout }) => {
  const menuItems = [
    { id: 'students', label: 'Manage Students', icon: '🎓' },
    { id: 'teachers', label: 'Manage Teachers', icon: '👨‍🏫' },
    { id: 'assign',   label: 'Assign Mentees', icon: '🔗' },
  ];

  return (
    <div className="admin-sidebar">
      <div className="admin-logo">
        <div className="admin-logo-icon">⚙️</div>
        <span>System Admin</span>
      </div>
      
      <nav className="admin-nav">
        {menuItems.map(item => (
          <button
            key={item.id}
            className={`admin-nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            <span className="admin-nav-icon">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="admin-sidebar-footer">
        <button className="admin-logout-btn" onClick={onLogout}>
          <span className="admin-nav-icon">🚪</span>
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
