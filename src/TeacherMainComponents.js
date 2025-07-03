import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import Leftside from "./Leftside";
import TeacherLeftside from "./TeacherLeftside";

// Teacher-specific screens
import TDashboard from "./TDashboard";
import TeacherChats from "./TeacherChats";
import TeacherCalendarScreen from "./TeacherCalendarScreen";
import TeacherCalendar from './TeacherCalendar';
import TeacherQuizzes from './TeacherQuizzes';
import TeacherQuizzesDetails from "./TeacherQuizzesDetails";
import TeacherAssignments from "./TeacherAssignments";
import TeacherAssignmentDetails from './TeacherAssignmentDetails';
import TeacherCreateAssignments from "./TeacherCreateAssignments";
import NewsAndAnnoucements from './NewsAndAnnoucements';
import TeacherNewsAndAnnoucements from './TeacherNewsAndAnnoucements';

import TeacherCreateQuiz from './TeacherCreateQuiz'; // adjust path if needed
import TeacherCourses from './TeacherCourses'; // update path if different



import TeacherAttendence from "./TeacherAttendence";
import TeacherAttendanceDetail from "./TeacherAttendanceDetail";
import TeacherSettings from "./TeacherSettings";
import TeacherTimetable from './TeacherTimetable';
import TeacherStudents from './TeacherStudents';
import TeacherStudentsDetails from './TeacherStudentsDetails';
import TeacherProfile from './TeacherProfile';

function MainComponent() {
  const [activeButton, setActiveButton] = useState(1);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [userRole, setUserRole] = useState("teacher"); // default role
  const [contentHeight, setContentHeight] = useState(0);

  const contentRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      const isSmall = window.innerWidth < 700;
      setIsSmallScreen(isSmall);
      setIsSidebarVisible(!isSmall); // sidebar visible by default only on large screens
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <>
      {/* Hamburger Menu for Small Screens */}
      {isSmallScreen && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "15px 20px",
            backgroundColor: "#101828",
          }}
        >
          <div onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
            <img
              src="/assets/logo.png"
              alt="Logo"
              style={{ objectFit: 'contain', maxHeight: "30px" }}
            />
          </div>
          <button
            onClick={toggleSidebar}
            style={{
              background: "none",
              border: "none",
              fontSize: "24px",
              color: "white",
            }}
          >
            {isSidebarVisible ? <FiX /> : <FiMenu />}
          </button>
        </div>
      )}

      <div style={{ display: "flex", height: "100vh" }}>
        {/* Sidebar */}
        {isSidebarVisible && (
          userRole === "teacher" ? (
            <TeacherLeftside
              isSidebarVisible={isSidebarVisible}
              activeButton={activeButton}
              setActiveButton={setActiveButton}
              isSmallScreen={isSmallScreen}
              toggleSidebar={toggleSidebar}
              contentHeight={contentHeight}
            />
          ) : (
            <Leftside
              isSidebarVisible={isSidebarVisible}
              activeButton={activeButton}
              setActiveButton={setActiveButton}
              isSmallScreen={isSmallScreen}
              toggleSidebar={toggleSidebar}
              contentHeight={contentHeight}
            />
          )
        )}

        {/* Main Content */}
        <div
          ref={contentRef}
          style={{
            flex: 1,
            overflowY: "auto",
            height: "100vh",
          }}
        >
          <Routes>
            {/* Default Dashboard Route */}
            <Route path="/" element={<TDashboard />} />
            <Route path="/TDashboard" element={<TDashboard />} />

            {/* Teacher Routes */}
            <Route path="/teacherchats" element={<TeacherChats />} />
            <Route path="/TeacherCalendarScreen" element={<TeacherCalendarScreen />} />
            <Route path="/TeacherCalendar" element={<TeacherCalendar />} />
            <Route path="/TeacherQuizzes" element={<TeacherQuizzes />} />
            <Route path="/TeacherQuizzesDetails" element={<TeacherQuizzesDetails />} />
            <Route path="/TeacherAssignments" element={<TeacherAssignments />} />
            <Route path="/TeacherAssignmentDetails" element={<TeacherAssignmentDetails />} />
            <Route path="/create-assignments" element={<TeacherCreateAssignments />} />
            <Route
  path="/news-and-announcements"
  element={<NewsAndAnnoucements />}
/>
<Route
  path="/teacher-news-and-announcements"
  element={<TeacherNewsAndAnnoucements />}
/>
            <Route path="/TeacherAttendence" element={<TeacherAttendence />} />
            <Route path="/teacher-attendance-detail" element={<TeacherAttendanceDetail />} />
            <Route path="/TeacherSettings" element={<TeacherSettings />} />
            <Route path="/TeacherTimetable" element={<TeacherTimetable />} />
            <Route path="/subject/:id" element={<TeacherStudents />} />
            <Route path="/TeacherStudentsDetails" element={<TeacherStudentsDetails />} />
            <Route path="/TeacherProfile" element={<TeacherProfile />} />
            <Route path="/calendar" element={<TeacherCalendar />} />
            <Route path="/create-quiz" element={<TeacherCreateQuiz />} />
            <Route path="/teacher-courses" element={<TeacherCourses />} />



            
          </Routes>
        </div>
      </div>

      {/* Mobile Overlay to Close Sidebar */}
      {isSmallScreen && isSidebarVisible && (
        <div
          className="sidebar-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 1000,
          }}
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}

export default MainComponent;
