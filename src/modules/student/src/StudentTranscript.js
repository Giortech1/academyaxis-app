import React, { useState } from 'react';
import { Image, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // <-- Import useNavigate

const StudentTranscript = () => {
  // Initialize useNavigate hook
  const navigate = useNavigate(); // <-- Use the navigate hook

  // Dynamic Data Example (You can replace this with fetched data)
  const [transcriptData, setTranscriptData] = useState([
    {
      semester: 'Semester 1',
      courses: [
        { courseTitle: 'Demo Subject', grade: 70 },
        { courseTitle: 'Demo Subject', grade: 88 },
        { courseTitle: 'Demo Subject', grade: 96 },
        { courseTitle: 'Demo Subject', grade: 72 },
        { courseTitle: 'Demo Subject', grade: 84 },
        { courseTitle: 'Demo Subject', grade: 84 },
      ],
      gpa: 3.5,
      cgpa: 4.0,
    },
    {
      semester: 'Semester 2',
      courses: [
        { courseTitle: 'Demo Subject', grade: 70 },
        { courseTitle: 'Demo Subject', grade: 88 },
        { courseTitle: 'Demo Subject', grade: 96 },
        { courseTitle: 'Demo Subject', grade: 72 },
        { courseTitle: 'Demo Subject', grade: 84 },
        { courseTitle: 'Demo Subject', grade: 84 },
      ],
      gpa: 4.0,
      cgpa: 4.0,
    },
    {
      semester: 'Semester 3',
      courses: [
        { courseTitle: 'Demo Subject', grade: 70 },
        { courseTitle: 'Demo Subject', grade: 88 },
        { courseTitle: 'Demo Subject', grade: 96 },
        { courseTitle: 'Demo Subject', grade: 72 },
        { courseTitle: 'Demo Subject', grade: 84 },
        { courseTitle: 'Demo Subject', grade: 84 },
      ],
      gpa: 4.0,
      cgpa: 4.0,
    },
    {
      semester: 'Semester 4',
      courses: [
        { courseTitle: 'Demo Subject', grade: 70 },
        { courseTitle: 'Demo Subject', grade: 88 },
        { courseTitle: 'Demo Subject', grade: 96 },
        { courseTitle: 'Demo Subject', grade: 72 },
        { courseTitle: 'Demo Subject', grade: 84 },
        { courseTitle: 'Demo Subject', grade: 84 },
      ],
      gpa: 4.0,
      cgpa: 4.0,
    },
    {
      semester: 'Semester 5',
      courses: [
        { courseTitle: 'Demo Subject', grade: 70 },
        { courseTitle: 'Demo Subject', grade: 88 },
        { courseTitle: 'Demo Subject', grade: 96 },
        { courseTitle: 'Demo Subject', grade: 72 },
        { courseTitle: 'Demo Subject', grade: 84 },
        { courseTitle: 'Demo Subject', grade: 84 },
      ],
      gpa: 4.0,
      cgpa: 4.0,
    },
    {
        semester: 'Semester 6',
        courses: [
          { courseTitle: 'Demo Subject', grade: 70 },
          { courseTitle: 'Demo Subject', grade: 88 },
          { courseTitle: 'Demo Subject', grade: 96 },
          { courseTitle: 'Demo Subject', grade: 72 },
          { courseTitle: 'Demo Subject', grade: 84 },
          { courseTitle: 'Demo Subject', grade: 84 },
        ],
        gpa: 4.0,
        cgpa: 4.0,
      },
      {
        semester: 'Semester 7',
        courses: [
          { courseTitle: 'Demo Subject', grade: 70 },
          { courseTitle: 'Demo Subject', grade: 88 },
          { courseTitle: 'Demo Subject', grade: 96 },
          { courseTitle: 'Demo Subject', grade: 72 },
          { courseTitle: 'Demo Subject', grade: 84 },
          { courseTitle: 'Demo Subject', grade: 84 },
        ],
        gpa: 4.0,
        cgpa: 4.0,
      },
      {
        semester: 'Semester 8',
        courses: [
          { courseTitle: 'Demo Subject', grade: 70 },
          { courseTitle: 'Demo Subject', grade: 88 },
          { courseTitle: 'Demo Subject', grade: 96 },
          { courseTitle: 'Demo Subject', grade: 72 },
          { courseTitle: 'Demo Subject', grade: 84 },
          { courseTitle: 'Demo Subject', grade: 84 },
        ],
        gpa: 4.0,
        cgpa: 4.0,
      },
  ]);

  return (
    <div className="container p-3" style={{ maxWidth: '100%' }}>
      {/* Header Section */}
      <header className="d-flex justify-content-between align-items-center mb-4">
        {/* Heading */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Image
            id="arrow-left"
            src="/assets/arrow-left.png"
            roundedCircle
            width={24}
            height={24}
            className="me-2"
            alt="Back"
            onClick={() => navigate(-1)}  // <-- Use the navigate function here
            style={{ cursor: 'pointer' }}
          />
          <h1 className="semester-heading">GPA</h1>
        </div>

        {/* User Info */}
        <div className="d-flex align-items-center">
          <Image
            id="info-img"
            src="/assets/avatar.jpeg"
            roundedCircle
            width={54}
            height={54}
            className="me-2"
            alt="User Avatar"
          />
          <div className="me-2">
            <div style={{ fontWeight: "500", fontSize: "14px" }}>John Deo</div>
            <div style={{ fontSize: "12px", color: "#6c757d" }}>123456</div>
          </div>
        
        </div>
      </header>

      {/* Grid for Semesters */}
      <div className="row">
        {transcriptData.map((semester, index) => (
          <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={index}>
            <div className="card custom-card">
              <div className="card-body">
                <h5 className="semester-title">{semester.semester}</h5>
                {semester.courses.map((course, courseIndex) => (
                  <p key={courseIndex} className="course-title">
                    {course.courseTitle} <span className="subject-marks">{course.grade}</span>
                  </p>
                ))}
                <hr />
                <div className="gpa-text">
                  <strong style={{color:'#000'}}>GPA</strong> <span className="gpa-value">{semester.gpa}</span>
                </div>
                <div className="cgpa-text">
                  <strong style={{color:'#475467'}}>CGPA</strong> <span className="cgpa-value">{semester.cgpa}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        /* Custom Styles */
        .semester-heading {
          color: #000;
          font-family: Inter;
          font-size: 24px;
          font-weight: 600;
          
          margin-bottom:0px;
        }

        .semester-title {
          color: #000;
          font-family: Inter;
          font-size: 18px;
          font-weight: 600;
          line-height: 24px; /* 133.333% */
          background: #FFF;
        }

        .course-title {
          color: #4B5563;
          font-family: Inter;
          font-size: 16px;
          font-weight: 500;
          line-height: 24px; /* 150% */
          display:flex;
          justify-content:space-between;
        }

        .subject-marks {
          color: #000;
          font-family: Inter;
          font-size: 16px;
          font-weight: 500;
          line-height: 24px; /* 150% */
        }

        .gpa-text {
          color: #22C55E;
          font-family: Inter;
          font-size: 16px;
          font-weight: 500;
          line-height: 24px; /* 150% */
              display: flex
;
    justify-content: space-between;
    margin-bottom:15px;
        }

        .gpa-value {
          color: #22C55E;
          font-family: Inter;
          font-size: 18px;
          font-weight: 500;
          line-height: 24px; /* 133.333% */
        }

        .cgpa-text {
          color: #475467;
          font-family: Inter;
          font-size: 16px;
          font-weight: 500;
          line-height: 24px; /* 150% */
              display: flex
;
    justify-content: space-between;
        }

        .cgpa-value {
          color: #475467;
          font-family: Inter;
          font-size: 18px;
          font-weight: 600;
          line-height: 24px; /* 133.333% */
        }

        .card.custom-card {
          border-radius: 12px;
          border: 1px solid #E5E7EB;
          background-color: #FFF;
          
        }
      `}</style>
    </div>
  );
};

export default StudentTranscript;
