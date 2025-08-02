import React, { useContext } from 'react';
import { Container, Row, Col, Card, Table, Image, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';


function TeacherStudents() {
    const { userData } = useContext(UserContext);
    const navigate = useNavigate();

    const studentData = {
        name: "Ayesha khan",
        studentId: "2024-2456789",
        course: "BSCS",
        attendance: 96,
        assignments: [
            { name: "Assignment 1", dueDate: "25/6/2024", submitDate: "25/6/2024", marks: "9/10" },
            { name: "Assignment 2", dueDate: "25/6/2024", submitDate: "25/6/2024", marks: "7/10" },
            { name: "Assignment 3", dueDate: "25/6/2024", submitDate: "Not Submitted", marks: "0/10" },
            { name: "Assignment 4", dueDate: "-", submitDate: "-", marks: "-" },
        ],
        quizzes: [
            { name: "Quiz 1", dueDate: "25/6/2024", submitDate: "25/6/2024", marks: "9/10" },
            { name: "Quiz 2", dueDate: "25/6/2024", submitDate: "25/6/2024", marks: "7/10" },
            { name: "Quiz 3", dueDate: "25/6/2024", submitDate: "Not Attempt", marks: "0/10" },
            { name: "Quiz 4", dueDate: "-", submitDate: "-", marks: "-" },

        ],
        results: [
            { examName: "Mid-Term Exam", examDate: "26-04-2025", totalMarks: 30, obtainedMarks: 30, percentage: "100%", grade: "--" },
            { examName: "Final Exam", examDate: "26-04-2025", totalMarks: 50, obtainedMarks: 50, percentage: "100%", grade: "--" },
            { examName: "Assignment", examDate: "26-04-2025", totalMarks: 10, obtainedMarks: 10, percentage: "100%", grade: "--" },
            { examName: "Quiz", examDate: "26-04-2025", totalMarks: 10, obtainedMarks: 10, percentage: "100%", grade: "--" },
        ]
    };

    return (
        <Container fluid style={{ paddingTop: '30px', paddingBottom: '30px' }}>
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
                        Students
                    </h1>
                </div>

                <div className="d-flex align-items-center">
                    <img
                        src={userData?.profile_pic || "/assets/avatar.jpeg"}
                        alt="User"
                        className="rounded-circle me-2"
                        style={{ width: "54px", height: "54px" }}
                    />
                    <div className="me-0">
                        <div style={{ fontWeight: "500", fontSize: "14px" }}>{userData?.full_name}</div>
                        <div style={{ fontSize: "12px", color: "#6c757d" }}>{userData?.teacher_id}</div>
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
            <Row className="mb-4">
                <Col xs={12} md={6} className="d-flex  align-items-center ">
                    <Card style={{ padding: '0px', border: 'none' }}>
                        <div className="row align-items-center">
                            {/* Left Side - Image */}
                            <div className="col-auto">
                                <img
                                    src="/assets/ayesha.png"
                                    alt="Student"
                                    className="img-fluid rounded-circle"
                                    style={{ width: '100px', height: '100px', border: '3px solid #fff', objectFit: 'cover' }}
                                />
                            </div>

                            {/* Right Side - Info */}
                            <div className="col">
                                <h5 className="mb-1" style={{ fontSize: '24px', fontWeight: '500' }}>{studentData.name}</h5>
                                <p className="mb-1" style={{ fontSize: '18px', color: '#475467', fontWeight: '400' }}>{studentData.studentId}</p>
                                <p className="mb-0" style={{ fontSize: '14px', color: '#9747FF', fontWeight: '400' }}>{studentData.course}</p>
                            </div>
                        </div>
                    </Card>

                </Col>

                <Col xs={12} md={6} className="d-flex align-items-center " style={{ justifyContent: 'flex-end' }}>
                    {/* Attendance Percentage Section */}
                    <Card style={{ padding: '4px 36px', textAlign: 'center', border: '1px solid #EAECF0', background: '#fff', borderRadius: '22px' }}>
                        <p style={{ fontSize: '36px', fontWeight: '500', color: '#3CCB7F' }}>{studentData.attendance}%</p>

                        <h6 style={{ fontSize: '14px', fontWeight: '500', color: '#475467' }}>Attendance</h6>
                    </Card>
                </Col>
            </Row>

            <Row className="mb-4">
                <Col xs={12} md={6}>
                    {/* Assignments Section */}
                    <Card style={{ border: '1px solid #EAECF0', borderRadius: '22px', height: '330px' }}>
                        <Card.Header style={{ fontSize: '16px', fontWeight: '500', borderBottom: 'none', color: '#000', padding: '12px 17px' }}>
                            Assignments

                        </Card.Header>

                        <Card.Body
                            style={{
                                padding: '0px',
                                overflowY: 'scroll',
                                height: '270px',
                                scrollbarWidth: 'none',       // Firefox
                                msOverflowStyle: 'none'       // IE 10
                            }}
                            className="hide-scrollbar"
                        >
                            <Table responsive>
                                <thead >
                                    <tr>
                                        <th style={{ color: '#111827', padding: '16px', fontSize: '14px', fontWeight: '500' }}>Assignment</th>
                                        <th style={{ color: '#111827', padding: '16px', fontSize: '14px', fontWeight: '500' }}>Due Date</th>
                                        <th style={{ color: '#111827', padding: '16px', fontSize: '14px', fontWeight: '500' }}>Submit Date</th>
                                        <th style={{ color: '#111827', padding: '16px', fontSize: '14px', fontWeight: '500' }}>Marks</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {studentData.assignments.map((assignment, index) => {
                                        const isLast = index === studentData.assignments.length - 1;
                                        const borderBottomStyle = !isLast ? '1px solid #D0D5DD' : 'none';

                                        return (
                                            <tr key={index}>
                                                <td style={{ fontSize: '14px', fontWeight: '400', color: '#101828', padding: '16px', borderBottom: borderBottomStyle }}>
                                                    {assignment.name}
                                                </td>
                                                <td style={{ fontSize: '14px', fontWeight: '400', color: '#667085', padding: '16px', borderBottom: borderBottomStyle }}>
                                                    {assignment.dueDate}
                                                </td>
                                                <td
                                                    style={{
                                                        fontSize: '14px',
                                                        fontWeight: '400',
                                                        color: assignment.submitDate === 'Not Submitted' ? 'red' : '#32D583',
                                                        padding: '16px',
                                                        borderBottom: borderBottomStyle
                                                    }}
                                                >
                                                    {assignment.submitDate}
                                                </td>
                                                <td style={{ fontSize: '14px', fontWeight: '400', color: '#667085', padding: '16px', borderBottom: borderBottomStyle }}>
                                                    {assignment.marks}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>

                </Col>

                <Col xs={12} md={6}>
                    {/* Quizzes Section */}
                    {/* Quizzes Section */}
                    {/* Quizzes Section */}
                    <Card style={{ border: '1px solid #EAECF0', borderRadius: '22px', height: '330px' }}>
                        <Card.Header style={{ fontSize: '16px', fontWeight: '500', borderBottom: 'none', padding: '12px 17px' }}>
                            Quizzes
                        </Card.Header>

                        <Card.Body
                            style={{
                                padding: '0px',
                                overflowY: 'scroll',
                                height: '270px',
                                scrollbarWidth: 'none',       // Firefox
                                msOverflowStyle: 'none'       // IE 10+
                            }}
                            className="hide-scrollbar"
                        >
                            <Table responsive>
                                <thead style={{ fontSize: '14px', fontWeight: '500', color: '#111827' }}>
                                    <tr>
                                        <th style={{ color: '#111827', padding: '16px', fontSize: '14px', fontWeight: '500' }}>Quiz</th>
                                        <th style={{ color: '#111827', padding: '16px', fontSize: '14px', fontWeight: '500' }}>Due Date</th>
                                        <th style={{ color: '#111827', padding: '16px', fontSize: '14px', fontWeight: '500' }}>Submit Date</th>
                                        <th style={{ color: '#111827', padding: '16px', fontSize: '14px', fontWeight: '500' }}>Marks</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {studentData.quizzes.map((quiz, index) => {
                                        const isLast = index === studentData.quizzes.length - 1;
                                        const borderBottomStyle = !isLast ? '1px solid #D0D5DD' : 'none';

                                        // Set the color based on submit date
                                        let submitDateColor = '#32D583'; // Default to green
                                        if (quiz.submitDate === 'Not Submitted') {
                                            submitDateColor = 'red';
                                        } else if (quiz.submitDate === 'Not Attempted') {
                                            submitDateColor = 'red';
                                        }

                                        return (
                                            <tr key={index}>
                                                <td style={{ fontSize: '14px', fontWeight: '400', color: '#101828', padding: '16px', borderBottom: borderBottomStyle }}>
                                                    {quiz.name}
                                                </td>
                                                <td style={{ fontSize: '14px', fontWeight: '400', color: '#667085', padding: '16px', borderBottom: borderBottomStyle }}>
                                                    {quiz.dueDate}
                                                </td>
                                                <td
                                                    style={{
                                                        fontSize: '14px',
                                                        fontWeight: '400',
                                                        color: submitDateColor,
                                                        padding: '16px',
                                                        borderBottom: borderBottomStyle
                                                    }}
                                                >
                                                    {quiz.submitDate}
                                                </td>
                                                <td style={{ fontSize: '14px', fontWeight: '400', color: '#667085', padding: '16px', borderBottom: borderBottomStyle }}>
                                                    {quiz.marks}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>


                </Col>
            </Row>

            <Row className="mb-4">
                <Col>
                    {/* Result Section */}
                    {/* Result Section */}
                    <Card style={{ border: '1px solid #EAECF0', borderRadius: '22px' }}>
                        <Card.Header style={{ fontSize: '16px', fontWeight: '500', borderBottom: 'none', color: '#000', padding: '12px 17px' }}>
                            Result
                        </Card.Header>

                        <Card.Body
                            style={{
                                padding: '0px',
                            }}
                        >
                            <Table responsive>
                                <thead style={{ fontSize: '14px', fontWeight: '500', color: '#111827' }}>
                                    <tr>
                                        <th style={{ color: '#111827', padding: '16px', fontSize: '14px', fontWeight: '500' }}>Exam Name</th>
                                        <th style={{ color: '#111827', padding: '16px', fontSize: '14px', fontWeight: '500' }}>Exam Date</th>
                                        <th style={{ color: '#111827', padding: '16px', fontSize: '14px', fontWeight: '500' }}>Total Marks</th>
                                        <th style={{ color: '#111827', padding: '16px', fontSize: '14px', fontWeight: '500' }}>Obtained Marks</th>
                                        <th style={{ color: '#111827', padding: '16px', fontSize: '14px', fontWeight: '500' }}>Percentage</th>
                                        <th style={{ color: '#111827', padding: '16px', fontSize: '14px', fontWeight: '500' }}>Grade</th>
                                    </tr>
                                </thead>
                                <tbody style={{ padding: '0px' }}>
                                    {studentData.results.map((result, index) => {
                                        const isLast = index === studentData.results.length - 1;
                                        const borderBottomStyle = !isLast ? '1px solid #D0D5DD' : 'none';

                                        return (
                                            <tr key={index}>
                                                <td style={{ fontSize: '14px', fontWeight: '400', color: '#101828', padding: '16px', borderBottom: borderBottomStyle }}>
                                                    {result.examName}
                                                </td>
                                                <td style={{ fontSize: '14px', fontWeight: '400', color: '#667085', padding: '16px', borderBottom: borderBottomStyle }}>
                                                    {result.examDate}
                                                </td>
                                                <td style={{ fontSize: '14px', fontWeight: '400', color: '#667085', padding: '16px', borderBottom: borderBottomStyle }}>
                                                    {result.totalMarks}
                                                </td>
                                                <td style={{ fontSize: '14px', fontWeight: '400', color: '#667085', padding: '16px', borderBottom: borderBottomStyle }}>
                                                    {result.obtainedMarks}
                                                </td>
                                                <td style={{ fontSize: '14px', fontWeight: '400', color: '#667085', padding: '16px', borderBottom: borderBottomStyle }}>
                                                    {result.percentage}
                                                </td>
                                                <td style={{ fontSize: '14px', fontWeight: '400', color: '#667085', padding: '16px', borderBottom: borderBottomStyle }}>
                                                    {result.grade}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    {/* Total Marks Row */}
                                    <tr style={{ fontWeight: '500', color: '#111827' }}>
                                        <td colSpan="2" style={{ fontSize: '14px', padding: '16px', borderBottom: 'none' }}>Total Marks</td>
                                        <td style={{ fontSize: '14px', padding: '16px', borderBottom: 'none' }}>
                                            {studentData.results.reduce((sum, result) => sum + result.totalMarks, 0)}
                                        </td>
                                        <td style={{ fontSize: '14px', padding: '16px', borderBottom: 'none' }}>
                                            {studentData.results.reduce((sum, result) => sum + result.obtainedMarks, 0)}
                                        </td>
                                        <td style={{ fontSize: '14px', padding: '16px', borderBottom: 'none' }}>
                                            {((studentData.results.reduce((sum, result) => sum + result.obtainedMarks, 0) / studentData.results.reduce((sum, result) => sum + result.totalMarks, 0)) * 100).toFixed(2)}%
                                        </td>
                                        <td style={{ fontSize: '14px', padding: '16px', borderBottom: 'none' }}>
                                            {/* You can update the grade logic based on your criteria */}
                                            A+
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>



                </Col>
            </Row>
        </Container>
    );
}

export default TeacherStudents;
