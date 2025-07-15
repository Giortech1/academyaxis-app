import React, { useContext, useState } from "react";
import { Form, Button, Image } from "react-bootstrap";
import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-calendar/dist/Calendar.css";
import { UserContext } from "./UserContext";

const TeacherCreateAssignments = () => {
  const { userData, sections, createAssignment } = useContext(UserContext);
  const [selectedSection, setSelectedSection] = useState(null);
  const navigate = useNavigate();

  const [assignmentTitle, setAssignmentTitle] = useState("");
  const [description, setDescription] = useState("");
  const [attachmentLink, setAttachmentLink] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(new Date().setDate(new Date().getDate() + 14)));
  const [selectedTime, setSelectedTime] = useState("09:00 AM");
  const [selectedEndTime, setSelectedEndTime] = useState("11:00 AM");
  const [scheduleAssignment, setScheduleAssignment] = useState(false);
  const [day, setDay] = useState("Monday");
  const [month, setMonth] = useState("January");
  const [time, setTime] = useState("09:00");
  const [period, setPeriod] = useState("AM");
  const [isLoading, setIsLoading] = useState(false);

  // Helper function to convert time string to 24-hour format
  const convertTo24Hour = (timeStr) => {
    const [time, period] = timeStr.split(' ');
    const [hours, minutes] = time.split(':');
    let hour24 = parseInt(hours);

    if (period === 'PM' && hour24 !== 12) {
      hour24 += 12;
    } else if (period === 'AM' && hour24 === 12) {
      hour24 = 0;
    }

    return `${hour24.toString().padStart(2, '0')}:${minutes}`;
  };

  // Helper function to create ISO date string
  const createISODateTime = (date, timeStr) => {
    const time24 = convertTo24Hour(timeStr);
    const [hours, minutes] = time24.split(':');

    const newDate = new Date(date);
    newDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);

    return newDate.toISOString();
  };

  // Helper function to create scheduled date
  const createScheduledDateTime = (day, month, time, period) => {
    const currentYear = new Date().getFullYear();
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    const monthIndex = monthNames.indexOf(month);

    const scheduleDate = new Date(currentYear, monthIndex, 1);
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const targetDay = dayNames.indexOf(day);

    while (scheduleDate.getDay() !== targetDay) {
      scheduleDate.setDate(scheduleDate.getDate() + 1);
    }

    const time24 = convertTo24Hour(`${time} ${period}`);
    const [hours, minutes] = time24.split(':');

    scheduleDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);

    return scheduleDate.toISOString();
  };

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

  const handleEndDateChange = (e) => {
    const newEndDate = new Date(e.target.value);
    setEndDate(newEndDate);
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

  const resetForm = () => {
    setAssignmentTitle("");
    setDescription("");
    setAttachmentLink("");
    setStartDate(new Date());
    setEndDate(new Date(new Date().setDate(new Date().getDate() + 14)));
    setSelectedTime("09:00 AM");
    setSelectedEndTime("11:00 AM");
    setSelectedSection(null);
    setScheduleAssignment(false);
    setDay("Monday");
    setMonth("January");
    setTime("09:00");
    setPeriod("AM");
  };

  const saveAssignment = async (isDraft = false) => {
    if (!selectedSection) {
      toast.error("Please select a section first");
      return;
    }

    if (!assignmentTitle.trim()) {
      toast.error("Please enter an assignment title");
      return;
    }

    if (!description.trim()) {
      toast.error("Please enter assignment description");
      return;
    }

    setIsLoading(true);
    try {
      const startDateTime = createISODateTime(startDate, selectedTime);
      const endDateTime = createISODateTime(endDate, selectedEndTime);
      let scheduledDateTime = null;

      if (scheduleAssignment) {
        scheduledDateTime = createScheduledDateTime(day, month, time, period);
      }

      const assignmentData = {
        title: assignmentTitle,
        description: description,
        attachmentLink: attachmentLink || null,
        startDate: startDateTime,
        endDate: endDateTime,
        startTime: selectedTime,
        endTime: selectedEndTime,
        isScheduled: scheduleAssignment,
        scheduleDateTime: scheduledDateTime,
        scheduleDay: scheduleAssignment ? day : null,
        scheduleMonth: scheduleAssignment ? month : null,
        scheduleTime: scheduleAssignment ? time : null,
        schedulePeriod: scheduleAssignment ? period : null,
        createdBy: userData?.teacher_id,
        createdByName: userData?.full_name || "Unknown Teacher",
        status: isDraft ? "draft" : "published",
        isDraft: isDraft,
        sectionId: selectedSection?.id,
        submitted: [],
      };

      const result = await createAssignment(assignmentData);

      if (result?.success) {
        toast.success(result?.message || "Assignment saved successfully!");
        if (!isDraft) {
          resetForm();
          navigate(-1);
        }
      } else {
        toast.error(result?.message || "Failed to save assignment");
      }

    } catch (error) {
      console.error("Error in saveAssignment: ", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteAssignment = () => {
    if (window.confirm("Are you sure you want to clear this assignment?")) {
      resetForm();
      toast.success("Assignment cleared successfully!");
    }
  };

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <Image
            src="/assets/arrow-left.png"
            roundedCircle
            width={24}
            height={24}
            style={styles.backButton}
            alt="Back Arrow"
            onClick={() => navigate(-1)}
          />
          <h1 style={styles.headerTitle}>Create Assignment</h1>
        </div>

        <div style={styles.headerRight}>
          <img
            src={userData?.profile_pic || "/assets/avatar.jpeg"}
            alt="User"
            style={styles.avatar}
          />
          <div style={styles.userInfo}>
            <div style={styles.userName}>{userData?.full_name || "Teacher"}</div>
            <div style={styles.userId}>{userData?.teacher_id || "ID"}</div>
          </div>
          <button style={styles.dropdownButton}>
            <img
              src="/assets/arrow-down.png"
              alt="Dropdown"
              style={styles.dropdownIcon}
            />
          </button>
        </div>
      </header>

      {/* Section Selection and Action Buttons */}
      <header style={styles.actionHeader}>
        <div style={styles.sectionSelector}>
          <Form.Select
            value={selectedSection?.course?.name || ""}
            onChange={(e) => {
              const section = sections.find(c => c.course.name === e.target.value);
              setSelectedSection(section || null);
            }}
            style={styles.sectionSelect}
          >
            <option value="">Select section</option>
            {sections?.map((section, index) => (
              <option key={index} value={section?.course?.name}>
                {section?.course?.name} (Section {section?.section})
              </option>
            ))}
          </Form.Select>
        </div>

        <div style={styles.actionButtons}>
          <Button
            onClick={() => saveAssignment(true)}
            disabled={isLoading}
            style={styles.draftButton}
          >
            {isLoading ? "Saving..." : "Save to draft"}
          </Button>

          <Button onClick={deleteAssignment} style={styles.deleteButton}>
            <img
              src="/assets/trash1.png"
              alt="Clear"
              style={styles.deleteIcon}
            />
            Clear
          </Button>

          <Button
            onClick={() => saveAssignment(false)}
            disabled={isLoading || !selectedSection}
            style={styles.publishButton}
          >
            {isLoading ? "Publishing..." : "Publish"}
          </Button>
        </div>
      </header>

      {/* Assignment Title */}
      <Form.Group className="mb-3">
        <Form.Label style={styles.label}>Assignment Title</Form.Label>
        <Form.Control
          type="text"
          value={assignmentTitle}
          onChange={(e) => setAssignmentTitle(e.target.value)}
          placeholder="Enter assignment title"
          style={styles.titleInput}
        />
      </Form.Group>

      <div style={styles.divider}></div>

      {/* Description Section */}
      <Form.Group className="mb-4">
        <Form.Label style={styles.descriptionLabel}>Description</Form.Label>
        <p style={styles.descriptionSubtitle}>
          Write assignment description here.
        </p>

        {/* Formatting Toolbar */}
        <div style={styles.toolbar}>
          <Form.Select defaultValue="Regular" style={styles.formatSelect}>
            <option value="Regular">Regular</option>
            <option value="Heading">Heading</option>
            <option value="Subheading">Subheading</option>
          </Form.Select>

          <Button onClick={() => applyFormatting("bold")} style={styles.formatButton}>
            <img src="/assets/bold.png" alt="Bold" style={styles.formatIcon} />
          </Button>
          <Button onClick={() => applyFormatting("italic")} style={styles.formatButton}>
            <img src="/assets/italic.png" alt="Italic" style={styles.formatIcon} />
          </Button>
          <Button onClick={() => applyFormatting("underline")} style={styles.formatButton}>
            <img src="/assets/editor.png" alt="Underline" style={styles.formatIcon} />
          </Button>
          <Button style={styles.formatButton}>
            <img src="/assets/editor2.png" alt="Link" style={styles.formatIcon} />
          </Button>
          <Button style={styles.formatButton}>
            <img src="/assets/editor3.png" alt="Bullet" style={styles.formatIcon} />
          </Button>
          <Button style={styles.formatButton}>
            <img src="/assets/editor3.png" alt="Number" style={styles.formatIcon} />
          </Button>
        </div>

        {/* Textarea */}
        <Form.Control
          as="textarea"
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter assignment description..."
          style={styles.textarea}
        />

        <div style={styles.divider}></div>

        {/* Attachment Section */}
        <div style={styles.attachmentSection}>
          <input
            type="text"
            value={attachmentLink}
            onChange={(e) => setAttachmentLink(e.target.value)}
            style={styles.attachmentInput}
            placeholder="Enter attachment link (optional)"
          />
          <Button variant="link" style={styles.attachmentButton}>
            Add attachments in assignment
          </Button>
        </div>
      </Form.Group>

      {/* Date Selection */}
      <div>
        <Form.Label style={styles.label}>Select Date</Form.Label>
        <div style={styles.dateSection}>
          {/* Calendar */}
          <div style={styles.calendarContainer}>
            <Calendar
              value={startDate}
              onChange={handleDateChange}
              tileClassName={({ date, view }) => {
                if (view === 'month') {
                  const day = date.getDay();
                  if (day === 6 || day === 0) return 'weekend-date';
                  if (date.toDateString() === new Date().toDateString()) return 'current-date';
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

          {/* Date and Time Controls */}
          <div style={styles.dateControls}>
            <Form.Group className="mb-3">
              <Form.Label style={styles.dateLabel}>Start Date</Form.Label>
              <Form.Control
                type="text"
                value={startDate.toDateString()}
                style={styles.dateInput}
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={styles.dateLabel}>End Date</Form.Label>
              <Form.Control
                type="date"
                value={endDate.toISOString().split("T")[0]}
                onChange={handleEndDateChange}
                style={styles.dateInput}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={styles.dateLabel}>Start Time</Form.Label>
              <div style={styles.timeContainer}>
                <img src="/assets/clock2.png" alt="Clock Icon" style={styles.clockIcon} />
                <Form.Control
                  as="select"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  style={styles.timeSelect}
                >
                  <option value="12:00 AM">12:00 AM</option>
                  <option value="01:00 AM">01:00 AM</option>
                  <option value="02:00 AM">02:00 AM</option>
                  <option value="03:00 AM">03:00 AM</option>
                  <option value="04:00 AM">04:00 AM</option>
                  <option value="05:00 AM">05:00 AM</option>
                  <option value="06:00 AM">06:00 AM</option>
                  <option value="07:00 AM">07:00 AM</option>
                  <option value="08:00 AM">08:00 AM</option>
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="01:00 PM">01:00 PM</option>
                  <option value="02:00 PM">02:00 PM</option>
                  <option value="03:00 PM">03:00 PM</option>
                  <option value="04:00 PM">04:00 PM</option>
                  <option value="05:00 PM">05:00 PM</option>
                  <option value="06:00 PM">06:00 PM</option>
                  <option value="07:00 PM">07:00 PM</option>
                  <option value="08:00 PM">08:00 PM</option>
                  <option value="09:00 PM">09:00 PM</option>
                  <option value="10:00 PM">10:00 PM</option>
                  <option value="11:00 PM">11:00 PM</option>
                </Form.Control>
                <img src="/assets/arrow-down.png" alt="Arrow Down" style={styles.arrowIcon} />
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={styles.dateLabel}>End Time</Form.Label>
              <div style={styles.timeContainer}>
                <img src="/assets/clock2.png" alt="Clock Icon" style={styles.clockIcon} />
                <Form.Control
                  as="select"
                  value={selectedEndTime}
                  onChange={(e) => setSelectedEndTime(e.target.value)}
                  style={styles.timeSelect}
                >
                  <option value="12:00 AM">12:00 AM</option>
                  <option value="01:00 AM">01:00 AM</option>
                  <option value="02:00 AM">02:00 AM</option>
                  <option value="03:00 AM">03:00 AM</option>
                  <option value="04:00 AM">04:00 AM</option>
                  <option value="05:00 AM">05:00 AM</option>
                  <option value="06:00 AM">06:00 AM</option>
                  <option value="07:00 AM">07:00 AM</option>
                  <option value="08:00 AM">08:00 AM</option>
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="01:00 PM">01:00 PM</option>
                  <option value="02:00 PM">02:00 PM</option>
                  <option value="03:00 PM">03:00 PM</option>
                  <option value="04:00 PM">04:00 PM</option>
                  <option value="05:00 PM">05:00 PM</option>
                  <option value="06:00 PM">06:00 PM</option>
                  <option value="07:00 PM">07:00 PM</option>
                  <option value="08:00 PM">08:00 PM</option>
                  <option value="09:00 PM">09:00 PM</option>
                  <option value="10:00 PM">10:00 PM</option>
                  <option value="11:00 PM">11:00 PM</option>
                </Form.Control>
                <img src="/assets/arrow-down.png" alt="Arrow Down" style={styles.arrowIcon} />
              </div>
            </Form.Group>
          </div>
        </div>
      </div>

      {/* Schedule Assignment */}
      <Form.Group className="mt-3">
        <Form.Check
          type="checkbox"
          label="Schedule this assignment"
          checked={scheduleAssignment}
          onChange={handleScheduleToggle}
          style={styles.checkbox}
        />

        {scheduleAssignment && (
          <div>
            <Form.Label style={styles.scheduleLabel}>
              Assignment publish time
            </Form.Label>
            <div style={styles.scheduleControls}>
              <Form.Control
                as="select"
                value={day}
                onChange={handleDayChange}
                style={styles.scheduleSelect}
              >
                <option>Monday</option>
                <option>Tuesday</option>
                <option>Wednesday</option>
                <option>Thursday</option>
                <option>Friday</option>
                <option>Saturday</option>
                <option>Sunday</option>
              </Form.Control>

              <Form.Control
                as="select"
                value={month}
                onChange={handleMonthChange}
                style={styles.scheduleSelectSmall}
              >
                <option>January</option>
                <option>February</option>
                <option>March</option>
                <option>April</option>
                <option>May</option>
                <option>June</option>
                <option>July</option>
                <option>August</option>
                <option>September</option>
                <option>October</option>
                <option>November</option>
                <option>December</option>
              </Form.Control>

              <Form.Control
                type="time"
                value={time}
                onChange={handleTimeChange}
                style={styles.scheduleTime}
              />

              <Form.Control
                as="select"
                value={period}
                onChange={handlePeriodChange}
                style={styles.schedulePeriod}
              >
                <option>AM</option>
                <option>PM</option>
              </Form.Control>
            </div>
          </div>
        )}
      </Form.Group>

      {/* Calendar Styles */}
      <style>
        {`
          .react-calendar__tile--highlight {
            background: #6D28D9;
            color: white;
            border-radius: 50%;
            font-size: 14px;
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
            font-size: 14px;
            border: none;
          }
          
          .react-calendar__tile {
            font-size: 14px;
          }
          
          .react-calendar__tile--highlight:hover {
            background: #5B21B6;
          }
          
          .react-calendar {
            width: 350px;
            max-width: 100%;
            background: white;
            border: none;
            line-height: 1.125em;
          }
          
          .weekend-date {
            color: black !important;
            font-weight: normal;
          }
        `}
      </style>

      <ToastContainer />
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Inter, sans-serif"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px"
  },
  headerLeft: {
    display: "flex",
    alignItems: "center"
  },
  backButton: {
    cursor: "pointer",
    marginRight: "8px"
  },
  headerTitle: {
    margin: 0,
    fontSize: "24px",
    fontWeight: "600"
  },
  headerRight: {
    display: "flex",
    alignItems: "center"
  },
  avatar: {
    width: "54px",
    height: "54px",
    borderRadius: "50%",
    marginRight: "8px"
  },
  userInfo: {
    marginRight: "0"
  },
  userName: {
    fontWeight: "500",
    fontSize: "14px"
  },
  userId: {
    fontSize: "12px",
    color: "#6c757d"
  },
  dropdownButton: {
    background: "transparent",
    border: "none"
  },
  dropdownIcon: {
    width: "12px",
    height: "12px",
    verticalAlign: "top"
  },
  actionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px"
  },
  sectionSelector: {
    position: "relative",
    width: "50%"
  },
  sectionSelect: {
    borderRadius: "12px",
    fontSize: "14px",
    color: "#475467",
    fontWeight: "400",
    padding: "10px",
    border: "1px solid #EAECF0",
    appearance: "none"
  },
  actionButtons: {
    display: "flex",
    gap: "10px"
  },
  draftButton: {
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#374151",
    border: "1px solid #D1D5DB",
    background: "transparent"
  },
  deleteButton: {
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#D92D20",
    border: "1px solid #D1D5DB",
    background: "transparent",
    display: "flex",
    alignItems: "center"
  },
  deleteIcon: {
    marginRight: "8px",
    width: "20px",
    height: "20px"
  },
  publishButton: {
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "500",
    color: "white",
    border: "1px solid #D1D5DB",
    background: "black"
  },
  label: {
    fontSize: "16px",
    fontWeight: "500",
    color: "#344054",
    paddingBottom: "10px"
  },
  titleInput: {
    borderRadius: "8px",
    fontSize: "14px",
    color: "#475467",
    padding: "10px",
    border: "1px solid #D0D5DD",
    width: "50%"
  },
  divider: {
    borderBottom: "1px solid #EAECF0",
    marginTop: "20px",
    marginBottom: "20px"
  },
  descriptionLabel: {
    fontSize: "16px",
    fontWeight: "500",
    color: "#344054",
    marginTop: "20px"
  },
  descriptionSubtitle: {
    fontSize: "14px",
    fontWeight: "400",
    color: "#475467",
    marginBottom: "20px"
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    padding: "8px",
    backgroundColor: "#F9FAFB"
  },
  formatSelect: {
    border: "1px solid #D1D5DB",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "500",
    color: "#111827",
    width: "250px",
    padding: "5px",
    height: "40px"
  },
  formatButton: {
    fontSize: "14px",
    borderRadius: "4px",
    background: "none",
    border: "none"
  },
  formatIcon: {
    width: "32px",
    height: "32px"
  },
  textarea: {
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "400",
    padding: "10px",
    border: "1px solid #D0D5DD",
    width: "50%"
  },
  attachmentSection: {
    marginTop: "15px",
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
    gap: "10px",
    width: "320px"
  },
  attachmentInput: {
    border: "1px solid #D1D5DB",
    borderRadius: "8px",
    padding: "10px",
    fontSize: "14px",
    flex: 1
  },
  attachmentButton: {
    fontSize: "14px",
    color: "#2563EB",
    textDecoration: "none",
    display: "flex"
  },
  dateSection: {
    display: "flex",
    gap: "20px",
    alignItems: "flex-start",
    marginTop: "10px"
  },
  calendarContainer: {
    border: "1px solid #D1D5DB",
    borderRadius: "8px",
    padding: "10px",
    marginTop: "20px"
  },
  dateControls: {
    flex: 1
  },
  dateLabel: {
    fontSize: "16px",
    fontWeight: "500",
    color: "#344054",
    fontStyle: "normal"
  },
  dateInput: {
    border: "1px solid #D0D5DD",
    borderRadius: "8px",
    padding: "10px",
    fontSize: "14px",
    background: "none",
    width: "250px"
  },
  timeContainer: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    width: "250px"
  },
  clockIcon: {
    position: "absolute",
    left: "10px",
    width: "20px",
    height: "20px"
  },
  timeSelect: {
    border: "1px solid #D0D5DD",
    borderRadius: "8px",
    padding: "10px 30px 10px 40px",
    fontSize: "14px",
    width: "100%",
    appearance: "none",
    background: "none"
  },
  arrowIcon: {
    position: "absolute",
    right: "10px",
    width: "15px",
    height: "15px",
    pointerEvents: "none"
  },
  checkbox: {
    fontSize: "12px",
    color: "#374151",
    fontWeight: "500",
    marginBottom: "15px"
  },
  scheduleLabel: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#4B5563",
    marginBottom: "8px",
    display: "block"
  },
  scheduleControls: {
    display: "flex",
    gap: "10px",
    alignItems: "center"
  },
  scheduleSelect: {
    borderRadius: "8px",
    fontSize: "14px",
    padding: "10px",
    fontWeight: "500",
    color: "#111827",
    border: "1px solid #E5E7EB",
    width: "150px"
  },
  scheduleSelectSmall: {
    borderRadius: "8px",
    fontSize: "14px",
    padding: "10px",
    fontWeight: "500",
    color: "#111827",
    border: "1px solid #E5E7EB",
    width: "100px"
  },
  scheduleTime: {
    borderRadius: "8px",
    fontSize: "14px",
    padding: "10px",
    fontWeight: "500",
    color: "#111827",
    border: "1px solid #E5E7EB",
    width: "120px"
  },
  schedulePeriod: {
    borderRadius: "8px",
    fontSize: "14px",
    padding: "10px",
    fontWeight: "500",
    color: "#111827",
    border: "1px solid #E5E7EB",
    width: "80px"
  }
};

export default TeacherCreateAssignments;