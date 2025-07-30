import React, { useContext } from "react";
import { Container, Row, Col, Image, Card, Table } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { UserContext } from "./UserContext";

const SubGrades = () => {
    const { userData } = useContext(UserContext);
    const summarizedGrades = [
        { type: "Quizzes", scores: [35, 40, 29, 35, 37, 35] },
        { type: "Assignments", scores: [29, 35, 23, 29, 35, 40] },
        { type: "Presentations", scores: [40, 29, 40, 35, 40, 29] },
    ];
    const navigate = useNavigate();
    const subjectGrades = [
        { id: 1, subject: "Demo Subject Name", totalMarks: 86, percentage: "75%", grade: "B", status: "Passed" },
        { id: 2, subject: "Demo Subject Name", totalMarks: 86, percentage: "75%", grade: "A", status: "Passed" },
        { id: 3, subject: "Demo Subject Name", totalMarks: 86, percentage: "75%", grade: "B", status: "Passed" },
        { id: 4, subject: "Demo Subject Name", totalMarks: 86, percentage: "75%", grade: "C", status: "Passed" },
        { id: 5, subject: "Demo Subject Name", totalMarks: 86, percentage: "75%", grade: "B", status: "Passed" },
        { id: 6, subject: "Demo Subject Name", totalMarks: 86, percentage: "75%", grade: "A", status: "Passed" },
        { id: 7, subject: "Demo Subject Name", totalMarks: 86, percentage: "75%", grade: "A", status: "Passed" },
    ];

    const getStatusDot = (status) => {
        const color = status === "Passed" ? "#16A34A" : "#DC2626"; // Green for Passed, Red for Failed
        return (
            <span
                style={{
                    display: "inline-block",
                    width: "8px",
                    height: "8px",
                    backgroundColor: color,
                    borderRadius: "50%",
                    marginRight: "8px",
                }}
            ></span>
        );
    };

    return (
        <Container fluid className="p-4" id="subgrade">
            {/* Header */}
            <header className="d-flex justify-content-between align-items-center mb-4" >
                <div className="d-flex align-items-center" id="subgradeheading">
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
                        Grades
                    </h1>
                </div>

                <div className="d-flex align-items-center">
                    <img
                        id="info-img"
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

            {/* Summarized Grades Section */}
            <Card className="p-4   mb-4" style={{ border: '1px solid #E5E7EB', borderRadius: '12px' }}>
                <h5 className="fw-bold mb-3" style={{ fontSize: '20px', fontWeight: '600' }}>Semester 1</h5>
                <Table
                    responsive
                    className="text-center mb-0" id="table1"
                    style={{ borderCollapse: "collapse", }}
                >
                    <thead>
                        <tr style={{ flexDirection: "start", borderBottom: "1px solid #E5E7EB" }}>
                            <th style={{ display: "flex", borderStyle: "none", fontSize: '16px', fontWeight: '500' }}>Type</th>
                            <th style={{ fontSize: '16px', fontWeight: '500' }}>1</th>
                            <th style={{ fontSize: '16px', fontWeight: '500' }}>2</th>
                            <th style={{ fontSize: '16px', fontWeight: '500' }}>3</th>
                            <th style={{ fontSize: '16px', fontWeight: '500' }}>4</th>
                            <th style={{ fontSize: '16px', fontWeight: '500' }}>5</th>
                            <th style={{ fontSize: '16px', fontWeight: '500' }}>Demo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {summarizedGrades.map((item, index) => (
                            <tr
                                key={index}
                                style={{
                                    borderBottom: index === summarizedGrades.length - 1 ? "none" : "1px solid #E5E7EB",
                                }}
                            >
                                <td className="text-start fw-normal" id="td" style={{ padding: "10px", border: "none", fontSize: '14px', height: '50px' }}>{item.type}</td>
                                {item.scores.map((score, scoreIndex) => (
                                    <td key={scoreIndex} style={{ padding: "10px", border: "none", }}>{score}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>

                </Table>
            </Card>
            <style jsx>{`
  @media (max-width: 768px) {
    .table-wrapper {
      overflow-x: auto;
      width: 100%;
      margin-top: 12px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }

   #table1 {
      min-width: 300px;
      border-collapse: collapse;
      background-color: #fff;
    }
       #table2 {
      min-width: 700px;
      border-collapse: collapse;
      background-color: #fff;
    }

    .text-center thead {
      background-color: #f9fafb;
      position: sticky;
      top: 0;
      z-index: 1;
    }

    .text-center th,
    .text-center td {
      padding: 8px 10px;
      font-size: 13px;
      text-align: center;
      white-space: nowrap;
      
     
    }
      #td , #tr{
            height:35px !important;

      }

    

    .text-center th:first-child,
    .text-center td:first-child {
      text-align: left;
    }

    .text-center th {
      font-weight: 500;
      color: #1f2937;
      border-bottom: 1px solid #e5e7eb;
    }

    .text-center td {
      font-weight: 400;
      color: #4b5563;
      border-bottom: 1px solid #f3f4f6;
    }

    

    .text-start {
      text-align: left !important;
    }

    .fw-normal {
      font-weight: 400;
    }
  }
`}</style>

            

            {/* Subject-wise Grades Section */}
            <Card className="p-4 " style={{ border: '1px solid #E5E7EB', borderRadius: '12px' }}>

                <Table
                    responsive
                    className="text-center" id="table2"
                    style={{
                        borderCollapse: "collapse",
                        margin: "0",
                        padding: "0",
                        width: "100%", // Ensure the table spans the container
                    }}
                >
                    <thead>
                        <tr style={{ borderBottom: "1px solid #E5E7EB" }}>
                            <th style={{ width: "10%", fontSize: "16px", fontWeight: "500", textAlign: "left" }}>Sr No.</th>
                            <th style={{ width: "25%", fontSize: "16px", fontWeight: "500", textAlign: "left" }}>Subject Name</th>
                            <th style={{ width: "20%", fontSize: "16px", fontWeight: "500", textAlign: "left" }}>Total Marks</th>
                            <th style={{ width: "15%", fontSize: "16px", fontWeight: "500", textAlign: "left" }}>Percentage</th>
                            <th style={{ width: "15%", fontSize: "16px", fontWeight: "500", textAlign: "left" }}>Grades</th>
                            <th style={{ width: "15%", fontSize: "16px", fontWeight: "500", textAlign: "left" }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subjectGrades.map((subject, index) => (
                            <tr id="tr"
                                key={subject.id}
                                style={{
                                    borderBottom: index === subjectGrades.length - 1 ? "none" : "1px solid #E5E7EB",
                                }}
                            >
                                <td
                                    style={{
                                        padding: "10px",
                                        border: "none",
                                        fontSize: "14px",
                                        fontWeight: "400",
                                        color: "#4B5563",
                                        textAlign: 'left',
                                    }}
                                >
                                    {subject.id}
                                </td>
                                <td
                                    style={{
                                        padding: "10px",
                                        border: "none",
                                        fontSize: "14px",
                                        fontWeight: "400",
                                        color: "#4B5563",
                                        textAlign: 'left',
                                    }}
                                >
                                    {subject.subject}
                                </td>
                                <td
                                    style={{
                                        padding: "10px",
                                        border: "none",
                                        fontSize: "14px",
                                        fontWeight: "400",
                                        color: "#4B5563",
                                        textAlign: 'left',
                                    }}
                                >
                                    {subject.totalMarks}
                                </td>
                                <td
                                    style={{
                                        padding: "10px",
                                        border: "none",
                                        fontSize: "14px",
                                        fontWeight: "400",
                                        color: "#4B5563",
                                        textAlign: 'left',
                                    }}
                                >
                                    {subject.percentage}
                                </td>
                                <td
                                    style={{
                                        padding: "10px",
                                        border: "none",
                                        fontSize: "14px",
                                        fontWeight: "400",
                                        color: "#4B5563",
                                        textAlign: 'left',
                                    }}
                                >
                                    {subject.grade}
                                </td>
                                <td
                                    style={{
                                        // display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        border: "none",
                                        textAlign: 'left',

                                    }}
                                >
                                    {getStatusDot(subject.status)}
                                    <span className="fw-normal" style={{ color: "#1C222E", }}>{subject.status}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>


            </Card>
        </Container>
    );
};

export default SubGrades;
