import React, { useState, useEffect, useContext } from 'react';
import { Container, Button, Form, Image, Table, Modal, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from './UserContext.js';

function AttendanceDetails() {
    const { userData } = useContext(UserContext);
    const location = useLocation();
    const selectedData = location.state?.selectedData;

    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [studentsData, setStudentsData] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [statusFilter, setStatusFilter] = useState("All");
    const [currentStats, setCurrentStats] = useState({
        total: 0,
        present: 0,
        absent: 0,
        leave: 0
    });

    useEffect(() => {
        if (selectedData && selectedData.students) {
            processStudentData();
        }
    }, [selectedData]);

    const processStudentData = () => {
        if (!selectedData || !selectedData.students) {
            return;
        }

        const hasAttendanceData = selectedData.attendance && Array.isArray(selectedData.attendance) && selectedData.attendance.length > 0;

        const latestAttendance = hasAttendanceData
            ? selectedData.attendance[selectedData.attendance.length - 1]
            : null;

        const processedStudents = selectedData.students.map((student, index) => {
            let attendanceStatus = "Null";
            let attendancePercentage = 0;

            if (!hasAttendanceData) {
                attendanceStatus = "Null";
                attendancePercentage = 0;
            } else {
                if (latestAttendance && latestAttendance.students && Array.isArray(latestAttendance.students)) {
                    const studentAttendance = latestAttendance.students.find(
                        att => att.studentId === student.id
                    );
                    if (studentAttendance) {
                        attendanceStatus = studentAttendance.status || "Present";
                    }
                }

                const presentCount = selectedData.attendance.reduce((count, record) => {
                    if (record.students && Array.isArray(record.students)) {
                        const studentRecord = record.students.find(s => s.studentId === student.id);
                        return count + (studentRecord && studentRecord.status === "Present" ? 1 : 0);
                    }
                    return count;
                }, 0);

                attendancePercentage = selectedData.attendance.length > 0
                    ? Math.round((presentCount / selectedData.attendance.length) * 100)
                    : 0;
            }

            return {
                id: student.id,
                name: student.full_name || `${student.first_name || ''} ${student.last_name || ''}`.trim(),
                personId: student.id,
                department: student.department?.name || selectedData.department?.name || 'Unknown Department',
                attendance: attendancePercentage,
                status: attendanceStatus,
                image: student?.profile_pic || "/assets/avatar.jpeg"
            };
        });

        setStudentsData(processedStudents);

        const stats = calculateStats(processedStudents);
        setCurrentStats(stats);
    };
    console.log('SelectedData: ', selectedData.attendance);

    const calculateStats = (processedStudents) => {
        const hasAttendanceData = selectedData?.attendance && Array.isArray(selectedData.attendance) && selectedData.attendance.length > 0;

        if (!hasAttendanceData) {
            return {
                total: processedStudents.length,
                present: 0,
                absent: 0,
                leave: 0
            };
        }

        let totalPresent = 0;
        let totalAbsent = 0;
        let totalLeave = 0;
        let totalDays = selectedData.attendance.length;

        selectedData.attendance.forEach(attendanceRecord => {
            if (attendanceRecord.students && Array.isArray(attendanceRecord.students)) {
                attendanceRecord.students.forEach(studentRecord => {
                    switch (studentRecord.status) {
                        case "Present":
                            totalPresent++;
                            break;
                        case "Absent":
                            totalAbsent++;
                            break;
                        case "Leave":
                            totalLeave++;
                            break;
                    }
                });
            }
        });

        return {
            total: processedStudents.length,
            present: totalPresent,
            absent: totalAbsent,
            leave: totalLeave
        };
    };

    useEffect(() => {
        let filtered = studentsData.filter((student) =>
            student.name.toLowerCase().includes(searchText.toLowerCase())
        );

        if (statusFilter !== "All") {
            filtered = filtered.filter((student) => student.status === statusFilter);
        }

        setFilteredStudents(filtered);
    }, [searchText, studentsData, statusFilter]);

    const handleSubmit = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleStatsCardClick = (status) => {
        setStatusFilter(status);
    };

    const getCurrentDate = () => {
        if (selectedData?.attendance && Array.isArray(selectedData.attendance) && selectedData.attendance.length > 0) {
            const latestAttendance = selectedData.attendance[selectedData.attendance.length - 1];
            return latestAttendance.date || new Date().toLocaleDateString();
        }
        return new Date().toLocaleDateString();
    };

    const formatDate = (dateString) => {
        if (!dateString) return new Date().toLocaleDateString();

        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        } catch (error) {
            return dateString;
        }
    };

    const statsData = [
        {
            title: "Total Students",
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

    if (!selectedData) {
        return (
            <Container fluid style={styles.container}>
                <div style={styles.main}>
                    <h3>No section data available</h3>
                    <p>Please select a section from the timetable to view attendance details.</p>
                    <Button onClick={() => navigate('/timetable')}>Back to Timetable</Button>
                </div>
            </Container>
        );
    }

    return (
        <Container fluid className="p-0 d-flex" style={styles.container}>
            <main className="flex-grow-1 p-3" style={styles.main}>
                {/* Header Section */}
                <header style={styles.header}>
                    <div style={styles.headerTitle}>
                        <Image
                            src="/assets/arrow-left.png"
                            roundedCircle
                            width={24}
                            height={24}
                            className="me-2"
                            alt="Back Arrow"
                            style={styles.backArrow}
                            onClick={() => navigate(-1)}
                        />
                        <h1 style={styles.title}>Attendance - {selectedData.course?.name || 'Course'}</h1>
                    </div>

                    <div style={styles.userInfo}>
                        <img
                            src={userData?.profile_pic || "/assets/avatar.jpeg"}
                            alt="User"
                            style={styles.userImage}
                        />
                        <div style={styles.userDetails}>
                            <div style={styles.userName}>
                                {userData?.full_name || `${userData?.first_name || ''} ${userData?.last_name || ''}`.trim() || 'User'}
                            </div>
                            <div style={styles.userId}>
                                {userData?.admin_id || 'ID'}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Filter Section */}
                <header className="d-flex justify-content-between align-items-center mb-4" style={styles.filterSection}>
                    <div className="d-flex align-items-center" style={styles.filterLeft}>
                        <div className="d-flex align-items-center" style={styles.filterBox}>
                            <div style={styles.filterText}>
                                {selectedData.department?.name || 'Department'}
                            </div>
                        </div>

                        <div className="d-flex align-items-center" style={styles.dateBox}>
                            <Image
                                src="/assets/calendar1.png"
                                alt="Calendar Icon"
                                width={20}
                                height={20}
                                className="me-2"
                            />
                            <span style={styles.dateText}>
                                {formatDate(getCurrentDate())}
                            </span>
                        </div>

                        <div className="d-flex align-items-center" style={styles.filterBox}>
                            <div style={styles.filterText}>
                                Section {selectedData.section} - Room {selectedData.room_no}
                            </div>
                        </div>
                    </div>

                    <div className="d-flex align-items-center" style={styles.filterRight}>
                        <div style={styles.searchContainer}>
                            <Form.Control
                                type="text"
                                placeholder="Search students..."
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                style={styles.searchInput}
                            />
                            <Image
                                src="/assets/search-lg.png"
                                alt="Search Icon"
                                width={18}
                                height={18}
                                style={styles.searchIcon}
                            />
                        </div>
                    </div>
                </header>

                {/* Stats Cards */}
                <Row className="d-flex justify-content-between">
                    {statsData.map((stat, index) => (
                        <Col md={3} key={index} className="mb-3">
                            <Card
                                style={{
                                    ...styles.cardContainer,
                                    borderColor: statusFilter === stat.status ? '#3B82F6' : '#E5E7EB',
                                    borderWidth: statusFilter === stat.status ? '2px' : '1px'
                                }}
                                onClick={() => handleStatsCardClick(stat.status)}
                            >
                                <Card.Body style={styles.cardBody}>
                                    <Row>
                                        <Col xs={3} className="d-flex justify-content-center align-items-center">
                                            <div style={{
                                                ...styles.iconContainer,
                                                backgroundColor: stat.bgColor
                                            }}>
                                                <img
                                                    src={stat.img}
                                                    alt={stat.title}
                                                    style={{
                                                        width: '30px',
                                                        height: '30px'
                                                    }}
                                                />
                                            </div>
                                        </Col>
                                        <Col xs={9} className="d-flex flex-column justify-content-center">
                                            <Card.Text style={styles.cardNumber}>
                                                {stat.count}
                                            </Card.Text>
                                            <Card.Title style={styles.cardTitle}>
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
                <div style={styles.tableContainer}>
                    <Table responsive hover className="table" style={styles.table}>
                        <thead style={styles.tableHeader}>
                            <tr>
                                <th style={styles.tableHeaderCell}>Sr No.</th>
                                <th style={styles.tableHeaderCell}>Students</th>
                                <th style={styles.tableHeaderCell}>Student ID</th>
                                <th style={styles.tableHeaderCell}>Department</th>
                                <th style={styles.tableHeaderCell}>Attendance</th>
                                <th style={styles.tableHeaderCell}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.length > 0 ? (
                                filteredStudents.map((student, index) => (
                                    <tr key={student.id} style={styles.tableRow}>
                                        <td style={styles.tableCell}>{index + 1}</td>
                                        <td className="d-flex align-items-center" style={styles.tableCellName}>
                                            <Image
                                                src={student.image}
                                                roundedCircle
                                                width={36}
                                                height={36}
                                                className="me-2"
                                                onError={(e) => {
                                                    e.target.src = "/assets/avatar.jpeg";
                                                }}
                                            />
                                            {student.name}
                                        </td>
                                        <td style={styles.tableCell}>{student.personId}</td>
                                        <td style={styles.tableCell}>{student.department}</td>
                                        <td style={{
                                            ...styles.tableCell,
                                            ...(parseFloat(student.attendance) < 75 ?
                                                styles.attendancePoor :
                                                styles.attendanceGood)
                                        }}>
                                            {student.attendance}%
                                        </td>
                                        <td style={styles.tableCellStatus}>
                                            <span style={{
                                                ...styles.statusDot,
                                                backgroundColor:
                                                    student.status === "Present"
                                                        ? "#22C55E"
                                                        : student.status === "Absent"
                                                            ? "#EF4444"
                                                            : "#F59E0B"
                                            }}></span>
                                            {student.status}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} style={{ ...styles.tableCell, textAlign: 'center', padding: '2rem' }}>
                                        {searchText ? `No students found matching "${searchText}"` : 'No students found'}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    <style jsx>{`
                        .table-hover>tbody>tr:hover>* {
                            --bs-table-color-state: var(--bs-table-hover-color);
                            --bs-table-bg-state: transparent !important; 
                        }
                    `}</style>
                </div>

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

const styles = {
    container: {
        padding: 0
    },
    main: {
        flexGrow: 1,
        padding: '1rem'
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: '20px',
        width: "100%"
    },
    headerTitle: {
        display: "flex",
        alignItems: "center"
    },
    backArrow: {
        cursor: "pointer"
    },
    title: {
        fontSize: "24px",
        margin: 0,
        fontWeight: "600"
    },
    userInfo: {
        display: 'flex',
        alignItems: 'center'
    },
    userImage: {
        borderRadius: '50%',
        width: '54px',
        height: '54px',
        marginRight: '10px'
    },
    userDetails: {
        marginRight: '10px'
    },
    userName: {
        fontWeight: '500',
        fontSize: '14px'
    },
    userId: {
        fontSize: '12px',
        color: '#6c757d'
    },
    filterSection: {
        marginTop: "15px",
        width: "100%"
    },
    filterLeft: {
        gap: '1rem'
    },
    filterRight: {
        gap: '1rem'
    },
    filterBox: {
        border: "1px solid #EAECF0",
        borderRadius: "8px",
        padding: "8px 12px",
        backgroundColor: "white",
        cursor: "pointer"
    },
    filterText: {
        fontWeight: 500,
        fontSize: "14px",
        color: "#111827",
        backgroundColor: "transparent",
        outline: "none"
    },
    dateBox: {
        border: "1px solid #EAECF0",
        borderRadius: "8px",
        padding: "8px 12px",
        backgroundColor: "white",
        cursor: "pointer"
    },
    dateText: {
        fontSize: "14px",
        fontWeight: "600",
        color: "#111827"
    },
    searchContainer: {
        position: "relative"
    },
    searchInput: {
        borderRadius: "8px",
        paddingLeft: "36px",
        fontSize: "14px",
        fontWeight: "400",
        color: "#98A2B3",
        border: "1px solid #EAECF0",
        width: "250px"
    },
    searchIcon: {
        position: "absolute",
        top: "50%",
        left: "10px",
        transform: "translateY(-50%)"
    },
    tableContainer: {
        borderCollapse: "collapse",
        width: "100%",
        border: '1px solid #EAECF0',
        borderRadius: '12px',
        maxHeight: '600px',
        overflowY: 'auto'
    },
    table: {
        borderCollapse: "collapse",
        width: "100%",
        marginBottom: 0
    },
    tableHeader: {
        position: "sticky",
        top: 0,
        backgroundColor: "#fff",
        zIndex: 1
    },
    tableHeaderCell: {
        background: 'transparent',
        padding: '15px',
        fontSize: '16px',
        fontWeight: '500',
        color: '#111827'
    },
    tableRow: {
        borderBottom: "1px solid #ddd"
    },
    tableCell: {
        padding: "15px",
        verticalAlign: "middle",
        fontSize: '14px',
        fontWeight: '400',
        color: '#4B5563'
    },
    tableCellName: {
        padding: '15px',
        verticalAlign: "middle",
        fontSize: '12px',
        fontWeight: '500',
        color: '#101828',
        borderBottom: 'none'
    },
    tableCellStatus: {
        padding: "15px",
        verticalAlign: "middle",
        fontSize: '12px',
        fontWeight: '500',
        color: '#1C222E',
        display: 'flex',
        alignItems: 'center',
        borderBottom: 'none'
    },
    statusDot: {
        display: "inline-block",
        width: "8px",
        height: "8px",
        borderRadius: "50%",
        marginRight: "8px"
    },
    attendanceGood: {
        color: "#12B76A"
    },
    attendancePoor: {
        color: "#FDB022"
    },
    cardContainer: {
        border: '1px solid #E5E7EB',
        borderRadius: '12px',
        backgroundColor: '#FFFFFF',
        cursor: 'pointer',
        transition: 'all 0.2s ease'
    },
    cardBody: {
        padding: '16px 46px'
    },
    iconContainer: {
        borderRadius: '50%',
        padding: '16px'
    },
    cardNumber: {
        fontSize: '36px',
        fontWeight: '600',
        color: '#111827',
        marginBottom: '0'
    },
    cardTitle: {
        fontSize: '14px',
        fontWeight: '500',
        color: '#475467'
    }
};

export default AttendanceDetails;