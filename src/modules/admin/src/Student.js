import React, { useState, useEffect, useContext } from 'react';
import { Container, Button, Form, Table, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from './UserContext.js';


function Student() {
            const { userData } = useContext(UserContext);

    const navigate = useNavigate();
    const [searchText, setSearchText] = useState("");

    const [departmentValue, setDepartmentValue] = useState("Department of Computer Science");

    // Sample data for classes
    const classesData = [
        {
            id: 1,
            subject: "Basic English",
            time: "09:00-10:00",
            date: "12/3/2025",
            room: "CS-101",
            duration: "1 Hour",
            students: "45/53",
            semester: "Semester 1"
        },
        {
            id: 2,
            subject: "Basic Science",
            time: "11:00-12:00",
            date: "12/3/2025",
            room: "CS-101",
            duration: "1 Hour",
            students: "51/57",
            semester: "Semester 1"
        },
        {
            id: 3,
            subject: "Computer English",
            time: "10:00-11:00",
            date: "12/3/2025",
            room: "CS-101",
            duration: "1 Hour",
            students: "38/40",
            semester: "Semester 2"
        },
        {
            id: 4,
            subject: "Basic Physics",
            time: "08:00-09:00",
            date: "12/3/2025",
            room: "CS-101",
            duration: "1 Hour",
            students: "20/32",
            semester: "Semester 2"
        },
        {
            id: 5,
            subject: "Special English",
            time: "07:00-08:00",
            date: "12/3/2025",
            room: "CS-101",
            duration: "1 Hour",
            students: "45/53",
            semester: "Semester 3"
        },
        {
            id: 6,
            subject: "Basic Math",
            time: "12:00-01:00",
            date: "12/3/2025",
            room: "CS-101",
            duration: "1 Hour",
            students: "41/50",
            semester: "Semester 3"
        },
        {
            id: 7,
            subject: "Textile Wat",
            time: "11:00-12:00",
            date: "12/3/2025",
            room: "CS-101",
            duration: "1 Hour",
            students: "39/45",
            semester: "Semester 2"
        },
    ];

    // State for selected semester and filtered classes
    const [selectedSemester, setSelectedSemester] = useState("Semester 1");
    const [filteredClasses, setFilteredClasses] = useState([]);

    // Filter classes based on selected semester
    useEffect(() => {
        const filtered = classesData.filter((classItem) =>
            classItem.semester === selectedSemester
        );
        setFilteredClasses(filtered);
    }, [selectedSemester]);

    // Stats data for student dashboard
    const statsData = [
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
            title: "Events",
            count: "4",
            icon: "/assets/calendar3.png",
            bgColor: "#F9F5FF",
        },
    ];

    const statsDataRow2 = [
        {
            title: "Attenance Rate",
            count: "80%",
            icon: "/assets/calendar3.png",
            bgColor: "#F9F5FF",
        },
        {
            title: "Top Scores",
            count: "7",
            icon: "/assets/8.png",
            bgColor: "#FFFAEB",
        },
        {
            title: "Total Classes",
            count: "17",
            icon: "/assets/8.png",
            bgColor: "#E1F2FC",
        },
        {
            title: "Vist Student",
            count: "3",
            icon: "/assets/8.png",
            bgColor: "#E1F2FC",
        },
    ];

    // Initialize filtered classes
    useEffect(() => {
        filterData();
    }, [searchText]);

    // Filter data based on search text
    const filterData = () => {
        let filtered = classesData.filter((classItem) =>
            classItem.subject.toLowerCase().includes(searchText.toLowerCase())
        );

        setFilteredClasses(filtered);
    };

    // Handle semester change
    const handleSemesterChange = (e) => {
        setSelectedSemester(e.target.value);
    };

    // Handle department change
    const handleDepartmentChange = (e) => {
        setDepartmentValue(e.target.value);
    };

    return (
        <Container fluid className="p-0 d-flex">
            <main className="flex-grow-1 p-3">
                {/* Header Section */}
                <header
                    className="d-flex flex-wrap justify-content-between align-items-center  mb-3 w-100"
                    style={{ paddingTop: "0px" }}
                >
                    <div className="d-flex align-items-center mb-2 mb-md-0">
                        <h1 style={{ fontSize: "24px", margin: 0, fontWeight: "600" }}>Student</h1>
                    </div>
                    <div id='user-info' style={{ display: 'flex', alignItems: 'center' }}>
                        {/* User Info */}
                        <img
                            id='info-img'
                            src="/assets/avatar.jpeg" // Replace with your image path
                            alt="User"
                            style={{
                                borderRadius: '50%',
                                width: '54px',
                                height: '54px',
                                marginRight: '10px',

                            }}
                        />
                        <div style={{ marginRight: '10px' }}>
                            <div style={{ fontWeight: '500', fontSize: '14' }}>{userData?.first_name} {userData?.last_name}</div>
                            <div style={{ fontSize: '12px', color: '#6c757d' }}>{userData?.user_id}</div>
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
                            className="d-flex align-items-center"
                            style={{
                                border: "1px solid #EAECF0",
                                borderRadius: "8px",
                                padding: "8px 12px",
                                backgroundColor: "white",
                                cursor: "pointer",
                            }}
                        >
                            <div
                                style={{
                                    fontWeight: 500,
                                    fontSize: "14px",
                                    color: "#111827",
                                    backgroundColor: "transparent",
                                    outline: "none",
                                }}
                            >
                                Department of Computer Science
                            </div>
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
                                6 November 2024
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
                        >
                            <img src="/assets/plus2.png" alt="Add" width={16} height={16} />
                            <span className="d-none d-sm-inline">Add Student</span>
                            <span className="d-inline d-sm-none">Add</span>
                        </Button>
                    </div>
                </div>

                {/* Stats Cards - First Row */}
                <Row className="stat-card">
                    {statsData.map((stat, index) => (
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

                {/* Stats Cards - Second Row */}
                <Row className="stats-card">
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

                {/* Classes Table */}
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
                    {/* Today's Classes Section */}
                    <div className="d-flex flex-wrap justify-content-between align-items-center mt-4 mb-3 p-3">
                        <h2 style={{ fontSize: "24px", fontWeight: "600", margin: "0 0 10px 0" }}>Today's Classes</h2>
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
                                onChange={handleSemesterChange}
                            >
                                <option>Semester 1</option>
                                <option>Semester 2</option>
                                <option>Semester 3</option>
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
                                        Subject
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
                                        Time
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
                                        Date
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
                                        Room
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
                                        Duration
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
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredClasses.map((classItem) => (
                                    <tr key={classItem.id} style={{ borderBottom: "1px solid #ddd" }}>
                                        <td
                                            style={{
                                                padding: "15px",
                                                verticalAlign: "middle",
                                                fontSize: "14px",
                                                fontWeight: "400",
                                                color: "#4B5563",
                                            }}
                                        >
                                            {classItem.subject}
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
                                            {classItem.time}
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
                                            {classItem.date}
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
                                            {classItem.room}
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
                                            {classItem.duration}
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
                                            {classItem.students}
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
                                            <Button
                                                style={{
                                                    backgroundColor: "transparent",
                                                    border: "none",
                                                    borderRadius: "50%",
                                                    width: "32px",
                                                    height: "32px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    padding: "0",
                                                    // margin: "0 auto"
                                                }}
                                                onClick={() => navigate(`/student-details/${classItem.id}`)}
                                            >
                                                <img
                                                    src="/assets/view-btn.png"
                                                    alt="View"
                                                    style={{ width: "24px", height: "24px" }}
                                                />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
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