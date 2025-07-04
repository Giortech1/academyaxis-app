import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

// Shared components
import Sidebar from './shared/components/Layout/Sidebar';
import Chats from './shared/components/Common/Chats';
import NewsAndAnnouncements from './shared/components/Common/NewsAndAnnouncements';
import Settings from './shared/components/Common/Settings';

// Student components
import Dashboard from './modules/student/components/Dashboard';
import StudentProfile from './modules/student/components/StudentProfile';
import MyCourses from './modules/student/components/MyCourses';
import Grades from './modules/student/components/Grades';
import SubGrades from './modules/student/components/SubGrades';
import Assignments from './modules/student/components/Assignments';
import AssignmentDetails from './modules/student/components/AssignmentDetails';
import Calendar from './modules/student/components/Calendar';
import CalendarScreen from './modules/student/components/CalendarScreen';
import AcademicCalendar from './modules/student/components/AcademicCalendar';
import Exams from './modules/student/components/Exams';
import ExamSyllabus from './modules/student/components/ExamSyllabus';
import Quizzes from './modules/student/components/Quizzes';
import InProgressCourse from './modules/student/components/InProgressCourse';
import PastCourse from './modules/student/components/PastCourse';
import Enrollment from './modules/student/components/Enrollment';
import EnrollmentCourse from './modules/student/components/EnrollmentCourse';
import Withdraw from './modules/student/components/Withdraw';
import StudentTranscript from './modules/student/components/StudentTranscript';

// Teacher components
import CourseDetails from './modules/teacher/components/CourseDetails';

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
