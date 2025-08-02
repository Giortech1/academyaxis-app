import React, { useContext, useState, useRef, useEffect } from "react";
import { Form, Button, Image } from "react-bootstrap";
import Calendar from "react-calendar";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-calendar/dist/Calendar.css";
import { UserContext } from "./UserContext";

const TeacherCreateQuizzes = () => {
  const { sectionId } = useParams();
  const { userData, sections, createQuiz } = useContext(UserContext);
  const navigate = useNavigate();

  const [selectedSection, setSelectedSection] = useState(null);
  const [quizTitle, setQuizTitle] = useState("");
  const [quizMarks, setQuizMarks] = useState("");
  const [description, setDescription] = useState("");
  const [attachmentLink, setAttachmentLink] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(new Date().setDate(new Date().getDate() + 14)));
  const [selectedTime, setSelectedTime] = useState("09:00 AM");
  const [selectedEndTime, setSelectedEndTime] = useState("11:00 AM");
  const [scheduleQuiz, setScheduleQuiz] = useState(false);
  const [scheduleDate, setScheduleDate] = useState(new Date());
  const [scheduleTime, setScheduleTime] = useState("09:00 AM");
  const [isLoading, setIsLoading] = useState(false);
  const [currentFormat, setCurrentFormat] = useState("Regular");
  const textareaRef = useRef(null);

  useEffect(() => {
    if (!sectionId || sections?.length === 0) return;

    const matchedSection = sections.find(section => section?.id === sectionId);
    setSelectedSection(matchedSection);

  }, [sectionId, sections]);

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

  const createISODateTime = (date, timeStr) => {
    const time24 = convertTo24Hour(timeStr);
    const [hours, minutes] = time24.split(':');

    const newDate = new Date(date);
    newDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);

    return newDate.toISOString();
  };

  const createScheduledDateTime = (date, timeStr) => {
    const time24 = convertTo24Hour(timeStr);
    const [hours, minutes] = time24.split(':');

    const scheduleDateTime = new Date(date);
    scheduleDateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

    return scheduleDateTime.toISOString();
  };

  const handleScheduleDateChange = (date) => {
    setScheduleDate(date);
  };

  const handleScheduleTimeChange = (e) => {
    setScheduleTime(e.target.value);
  };

  const handleScheduleToggle = (e) => {
    setScheduleQuiz(e.target.checked);
  };

  const handleDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (e) => {
    const newEndDate = new Date(e.target.value);
    setEndDate(newEndDate);
  };

  const getSelectedText = () => {
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;
      return {
        text: description.substring(start, end),
        start,
        end,
      };
    }
    return { text: '', start: 0, end: 0 };
  };

  const insertAtCursor = (before, after = '') => {
    const { text, start, end } = getSelectedText();

    let newText;
    let newCursorPos;

    if (text) {
      newText = description.substring(0, start) + before + text + after + description.substring(end);
      newCursorPos = start + before.length + text.length + after.length;
    } else {
      if (after) {
        newText = description.substring(0, start) + before + after + description.substring(start);
        newCursorPos = start + before.length;
      } else {
        newText = description.substring(0, start) + before + description.substring(start);
        newCursorPos = start + before.length;
      }
    }

    setDescription(newText);

    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(newCursorPos, newCursorPos);
      }
    }, 0);
  };

  const applyFormatting = (format) => {
    switch (format) {
      case 'bold':
        insertAtCursor('**', '**');
        break;
      case 'italic':
        insertAtCursor('*', '*');
        break;
      case 'underline':
        insertAtCursor('<u>', '</u>');
        break;
      case 'link':
        const url = prompt('Enter URL:');
        if (url) {
          const { text } = getSelectedText();
          const linkText = text || 'link text';
          insertAtCursor(`[${linkText}](${url})`);
        }
        break;
      case 'bullet':
        const { start: bulletStart } = getSelectedText();
        const beforeCursor = description.substring(0, bulletStart);
        const needsNewLine = beforeCursor.length > 0 && !beforeCursor.endsWith('\n');
        insertAtCursor(needsNewLine ? '\n• ' : '• ');
        break;
      case 'number':
        const { start: numberStart } = getSelectedText();
        const beforeNumberCursor = description.substring(0, numberStart);
        const needsNumberNewLine = beforeNumberCursor.length > 0 && !beforeNumberCursor.endsWith('\n');
        insertAtCursor(needsNumberNewLine ? '\n1. ' : '1. ');
        break;
      default:
        break;
    }
  };

  const handleFormatChange = (e) => {
    const format = e.target.value;
    setCurrentFormat(format);

    const { text, start, end } = getSelectedText();

    if (text) {
      let formattedText;
      switch (format) {
        case 'Heading':
          formattedText = `# ${text}`;
          break;
        case 'Subheading':
          formattedText = `## ${text}`;
          break;
        case 'Regular':
        default:
          formattedText = text;
          break;
      }

      const newDescription = description.substring(0, start) + formattedText + description.substring(end);
      setDescription(newDescription);

      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
          const newCursorPos = start + formattedText.length;
          textareaRef.current.setSelectionRange(newCursorPos, newCursorPos);
        }
      }, 0);
    } else {
      switch (format) {
        case 'Heading':
          insertAtCursor('# ');
          break;
        case 'Subheading':
          insertAtCursor('## ');
          break;
        case 'Regular':
        default:
          break;
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'b':
          e.preventDefault();
          applyFormatting('bold');
          break;
        case 'i':
          e.preventDefault();
          applyFormatting('italic');
          break;
        case 'u':
          e.preventDefault();
          applyFormatting('underline');
          break;
        default:
          break;
      }
    }
  };

  const resetForm = () => {
    setQuizTitle("");
    setQuizMarks("");
    setDescription("");
    setAttachmentLink("");
    setStartDate(new Date());
    setEndDate(new Date(new Date().setDate(new Date().getDate() + 14)));
    setSelectedTime("09:00 AM");
    setSelectedEndTime("11:00 AM");
    setSelectedSection(null);
    setScheduleQuiz(false);
    setScheduleDate(new Date());
    setScheduleTime("09:00 AM");
    setCurrentFormat("Regular");
  };

  const saveQuiz = async (isDraft = false) => {
    if (!selectedSection) {
      toast.error("Please select a section first");
      return;
    }

    if (!quizTitle.trim()) {
      toast.error("Please enter a quiz title");
      return;
    }

    if (!quizMarks.trim()) {
      toast.error("Please enter a quiz marks");
      return;
    }

    if (!description.trim()) {
      toast.error("Please enter quiz description");
      return;
    }

    setIsLoading(true);
    try {
      const startDateTime = createISODateTime(startDate, selectedTime);
      const endDateTime = createISODateTime(endDate, selectedEndTime);
      let scheduledDateTime = null;

      if (scheduleQuiz) {
        scheduledDateTime = createScheduledDateTime(scheduleDate, scheduleTime);

        if (new Date(scheduledDateTime) <= new Date()) {
          toast.error("Schedule time must be in the future");
          return;
        }
      }

      const quizData = {
        title: quizTitle,
        totalMarks: quizMarks,
        description: description,
        attachmentLink: attachmentLink || null,
        startDate: startDateTime,
        endDate: endDateTime,
        startTime: selectedTime,
        endTime: selectedEndTime,
        isScheduled: scheduleQuiz,
        scheduleDateTime: scheduledDateTime,
        scheduleDate: scheduleQuiz ? scheduleDate.toISOString() : null,
        scheduleTime: scheduleQuiz ? scheduleTime : null,
        createdBy: userData?.teacher_id,
        createdByName: userData?.full_name || "Unknown Teacher",
        status: isDraft ? "draft" : "published",
        isDraft: isDraft,
        sectionId: selectedSection?.id,
        submitted: [],
        type: "quiz"
      };

      const result = await createQuiz(quizData);

      if (result?.success) {
        toast.success(result?.message || "Quiz saved successfully!");
        if (!isDraft) {
          resetForm();
          navigate(-1);
        }
      } else {
        toast.error(result?.message || "Failed to save quiz");
      }

    } catch (error) {
      console.error("Error in saveQuiz: ", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteQuiz = () => {
    if (window.confirm("Are you sure you want to clear this quiz?")) {
      resetForm();
      toast.success("Quiz cleared successfully!");
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
          <h1 style={styles.headerTitle}>Create Quiz</h1>
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
          <div style={styles.sectionSelect}>
            {selectedSection?.course?.name}
          </div>

          <div style={styles.sectionSelect}>
            Section {selectedSection?.section}
          </div>
        </div>

        <div style={styles.actionButtons}>
          <Button
            onClick={() => saveQuiz(true)}
            disabled={isLoading}
            style={styles.draftButton}
          >
            {isLoading ? "Saving..." : "Save to draft"}
          </Button>

          <Button onClick={deleteQuiz} style={styles.deleteButton}>
            <img
              src="/assets/trash1.png"
              alt="Clear"
              style={styles.deleteIcon}
            />
            Clear
          </Button>

          <Button
            onClick={() => saveQuiz(false)}
            disabled={isLoading || !selectedSection}
            style={styles.publishButton}
          >
            {isLoading ? "Publishing..." : "Publish"}
          </Button>
        </div>
      </header>

      {/* Quiz Title */}
      <Form.Group className="mb-3">
        <Form.Label style={styles.label}>Quiz Title</Form.Label>
        <Form.Control
          type="text"
          value={quizTitle}
          onChange={(e) => setQuizTitle(e.target.value)}
          placeholder="Enter quiz title"
          style={styles.titleInput}
        />
      </Form.Group>

      <div style={styles.divider}></div>

      {/* Quiz Marks */}
      <Form.Group className="mb-3">
        <Form.Label style={styles.label}>Quiz Total Marks</Form.Label>
        <Form.Control
          type="number"
          value={quizMarks}
          onChange={(e) => setQuizMarks(e.target.value)}
          placeholder="Enter Quiz total marks"
          style={styles.titleInput}
        />
      </Form.Group>

      <div style={styles.divider}></div>

      {/* Description Section */}
      <Form.Group className="mb-4">
        <Form.Label style={styles.descriptionLabel}>Description</Form.Label>
        <p style={styles.descriptionSubtitle}>
          Write quiz description here.
        </p>

        {/* Formatting Toolbar */}
        <div style={styles.toolbar}>
          <Form.Select
            value={currentFormat}
            onChange={handleFormatChange}
            style={styles.formatSelect}
          >
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
          <Button onClick={() => applyFormatting("link")} style={styles.formatButton}>
            <img src="/assets/editor2.png" alt="Link" style={styles.formatIcon} />
          </Button>
          <Button onClick={() => applyFormatting("bullet")} style={styles.formatButton}>
            <img src="/assets/editor3.png" alt="Bullet" style={styles.formatIcon} />
          </Button>
          <Button onClick={() => applyFormatting("number")} style={styles.formatButton}>
            <img src="/assets/editor3.png" alt="Number" style={styles.formatIcon} />
          </Button>
        </div>

        {/* Textarea */}
        <Form.Control
          as="textarea"
          ref={textareaRef}
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter quiz description..."
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
            Add attachments in quiz
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

      {/* Schedule Quiz */}
      <Form.Group className="mt-3">
        <Form.Check
          type="checkbox"
          label="Schedule this quiz"
          checked={scheduleQuiz}
          onChange={handleScheduleToggle}
          style={styles.checkbox}
        />

        {scheduleQuiz && (
          <div>
            <Form.Label style={styles.scheduleLabel}>
              Quiz publish date and time
            </Form.Label>
            <div style={styles.scheduleControls}>
              <Form.Control
                type="date"
                value={scheduleDate.toISOString().split("T")[0]}
                onChange={(e) => handleScheduleDateChange(new Date(e.target.value))}
                style={styles.scheduleDateInput}
                min={new Date().toISOString().split("T")[0]}
              />

              <div style={styles.timeContainer}>
                <img src="/assets/clock2.png" alt="Clock Icon" style={styles.clockIcon} />
                <Form.Control
                  as="select"
                  value={scheduleTime}
                  onChange={handleScheduleTimeChange}
                  style={styles.scheduleTimeSelect}
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
            </div>

            {/* Optional: Show selected schedule info */}
            <div style={styles.schedulePreview}>
              <small style={styles.schedulePreviewText}>
                This quiz will be published on {scheduleDate.toLocaleDateString()} at {scheduleTime}
              </small>
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
    width: "auto",
    display: "flex",
    gap: "10px",
  },
  sectionSelect: {
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: "400",
    padding: "10px",
    border: "1px solid #D1D5DB",
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
    backgroundColor: "#F9FAFB",
    gap: "8px"
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
    border: "1px solid #D1D5DB",
    padding: "6px 8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "32px",
    height: "32px"
  },
  formatIcon: {
    width: "16px",
    height: "16px"
  },
  textarea: {
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "400",
    padding: "10px",
    border: "1px solid #D0D5DD",
    width: "50%",
    fontFamily: "inherit",
    lineHeight: "1.5",
    resize: "vertical"
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
  scheduleDateInput: {
    borderRadius: "8px",
    fontSize: "14px",
    padding: "10px",
    fontWeight: "500",
    color: "#111827",
    border: "1px solid #E5E7EB",
    width: "200px"
  },
  scheduleTimeSelect: {
    border: "1px solid #D0D5DD",
    borderRadius: "8px",
    padding: "10px 30px 10px 40px",
    fontSize: "14px",
    width: "180px",
    appearance: "none",
    background: "none"
  },
  schedulePreview: {
    marginTop: "10px",
    padding: "8px",
    backgroundColor: "#F3F4F6",
    borderRadius: "6px",
    border: "1px solid #E5E7EB",
  },
  schedulePreviewText: {
    color: "#6B7280",
    fontSize: "12px",
    fontStyle: "italic",
  }
};

export default TeacherCreateQuizzes;