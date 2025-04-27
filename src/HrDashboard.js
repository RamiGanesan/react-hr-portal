import React, { useEffect, useState } from "react";
import bgimg from "./images/bg1.jpg";
import { useNavigate } from "react-router-dom";

const HRDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();
  const [leaveRequests, setLeaveRequests] = useState([]);
  // Load employees when component mounts
  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
    setEmployees(storedEmployees);
    const storedRequests =
      JSON.parse(localStorage.getItem("leaveRequests")) || [];
    setLeaveRequests(storedRequests);
  }, []);

  const backgroundStyle = {
    backgroundImage: `url(${bgimg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
  };
  const handleAddEmployee = () => {
    navigate("/hrdashboard/employeeSignup");
  };
  return (
    <div className="text-center p-4" style={backgroundStyle}>
      {" "}
      <a href="/" className="text-primary float-end">
        <i className="fas fa-sign-out-alt"></i> Logout
      </a>
      <h1 className="text-danger mb-4">HR Dashboard</h1>
      <div className="mb-4">
        <div className="card mx-auto" style={{ maxWidth: "300px" }}>
          <div className="card-body">
            <h5 className="card-title">Add New Employee</h5>
            <button className="btn btn-primary" onClick={handleAddEmployee}>
              Add Employee
            </button>
          </div>
        </div>
      </div>
      <hr className="my-4 border-danger"></hr>
      <div className="d-flex justify-content-center flex-wrap gap-3">
        {employees.map((emp, index) => (
          <div className="card" key={index} style={{ width: "250px" }}>
            <div className="card-body">
              <h5 className="card-title">
                {emp.firstName} {emp.lastName}
              </h5>
              <p className="card-text mb-2">{emp.position}</p>
              <p className="card-text">Email: {emp.email}</p>
              <button className="btn btn-primary">Manage Leave</button>
            </div>
          </div>
        ))}
      </div>
      <div className="card container mt-4">
        <div className="card-body">
          <h5 className="card-title text-center">All Leave Requests</h5>

          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Employee Name</th>
                <th>Reason</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.map((req, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{req.userName}</td>
                  <td>{req.reason}</td>
                  <td>{req.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HRDashboard;
