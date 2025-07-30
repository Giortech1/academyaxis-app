import React, { useContext, useState, useEffect } from "react";
import { Container, Table, Image, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from "./UserContext";

function EnrollementCourse() {
  const { userData, sections } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const courseId = location.state?.courseId;

  useEffect(() => {
    if (sections && courseId) {
      const foundCourse = sections.find(section => section.id === courseId);
      if (foundCourse) {
        setCourse(foundCourse);
      }
      setLoading(false);
    }
  }, [sections, courseId]);

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const today = new Date();

  const [startOfWeek, setStartOfWeek] = useState(() => {
    const today = new Date();
    const dayIndex = today.getDay() === 0 ? 6 : today.getDay() - 1;
    const start = new Date(today);
    start.setDate(today.getDate() - dayIndex);
    return start;
  });

  const navigateWeek = (direction) => {
    setStartOfWeek((prev) => {
      const newStartOfWeek = new Date(prev.getTime());
      newStartOfWeek.setDate(newStartOfWeek.getDate() + direction * 7);
      return newStartOfWeek;
    });
  };

  const dayIndex = today.getDay() === 0 ? 6 : today.getDay() - 1;
  const currentWeekStart = new Date(startOfWeek.getTime());
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(currentWeekStart.getTime());
    date.setDate(currentWeekStart.getDate() + i);
    return date;
  });

  const hours = Array.from({ length: 24 }, (_, i) => {
    const hour = i % 12 || 12;
    const period = i < 12 ? "am" : "pm";
    return `${hour}:00 ${period}`;
  });

  const getDayName = (date) => {
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return dayNames[date.getDay()].toLowerCase();
  };

  const parseSchedule = (scheduleData) => {
    if (!scheduleData || !scheduleData.start_time || !scheduleData.end_time || !scheduleData.days) {
      return [];
    }

    const { start_time, end_time, days: scheduleDays } = scheduleData;
    const generatedEvents = [];

    scheduleDays.forEach((dayName, index) => {
      weekDates.forEach(weekDate => {
        if (getDayName(weekDate) === dayName.toLowerCase()) {
          const event = {
            id: course.id + "-" + dayName + "-" + index,
            date: weekDate,
            startTime: convertTo12Hour(start_time),
            endTime: convertTo12Hour(end_time),
            subject: course.course?.name || "Course",
            room: `Room ${course.room_no || "N/A"}`,
            teacher: course.teachers?.[0]?.full_name || "Instructor",
            color: "#E9E8FC",
          };
          generatedEvents.push(event);
        }
      });
    });

    return generatedEvents;
  };

  const convertTo12Hour = (time) => {
    const [hours, minutes] = time.split(':');
    const h = parseInt(hours);
    const m = minutes || "00";
    const hour12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
    const period = h >= 12 ? "pm" : "am";
    return `${hour12}:${m} ${period}`;
  };

  const calculateAttendancePercentage = (attendanceData) => {
    if (!attendanceData || attendanceData.length === 0) return "0%";

    const studentId = userData?.student_id || userData?.id;
    let totalClasses = 0;
    let presentClasses = 0;

    attendanceData.forEach(record => {
      if (record.students && Array.isArray(record.students)) {
        const studentRecord = record.students.find(student => student.studentId === studentId);
        if (studentRecord) {
          totalClasses++;
          if (studentRecord.status === 'Present') {
            presentClasses++;
          }
        }
      }
    });

    if (totalClasses === 0) return "0%";
    const percentage = Math.round((presentClasses / totalClasses) * 100);
    return `${percentage}%`;
  };

  const events = course?.schedule ? parseSchedule(course.schedule) : [];

  const renderEvent = (currentDate, time) => {
    return events.map((event) => {
      const eventDate = new Date(event.date);
      if (eventDate.toDateString() === currentDate.toDateString()) {
        const startIndex = hours.indexOf(event.startTime);
        const endIndex = hours.indexOf(event.endTime);
        const currentIndex = hours.indexOf(time);

        if (currentIndex === startIndex) {
          const duration = endIndex - startIndex;
          return (
            <Card
              key={event.id}
              className="p-2 text-dark shadow-sm event-card"
              style={{
                ...styles.eventCard,
                height: `${80 * duration - 8}px`
              }}
            >
              <div style={{ height: "100%" }}>
                <p className="d-flex align-items-center mb-1" style={styles.eventSubject}>
                  <img
                    src={"/assets/book1.png"}
                    alt="Event"
                    style={{
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      marginRight: "8px",
                    }}
                  />
                  {event.subject}
                </p>

                <p className="mb-1" style={styles.eventTime}>
                  {event.startTime} – {event.endTime}
                </p>

                <p className="mb-1" style={styles.eventRoom}>
                  {event.room}
                </p>

                <p className="d-flex align-items-center mb-1" style={styles.eventInstructor}>
                  <img
                    src={"/assets/Avatar3.png"}
                    alt={event.teacher}
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      marginRight: "4px",
                    }}
                  />
                  {event.teacher}
                </p>

                <p className="d-flex align-items-center mb-0" style={styles.eventInstructorLabel}>
                  <img
                    src={"/assets/teacher.png"}
                    alt="Teacher"
                    style={{
                      width: "10px",
                      height: "10px",
                      marginRight: "4px",
                    }}
                  />
                  Instructor
                </p>
              </div>
            </Card>
          );
        }
      }
      return null;
    });
  };

  // Loading state
  if (loading) {
    return (
      <Container fluid className="p-3">
        <div className="d-flex justify-content-center align-items-center" style={{ height: "200px" }}>
          <div>Loading course data...</div>
        </div>
      </Container>
    );
  }

  // Course not found
  if (!course) {
    return (
      <Container fluid className="p-3">
        <div className="d-flex justify-content-center align-items-center" style={{ height: "200px" }}>
          <div>Course not found</div>
        </div>
      </Container>
    );
  }

  return (
    <Container fluid className="p-3">
      <CalendarStyles />

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center">
          <Image
            src="/assets/arrow-left.png"
            alt="Back"
            width={20}
            height={20}
            className="me-2"
            onClick={() => navigate(-1)}
            style={{ cursor: 'pointer' }}
          />
          <h4 className="mb-0" style={styles.headerTitle}>My Courses</h4>
        </div>
        <div className="d-flex align-items-center">
          <img
            src={userData?.profile_pic || "/assets/avatar.jpeg"}
            alt="User"
            style={styles.userAvatar}
          />
          <div>
            <div style={styles.userName}>{userData?.full_name || "User Name"}</div>
            <div style={styles.userID}>{userData?.student_id || "User ID"}</div>
          </div>
        </div>
      </div>

      {/* Course Title */}
      <h5 style={styles.courseTitle}>{course.course?.name || "Course Name"}</h5>

      {/* Course Details Table */}
      <div className="table-responsive">
        <Table borderless className="align-middle">
          <thead style={styles.tableHeader}>
            <tr>
              <th>Subject Name</th>
              <th>Subject Code</th>
              <th>Instructor</th>
              <th>Schedule</th>
              <th>Credit Hours</th>
              <th>Attendance</th>
            </tr>
          </thead>
          <tbody style={styles.tableBody}>
            <tr className="border-top">
              <td>{course.course?.name || "—"}</td>
              <td>{course.course?.code || "—"}</td>
              <td>{course.teachers?.[0]?.full_name || "N/A"}</td>
              <td>
                {course.schedule?.days?.join("/") || "N/A"} {" "}
                {course.schedule?.start_time && course.schedule?.end_time
                  ? `${convertTo12Hour(course.schedule.start_time)}–${convertTo12Hour(course.schedule.end_time)}`
                  : ""
                }
              </td>
              <td>{course.course?.credit_hours || "—"}</td>
              <td>{calculateAttendancePercentage(course.attendance)}</td>
            </tr>
          </tbody>
        </Table>
      </div>

      {/* Calendar */}
      <div style={styles.calendarContainer}>
        {/* Header Section */}
        <div
          className="calendar-header"
          style={{ borderTopLeftRadius: "12px", borderTopRightRadius: "12px" }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center" style={styles.calendarHeaderTitle}>
              <h5 className="mb-0 fw-bold">
                {startOfWeek.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h5>
              <Button
                variant="none"
                className="ms-1 border-0"
                onClick={() => navigateWeek(-1)}
              >
                <img
                  src="/assets/left-arrow.png"
                  alt="Left Arrow"
                  style={{ width: "30px", height: "30px" }}
                />
              </Button>
              <Button
                variant="none"
                className="ms-0 border-0"
                onClick={() => navigateWeek(1)}
              >
                <img
                  src="/assets/right-arrow.png"
                  alt="Right Arrow"
                  style={{ width: "30px", height: "30px" }}
                />
              </Button>
            </div>
          </div>
          <div className="text-muted" style={styles.calendarTodayLabel}>
            Today
          </div>
          <div className="days-header">
            <div className="time-placeholder"></div>
            {weekDates.map((date, index) => {
              const isToday = today.toDateString() === date.toDateString();
              return (
                <div key={index} className="day-cell">
                  <p
                    className="date-number"
                    style={{
                      backgroundColor: isToday ? "#F9F5FF" : "#F2F4F7",
                      color: isToday ? "#7F56D9" : "#475467",
                    }}
                  >
                    {date.getDate()}
                  </p>
                  <p className="day-text">{days[index]}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Calendar Grid */}
        <div
          className="calendar-grid-wrapper"
          style={{ borderBottomLeftRadius: "12px", borderBottomRightRadius: "12px", fontSize: '18px', fontWeight: '500' }}
        >
          <div className="calendar-grid">
            {hours.map((hour, index) => (
              <React.Fragment key={index}>
                <div className="time-cell">{hour}</div>
                {weekDates.map((date) => (
                  <div key={`${date}-${hour}`} className="grid-cell">
                    {renderEvent(date, hour)}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}

const CalendarStyles = () => (
  <style jsx>{`
    .calendar-header {
      position: sticky;
      top: 0;
      z-index: 20;
      background-color: #fff;
      border-bottom: 1px solid #ddd;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
    }

    .days-header {
      display: grid;
      grid-template-columns: 120px repeat(7, 1fr);
      gap: 0;
      text-align: center;
    }

    .time-placeholder {
      width: 100%;
    }

    .day-cell {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .date-number {
      font-size: 14px;
      font-weight: bold;
      border-radius: 50%;
      padding: 8px;
      margin-bottom: 4px;
      width: 35px;
      height: 35px;
    }

    .day-text {
      font-size: 16px;
      font-weight: 500;
      color: #475467;
    }

    .calendar-grid-wrapper {
      overflow-x: auto;
      overflow-y: auto;
      max-height: calc(100vh - 150px);
    }

    .calendar-grid-wrapper::-webkit-scrollbar {
      display: none;
    }

    .calendar-grid-wrapper {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }

    .calendar-grid {
      display: grid;
      grid-template-columns: 120px repeat(7, 1fr);
      grid-auto-rows: 80px;
      background-color: #fff;
    }

    .time-cell {
      background-color: #FFFFFF;
      display: flex;
      justify-content: center;
      align-items: center;
      border-right: 1px solid #EAECF0;
      border-bottom: 1px solid #EAECF0;
      font-size: 18px;
      font-weight: 500;
      color: #475467;
    }

    .grid-cell {
      background-color: #fff;
      border: 0.5px solid #EAECF0;
      position: relative;
    }

    @media (max-width: 767px) {
      table {
        font-size: 13px;
      }
      th, td {
        padding: 10px 8px !important;
        white-space: nowrap;
      }
    }
  `}</style>
);

// Main component styles
const styles = {
  container: {
    padding: "12px"
  },
  headerTitle: {
    fontWeight: 600,
    marginBottom: 0
  },
  userAvatar: {
    borderRadius: '50%',
    width: '48px',
    height: '48px',
    marginRight: '10px'
  },
  userName: {
    fontWeight: '500',
    fontSize: '14px'
  },
  userID: {
    fontSize: '12px',
    color: '#6c757d'
  },
  courseTitle: {
    fontWeight: "600",
    marginBottom: "40px",
    color: '#101828'
  },
  tableHeader: {
    fontSize: "16px",
    fontWeight: "500",
    color: "#111827"
  },
  tableBody: {
    fontSize: "14px",
    fontWeight: '400',
    color: "#111827"
  },
  calendarContainer: {
    border: "1px solid #EAECF0",
    borderRadius: "12px",
    marginTop: '30px'
  },
  calendarHeaderTitle: {
    paddingLeft: "16px",
    paddingTop: "16px"
  },
  calendarTodayLabel: {
    paddingLeft: "16px",
    fontWeight: '500',
    color: '#475467'
  },
  eventCard: {
    backgroundColor: "#E9E8FC",
    borderRadius: "8px",
    position: "absolute",
    top: "4px",
    left: "4px",
    right: "4px",
    zIndex: 10,
    overflow: "hidden"
  },
  eventSubject: {
    fontSize: 12,
    fontWeight: "500",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden"
  },
  eventTime: {
    fontSize: 11,
    fontWeight: "400",
    color: "#6c757d",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    paddingBottom: "2px"
  },
  eventRoom: {
    fontSize: 11,
    fontWeight: "400",
    color: "#6c757d",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden"
  },
  eventInstructor: {
    fontSize: 12,
    fontWeight: "500",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  eventInstructorLabel: {
    fontSize: 11,
    fontWeight: '300',
    color: "#6c757d"
  }
};

export default EnrollementCourse;