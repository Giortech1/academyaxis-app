import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import Leftside from "./Leftside";
import TeacherLeftside from "./TeacherLeftside";
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
import TeacherCreateQuiz from './TeacherCreateQuiz';
import TeacherCourses from './TeacherCourses';
import TeacherAttendence from "./TeacherAttendence";
import TeacherAttendanceDetail from "./TeacherAttendanceDetail";
import TeacherSettings from "./TeacherSettings";
import TeacherTimetable from './TeacherTimetable';
import TeacherStudents from './TeacherStudents';
import TeacherStudentsDetails from './TeacherStudentsDetails';
import TeacherProfile from './TeacherProfile';
import Login from "./SignIn";

function MainComponent() {
  const [activeButton, setActiveButton] = useState(1);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [userRole, setUserRole] = useState("teacher");
  const [contentHeight, setContentHeight] = useState(0);
  const location = useLocation();
  
  const isAuthPage =
    location.pathname === "/" ||
    location.pathname === "/signup" ||
    location.pathname === "/login" ||
    location.pathname === "/sign-in";

  const contentRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      const isSmall = window.innerWidth < 1000;
      setIsSmallScreen(isSmall);

      if (isAuthPage) {
        setIsSidebarVisible(false);
      } else {
        setIsSidebarVisible(!isSmall);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isAuthPage]);

  const toggleSidebar = () => {
    if (!isAuthPage) {
      setIsSidebarVisible(!isSidebarVisible);
    }
  };

  return (
    <>
      {/* Hamburger Menu for Small Screens (only show on non-auth pages) */}
      {!isAuthPage && isSmallScreen && (
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
        {/* Sidebar - Only show on non-auth pages when visible */}
        {!isAuthPage && isSidebarVisible && (
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
            <Route path="/" element={<Login />} />
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
            <Route path="/news-and-announcements" element={<NewsAndAnnoucements />} />
            <Route path="/teacher-news-and-announcements" element={<TeacherNewsAndAnnoucements />} />
            <Route path="/TeacherAttendence" element={<TeacherAttendence />} />
            <Route path="/teacher-attendance-detail" element={<TeacherAttendanceDetail />} />
            <Route path="/TeacherSettings" element={<TeacherSettings />} />
            <Route path="/TeacherTimetable" element={<TeacherTimetable />} />
            <Route path="/subject" element={<TeacherStudents />} />
            <Route path="/TeacherStudentsDetails" element={<TeacherStudentsDetails />} />
            <Route path="/TeacherProfile" element={<TeacherProfile />} />
            <Route path="/calendar" element={<TeacherCalendar />} />
            <Route path="/create-quiz" element={<TeacherCreateQuiz />} />
            <Route path="/teacher-courses" element={<TeacherCourses />} />
          </Routes>
        </div>
      </div>

      {/* Mobile Overlay to Close Sidebar (only show on non-auth pages) */}
      {!isAuthPage && isSmallScreen && isSidebarVisible && (
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