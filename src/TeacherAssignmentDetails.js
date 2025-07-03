import React, { useState } from "react";
import { Table, Button, Image, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const TeacherAssignmentDetails = () => {
    const [assignments, setAssignments] = useState(generateAssignments());
    const [activeButton, setActiveButton] = useState('Overall');
    const navigate = useNavigate();

    const handleClick = (buttonName) => {
        setActiveButton(buttonName);
    };

    const buttonStyle = (buttonName) => ({
        border: '1px solid #D1D5DB',
        cursor: 'pointer',
        borderRadius: '8px',
        height: '35px',
        padding: '10px',
        marginLeft: buttonName !== 'Overall' ? '12px' : '0',
        backgroundColor: activeButton === buttonName ? 'black' : 'transparent',
        color: activeButton === buttonName ? 'white' : '#475467',
    });

    const theadStyle = {
        backgroundColor: "#F9FAFB",
        fontSize: "16px",
        fontWeight: "500",
    };

    function generateStudents() {
        const avatars = [
            "/assets/Avatar3.png",
            "/assets/Avatar4.png",
            "/assets/Avatar5.png",
            "/assets/ayesha.png",
            "/assets/mehak.png",
        ];

        return Array.from({ length: 15 }, (_, i) => ({
            id: i + 1,
            studentName: `Student ${i + 1}`,
            rollNumber: `123456${i}`,
            avatar: avatars[i % avatars.length],
        }));
    }

    const students = generateStudents();

    function generateAssignments() {
        const assignmentAvatars = [
            "/assets/file-06.png",
            "/assets/file-06.png",
            "/assets/file-06.png",
            "/assets/file-06.png",
            "/assets/file-06.png",
        ];

        return Array.from({ length: 15 }, (_, i) => ({
            id: i + 1,
            studentId: i + 1,
            assignment: `Assignment ${i + 1}`,
            submissionDate: i % 3 === 0 ? "Not Submitted" : "25-Sep-2024",
            deadline: "25-Sep-2024",
            assignmentAvatar: assignmentAvatars[i % assignmentAvatars.length],
            marks: `${Math.floor(Math.random() * 101)}`,
        }));
    }

    const renderSubmissionStatus = (submissionDate, deadline) => {
        const displayDate = submissionDate === "Not Submitted" ? deadline : submissionDate;
        return <span>{displayDate}</span>;
    };

    const filteredAssignments = assignments.filter((assignment) => {
        if (activeButton === 'Submitted') {
            return assignment.submissionDate !== 'Not Submitted';
        } else if (activeButton === 'Late Submission') {
            return assignment.submissionDate === 'Not Submitted';
        }
        return true;
    });

    return (
        <div style={{ padding: "20px", fontFamily: "Inter, sans-serif" }}>
            <header className="d-flex justify-content-between align-items-center mb-4">
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
                        Assignment
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
                <div style={{ display: 'flex' }}>
                    <div className="d-flex">
                        {['Overall', 'Submitted', 'Late Submission'].map((button) => (
                            <div
                                key={button}
                                className="d-flex align-items-center"
                                style={buttonStyle(button)}
                                onClick={() => handleClick(button)}
                            >
                                <span style={{ fontSize: '14px', fontWeight: '500' }}>{button}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="d-flex align-items-center">
                    <div className="position-relative me-3" style={{ flexGrow: 1 }}>
                        <Form.Control
                            type="text"
                            placeholder="Search"
                            style={{ borderRadius: "8px", paddingLeft: "40px", fontSize: '16px', fontWeight: '400', color: '#98A2B3', borderColor: '#D1D5DB', width: '300px' }}
                        />
                        <Image
                            src="/assets/search-lg1.png"
                            alt="Search Icon"
                            width={20}
                            height={20}
                            style={{ position: "absolute", top: "50%", left: "12px", transform: "translateY(-50%)" }}
                        />
                    </div>

                    <Button
                        className="d-flex align-items-center"
                        style={{ backgroundColor: "transparent", color: "#374151", border: "none", borderRadius: "8px", border: '1px solid #D1D5DB', fontSize: '14px', fontWeight: '500' }}
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

            <Table hover style={{ borderCollapse: "collapse", width: "100%", textAlign: "left" }}>
                <thead>
                    <tr style={theadStyle}>
                        <th>Students</th>
                        <th>Roll no</th>
                        <th>Submission date</th>
                        <th>Deadline</th>
                        <th>Assignments</th>
                        <th>Marks</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAssignments.map((assignment) => {
                        const student = students.find(student => student.id === assignment.studentId);
                        const isSubmitted = assignment.submissionDate !== "Not Submitted";
                        
                        return (
                            <tr key={assignment.id} style={{ borderBottom: "1px solid #E5E7EB", lineHeight: "60px", verticalAlign: "middle" }}>
                                <td style={{ alignItems: "center", gap: "10px", fontSize: '12px', fontWeight: '500', color: '#101828' }}>
                                    <img src={student.avatar} alt="Avatar" style={{ width: "36px", height: "36px", borderRadius: "50%", marginRight: '10px', border: "2px solid white" }} />
                                    {student.studentName}
                                </td>
                                <td style={{ fontSize: '14px', fontWeight: '400', color: '#4B5563' }}>{student.rollNumber}</td>
                                <td style={{ fontSize: '14px', fontWeight: '400', color: '#4B5563' }}>{renderSubmissionStatus(assignment.submissionDate, assignment.deadline)}</td>
                                <td style={{ fontSize: '14px', fontWeight: '400', color: '#4B5563' }}>{assignment.deadline}</td>
                                <td>
                                    {!isSubmitted ? (
                                        <div style={{ display: "flex", alignItems: "center", gap: "10px", backgroundColor:'#FEF2F2', borderRadius:'12px', height:'36px', width:'140px', padding:'5px' }}>
                                            <div style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "#DC2626" }}></div>
                                            <span style={{ fontSize: "14px", fontWeight: "500", color: "#EF4444" }}>Not Submitted</span>
                                        </div>
                                    ) : (
                                        <div style={{ display: "flex", alignItems: "center", gap: "10px", position: "relative" }}>
                                            <img src={assignment.assignmentAvatar} alt="Assignment Avatar" style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: '#F4EBFF', padding: '10px' }} />
                                            <div style={{ fontSize: "14px", fontWeight: "500", display: "block", color: '#101828', marginTop:'-18px' }}>
                                                {assignment.assignment}
                                                <div style={{ fontSize: "12px", color: "#475467", position: "absolute", bottom: "-20px", fontWeight:'400' }}>PDF file</div>
                                            </div>
                                        </div>
                                    )}
                                </td>
                                <td style={{ fontSize:'14px', fontWeight:'400', color:'#4B5563', textDecoration:'underline' }}>{assignment.marks}</td>
                                <td>
                                    <div style={{ alignItems: "center", justifyContent: "center" }}>
                                        <div 
                                            style={{ 
                                                border: '1px solid #EAECF0', 
                                                borderRadius: '50%', 
                                                height: '32px', 
                                                width: '32px', 
                                                display: 'flex', 
                                                justifyContent: 'center', 
                                                alignItems: 'center',
                                                cursor: isSubmitted ? "pointer" : "not-allowed",
                                                opacity: isSubmitted ? 1 : 0.5
                                            }}
                                        >
                                            <img 
                                                src="/assets/import1.png" 
                                                alt="Download" 
                                                style={{ width: "20px", height: "20px" }} 
                                            />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
};

export default TeacherAssignmentDetails;