import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { Table, Form, Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


function TeacherQuizzesDetails() {
    const { id } = useParams(); // Get quiz ID from route parameters
    const navigate = useNavigate();


    // Sample data for students
    const studentsData = Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        name: "Demo Name",
        rollNo: `12345${i + 1}`,
        date: "19-Feb-2024",
        totalMarks: 25,
        obtainedMarks: 0,
        avatar: "/assets/Ayesha.png",
    }));
    const [students, setStudents] = useState(studentsData);

  // Function to handle the edit button
  const handleEdit = (id) => {
    // You can replace this with the actual editing logic (e.g., opening a modal)
    alert(`Edit student with ID: ${id}`);
  };

  // Function to handle the delete button
  const handleDelete = (id) => {
    // Remove the student from the students array
    setStudents(students.filter((student) => student.id !== id));
  };

    return (
        <div className="d-flex">


            {/* Main Content */}
            <main style={{ flex: 1, padding: "20px", backgroundColor: "#F9FAFB" }}>
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
                            Demo Quiz
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

                <header className="d-flex justify-content-between align-items-center mb-4">


                    {/* Right Section: Search Bar, Sort, and Button */}
                    <div className="d-flex align-items-center w-100">
                        {/* Search Bar */}
                        <div className="position-relative me-3">
                            <Form.Control
                                type="text"
                                placeholder="Search"
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
                            className="d-flex align-items-center me-3"
                            style={{
                                backgroundColor: "white",
                                color: "#374151",
                                border: "1px solid #D1D5DB",
                                borderRadius: "8px",
                                fontSize: "14px",
                                fontWeight: "500",
                                padding: "8px 12px",
                            }}
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

                        {/* Spacer */}
                        <div className="ms-auto">
                            {/* Save Button */}
                            <Button
                                className="d-flex align-items-center"
                                style={{
                                    backgroundColor: "#101828",
                                    color: "white",
                                    borderRadius: "8px",
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    padding: "8px 16px",
                                    border: "none",
                                    width: '80px',
                                    justifyContent: 'center'
                                }}

                            >
                                Save
                            </Button>
                        </div>
                    </div>
                </header>

                <div style={{ backgroundColor: "#FFFFFF", borderRadius: "8px" }}>
      <Table className="mb-0" style={{ width: "100%" }}>
        <thead style={{ backgroundColor: "#F9FAFB", borderBottom: "1px solid #E5E7EB" }}>
          <tr>
            <th style={{ padding: "12px", textAlign: "left" }}>Students</th>
            <th style={{ padding: "12px", textAlign: "left" }}>Roll No.</th>
            <th style={{ padding: "12px", textAlign: "left" }}>Date</th>
            <th style={{ padding: "12px", textAlign: "left" }}>Total Marks</th>
            <th style={{ padding: "12px", textAlign: "left" }}>Obtained Marks</th>
            <th style={{ padding: "12px", textAlign: "left" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id} style={{ height: "60px", borderBottom: "1px solid #E5E7EB" }}>
              <td className="d-flex align-items-center" style={{ padding: "12px", color: '#101828', fontWeight: '500', border: "none" }}>
                <img src={student.avatar} alt="Avatar" style={{ width: "36px", height: "36px", borderRadius: "50%", marginRight: "10px" }} />
                {student.name}
              </td>
              <td style={{ padding: "12px", fontSize: '14px', fontWeight: '400', color: '#4B5563' }}>{student.rollNo}</td>
              <td style={{ padding: "12px", fontSize: '14px', fontWeight: '400', color: '#4B5563' }}>{student.date}</td>
              <td style={{ padding: "12px", fontSize: '14px', fontWeight: '400', color: '#4B5563' }}>{student.totalMarks}</td>
              <td style={{ padding: "12px", fontSize: '14px', fontWeight: '400', color: '#4B5563' }}>
                <span style={{ cursor: "pointer", color: "#4B5563", textDecoration: "underline" }}>
                  {student.obtainedMarks}
                </span>
              </td>
              <td style={{ padding: "12px" }}>
                <div className="d-flex align-items-center">
                  {/* Edit Button */}
                  <div style={{ border: '1px solid #EAECF0', borderRadius: '50%', height: '32px', width: '32px', marginRight: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img
                      src="/assets/edit-2.png"
                      alt="Edit"
                      style={{ width: "20px", height: "20px", cursor: "pointer" }}
                      onClick={() => handleEdit(student.id)} // Edit functionality
                    />
                  </div>

                  {/* Trash Button */}
                  <div style={{ border: '1px solid #EAECF0', borderRadius: '50%', height: '32px', width: '32px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img
                      src="/assets/trash.png"
                      alt="Trash"
                      style={{ width: "20px", height: "20px", cursor: "pointer" }}
                      onClick={() => handleDelete(student.id)} // Delete functionality
                    />
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>




            </main>
        </div>
    );
}

export default TeacherQuizzesDetails;
