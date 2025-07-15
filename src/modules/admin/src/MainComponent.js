import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"; // Import hamburger icons
import Leftside from "./Leftside";
import Mycourse from "./Mycourse";
import InprogressCourse from "./InprogressCourse";
import PastCourse from "./PastCourse";
import Feechallan from "./Feechallan";
import Paywithcard from "./Paywithcard";
import Feechallandetail from "./Feechallandetail";
import NewsAndAnnoucements from "./NewsAndAnnoucements";
import Calendar from "./Calendar";
import CalendarScreen from "./CalendarScreen";
import Settings from "./Settings";
import Exams from "./Exams";
import Examsyllabus from './Examsyllabus';
import CreateAnnouncement from './CreateAnnouncement';
import Sections from './Sections';
import CreateSection from './CreateSection';
import Allstudents from './Allstudents';
import Timetable from './Timetable';
import AddClass from './AddClass';
import Attendence from './Attendence';
import Student from './Student';
import Teacher from './Teacher';
import Chats from './Chats';
import Fees from './Fees';
import StudentDetails from './StudentDetails';
import StudentProfile from './StudentProfile';
import Result from './Result';
import TeacherDetails from './TeacherDetails';
import Dashboard from "./Dashboard";
import SignUp from "./SignUp";

import FeesCollected from "./FeesCollected";
import FeesPending from "./FeesPending";
import { UserProvider } from "./UserContext";
import Login from "./SignIn";

function MainComponent() {
  const [activeButton, setActiveButton] = useState(1);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const location = useLocation();

  // Check if we're on auth pages (SignUp or SignIn)
  const isAuthPage =
  location.pathname === "/" ||
    location.pathname === "/signup" ||
    location.pathname === "/login" ||
    location.pathname === "/sign-in";

  useEffect(() => {
    const handleResize = () => {
      const isSmall = window.innerWidth < 1000;
      setIsSmallScreen(isSmall);

      // If on auth page, hide sidebar regardless of screen size
      // Otherwise, follow normal responsive behavior (hide on small screens)
      if (isAuthPage) {
        setIsSidebarVisible(false);
      } else {
        setIsSidebarVisible(!isSmall);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isAuthPage]); // Re-run when auth page status changes

  // This toggles sidebar visibility (only works when not on auth pages)
  const toggleSidebar = () => {
    if (!isAuthPage) {
      setIsSidebarVisible(!isSidebarVisible);
    }
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/dashboard");
  };

  // Render the full UI for normal pages, or just the authentication UI for auth pages
  return (
    <UserProvider>
      <div className="d-flex">
        {/* Styles for the sidebar */}
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

        {/* Conditional rendering of the sidebar - only if NOT on auth pages */}
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
            <Leftside
              isSidebarVisible={isSidebarVisible}
              activeButton={activeButton}
              setActiveButton={setActiveButton}
              isSmallScreen={isSmallScreen}
              toggleSidebar={toggleSidebar}
            />
          </div>
        )}

        {/* Mobile overlay - only if NOT on auth pages */}
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
        <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
          {/* Hamburger button for mobile - only if NOT on auth pages */}
          {!isAuthPage && isSmallScreen && (
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
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} /> {/* Assuming signin uses the same component */}
            <Route path="/sign-in" element={<SignUp />} /> {/* Alternative path */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/Mycourse" element={<Mycourse />} />
            <Route path="/InprogressCourse" element={<InprogressCourse />} />
            <Route path="/PastCourse" element={<PastCourse />} />
            <Route path="/Feechallan" element={<Feechallan />} />
            <Route path="/paywithcard" element={<Paywithcard />} />
            <Route path="/feechallandetail" element={<Feechallandetail />} />
            <Route path="/news-and-announcements" element={<NewsAndAnnoucements />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/calendarscreen" element={<CalendarScreen />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/exams" element={<Exams />} />
            <Route path="/exam-syllabus" element={<Examsyllabus />} />
            <Route path="/create-announcement" element={<CreateAnnouncement />} />
            <Route path="/sections" element={<Sections />} />
            <Route path="/create-section" element={<CreateSection />} />
            <Route path="/Allstudents" element={<Allstudents />} />
            <Route path="/Timetable" element={<Timetable />} />
            <Route path="/addclass" element={<AddClass />} />
            <Route path="/Attendence" element={<Attendence />} />
            <Route path="/Student" element={<Student />} />
            <Route path="/Teacher" element={<Teacher />} />
            <Route path="/Chats" element={<Chats />} />
            <Route path="/Fees" element={<Fees />} />
            <Route path="/fees-collected" element={<FeesCollected />} />
            <Route path="/fees-pending" element={<FeesPending />} />
            <Route path="/Result" element={<Result />} />
            <Route path="/student-details/:id" element={<StudentDetails />} />
            <Route path="/teacher-details/:id" element={<TeacherDetails />} />
            <Route path="/student-profile/:id" element={<StudentProfile />} />
          </Routes>

        </div>
      </div>
    </UserProvider>
  );
}

export default MainComponent;