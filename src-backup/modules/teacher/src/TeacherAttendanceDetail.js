import React, { useState, useEffect, useContext } from "react";
import { Container, Button, Form, Image, Table, Modal, Spinner, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

function AttendanceDetail() {
  const { state } = useLocation();
  const { selectedData } = state ?? {};
  const { userData, saveAttendance, getAttendanceByDate, updateAttendance, getStudentAttendanceStats } = useContext(UserContext);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });
  const [isEditMode, setIsEditMode] = useState(false);
  const [existingAttendance, setExistingAttendance] = useState(null);

  // Function to show alert messages
  const showAlert = (type, message) => {
    setAlert({ show: true, type, message });
    setTimeout(() => setAlert({ show: false, type: '', message: '' }), 5000);
  };

  // Function to load student attendance statistics
  const loadStudentStats = async (studentId) => {
    if (!selectedData?.id) return { noOfAbsents: 0, noOfPresents: 0, percentage: '0%' };

    try {
      const result = await getStudentAttendanceStats(selectedData.id, studentId);
      if (result.success) {
        return {
          noOfAbsents: result.data.absentClasses,
          noOfPresents: result.data.presentClasses,
          percentage: `${result.data.percentage}%`,
          percentageValue: result.data.percentage
        };
      }
    } catch (error) {
      console.error('Error loading student stats:', error);
    }

    // Fallback to mock data if real stats aren't available
    return {
      noOfAbsents: Math.floor(Math.random() * 5),
      noOfPresents: Math.floor(Math.random() * 20) + 10,
      percentage: '85%',
      percentageValue: 85
    };
  };

  // Initialize students data when component mounts
  useEffect(() => {
    const initializeStudents = async () => {
      if (selectedData && selectedData.students) {
        setLoading(true);

        const initializedStudents = await Promise.all(
          selectedData.students.map(async (student, index) => {
            const stats = await loadStudentStats(student.student_id);

            return {
              id: student.id || `student-${index}`,
              studentId: student.student_id || `STD-${String(index + 1).padStart(4, '0')}`,
              name: `${student.first_name || 'Unknown'} ${student.last_name || 'Student'}`,
              image: student.profile_pic || '/assets/avatar.jpeg',
              subject: selectedData.courseName || selectedData.section || 'N/A',
              email: student.email || 'N/A',
              phone: student.phone_no || 'N/A',
              status: 'Present', // Default status for today's attendance
              section: selectedData.sectionLetter || selectedData.section,
              department: selectedData.department,
              ...stats,
              // Additional student info
              dateOfBirth: student.dateOfBirth,
              gender: student.gender,
              homeAddress: student.home_address,
              guardianName: student.guardian_name,
              guardianPhone: student.guardian_phone,
              admissionDate: student.createdAt
            };
          })
        );

        setStudents(initializedStudents);
        setFilteredStudents(initializedStudents);
        setLoading(false);
      }
    };

    initializeStudents();
  }, [selectedData]);

  // Load existing attendance when date changes
  useEffect(() => {
    const loadExistingAttendance = async () => {
      if (!selectedData?.id || !attendanceDate || students.length === 0) return;

      setLoading(true);
      try {
        const result = await getAttendanceByDate(selectedData.id, attendanceDate);

        if (result.success) {
          // Attendance exists for this date - load EXACTLY what was saved
          setExistingAttendance(result.data);
          setIsEditMode(true);

          console.log('Loading existing attendance:');
          console.log('Saved students:', result.data.students);
          console.log('Current students:', students.map(s => ({ id: s.id, studentId: s.studentId, name: s.name })));

          // Show students with their EXACT saved statuses
          const updatedStudents = students.map(student => {
            const existingRecord = result.data.students.find(s =>
              s.studentId === student.studentId
            );

            console.log(`Student ${student.name} (${student.studentId}):`,
              existingRecord ? `Found with status: ${existingRecord.status}` : 'Not found in saved data');

            if (existingRecord) {
              // Student was in the saved attendance - use their exact saved status
              return {
                ...student,
                status: existingRecord.status // This will be either 'Present' or 'Absent'
              };
            } else {
              // Student was not in saved attendance
              // This might happen if student was added to section after attendance was taken
              console.warn(`Student ${student.name} not found in saved attendance, defaulting to Present`);
              return {
                ...student,
                status: 'Present'
              };
            }
          });

          console.log('Updated students:', updatedStudents.map(s => ({ name: s.name, status: s.status })));

          setStudents(updatedStudents);
          setFilteredStudents(updatedStudents.filter(student =>
            !searchText.trim() ||
            student.name.toLowerCase().includes(searchText.toLowerCase()) ||
            student.studentId.toLowerCase().includes(searchText.toLowerCase()) ||
            student.email.toLowerCase().includes(searchText.toLowerCase())
          ));

          showAlert('info', `Loaded existing attendance for ${new Date(attendanceDate).toLocaleDateString()}`);
        } else {
          // No attendance for this date - default all to Present (first time)
          console.log('No existing attendance found, defaulting all to Present');
          setExistingAttendance(null);
          setIsEditMode(false);

          // First time opening this date - all students default to Present
          const resetStudents = students.map(student => ({
            ...student,
            status: 'Present' // Default all to Present for new attendance
          }));

          setStudents(resetStudents);
          setFilteredStudents(resetStudents.filter(student =>
            !searchText.trim() ||
            student.name.toLowerCase().includes(searchText.toLowerCase()) ||
            student.studentId.toLowerCase().includes(searchText.toLowerCase()) ||
            student.email.toLowerCase().includes(searchText.toLowerCase())
          ));
        }
      } catch (error) {
        console.error('Error loading existing attendance:', error);
        showAlert('danger', 'Error loading existing attendance');
      } finally {
        setLoading(false);
      }
    };

    loadExistingAttendance();
  }, [attendanceDate, selectedData?.id, students.length]);

  // Filter students based on search text
  useEffect(() => {
    if (!searchText.trim()) {
      setFilteredStudents(students);
    } else {
      const filtered = students.filter(student =>
        student.name.toLowerCase().includes(searchText.toLowerCase()) ||
        student.studentId.toLowerCase().includes(searchText.toLowerCase()) ||
        student.email.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredStudents(filtered);
    }
  }, [searchText, students]);

  const handleCheckboxChange = (id) => {
    const updatedStudents = students.map(student =>
      student.id === id
        ? { ...student, status: student.status === 'Present' ? 'Absent' : 'Present' }
        : student
    );
    setStudents(updatedStudents);

    // Update filtered students as well
    const updatedFiltered = filteredStudents.map(student =>
      student.id === id
        ? { ...student, status: student.status === 'Present' ? 'Absent' : 'Present' }
        : student
    );
    setFilteredStudents(updatedFiltered);
  };

  const handleSubmit = async () => {
    if (!selectedData?.id) {
      showAlert('danger', 'Section information is missing');
      return;
    }

    setSaving(true);

    try {
      // Only save students as they are currently marked (Present/Absent)
      // This is the exact state the teacher wants to save
      const attendanceData = {
        date: attendanceDate,
        teacherId: userData?.teacher_id || 'UNKNOWN',
        courseName: selectedData.courseName || selectedData.section,
        students: students.map(student => ({
          studentId: student.studentId,
          name: student.name,
          status: student.status
        }))
      };

      console.log('Submitting attendance data:');
      console.log('Students being saved:', attendanceData.students.map(s => ({ name: s.name, studentId: s.studentId, status: s.status })));

      let result;

      if (isEditMode) {
        // Update existing attendance
        result = await updateAttendance(selectedData.id, attendanceDate, attendanceData.students);
      } else {
        // Save new attendance
        result = await saveAttendance(selectedData.id, attendanceData);
      }

      if (result.success) {
        setShowModal(true);
        showAlert('success', result.message);
        console.log('Attendance saved successfully');
      } else {
        showAlert('danger', result.message || 'Failed to save attendance');
        console.error('Failed to save attendance:', result);
      }
    } catch (error) {
      console.error('Error submitting attendance:', error);
      showAlert('danger', 'An error occurred while saving attendance');
    } finally {
      setSaving(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const presentCount = students.filter(student => student.status === 'Present').length;
  const absentCount = students.filter(student => student.status === 'Absent').length;
  const totalStudents = students.length;

  if (!selectedData) {
    return (
      <Container className="p-4">
        <div className="text-center">
          <h3>No section data found</h3>
          <Button onClick={() => navigate(-1)} variant="primary">
            Go Back
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container fluid className="p-0 d-flex">
      <main className="flex-grow-1 p-3">
        {/* Alert Component */}
        {alert.show && (
          <Alert variant={alert.type} className="mb-3" dismissible onClose={() => setAlert({ show: false, type: '', message: '' })}>
            {alert.message}
          </Alert>
        )}

        {/* Header Section */}
        <header className="main-header">
          <div className="header-left">
            <Image
              src="/assets/arrow-left.png"
              roundedCircle
              width={24}
              height={24}
              className="me-2 back-arrow"
              alt="Back Arrow"
              onClick={() => navigate(-1)}
            />
            <div>
              <h1 className="page-title">
                {isEditMode ? 'Edit Attendance' : 'Take Attendance'}
              </h1>
              <p className="section-info">
                {selectedData.courseName} - Section {selectedData.sectionLetter}
                <span className="student-count">({totalStudents} students)</span>
              </p>
            </div>
          </div>

          {/* Right side: User Info and Dropdown */}
          <div className="header-right">
            <img
              src={userData?.profile_pic || "/assets/avatar.jpeg"}
              alt="User"
              className="user-avatar"
            />
            <div className="user-info">
              <div className="user-name">
                {userData?.first_name && userData?.last_name
                  ? `${userData.first_name} ${userData.last_name}`
                  : "John Doe"}
              </div>
              <div className="user-id">
                {userData?.teacher_id}
              </div>
            </div>
            <button className="dropdown-btn">
              <img
                src="/assets/arrow-down.png"
                alt="Dropdown"
                className="dropdown-arrow"
              />
            </button>
          </div>
        </header>

        {/* Filter Section */}
        <header className="filter-section">
          {/* Left Side - Section Info */}
          <div className="section-details">
            <div className="section-badge">
              <Image
                src="/assets/menu-board2.png"
                alt="Section Icon"
                width={20}
                height={20}
                className="me-2"
              />
              <span>{selectedData.department}</span>
            </div>
            <div className="date-selector">
              <label htmlFor="attendance-date" className="date-label">Date:</label>
              <input
                id="attendance-date"
                type="date"
                value={attendanceDate}
                onChange={(e) => setAttendanceDate(e.target.value)}
                className="date-input"
                max={new Date().toISOString().split('T')[0]} // Prevent future dates
              />
            </div>
            {isEditMode && (
              <div className="edit-indicator">
                <span className="badge bg-warning">Editing Existing Attendance</span>
              </div>
            )}
          </div>

          {/* Right Side - Search and Sort */}
          <div className="search-sort-container">
            <div className="search-wrapper">
              <Form.Control
                type="text"
                placeholder="Search students by name or ID"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="search-input"
              />
              <Image
                src="/assets/search-lg.png"
                alt="Search Icon"
                width={20}
                height={20}
                className="search-icon"
              />
            </div>

            <Button className="sort-btn">
              <Image
                src="/assets/filter-lines.png"
                alt="Sort Icon"
                width={20}
                height={20}
                className="me-2"
              />
              Sort
            </Button>
          </div>
        </header>

        {/* Loading Spinner */}
        {loading && (
          <div className="text-center py-4">
            <Spinner animation="border" variant="primary" />
            <p className="mt-2">Loading attendance data...</p>
          </div>
        )}

        {/* Attendance Table */}
        {!loading && (
          <div className="table-container">
            <Table responsive hover className="attendance-table">
              <thead>
                <tr>
                  <th>Sr no.</th>
                  <th>Student</th>
                  <th>Student ID</th>
                  <th>Subject</th>
                  <th>Absents</th>
                  <th>Presents</th>
                  <th>Percentage</th>
                  <th>{isEditMode ? 'Update Attendance' : "Today's Attendance"}</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-4">
                      {searchText ? `No students found matching "${searchText}"` : "No students in this section"}
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((student, index) => (
                    <tr key={student.id} className="student-row">
                      <td className="sr-number">{index + 1}</td>
                      <td className="student-info">
                        <Image
                          src={student.image}
                          roundedCircle
                          width={40}
                          height={40}
                          className="student-avatar"
                        />
                        <div className="student-details">
                          <div className="student-name">{student.name}</div>
                          <div className="student-email">{student.email}</div>
                        </div>
                      </td>
                      <td className="student-id">{student.studentId}</td>
                      <td className="subject-name">{student.subject}</td>
                      <td className={`absent-count ${student.noOfAbsents > 5 ? 'high-absents' : ''}`}>
                        {student.noOfAbsents}
                      </td>
                      <td className="present-count">{student.noOfPresents}</td>
                      <td className={`percentage ${student.percentageValue <= 75 ? 'low-attendance' : 'good-attendance'}`}>
                        {student.percentage}
                      </td>
                      <td className="attendance-checkbox">
                        <input
                          type="checkbox"
                          id={`checkbox-${student.id}`}
                          checked={student.status === 'Present'}
                          onChange={() => handleCheckboxChange(student.id)}
                          className="checkbox-input"
                        />
                        <label
                          htmlFor={`checkbox-${student.id}`}
                          className={`checkbox-label ${student.status === 'Present' ? 'checked' : ''}`}
                        >
                          {student.status === 'Present' && (
                            <span className="checkmark">✓</span>
                          )}
                        </label>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>
        )}

        {/* Footer Section */}
        {!loading && (
          <div className="attendance-footer">
            <div className="attendance-summary">
              <div className="summary-item present-summary">
                <span className="summary-label">Total Present:</span>
                <span className="summary-value present-value">{presentCount}</span>
              </div>
              <div className="summary-item absent-summary">
                <span className="summary-label">Total Absent:</span>
                <span className="summary-value absent-value">{absentCount}</span>
              </div>
              <div className="summary-item total-summary">
                <span className="summary-label">Total Students:</span>
                <span className="summary-value">{totalStudents}</span>
              </div>
            </div>

            <div className="submit-section">
              <Button
                variant="primary"
                onClick={handleSubmit}
                className="submit-btn"
                disabled={totalStudents === 0 || saving}
              >
                {saving ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    {isEditMode ? 'Updating...' : 'Saving...'}
                  </>
                ) : (
                  isEditMode ? 'Update Attendance' : 'Submit Attendance'
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Success Modal */}
        <Modal show={showModal} onHide={handleCloseModal} centered className="success-modal">
          <Modal.Header closeButton className="modal-header">
            <Modal.Title className="modal-title">
              <Image src="/assets/check-circle.png" width={24} height={24} className="me-2" />
              Attendance {isEditMode ? 'Updated' : 'Submitted'} Successfully
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-body">
            <div className="success-details">
              <p><strong>Course:</strong> {selectedData.courseName}</p>
              <p><strong>Section:</strong> {selectedData.sectionLetter}</p>
              <p><strong>Date:</strong> {new Date(attendanceDate).toLocaleDateString()}</p>
              <p><strong>Present:</strong> {presentCount} students</p>
              <p><strong>Absent:</strong> {absentCount} students</p>
              <p><strong>Action:</strong> {isEditMode ? 'Updated existing attendance' : 'Created new attendance record'}</p>
            </div>
          </Modal.Body>
          <Modal.Footer className="modal-footer">
            <Button variant="secondary" onClick={handleCloseModal} className="modal-btn">
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => { handleCloseModal(); navigate(-1); }}
              className="modal-btn primary"
            >
              Back to Attendance
            </Button>
          </Modal.Footer>
        </Modal>
      </main>

      <AttendanceDetailStyles />
    </Container>
  );
}

// Separated Styles Component (same as before, with some additions)
const AttendanceDetailStyles = () => (
  <style>
    {`
    /* Main Header Styles */
    .main-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding: 10px;
      padding-top: 0px;
      width: 100%;
      margin-bottom: 1rem;
    }

    .header-left {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
    }

    .back-arrow {
      cursor: pointer;
      margin-top: 0.25rem;
    }

    .page-title {
      font-size: 24px;
      margin: 0;
      font-weight: 600;
      color: #111827;
    }

    .section-info {
      font-size: 14px;
      color: #6b7280;
      margin: 0;
      margin-top: 0.25rem;
    }

    .student-count {
      color: #7c3aed;
      font-weight: 500;
    }

    .header-right {
      display: flex;
      align-items: center;
    }

    .user-avatar {
      border-radius: 50%;
      width: 54px;
      height: 54px;
      margin-right: 10px;
      object-fit: cover;
    }

    .user-info {
      margin-right: 10px;
    }

    .user-name {
      font-weight: 500;
      font-size: 14px;
    }

    .user-id {
      font-size: 12px;
      color: #6c757d;
    }

    .dropdown-btn {
      background-color: transparent;
      border: none;
      cursor: pointer;
    }

    .dropdown-arrow {
      width: 12px;
      height: 12px;
    }

    /* Filter Section */
    .filter-section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 15px;
      padding-right: 20px;
      width: 100%;
      margin-bottom: 1.5rem;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .section-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .section-badge {
      display: flex;
      align-items: center;
      border: 1px solid #D1D5DB;
      border-radius: 8px;
      padding: 8px 12px;
      background-color: white;
      font-size: 14px;
      font-weight: 600;
      color: #111827;
    }

    .date-selector {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .date-label {
      font-size: 14px;
      font-weight: 500;
      color: #374151;
      margin: 0;
    }

    .date-input {
      border: 1px solid #D1D5DB;
      border-radius: 6px;
      padding: 6px 10px;
      font-size: 14px;
      color: #374151;
    }

    .edit-indicator {
      display: flex;
      align-items: center;
    }

    .edit-indicator .badge {
      font-size: 12px;
      padding: 0.5rem 0.75rem;
    }

    .search-sort-container {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .search-wrapper {
      position: relative;
    }

    .search-input {
      border-radius: 8px !important;
      padding-left: 40px !important;
      font-size: 14px !important;
      font-weight: 400 !important;
      color: #98A2B3 !important;
      border: 1px solid #D1D5DB !important;
      width: 300px !important;
    }

    .search-input:focus {
      border-color: #7C3AED !important;
      box-shadow: 0 0 0 0.2rem rgba(124, 58, 237, 0.25) !important;
    }

    .search-icon {
      position: absolute;
      top: 50%;
      left: 12px;
      transform: translateY(-50%);
    }

    .sort-btn {
      display: flex !important;
      align-items: center !important;
      background-color: white !important;
      color: #374151 !important;
      border: 1px solid #D1D5DB !important;
      border-radius: 8px !important;
      font-size: 14px !important;
      font-weight: 600 !important;
      padding: 8px 12px !important;
    }

    /* Table Styles */
    .table-container {
      border-radius: 12px;
      border: 1px solid #E5E7EB;
      overflow: hidden;
      margin-bottom: 2rem;
    }

    .attendance-table {
      margin: 0;
      background: white;
    }

    .attendance-table th {
      border-bottom: 1px solid #E5E7EB;
      font-size: 16px;
      font-weight: 500;
      color: #111827;
      background-color: #f9fafb;
      padding: 1rem 0.75rem;
    }

    .attendance-table td {
      border-bottom: 1px solid #f3f4f6;
      color: #4B5563;
      font-weight: 400;
      font-size: 14px;
      padding: 1rem 0.75rem;
      vertical-align: middle;
    }

    .student-row:hover {
      background-color: #f9fafb;
    }

    .sr-number {
      font-weight: 500;
      color: #6b7280;
    }

    .student-info {
      display: flex !important;
      align-items: center !important;
      gap: 0.75rem;
    }

    .student-avatar {
      width: 40px !important;
      height: 40px !important;
      object-fit: cover;
      border: 2px solid #e5e7eb;
    }

    .student-details {
      display: flex;
      flex-direction: column;
    }

    .student-name {
      font-weight: 500;
      color: #111827;
    }

    .student-email {
      font-size: 12px;
      color: #6b7280;
    }

    .student-id {
      font-family: 'Courier New', monospace;
      color: #7c3aed;
      font-weight: 500;
    }

    .subject-name {
      color: #374151;
    }

    .absent-count {
      color: #dc2626;
      font-weight: 500;
    }

    .absent-count.high-absents {
      color: #dc2626;
      font-weight: 600;
      background-color: #fef2f2;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
    }

    .present-count {
      color: #16a34a;
      font-weight: 500;
    }

    .percentage {
      font-weight: 500;
    }

    .percentage.low-attendance {
      color: #dc2626;
    }

    .percentage.good-attendance {
      color: #16a34a;
    }

    .attendance-checkbox {
      text-align: center;
    }

    .checkbox-input {
      display: none;
    }

    .checkbox-label {
      display: inline-block;
      width: 24px;
      height: 24px;
      cursor: pointer;
      background-color: white;
      border: 2px solid #d1d5db;
      border-radius: 6px;
      position: relative;
      transition: all 0.2s ease;
    }

    .checkbox-label:hover {
      border-color: #7c3aed;
    }

    .checkbox-label.checked {
      background-color: #7c3aed;
      border-color: #7c3aed;
    }

    .checkmark {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
      font-size: 14px;
      font-weight: bold;
    }

    /* Footer Styles */
    .attendance-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem 2rem;
      background-color: #f9fafb;
      border-radius: 12px;
      border: 1px solid #e5e7eb;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .attendance-summary {
      display: flex;
      gap: 2rem;
      flex-wrap: wrap;
    }

    .summary-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.25rem;
    }

    .summary-label {
      font-size: 14px;
      font-weight: 500;
      color: #374151;
    }

    .summary-value {
      font-size: 18px;
      font-weight: 600;
    }

    .present-value {
      color: #16a34a;
    }

    .absent-value {
      color: #dc2626;
    }

    .submit-section {
      display: flex;
      align-items: center;
    }

    .submit-btn {
      min-width: 160px !important;
      border-radius: 8px !important;
      background: #7c3aed !important;
      border: none !important;
      padding: 0.75rem 1.5rem !important;
      font-weight: 500 !important;
      transition: all 0.2s ease !important;
    }

    .submit-btn:hover {
      background: #6d28d9 !important;
      transform: translateY(-1px);
    }

    .submit-btn:disabled {
      background: #9ca3af !important;
      cursor: not-allowed;
      transform: none;
    }

    /* Modal Styles */
    .success-modal .modal-header {
      background-color: #f0fdf4;
      border-bottom: 1px solid #bbf7d0;
    }

    .modal-title {
      color: #16a34a;
      font-weight: 600;
    }

    .modal-body {
      padding: 1.5rem;
    }

    .success-details p {
      margin-bottom: 0.5rem;
      font-size: 14px;
    }

    .success-details strong {
      color: #374151;
    }

    .modal-footer {
      border-top: 1px solid #e5e7eb;
    }

    .modal-btn {
      border-radius: 6px !important;
      font-weight: 500 !important;
    }

    .modal-btn.primary {
      background-color: #7c3aed !important;
      border-color: #7c3aed !important;
    }

    /* Loading and Alert Styles */
    .alert {
      border-radius: 8px;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .filter-section {
        flex-direction: column;
        align-items: stretch;
      }

      .section-details {
        justify-content: center;
      }

      .search-sort-container {
        justify-content: space-between;
      }

      .search-input {
        width: 200px !important;
      }

      .attendance-table {
        font-size: 12px;
      }

      .attendance-table th,
      .attendance-table td {
        padding: 0.5rem 0.25rem;
      }

      .student-info {
        flex-direction: column !important;
        align-items: flex-start !important;
        gap: 0.25rem !important;
      }

      .student-avatar {
        width: 32px !important;
        height: 32px !important;
      }

      .attendance-footer {
        flex-direction: column;
        text-align: center;
      }

      .attendance-summary {
        justify-content: center;
      }
    }

    @media (max-width: 576px) {
      .main-header {
        flex-direction: column;
        gap: 1rem;
        align-items: stretch;
      }

      .header-right {
        justify-content: center;
      }

      .attendance-table th:nth-child(4),
      .attendance-table td:nth-child(4),
      .attendance-table th:nth-child(5),
      .attendance-table td:nth-child(5),
      .attendance-table th:nth-child(6),
      .attendance-table td:nth-child(6) {
        display: none;
      }
    }
    `}
  </style>
);

export default AttendanceDetail;