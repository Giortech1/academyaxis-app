import React, { useState, useEffect, useContext } from "react";
import { Container, Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserContext } from "./UserContext";

function Quizzes() {
  const { userData, sections } = useContext(UserContext);
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("Upcoming");
  const [tableData, setTableData] = useState([]);

  const convertSectionsToQuizzes = () => {
    if (!sections || sections.length === 0) {
      return [];
    }

    const allQuizzes = [];
    const today = new Date();

    sections.forEach(section => {
      if (section.quizzes && section.quizzes.length > 0) {
        section.quizzes.forEach(quiz => {
          const teacher = section.teachers && section.teachers.length > 0 ? section.teachers[0] : null;

          if (teacher) {
            const dueDate = new Date(quiz.endDate);
            const scheduledDate = new Date(quiz?.scheduleDateTime)
            const isSubmitted = Array.isArray(quiz.submitted) &&
              quiz.submitted.some(sub => sub.studentId === userData?.student_id);

            const submittedData = Array.isArray(quiz.submitted)
              ? quiz.submitted.find(sub => sub.studentId === userData?.student_id)
              : null;

            const isOverdue = !isSubmitted && dueDate < today;
            const isUpcoming = !isSubmitted && dueDate >= today;
            const isScheduled = quiz?.isScheduled && scheduledDate > today;

            if (isScheduled) return;

            const quizData = {
              id: quiz.id,
              name: quiz.title,
              teacher: teacher.full_name || `${teacher.first_name} ${teacher.last_name}`,
              dueDate: quiz.endDate,
              subject: section.course?.name || "Unknown Subject",
              status: isSubmitted ? "Submitted" : "Not Submitted",
              category: isSubmitted ? "Submitted" : isOverdue ? "Overdue" : "Upcoming",
              description: quiz.description,
              attachmentLink: quiz.attachmentLink,
              sectionId: section.id,
              teacherId: teacher.teacher_id,
              teacherEmail: teacher.email,
              teacherProfile: teacher.profile_pic,
              department: section.department?.name,
              section: section.section,
              startDate: quiz.startDate,
              createdBy: quiz.createdBy,
              createdByName: quiz.createdByName,
              isDraft: quiz.isDraft,
              isScheduled: quiz.isScheduled,
              submittedData: submittedData,
              totalMarks: quiz.totalMarks,
              type: quiz.type || "quiz",
            };

            allQuizzes.push(quizData);
          }
        });
      }
    });

    return allQuizzes;
  };

  useEffect(() => {
    const quizzes = convertSectionsToQuizzes();
    setTableData(quizzes);
  }, [sections, userData]);

  const handleViewClick = (quiz) => {
    navigate(`/quizzes/details/${quiz.id}`, {
      state: {
        quiz,
        sectionId: quiz.sectionId
      }
    });
  };

  const getStatusColor = (status) => {
    return status === "Submitted" ? "#12B76A" : "#D92D20";
  };

  const filteredRows = tableData.filter((row) => row.category === activeFilter);

  const getCategoryCount = (category) => {
    return tableData.filter(row => row.category === category).length;
  };

  return (
    <Container fluid style={styles.container}>
      {/* Header Section */}
      <header style={styles.header}>
        <div className="d-flex align-items-center">
          <img
            src={userData?.profile_pic || "/assets/avatar.jpeg"}
            alt="User"
            className="rounded-circle me-2"
            style={styles.userAvatar}
          />
          <div className="me-2">
            <div style={styles.userName}>
              {userData?.full_name ||
                (userData?.first_name && userData?.last_name
                  ? `${userData.first_name} ${userData.last_name}`
                  : "Student")}
            </div>
            <div style={styles.userId}>
              {userData?.student_id || userData?.id || "ID"}
            </div>
          </div>
        </div>
      </header>

      {/* Quiz Table Section */}
      <div className="px-0">
        <div style={styles.quizTable}>
          <div style={styles.tableHeader}>
            <h4 style={styles.tableTitle}>
              Quizzes
            </h4>
            <Button
              variant="outline-secondary"
              className="d-flex align-items-center"
              style={styles.sortButton}
            >
              <img
                src="/assets/filter-lines.png"
                alt="Sort"
                className="me-2"
                style={styles.sortIcon}
              />
              Sort
            </Button>
          </div>

          {/* Filter Buttons */}
          <div style={styles.filterButtons}>
            {["Upcoming", "Overdue", "Submitted"].map((label) => (
              <Button
                key={label}
                style={
                  activeFilter === label
                    ? { ...styles.filterButton, ...styles.activeFilterButton }
                    : styles.filterButton
                }
                onClick={() => setActiveFilter(label)}
              >
                {label} ({getCategoryCount(label)})
              </Button>
            ))}
          </div>

          {/* Table */}
          <div style={styles.tableContainer}>
            {tableData.length === 0 ? (
              <div style={styles.noQuizzes}>
                <img
                  src="/assets/no-assignments.png"
                  alt="No Quizzes"
                  style={{ width: "64px", height: "64px", opacity: 0.5, marginBottom: "16px" }}
                />
                <p>No quizzes available</p>
              </div>
            ) : filteredRows.length === 0 ? (
              <div style={styles.noQuizzes}>
                <p>No {activeFilter.toLowerCase()} quizzes found</p>
              </div>
            ) : (
              <Table
                hover
                responsive
                className="mb-0"
                style={styles.table}
              >
                <thead style={styles.tableHead}>
                  <tr>
                    <th style={styles.tableHead}>Sr No.</th>
                    <th style={styles.tableHead}>Name</th>
                    <th style={styles.tableHead}>Teacher</th>
                    <th style={styles.tableHead}>Due Date</th>
                    <th style={styles.tableHead}>Subject</th>
                    <th style={styles.tableHead}>Status</th>
                    <th style={styles.tableHead}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRows.map((row, index) => (
                    <tr key={row.id} style={styles.tableRow}>
                      <td style={styles.cellText}>
                        {index + 1}
                      </td>
                      <td style={styles.cellText}>
                        {row.name}
                      </td>
                      <td style={styles.cellText}>
                        {row.teacher}
                      </td>
                      <td style={styles.cellText}>
                        {new Date(row.dueDate).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td style={styles.cellText}>
                        {row.subject}
                      </td>
                      <td style={styles.statusCell}>
                        <span
                          style={{
                            ...styles.statusDot,
                            backgroundColor: getStatusColor(row.status)
                          }}
                        ></span>
                        {row.status}
                      </td>
                      <td style={{ verticalAlign: "middle" }}>
                        <Button
                          onClick={() => handleViewClick(row)}
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
        </div>
      </div>

      <QuizStyles />
    </Container>
  );
}

// Separated Styles Component
const QuizStyles = () => (
  <style>
    {`
      @media (max-width: 767px) {
        /* Header spacing and alignment */
        header {
          flex-direction: column !important;
          align-items: flex-start !important;
          gap: 12px;
        }

        /* Container padding */
        .container-fluid {
          padding-left: 12px !important;
          padding-right: 12px !important;
        }

        /* Quiz table padding */
        .quiz-table {
          padding: 8px !important;
        }

        /* Table header */
        .table-header {
          flex-direction: column !important;
          align-items: flex-start !important;
          gap: 12px;
        }

        .table-header h4 {
          font-size: 18px !important;
        }

        /* Filter button stack */
        .filter-buttons {
          flex-direction: column !important;
          gap: 8px !important;
        }

        .filter-buttons .btn {
          width: 100% !important;
          justify-content: center !important;
        }

        /* Table container scrolling */
        .table-responsive {
          overflow-x: auto;
        }

        table thead {
          font-size: 13px !important;
        }

        table tbody {
          font-size: 13px !important;
        }

        .table th,
        .table td {
          padding: 10px 8px !important;
          white-space: nowrap;
          text-align: left;
          vertical-align: middle !important;
          font-size: 12px !important;
        }

        /* Button scaling */
        .btn {
          font-size: 12px !important;
          padding: 8px 12px !important;
        }

        /* Adjust View button width */
        .view-button {
          width: 70px !important;
          padding: 6px 12px !important;
          font-size: 12px !important;
        }

        /* Header user info */
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

        /* Sort button adjustments */
        .btn-outline-secondary {
          font-size: 12px !important;
          padding: 6px 12px !important;
        }

        .sort-icon {
          width: 16px !important;
          height: 16px !important;
        }

        /* No quizzes message */
        .no-quizzes {
          padding: 24px !important;
          font-size: 14px !important;
        }

        .no-quizzes img {
          width: 48px !important;
          height: 48px !important;
          margin-bottom: 12px !important;
        }

        /* Status dot */
        .status-dot {
          width: 6px !important;
          height: 6px !important;
          margin-right: 6px !important;
        }

        /* Table scrolling improvements */
        .table-container {
          max-height: none !important;
          overflow-x: auto !important;
        }

        /* Sticky header adjustments */
        .table thead th {
          position: sticky !important;
          top: 0 !important;
          background: #FFFFFF !important;
          z-index: 10 !important;
          font-size: 12px !important;
          padding: 8px 6px !important;
        }

        /* Table row height */
        .table-row {
          height: 56px !important;
        }

        /* Quiz table min height */
        .quiz-table {
          min-height: 600px !important;
        }
      }

      /* Tablet styles */
      @media (max-width: 992px) and (min-width: 768px) {
        .container-fluid {
          padding-left: 16px !important;
          padding-right: 16px !important;
        }

        .table th,
        .table td {
          padding: 12px 10px !important;
          font-size: 14px !important;
        }

        .filter-buttons {
          flex-wrap: wrap !important;
          gap: 8px !important;
        }

        .view-button {
          width: 80px !important;
          font-size: 13px !important;
        }
      }

      /* Custom scrollbar for table */
      .table-container::-webkit-scrollbar {
        height: 8px;
        width: 8px;
      }

      .table-container::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 4px;
      }

      .table-container::-webkit-scrollbar-thumb {
        background: #c1c1c1;
        border-radius: 4px;
      }

      .table-container::-webkit-scrollbar-thumb:hover {
        background: #a8a8a8;
      }

      /* Hover effects */
      .table tbody tr:hover {
        background-color: #f9fafb;
      }

      .view-button:hover {
        background-color: #8b3ff2 !important;
        transform: translateY(-1px);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .filter-button:hover {
        background-color: #f3f4f6 !important;
        border-color: #d1d5db !important;
      }

      .active-filter-button:hover {
        background-color: #374151 !important;
      }

      /* Loading state */
      .loading {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 200px;
        color: #6b7280;
      }

      /* Smooth transitions */
      .btn {
        transition: all 0.2s ease;
      }

      .table tbody tr {
        transition: background-color 0.2s ease;
      }
    `}
  </style>
);

const styles = {
  container: {
    padding: "12px"
  },
  header: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "0",
    marginBottom: "12px"
  },
  userAvatar: {
    width: "54px",
    height: "54px"
  },
  userName: {
    fontWeight: "500",
    fontSize: "14px"
  },
  userId: {
    fontSize: "12px",
    color: "#6c757d"
  },
  quizTable: {
    minHeight: "750px",
    border: "1px solid #EAECF0",
    borderRadius: "12px",
    padding: "12px",
    marginTop: "20px"
  },
  tableHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px"
  },
  tableTitle: {
    margin: "0",
    fontSize: "20px",
    fontWeight: "600",
    color: "#111827"
  },
  sortButton: {
    fontWeight: "600",
    fontSize: "14px",
    color: "#374151"
  },
  sortIcon: {
    width: "20px",
    height: "20px"
  },
  filterButtons: {
    display: "flex",
    gap: "8px",
    marginBottom: "12px",
    flexWrap: "wrap"
  },
  filterButton: {
    borderRadius: "8px",
    color: "#111827",
    fontSize: "14px",
    fontWeight: "600",
    border: "1px solid #EAECF0",
    backgroundColor: "transparent",
    padding: "10px 16px"
  },
  activeFilterButton: {
    backgroundColor: "black",
    color: "#F2F4F7"
  },
  tableContainer: {
    maxHeight: "640px",
    overflowY: "auto",
    overflowX: "auto",
    width: "100%"
  },
  table: {
    color: "#111827",
    fontSize: "16px",
    fontWeight: "500"
  },
  tableHead: {
    position: "sticky",
    top: 0,
    background: "#FFFFFF",
    zIndex: 1,
    fontSize: "16px",
    fontWeight: "500",
    color: "#111827"
  },
  tableRow: {
    borderBottom: "1px solid #E5E7EB",
    height: "64px"
  },
  cellText: {
    color: "#4B5563",
    fontSize: "14px",
    fontWeight: "400",
    verticalAlign: "middle"
  },
  statusCell: {
    color: "#1C222E",
    fontSize: "14px",
    fontWeight: "500",
    lineHeight: "21px",
    verticalAlign: "middle"
  },
  statusDot: {
    display: "inline-block",
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    marginRight: "8px"
  },
  viewButton: {
    color: "#FFF",
    fontSize: "14px",
    fontWeight: "500",
    lineHeight: "normal",
    borderRadius: "100px",
    backgroundColor: "#9747FF",
    padding: "10px 20px",
    border: "none",
    width: "90px"
  },
  noQuizzes: {
    textAlign: "center",
    padding: "40px",
    color: "#6B7280",
    fontSize: "16px"
  }
};

export default Quizzes;