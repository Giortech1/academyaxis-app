import React, { useState } from "react";
import { Container, Button, Form, Image, Table, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

function AttendenceDetail() {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

const handleSubmit = () => {
  setShowModal(true);
};

const handleCloseModal = () => {
  setShowModal(false);
};


    // Example student data
    const attendanceData = [
        { id: 1, studentId: '123456', name: 'Demo Name', image: '/assets/avatar.jpeg', subject: 'Artificial Intelligence', noOfAbsents: 2, noOfPresents: 10, percentage: '92%', status: 'Absent' },
        { id: 2, studentId: '123457', name: 'Demo Name', image: '/assets/avatar.jpeg', subject: 'Artificial Intelligence', noOfAbsents: 4, noOfPresents: 20, percentage: '92%', status: 'Present' },
        { id: 3, studentId: '123458', name: 'Demo Name', image: '/assets/avatar.jpeg', subject: 'Artificial Intelligence', noOfAbsents: 6, noOfPresents: 25, percentage: '75%', status: 'Absent' },
        { id: 4, studentId: '123459', name: 'Demo Name', image: '/assets/avatar.jpeg', subject: 'Artificial Intelligence', noOfAbsents: 1, noOfPresents: 14, percentage: '92%', status: 'Present' },
        { id: 5, studentId: '123460', name: 'Demo Name', image: '/assets/avatar.jpeg', subject: 'Artificial Intelligence', noOfAbsents: 3, noOfPresents: 20, percentage: '92%', status: 'Present' },
        { id: 6, studentId: '123461', name: 'Demo Name', image: '/assets/avatar.jpeg', subject: 'Artificial Intelligence', noOfAbsents: 4, noOfPresents: 10, percentage: '92%', status: 'Absent' },
        { id: 7, studentId: '123462', name: 'Demo Name', image: '/assets/avatar.jpeg', subject: 'Artificial Intelligence', noOfAbsents: 8, noOfPresents: 20, percentage: '75%', status: 'Absent' },
        { id: 8, studentId: '123463', name: 'Demo Name', image: '/assets/avatar.jpeg', subject: 'Artificial Intelligence', noOfAbsents: 2, noOfPresents: 30, percentage: '92%', status: 'Present' },
        { id: 9, studentId: '123464', name: 'Demo Name', image: '/assets/avatar.jpeg', subject: 'Artificial Intelligence', noOfAbsents: 1, noOfPresents: 20, percentage: '92%', status: 'Absent' },
        { id: 10, studentId: '123465', name: 'Demo Name', image: '/assets/avatar.jpeg', subject: 'Artificial Intelligence', noOfAbsents: 8, noOfPresents: 10, percentage: '75%', status: 'Present' },
    ];

    const [students, setStudents] = useState(attendanceData);

    const handleCheckboxChange = (id) => {
        setStudents(students.map(student =>
            student.id === id ? { ...student, status: student.status === 'Present' ? 'Absent' : 'Present' } : student
        ));
    };

    const [searchText, setSearchText] = useState("");

    return (
        <Container fluid className="p-0 d-flex">
            <main className="flex-grow-1 p-3">
                {/* Header Section */}
                <header
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "10px",
                        paddingTop: "0px",
                        width: "100%",
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center" }}>
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
                        <h1 style={{ fontSize: "24px", margin: 0, fontWeight: "600" }}>Attendance</h1>
                    </div>

                    {/* Right side: User Info and Dropdown */}
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                            src="/assets/avatar.jpeg"
                            alt="User"
                            style={{ borderRadius: "50%", width: "54px", height: "54px", marginRight: "10px" }}
                        />
                        <div style={{ marginRight: "10px" }}>
                            <div style={{ fontWeight: "500", fontSize: "14" }}>John Deo</div>
                            <div style={{ fontSize: "12px", color: "#6c757d" }}>123456</div>
                        </div>
                        <button style={{ backgroundColor: "transparent", border: "none", cursor: "pointer" }}>
                            <img
                                src="/assets/arrow-down.png"
                                alt="Dropdown"
                                style={{ width: "12px", height: "12px" }}
                            />
                        </button>
                    </div>
                </header>

                {/* Filter Section */}
                <header
                    className="d-flex justify-content-between align-items-center mb-4"
                    style={{ marginTop: "15px", paddingRight: "20px", width: "100%" }}
                >
                    {/* Left Side - Single Button */}
                    <div
                        className="d-flex align-items-center"
                        style={{
                            border: "1px solid #D1D5DB",
                            borderRadius: "8px",
                            padding: "8px 12px",
                            cursor: "pointer",
                            backgroundColor: "white",
                            width: "140px",
                            justifyContent: "center",
                        }}
                    >
                        <Image
                            src="/assets/menu-board2.png"
                            alt="Calendar Icon"
                            width={20}
                            height={20}
                            className="me-2"
                        />
                        <span style={{ fontSize: "14px", fontWeight: "600", color: "#111827" }}>
                            All Classes
                        </span>
                    </div>

                    {/* Right Side - Search and Sort */}
                    <div className="d-flex align-items-center">
                        {/* Search Input */}
                        <div className="position-relative me-3">
                            <Form.Control
                                type="text"
                                placeholder="Search"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                style={{
                                    borderRadius: "8px",
                                    paddingLeft: "40px",
                                    fontSize: "14px",
                                    fontWeight: "400",
                                    color: "#98A2B3",
                                    border: "1px solid #D1D5DB",
                                    width: "300px",
                                }}
                            />
                            <Image
                                src="/assets/search-lg.png"
                                alt="Search Icon"
                                width={20}
                                height={20}
                                style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "12px",
                                    transform: "translateY(-50%)",
                                }}
                            />
                        </div>

                        {/* Sort Button */}
                        <Button
                            className="d-flex align-items-center"
                            style={{
                                backgroundColor: "white",
                                color: "#374151",
                                border: "1px solid #D1D5DB",
                                borderRadius: "8px",
                                fontSize: "14px",
                                fontWeight: "600",
                                padding: "8px 12px",
                            }}
                        >
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

                {/* Attendance Table */}
                <Table responsive hover className="table">
                    <thead>
                        <tr>
                            <th>Sr no.</th>
                            <th>Name</th>
                            <th>ID</th>
                            <th>Subject</th>
                            <th>No of Absents</th>
                            <th>No of Presents</th>
                            <th>Percentage</th>
                            <th>Attendance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <tr key={student.id}>
                                <td>{index + 1}</td>
                                <td className="d-flex align-items-center">
                                    <Image src={student.image} roundedCircle width={40} height={40} className="me-2" />
                                    {student.name}
                                </td>
                                <td>{student.studentId}</td>
                                <td>{student.subject}</td>
                                <td className={student.noOfAbsents > 0 ? 'text-danger' : 'text-success'}>{student.noOfAbsents}</td>
                                <td className={student.noOfPresents > 0 ? 'text-success' : 'text-danger'}>{student.noOfPresents}</td>
                                <td
                                    style={{
                                        color: parseFloat(student.percentage) <= 75 ? "red" : "green",
                                        fontWeight: "400",
                                    }}
                                >
                                    {student.percentage}
                                </td>
                                <td>
  <input
    type="checkbox"
    id={`checkbox-${student.id}`}
    checked={student.status === 'Present'}
    onChange={() => handleCheckboxChange(student.id)}
    style={{ display: 'none' }} // hide native checkbox
  />
  <label
    htmlFor={`checkbox-${student.id}`}
    style={{
      display: 'inline-block',
      width: '20px',
      height: '20px',
      cursor: 'pointer',
      backgroundColor: student.status === 'Present' ? '#9747FF' : 'white',
      border: '1px solid #ccc',
      borderRadius: '4px',
      position: 'relative',
    }}
  >
    {student.status === 'Present' && (
      <span
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
          fontSize: '14px',
          fontWeight: 'bold',
        }}
      >
        ✓
      </span>
    )}
  </label>
</td>

                            </tr>
                        ))}
                    </tbody>
                </Table>

                {/* Footer Section */}
                <div className="d-flex justify-content-between mt-0" style={{ flexDirection: 'column', textAlign: 'right', gap: '20px', padding: '0px 130px' }}>
                    <div style={{ color: '#12B76A', gap: '60px', display: 'flex', justifyContent: 'flex-end' }}>
                        <strong style={{ fontSize: '14px', fontWeight: '500', color: '#000' }}>Total Present </strong>{students.filter(student => student.status === 'Present').length}
                    </div>
                    <div style={{ color: '#D92D20', gap: '60px', display: 'flex', justifyContent: 'flex-end' }}>
                        <strong style={{ fontSize: '14px', fontWeight: '500', color: '#000' }}>Total Absent </strong>{students.filter(student => student.status === 'Absent').length}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
  variant="primary"
  onClick={handleSubmit} // 👈 trigger modal open
  style={{ minWidth: '120px', borderRadius: '100px', background: '#9747FF', border: 'none' }}
>
  Submit
</Button>

                    </div>
                </div>
                <Modal show={showModal} onHide={handleCloseModal} centered>
  <Modal.Header closeButton>
    <Modal.Title>Attendance Submitted</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    Attendance has been successfully submitted!
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleCloseModal}>
      Close
    </Button>
  </Modal.Footer>
</Modal>

            </main>
            <style>
                {`
                .red-checkbox {
  background-color: red !important;
}

          /* Add this CSS to fix the border and alignment issue */
          .table td,
          .table th {
            vertical-align: middle;
          }

          .table td img {
            border-radius: 50%;
            margin-right: 10px;
            width:36px;
            height:36px;
          }

          .table tr {
            border-bottom: 1px solid #E5E7EB; /* Border for table rows */
          }

          .table td {
            border-bottom: 0px solid #E5E7EB; /* Border for table rows */
            color:#4B5563;
            font-weight:400;
            font-size:14px;
          }

          .table th {
            border-bottom: 1px solid #E5E7EB; /* Thicker border for headers */
            font-size:16px;
            font-weight:500;
            color:#111827;
          }

          .table td input[type="checkbox"] {
            width: 20px;
            height: 20px;
            border:1px solid #EAECF0;
            border-radius:6px;
          }

          /* CSS for changing background color of the checkbox on click */
          input[type="checkbox"]:checked {
            background-color: #9747FF; /* Set the background color to #9747FF */
            border-color: #9747FF; /* Make the border color the same */
          }

          @media (max-width: 768px) {
            table {
              font-size: 14px;
            }
            td {
              padding: 10px;
            }
            .btn {
              padding: 5px 10px;
              font-size: 12px;
            }
          }
        `}
            </style>
        </Container>
    );
}

export default AttendenceDetail;
