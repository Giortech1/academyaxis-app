import React, { useState, useEffect, useContext } from "react";
import { Container, Button, Form, Table, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

function Student() {
    const { userData, deptsData, fetchUsersByRole } = useContext(UserContext);
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState("");
    const [departmentValue, setDepartmentValue] = useState("");
    const [studentsData, setStudentsData] = useState([]);
    const [selectedSemester, setSelectedSemester] = useState(1);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [semesters, setSemesters] = useState([
        { value: 1, label: 'Semester 1' },
        { value: 2, label: 'Semester 2' },
        { value: 3, label: 'Semester 3' },
        { value: 4, label: 'Semester 4' },
        { value: 5, label: 'Semester 5' },
        { value: 6, label: 'Semester 6' },
        { value: 7, label: 'Semester 7' },
        { value: 8, label: 'Semester 8' },
        { value: 9, label: 'Semester 9' },
        { value: 10, label: 'Semester 10' }
    ]);

    const currentDate = new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    useEffect(() => {
        const getStudents = async () => {
            const response = await fetchUsersByRole('student');

            if (response?.success) {
                setStudentsData(response?.data);
                setDepartmentValue(deptsData[0]?.name);
            }
        };

        if (deptsData?.length > 0) {
            getStudents();
        }
    }, [deptsData]);

    useEffect(() => {
        if (studentsData?.length > 0) {
            filterData();
        }
    }, [selectedSemester, departmentValue, searchText, studentsData]);

    const filterData = () => {
        let filtered = studentsData.filter((student) => {
            const departmentMatch = student?.department?.name === departmentValue;

            const semesterMatch = student?.current_semester === selectedSemester;

            const searchMatch = student?.student_id?.toLowerCase()?.includes(searchText.toLowerCase()) ||
                student?.first_name?.toLowerCase()?.includes(searchText.toLowerCase()) ||
                student?.last_name?.toLowerCase()?.includes(searchText.toLowerCase());

            return departmentMatch && semesterMatch && searchMatch;
        });

        setFilteredStudents(filtered);

        updateStats(departmentValue);
    };

    const [statsData, setStatsData] = useState([
        {
            title: "Total Student",
            count: "469",
            icon: "/assets/totalclasses.png",
            bgColor: "#F9F5FF",
        },
        {
            title: "New Admission",
            count: "25",
            icon: "/assets/8.png",
            bgColor: "#E1F2FC",
        },
        {
            title: "Leave Student",
            count: "15",
            icon: "/assets/9.png",
            bgColor: "#FEF3F2",
        },
        {
            title: "Attenance Rate",
            count: "80%",
            icon: "/assets/calendar3.png",
            bgColor: "#F9F5FF",
        },
    ]);

    const [statsDataRow2, setStatsDataRow2] = useState([
        {
            title: "Top Scores",
            count: "7",
            icon: "/assets/8.png",
            bgColor: "#FFFAEB",
        },
    ]);

    const updateStats = (department) => {
        const departmentStudents = studentsData.filter(student => student.department === department);

        const newStatsData = [...statsData];
        newStatsData[0].count = departmentStudents.length.toString();
        setStatsData(newStatsData);
    };

    return (
        <Container fluid className="p-0 d-flex">
            <main className="flex-grow-1 p-3">
                {/* Header Section */}
                <header
                    className="d-flex flex-wrap justify-content-between align-items-center mb-3 w-100"
                    style={{ paddingTop: "0px" }}
                >
                    <div className="d-flex align-items-center mb-2 mb-md-0">
                        <h1 style={{ fontSize: "24px", margin: 0, fontWeight: "600" }}>Student</h1>
                    </div>
                    <div className="d-flex align-items-center">
                        <img
                            src={userData?.avatar}
                            alt="User"
                            style={{ borderRadius: "50%", width: "54px", height: "54px", marginRight: "10px" }}
                        />
                        <div style={{ marginRight: "10px" }}>
                            <div style={{ fontWeight: "500", fontSize: "14" }}>{userData?.name}</div>
                            <div style={{ fontSize: "12px", color: "#6c757d" }}>{userData?.id}</div>
                        </div>
                    </div>
                </header>

                {/* Filter Section */}
                <div
                    className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3"
                    style={{ marginTop: "15px", width: "100%" }}
                >
                    <div className="d-flex flex-wrap align-items-center gap-3">
                        <div
                            className="d-flex align-items-center mb-2 mb-md-0"
                            style={{
                                border: "1px solid #EAECF0",
                                borderRadius: "8px",
                                padding: "8px 12px",
                                backgroundColor: "white",
                                cursor: "pointer",
                            }}
                        >
                            <select
                                style={{
                                    border: "none",
                                    fontWeight: 500,
                                    fontSize: "14px",
                                    color: "#111827",
                                    backgroundColor: "transparent",
                                    outline: "none",
                                    width: "100%"
                                }}
                                value={departmentValue}
                                onChange={(e) => setDepartmentValue(e.target.value)}
                            >
                                {deptsData.map((dept, index) => (
                                    <option key={index} value={dept?.name}>
                                        {dept?.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div
                            className="d-flex align-items-center mb-2 mb-md-0"
                            style={{
                                border: "1px solid #EAECF0",
                                borderRadius: "8px",
                                padding: "8px 12px",
                                backgroundColor: "white",
                                cursor: "pointer",
                            }}
                        >
                            <img
                                src="/assets/calendar1.png"
                                alt="Calendar Icon"
                                width={20}
                                height={20}
                                className="me-2"
                            />
                            <span style={{ fontSize: "14px", fontWeight: "600", color: "#111827" }}>
                                {currentDate}
                            </span>
                        </div>
                    </div>

                    <div className="d-flex flex-wrap align-items-center gap-3">
                        <div className="position-relative mb-2 mb-md-0">
                            <Form.Control
                                type="text"
                                placeholder="Search roll number"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                style={{
                                    borderRadius: "8px",
                                    paddingLeft: "36px",
                                    fontSize: "14px",
                                    fontWeight: "400",
                                    color: "#98A2B3",
                                    border: "1px solid #EAECF0",
                                    width: "100%",
                                    minWidth: "200px"
                                }}
                            />
                            <img
                                src="/assets/search-lg.png"
                                alt="Search Icon"
                                width={18}
                                height={18}
                                style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "10px",
                                    transform: "translateY(-50%)",
                                }}
                            />
                        </div>

                        <Button
                            style={{
                                backgroundColor: "#1F2937",
                                border: "none",
                                borderRadius: "8px",
                                padding: "10px 16px",
                                fontWeight: "600",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                            }}
                            onClick={() => navigate("/add-student")}
                        >
                            <img src="/assets/plus2.png" alt="Add" width={16} height={16} />
                            <span className="d-none d-sm-inline">Add Student</span>
                            <span className="d-inline d-sm-none">Add</span>
                        </Button>
                    </div>
                </div>

                {/* Stats Cards - First Row */}
                <Row className="mx-0">
                    {statsData.map((stat, index) => (
                        <Col xs={12} sm={6} md={6} lg={3} key={index} className="mb-3 px-2">
                            <Card
                                style={{
                                    border: "1px solid #E5E7EB",
                                    borderRadius: "12px",
                                    backgroundColor: "#FFFFFF",
                                    height: "100%",
                                    cursor: index === 0 ? "pointer" : "default"
                                }}
                                onClick={index === 0 ? () => navigate("/student-details") : undefined}
                            >
                                <Card.Body style={{ padding: "16px 24px" }}>
                                    <Row className="align-items-center">
                                        <Col xs={3} className="d-flex justify-content-center align-items-center">
                                            <div
                                                style={{
                                                    backgroundColor: stat.bgColor,
                                                    borderRadius: "50%",
                                                    padding: "16px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    width: "60px",
                                                    height: "60px",
                                                }}
                                            >
                                                <img
                                                    src={stat.icon}
                                                    alt={stat.title}
                                                    style={{
                                                        width: "30px",
                                                        height: "30px",
                                                    }}
                                                />
                                            </div>
                                        </Col>
                                        <Col xs={9} className="d-flex flex-column justify-content-center">
                                            <Card.Text
                                                style={{
                                                    fontSize: "28px",
                                                    fontWeight: "600",
                                                    color: "#111827",
                                                    marginBottom: "0",
                                                }}
                                                className="responsive-text"
                                            >
                                                {stat.count}
                                            </Card.Text>
                                            <Card.Title style={{ fontSize: "14px", fontWeight: "500", color: "#475467" }}>
                                                {stat.title}
                                            </Card.Title>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                {/* Stats Cards - Second Row */}
                <Row className="mx-0">
                    {statsDataRow2.map((stat, index) => (
                        <Col xs={12} sm={6} md={6} lg={3} key={index} className="mb-3 px-2">
                            <Card
                                style={{
                                    border: "1px solid #E5E7EB",
                                    borderRadius: "12px",
                                    backgroundColor: "#FFFFFF",
                                    height: "100%"
                                }}
                            >
                                <Card.Body style={{ padding: "16px 24px" }}>
                                    <Row className="align-items-center">
                                        <Col xs={3} className="d-flex justify-content-center align-items-center">
                                            <div
                                                style={{
                                                    backgroundColor: stat.bgColor,
                                                    borderRadius: "50%",
                                                    padding: "16px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    width: "60px",
                                                    height: "60px",
                                                }}
                                            >
                                                <img
                                                    src={stat.icon}
                                                    alt={stat.title}
                                                    style={{
                                                        width: "30px",
                                                        height: "30px",
                                                    }}
                                                />
                                            </div>
                                        </Col>
                                        <Col xs={9} className="d-flex flex-column justify-content-center">
                                            <Card.Text
                                                style={{
                                                    fontSize: "28px",
                                                    fontWeight: "600",
                                                    color: "#111827",
                                                    marginBottom: "0",
                                                }}
                                                className="responsive-text"
                                            >
                                                {stat.count}
                                            </Card.Text>
                                            <Card.Title style={{ fontSize: "14px", fontWeight: "500", color: "#475467" }}>
                                                {stat.title}
                                            </Card.Title>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                {/* Students Table */}
                <div
                    style={{
                        borderCollapse: "collapse",
                        width: "100%",
                        border: "1px solid #EAECF0",
                        borderRadius: "12px",
                        marginTop: "20px",
                        overflow: "hidden"
                    }}
                >
                    {/* Students List Section */}
                    <div className="d-flex flex-wrap justify-content-between align-items-center mt-4 mb-3 p-3">
                        <h2 style={{ fontSize: "24px", fontWeight: "600", margin: "0 0 10px 0" }}>Students</h2>
                        <div
                            className="d-flex align-items-center"
                            style={{
                                border: "1px solid #EAECF0",
                                borderRadius: "8px",
                                padding: "6px 12px",
                                backgroundColor: "white",
                            }}
                        >
                            <select
                                style={{
                                    border: "none",
                                    fontSize: "14px",
                                    color: "#111827",
                                    backgroundColor: "transparent",
                                    outline: "none",
                                    fontWeight: '500',
                                    cursor: "pointer",
                                }}
                                value={selectedSemester}
                                onChange={(e) => setSelectedSemester(Number(e.target.value))}
                            >
                                {semesters.map((semester, index) => (
                                    <option key={index} value={semester?.value}>
                                        {semester?.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <Table
                            hover
                            className="table mb-0"
                        >
                            <thead style={{ position: "sticky", top: 0, backgroundColor: "#fff", zIndex: 1 }}>
                                <tr>
                                    <th
                                        style={{
                                            background: "transparent",
                                            padding: "15px",
                                            fontSize: "16px",
                                            fontWeight: "500",
                                            color: "#111827",
                                        }}
                                    >
                                        Students
                                    </th>
                                    <th
                                        style={{
                                            background: "transparent",
                                            padding: "15px",
                                            fontSize: "16px",
                                            fontWeight: "500",
                                            color: "#111827",
                                        }}
                                    >
                                        ID
                                    </th>
                                    <th
                                        className="d-none d-md-table-cell"
                                        style={{
                                            background: "transparent",
                                            padding: "15px",
                                            fontSize: "16px",
                                            fontWeight: "500",
                                            color: "#111827",
                                        }}
                                    >
                                        Program
                                    </th>
                                    <th
                                        className="d-none d-md-table-cell"
                                        style={{
                                            background: "transparent",
                                            padding: "15px",
                                            fontSize: "16px",
                                            fontWeight: "500",
                                            color: "#111827",
                                        }}
                                    >
                                        Total Semesters
                                    </th>
                                    <th
                                        className="d-none d-lg-table-cell"
                                        style={{
                                            background: "transparent",
                                            padding: "15px",
                                            fontSize: "16px",
                                            fontWeight: "500",
                                            color: "#111827",
                                        }}
                                    >
                                        Total CGPA
                                    </th>
                                    <th
                                        style={{
                                            background: "transparent",
                                            padding: "15px",
                                            fontSize: "16px",
                                            fontWeight: "500",
                                            color: "#111827",
                                        }}
                                    >
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredStudents.length > 0 ? (
                                    filteredStudents.map((student) => (
                                        <tr key={student?.student_id} style={{ borderBottom: "1px solid #ddd" }}>
                                            <td
                                                style={{
                                                    padding: "15px",
                                                    verticalAlign: "middle",
                                                    fontSize: "14px",
                                                    fontWeight: "400",
                                                    color: "#4B5563",
                                                }}
                                            >
                                                <div className="d-flex align-items-center">
                                                    <img
                                                        src={student?.profile_pic}
                                                        alt={student?.first_name}
                                                        style={{
                                                            width: "40px",
                                                            height: "40px",
                                                            borderRadius: "50%",
                                                            marginRight: "12px",
                                                            objectFit: "cover"
                                                        }}
                                                    />
                                                    <span style={{ fontWeight: "500" }}>{student?.first_name} {student?.last_name}</span>
                                                </div>
                                            </td>
                                            <td
                                                style={{
                                                    padding: "15px",
                                                    verticalAlign: "middle",
                                                    fontSize: "14px",
                                                    fontWeight: "400",
                                                    color: "#4B5563",
                                                }}
                                            >
                                                {student?.student_id}
                                            </td>
                                            <td
                                                className="d-none d-md-table-cell"
                                                style={{
                                                    padding: "15px",
                                                    verticalAlign: "middle",
                                                    fontSize: "14px",
                                                    fontWeight: "400",
                                                    color: "#4B5563",
                                                }}
                                            >
                                                {student?.program?.name}
                                            </td>
                                            <td
                                                className="d-none d-md-table-cell"
                                                style={{
                                                    padding: "15px",
                                                    verticalAlign: "middle",
                                                    fontSize: "14px",
                                                    fontWeight: "400",
                                                    color: "#4B5563",
                                                }}
                                            >
                                                {student?.program?.semesters?.length}
                                            </td>
                                            <td
                                                className="d-none d-lg-table-cell"
                                                style={{
                                                    padding: "15px",
                                                    verticalAlign: "middle",
                                                    fontSize: "14px",
                                                    fontWeight: "600",
                                                    color: "#10B981",
                                                }}
                                            >
                                                {student?.cgpa}
                                            </td>
                                            <td
                                                style={{
                                                    padding: "15px",
                                                    verticalAlign: "middle",
                                                    fontSize: "14px",
                                                    fontWeight: "400",
                                                    color: "#4B5563",
                                                    textAlign: "center"
                                                }}
                                            >
                                                <button
                                                    onClick={() => navigate(`/student-profile/${student?.student_id}`)}
                                                    style={{
                                                        backgroundColor: '#9747FF',
                                                        border: 'none',
                                                        borderRadius: '50px',
                                                        padding: '8px 24px',
                                                        color: 'white',
                                                        fontSize: '14px',
                                                        fontWeight: '500',
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '8px',
                                                    }}
                                                >
                                                    <span className="d-none d-sm-inline">View</span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
                                            No students found matching current filters
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </div>
                </div>

                {/* CSS for making text responsive */}
                <style jsx="true">{`
                    @media (max-width: 767.98px) {
                        .responsive-text {
                            font-size: 24px !important;
                        }
                    }
                    
                    .table-hover > tbody > tr:hover > * {
                        --bs-table-color-state: var(--bs-table-hover-color);
                        --bs-table-bg-state: transparent !important;
                    }
                    
                    @media (max-width: 576px) {
                        select {
                            max-width: 100%;
                            min-width: 150px;
                        }
                    }
                `}</style>
            </main>
        </Container>
    );
}

export default Student;