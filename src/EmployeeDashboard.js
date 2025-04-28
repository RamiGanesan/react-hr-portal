import React, { useState, useEffect } from "react";
import bgimg from "./images/bg1.jpg";

const EmployeeDashboard = () => {
  const [reason, setReason] = useState("");
  const [employee, setEmployee] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [errors, setErrors] = useState({});
  const [showDetailsCard, setShowDetailsCard] = useState(false);
  const [showLeaveStatusCard, setShowLeaveStatusCard] = useState(false);
  
  // Fetch employee data from localStorage on component mount
  useEffect(() => {
    const loggedInEmployee = JSON.parse(
      localStorage.getItem("loggedInEmployee")
    );
    setEmployee(loggedInEmployee); // Store the employee data in state
  }, []);
  const handleLogout = () => {
    // Clear employee data from localStorage
    localStorage.removeItem("loggedInEmployee");

    // Optionally, clear isAuthenticated flag if you're using it
    localStorage.removeItem("isAuthenticated");
  };

  const handleViewDetails = () => {
    setShowDetailsCard(true);
    setShowLeaveStatusCard(false); // Hide leave status card if showing
  };
  
  const handleViewLeaveStatus = () => {
    setShowLeaveStatusCard(true);
    setShowDetailsCard(false); // Hide details card if showing
  };
  

  const handleApplyLeave = () => {
    const newErrors = {};

    if (!reason.trim()) {
      newErrors.reason = "Please enter a reason for leave.";
      setErrors(newErrors); // Update errors
    } else {
      // Prepare leave data to store
      const leaveRequest = {
        userName: employee.userName,
        reason: reason,
        date: new Date().toLocaleDateString(),
        status: "pending",
      };

      // Get existing leave requests from localStorage
      const existingLeaveRequests =
        JSON.parse(localStorage.getItem("leaveRequests")) || [];

      // Add the new leave request to the array
      existingLeaveRequests.push(leaveRequest);

      // Store updated leave requests in localStorage
      localStorage.setItem(
        "leaveRequests",
        JSON.stringify(existingLeaveRequests)
      );

      setShowToast(true); // Show the toast!
      setTimeout(() => setShowToast(false), 3000);
      // Clear the input field after applying
      setReason("");
      setErrors({});
    }
  };

  const backgroundStyle = {
    backgroundImage: `url(${bgimg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
  };

  const cardStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: "10px",
  };

  // If no employee data, show loading or error
  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <div style={backgroundStyle}>
      <div className="p-4">
        <a href="/" className="text-primary float-end" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i> Logout
        </a>
        <h2 className="text-center text-danger mb-4">Employee Dashboard</h2>
        <div className="row justify-content-center">
          {/* Welcome User Card */}
          <div className="col-md-3 m-2">
            <div className="card text-center p-3 shadow" style={cardStyle}>
              <h5 className="card-title">Welcome {employee.userName}</h5>
              <p className="card-text">{employee.email}</p>
              <button className="btn btn-primary" onClick={handleViewDetails}>
                View Details
              </button>
            </div>
          </div>

          {/* Leave Status Card */}
          <div className="col-md-3 m-2">
            <div className="card text-center p-3 shadow" style={cardStyle}>
              <h5 className="card-title">
                {employee.userName}, view your leave details!
              </h5>
              <button
                className="btn btn-primary mt-3"
                onClick={handleViewLeaveStatus}
              >
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
                  className={`form-control ${
                    errors.reason ? "is-invalid" : ""
                  }`}
                  id="reason"
                  rows="3"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                ></textarea>{" "}
                {errors.reason && (
                  <div className="invalid-feedback">{errors.reason}</div>
                )}
              </div>
              <button
                className="btn btn-primary mt-3 w-100"
                onClick={handleApplyLeave}
              >
                Apply Leave
              </button>
            </div>
          </div>
        </div>
        <div className="row justify-content-center mt-4">
  {/* Show User Details Card */}
  {showDetailsCard && (
    <div className="col-md-4">
      <div className="card p-3 shadow" style={cardStyle}>
        <h5 className="card-title text-center">User Details</h5>
        <p><strong>Name:</strong> {employee.userName}</p>
        <p><strong>Email:</strong> {employee.email}</p>
        <button
          className="btn btn-secondary mt-2 w-100"
          onClick={() => setShowDetailsCard(false)}
        >
          Close
        </button>
      </div>
    </div>
  )}

  {/* Show Leave Status Card */}
  {showLeaveStatusCard && (
    <div className="col-md-4">
      <div className="card p-3 shadow" style={cardStyle}>
        <h5 className="card-title text-center">Leave Status</h5>
        <p>You have 5 leave days remaining.</p>
        <button
          className="btn btn-secondary mt-2 w-100"
          onClick={() => setShowLeaveStatusCard(false)}
        >
          Close
        </button>
      </div>
    </div>
  )}
</div>

        {/* Toast Notification */}
        {showToast && (
          <div
            className="toast text-bg-primary border-0 show position-absolute top-0 end-0 m-3"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            style={{ zIndex: 9999 }}
          >
            {" "}
            <div class="d-flex">
              <div className="toast-body">
                Leave Applied Successfully!{" "}
                <button
                  type="button"
                  className="btn-close btn-close-white me-2 m-auto"
                  onClick={() => setShowToast(false)}
                ></button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeDashboard;
