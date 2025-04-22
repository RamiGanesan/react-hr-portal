import React from 'react';
import bgimg from  './images/bg1.jpg'
import employeeData from './employee.json';

const HRDashboard = () => {
  const employees = employeeData.employees;

  const backgroundStyle = {
    backgroundImage: `url(${bgimg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
  };
  return (
    <div
      className="text-center p-4"
      style={backgroundStyle}
    >
      <h1 className="text-danger mb-4">HR Dashboard</h1>

      <div className="mb-4">
        <div className="card mx-auto" style={{ maxWidth: '300px' }}>
          <div className="card-body">
            <h5 className="card-title">Add New Employee</h5>
            <button className="btn btn-primary">Add Employee</button>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center flex-wrap gap-3">
        {employees.map((emp, index) => (
          <div className="card" key={index} style={{ width: '250px' }}>
            <div className="card-body">
              <h5 className="card-title">{emp.name}</h5>
              <p className="card-text">{emp.department}</p>
              <p className="card-text">Email: {emp.email}</p>
              <button className="btn btn-primary">Manage Leave</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HRDashboard;
