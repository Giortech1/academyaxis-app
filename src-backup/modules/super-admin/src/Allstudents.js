import React, { useState, useEffect } from "react";
import { Container, Button, Table, Image, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

function StudentsInDemoSection() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [students, setStudents] = useState([]);
  
  // Initialize data on component mount
  useEffect(() => {
    // Generate demo students
    const demoStudents = [];
    for (let i = 1; i <= 17; i++) {
      demoStudents.push({
        id: i,
        name: "Demo Name",
        rollNo: "12345678",
        section: "Section- II",
        subject: "ICS",
        totalCGPA: "4.3",
        profileImage: `/assets/Avatar${(i % 5) + 3}.png`
      });
    }
    setStudents(demoStudents);
  }, []);
  
  // Handle search functionality
  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  // Handle view student
 const handleViewStudent = (student) => {
  // Navigate to student detail view
  navigate(`/student-profile/${student.id}`, { state: { student } });
  console.log("View student", student);
};
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
              width={24}
              height={24}
              className="me-2"
              alt="Back Arrow"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(-1)}
            />
            <h1 style={{ fontSize: "24px", margin: 0, fontWeight: "600" }}>Students In Demo Section</h1>
          </div>

          {/* Right side: User Info */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src="/assets/avatar.jpeg"
              alt="User"
              style={{ borderRadius: "50%", width: "44px", height: "44px", marginRight: "10px" }}
            />
            <div style={{ marginRight: "10px" }}>
              <div style={{ fontWeight: "500", fontSize: "14px" }}>Mian Hamad Khalil</div>
              <div style={{ fontSize: "12px", color: "#6c757d" }}>12345200</div>
            </div>
           
          </div>
        </header>

        {/* Secondary Header with All Students Button and Search */}
        <header className="d-flex justify-content-between align-items-center mb-4" style={{ marginTop: "15px" }}>
          {/* Left Section: All Students Button */}
          <div>
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
              }}
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

          {/* Right Section: Search Bar */}
          <div className="d-flex align-items-center">
            {/* Search Bar */}
            <div className="position-relative">
              <Form.Control
                type="text"
                placeholder="Search"
                value={searchText}
                onChange={handleSearch}
                style={{
                  borderRadius: "8px",
                  paddingLeft: "40px",
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#98A2B3",
                  border: "1px solid #D1D5DB",
                  width: "250px",
                }}
              />
              <Image
                src="/assets/search-lg.png"
                alt="Search Icon"
                width={16}
                height={16}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "12px",
                  transform: "translateY(-50%)",
                }}
              />
            </div>
          </div>
        </header>

        {/* Main Table Section */}
        <div 
          className="border" 
          style={{ 
            border: '1px solid #EAECF0', 
            borderRadius: '12px',
            overflow: 'hidden'
          }}
        >
          <Table
            hover
            className="mb-0"
            style={{
              color: "#4B5563",
              fontFamily: "Inter",
              fontSize: "16px",
              fontWeight: "500",
              width: "100%"
            }}
          >
            <thead
              style={{
                background: "#FFFFFF",
                zIndex: 1,
                fontStyle: 'normal',
                color: '#111827',
                fontSize: '16px',
                fontWeight: '500',
                fontFamily: 'inter',
                borderBottom: '1px solid #EAECF0'
              }}
            >
              <tr>
                <th style={{ fontSize: '16px', fontWeight: '500', color: '#111827', padding:'20px 12px' }}>Students</th>
                <th style={{ fontSize: '16px', fontWeight: '500', color: '#111827',padding:'20px 12px' }}>Roll no</th>
                <th style={{ fontSize: '16px', fontWeight: '500', color: '#111827', padding:'20px 12px' }}>Section</th>
                <th style={{ fontSize: '16px', fontWeight: '500', color: '#111827', padding:'20px 12px' }}>Subject</th>
                <th style={{ fontSize: '16px', fontWeight: '500', color: '#111827', padding:'20px 12px' }}>Total CGPA</th>
                <th style={{ fontSize: '16px', fontWeight: '500', color: '#111827', padding:'20px 12px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr
                  key={student.id}
                  style={{
                    lineHeight: "60px",
                    fontSize: "14px",
                    fontWeight: "400",
                    color: "#4B5563",
                    fontStyle: "normal",
                    borderBottom: '1px solid #EAECF0'
                  }}
                >
                  <td style={{ verticalAlign: "middle", fontSize: '14px', fontWeight: '500', color: '#111827' }}>
                    <div className="d-flex align-items-center">
                      <img
                        src={student.profileImage}
                        alt={student.name}
                        style={{ 
                          borderRadius: "50%", 
                          width: "36px", 
                          height: "36px", 
                          marginRight: "8px",
                          objectFit: "cover"
                        }}
                      />
                      {student.name}
                    </div>
                  </td>
                  <td style={{ verticalAlign: "middle", fontSize: '14px', fontWeight: '400', color: '#4B5563' }}>{student.rollNo}</td>
                  <td style={{ verticalAlign: "middle", fontSize: '14px', fontWeight: '400', color: '#4B5563' }}>{student.section}</td>
                  <td style={{ verticalAlign: "middle", fontSize: '14px', fontWeight: '400', color: '#4B5563' }}>{student.subject}</td>
                  <td style={{ verticalAlign: "middle", fontSize: '14px', fontWeight: '400', color: '#4B5563' }}>
                    <span style={{ color: "#22C55E", fontSize:'16px', fontWeight:'500' }}>{student.totalCGPA}</span>
                  </td>
                  <td style={{ verticalAlign: "middle" }}>
                    <Button
                      onClick={() => handleViewStudent(student)}
                      style={{
                        backgroundColor: "#8B5CF6",
                        border: "none",
                        borderRadius: "20px",
                        padding: "6px 20px",
                        fontSize: "14px",
                        fontWeight: "500"
                      }}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </main>

      <style>
        {`
          .table tr:hover {
            background-color: #F9FAFB;
          }
          
         
        `}
      </style>
    </Container>
  );
}

export default StudentsInDemoSection;