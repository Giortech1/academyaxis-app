import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

// Shared components
import Sidebar from './shared/components/Layout/Sidebar';
import Chats from './shared/components/Common/Chats';
import NewsAndAnnouncements from './shared/components/Common/NewsAndAnnouncements';
import Settings from './shared/components/Common/Settings';

// Student components
import Dashboard from './modules/student/src/Dashboard';
import StudentProfile from './modules/student/src/StudentProfile';
import MyCourses from './modules/student/src/Mycourse';
import Grades from './modules/student/src/Grades';
import SubGrades from './modules/student/src/SubGrades';
import Assignments from './modules/student/src/Assignments';
import AssignmentDetails from './modules/student/src/AssignmentDetails';
import Calendar from './modules/teacher/src/Calendar.js';
import CalendarScreen from './modules/student/src/CalendarScreen';
import AcademicCalendar from './modules/student/src/AcademicCalendar';
import Exams from './modules/student/src/Exams';
import ExamSyllabus from './modules/student/src/Examsyllabus';
import Quizzes from './modules/student/src/Quizzes';
import InProgressCourse from './modules/student/src/InprogressCourse';
import PastCourse from './modules/student/src/PastCourse';
import Enrollment from './modules/student/src/Enrollement';
import EnrollmentCourse from './modules/student/src/EnrollementCourse';
import Withdraw from './modules/student/src/Withdraw';
import StudentTranscript from './modules/student/src/StudentTranscript';

// Teacher components
import CourseDetails from './modules/teacher/src/Coursedetails';

// Parent components (Finance)
import FeeDetails from './modules/parent/components/FeeDetails';
import FeeSlip from './modules/parent/components/FeeSlip';
import PaymentSlip from './modules/parent/components/PaymentSlip';
import PayWithCard from './modules/parent/components/PayWithCard';
import SlipDetails from './modules/parent/components/SlipDetails';

function MainComponent() {
  const [activeButton, setActiveButton] = useState(1);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isSmall = window.innerWidth < 1000;
      setIsSmallScreen(isSmall);
      setIsSidebarVisible(!isSmall);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {isSidebarVisible && (
        <Sidebar
          activeButton={activeButton}
          setActiveButton={setActiveButton}
          toggleSidebar={toggleSidebar}
        />
      )}
      
      <div style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
        {isSmallScreen && (
          <div style={{ marginBottom: "10px" }}>
            <button
              onClick={toggleSidebar}
              style={{
                background: "none",
                border: "none",
                fontSize: "24px",
                cursor: "pointer",
                color: "#333",
              }}
            >
              {isSidebarVisible ? <FiX /> : <FiMenu />}
            </button>
          </div>
        )}

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/quizzes" element={<Quizzes />} />
          <Route path="/assignments" element={<Assignments />} />
          <Route path="/exams" element={<Exams />} />
          <Route path="/mycourse" element={<MyCourses />} />
          <Route path="/assignments/details/:id" element={<AssignmentDetails />} />
          <Route path="/coursedetails" element={<CourseDetails />} />
          <Route path="/chats" element={<Chats />} />
          <Route path="/feechallan" element={<FeeDetails />} />
          <Route path="/feechallandetail" element={<FeeDetails />} />
          <Route path="/paywithcard" element={<PayWithCard />} />
          <Route path="/Grades" element={<Grades />} />
          <Route path="/SubGrades" element={<SubGrades />} />
          <Route path="/calendarscreen" element={<CalendarScreen />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/news-and-announcements" element={<NewsAndAnnouncements />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/exam-syllabus" element={<ExamSyllabus />} />
          <Route path="/InprogressCourse" element={<InProgressCourse />} />
          <Route path="/PastCourse" element={<PastCourse />} />
          <Route path="/Withdraw" element={<Withdraw />} />
          <Route path="/enrollement" element={<Enrollment />} />
          <Route path="/enrollementcourse" element={<EnrollmentCourse />} />
          <Route path="/studentprofile" element={<StudentProfile />} />
          <Route path="/quiz/:id" element={<div>Quiz Detail Component</div>} />
          <Route path="/quiz-detail/:id" element={<div>Quiz Detail Component</div>} />
          <Route path="/assignment-detail/:id" element={<AssignmentDetails />} />
          <Route path="/student-transcript" element={<StudentTranscript />} />
          <Route path="/payment-success" element={<FeeSlip />} />
          <Route path="/slip-details" element={<SlipDetails />} />
          <Route path="/academycalendar" element={<AcademicCalendar />} />
        </Routes>
      </div>
    </div>
  );
}

export default MainComponent;
