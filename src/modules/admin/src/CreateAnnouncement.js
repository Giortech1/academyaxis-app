import React, { useState } from "react";
import { Form, Button, Image, } from "react-bootstrap";
import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";

import "react-calendar/dist/Calendar.css";

const TeacherCreateAssignments = () => {
  const navigate = useNavigate();

  // State Management
  const [assignmentTitle, setAssignmentTitle] = useState("Demo Title");
  const [description, setDescription] = useState(
    "This is a demo announcement by teacher to student. This is demo by teacher. This is demo announcement by teacher to student. This is demo."
  );
  const [attachmentLink, setAttachmentLink] = useState(
    "http://demo/www.studentportal.com"
  );
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(new Date().setDate(new Date().getDate() + 14)));
  const [selectedTime, setSelectedTime] = useState("00:00 AM");


  const handleDateChange = (date) => {
    setStartDate(date);
  };

  const [scheduleAssignment, setScheduleAssignment] = useState(false);
  const [day, setDay] = useState("Monday");
  const [month, setMonth] = useState("Sep");
  const [time, setTime] = useState("00:00");
  const [period, setPeriod] = useState("PM");

  // States to manage open/close of each dropdown
  const [isDayDropdownOpen, setIsDayDropdownOpen] = useState(false);
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);
  const [isPeriodDropdownOpen, setIsPeriodDropdownOpen] = useState(false);

  // Day, Month, and AM/PM options for dynamic dropdown
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const periods = ["AM", "PM"];

  // Handle schedule toggle
  const handleScheduleToggle = () => setScheduleAssignment(!scheduleAssignment);

  // Handle changes to day, month, time, and period
  const handleDayChange = (selectedDay) => {
    setDay(selectedDay);
    setIsDayDropdownOpen(false); // Close dropdown after selection
  };
  const handleMonthChange = (selectedMonth) => {
    setMonth(selectedMonth);
    setIsMonthDropdownOpen(false); // Close dropdown after selection
  };
  const handlePeriodChange = (selectedPeriod) => {
    setPeriod(selectedPeriod);
    setIsPeriodDropdownOpen(false); // Close dropdown after selection
  };
  const handleTimeChange = (e) => setTime(e.target.value);

  const applyFormatting = (format) => {
    if (format === "bold") {
      setDescription((prev) => prev + " **bold**");
    } else if (format === "italic") {
      setDescription((prev) => prev + " *italic*");
    } else if (format === "underline") {
      setDescription((prev) => prev + " <u>underline</u>");
    }
  };

  return (
    <div className="p-3" style={{  fontFamily: "Inter, sans-serif" }}>
      {/* Header Section */}
      {/* Header Section */}
      <header className="d-flex justify-content-between align-items-center mb-4" >
        <div className="d-flex align-items-center">
          <Image
            src="/assets/arrow-left.png"
            roundedCircle
            width={24}
            height={24}
            className="me-2"
            alt="Back Arrow"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(-1)}
          />
          <h1 className="m-0" style={{ fontSize: "24px", fontWeight: "600" }}>
            News And Announcements
          </h1>
        </div>

        {/* <div className="d-flex align-items-center">
          <img
            src="/assets/avatar.jpeg"
            alt="User"
            className="rounded-circle me-2"
            style={{ width: "54px", height: "54px" }}
          />
          <div className="me-0">
            <div style={{ fontWeight: "500", fontSize: "14px" }}>Mian Hamad Khalil</div>
            <div style={{ fontSize: "12px", color: "#6c757d" }}>123456</div>
          </div>
          <button className="bg-transparent border-0">
            <img
              src="/assets/arrow-down.png"
              alt="Dropdown"
              style={{ width: "12px", height: "12px", verticalAlign: 'top' }}
            />
          </button>
        </div> */}
      </header>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        {/* Left side: Heading */}
        <div style={{ fontSize: "18px", fontWeight: "600", color: "#111827" }}>
          Create Announcements
        </div>

        {/* Right side: Button with Dropdown */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Button
            style={{
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              padding: "10px 20px",
              border: "1px solid #E5E7EB",
              justifyContent: "center",
              background: "transparent",
              color: "#111827",
              fontWeight: "600",
              fontSize: "14px",
            }}
          >
            For Teachers
            <img
              src="/assets/arrow-down.png"
              alt="arrow down"
              style={{
                marginLeft: "5px",
                width: "12px",
                height: "12px",
              }}
            />
          </Button>
        </div>
      </header>



      {/* Assignment Title */}
      <Form.Group className="mb-3">
        <Form.Label style={{ fontSize: "16px", fontWeight: "500", color: "#344054", paddingBottom: '10px' }}>
          Announcement Title
        </Form.Label>
        <Form.Control
          type="text"
          value={assignmentTitle}
          onChange={(e) => setAssignmentTitle(e.target.value)}
          style={{ borderRadius: "8px", fontSize: "14px", fontWeight: '#475467', color: '#475467', padding: "10px", border: '1px solid #EAECF0', width: '50%' }}
        />
      </Form.Group>
      <div style={{ borderBottom: '1px solid #EAECF0' }}></div>

      <Form.Group className="mb-4">
        {/* Label and Subtitle */}
        <Form.Label style={{ fontSize: "16px", fontWeight: "500", color: "#344054", marginTop: '20px' }}>
          Announcement
        </Form.Label>
        <p style={{ fontSize: "14px", fontWeight: "400", color: "#475467", marginBottom: "20px" }}>
          Write announcement here.        </p>

        {/* Formatting Toolbar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",

            padding: "8px",
            backgroundColor: "#F9FAFB",
          }}
        >
          <Form.Select
            defaultValue="Regular"
            style={{
              border: "1px solid #D1D5DB",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "500",
              color: "#111827",
              width: "120px",
              padding: "5px",
              width: '250px',
              height: '40px'
            }}
          >
            <option value="Regular">Regular</option>
            <option value="Heading">Heading</option>
            <option value="Subheading">Subheading</option>
          </Form.Select>
          <Button
            onClick={() => applyFormatting("bold")}

            style={{
              fontSize: "14px",
              borderRadius: "4px",
              background: "none", // Remove border
              border: 'none'
            }}
          >
            <img src="/assets/bold.png" alt="Bold" style={{ width: "32px", height: "32px" }} />
          </Button>

          <Button
            onClick={() => applyFormatting("italic")}

            style={{
              fontSize: "14px",
              borderRadius: "4px",
              background: "none", // Remove border
              border: 'none'
            }}
          >
            <img src="/assets/italic.png" alt="Italic" style={{ width: "32px", height: "32px" }} />
          </Button>

          <Button
            onClick={() => applyFormatting("underline")}
            style={{
              fontSize: "14px",
              borderRadius: "4px",
              background: "none", // Remove border
              border: 'none'
            }}
          >
            <img src="/assets/editor.png" alt="Underline" style={{ width: "32px", height: "32px" }} />
          </Button>

          <Button
            style={{
              fontSize: "14px",
              borderRadius: "4px",
              background: "none", // Remove border
              border: 'none'
            }}
          >
            <img src="/assets/editor2.png" alt="Link" style={{ width: "32px", height: "32px" }} />
          </Button>

          <Button
            style={{
              fontSize: "14px",
              borderRadius: "4px",
              background: "none", // Remove border
              border: 'none',
            }}
          >
            <img src="/assets/editor3.png" alt="Bullet" style={{ width: "32px", height: "32px" }} />
          </Button>

          <Button
            style={{
              fontSize: "14px",
              borderRadius: "4px",
              background: "none", // Remove border
              border: 'none'
            }}
          >
            <img src="/assets/editor3.png" alt="Number" style={{ width: "32px", height: "32px" }} />
          </Button>

        </div>

        {/* Textarea */}
        <Form.Control
          as="textarea"
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{

            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: '400',
            padding: "10px",
            border: '1px solid #EAECF0',
            width: '50%'
          }}
        />
        <div style={{ borderBottom: '1px solid #EAECF0', marginTop: '20px' }}></div>


      </Form.Group>

      <Form.Group className="mt-3" style={{ borderBottom: "1px solid #E5E7EB", paddingBottom: "20px" }}>
        {/* Checkbox */}
      <Form.Check
        type="checkbox"
        label="Schedule an announcement."
        checked={scheduleAssignment}
        onChange={handleScheduleToggle}
        style={{
          fontSize: "12px",
          color: "#374151",
          fontWeight: "500",
          marginBottom: "15px",
        }}
        custom
        inline
        id="schedule-announcement-checkbox"
        className={scheduleAssignment ? "checked" : ""}
      />
      <style>
        {`
          #schedule-announcement-checkbox .form-check-input:checked {
            background-color: red;
            border-color: red;
          }
          
          #schedule-announcement-checkbox .form-check-input:checked:focus {
            box-shadow: 0 0 0 0.2rem rgba(255, 0, 0, 0.25);
          }

          #schedule-announcement-checkbox .form-check-input:checked:before {
            background-color: white;
          }

          /* To change the tick color to white */
          #schedule-announcement-checkbox .form-check-input {
            accent-color: red;
          }
        `}
      </style>

        {/* Announcement Publish Time Section - Display only if checkbox is checked */}
        {scheduleAssignment && (
          <div>
            {/* Announcement Publish Time Label */}
            <Form.Label
              style={{
                fontSize: "14px",
                fontWeight: "500",
                color: "#4B5563",
                marginBottom: "8px",
                display: "block",
              }}
            >
              Announcement publish time
            </Form.Label>

            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              {/* Day Selector */}
              <div style={{ position: "relative", width: "120px" }}>
                <div
                  onClick={() => setIsDayDropdownOpen(!isDayDropdownOpen)}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#111827",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                  }}
                >
                  {day}
                  <img
                    src="/assets/arrow-down.png"
                    alt="Arrow down"
                    style={{ width: "12px", marginLeft: "5px" }}
                  />
                </div>
                {isDayDropdownOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      right: 0,
                      backgroundColor: "white",
                      border: "1px solid #E5E7EB",
                      borderRadius: "8px",
                      maxHeight: "150px",
                      overflowY: "auto",
                      zIndex: 10,
                    }}
                  >
                    {days.map((option) => (
                      <div
                        key={option}
                        onClick={() => handleDayChange(option)}
                        style={{
                          padding: "10px",
                          cursor: "pointer",
                          fontSize: "14px",
                          color: "#111827",
                        }}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Month Selector */}
              <div style={{ position: "relative", width: "100px" }}>
                <div
                  onClick={() => setIsMonthDropdownOpen(!isMonthDropdownOpen)}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#111827",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                  }}
                >
                  {month}
                  <img
                    src="/assets/arrow-down.png"
                    alt="Arrow down"
                    style={{ width: "12px", marginLeft: "5px" }}
                  />
                </div>
                {isMonthDropdownOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      right: 0,
                      backgroundColor: "white",
                      border: "1px solid #E5E7EB",
                      borderRadius: "8px",
                      maxHeight: "150px",
                      overflowY: "auto",
                      zIndex: 10,
                    }}
                  >
                    {months.map((option) => (
                      <div
                        key={option}
                        onClick={() => handleMonthChange(option)}
                        style={{
                          padding: "10px",
                          cursor: "pointer",
                          fontSize: "14px",
                          color: "#111827",
                        }}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Time Selector */}
              <Form.Control
                type="time"
                value={time}
                onChange={handleTimeChange}
                style={{
                  borderRadius: "8px",
                  fontSize: "14px",
                  padding: "10px",
                  fontWeight: "500",
                  color: "#111827",
                  border: "1px solid #E5E7EB",
                  width: "100px",
                }}
              />

              {/* AM/PM Selector */}
              <div style={{ position: "relative", width: "80px" }}>
                <div
                  onClick={() => setIsPeriodDropdownOpen(!isPeriodDropdownOpen)}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#111827",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                  }}
                >
                  {period}
                  <img
                    src="/assets/arrow-down.png"
                    alt="Arrow down"
                    style={{ width: "12px", marginLeft: "5px" }}
                  />
                </div>
                {isPeriodDropdownOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      right: 0,
                      backgroundColor: "white",
                      border: "1px solid #E5E7EB",
                      borderRadius: "8px",
                      maxHeight: "150px",
                      overflowY: "auto",
                      zIndex: 10,
                    }}
                  >
                    {periods.map((option) => (
                      <div
                        key={option}
                        onClick={() => handlePeriodChange(option)}
                        style={{
                          padding: "10px",
                          cursor: "pointer",
                          fontSize: "14px",
                          color: "#111827",
                        }}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}


      </Form.Group>
      {/* Publish Button */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
        <Button
          style={{
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "500",
            color: "white",
            border: "1px solid black",
            background: "black",
            padding: "10px 20px",
          }}
        >
          Publish
        </Button>
      </div>
    </div>
  );
};

export default TeacherCreateAssignments;
