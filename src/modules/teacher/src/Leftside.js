import React, { useEffect, useState } from "react";
import { Col, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";

function StudentSidebar({ activeButton, setActiveButton, toggleSidebar }) {
  const buttons = [
    { id: 1, icon: "/assets/dashboard.png", text: "Dashboard", link: "/dashboard" },
    { id: 2, icon: "/assets/calendar.png", text: "Calendar", link: "/calendarscreen" },
    { id: 3, icon: "/assets/book.png", text: "Exams", link: "/exams" },
    { id: 4, icon: "/assets/assignments.png", text: "Assignments", link: "/assignments" },
    { id: 5, icon: "/assets/book.png", text: "Quizzes", link: "/quizzes" },
    { id: 6, icon: "/assets/course.png", text: "My Course", link: "/mycourse" },
    { id: 7, icon: "/assets/grades.png", text: "Grades", link: "/grades" },
    { id: 8, icon: "/assets/fees.png", text: "Fees", link: "/Feechallan" },
    { id: 9, icon: "/assets/chats.png", text: "Chats", link: "/chats" },
    { id: 10, icon: "/assets/studentprofile.png", text: "Student Profile", link: "/studentprofile" },
    { id: 13, icon: "/assets/studentprofile.png", text: "Enrollement", link: "/enrollement" }, // ✅ link added here
  ];

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/dashboard");
    if (toggleSidebar && window.innerWidth < 1000) toggleSidebar();
  };

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
      navigate("/dashboard");
      if (toggleSidebar && isSmallScreen) toggleSidebar();
    };

  return (
    <Col
      xs={12}
      md={3}
      className="text-white d-flex flex-column py-3"
      style={{
        height: "100%",
        width: "280px",
        backgroundColor: "#101828",
        padding: "10px",
      }}
    >
      {/* Logo */}
      <div className="mb-3 text-start ps-3" onClick={handleClick} style={{ cursor: "pointer" }}>
        <img
          src="/assets/logo.png"
          alt="Logo"
          style={{ maxWidth: "150px", maxHeight: "32px" }}
        />
      </div>

      {/* Nav buttons */}
      <Nav className="flex-column">
        {buttons.map((button) => (
          <Nav.Link
            as={Link}
            to={button.link || "#"}
            key={button.id}
            onClick={() => {
              setActiveButton(button.id);
              if (toggleSidebar && window.innerWidth < 1000) toggleSidebar();
            }}
            className={`d-flex align-items-center py-2 px-3 rounded mb-2 ${
              activeButton === button.id ? "bg-#344054" : ""
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
            if (toggleSidebar && window.innerWidth < 1000) toggleSidebar();
          }}
          className={`d-flex align-items-center py-2 px-3 rounded mb-2 ${
            activeButton === 11 ? "bg-#344054" : ""
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
          to="/settings"
          onClick={() => {
            setActiveButton(12);
            if (toggleSidebar && window.innerWidth < 1000) toggleSidebar();
          }}
          className={`d-flex align-items-center py-2 px-3 rounded ${
            activeButton === 12 ? "bg-#344054" : ""
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

export default StudentSidebar;
