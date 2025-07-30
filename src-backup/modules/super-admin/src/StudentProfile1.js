import React, { useContext, useState } from "react";
import { Container, Row, Col, Form, Image, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

function StudentProfile() {
  const { userData } = useContext(UserContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // Sample student data
  const studentData = {
    firstName: "Muhammad",
    lastName: "Zubran",
    email: "asaju3243@gmail.com",
    password: "••••••••••••••",
    actualPassword: "password123", // This would normally come from a secure source
    phoneNumber: "+1233312-33",
    bloodGroup: "B+",
    dateOfBirth: "23/12/2025",
    gender: "Male",
    guardianName: "Demo Name",
    cnicNumber: "231313-1313131-2",
    relationship: "Father",
    postalCode: "12345",
    homeAddress: "Lahore Pakistan",
    pdfFile: "All file",
    pngFile: "All file"
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Common styles
  const labelStyle = {
    color: "#798294",
    fontFamily: "Inter",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 500,
    marginBottom: "6px"
  };

  const fieldStyle = {
    color: "#000",
    fontFamily: "Inter",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 400,
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #EAECF0",
    // backgroundColor: "#F9FAFB",
    width: "100%",
    marginBottom: "20px"
  };

  return (
    <Container fluid className="p-3">
      {/* Header */}
      <header className="d-flex justify-content-between align-items-center mb-4" id="syllabusheader">
        <div className="d-flex align-items-center" style={{ fontSize: '24px', fontWeight: '600' }}>
          <Image
            id="arrow-left"
            src="/assets/arrow-left.png"
            width={24}
            height={24}
            className="me-2"
            alt="Back Arrow"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(-1)}
          />
          <h4 className=" mb-0" style={{ fontSize: '24px', fontWeight: '600' }}>Student Profile</h4>
        </div>
        <div className="d-flex align-items-center" id="exam-avatar">
          <Image
            id="info-img"
            src={userData?.profile_pic || "/assets/avatar.jpeg"}
            alt="Profile"
            roundedCircle
            width={54}
            height={54}
            className="me-2"
          />
          <div>
            <div style={{ fontSize: "14px", fontWeight: "500", color: '#1F2937' }}>
              {userData?.full_name}
            </div>
            <div style={{ fontSize: "12px", color: "#9CA3AF", fontWeight: '400' }}>{userData?.admin_id}</div>
          </div>
        </div>
      </header>

      {/* Profile Content */}
      <Container className="profile" style={{ maxWidth: '100%' }}>
        {/* Profile Photo Section */}
        <div className="d-flex flex-column align-items-center mb-4">
          <div
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              overflow: "hidden",
              marginBottom: "16px",
              border: "1px solid #EAECF0"
            }}
          >
            <img
              src="/assets/profilee.png"
              alt="Profile"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <Button
            variant="link"
            style={{
              display: "flex",
              alignItems: "center",
              color: "#111827",
              textDecoration: "none",
              fontSize: "16px",
              fontWeight: "500",
              border: '1px solid #EAECF0', borderRadius: '8px'
            }}
          >
            <img
              src="/assets/editpic.png"
              alt="Edit"
              style={{ marginRight: "8px", width: "24px", height: "24px" }}
            />
            Edit photo
          </Button>
        </div>

        {/* Form Fields */}
        <Form>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label style={labelStyle}>First Name</Form.Label>
                <div style={fieldStyle}>
                  {studentData.firstName}
                </div>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label style={labelStyle}>Last Name</Form.Label>
                <div style={fieldStyle}>
                  {studentData.lastName}
                </div>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label style={labelStyle}>Email</Form.Label>
                <div style={fieldStyle}>
                  {studentData.email}
                </div>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label style={labelStyle}>Password</Form.Label>
                <div style={{
                  ...fieldStyle,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                  {showPassword ? studentData.actualPassword : studentData.password}
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer"
                    }}
                  >
                    <img
                      src={showPassword ? "/assets/resetpassword.png" : "/assets/resetpassword.png"}
                      alt={showPassword ? "Hide password" : "Show password"}
                      width="20"
                      height="20"
                    />
                  </button>
                </div>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label style={labelStyle}>Phone Number</Form.Label>
                <div style={fieldStyle}>
                  {studentData.phoneNumber}
                </div>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label style={labelStyle}>Blood Group</Form.Label>
                <div style={fieldStyle}>
                  {studentData.bloodGroup}
                </div>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label style={labelStyle}>Date of Birth</Form.Label>
                <div style={fieldStyle}>
                  {studentData.dateOfBirth}
                </div>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label style={labelStyle}>Gender</Form.Label>
                <div style={fieldStyle}>
                  {studentData.gender}
                </div>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label style={labelStyle}>Guardian Name</Form.Label>
                <div style={fieldStyle}>
                  {studentData.guardianName}
                </div>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label style={labelStyle}>CNIC Number</Form.Label>
                <div style={fieldStyle}>
                  {studentData.cnicNumber}
                </div>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label style={labelStyle}>Relationship</Form.Label>
                <div style={fieldStyle}>
                  {studentData.relationship}
                </div>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label style={labelStyle}>Postal Code</Form.Label>
                <div style={fieldStyle}>
                  {studentData.postalCode}
                </div>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-4">
            <Form.Label style={labelStyle}>Home Address</Form.Label>
            <div style={{
              ...fieldStyle,
              minHeight: "80px"
            }}>
              {studentData.homeAddress}
            </div>
          </Form.Group>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label style={labelStyle}>Pdf file</Form.Label>
                <div style={{
                  ...fieldStyle,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src="/assets/pdf.png"
                      alt="Download"
                      style={{ marginRight: "8px", width: "20px", height: "20px" }}
                    />
                    {studentData.pdfFile}
                  </div>
                  <img
                    src="/assets/eye.png"
                    alt="View"
                    style={{ width: "20px", height: "20px" }}
                  />
                </div>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label style={labelStyle}>Png file</Form.Label>
                <div style={{
                  ...fieldStyle,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src="/assets/pdf.png"
                      alt="Download"
                      style={{ marginRight: "8px", width: "20px", height: "20px" }}
                    />
                    {studentData.pngFile}
                  </div>
                  <img
                    src="/assets/eye.png"
                    alt="View"
                    style={{ width: "20px", height: "20px" }}
                  />
                </div>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Container>
    </Container>
  );
}

export default StudentProfile;