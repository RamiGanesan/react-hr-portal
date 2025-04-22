import React, { useState } from 'react';
import bgimg from  './images/bg1.jpg'

const EmployeeDashboard = () => {
  const [reason, setReason] = useState('');
  
  const handleViewDetails = () => {
    alert('User Details:\nName: Steven\nPosition: Software Engineer');
  };

  const handleViewLeaveStatus = () => {
    alert('Leave Status:\nYou have 5 leave days remaining.');
  };

  const handleApplyLeave = () => {
    if (reason.trim() === '') {
      alert('Please enter a reason for leave.');
    } else {
      alert(`Leave Applied Successfully!\nReason: ${reason}`);
      setReason('');
    }
  };
  const backgroundStyle = {
    backgroundImage: `url(${bgimg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
  };

  const cardStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '10px'
  };

  return (
    <div style={backgroundStyle}>
      <div className="container">
        <h2 className="text-center text-danger mb-4">Employee Dashboard</h2>
        <div className="row justify-content-center">

          {/* Welcome User Card */}
          <div className="col-md-3 m-2">
            <div className="card text-center p-3 shadow" style={cardStyle}>
              <h5 className="card-title">Welcome User</h5>
              <p className="card-text">Steven</p>
              <button className="btn btn-primary" onClick={handleViewDetails}>
                View Details
              </button>
            </div>
          </div>

          {/* Leave Status Card */}
          <div className="col-md-3 m-2">
            <div className="card text-center p-3 shadow" style={cardStyle}>
              <h5 className="card-title">Steven View your leave details!</h5>
              <button className="btn btn-primary mt-3" onClick={handleViewLeaveStatus}>
                View Leave Status
              </button>
            </div>
          </div>

          {/* Apply for Leave Card */}
          <div className="col-md-3 m-2">
            <div className="card p-3 shadow" style={cardStyle}>
              <h5 className="card-title text-center">Apply for Leave</h5>
              <div className="form-group">
                <label htmlFor="reason">Reason for Leave</label>
                <textarea
                  className="form-control"
                  id="reason"
                  rows="3"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                ></textarea>
              </div>
              <button className="btn btn-primary mt-3 w-100" onClick={handleApplyLeave}>
                Apply Leave
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
