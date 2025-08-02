import React, { useState, useEffect, useContext } from 'react';
import { Container, Button, Form, Table, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from './UserContext.js';

function Student() {
    const { userData, deptsData, sections } = useContext(UserContext);
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
    const [selectedSemester, setSelectedSemester] = useState("1");
    const [filteredSections, setFilteredSections] = useState([]);

    useEffect(() => {
        if (!sections || !Array.isArray(sections)) return;

        let filtered = sections.filter(section => {
            const departmentMatch = !selectedDepartment ||
                selectedDepartment=== 'All Departments' ||
                section.department?.name === selectedDepartment;

            const semesterMatch = !selectedSemester ||
                section.course?.semester === selectedSemester;

            const searchMatch = !searchText ||
                section.course?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
                section.section?.toLowerCase().includes(searchText.toLowerCase()) ||
                section.room_no?.toLowerCase().includes(searchText.toLowerCase());

            return departmentMatch && semesterMatch && searchMatch;
        });

        setFilteredSections(filtered);
    }, [sections, selectedDepartment, selectedSemester, searchText]);

    const calculateStats = () => {
        if (!sections || !Array.isArray(sections)) {
            return {
                totalStudents: 0,
                activeSections: 0,
                inProgressSections: 0,
                withdrawnSections: 0,
                completedSections: 0,
                totalSections: 0,
                averageAttendance: 0
            };
        }

        const uniqueStudentIds = new Set();
        sections.forEach(section => {
            if (section.student_ids && Array.isArray(section.student_ids)) {
                section.student_ids.forEach(studentId => {
                    uniqueStudentIds.add(studentId);
                });
            }
        });

        const totalStudents = uniqueStudentIds.size;
        const activeSections = sections.filter(s => s.status === 'Active').length;
        const inProgressSections = sections.filter(s => s.status === 'in-progress').length;
        const withdrawnSections = sections.filter(s => s.status === 'withdraw').length;
        const completedSections = sections.filter(s => s.status === 'completed').length;

        let totalPresentCount = 0;
        let totalAttendanceRecords = 0;

        sections.forEach(section => {
            if (section.attendance && Array.isArray(section.attendance)) {
                section.attendance.forEach(attendanceRecord => {
                    if (attendanceRecord.presentCount !== undefined && attendanceRecord.totalStudents !== undefined) {
                        totalPresentCount += attendanceRecord.presentCount;
                        totalAttendanceRecords += attendanceRecord.totalStudents;
                    } else if (attendanceRecord.students && Array.isArray(attendanceRecord.students)) {
                        const presentStudents = attendanceRecord.students.filter(
                            student => student.status === 'Present'
                        ).length;
                        totalPresentCount += presentStudents;
                        totalAttendanceRecords += attendanceRecord.students.length;
                    }
                });
            }
        });

        const averageAttendance = totalAttendanceRecords > 0 ?
            Math.round((totalPresentCount / totalAttendanceRecords) * 100) : 0;

        return {
            totalStudents,
            activeSections,
            inProgressSections,
            withdrawnSections,
            completedSections,
            totalSections: sections.length,
            averageAttendance
        };
    };

    const stats = calculateStats();

    const statsData = [
        {
            title: "Total Students",
            count: stats.totalStudents.toString(),
            icon: "/assets/totalclasses.png",
            bgColor: "#F9F5FF",
        },
        {
            title: "Active Sections",
            count: stats.activeSections.toString(),
            icon: "/assets/8.png",
            bgColor: "#E1F2FC",
        },
        {
            title: "Withdrawn Sections",
            count: stats.withdrawnSections.toString(),
            icon: "/assets/9.png",
            bgColor: "#FEF3F2",
        },
        {
            title: "Total Sections",
            count: stats.totalSections.toString(),
            icon: "/assets/calendar3.png",
            bgColor: "#F9F5FF",
        },
    ];

    const statsDataRow2 = [
        {
            title: "Attendance Rate",
            count: `${stats.averageAttendance}%`,
            icon: "/assets/calendar3.png",
            bgColor: "#F9F5FF",
        },
        {
            title: "In Progress",
            count: stats.inProgressSections.toString(),
            icon: "/assets/8.png",
            bgColor: "#FFFAEB",
        },
        {
            title: "Completed",
            count: stats.completedSections.toString(),
            icon: "/assets/8.png",
            bgColor: "#E1F2FC",
        },
        {
            title: "Departments",
            count: deptsData ? deptsData.length.toString() : "0",
            icon: "/assets/8.png",
            bgColor: "#E1F2FC",
        },
    ];

    const handleDepartmentChange = (e) => {
        setSelectedDepartment(e.target.value);
    };

    const handleSemesterChange = (e) => {
        setSelectedSemester(e.target.value);
    };

    const formatTime = (startTime, endTime) => {
        if (!startTime || !endTime) return "N/A";
        return `${startTime}-${endTime}`;
    };

    const formatDays = (days) => {
        if (!days || !Array.isArray(days)) return "N/A";
        return days.map(day => day.charAt(0).toUpperCase() + day.slice(1)).join(", ");
    };

    const getStatusStyle = (status) => {
        const baseStyle = { ...styles.statusBadge };
        switch (status?.toLowerCase()) {
            case 'completed':
                return { ...baseStyle, ...styles.activeStatus };
            case 'in-progress':
                return { ...baseStyle, ...styles.inProgressStatus };
            case 'withdraw':
                return { ...baseStyle, ...styles.withdrawStatus };
            default:
                return baseStyle;
        }
    };

    const getCurrentDate = () => {
        const today = new Date();
        return today.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    };

    const getUniqueSemesters = () => {
        if (!sections || !Array.isArray(sections)) return [];
        const semesters = sections
            .map(section => section.course?.semester)
            .filter(semester => semester)
            .map(semester => parseInt(semester))
            .filter((semester, index, array) => array.indexOf(semester) === index)
            .sort((a, b) => a - b);
        return semesters;
    };

    const uniqueSemesters = getUniqueSemesters();

    return (
        <Container fluid style={styles.container}>
            <main style={styles.main}>
                {/* Header Section */}
                <header style={styles.header}>
                    <div className="d-flex align-items-center mb-2 mb-md-0">
                        <h1 style={styles.headerTitle}>Students</h1>
                    </div>
                    <div style={styles.userInfo}>
                        <img
                            src={userData?.profile_pic || "/assets/avatar.jpeg"}
                            alt="User"
                            style={styles.userImage}
                        />
                        <div style={{ marginRight: '10px' }}>
                            <div style={styles.userName}>
                                {userData?.full_name} 
                            </div>
                            <div style={styles.userId}>{userData?.admin_id}</div>
                        </div>
                    </div>
                </header>

                {/* Filter Section */}
                <div style={styles.filterSection}>
                    <div style={styles.filterLeft}>
                        <div style={styles.departmentBox}>
                            <select
                                style={styles.departmentText}
                                value={selectedDepartment}
                                onChange={handleDepartmentChange}
                            >
                                <option value={'All Departments'}>All Departments</option>
                                {deptsData && deptsData.map((dept) => (
                                    <option key={dept.id} value={dept.name}>
                                        {dept.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div style={styles.dateBox}>
                            <img
                                src="/assets/calendar1.png"
                                alt="Calendar Icon"
                                width={20}
                                height={20}
                                className="me-2"
                            />
                            <span style={styles.dateText}>
                                {getCurrentDate()}
                            </span>
                        </div>
                    </div>

                    <div style={styles.filterRight}>
                        <div style={styles.searchContainer}>
                            <Form.Control
                                type="text"
                                placeholder="Search course, section, or room"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                style={styles.searchInput}
                            />
                            <img
                                src="/assets/search-lg.png"
                                alt="Search Icon"
                                width={18}
                                height={18}
                                style={styles.searchIcon}
                            />
                        </div>

                        <Button style={styles.addButton}>
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
                            <Card style={styles.statCard}>
                                <Card.Body style={styles.statCardBody}>
                                    <Row className="align-items-center">
                                        <Col xs={3} className="d-flex justify-content-center align-items-center">
                                            <div style={{
                                                ...styles.statIcon,
                                                backgroundColor: stat.bgColor
                                            }}>
                                                <img
                                                    src={stat.icon}
                                                    alt={stat.title}
                                                    style={{ width: "30px", height: "30px" }}
                                                />
                                            </div>
                                        </Col>
                                        <Col xs={9} className="d-flex flex-column justify-content-center">
                                            <Card.Text
                                                style={styles.statCount}
                                                className="responsive-text"
                                            >
                                                {stat.count}
                                            </Card.Text>
                                            <Card.Title style={styles.statTitle}>
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
                            <Card style={styles.statCard}>
                                <Card.Body style={styles.statCardBody}>
                                    <Row className="align-items-center">
                                        <Col xs={3} className="d-flex justify-content-center align-items-center">
                                            <div style={{
                                                ...styles.statIcon,
                                                backgroundColor: stat.bgColor
                                            }}>
                                                <img
                                                    src={stat.icon}
                                                    alt={stat.title}
                                                    style={{ width: "30px", height: "30px" }}
                                                />
                                            </div>
                                        </Col>
                                        <Col xs={9} className="d-flex flex-column justify-content-center">
                                            <Card.Text
                                                style={styles.statCount}
                                                className="responsive-text"
                                            >
                                                {stat.count}
                                            </Card.Text>
                                            <Card.Title style={styles.statTitle}>
                                                {stat.title}
                                            </Card.Title>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                {/* Sections Table */}
                <div style={styles.tableContainer}>
                    <div style={styles.tableHeader}>
                        <h2 style={styles.tableTitle}>Today's Classes</h2>
                        <div style={styles.semesterSelect}>
                            <select
                                style={styles.selectElement}
                                value={selectedSemester}
                                onChange={handleSemesterChange}
                            >
                                <option value="">All Semesters</option>
                                {uniqueSemesters.map(semester => (
                                    <option key={semester} value={semester.toString()}>
                                        Semester {semester}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <Table hover className="table mb-0">
                            <thead style={{ position: "sticky", top: 0, backgroundColor: "#fff", zIndex: 1 }}>
                                <tr>
                                    <th style={styles.tableHeaderCell}>Course</th>
                                    <th style={styles.tableHeaderCell}>Section</th>
                                    <th className="d-none d-md-table-cell" style={styles.tableHeaderCell}>Schedule</th>
                                    <th className="d-none d-md-table-cell" style={styles.tableHeaderCell}>Room</th>
                                    <th className="d-none d-lg-table-cell" style={styles.tableHeaderCell}>Students</th>
                                    <th style={styles.tableHeaderCell}>Status</th>
                                    <th style={styles.tableHeaderCell}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredSections.map((section) => (
                                    <tr key={section.id} style={{ borderBottom: "1px solid #ddd" }}>
                                        <td style={styles.tableCell}>
                                            <div>
                                                <div style={{ fontWeight: '500' }}>
                                                    {section.course?.name || 'N/A'}
                                                </div>
                                                <small style={{ color: '#6B7280' }}>
                                                    {section.course?.code || 'N/A'} • {section.course?.credit_hours || 'N/A'} CH
                                                </small>
                                            </div>
                                        </td>
                                        <td style={styles.tableCell}>
                                            {section.section || 'N/A'}
                                        </td>
                                        <td className="d-none d-md-table-cell" style={styles.tableCell}>
                                            <div>
                                                <div>{formatTime(section.schedule?.start_time, section.schedule?.end_time)}</div>
                                                <small style={{ color: '#6B7280' }}>
                                                    {formatDays(section.schedule?.days)}
                                                </small>
                                            </div>
                                        </td>
                                        <td className="d-none d-md-table-cell" style={styles.tableCell}>
                                            {section.room_no || 'N/A'}
                                        </td>
                                        <td className="d-none d-lg-table-cell" style={styles.tableCell}>
                                            {section.students ? section.students.length : 0}/{section.maxStrength || 'N/A'}
                                        </td>
                                        <td style={styles.tableCell}>
                                            <span style={getStatusStyle(section.status)}>
                                                {section.status || 'N/A'}
                                            </span>
                                        </td>
                                        <td style={{ ...styles.tableCell, textAlign: 'center' }}>
                                            <Button
                                                style={styles.viewButton}
                                                onClick={() => navigate("/student-details", { state: { selectedData: section } })}
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
                                {filteredSections.length === 0 && (
                                    <tr>
                                        <td colSpan="7" style={{ ...styles.tableCell, textAlign: 'center', padding: '40px' }}>
                                            No sections found matching your criteria.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </div>
                </div>

                {/* CSS for responsive design */}
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

const styles = {
    container: {
        padding: 0,
        display: 'flex'
    },
    main: {
        flexGrow: 1,
        padding: '12px'
    },
    header: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '12px',
        width: '100%',
        paddingTop: '0px'
    },
    headerTitle: {
        fontSize: '24px',
        margin: 0,
        fontWeight: '600'
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
    userName: {
        fontWeight: '500',
        fontSize: '14px'
    },
    userId: {
        fontSize: '12px',
        color: '#6c757d'
    },
    filterSection: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px',
        gap: '12px',
        marginTop: '15px',
        width: '100%'
    },
    filterLeft: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '12px'
    },
    filterRight: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '12px'
    },
    departmentBox: {
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #EAECF0',
        borderRadius: '8px',
        padding: '8px 12px',
        backgroundColor: 'white',
        cursor: 'pointer'
    },
    departmentText: {
        fontWeight: 500,
        fontSize: '14px',
        color: '#111827',
        backgroundColor: 'transparent',
        border: 'none',
        outline: 'none',
        WebkitAppearance: 'none',
        MozAppearance: 'none'
    },
    dateBox: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '8px',
        border: '1px solid #EAECF0',
        borderRadius: '8px',
        padding: '8px 12px',
        backgroundColor: 'white',
        cursor: 'pointer'
    },
    dateText: {
        fontSize: '14px',
        fontWeight: '600',
        color: '#111827'
    },
    searchContainer: {
        position: 'relative',
        marginBottom: '8px'
    },
    searchInput: {
        borderRadius: '8px',
        paddingLeft: '36px',
        fontSize: '14px',
        fontWeight: '400',
        color: '#98A2B3',
        border: '1px solid #EAECF0',
        width: '100%',
        minWidth: '200px'
    },
    searchIcon: {
        position: 'absolute',
        top: '50%',
        left: '10px',
        transform: 'translateY(-50%)'
    },
    addButton: {
        backgroundColor: '#1F2937',
        border: 'none',
        borderRadius: '8px',
        padding: '10px 16px',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    statCard: {
        border: '1px solid #E5E7EB',
        borderRadius: '12px',
        backgroundColor: '#FFFFFF',
        height: '100%'
    },
    statCardBody: {
        padding: '16px 24px'
    },
    statIcon: {
        borderRadius: '50%',
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '60px',
        height: '60px'
    },
    statCount: {
        fontSize: '28px',
        fontWeight: '600',
        color: '#111827',
        marginBottom: '0'
    },
    statTitle: {
        fontSize: '14px',
        fontWeight: '500',
        color: '#475467'
    },
    tableContainer: {
        borderCollapse: 'collapse',
        width: '100%',
        border: '1px solid #EAECF0',
        borderRadius: '12px',
        marginTop: '20px',
        overflow: 'hidden'
    },
    tableHeader: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '16px',
        marginBottom: '12px',
        padding: '12px'
    },
    tableTitle: {
        fontSize: '24px',
        fontWeight: '600',
        margin: '0 0 10px 0'
    },
    semesterSelect: {
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #EAECF0',
        borderRadius: '8px',
        padding: '6px 12px',
        backgroundColor: 'white'
    },
    selectElement: {
        border: 'none',
        fontSize: '14px',
        color: '#111827',
        backgroundColor: 'transparent',
        outline: 'none',
        fontWeight: '500',
        cursor: 'pointer'
    },
    tableHeaderCell: {
        background: 'transparent',
        padding: '15px',
        fontSize: '16px',
        fontWeight: '500',
        color: '#111827'
    },
    tableCell: {
        padding: '15px',
        verticalAlign: 'middle',
        fontSize: '14px',
        fontWeight: '400',
        color: '#4B5563'
    },
    viewButton: {
        backgroundColor: 'transparent',
        border: 'none',
        borderRadius: '50%',
        width: '32px',
        height: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0'
    },
    statusBadge: {
        padding: '4px 12px',
        borderRadius: '16px',
        fontSize: '12px',
        fontWeight: '500',
        textTransform: 'capitalize'
    },
    activeStatus: {
        backgroundColor: '#DCFCE7',
        color: '#166534'
    },
    inProgressStatus: {
        backgroundColor: '#FEF3C7',
        color: '#92400E'
    },
    withdrawStatus: {
        backgroundColor: '#FEE2E2',
        color: '#991B1B'
    }
};

export default Student;