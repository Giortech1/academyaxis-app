import React, { useState, useEffect, useContext } from 'react';
import { Container, Button, Form, Image, Table, Modal, Row, Col, Card, InputGroup, FormControl } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from './UserContext.js';


// Sample data for students
const studentsData = [
    {
        id: 1,
        name: "Demo Name 1",
        personId: "12345678",
        department: "Department of Computer Science",
        attendance: 92,
        status: "Present",
        image: "/assets/avatar.jpeg",
    },
    {
        id: 2,
        name: "Demo Name 2",
        personId: "23456789",
        department: "Department of Computer Science",
        attendance: 85,
        status: "Absent",
        image: "/assets/avatar.jpeg",
    },
    {
        id: 3,
        name: "Demo Name 3",
        personId: "34567890",
        department: "Department of Computer Science",
        attendance: 90,
        status: "Leave",
        image: "/assets/avatar.jpeg",
    },
    {
        id: 4,
        name: "Demo Name 4",
        personId: "45678901",
        department: "Department of Computer Science",
        attendance: 92,
        status: "Present",
        image: "/assets/avatar.jpeg",
    },
    {
        id: 5,
        name: "Demo Name 5",
        personId: "56789012",
        department: "Department of Computer Science",
        attendance: 85,
        status: "Absent",
        image: "/assets/avatar.jpeg",
    },
    {
        id: 6,
        name: "Demo Name 6",
        personId: "67890123",
        department: "Department of Computer Science",
        attendance: 90,
        status: "Leave",
        image: "/assets/avatar.jpeg",
    },
    {
        id: 7,
        name: "Demo Name 7",
        personId: "78901234",
        department: "Department of Computer Science",
        attendance: 92,
        status: "Present",
        image: "/assets/avatar.jpeg",
    },
    {
        id: 8,
        name: "Demo Name 8",
        personId: "89012345",
        department: "Department of Computer Science",
        attendance: 85,
        status: "Absent",
        image: "/assets/avatar.jpeg",
    },
    {
        id: 9,
        name: "Demo Name 9",
        personId: "90123456",
        department: "Department of Computer Science",
        attendance: 90,
        status: "Leave",
        image: "/assets/avatar.jpeg",
    },
    {
        id: 10,
        name: "Demo Name 10",
        personId: "01234567",
        department: "Department of Computer Science",
        attendance: 92,
        status: "Present",
        image: "/assets/avatar.jpeg",
    },
    {
        id: 11,
        name: "Demo Name 11",
        personId: "12345670",
        department: "Department of Computer Science",
        attendance: 85,
        status: "Absent",
        image: "/assets/avatar.jpeg",
    },
    {
        id: 12,
        name: "Demo Name 12",
        personId: "23456701",
        department: "Department of Computer Science",
        attendance: 90,
        status: "Present",
        image: "/assets/avatar.jpeg",
    },
];

// Sample data for teachers
const teachersData = [
    {
        id: 101,
        name: "Teacher Name 1",
        personId: "T12345",
        department: "Department of Computer Science",
        attendance: 95,
        status: "Present",
        image: "/assets/avatar.jpeg",
    },
    {
        id: 102,
        name: "Teacher Name 2",
        personId: "T23456",
        department: "Department of Computer Science",
        attendance: 88,
        status: "Absent",
        image: "/assets/avatar.jpeg",
    },
    {
        id: 103,
        name: "Teacher Name 3",
        personId: "T34567",
        department: "Department of Computer Science",
        attendance: 92,
        status: "Leave",
        image: "/assets/avatar.jpeg",
    },
    {
        id: 104,
        name: "Teacher Name 4",
        personId: "T45678",
        department: "Department of Computer Science",
        attendance: 98,
        status: "Present",
        image: "/assets/avatar.jpeg",
    },
    {
        id: 105,
        name: "Teacher Name 5",
        personId: "T56789",
        department: "Department of Computer Science",
        attendance: 82,
        status: "Absent",
        image: "/assets/avatar.jpeg",
    },
    {
        id: 106,
        name: "Teacher Name 6",
        personId: "T67890",
        department: "Department of Computer Science",
        attendance: 94,
        status: "Present",
        image: "/assets/avatar.jpeg",
    },
];

function AttendenceDetail() {
            const { userData } = useContext(UserContext);

    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [selectedRole, setSelectedRole] = useState("For Students");
    const [persons, setPersons] = useState(studentsData);
    const [filteredPersons, setFilteredPersons] = useState([]);
    const [statusFilter, setStatusFilter] = useState("All");

    // Calculate stats for students and teachers
    const calculateStats = (data) => {
        const total = data.length;
        const present = data.filter(person => person.status === "Present").length;
        const absent = data.filter(person => person.status === "Absent").length;
        const leave = data.filter(person => person.status === "Leave").length;

        return {
            total,
            present,
            absent,
            leave
        };
    };

    const studentsStats = calculateStats(studentsData);
    const teachersStats = calculateStats(teachersData);

    // Set current stats based on selected role
    const [currentStats, setCurrentStats] = useState(studentsStats);

    // Initialize filtered persons
    useEffect(() => {
        filterData();
    }, [searchText, persons, statusFilter]);

    // Handle role change (Students vs Teachers)
    useEffect(() => {
        if (selectedRole === "For Students") {
            setPersons(studentsData);
            setCurrentStats(studentsStats);
        } else {
            setPersons(teachersData);
            setCurrentStats(teachersStats);
        }
        // Reset status filter when changing roles
        setStatusFilter("All");
    }, [selectedRole]);

    const handleSubmit = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleCheckboxChange = (id) => {
        const updatedPersons = persons.map((person) =>
            person.id === id
                ? {
                    ...person,
                    status: person.status === "Present" ? "Absent" : person.status === "Absent" ? "Leave" : "Present",
                }
                : person
        );
        setPersons(updatedPersons);
    };

    const handleRoleChange = (e) => {
        setSelectedRole(e.target.value);
    };

    const handleStatsCardClick = (status) => {
        setStatusFilter(status);
    };

    // Filter data based on search text and status filter
    const filterData = () => {
        let filtered = persons.filter((person) =>
            person.name.toLowerCase().includes(searchText.toLowerCase())
        );

        if (statusFilter !== "All") {
            filtered = filtered.filter((person) => person.status === statusFilter);
        }

        setFilteredPersons(filtered);
    };

    // Create stats data for cards
    const statsData = [
        {
            title: `Total ${selectedRole === "For Students" ? "Students" : "Teachers"}`,
            count: currentStats.total,
            img: "/assets/7.png",
            bgColor: "#F3F0FF",
            status: "All"
        },
        {
            title: "Present",
            count: currentStats.present,
            img: "/assets/8.png",
            bgColor: "#D9E9FF",
            status: "Present"
        },
        {
            title: "Absent",
            count: currentStats.absent,
            img: "/assets/9.png",
            bgColor: "#FEE2E2",
            status: "Absent"
        },
        {
            title: "Leave",
            count: currentStats.leave,
            img: "/assets/10.png",
            bgColor: "#FFFBEB",
            status: "Leave"
        }
    ];

    return (
        <Container fluid className="p-0 d-flex">
            <main className="flex-grow-1 p-3">
                {/* Header Section */}
                <header
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom:'20px',
                        width: "100%",
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <h1 style={{ fontSize: "24px", margin: 0, fontWeight: "600" }}>Attendance</h1>
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
                <header
                    className="d-flex justify-content-between align-items-center mb-4"
                    style={{ marginTop: "15px", width: "100%" }}
                >
                    <div className="d-flex align-items-center gap-3">
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
                            className="d-flex align-items-center"
                            style={{
                                border: "1px solid #EAECF0",
                                borderRadius: "8px",
                                padding: "8px 12px",
                                backgroundColor: "white",
                                cursor: "pointer",
                            }}
                        >
                            <Image
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

                    <div className="d-flex align-items-center gap-3">
                        <div className="position-relative">
                            <Form.Control
                                type="text"
                                placeholder="Search"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                style={{
                                    borderRadius: "8px",
                                    paddingLeft: "36px",
                                    fontSize: "14px",
                                    fontWeight: "400",
                                    color: "#98A2B3",
                                    border: "1px solid #EAECF0",
                                    width: "250px",
                                }}
                            />
                            <Image
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
                            <select
                                style={{
                                    border: "none",
                                    fontWeight: 600,
                                    fontSize: "14px",
                                    color: "#111827",
                                    backgroundColor: "transparent",
                                    outline: "none",
                                }}
                                value={selectedRole}
                                onChange={handleRoleChange}
                            >
                                <option>For Students</option>
                                <option>For Teachers</option>
                            </select>
                        </div>
                    </div>
                </header>

                {/* Stats Cards */}
                <Row className="d-flex justify-content-between">
                    {statsData.map((stat, index) => (
                        <Col md={3} key={index} className="mb-3">
                            <Card
                                style={{
                                    border: '1px solid #E5E7EB',
                                    borderRadius: '12px',
                                    backgroundColor: '#FFFFFF',
                                    cursor: 'pointer',
                                    borderColor: statusFilter === stat.status ? '#3B82F6' : '#E5E7EB'
                                }}
                                onClick={() => handleStatsCardClick(stat.status)}
                            >
                                <Card.Body style={{ padding: '16px 46px' }}>
                                    <Row>
                                        <Col xs={3} className="d-flex justify-content-center align-items-center">
                                            <div style={{
                                                backgroundColor: stat.bgColor,
                                                borderRadius: '50%',
                                                padding: '16px',
                                            }}>
                                                <img
                                                    src={stat.img}
                                                    alt={stat.title}
                                                    style={{
                                                        width: '30px',
                                                        height: '30px',
                                                    }}
                                                />
                                            </div>
                                        </Col>
                                        <Col xs={9} className="d-flex flex-column justify-content-center">
                                            <Card.Text style={{ fontSize: '36px', fontWeight: '600', color: '#111827', marginBottom: '0' }}>
                                                {stat.count}
                                            </Card.Text>
                                            <Card.Title style={{ fontSize: '14px', fontWeight: '500', color: '#475467' }}>
                                                {stat.title}
                                            </Card.Title>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                {/* Attendance Table */}
                <div style={{ borderCollapse: "collapse", width: "100%", border: '1px solid #EAECF0', borderRadius: '12px', maxHeight: '600px', overflowY: 'auto' }}>
                    <Table responsive hover className="table" style={{ borderCollapse: "collapse", width: "100%", marginBottom: 0 }}>
                        <thead style={{ position: "sticky", top: 0, backgroundColor: "#fff", zIndex: 1 }}>
                            <tr>
                                <th style={{ background: 'transparent', padding: '15px', fontSize: '16px', fontWeight: '500', color: '#111827' }}>Sr No.</th>
                                <th style={{ background: 'transparent', padding: '15px', fontSize: '16px', fontWeight: '500', color: '#111827' }}>
                                    {selectedRole === "For Students" ? "Students" : "Teachers"}
                                </th>
                                <th style={{ background: 'transparent', padding: '15px', fontSize: '16px', fontWeight: '500', color: '#111827' }}>ID</th>
                                <th style={{ background: 'transparent', padding: '15px', fontSize: '16px', fontWeight: '500', color: '#111827' }}>Department</th>
                                <th style={{ background: 'transparent', padding: '15px', fontSize: '16px', fontWeight: '500', color: '#111827' }}>Attendance</th>
                                <th style={{ background: 'transparent', padding: '15px', fontSize: '16px', fontWeight: '500', color: '#111827' }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPersons.map((person, index) => (
                                <tr key={person.id} style={{ borderBottom: "1px solid #ddd" }}>
                                    <td style={{ padding: "15px", verticalAlign: "middle", fontSize: '14px', fontWeight: '400', color: '#4B5563' }}>{index + 1}</td>
                                    <td className="d-flex align-items-center" style={{ padding: '15px', verticalAlign: "middle", fontSize: '12px', fontWeight: '500', color: '#101828', borderBottom: 'none' }}>
                                        <Image src={person.image} roundedCircle width={36} height={36} className="me-2" />
                                        {person.name}
                                    </td>
                                    <td style={{ padding: "15px", verticalAlign: "middle", fontSize: '14px', fontWeight: '400', color: '#4B5563' }}>{person.personId}</td>
                                    <td style={{ padding: "15px", verticalAlign: "middle", fontSize: '14px', fontWeight: '400', color: '#4B5563' }}>{person.department}</td>
                                    <td style={{
                                        padding: "15px",
                                        verticalAlign: "middle",
                                        fontSize: '14px',
                                        fontWeight: '400',
                                        color: parseFloat(person.attendance) < 75 ? "#FDB022" : "#12B76A"
                                    }}>
                                        {person.attendance}%
                                    </td>
                                    <td style={{ padding: "15px", verticalAlign: "middle", fontSize: '12px', fontWeight: '500', color: '#1C222E', display: 'flex', alignItems: 'center', borderBottom: 'none' }}>
                                        <span style={{
                                            display: "inline-block",
                                            width: "8px",
                                            height: "8px",
                                            backgroundColor:
                                                person.status === "Present"
                                                    ? "green"
                                                    : person.status === "Absent"
                                                        ? "red"
                                                        : "black",
                                            borderRadius: "50%",
                                            marginRight: "8px"
                                        }}></span>
                                        {person.status}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <style jsx>{`
   .table-hover>tbody>tr:hover>* {
    --bs-table-color-state: var(--bs-table-hover-color);
    --bs-table-bg-state: transparent !important; 
}
  `}</style>
                </div>

                {/* Submit Button - Optional */}
                {/* <div className="d-flex justify-content-end mt-3">
                    <Button
                        variant="primary"
                        onClick={handleSubmit}
                        style={{
                            backgroundColor: "#3B82F6",
                            border: "none",
                            borderRadius: "8px",
                            padding: "10px 16px",
                            fontWeight: "600"
                        }}
                    >
                        Submit Attendance
                    </Button>
                </div> */}

                {/* Modal */}
                <Modal show={showModal} onHide={handleCloseModal} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Attendance Submitted</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Attendance has been successfully submitted!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </main>
        </Container>
    );
}

export default AttendenceDetail;