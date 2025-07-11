import React, { useState } from "react";
import { Container, Table, Image, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router-dom';

function Mycourse() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('inProgress');

  const inProgressCourses = [
    {
      courseID: 'AI101',
      name: 'Introduction to AI',
      enrolled: '25/6/2024',
      end: '25/6/2024',
      hours: 60,
      status: 'In Progress',
      instructor: 'Kevin Jone',
      schedule: 'Mon/Wed 10–11:30 AM',
      creditHours: 3,
      attendance: '87%'
    },
    {
      courseID: 'ENG205',
      name: 'English Literature',
      enrolled: '25/6/2024',
      end: '25/6/2024',
      hours: 45,
      status: 'In Progress',
      instructor: 'Sarah Brown',
      schedule: 'Tue/Thu 1–2:30 PM',
      creditHours: 2,
      attendance: '92%'
    },
    {
      courseID: 'CS110',
      name: 'Programming Basics',
      enrolled: '25/6/2024',
      end: '25/6/2024',
      hours: 45,
      status: 'In Progress',
      instructor: 'John Smith',
      schedule: 'Fri 9–10:30 AM',
      creditHours: 3,
      attendance: '78%'
    },
    {
      courseID: 'CS120',
      name: 'Advanced Programming',
      enrolled: '25/6/2024',
      end: '25/6/2024',
      hours: 45,
      status: 'In Progress',
      instructor: 'Lisa Kim',
      schedule: 'Mon/Wed 3–4:30 PM',
      creditHours: 4,
      attendance: '90%'
    }
  ];
  

  const pastCourses = [
    {
      courseID: 'AI101',
      name: 'Introduction to AI',
      enrolled: '1/1/2024',
      end: '1/4/2024',
      hours: 60,
      status: 'Completed',
      instructor: 'Dr. Sarah Malik',
      schedule: 'Mon/Wed 10–11:30 AM',
      creditHours: 3,
      assignmentScore: '5/5',
      quizScore: '5/5',
      grade: 'A+',
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
    },
    {
      courseID: 'rI101',
      name: 'Advanced Programming',
      enrolled: '1/2/2024',
      end: '1/4/2024',
      hours: 30,
      status: 'Completed',
      instructor: 'Dr. aiman',
      schedule: 'tue/Wed 10–11:30 AM',
      creditHours: 2,
      assignmentScore: '4/5',
      quizScore: '4/5',
      grade: 'A+',
      progress: {
        Quizes: [5, 4, 29, 5, 37],
        Assignments: [29, 5, 23, 29, 35],
        Presentations: [40, 2, 40, 35, 40],
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
    },
    // You can copy this structure for the rest
  ];


  const displayedCourses = activeTab === 'inProgress' ? inProgressCourses : pastCourses;

  const handleViewCourse = (course) => {
    const route = activeTab === 'inProgress' ? '/InprogressCourse' : '/PastCourse';
    navigate(route, { state: { course } });
  };

  return (
    <Container fluid className="p-16 d-flex" style={{ marginTop: '20px' }}>
      <main className="flex-grow-1" id="mycoursescreen">
        {/* Header Section */}
        <header className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center" id="calenderheading">
            {/* <Image
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
            <h1 className="m-0" style={{ fontSize: "24px", fontWeight: "600" }}>
              My Course
            </h1> */}
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              id="info-img"
              src="/assets/avatar.jpeg"
              alt="User"
              style={{
                borderRadius: '50%',
                width: '54px',
                height: '54px',
                marginRight: '10px',
              }}
            />
            <div style={{ marginRight: '10px' }}>
              <div style={{ fontWeight: '500', fontSize: '14px' }}>Jhon Deo</div>
              <div style={{ fontSize: '12px', color: '#6c757d' }}>123456</div>
            </div>
          </div>
        </header>

        {/* Month Filter and Search */}
        <header className="d-flex justify-content-between mb-4" id="mycourse-header">
          <div className="d-flex align-items-center" id="mycoursecal" style={{ border: '1px solid #D1D5DB', borderRadius: '8px', height: '35px', padding: '10px' }}>
            <Image
              src="/assets/calendar1.png"
              alt="Calendar Icon"
              width={20}
              height={20}
              className="me-2"
            />
            <span style={{ fontSize: "14px", fontWeight: "600" }}>December 2024</span>
          </div>

          <div className="d-flex" id="search-sort">
            <div className="position-relative me-3" style={{ flexGrow: 1 }} id="mycourseform">
              <Form.Control
                id="mycourse-search"
                type="text"
                placeholder="Search"
                style={{
                  borderRadius: "8px",
                  paddingLeft: "40px",
                  fontSize: '16px',
                  fontWeight: '400',
                  color: '#98A2B3',
                  borderColor: '#D1D5DB',
                  width: '300px'
                }}
              />
              <Image
                src="/assets/search-lg1.png"
                alt="Search Icon"
                width={20}
                height={20}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "12px",
                  transform: "translateY(-50%)"
                }}
              />
            </div>

            <Button
              className="d-flex align-items-center"
              style={{
                backgroundColor: "transparent",
                color: "#374151",
                border: "1px solid #D1D5DB",
                borderRadius: "8px",
                fontSize: '14px',
                fontWeight: '600'
              }}
            >
              <Image
                src="/assets/filter-lines1.png"
                alt="Sort Icon"
                width={16}
                height={16}
                className="me-2"
              />
              Sort
            </Button>
          </div>
        </header>

        {/* My Courses Section */}
        <Container fluid className="p-0" style={{ marginTop: '20px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '25px', color: '#101828' }}>My Courses</h2>

          <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap mycourse-tabs">
            <div className="d-flex">
              <Button
                onClick={() => setActiveTab('inProgress')}
                className="me-2"
                style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  padding: '8px 14px',
                  backgroundColor: activeTab === 'inProgress' ? '#111827' : 'transparent',
                  color: activeTab === 'inProgress' ? '#F9FAFB' : '#374151',
                  border: '1px solid #D1D5DB',
                  borderRadius: '8px'
                }}
              >
                In Progress
              </Button>
              <Button
                onClick={() => setActiveTab('past')}
                style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  padding: '8px 14px',
                  backgroundColor: activeTab === 'past' ? '#111827' : 'transparent',
                  color: activeTab === 'past' ? '#F9FAFB' : '#374151',
                  border: '1px solid #D1D5DB',
                  borderRadius: '8px'
                }}
              >
                Past
              </Button>
            </div>


            {activeTab === 'inProgress' && (
              <Button
                className="withdraw-btn"
                onClick={() => navigate('/Withdraw', { state: { courses: inProgressCourses } })}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '8px 14px',
                  flexDirection: 'row',
                  gap: '8px',
                  borderRadius: '8px',
                  background: '#9747FF',
                  color: '#FFF',
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: 600,
                  border: 'none'
                }}
              >
                <img
                  src="/assets/withdrawicon.png"
                  alt="Withdraw Icon"
                  style={{ width: '20px', height: '20px' }}
                />
                Withdraw
              </Button>


            )}


          </div>

          {/* Courses Table */}
          <div className="table-responsive">
            <Table borderless className="align-middle mycourse-table">
              <thead style={{ fontSize: '16px', fontWeight: '500', color: '#111827', height: '60px' }}>
                <tr>
                  <th>Course Name</th>
                  <th>Course ID</th>
                  <th>Enrolled Date</th>
                  <th>Total Hours</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody style={{ fontSize: '14px' }}>
                {displayedCourses.map((course, index) => (
                  <tr key={index} className="border-top border-bottom">
                    <td style={{ fontSize: '14px', fontWeight: '500', color: '#101828', lineHeight: '20px' }}>{course.name}</td>
                    <td style={{ fontSize: '14px', fontWeight: '400', color: '#4B5563' }}>{course.courseID}</td>
                    <td style={{ fontSize: '14px', fontWeight: '400', color: '#4B5563' }}>{course.enrolled}</td>
                    <td style={{ fontSize: '14px', fontWeight: '400', color: '#4B5563' }}>{course.hours}</td>
                    <td>
                      <span
                        className="d-flex align-items-center"
                        style={{
                          fontSize: '12px',
                          fontWeight: '500',
                          color: '#1C222E'
                        }}
                      >
                        <span
                          className="rounded-circle me-1 status-dot"
                          style={{
                            width: '8px',
                            height: '8px',
                            backgroundColor: course.status === 'In Progress' ? '#FDB022' : '#10B981'
                          }}
                        ></span>
                        {course.status}
                      </span>
                    </td>

                    <td>
                      <Button
                        className="view-btn"
                        onClick={() => handleViewCourse(course)}
                        style={{
                          display: 'flex',
                          width: '90px',
                          height: '36px',
                          padding: '10px',
                          justifyContent: 'center',
                          alignItems: 'center',
                          gap: '10px',
                          borderRadius: '100px',
                          background: '#9747FF',
                          color: '#FFF',

                          fontSize: '14px',
                          fontStyle: 'normal',
                          fontWeight: '500',
                          lineHeight: 'normal',
                          border: 'none'
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
        </Container>

        {/* Responsive Styling */}
        <style jsx>{`
          @media (max-width: 767px) {
            .mycourse-tabs {
              flex-direction: row !important;
              align-items: flex-start !important;
              gap: 12px;
            }

           

            .table-responsive {
              margin-top: 10px;
            }

            .mycourse-table {
              margin-top: 10px;
            }

            .mycourse-table th,
            .mycourse-table td {
              font-size: 13px !important;
              padding: 12px 10px !important;
            }

            .mycourse-table tr {
              margin-bottom: 12px;
              border-bottom: 1px solid #f0f0f0;
            }

            .mycourse-table .status-dot {
              width: 6px !important;
              height: 6px !important;
            }

            .mycourse-table .view-btn {
              width: 100% !important;
              font-size: 13px;
              padding: 6px;
            }
              
          }
        `}</style>
      </main>
    </Container>
  );
}

export default Mycourse;
