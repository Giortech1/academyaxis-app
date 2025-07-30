import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainComponent from './MainComponent';
import { UserProvider } from './UserContext';

const AppRoutes = () => {
  return (
    <UserProvider>
      <Routes>
        <Route path="/*" element={<MainComponent />} />
      </Routes>
    </UserProvider>
  );
};

export default AppRoutes;
