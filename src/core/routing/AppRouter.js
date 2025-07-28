// src/core/routing/AppRouter.js
import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoadingSpinner from '../../shared/components/Common/LoadingSpinner';

// Lazy load modules
const StudentModule = React.lazy(() => import('../../modules/student'));
const TeacherModule = React.lazy(() => import('../../modules/teacher'));
const ParentModule = React.lazy(() => import('../../modules/parent'));

function AppRouter() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/student/*" element={<StudentModule />} />
        <Route path="/teacher/*" element={<TeacherModule />} />
        <Route path="/parent/*" element={<ParentModule />} />
      </Routes>
    </Suspense>
  );
}

export default AppRouter;