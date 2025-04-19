import React from 'react';
import Login from './Login';
import {BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import Registeration from './Registeration';
import ProtectedRoute from './ProtectedRoute';
import HrDashboard from './Home';

function App() {
   return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Registeration />} />
        <Route path="/dashboard" element={<ProtectedRoute><HrDashboard /></ProtectedRoute>} />      

      </Routes>
    </Router>
  );

}

export default App;
