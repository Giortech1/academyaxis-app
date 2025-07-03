import React, { useEffect, useState } from "react";
import { Col, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function TeacherLeftside({ activeButton, setActiveButton, toggleSidebar }) {
  const navigate = useNavigate();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1000);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogoClick = () => {
    navigate("/");
    if (toggleSidebar && isSmallScreen) toggleSidebar();
  };

  const buttons = [
    { id: 1, icon: "/assets/dashboard.png", text: "Dashboard", link: "/" },
    { id: 2, icon: "/assets/calendar.png", text: "Calendar", link: "/TeacherCalendarScreen" },
    { id: 3, icon: "/assets/grid-edit.png", text: "Attendance", link: "/TeacherAttendence" },
    { id: 4, icon: "/assets/assignments.png", text: "Assignments", link: "/TeacherAssignments" },
    { id: 5, icon: "/assets/book.png", text: "Quizzes", link: "/TeacherQuizzes" },
    { id: 6, icon: "/assets/people.png", text: "Students", link: "/TeacherTimetable" },
    { id: 7, icon: "/assets/chats.png", text: "Chats", link: "/teacherchats" },
    { id: 8, icon: "/assets/studentprofile.png", text: "Profile", link: "/TeacherProfile" },
  ];

  return (
    <Col
      xs={12}
      md={3}
      className="text-white d-flex flex-column py-3"
      style={{
        height: "auto",
        width: "280px",
        backgroundColor: "#101828",
        padding: "10px",
        position:'relative'
      }}
    >
      {/* Logo */}
      <div className="mb-3 text-start ps-3" onClick={handleLogoClick} style={{ cursor: "pointer" }}>
        <img
          src="/assets/logo.png"
          alt="Logo"
          style={{ maxWidth: "150px", maxHeight: "32px" }}
        />
      </div>

      {/* Navigation Buttons */}
      <Nav className="flex-column">
        {buttons.map((button) => (
          <Nav.Link
            as={Link}
            to={button.link}
            key={button.id}
            onClick={() => {
              setActiveButton(button.id);
              if (toggleSidebar && isSmallScreen) toggleSidebar();
            }}
            className={`d-flex align-items-center py-2 px-3 rounded mb-2 ${activeButton === button.id ? "bg-#344054" : ""
              }`}
            style={{
              height: "50px",
              color: "white",
              cursor: "pointer",
              backgroundColor: activeButton === button.id ? "#344054" : "",
            }}
          >
            <img
              src={button.icon}
              alt={button.text}
              className="me-2"
              style={{ width: "24px", height: "24px" }}
            />
            {button.text}
          </Nav.Link>
        ))}
      </Nav>

      {/* Bottom Section */}
      <div className="mt-auto">
        <Nav.Link
          onClick={() => {
            setActiveButton(11);
            if (toggleSidebar && isSmallScreen) toggleSidebar();
          }}
          className={`d-flex align-items-center py-2 px-3 rounded mb-2 ${activeButton === 11 ? "bg-#344054" : ""
            }`}
          style={{
            height: "50px",
            color: "white",
            cursor: "pointer",
            backgroundColor: activeButton === 11 ? "#344054" : "",
          }}
        >
          <img
            src="/assets/support.png"
            alt="Support"
            className="me-2"
            style={{ width: "24px", height: "24px" }}
          />
          Support
        </Nav.Link>

        <Nav.Link
          as={Link}
          to="/TeacherSettings"
          onClick={() => {
            setActiveButton(12);
            if (toggleSidebar && isSmallScreen) toggleSidebar();
          }}
          className={`d-flex align-items-center py-2 px-3 rounded ${activeButton === 12 ? "bg-#344054" : ""
            }`}
          style={{
            height: "50px",
            color: "white",
            cursor: "pointer",
            backgroundColor: activeButton === 12 ? "#344054" : "",
          }}
        >
          <img
            src="/assets/settings.png"
            alt="Settings"
            className="me-2"
            style={{ width: "24px", height: "24px" }}
          />
          Settings
        </Nav.Link>
      </div>
    </Col>
  );
}

export default TeacherLeftside;


