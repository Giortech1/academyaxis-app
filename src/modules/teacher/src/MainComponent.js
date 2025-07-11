import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"; // Import hamburger icons
import Leftside from "./Leftside";
import Quizzes from "./Quizzes";
import Assignments from "./Assignments";
import Exams from "./Exams";
import Mycourse from "./Mycourse";
import AssignmentDetails from "./AssignmentDetails";
import Coursedetails from "./Coursedetails";
import Chats from "./Chats";
import Feechallan from "./Feechallan";
import Feechallandetail from "./Feechallandetail";
import Paywithcard from "./Paywithcard";
import Grades from "./Grades";
import SubGrades from "./SubGrades";
import CalendarScreen from "./CalendarScreen";
import Calendar from "./Calendar";
import Dashboard from "./Dashboard";
import NewsAndAnnoucements from "./NewsAndAnnoucements";
import Settings from "./Settings";
import Examsyllabus from './Examsyllabus';
import InprogressCourse from './InprogressCourse'; // Already imported
import PastCourse from './PastCourse'; // Add this import for the past course
import Withdraw from './Withdraw'; // Update the path if different
import Enrollement from './Enrollement'; // or correct path
import EnrollementCourse from "./EnrollementCourse";
import StudentProfile from "./StudentProfile";
import QuizDetail from "./QuizDetail";
import StudentTranscript from './StudentTranscript';


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

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/dashboard");
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <style>{`
        .sidebar-container{
        min-height:100vh !important;}
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
            height:auto !important;
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
      `}</style>

      <div
        className={`sidebar-container ${isSmallScreen ? "mobile-sidebar" : ""} ${isSidebarVisible ? "visible" : "hidden"}`}
        style={{
          position: isSmallScreen ? "fixed" : "static",
          zIndex: 2000,
          transition: "transform 0.3s ease-in-out",
          transform: isSidebarVisible ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <Leftside
          isSidebarVisible={isSidebarVisible}
          activeButton={activeButton}
          setActiveButton={setActiveButton}
          isSmallScreen={isSmallScreen}
          toggleSidebar={toggleSidebar}
        />
      </div>

      {/* Mobile overlay */}
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

      {/* Main content */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        {/* Hamburger button for mobile */}
        {isSmallScreen && (
          <div
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

        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/quizzes" element={<Quizzes />} />
          <Route path="/assignments" element={<Assignments />} />
          <Route path="/exams" element={<Exams />} />
          <Route path="/mycourse" element={<Mycourse />} />
          <Route path="/assignments/details/:id" element={<AssignmentDetails />} />
          <Route path="/coursedetails" element={<Coursedetails />} />
          <Route path="/chats" element={<Chats />} />
          <Route path="/feechallan" element={<Feechallan />} />
          <Route path="/feechallandetail" element={<Feechallandetail />} />
          <Route path="/paywithcard" element={<Paywithcard />} />
          <Route path="/Grades" element={<Grades />} />
          <Route path="/SubGrades" element={<SubGrades />} />
          <Route path="/calendarscreen" element={<CalendarScreen />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/news-and-announcements" element={<NewsAndAnnoucements />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/exam-syllabus" element={<Examsyllabus />} />
          <Route path="/InprogressCourse" element={<InprogressCourse />} />
          <Route path="/PastCourse" element={<PastCourse />} />
          <Route path="/Withdraw" element={<Withdraw />} />
          <Route path="/enrollement" element={<Enrollement />} />
          <Route path="/enrollementcourse" element={<EnrollementCourse />} />
          <Route path="/studentprofile" element={<StudentProfile />} />
          <Route path="/quiz/:id" element={<QuizDetail />} />
          <Route path="/quiz-detail/:id" element={<QuizDetail />} />
          <Route path="/assignment-detail/:id" element={<AssignmentDetails />} />
          <Route path="/student-transcript" element={<StudentTranscript />} />
        </Routes>
      </div>
    </div>
  );
}

export default MainComponent;
