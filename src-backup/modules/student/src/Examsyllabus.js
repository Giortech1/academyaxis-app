import React, { useContext } from "react";
import { Container, Row, Col, Card, Button, Image } from "react-bootstrap";
// import Sidebar from "./Leftside";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";


const Examsyllabus = () => {
  const { userData } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <div className="d-flex">
      {/* Left Sidebar */}
      {/* <Sidebar activeButton={3} setActiveButton={() => {}} /> */}

      {/* Main Content */}
      <Container fluid className="p-3" id="exsyllabus">
        {/* Header */}
        <header className="d-flex justify-content-between align-items-center mb-4" id="syllabusheader">
          <div id="examsyllabus" className="d-flex align-items-center">
            <Image
              id="arrow-left"
              src="/assets/arrow-left.png"
              roundedCircle
              width={24}
              height={24}
              className="me-2"
              alt="Back Arrow"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(-1)}
            />
            <h4 className="fw-bold mb-0">Math Syllabus for Exams</h4>
          </div>
          <div className="d-flex align-items-center" id="exam-avatar">
            <Image
              id="info-img"
              src={userData?.profile_pic || "/assets/avatar.jpeg"} // Replace with profile avatar image
              alt="Profile"
              roundedCircle
              width={54}
              height={54}
              className="me-2"
            />
            <div>
              <div style={{ fontSize: "14px", fontWeight: "500" }}>
                {userData?.full_name}
              </div>
              <div style={{ fontSize: "12px", color: "#6c757d" }}>{userData?.student_id}</div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <Row className="p-3">
          {/* Syllabus Section */}
          <Col md={8} style={{ border: '1px solid #EAECF0', borderRadius: '12px' }}>
            <Card className="p-2 border-0 shadow-sm">
              {[
                "Chapter 1",
                "Chapter 2",
                "Chapter 3",
                "Chapter 4",
              ].map((chapter, index) => (
                <div key={index} className="mb-4">
                  <h5
                    style={{
                      fontWeight: "600",
                      fontSize: "16px",
                      marginBottom: "8px",

                    }}
                  >
                    • {chapter}
                  </h5>
                  <p style={{ fontSize: "14px", color: "#475467" }}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Explicabo, repellendus cupiditate cumque sit amet maiores
                    inventore labore ullam rerum quae.
                  </p>
                  <p style={{ fontSize: "14px", color: "#475467" }}>
                    Sit ipsum dolor eos vel delectus velit nihil. Blanditiis
                    quam nisi rem laudantium dolorum voluptatem!
                  </p>
                </div>
              ))}
            </Card>
          </Col>

          {/* Teacher Notes */}
          <Col md={4}>
            <Card className="p-3 " style={{border:'1px solid #EAECF0', borderRadius:'12px'}}>
              <h5 className="fw-bold mb-3">Notes from Teacher</h5>
              <ul
                style={{
                  listStyleType: "none",
                  padding: "0",
                  fontSize: "14px",
                }}
              >
                {[
                  "Learn questions from the exercise of chapter",
                  "Revise the core concepts of all topics",
                  "Solve past exam papers for practice",
                ].map((note, index) => (
                  <li key={index} className="d-flex mb-2">
                    <span
                      className="me-2"
                      style={{
                        width: "6px",
                        height: "6px",
                        backgroundColor: "#101828",
                        borderRadius: "50%",
                        marginTop: "8px",
                      }}
                    ></span>
                    {note}
                  </li>
                ))}
              </ul>

              {/* Teacher Info */}
              <div className="d-flex align-items-center mt-3">
                <Image
                  src="/assets/avatar.png" // Replace with teacher avatar image
                  alt="Teacher"
                  roundedCircle
                  width={40}
                  height={40}
                  className="me-3"
                />
                <div>
                  <div style={{ fontSize: "14px", fontWeight: "600" }}>
                    Arsalan Mushtaq
                  </div>
                  <div style={{ fontSize: "12px", color: "#6c757d" }}>
                    Teacher
                  </div>
                </div>
              </div>
              <div style={{borderBottom:'1px solid #EAECF0', marginTop:'10px'}}></div>

              {/* Request Message Button */}
              <Button
                variant="dark"
                className="mt-4 d-flex align-items-center justify-content-center"
                style={{ borderRadius: "12px", width: 'auto' }}
              >
                <img
                  src="/assets/messages-3.png" // Replace with message icon
                  alt="Message"
                  width={18}
                  className="me-2"
                />
                Request Message
              </Button>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Examsyllabus;
