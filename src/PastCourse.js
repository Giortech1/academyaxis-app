import React from "react";
import { Container, Table, Image, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useLocation } from 'react-router-dom';

function PastCourse() {
  const navigate = useNavigate();
  const location = useLocation();

  // Receive course from previous screen or use fallback demo data
  const course = location.state?.course || {
    name: "Introduction to AI",
    courseID: "AI101",
    instructor: "Dr. Sarah Malik",
    schedule: "Mon/Wed 10–11:30 AM",
    creditHours: 3,
    status: "Completed",
    assignmentScore: "5/5",
    quizScore: "5/5",
    grade: "A+",
    progress: {
      Quizes: [35, 40, 29, 35, 37],
      Assignments: [29, 35, 23, 29, 35],
      Presentations: [40, 29, 40, 35, 40],
      "Mid Term Exam": ["-", "-", "-", "-", "-"],
      "Final Exam": ["-", "-", "-", "-", "-"]
    },
    totalScores: {
      Quizes: 35,
      Assignments: 40,
      Presentations: 29,
      "Mid Term Exam": 20,
      "Final Exam": 50
    }
  };




  return (
    <Container fluid className="px-3  py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center">
          <Image
            src="/assets/arrow-left.png"
            alt="Back"
            width={20}
            height={20}
            className="me-2"
            onClick={() => navigate(-1)}
            style={{ cursor: 'pointer' }}
          />
          <h4 className="mb-0" style={{ fontWeight: 600 }}>My Courses</h4>
        </div>
        <div className="d-flex align-items-center">
          <img
            src="/assets/avatar.jpeg"
            alt="User"
            style={{
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              marginRight: '10px'
            }}
          />
          <div>
            <div style={{ fontWeight: '500', fontSize: '14px' }}>Mian Hamad Khalil</div>
            <div style={{ fontSize: '12px', color: '#6c757d' }}>14785200</div>
          </div>
        </div>
      </div>

      {/* Title */}
      <h5 style={{ fontWeight: "600", marginBottom: "40px", color: '#101828' }}>{course.name}</h5>

      {/* Table */}
      {/* Grade Summary Table */}
      <div className="table-responsive mt-4">
        <Table borderless className="align-middle">
          <thead style={{ fontSize: "16px", fontWeight: "500", color: "#111827" }}>
            <tr>
              <th>Subject Name</th>
              <th>Subject Code</th>
              <th>Instructor</th>
              <th>Assignment</th>
              <th>Quiz</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody style={{ fontSize: "14px", fontWeight: '400', color: "#111827" }}>
            <tr className="border-top"  >
              <td>{course.name}</td>
              <td>{course.courseID}</td>
              <td>{course.instructor}</td>
              <td>{course.assignmentScore}</td>
              <td>{course.quizScore}</td>
              <td>{course.grade}</td>
            </tr>
          </tbody>
        </Table>
      </div>
      {/* Progress Breakdown Table */}
      <div className="mt-4 progress-table-wrapper">
        <h6 className="progress-title" >Progress</h6>
        <div className="table-responsive">
          <Table className="progress-table" borderless>
            <thead style={{ fontSize: '16px', fontWeight: '500', color: 'black' }}>
              <tr>
                <th className="text-start">Type</th>
                {[1, 2, 3, 4, 5].map(i => <th key={i}>{i}</th>)}
                <th>Total</th>
              </tr>
            </thead>
            <tbody className="progress-table-body">
              {course.progress && Object.entries(course.progress).map(([type, values]) => (
                <tr key={type}>
                  <td className="type-cell">{type}</td>
                  {values.map((v, i) => (
                    <td key={i}>{v !== undefined && v !== null ? v : "-"}</td>
                  ))}
                  <td>{course.totalScores?.[type] || "-"}</td>
                </tr>
              ))}
            </tbody>

          </Table>
        </div>
      </div>


      <div >
        {/* Header Section */}



      </div>

      {/* Responsive Style */}
      <style jsx>{`
       .progress-table-wrapper {
    border: 1px solid #EAECF0;
    border-radius: 12px;
    padding: 10px;
    background-color: #ffffff;
  }

  .progress-title {
    font-weight: 600;
    font-size: 20px;
    color:#111827;
    margin-bottom: 16px;
  }
.progress-table-body {
  font-size: 14px;
  font-weight: 400;
  color: #4B5563 !important;
}

  .progress-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
    text-align: center;
  }

  .progress-table thead tr {
    background-color: #F9FAFB;
    font-weight: 600;
    color: #101828;
  }

  .progress-table th, .progress-table td {
    padding: 18px;
    vertical-align: middle;
  }

  .progress-table tbody tr {
    border-top: 1px solid #F2F4F7;
  }

 .type-cell {
  text-align: left;
  font-weight: 500;
  color: #101828;
  padding-left: 16px;
}


  @media (max-width: 768px) {
    .progress-table th, .progress-table td {
      padding: 10px 8px;
    }
  }
    
        @media (max-width: 767px) {
          table {
            font-size: 13px;
          }
          th, td {
            padding: 10px 8px !important;
            white-space: nowrap;
          }
        }
      `}</style>
    </Container>
  );
}

export default PastCourse;
