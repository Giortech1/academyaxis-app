import React, { useState, useEffect, useContext } from 'react';
import { Container, Button, Form, Table, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from './UserContext.js';

function Teachers() {
    const { userData, deptsData, sections } = useContext(UserContext);
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
    const [selectedSemester, setSelectedSemester] = useState("1");
    const [filteredSections, setFilteredSections] = useState([]);
    const [uniqueTeachers, setUniqueTeachers] = useState([]);

    useEffect(() => {
        if (!sections || !Array.isArray(sections)) return;

        const teachersMap = new Map();
        sections.forEach(section => {
            if (section.teachers && Array.isArray(section.teachers)) {
                section.teachers.forEach(teacher => {
                    if (!teachersMap.has(teacher.teacher_id)) {
                        teachersMap.set(teacher.teacher_id, teacher);
                    }
                });
            }
        });
        setUniqueTeachers(Array.from(teachersMap.values()));

        let filtered = sections.filter(section => {
            const departmentMatch = selectedDepartment === 'All Departments' || 
                section.department?.name === selectedDepartment;

            const semesterMatch = !selectedSemester || 
                section.course?.semester === selectedSemester;

            const searchMatch = !searchText || 
                section.course?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
                section.room_no?.toLowerCase().includes(searchText.toLowerCase()) ||
                (section.teachers && section.teachers.some(teacher => 
                    teacher.full_name?.toLowerCase().includes(searchText.toLowerCase()) ||
                    teacher.first_name?.toLowerCase().includes(searchText.toLowerCase()) ||
                    teacher.last_name?.toLowerCase().includes(searchText.toLowerCase())
                ));

            return departmentMatch && semesterMatch && searchMatch;
        });

        setFilteredSections(filtered);
    }, [sections, selectedDepartment, selectedSemester, searchText]);

    const calculateStats = () => {
        if (!sections || !Array.isArray(sections) || !uniqueTeachers) {
            return {
                totalTeachers: 0,
                activeTeachers: 0,
                totalSections: 0,
                completedClasses: 0,
                inProgressClasses: 0,
                scheduledClasses: 0,
                cancelledClasses: 0,
                totalDepartments: 0
            };
        }

        const totalTeachers = uniqueTeachers.length;
        const activeTeachers = uniqueTeachers.filter(teacher => teacher.status === 'Active').length;
        const totalSections = sections.length;

        const completedClasses = sections.filter(s => s.status === 'completed').length;
        const inProgressClasses = sections.filter(s => s.status === 'in-progress').length;
        const scheduledClasses = sections.filter(s => s.status === 'Active').length;
        const cancelledClasses = sections.filter(s => s.status === 'withdraw').length;

        return {
            totalTeachers,
            activeTeachers,
            totalSections,
            completedClasses,
            inProgressClasses,
            scheduledClasses,
            cancelledClasses,
            totalDepartments: deptsData ? deptsData.length : 0
        };
    };

    const stats = calculateStats();

    const statsData = [
        {
            title: "Total Teachers",
            count: stats.totalTeachers.toString(),
            icon: "/assets/totalclasses.png",
            bgColor: "#F9F5FF",
        },
        {
            title: "Active Teachers",
            count: stats.activeTeachers.toString(),
            icon: "/assets/8.png",
            bgColor: "#E1F2FC",
        },
        {
            title: "Total Sections",
            count: stats.totalSections.toString(),
            icon: "/assets/9.png",
            bgColor: "#FEF3F2",
        },
        {
            title: "Departments",
            count: stats.totalDepartments.toString(),
            icon: "/assets/calendar3.png",
            bgColor: "#F9F5FF",
        },
    ];

    const statsDataRow2 = [
        {
            title: "Completed Classes",
            count: stats.completedClasses.toString(),
            icon: "/assets/calendar3.png",
            bgColor: "#F9F5FF",
        },
        {
            title: "In Progress",
            count: stats.inProgressClasses.toString(),
            icon: "/assets/8.png",
            bgColor: "#FFFAEB",
        },
        {
            title: "Scheduled",
            count: stats.scheduledClasses.toString(),
            icon: "/assets/8.png",
            bgColor: "#E1F2FC",
        },
        {
            title: "Cancelled",
            count: stats.cancelledClasses.toString(),
            icon: "/assets/8.png",
            bgColor: "#FEE2E2",
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
        return `${startTime} - ${endTime}`;
    };

    const formatDays = (days) => {
        if (!days || !Array.isArray(days)) return "N/A";
        return days.map(day => day.charAt(0).toUpperCase() + day.slice(1)).join(", ");
    };

    const getStatusStyle = (status) => {
        const baseStyle = { ...styles.statusBadge };
        switch (status?.toLowerCase()) {
            case 'completed':
            case 'complete':
                return { ...baseStyle, ...styles.completedStatus };
            case 'in-progress':
            case 'ongoing':
                return { ...baseStyle, ...styles.inProgressStatus };
            case 'active':
            case 'scheduled':
            case 'schedule':
                return { ...baseStyle, ...styles.activeStatus };
            case 'cancelled':
            case 'withdraw':
                return { ...baseStyle, ...styles.cancelledStatus };
            default:
                return { ...baseStyle, ...styles.scheduledStatus };
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
                        <h1 style={styles.headerTitle}>Teachers</h1>
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
                                <option value="All Departments">All Departments</option>
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
                                placeholder="Search teacher, course, or room"
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
                            <span className="d-none d-sm-inline">Add Teacher</span>
                            <span className="d-inline d-sm-none">Add</span>
                        </Button>
                    </div>
                </div>

                {/* Stats Cards - First Row */}
                <Row className="stats-cards">
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
                <Row className="stats-cards">
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

                {/* Classes Table */}
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
                                    <th style={styles.tableHeaderCell}>Time</th>
                                    <th className="d-none d-md-table-cell" style={styles.tableHeaderCell}>Days</th>
                                    <th className="d-none d-md-table-cell" style={styles.tableHeaderCell}>Room</th>
                                    <th className="d-none d-lg-table-cell" style={styles.tableHeaderCell}>Status</th>
                                    <th style={styles.tableHeaderCell}>Teacher</th>
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
                                                    {section.course?.code || 'N/A'} • Section {section.section || 'N/A'}
                                                </small>
                                            </div>
                                        </td>
                                        <td style={styles.tableCell}>
                                            {formatTime(section.schedule?.start_time, section.schedule?.end_time)}
                                        </td>
                                        <td className="d-none d-md-table-cell" style={styles.tableCell}>
                                            {formatDays(section.schedule?.days)}
                                        </td>
                                        <td className="d-none d-md-table-cell" style={styles.tableCell}>
                                            {section.room_no || 'N/A'}
                                        </td>
                                        <td className="d-none d-lg-table-cell" style={styles.tableCell}>
                                            <span style={getStatusStyle(section.status)}>
                                                {section.status || 'N/A'}
                                            </span>
                                        </td>
                                        <td style={styles.tableCell}>
                                            {section.teachers && section.teachers.length > 0 ? (
                                                <div style={styles.teacherInfo}>
                                                    <div style={styles.teacherImage}>
                                                        <img
                                                            src={section.teachers[0].profile_pic || "/assets/avatar.jpeg"}
                                                            alt={section.teachers[0].full_name}
                                                            style={styles.teacherImageImg}
                                                            onError={(e) => {
                                                                e.target.onerror = null;
                                                                e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'%3E%3C/path%3E%3Ccircle cx='12' cy='7' r='4'%3E%3C/circle%3E%3C/svg%3E";
                                                            }}
                                                        />
                                                    </div>
                                                    <div>
                                                        <div style={styles.teacherName}>
                                                            {section.teachers[0].full_name || `${section.teachers[0].first_name} ${section.teachers[0].last_name}`}
                                                        </div>
                                                        <div style={styles.teacherDetails}>
                                                            {section.teachers[0].teacher_id}
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <span style={{ color: '#6B7280' }}>No Teacher Assigned</span>
                                            )}
                                        </td>
                                        <td style={{ ...styles.tableCell, textAlign: 'center' }}>
                                            <Button
                                                style={styles.viewButton}
                                                onClick={() => navigate("/teacher-details", { state: { selectedData: section } })}
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
                                            No classes found matching your criteria.
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
        marginBottom: '16px',
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
        outline: 'none'
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
    teacherInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    teacherImage: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        overflow: 'hidden'
    },
    teacherImageImg: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    },
    teacherName: {
        fontSize: '14px',
        fontWeight: '500',
        color: '#101828'
    },
    teacherDetails: {
        fontSize: '12px',
        color: '#6B7280'
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
    completedStatus: {
        backgroundColor: '#E0E7FF',
        color: '#3730A3'
    },
    cancelledStatus: {
        backgroundColor: '#FEE2E2',
        color: '#991B1B'
    },
    scheduledStatus: {
        backgroundColor: '#F3F4F6',
        color: '#374151'
    }
};

export default Teachers;