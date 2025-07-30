import React, { useContext, useState } from "react";
import { Container, Table, Button, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from "./UserContext";


function WithdrawPage() {
    const { userData } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();
  
    const passedCourses = location.state?.courses || [];
  
    const [courses, setCourses] = useState(() => {
        const defaultCourses = [
          { id: 1, courseID: 'AI101', name: 'Introduction to AI', enrolled: '25/6/2024', hours: 60, withdrawn: false, attendance: '87%' },
          { id: 2, courseID: 'ENG205', name: 'English Literature', enrolled: '25/6/2024', hours: 45, withdrawn: true, attendance: '92%' },
          { id: 3, courseID: 'CS110', name: 'Programming Basics', enrolled: '25/6/2024', hours: 45, withdrawn: false, attendance: '78%' },
        ];
      
        const mergedCourses = passedCourses?.length
          ? passedCourses.map((course, index) => ({
              ...course,
              id: index + 1,
              withdrawn: false,
            }))
          : defaultCourses;
      
        return mergedCourses;
      });
      

    const handleWithdraw = (id) => {
        setCourses(prev =>
            prev.map(course =>
                course.id === id ? { ...course, withdrawn: true } : course
            )
        );
    };

    return (
        <Container fluid className="p-4" style={{ marginTop: '5px' }}>
            <main>
                {/* Header Section */}
                <header className="d-flex justify-content-between align-items-center mb-4">
                    <div className="d-flex align-items-center" id="calenderheading">
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
                        <h1 className="m-0" style={{ fontSize: "24px", fontWeight: "600" }}>
                            My Course
                        </h1>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img
                            id="info-img"
                            src={userData?.profile_pic || "/assets/avatar.jpeg"}
                            alt="User"
                            style={{
                                borderRadius: '50%',
                                width: '54px',
                                height: '54px',
                                marginRight: '10px',
                            }}
                        />
                        <div style={{ marginRight: '10px' }}>
                            <div style={{ fontWeight: '500', fontSize: '14px' }}>{userData?.full_name}</div>
                            <div style={{ fontSize: '12px', color: '#6c757d' }}>{userData?.admin_id}</div>
                        </div>
                    </div>
                </header>
                {/* Page Heading */}
                <h5 style={{ fontWeight: 600, fontSize: "20px", color: '#101828', marginBottom: "30px" }}>Withdraw</h5>

                {/* Courses Table */}
                <div className="table-responsive">
                    <Table borderless className="align-middle mycourse-table">
                        <thead style={{ fontSize: '16px', fontWeight: '500', color: '#111827' }}>
                            <tr>
                                <th>Course Name</th>
                                <th>Course ID</th>
                                <th>Enrolled Date</th>
                                <th>Total Hours</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody style={{ fontSize: '14px' }}>
                            {courses.map(course => (
                                <tr key={course.id} className="border-top" style={{height:'60px'}}>
                                    <td style={{ fontSize: '14px', fontWeight: '500', color: '#101828' }}>{course.name}</td>
                                    <td style={{ fontSize: '14px', fontWeight: '400', color: '#4B5563' }}>{course.courseID}</td>
                                    <td style={{ fontSize: '14px', fontWeight: '400', color: '#4B5563' }}>{course.enrolled}</td>
                                    <td style={{ fontSize: '14px', fontWeight: '400', color: '#4B5563' }}>{course.hours}</td>
                                    <td>
                                        {course.withdrawn ? (
                                            <Button
                                                variant="danger"
                                                disabled
                                                style={{
                                                    backgroundColor: '#D92D20',
                                                    color: '#FFFFFF',
                                                    border: 'none',
                                                    borderRadius: '100px',
                                                    fontSize: '14px',
                                                    fontWeight: 500,
                                                    padding: '8px 20px', // Slightly more padding for pill shape
                                                    height: '36px',
                                                    lineHeight: '20px'
                                                }}
                                            >
                                                Withdrawn
                                            </Button>
                                        ) : (
                                            <Button
                                                onClick={() => handleWithdraw(course.id)}
                                                style={{
                                                    backgroundColor: '#FFFFFF',
                                                    color: '#D92D20',
                                                    border: '1px solid #D92D20',
                                                    borderRadius: '100px',
                                                    fontSize: '14px',
                                                    fontWeight: 500,
                                                    padding: '8px 20px',
                                                    height: '36px',
                                                    lineHeight: '20px'
                                                }}
                                            >
                                                Withdraw
                                            </Button>
                                        )}
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>

                {/* Responsive Styling */}
                <style jsx>{`
          @media (max-width: 767px) {
            .mycourse-table th,
            .mycourse-table td {
              font-size: 13px !important;
              padding: 12px 10px !important;
            }

            .mycourse-table tr {
              margin-bottom: 12px;
              border-bottom: 1px solid #f0f0f0;
            }

            .mycourse-table button {
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

export default WithdrawPage;
