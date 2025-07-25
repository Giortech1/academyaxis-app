import React, { useEffect, useState } from "react";
import { Col, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate, useLocation } from "react-router-dom";

function AdminSidebar({ activeButton, setActiveButton, toggleSidebar }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const buttons = [
    { id: 1, icon: "/assets/dashboard.png", text: "Dashboard", link: "/dashboard" },
    { id: 2, icon: "/assets/asec.png", text: "Sections", link: "/sections" },
    { id: 3, icon: "/assets/att.png", text: "Time Table", link: "/Timetable" },
    { id: 4, icon: "/assets/aatt.png", text: "Attendence", link: "/Attendence" },
    { id: 5, icon: "/assets/astu.png", text: "Student", link: "/Student" },
    { id: 6, icon: "/assets/atech.png", text: "Teacher", link: "/Teacher" },
    { id: 7, icon: "/assets/chats.png", text: "Chats", link: "/Chats" },
    { id: 8, icon: "/assets/ares.png", text: "Result", link: "/Result" },
    { id: 9, icon: "/assets/fee.png", text: "Fees", link: "/Fees" },
    { id: 10, icon: "/assets/support.png", text: "Support", link: "/support" },
    { id: 11, icon: "/assets/settings.png", text: "Settings", link: "/settings" },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1000);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const currentPath = location.pathname;

    const matchedButton = buttons.find((btn) => btn.link === currentPath);
    if (matchedButton) {
      setActiveButton(matchedButton.id);
    }
  }, [location.pathname]);

  const rotateAnimation = {
    animation: "rotate 2s linear infinite",
  };

  const handleClick = () => {
    navigate("/dashboard");
    if (toggleSidebar && window.innerWidth < 1000) toggleSidebar();
  };

  return (
    <Col
      xs={12}
      md={3}
      className="text-white d-flex flex-column py-3"
      style={{
        height: "100vh",
        width: "280px",
        backgroundColor: "#101828",
        padding: "10px",
        overflow: "hidden",
      }}
    >
      {/* Logo */}
      <div
        className="mb-3 text-start ps-3 d-flex align-items-center"
        onClick={handleClick}
        style={{ cursor: "pointer" }}
      >
        <img
          src="/assets/logo.jpeg"
          alt="Logo"
          style={{ maxWidth: "150px", maxHeight: "32px", marginRight: "10px" }}
        />
        <span style={{ fontSize: "18px", fontWeight: "500", color: "white" }}>
          Admin
        </span>
      </div>

      {/* Add keyframe animation in style tag */}
      <style>
        {`
          @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>

      {/* Nav buttons - Make this scrollable if needed */}
      <div
        className="flex-grow-1"
        style={{
          overflowY: "auto",
          minHeight: 0,
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
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
                style={{
                  width: "24px",
                  height: "24px",
                  ...(button.id === 11 ? rotateAnimation : {})
                }}
              />
              {button.text}
            </Nav.Link>
          ))}
        </Nav>
      </div>
    </Col>
  );
}

export default AdminSidebar;