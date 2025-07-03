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

  // Add missing state variables
  const [scheduleAssignment, setScheduleAssignment] = useState(true);
  const [day, setDay] = useState("Monday");
  const [month, setMonth] = useState("January");
  const [time, setTime] = useState("00:00");
  const [period, setPeriod] = useState("AM");

  // Add missing handler functions
  const handleDayChange = (e) => {
    setDay(e.target.value);
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const handlePeriodChange = (e) => {
    setPeriod(e.target.value);
  };

  const handleScheduleToggle = (e) => {
    setScheduleAssignment(e.target.checked);
  };

  const handleDateChange = (date) => {
    setStartDate(date);
  };

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
    <div style={{ padding: "20px", fontFamily: "Inter, sans-serif" }}>
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
            Create Quiz
          </h1>
        </div>

        <div className="d-flex align-items-center">
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
        </div>
      </header>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Button style={{ borderRadius: "8px", display: "flex", alignItems: "center", width: '128px', border: '1px solid #E5E7EB', justifyContent: 'center', background: 'transparent', color: 'black' }}>
            ICS
            <img src="/assets/arrow-down.png" alt="arrow down" style={{ marginLeft: "5px", width: "12px", height: "12px" }} />
          </Button>
          <Button style={{ borderRadius: "8px", display: "flex", alignItems: "center", width: '128px', border: '1px solid #E5E7EB', justifyContent: 'center', background: 'transparent', color: 'black' }}>
            Section 1
            <img src="/assets/arrow-down.png" alt="arrow down" style={{ marginLeft: "5px", width: "12px", height: "12px" }} />
          </Button>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <Button style={{ borderRadius: "8px", fontSize: '14px', fontWeight: '600', color: '#374151', border: '1px solid #D1D5DB', background: 'transparent', color: '#374151' }}>
            Save to draft
          </Button>
          <Button
            style={{
              borderRadius: "8px",
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151',
              border: '1px solid #D1D5DB',
              background: 'transparent',
              color: '#D92D20',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <img
              src="/assets/trash1.png"
              alt="Trash"
              style={{ marginRight: '8px', width: '20px', height: '20px' }}
            />
            Delete
          </Button>

          <Button

            style={{ borderRadius: "8px", fontSize: '16px', fontWeight: '500', color: '#374151', border: '1px solid #D1D5DB', background: 'black', color: 'white' }}
          >
            Publish
          </Button>
        </div>
      </header>


      {/* Assignment Title */}
      <Form.Group className="mb-3">
        <Form.Label style={{ fontSize: "16px", fontWeight: "500", color: "#344054", paddingBottom: '10px' }}>
         Quiz Title
        </Form.Label>
        <Form.Control
          type="text"
          value={assignmentTitle}
          onChange={(e) => setAssignmentTitle(e.target.value)}
          style={{ borderRadius: "8px", fontSize: "14px", fontWeight: '#475467', color: '#475467', padding: "10px", border: '1px solid #D0D5DD', width: '50%' }}
        />
      </Form.Group>
      <div style={{ borderBottom: '1px solid #EAECF0' }}></div>

      <Form.Group className="mb-4">
        {/* Label and Subtitle */}
        <Form.Label style={{ fontSize: "16px", fontWeight: "500", color: "#344054", marginTop: '20px' }}>
          Description
        </Form.Label>
        <p style={{ fontSize: "14px", fontWeight: "400", color: "#475467", marginBottom: "20px" }}>
          Write Quiz description here.
        </p>

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
            border: '1px solid #D0D5DD',
            width: '50%'
          }}
        />
        <div style={{ borderBottom: '1px solid #EAECF0', marginTop: '20px' }}></div>

        {/* Attachment Section */}
        <div
          style={{
            marginTop: "15px",
            display: 'flex',
            flexDirection: 'column',
            alignItems: "left",
            gap: "10px",
            width: '320px'
          }}
        >
          <input
            type="text"
            value={attachmentLink}
            onChange={(e) => setAttachmentLink(e.target.value)}
            style={{
              border: "1px solid #D1D5DB",
              borderRadius: "8px",
              padding: "10px",
              fontSize: "14px",
              flex: 1,
            }}
          />
          <Button
            variant="link"
            style={{
              fontSize: "14px",
              color: "#2563EB",
              textDecoration: "none",
              display: 'flex'
            }}
          >
            Add attachments in Quiz
          </Button>
        </div>
      </Form.Group>



      {/* Select Date */}
      <div>
        {/* Label */}
        <Form.Label style={{ fontSize: "16px", fontWeight: "500", color: "#344054" }}>
          Select Date
        </Form.Label>

        <div style={{ display: "flex", gap: "20px", alignItems: "flex-start", marginTop: "10px" }}>
          {/* Calendar */}
          <div
            style={{
              border: "1px solid #D1D5DB",
              borderRadius: "8px",
              padding: "10px",
              marginTop: "20px",
            }}
          >
            <Calendar
              value={startDate}
              onChange={handleDateChange}
              tileClassName={({ date, view }) => {
                if (view === 'month') {
                  const day = date.getDay();
                  if (day === 6 || day === 0) return 'weekend-date'; // Saturday (6) or Sunday (0)
                  if (date.toDateString() === new Date().toDateString()) return 'current-date'; // Current date
                }
                return '';
              }}
              formatShortWeekday={(locale, date) => {
                const weekday = date.toLocaleDateString(locale, { weekday: 'short' });
                return weekday.charAt(0).toUpperCase() + weekday.charAt(1).toLowerCase();
              }}
              next2Label={null}
              prev2Label={null}
            />
          </div>
          {/* Start Date, End Date, and Time */}
          <div style={{ flex: 1 }}>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: "16px", fontWeight: "500", color: "#344054", fontStyle: 'normal' }}>
                Start Date
              </Form.Label>
              <Form.Control
                type="text"
                value={startDate.toDateString()}
                onChange={(e) => setStartDate(new Date(e.target.value))}
                style={{ border: '1px solid #D0D5DD', borderRadius: '8px', padding: "10px", fontSize: "14px", background: 'none', width: '250px' }}
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: "16px", fontWeight: "500", color: "#344054", fontStyle: 'normal' }}>
                End Date
              </Form.Label>
              <Form.Control
                type="text" // Change from 'date' to 'text'
                value={endDate.toISOString().split("T")[0]} // Keeps the formatted date
                onChange={(e) => setEndDate(new Date(e.target.value))} // Allows manual input
                style={{ border: '1px solid #D0D5DD', borderRadius: '8px', padding: "10px", fontSize: "14px", width: '250px' }}
                placeholder="YYYY-MM-DD" // Optional: Add a placeholder to guide the user
              />
            </Form.Group>


            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: "16px", fontWeight: "500", color: "#344054", fontStyle: 'normal' }}>
                Start Time
              </Form.Label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '250px' }}>
                {/* Clock Icon */}
                <img
                  src="/assets/clock2.png" // Update with your actual path
                  alt="Clock Icon"
                  style={{ position: 'absolute', left: '10px', width: '20px', height: '20px' }}
                />
                <Form.Control
                  as="select"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  style={{
                    border: '1px solid #D0D5DD',
                    borderRadius: '8px',
                    padding: '10px 30px 10px 40px', // Add padding to leave space for the clock icon
                    fontSize: '14px',
                    width: '100%',
                    appearance: 'none', // Remove default arrow styling
                    background: 'none', // Ensure no background clashes
                  }}
                >
                  <option value="00:00 AM">00:00 AM</option>
                  <option value="01:00 AM">01:00 AM</option>
                  <option value="02:00 AM">02:00 AM</option>
                  <option value="03:00 AM">03:00 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="01:00 PM">01:00 PM</option>
                </Form.Control>
                {/* Arrow-down Icon */}
                <img
                  src="/assets/arrow-down.png" // Update with your actual path
                  alt="Arrow Down"
                  style={{ position: 'absolute', right: '10px', width: '15px', height: '15px', pointerEvents: 'none' }}
                />
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: "16px", fontWeight: "500", color: "#344054", fontStyle: 'normal' }}>
                End Time
              </Form.Label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '250px' }}>
                {/* Clock Icon */}
                <img
                  src="/assets/clock2.png" // Update with your actual path
                  alt="Clock Icon"
                  style={{ position: 'absolute', left: '10px', width: '20px', height: '20px' }}
                />
                <Form.Control
                  as="select"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  style={{
                    border: '1px solid #D0D5DD',
                    borderRadius: '8px',
                    padding: '10px 30px 10px 40px', // Add padding to leave space for the clock icon
                    fontSize: '14px',
                    width: '100%',
                    appearance: 'none', // Remove default arrow styling
                    background: 'none', // Ensure no background clashes
                  }}
                >
                  <option value="00:00 AM">00:00 AM</option>
                  <option value="01:00 AM">01:00 AM</option>
                  <option value="02:00 AM">02:00 AM</option>
                  <option value="03:00 AM">03:00 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="01:00 PM">01:00 PM</option>
                </Form.Control>
                {/* Arrow-down Icon */}
                <img
                  src="/assets/arrow-down.png" // Update with your actual path
                  alt="Arrow Down"
                  style={{ position: 'absolute', right: '10px', width: '15px', height: '15px', pointerEvents: 'none' }}
                />
              </div>
            </Form.Group>

          </div>
        </div>

        {/* Custom CSS for Calendar Highlight */}
        <style>
          {`
          .react-calendar__tile--highlight {
            background: #6D28D9;
            color: white;
            border-radius: 50%;
            font-size:14px;
          }
            .current-date {
  flex: 0 0 14.2857%;
  overflow: hidden;
  margin-inline-end: 0px;
  border-radius: 80%;
  width: 40px !important;
  height: 40px !important;
  background: rebeccapurple !important;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  
}
  abbr[title] {
    -webkit-text-decoration: none;
    text-decoration: none;
    cursor: help;
    text-decoration-skip-ink: none;
    font-size:14px;
    border: none;
}
  .react-calendar__tile{
  font-size:14px;
  }

          .react-calendar__tile--highlight:hover {
            background: #5B21B6;
          }
            .react-calendar {
    width: 350px;
    max-width: 100%;
    background: white;
     border: none; 
    /* font-family: 'Arial', 'Helvetica', sans-serif; */
    line-height: 1.125em;
}
  //   .weekend-date {
  // color: black !important;
  // font-weight: normal;
}
        `}
        </style>
      </div>

      <Form.Group className="mt-3">
        {/* Checkbox */}
        <Form.Check
          type="checkbox"
          label="Schedule an assignment."
          checked={scheduleAssignment}
          onChange={handleScheduleToggle}
          style={{
            fontSize: "12px",
            color: "#374151",
            fontWeight: "500",
            marginBottom: "15px",
          }}
        />

        {/* Announcement Publish Time */}
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
              <Form.Control
                as="select"
                value={day}
                onChange={handleDayChange}
                style={{
                  borderRadius: "8px",
                  fontSize: "14px",
                  padding: "10px",
                  fontWeight: "500",
                  color: "#111827",
                  border: "1px solid #E5E7EB",
                  width: "150px",
                }}
              >
                <option>Monday</option>
                <option>Tuesday</option>
                <option>Wednesday</option>
                <option>Thursday</option>
                <option>Friday</option>
                <option>Saturday</option>
                <option>Sunday</option>
              </Form.Control>

              {/* Month Selector */}
              <Form.Control
                as="select"
                value={month}
                onChange={handleMonthChange}
                style={{
                  borderRadius: "8px",
                  fontSize: "14px",
                  padding: "10px",
                  fontWeight: "500",
                  color: "#111827",
                  border: "1px solid #E5E7EB",
                  width: "100px",
                }}
              >
                <option>Jan</option>
                <option>Feb</option>
                <option>Mar</option>
                <option>Apr</option>
                <option>May</option>
                <option>Jun</option>
                <option>Jul</option>
                <option>Aug</option>
                <option>Sep</option>
                <option>Oct</option>
                <option>Nov</option>
                <option>Dec</option>
              </Form.Control>

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
                  width: "120px",
                }}
              />

              {/* AM/PM Selector */}
              <Form.Control
                as="select"
                value={period}
                onChange={handlePeriodChange}
                style={{
                  borderRadius: "8px",
                  fontSize: "14px",
                  padding: "10px",
                  fontWeight: "500",
                  color: "#111827",
                  border: "1px solid #E5E7EB",
                  width: "80px",
                }}
              >
                <option>AM</option>
                <option>PM</option>
              </Form.Control>
            </div>
          </div>
        )}
      </Form.Group>
    </div>
  );
};

export default TeacherCreateAssignments;
