import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TeacherMainComponents from './TeacherMainComponents';
import { UserProvider } from './UserContext';

const AppRoutes = () => {
  return (
    <UserProvider>
      <Routes>
        <Route path="/*" element={<TeacherMainComponents />} />
      </Routes>
    </UserProvider>
  );
};

export default AppRoutes;
