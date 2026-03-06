import React from "react";

function SupportContact() {
  return (
    <div className="mw-card">
      <h2>Need Someone to Talk To?</h2>
      
      <div className="mw-support-grid">
        <button 
          className="mw-support-btn" 
          onClick={() => alert("Connecting to Mentor...")}
        >
          Talk to Mentor
        </button>
        
        <button 
          className="mw-support-btn" 
          onClick={() => alert("Connecting to Student Counselor...")}
        >
          Contact Student Counselor
        </button>
        
        <button 
          className="mw-support-btn urgent" 
          onClick={() => alert("Reporting Severe Stress...")}
        >
          Report Severe Stress
        </button>
      </div>
    </div>
  );
}

export default SupportContact;
