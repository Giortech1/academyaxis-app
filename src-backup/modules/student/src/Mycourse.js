import React, { useContext, useState, useMemo } from "react";
import { Container, Table, Image, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router-dom';
import { UserContext } from "./UserContext";

function Mycourse() {
  const { userData, sections } = useContext(UserContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('inProgress');
  const [searchText, setSearchText] = useState('');

  const processedCourses = useMemo(() => {
    if (!sections || sections.length === 0) return { inProgress: [], completed: [], withdraw: [] };

    const inProgress = [];
    const completed = [];
    const withdraw = [];

    sections.forEach(section => {
      if (!section.course) return;

      const teacher = section.teachers && section.teachers.length > 0 ? section.teachers[0] : null;
      const scheduleText = section.schedule ?
        `${section.schedule.days?.join('/') || 'TBD'} ${section.schedule.start_time || ''}-${section.schedule.end_time || ''}` :
        'Schedule TBD';

      const courseData = {
        id: section.id,
        courseID: section.course.code || section.course.id || 'N/A',
        name: section.course.name || 'Unnamed Course',
        enrolled: section.createdAt ? new Date(section.createdAt).toLocaleDateString() : 'N/A',
        end: 'N/A',
        hours: section.course.credit_hours ? section.course.credit_hours * 15 : 45,
        status: section.status === 'in-progress' ? 'In Progress' :
          section.status === 'completed' ? 'Completed' :
            section.status === 'withdraw' ? 'Withdraw' : 'Unknown',
        instructor: teacher ? teacher.full_name || `${teacher.first_name || ''} ${teacher.last_name || ''}`.trim() : 'TBD',
        schedule: scheduleText,
        creditHours: section.course.credit_hours || 3,
        department: section.department?.name || 'Unknown Department',
        program: section.program?.name || 'Unknown Program',
        section: section.section || 'N/A',
        room: section.room_no || 'TBD',
        courseType: section.course.type || 'core',
        semester: section.course.semester || '1',
        assignments: section.assignments || [],
        quizzes: section.quizzes || [],
        attendance: section.attendance || [],
        attendance_percentage: section.attendance && section.attendance.length > 0 ?
          Math.round((section.attendance.filter(a => a.status === 'present').length / section.attendance.length) * 100) + '%' :
          'N/A'
      };

      if (section.status === 'in-progress') {
        inProgress.push(courseData);
      } else if (section.status === 'completed') {
        completed.push(courseData);
      } else if (section.status === 'withdraw') {
        withdraw.push(courseData);
      }
    });

    return { inProgress, completed, withdraw };
  }, [sections]);

  const filteredCourses = useMemo(() => {
    let courses = [];
    if (activeTab === 'inProgress') {
      courses = processedCourses.inProgress;
    } else if (activeTab === 'completed') {
      courses = processedCourses.completed;
    } else if (activeTab === 'withdraw') {
      courses = processedCourses.withdraw;
    }

    if (!searchText.trim()) return courses;

    return courses.filter(course =>
      course.name.toLowerCase().includes(searchText.toLowerCase()) ||
      course.courseID.toLowerCase().includes(searchText.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [processedCourses, activeTab, searchText]);

  const handleViewCourse = (courseId) => {
    if (activeTab === 'inProgress') {
      navigate('/InprogressCourse', { state: { courseId } });
    } else if (activeTab === 'completed' || activeTab === 'withdraw') {
      navigate('/PastCourse', { state: { courseId } });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Progress':
        return '#FDB022';
      case 'Completed':
        return '#10B981';
      case 'Withdraw':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const getCurrentMonth = () => {
    return new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <Container fluid className="p-3 d-flex" >
      <main className="flex-grow-1" id="mycoursescreen">
        {/* Header Section */}
        <header style={styles.header}>
          <div style={styles.headerLeft}>
            {/* Optional: Add back button if needed */}
          </div>
          <div style={styles.headerRight}>
            <img
              src={userData?.profile_pic || "/assets/avatar.jpeg"}
              alt="User"
              style={styles.userAvatar}
            />
            <div style={styles.userInfo}>
              <div style={styles.userName}>
                {userData?.full_name ||
                  (userData?.first_name && userData?.last_name ?
                    `${userData.first_name} ${userData.last_name}` :
                    "Student")}
              </div>
              <div style={styles.userId}>
                {userData?.student_id || userData?.id || "ID"}
              </div>
            </div>
          </div>
        </header>

        {/* Month Filter and Search */}
        <header style={styles.subHeader}>
          <div style={styles.monthFilter}>
            <Image
              src="/assets/calendar1.png"
              alt="Calendar Icon"
              width={20}
              height={20}
              className="me-2"
            />
            <span style={styles.monthText}>{getCurrentMonth()}</span>
          </div>

          <div style={styles.searchSortContainer}>
            <div style={styles.searchContainer}>
              <Form.Control
                type="text"
                placeholder="Search courses, instructors..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={styles.searchInput}
              />
              <Image
                src="/assets/search-lg1.png"
                alt="Search Icon"
                width={20}
                height={20}
                style={styles.searchIcon}
              />
            </div>

            <Button style={styles.sortButton}>
              <Image
                src="/assets/filter-lines1.png"
                alt="Sort Icon"
                width={16}
                height={16}
                className="me-2"
              />
              Sort
            </Button>
          </div>
        </header>

        {/* My Courses Section */}
        <Container fluid className="p-0" style={styles.coursesSection}>
          <h2 style={styles.coursesTitle}>My Courses</h2>

          <div style={styles.tabsContainer}>
            <div style={styles.tabsWrapper}>
              <Button
                onClick={() => setActiveTab('inProgress')}
                className="me-2"
                style={{
                  ...styles.tabButton,
                  backgroundColor: activeTab === 'inProgress' ? '#111827' : 'transparent',
                  color: activeTab === 'inProgress' ? '#F9FAFB' : '#374151',
                }}
              >
                In Progress ({processedCourses.inProgress.length})
              </Button>
              <Button
                onClick={() => setActiveTab('completed')}
                className="me-2"
                style={{
                  ...styles.tabButton,
                  backgroundColor: activeTab === 'completed' ? '#111827' : 'transparent',
                  color: activeTab === 'completed' ? '#F9FAFB' : '#374151',
                }}
              >
                Completed ({processedCourses.completed.length})
              </Button>
              <Button
                onClick={() => setActiveTab('withdraw')}
                style={{
                  ...styles.tabButton,
                  backgroundColor: activeTab === 'withdraw' ? '#111827' : 'transparent',
                  color: activeTab === 'withdraw' ? '#F9FAFB' : '#374151',
                }}
              >
                Withdraw ({processedCourses.withdraw.length})
              </Button>
            </div>

            {activeTab === 'inProgress' && processedCourses.inProgress.length > 0 && (
              <Button
                onClick={() => navigate('/Withdraw', { state: { courses: processedCourses.inProgress } })}
                style={styles.withdrawButton}
              >
                <img
                  src="/assets/withdrawicon.png"
                  alt="Withdraw Icon"
                  style={styles.withdrawIcon}
                />
                Withdraw
              </Button>
            )}
          </div>

          {/* Courses Table */}
          <div className="table-responsive">
            {filteredCourses.length === 0 ? (
              <div style={styles.noCourses}>
                <img
                  src="/assets/no-courses.png"
                  alt="No Courses"
                  style={styles.noCoursesIcon}
                />
                <h4 style={styles.noCoursesTitle}>
                  {searchText ? 'No courses found' : `No ${activeTab === 'inProgress' ? 'in progress' : activeTab} courses`}
                </h4>
                <p style={styles.noCoursesText}>
                  {searchText ?
                    'Try adjusting your search criteria' :
                    `You don't have any ${activeTab === 'inProgress' ? 'active' : activeTab} courses yet.`}
                </p>
              </div>
            ) : (
              <Table borderless className="align-middle mycourse-table" style={styles.table}>
                <thead style={styles.tableHeader}>
                  <tr>
                    <th>Course Name</th>
                    <th>Course ID</th>
                    <th>Instructor</th>
                    <th>Section</th>
                    <th>Credit Hours</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody style={styles.tableBody}>
                  {filteredCourses.map((course, index) => (
                    <tr key={course?.id || index} className="border-top border-bottom" style={styles.tableRow}>
                      <td style={styles.courseNameCell}>
                        <div>
                          <div style={styles.courseName}>{course?.name}</div>
                          <div style={styles.courseInfo}>
                            {course?.department} • {course?.program}
                          </div>
                        </div>
                      </td>
                      <td style={styles.tableCell}>{course?.courseID}</td>
                      <td style={styles.tableCell}>{course?.instructor}</td>
                      <td style={styles.tableCell}>{course?.section}</td>
                      <td style={styles.tableCell}>{course?.creditHours}</td>
                      <td>
                        <span style={styles.statusContainer}>
                          <span
                            style={{
                              ...styles.statusDot,
                              backgroundColor: getStatusColor(course?.status)
                            }}
                          ></span>
                          {course?.status}
                        </span>
                      </td>
                      <td>
                        <Button
                          onClick={() => handleViewCourse(course?.id)}
                          style={styles.viewButton}
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </div>
        </Container>
      </main>

      <MyCourseStyles />
    </Container>
  );
}

// Separated Styles Component
const MyCourseStyles = () => (
  <style jsx>{`
    @media (max-width: 767px) {
      .mycourse-tabs {
        flex-direction: row !important;
        align-items: flex-start !important;
        gap: 12px;
      }

      .table-responsive {
        margin-top: 10px;
      }

      .mycourse-table {
        margin-top: 10px;
      }

      .mycourse-table th,
      .mycourse-table td {
        font-size: 13px !important;
        padding: 12px 10px !important;
      }

      .mycourse-table tr {
        margin-bottom: 12px;
        border-bottom: 1px solid #f0f0f0;
      }

      .mycourse-table .status-dot {
        width: 6px !important;
        height: 6px !important;
      }

      .mycourse-table .view-btn {
        width: 100% !important;
        font-size: 13px;
        padding: 6px;
      }

      .header {
        flex-direction: column !important;
        align-items: flex-start !important;
        gap: 12px;
      }

      .sub-header {
        flex-direction: column !important;
        align-items: flex-start !important;
        gap: 12px;
      }

      .search-sort-container {
        flex-direction: column !important;
        width: 100% !important;
        gap: 8px;
      }

      .search-input {
        width: 100% !important;
      }

      .tabs-container {
        flex-direction: column !important;
        align-items: flex-start !important;
        gap: 12px;
      }

      .tabs-wrapper {
        flex-wrap: wrap !important;
        gap: 8px;
      }

      .withdraw-button {
        width: 100% !important;
        max-width: 200px;
      }

      .courses-title {
        font-size: 18px !important;
      }

      .no-courses {
        padding: 24px !important;
      }

      .no-courses-icon {
        width: 48px !important;
        height: 48px !important;
      }

      .no-courses-title {
        font-size: 16px !important;
      }

      .no-courses-text {
        font-size: 14px !important;
      }
    }

    @media (max-width: 576px) {
      .user-avatar {
        width: 48px !important;
        height: 48px !important;
      }

      .user-name {
        font-size: 13px !important;
      }

      .user-id {
        font-size: 11px !important;
      }

      .month-text {
        font-size: 13px !important;
      }

      .search-input {
        font-size: 14px !important;
      }

      .tab-button {
        font-size: 13px !important;
        padding: 6px 12px !important;
      }

      .table th,
      .table td {
        font-size: 12px !important;
        padding: 8px 6px !important;
      }

      .view-button {
        width: 70px !important;
        font-size: 12px !important;
        padding: 6px 8px !important;
      }

      .tabs-wrapper {
        gap: 6px !important;
      }
    }
  `}</style>
);

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px"
  },
  headerLeft: {
    display: "flex",
    alignItems: "center"
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center'
  },
  userAvatar: {
    borderRadius: '50%',
    width: '54px',
    height: '54px',
    marginRight: '10px',
  },
  userInfo: {
    marginRight: '10px'
  },
  userName: {
    fontWeight: '500',
    fontSize: '14px'
  },
  userId: {
    fontSize: '12px',
    color: '#6c757d'
  },
  subHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "16px"
  },
  monthFilter: {
    display: "flex",
    alignItems: "center",
    border: '1px solid #D1D5DB',
    borderRadius: '8px',
    height: '35px',
    padding: '10px'
  },
  monthText: {
    fontSize: "14px",
    fontWeight: "600"
  },
  searchSortContainer: {
    display: "flex"
  },
  searchContainer: {
    position: "relative",
    marginRight: "12px",
    flexGrow: 1
  },
  searchInput: {
    borderRadius: "8px",
    paddingLeft: "40px",
    fontSize: '16px',
    fontWeight: '400',
    color: '#98A2B3',
    borderColor: '#D1D5DB',
    width: '300px'
  },
  searchIcon: {
    position: "absolute",
    top: "50%",
    left: "12px",
    transform: "translateY(-50%)"
  },
  sortButton: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "transparent",
    color: "#374151",
    border: "1px solid #D1D5DB",
    borderRadius: "8px",
    fontSize: '14px',
    fontWeight: '600'
  },
  coursesSection: {
    marginTop: '20px'
  },
  coursesTitle: {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '25px',
    color: '#101828'
  },
  tabsContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
    flexWrap: "wrap"
  },
  tabsWrapper: {
    display: "flex",
    gap: "8px"
  },
  tabButton: {
    fontSize: '14px',
    fontWeight: '600',
    padding: '8px 14px',
    border: '1px solid #D1D5DB',
    borderRadius: '8px'
  },
  withdrawButton: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 14px',
    flexDirection: 'row',
    gap: '8px',
    borderRadius: '8px',
    background: '#9747FF',
    color: '#FFF',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: 600,
    border: 'none'
  },
  withdrawIcon: {
    width: '20px',
    height: '20px'
  },
  table: {
    marginTop: "16px"
  },
  tableHeader: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#111827',
    height: '60px'
  },
  tableBody: {
    fontSize: '14px'
  },
  tableRow: {
    borderTop: "1px solid #E5E7EB",
    borderBottom: "1px solid #E5E7EB"
  },
  courseNameCell: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#101828',
    lineHeight: '20px'
  },
  courseName: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#101828',
    marginBottom: '4px'
  },
  courseInfo: {
    fontSize: '12px',
    fontWeight: '400',
    color: '#6B7280'
  },
  tableCell: {
    fontSize: '14px',
    fontWeight: '400',
    color: '#4B5563'
  },
  statusContainer: {
    display: "flex",
    alignItems: "center",
    fontSize: '12px',
    fontWeight: '500',
    color: '#1C222E'
  },
  statusDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    marginRight: '8px'
  },
  viewButton: {
    display: 'flex',
    width: '90px',
    height: '36px',
    padding: '10px',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    borderRadius: '100px',
    background: '#9747FF',
    color: '#FFF',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 'normal',
    border: 'none'
  },
  noCourses: {
    textAlign: 'center',
    padding: '40px',
    color: '#6B7280'
  },
  noCoursesIcon: {
    width: '64px',
    height: '64px',
    opacity: 0.5,
    marginBottom: '16px'
  },
  noCoursesTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#111827',
    marginBottom: '8px'
  },
  noCoursesText: {
    fontSize: '14px',
    color: '#6B7280'
  }
};

export default Mycourse;