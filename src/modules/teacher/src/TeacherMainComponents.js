import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
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
import CreateAnnouncement from "./CreateAnnouncement";
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
import AllSectionAssignments from "./AllSectionAssignments";
import AllSectionQuizzes from "./AllSectionQuizzes";
import TeacherSidebar from "./TeacherLeftside";

function MainComponent() {
  const [activeButton, setActiveButton] = useState(1);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/" ||
    location.pathname === "/signup" ||
    location.pathname === "/login" ||
    location.pathname === "/sign-in";

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

  const handleClick = () => {
    navigate("/dashboard");
  };

  return (
    <div className="d-flex" style={{ height: "100vh", overflow: "hidden" }}>
      {/* Sidebar */}
      <style>{`
        .sidebar-container {
          height: 100vh !important; /* Changed from min-height to height */
          overflow-y: auto; /* Allow internal scrolling if needed */
        }
        
        @media (max-width: 1000px) {
          .sidebar-container {
            width: 280px;
            height: 100vh;
            background-color: #101828;
            position: fixed;
            top: 0;
            left: 0;
            transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
            overflow-y: auto;
          }
          
          #quizes {
            height: auto !important;
          }
  
          .mobile-sidebar.hidden {
            transform: translateX(-100%);
          }
  
          .mobile-sidebar.visible {
            transform: translateX(0);
          }
  
          .sidebar-overlay {
            backdrop-filter: blur(2px);
          }
  
          body.no-scroll {
            overflow: hidden;
          }
        }
        
        /* Ensure main content area doesn't overflow */
        .main-content-area {
          height: 100vh;
          overflow-y: auto;
          overflow-x: hidden;
        }
        
        /* Mobile header should not add to total height */
        .mobile-header {
          flex-shrink: 0;
        }
        
        /* Routes container should fill remaining space */
        .routes-container {
          flex: 1;
          overflow-y: auto;
          min-height: 0; /* Important for flex child */
        }
      `}</style>

      {!isAuthPage && (
        <div
          className={`sidebar-container ${isSmallScreen ? "mobile-sidebar" : ""} ${isSidebarVisible ? "visible" : "hidden"}`}
          style={{
            position: isSmallScreen ? "fixed" : "static",
            zIndex: 2000,
            transition: "transform 0.3s ease-in-out",
            transform: isSidebarVisible ? "translateX(0)" : "translateX(-100%)",
          }}
        >
          <TeacherSidebar
            isSidebarVisible={isSidebarVisible}
            activeButton={activeButton}
            setActiveButton={setActiveButton}
            isSmallScreen={isSmallScreen}
            toggleSidebar={toggleSidebar}
          />
        </div>
      )}

      {/* Mobile overlay */}
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

      {/* Main content */}
      <div className="main-content-area" style={{ flex: 1, position: "relative", display: "flex", flexDirection: "column" }}>
        {/* Hamburger button for mobile */}
        {!isAuthPage && isSmallScreen && (
          <div
            className="mobile-header"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "15px 20px",
              position: "relative",
              backgroundColor: "#101828",
            }}
          >
            {/* Logo */}
            <div className="mb-0 text-start ps-0" onClick={handleClick} style={{ cursor: "pointer" }}>
              <img
                src="/assets/logo.png"
                alt="Logo"
                style={{ objectFit: 'contain', maxHeight: "30px" }}
              />
            </div>

            {/* Hamburger on the right */}
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

        <div className="routes-container">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/TDashboard" element={<TDashboard />} />
            <Route path="/teacherchats" element={<TeacherChats />} />
            <Route path="/TeacherCalendarScreen" element={<TeacherCalendarScreen />} />
            <Route path="/TeacherCalendar" element={<TeacherCalendar />} />
            <Route path="/AllSectionAssignments" element={<AllSectionAssignments />} />
            <Route path="/TeacherAssignments/:id" element={<TeacherAssignments />} />
            <Route path="/TeacherAssignmentDetails/:sectionId/:assignmentId" element={<TeacherAssignmentDetails />} />
            <Route path="/create-assignments/:sectionId" element={<TeacherCreateAssignments />} />
            <Route path="/AllSectionQuizzes" element={<AllSectionQuizzes />} />
            <Route path="/TeacherQuizzes/:id" element={<TeacherQuizzes />} />
            <Route path="/TeacherQuizzesDetails/:sectionId/:quizId" element={<TeacherQuizzesDetails />} />
            <Route path="/create-quizzes/:sectionId" element={<TeacherCreateQuiz />} />
            <Route path="/news-and-announcements" element={<NewsAndAnnoucements />} />
            <Route path="/create-announcement" element={<CreateAnnouncement />} />
            <Route path="/TeacherAttendence" element={<TeacherAttendence />} />
            <Route path="/teacher-attendance-detail" element={<TeacherAttendanceDetail />} />
            <Route path="/TeacherSettings" element={<TeacherSettings />} />
            <Route path="/TeacherTimetable" element={<TeacherTimetable />} />
            <Route path="/subject" element={<TeacherStudents />} />
            <Route path="/TeacherStudentsDetails" element={<TeacherStudentsDetails />} />
            <Route path="/TeacherProfile" element={<TeacherProfile />} />
            <Route path="/calendar" element={<TeacherCalendar />} />
            <Route path="/teacher-courses" element={<TeacherCourses />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default MainComponent;