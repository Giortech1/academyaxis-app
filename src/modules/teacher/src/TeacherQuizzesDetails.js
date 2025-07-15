import React, { useContext, useEffect, useState } from "react";
import { Table, Button, Image, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "./UserContext";

const TeacherQuizzesDetails = () => {
  const { quizId, sectionId } = useParams();
  const { userData, sections, fetchQuizzes, updateQuizMarks } = useContext(UserContext);
  const [sectionData, setSectionData] = useState(null);
  const [quizData, setQuizData] = useState(null);
  const [activeButton, setActiveButton] = useState('Overall');
  const [searchTerm, setSearchTerm] = useState('');
  const [marks, setMarks] = useState({});
  const navigate = useNavigate();

  const spinnerKeyframes = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;

  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = spinnerKeyframes;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    if (!sectionId || !quizId || sections?.length === 0) return;

    const getQuizzesData = async () => {
      try {
        const response = await fetchQuizzes(sectionId);

        if (response?.success) {
          const matchedSection = sections.find(section => section?.id === sectionId);
          setSectionData(matchedSection);

          const matchedQuiz = response?.data.find(quiz => quiz?.id === quizId);
          setQuizData(matchedQuiz);

          if (matchedQuiz?.marks) {
            setMarks(matchedQuiz.marks);
          }

          console.log('Section: ', matchedSection);
          console.log('Quiz: ', matchedQuiz);
        }
      } catch (error) {
        console.log('Error fetching quizzes: ', error);
      }
    };

    getQuizzesData();
  }, [sectionId, quizId, sections]);

  const handleClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const buttonStyle = (buttonName) => ({
    border: '1px solid #D1D5DB',
    cursor: 'pointer',
    borderRadius: '8px',
    height: '35px',
    padding: '10px',
    marginLeft: buttonName !== 'Overall' ? '12px' : '0',
    backgroundColor: activeButton === buttonName ? 'black' : 'transparent',
    color: activeButton === buttonName ? 'white' : '#475467',
  });

  const renderSubmissionStatus = (student, quiz) => {
    const isSubmitted = quiz?.submitted?.includes(student.id);
    const currentDate = new Date();
    const endDate = new Date(quiz?.endDate);
    const isLate = currentDate > endDate && !isSubmitted;

    if (isSubmitted) {
      return quiz?.endDate ? new Date(quiz.endDate).toLocaleDateString() : "Submitted";
    } else if (isLate) {
      return "Late";
    } else {
      return "Not Submitted";
    }
  };

  const renderQuizCell = (student, quiz) => {
    const isSubmitted = quiz?.submitted?.includes(student.id);

    if (!isSubmitted) {
      return (
        <div style={styles.notSubmittedBadge}>
          <div style={styles.notSubmittedDot}></div>
          <span style={styles.notSubmittedText}>Not Submitted</span>
        </div>
      );
    } else {
      return (
        <div style={styles.submittedContainer}>
          <img
            src="/assets/file-06.png"
            alt="Quiz Avatar"
            style={styles.quizAvatar}
          />
          <div style={styles.quizTitle}>
            {quiz?.title || "Quiz"}
            <div style={styles.quizType}>Quiz file</div>
          </div>
        </div>
      );
    }
  };

  const getFilteredStudents = () => {
    if (!sectionData?.students || !quizData) return [];

    let filteredStudents = sectionData.students;

    if (searchTerm) {
      filteredStudents = filteredStudents.filter(student =>
        student.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.student_id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (activeButton === 'Submitted') {
      filteredStudents = filteredStudents.filter(student =>
        quizData.submitted?.includes(student.id)
      );
    } else if (activeButton === 'Late Submission') {
      const currentDate = new Date();
      const endDate = new Date(quizData.endDate);
      filteredStudents = filteredStudents.filter(student =>
        !quizData.submitted?.includes(student.id) && currentDate > endDate
      );
    }

    return filteredStudents;
  };

  const handleMarksChange = (studentId, value) => {
    setMarks(prev => ({
      ...prev,
      [studentId]: value
    }));
  };

  const handleSaveMarks = async () => {
    try {
      const result = await updateQuizMarks(quizId, marks);
      if (result?.success) {
        alert('Marks saved successfully!');
      } else {
        alert('Failed to save marks');
      }
    } catch (error) {
      console.error('Error saving marks:', error);
      alert('Error saving marks');
    }
  };

  const handleEdit = (studentId) => {
    document.getElementById(`marks-${studentId}`)?.focus();
  };

  const handleDelete = (studentId) => {
    if (window.confirm('Are you sure you want to delete this student\'s marks?')) {
      setMarks(prev => {
        const newMarks = { ...prev };
        delete newMarks[studentId];
        return newMarks;
      });
    }
  };

  const LoadingScreen = () => (
    <div style={styles.loadingContainer}>
      <div style={styles.loadingContent}>
        <div style={styles.loadingSpinner}>
          <div style={styles.spinner}></div>
        </div>
        <h3 style={styles.loadingTitle}>Loading Quiz Details</h3>
        <p style={styles.loadingText}>Please wait...</p>
      </div>
    </div>
  );

  if (!sectionData || !quizData) {
    return <LoadingScreen />;
  }

  const filteredStudents = getFilteredStudents();

  return (
    <div style={styles.container}>
      <header className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center">
          <Image
            src="/assets/arrow-left.png"
            roundedCircle
            width={24}
            height={24}
            className="me-2"
            alt="Back Arrow"
            style={styles.backArrow}
            onClick={() => navigate(-1)}
          />
          <h1 className="m-0" style={styles.headerTitle}>
            {quizData.title}
          </h1>
        </div>

        <div className="d-flex align-items-center">
          <img
            src={userData?.profile_pic || "/assets/avatar.jpeg"}
            alt="User"
            className="rounded-circle me-2"
            style={styles.userAvatar}
          />
          <div className="me-0">
            <div style={styles.userName}>{userData?.full_name || "Teacher"}</div>
            <div style={styles.userRoll}>{userData?.teacher_id || "ID"}</div>
          </div>
          <button className="bg-transparent border-0">
            <img
              src="/assets/arrow-down.png"
              alt="Dropdown"
              style={styles.dropdownArrow}
            />
          </button>
        </div>
      </header>

      <header className="d-flex justify-content-between align-items-center mb-4">
        <div style={{ display: 'flex' }}>
          <div className="d-flex">
            {['Overall', 'Submitted', 'Late Submission'].map((button) => (
              <div
                key={button}
                className="d-flex align-items-center"
                style={buttonStyle(button)}
                onClick={() => handleClick(button)}
              >
                <span style={{ fontSize: '14px', fontWeight: '500' }}>{button}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="d-flex align-items-center">
          <div className="position-relative me-3" style={{ flexGrow: 1 }}>
            <Form.Control
              type="text"
              placeholder="Search by name or ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
            />
            <Image
              src="/assets/search-lg.png"
              alt="Search Icon"
              width={20}
              height={20}
              style={styles.searchIcon}
            />
          </div>

          <Button
            className="d-flex align-items-center me-3"
            style={styles.sortButton}
          >
            <Image
              src="/assets/filter-lines.png"
              alt="Sort Icon"
              width={16}
              height={16}
              className="me-2"
            />
            Sort
          </Button>

          <Button
            className="d-flex align-items-center"
            style={styles.saveButton}
            onClick={handleSaveMarks}
          >
            Save
          </Button>
        </div>
      </header>

      <div style={{ backgroundColor: "#FFFFFF", borderRadius: "8px" }}>
        <Table hover style={styles.table}>
          <thead>
            <tr style={styles.thead}>
              <th>Students</th>
              <th>Student ID</th>
              <th>Submission Status</th>
              <th>Deadline</th>
              <th>Quiz</th>
              <th>Total Marks</th>
              <th>Obtained Marks</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => {
              const isSubmitted = quizData.submitted?.includes(student.id);
              const currentDate = new Date();
              const endDate = new Date(quizData.endDate);
              const isLate = currentDate > endDate && !isSubmitted;

              return (
                <tr key={student.id} style={styles.tableRow}>
                  <td style={styles.studentCell}>
                    <img
                      src={student.profile_pic || "/assets/Avatar3.png"}
                      alt="Avatar"
                      style={styles.studentAvatar}
                    />
                    {student.full_name}
                  </td>
                  <td style={styles.normalText}>{student.student_id}</td>
                  <td style={styles.normalText}>
                    {renderSubmissionStatus(student, quizData)}
                  </td>
                  <td style={styles.normalText}>
                    {new Date(quizData.endDate).toLocaleDateString()}
                  </td>
                  <td>
                    {renderQuizCell(student, quizData)}
                  </td>
                  <td style={styles.normalText}>
                    {quizData.totalMarks || 25}
                  </td>
                  <td style={styles.normalText}>
                    {isSubmitted ? (
                      <input
                        id={`marks-${student.id}`}
                        type="number"
                        value={marks[student.id] || 0}
                        onChange={(e) => handleMarksChange(student.id, e.target.value)}
                        style={{
                          width: '60px',
                          padding: '4px',
                          border: '1px solid #D1D5DB',
                          borderRadius: '4px',
                          textAlign: 'center'
                        }}
                        min="0"
                        max={quizData.totalMarks || 25}
                      />
                    ) : (
                      <span style={styles.normalText}>-</span>
                    )}
                  </td>
                  <td>
                    <div style={{ alignItems: "center", justifyContent: "center" }}>
                      <div className="d-flex align-items-center">
                        {/* Edit Button */}
                        <div
                          style={{
                            ...styles.actionButton,
                            marginRight: '5px',
                            cursor: isSubmitted ? "pointer" : "not-allowed",
                            opacity: isSubmitted ? 1 : 0.5
                          }}
                          onClick={() => isSubmitted && handleEdit(student.id)}
                        >
                          <img
                            src="/assets/edit-2.png"
                            alt="Edit"
                            style={styles.actionIcon}
                          />
                        </div>

                        {/* Delete Button */}
                        <div
                          style={{
                            ...styles.actionButton,
                            cursor: isSubmitted ? "pointer" : "not-allowed",
                            opacity: isSubmitted ? 1 : 0.5
                          }}
                          onClick={() => isSubmitted && handleDelete(student.id)}
                        >
                          <img
                            src="/assets/trash.png"
                            alt="Delete"
                            style={styles.actionIcon}
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>

      {filteredStudents.length === 0 && (
        <div style={{ textAlign: 'center', padding: '20px', color: '#6c757d' }}>
          No students found matching your criteria.
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Inter, sans-serif"
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f8f9fa',
    fontFamily: "Inter, sans-serif"
  },
  loadingContent: {
    textAlign: 'center',
    padding: '40px',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    width: '100%'
  },
  loadingSpinner: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px'
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '3px solid #f3f4f6',
    borderTop: '3px solid #3b82f6',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  loadingTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#111827',
    marginBottom: '8px',
    margin: '0 0 8px 0'
  },
  loadingText: {
    fontSize: '14px',
    color: '#6b7280',
    margin: '0'
  },
  backArrow: {
    cursor: "pointer"
  },
  headerTitle: {
    fontSize: "24px",
    fontWeight: "600"
  },
  userAvatar: {
    width: "54px",
    height: "54px"
  },
  userName: {
    fontWeight: "500",
    fontSize: "14px"
  },
  userRoll: {
    fontSize: "12px",
    color: "#6c757d"
  },
  dropdownArrow: {
    width: "12px",
    height: "12px",
    verticalAlign: 'top'
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
    backgroundColor: "transparent",
    color: "#374151",
    border: "none",
    borderRadius: "8px",
    border: '1px solid #D1D5DB',
    fontSize: '14px',
    fontWeight: '500'
  },
  saveButton: {
    backgroundColor: "#101828",
    color: "white",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    padding: "8px 16px",
    border: "none",
    width: '80px',
    justifyContent: 'center'
  },
  table: {
    borderCollapse: "collapse",
    width: "100%",
    textAlign: "left"
  },
  thead: {
    backgroundColor: "#F9FAFB",
    fontSize: "16px",
    fontWeight: "500"
  },
  tableRow: {
    borderBottom: "1px solid #E5E7EB",
    lineHeight: "60px",
    verticalAlign: "middle"
  },
  studentCell: {
    alignItems: "center",
    gap: "10px",
    fontSize: '12px',
    fontWeight: '500',
    color: '#101828'
  },
  studentAvatar: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    marginRight: '10px',
    border: "2px solid white"
  },
  normalText: {
    fontSize: '14px',
    fontWeight: '400',
    color: '#4B5563'
  },
  marksText: {
    fontSize: '14px',
    fontWeight: '400',
    color: '#4B5563',
    textDecoration: 'underline'
  },
  notSubmittedBadge: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    backgroundColor: '#FEF2F2',
    borderRadius: '12px',
    height: '36px',
    width: '140px',
    padding: '5px'
  },
  notSubmittedDot: {
    width: "4px",
    height: "4px",
    borderRadius: "50%",
    backgroundColor: "#DC2626"
  },
  notSubmittedText: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#EF4444"
  },
  submittedContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    position: "relative"
  },
  quizAvatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: '#F4EBFF',
    padding: '10px'
  },
  quizTitle: {
    fontSize: "14px",
    fontWeight: "500",
    display: "block",
    color: '#101828',
    marginTop: '-18px'
  },
  quizType: {
    fontSize: "12px",
    color: "#475467",
    position: "absolute",
    bottom: "-20px",
    fontWeight: '400'
  },
  actionButton: {
    border: '1px solid #EAECF0',
    borderRadius: '50%',
    height: '32px',
    width: '32px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  actionIcon: {
    width: "20px",
    height: "20px"
  }
};

export default TeacherQuizzesDetails;