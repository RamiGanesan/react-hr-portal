import React from 'react';
import Login from './Login';
import {BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import Signup from './Registeration';
import ProtectedRoute from './ProtectedRoute';
import HrDashboard from './HrDashboard';
import EmployeeDashboard from './EmployeeDashboard';
import AdminDashboard from './AdminDashboard';
function App() {
   return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/hrdashboard" element={<ProtectedRoute><HrDashboard /></ProtectedRoute>} />   
    <Route path="/employeedashboard" element={<ProtectedRoute><EmployeeDashboard /></ProtectedRoute>} />   
    <Route path="/admindashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      </Routes>
    </Router>
  );

}

export default App;
