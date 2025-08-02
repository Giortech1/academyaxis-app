import React, { useState, useEffect, useContext } from "react";
import { Container, Button, Form, Table, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

function Student() {
    const { userData, deptsData, fetchUsersByRole } = useContext(UserContext);
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState("");
    const [teachersData, setTeachersData] = useState([]);
    const [departmentValue, setDepartmentValue] = useState(null);
    const [filteredTeachers, setFilteredTeachers] = useState([]);
    const currentDate = new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
    const [dynamicStats, setDynamicStats] = useState({
        total: 0,
        new: 0,
        left: 0
    });

    useEffect(() => {
        const getTeachers = async () => {
            const response = await fetchUsersByRole('teacher');

            if (response?.success) {
                setTeachersData(response?.data);
                setDepartmentValue(deptsData[0]?.name);
            }
        };

        if (deptsData?.length > 0) {
            getTeachers();
        }
    }, [deptsData]);

    useEffect(() => {
        if (teachersData?.length < 0) return;
        let filtered = teachersData;

        filtered = filtered.filter(teacher => teacher?.department?.name === departmentValue);

        if (searchText) {
            filtered = filtered.filter(teacher =>
                teacher?.first_name.toLowerCase().includes(searchText.toLowerCase()) ||
                teacher?.last_name.toLowerCase().includes(searchText.toLowerCase()) ||
                teacher?.teacher_id.toLowerCase().includes(searchText.toLowerCase())
            );
        }

        const activeFiltered = filtered.filter(teacher => teacher?.status === 'Active');
        setFilteredTeachers(activeFiltered);

        let statsTeachers = teachersData;
        if (departmentValue !== "All Departments") {
            statsTeachers = statsTeachers.filter(teacher => teacher.department === departmentValue);
        }

        const stats = calculateStats(statsTeachers);
        setDynamicStats(stats);
    }, [departmentValue, searchText, teachersData]);

    const calculateStats = (teachers) => {
        const currentDate = new Date();
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(currentDate.getMonth() - 3);

        const activeTeachers = teachers.filter(teacher => teacher.status === 'active');
        const newTeachers = activeTeachers.filter(teacher => teacher.joinDate >= threeMonthsAgo);
        const leftTeachers = teachers.filter(teacher => teacher.status === 'left');

        return {
            total: activeTeachers.length,
            new: newTeachers.length,
            left: leftTeachers.length
        };
    };

    const handleTotalTeachersClick = () => {
        if (filteredTeachers.length > 0) {
            navigate(`/teacher-details/${filteredTeachers[0].id}`);
        } else {
            const firstActiveTeacher = teachersData.find(teacher => teacher.status === 'active');
            if (firstActiveTeacher) {
                navigate(`/teacher-details/${firstActiveTeacher.id}`);
            }
        }
    };

    const statsData = [
        {
            title: "Total Teachers",
            count: teachersData?.length,
            icon: "/assets/totalclasses.png",
            bgColor: "#F9F5FF",
            onClick: handleTotalTeachersClick,
            clickable: true
        },
        {
            title: "New Teachers",
            count: teachersData?.length,
            icon: "/assets/8.png",
            bgColor: "#E1F2FC",
            clickable: false
        },
        {
            title: "Teachers Left",
            count: teachersData?.filter(teacher => teacher?.status !== "Active").length,
            icon: "/assets/9.png",
            bgColor: "#FEF3F2",
            clickable: false
        },
    ];

    return (
        <Container fluid className="p-0 d-flex">
            <main className="flex-grow-1 p-3">
                {/* Header Section */}
                <header
                    className="d-flex flex-wrap justify-content-between align-items-center mb-3 w-100"
                    style={{ paddingTop: "0px" }}
                >
                    <div className="d-flex align-items-center mb-2 mb-md-0">
                        <h1 style={{ fontSize: "24px", margin: 0, fontWeight: "600" }}>
                            Teachers
                        </h1>
                    </div>
                    <div className="d-flex align-items-center">
                        <img
                            src="/assets/avatar.png"
                            alt="User"
                            style={{ borderRadius: "50%", width: "54px", height: "54px", marginRight: "10px" }}
                        />
                        <div style={{ marginRight: "10px" }}>
                            <div style={{ fontWeight: "500", fontSize: "14" }}>{userData?.full_name}</div>
                            <div style={{ fontSize: "12px", color: "#6c757d" }}>{userData?.user_id}</div>
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
                                placeholder="Search teacher name or ID"
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
                            onClick={() => navigate('/add-teacher')}
                        >
                            <img src="/assets/plus2.png" alt="Add" width={16} height={16} />
                            <span className="d-none d-sm-inline">Add Teacher</span>
                            <span className="d-inline d-sm-none">Add</span>
                        </Button>
                    </div>
                </div>

                {/* Dynamic Stats Cards */}
                <Row className="mx-0">
                    {statsData.map((stat, index) => (
                        <Col xs={12} sm={6} md={6} lg={4} key={index} className="mb-3 px-2">
                            <Card
                                style={{
                                    border: "1px solid #E5E7EB",
                                    borderRadius: "12px",
                                    backgroundColor: "#FFFFFF",
                                    height: "100%",
                                    cursor: stat.clickable ? "pointer" : "default",
                                }}
                                onClick={stat.clickable ? stat.onClick : undefined}
                            >
                                <Card.Body style={{ padding: "24px 24px" }}>
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

                {/* Teachers Table */}
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
                    {/* Teachers Section */}
                    <div className="d-flex flex-wrap justify-content-between align-items-center mt-4 mb-3 p-3">
                        <h2 style={{ fontSize: "24px", fontWeight: "600", margin: "0 0 10px 0" }}>
                            Teachers
                        </h2>
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
                                        Teacher
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
                                        Teacher ID
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
                                        Role
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
                                        Assigned Courses
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
                                        Assigned Classes
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
                                        Last Active
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
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTeachers.length > 0 ? (
                                    filteredTeachers.map((teacher) => (
                                        <tr key={teacher?.teacher_id} style={{ borderBottom: "1px solid #ddd" }}>
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
                                                        src={teacher?.profile_pic}
                                                        alt={teacher?.first_name}
                                                        style={{
                                                            width: "40px",
                                                            height: "40px",
                                                            borderRadius: "50%",
                                                            marginRight: "12px",
                                                            objectFit: "cover"
                                                        }}
                                                    />
                                                    <span>{teacher?.full_name}</span>
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
                                                {teacher?.teacher_id}
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
                                                {teacher?.role}
                                            </td>
                                            <td
                                                className="d-none d-lg-table-cell"
                                                style={{
                                                    padding: "15px",
                                                    verticalAlign: "middle",
                                                    fontSize: "14px",
                                                    fontWeight: "400",
                                                    color: "#4B5563",
                                                }}
                                            >
                                                {teacher?.assignedCourses}
                                            </td>
                                            <td
                                                className="d-none d-lg-table-cell"
                                                style={{
                                                    padding: "15px",
                                                    verticalAlign: "middle",
                                                    fontSize: "14px",
                                                    fontWeight: "400",
                                                    color: "#4B5563",
                                                }}
                                            >
                                                {teacher?.assignedClasses}
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
                                                {teacher?.lastActive}
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
                                                    onClick={() => navigate('/teacherprofile1')}
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
                                        <td
                                            colSpan="7"
                                            style={{
                                                textAlign: "center",
                                                padding: "40px",
                                                color: "#6B7280",
                                                fontSize: "16px"
                                            }}
                                        >
                                            No teachers found for the selected criteria
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