// AppRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainComponent from './MainComponent'; // Student LMS

const AppRoutes = () => {
  return (
    <Routes>
      {/* Student LMS - accessible at root like /dashboard, /profile */}
      <Route path="/*" element={<MainComponent />} />

      {/* Teacher LMS - accessible via /teacher/... like /teacher/dashboard */}
      
    </Routes>
  );
};

export default AppRoutes;
