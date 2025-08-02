import React, { useState, useEffect, useContext } from 'react';
import { Container, Button, Table, Image, Form, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from './UserContext.js';
import { useLocation } from "react-router-dom";

function SectionDetails() {
  const { userData } = useContext(UserContext);
  const location = useLocation();
  const selectedData = location.state?.selectedData;
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [students, setStudents] = useState(selectedData?.students || []);
  const [filteredStudents, setFilteredStudents] = useState(selectedData?.students || []);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchText(searchValue);

    if (searchValue === "") {
      setFilteredStudents(students);
    } else {
      const filtered = students.filter(student =>
        student?.first_name?.toLowerCase().includes(searchValue) ||
        student?.last_name?.toLowerCase().includes(searchValue) ||
        student?.student_id?.toLowerCase().includes(searchValue) ||
        student?.department?.name?.toLowerCase().includes(searchValue) ||
        student?.program?.name?.toLowerCase().includes(searchValue) ||
        student?.cgpa?.toString().includes(searchValue)
      );
      setFilteredStudents(filtered);
    }
  };

  const handleDeleteClick = (student) => {
    setSelectedStudent(student);
    setShowDeleteModal(true);
  };

  const handleDeleteStudent = () => {
    if (selectedStudent) {
      const updatedStudents = students.filter(student =>
        student.id !== selectedStudent.id
      );
      setStudents(updatedStudents);

      const updatedFilteredStudents = filteredStudents.filter(student =>
        student.id !== selectedStudent.id
      );
      setFilteredStudents(updatedFilteredStudents);

      setShowDeleteModal(false);
      setSelectedStudent(null);
    }
  };

  useEffect(() => {
    if (searchText === "") {
      setFilteredStudents(students);
    } else {
      handleSearch({ target: { value: searchText } });
    }
  }, [students]);

  useEffect(() => {
    const scrollStyleSheet = document.createElement('style');
    scrollStyleSheet.textContent = `
      .hide-scrollbar::-webkit-scrollbar {
        display: none;
      }
    `;
    document.head.appendChild(scrollStyleSheet);

    return () => {
      document.head.removeChild(scrollStyleSheet);
    };
  }, []);

  return (
    <Container fluid className="p-0 d-flex">
      <main className="flex-grow-1 p-3">
        {/* Header Section */}
        <header style={styles.header}>
          <div style={styles.headerLeft}>
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
            <h1 style={styles.headerTitle}>
              Students In {selectedData?.course_name} (Section {selectedData?.section})
            </h1>
          </div>

          {/* Right side: User Info */}
          <div id='user-info' style={styles.userInfo}>
            <img
              id='info-img'
              src={userData?.profile_pic || "/assets/avatar.jpeg"}
              alt="User"
              style={styles.userImage}
            />
            <div style={styles.userDetails}>
              <div style={styles.userName}>
                {userData?.first_name} {userData?.last_name}
              </div>
              <div style={styles.userId}>{userData?.admin_id}</div>
            </div>
          </div>
        </header>

        {/* Secondary Header with All Students Button and Search */}
        <header
          className="d-flex justify-content-between align-items-center mb-4"
          style={styles.secondaryHeader}
        >
          {/* Left Section: All Students Button */}
          <div>
            <Button
              className="d-flex align-items-center"
              style={styles.actionButton}
            >
              <Image
                src="/assets/allstudents.png"
                alt="User Icon"
                width={16}
                height={16}
                className="me-2"
              />
              All Students
            </Button>
          </div>

          {/* Right Section: Search Bar + Add Student Button */}
          <div className="d-flex align-items-center">
            {/* Search Bar */}
            <div className="position-relative me-3" style={styles.searchContainer}>
              <Form.Control
                type="text"
                placeholder="Search"
                value={searchText}
                onChange={handleSearch}
                style={styles.searchInput}
              />
              <Image
                src="/assets/search-lg.png"
                alt="Search Icon"
                width={16}
                height={16}
                style={styles.searchIcon}
              />
            </div>

            {/* Add Student Button */}
            <Button
              className="d-flex align-items-center"
              style={styles.actionButton}
            >
              <Image
                src="/assets/plus1.png"
                alt="Plus Icon"
                width={16}
                height={16}
                className="me-2"
              />
              Add Student
            </Button>
          </div>
        </header>

        {/* Main Table Section */}
        <div className="border" style={styles.tableContainer}>
          <div className="hide-scrollbar" style={styles.scrollWrapper}>
            <div className="hide-scrollbar" style={styles.scrollableContent}>
              <Table hover className="mb-0" style={styles.table}>
                <thead style={styles.tableHeader}>
                  <tr>
                    <th style={styles.tableHeaderCell}>Students</th>
                    <th style={styles.tableHeaderCell}>Roll no</th>
                    <th style={styles.tableHeaderCell}>Department</th>
                    <th style={styles.tableHeaderCell}>Program</th>
                    <th style={styles.tableHeaderCell}>Total CGPA</th>
                    <th style={styles.tableHeaderCell}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student?.student_id} style={styles.tableRow}>
                      <td style={styles.studentCell}>
                        <div className="d-flex align-items-center">
                          <img
                            src={student?.profile_pic}
                            alt={student?.first_name}
                            style={styles.studentImage}
                          />
                          {student?.first_name} {student?.last_name}
                        </div>
                      </td>
                      <td style={styles.standardCell}>{student?.student_id}</td>
                      <td style={styles.standardCell}>{student?.department?.name}</td>
                      <td style={styles.standardCell}>{student?.program?.name}</td>
                      <td style={styles.standardCell}>
                        <span style={styles.cgpaText}>{student?.cgpa}</span>
                      </td>
                      <td style={styles.actionCell}>
                        <div className="d-flex">
                          <button
                            style={styles.deleteButton}
                            onClick={() => handleDeleteClick(student)}
                          >
                            <img
                              src="/assets/delete.png"
                              alt="Delete"
                              style={styles.deleteIcon}
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete {selectedStudent?.full_name}?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteStudent}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </main>
    </Container>
  );
}

const styles = {
  container: {
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    overflowY: 'auto',
    height: '100%'
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: '20px',
    width: "100%",
  },

  headerLeft: {
    display: "flex",
    alignItems: "center"
  },

  backArrow: {
    cursor: "pointer"
  },

  headerTitle: {
    fontSize: "24px",
    margin: 0,
    fontWeight: "600"
  },

  userInfo: {
    display: 'flex',
    alignItems: 'center'
  },

  userImage: {
    borderRadius: '50%',
    width: '54px',
    height: '54px',
    marginRight: '10px',
  },

  userDetails: {
    marginRight: '10px'
  },

  userName: {
    fontWeight: '500',
    fontSize: '14'
  },

  userId: {
    fontSize: '12px',
    color: '#6c757d'
  },

  secondaryHeader: {
    marginTop: "15px"
  },

  actionButton: {
    backgroundColor: "#101828",
    color: "white",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    padding: "8px 16px",
    border: "none",
  },

  searchContainer: {
    position: "relative"
  },

  searchInput: {
    borderRadius: "8px",
    paddingLeft: "40px",
    fontSize: "14px",
    fontWeight: "400",
    color: "#98A2B3",
    border: "1px solid #D1D5DB",
    width: "250px",
  },

  searchIcon: {
    position: "absolute",
    top: "50%",
    left: "12px",
    transform: "translateY(-50%)",
  },

  tableContainer: {
    height: "700px",
    border: '1px solid #EAECF0',
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },

  scrollWrapper: {
    flex: 1,
    overflow: 'hidden',
    position: 'relative'
  },

  scrollableContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: '0px',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    overflowY: 'auto',
    height: '100%'
  },

  table: {
    color: "#4B5563",
    fontFamily: "Inter",
    fontSize: "16px",
    fontWeight: "500",
    tableLayout: "fixed",
    width: "100%"
  },

  tableHeader: {
    position: "sticky",
    top: 0,
    background: "#FFFFFF",
    zIndex: 1,
    fontStyle: 'normal',
    color: '#111827',
    fontSize: '16px',
    fontWeight: '500',
    fontFamily: 'inter'
  },

  tableHeaderCell: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#111827',
    padding: '16px 10px'
  },

  tableRow: {
    lineHeight: "60px",
    fontSize: "14px",
    fontWeight: "400",
    color: "#4B5563",
    fontStyle: "normal",
  },

  studentCell: {
    verticalAlign: "middle",
    fontSize: '12px',
    fontWeight: '500',
    color: '#101828'
  },

  studentImage: {
    borderRadius: "50%",
    width: "36px",
    height: "36px",
    marginRight: "8px",
    objectFit: "cover"
  },

  standardCell: {
    verticalAlign: "middle",
    fontSize: '14px',
    fontWeight: '400',
    color: '#4B5563'
  },

  cgpaText: {
    color: "#22C55E",
    fontSize: '18px',
    fontWeight: '500'
  },

  actionCell: {
    verticalAlign: "middle"
  },

  deleteButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    marginRight: "0px"
  },

  deleteIcon: {
    width: "36px",
    height: "36px",
    border: '1px solid #EAECF0',
    borderRadius: '100px',
    padding: '6px'
  }
};

export default SectionDetails;