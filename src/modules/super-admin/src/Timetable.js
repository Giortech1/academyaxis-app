import React, { useState, useEffect, useContext } from 'react';
import { Container, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from './UserContext.js';

function Timetable() {
    const { userData, deptsData, sections } = useContext(UserContext);

    const [tableData, setTableData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const [searchText, setSearchText] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
    const [selectedYear, setSelectedYear] = useState("2025");
    const years = ["2025", "2024", "2023", "2022", "2021"];

    console.log('Dept data: ', deptsData);
    console.log('Sections: ', sections);

    useEffect(() => {
        const convertSectionsToTableData = () => {
            if (!sections || !Array.isArray(sections)) {
                setTableData([]);
                setFilteredData([]);
                setIsLoading(false);
                return;
            }

            try {
                const convertedData = sections.map((section, index) => {
                    const course = section.course || {};
                    const department = section.department || {};
                    const schedule = section.schedule || {};
                    const students = section.students || [];
                    const teachers = section.teachers || [];

                    const formatSchedule = () => {
                        const days = schedule.days || [];
                        const startTime = schedule.start_time || '';
                        const endTime = schedule.end_time || '';

                        if (days.length === 0) return 'No schedule';

                        const dayNames = days.map(day =>
                            day.charAt(0).toUpperCase() + day.slice(1)
                        ).join(', ');

                        return `${dayNames} ${startTime}-${endTime}`;
                    };

                    const avatars = section?.students
                        .filter(student => student.profile_pic && typeof student.profile_pic === 'string')
                        .map(student => student.profile_pic);

                    return {
                        id: section.id || `section-${index}`,
                        subjectName: course.name || 'Unknown Course',
                        courseCode: course.code || '',
                        roomNo: section.room_no || 'TBA',
                        strength: students.length || 0,
                        departmentName: department.name || 'Unknown Department',
                        departmentCode: department.code || '',
                        participants: students.length || 0,
                        year: new Date(section.createdAt).getFullYear().toString() || "2025",
                        section: section.section || '',
                        status: section.status || 'active',
                        schedule: formatSchedule(),
                        teachers: teachers.map(t => t.full_name || t.name || 'Unknown').join(', '),
                        avatars: avatars,
                        program: section.program?.name || '',
                        creditHours: course.credit_hours || '3'
                    };
                });

                setTableData(convertedData);
                setFilteredData(convertedData);

                if (deptsData && deptsData.length > 0 && !selectedDepartment) {
                    setSelectedDepartment(deptsData[0].name);
                }

                setIsLoading(false);
            } catch (err) {
                console.error('Error converting sections data:', err);
                setError("Failed to process sections data. Please try again later.");
                setIsLoading(false);
            }
        };

        convertSectionsToTableData();
    }, [sections, deptsData, selectedDepartment]);

    useEffect(() => {
        let results = [...tableData];

        if (selectedDepartment && selectedDepartment !== "All Departments") {
            results = results.filter(item => item.departmentName === selectedDepartment);
        }

        if (selectedYear) {
            results = results.filter(item => item.year === selectedYear);
        }

        if (searchText) {
            const searchLower = searchText.toLowerCase();
            results = results.filter(item =>
                item.subjectName.toLowerCase().includes(searchLower) ||
                item.courseCode.toLowerCase().includes(searchLower) ||
                item.roomNo.toLowerCase().includes(searchLower) ||
                item.departmentName.toLowerCase().includes(searchLower) ||
                item.teachers.toLowerCase().includes(searchLower) ||
                item.section.toLowerCase().includes(searchLower)
            );
        }

        setFilteredData(results);
    }, [tableData, selectedDepartment, selectedYear, searchText]);

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };

    const SubjectCard = ({ card }) => {
        return (
            <div style={styles.sectionCard}>
                {/* Left Side: Subject Name and Details */}
                <div style={styles.cardLeft}>
                    <h5 style={styles.cardTitle}>
                        {card.subjectName}
                    </h5>
                    <p style={styles.cardSubtitle}>
                        {card.courseCode} - Section {card.section}
                    </p>
                    <p style={styles.scheduleText}>
                        {card.schedule}
                    </p>
                    {card.teachers && (
                        <p style={styles.scheduleText}>
                            Teacher: {card.teachers}
                        </p>
                    )}
                </div>

                {/* Middle: Avatar Group */}
                <div style={styles.cardMiddle}>
                    <div style={styles.avatarGroup}>

                        {/* Show first 5 avatars */}
                        {card.avatars.slice(0, 5).map((avatar, i) => (
                            <div
                                key={i}
                                style={{
                                    ...styles.avatar,
                                    marginLeft: i === 0 ? "0" : "-8px",
                                    backgroundImage: `url(${avatar})`
                                }}
                            />
                        ))}

                        {/* Show +X for remaining participants beyond 5 avatars */}
                        {card.participants > 5 && (
                            <div style={styles.avatarExtra}>
                                +{card.participants - 5}
                            </div>
                        )}
                        <span style={styles.strengthText}>
                            {card.participants} Students
                        </span>
                    </div>
                </div>

                {/* Right Side: Room No and Action Buttons */}
                <div style={styles.cardRight}>
                    <div>
                        <div style={styles.roomText}>
                            Room {card.roomNo}
                        </div>
                        <p style={styles.scheduleText}>
                            Status: {card.status}
                        </p>
                    </div>
                    <div style={styles.actionButtons}>
                        <button style={styles.actionButton}>
                            <img src="/assets/delete.png" alt="Delete" width="20" height="20" />
                        </button>
                        <button style={styles.actionButton}>
                            <img src="/assets/edit.png" alt="Edit" width="20" height="20" />
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <Container fluid className="p-3" style={styles.container}>
            <main>
                {/* Header Section */}
                <header style={styles.header}>
                    <div style={styles.headerTitle}>
                        <h1 style={styles.title}>Time table</h1>
                    </div>
                    <div style={styles.userInfo}>
                        <img
                            src={userData?.profile_pic || "/assets/avatar.jpeg"}
                            alt="User"
                            style={styles.userImage}
                        />
                        <div style={styles.userDetails}>
                            <div style={styles.userName}>
                                {userData?.full_name || 'User'}
                            </div>
                            <div style={styles.userId}>
                                {userData?.admin_id || userData?.id || 'ID'}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Filter Section */}
                <div style={styles.filterSection}>

                    {/* Left Filters */}
                    <div style={styles.leftFilters}>

                        {/* Department Dropdown */}
                        <div style={styles.dropdown}>
                            <select
                                value={selectedDepartment}
                                onChange={(e) => setSelectedDepartment(e.target.value)}
                                style={styles.select}
                            >
                                <option value="All Departments">All Departments</option>
                                {(deptsData || []).map((dept, index) => (
                                    <option key={dept.id || index} value={dept.name}>
                                        {dept.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Year Dropdown */}
                        <div style={styles.dropdown}>
                            <div style={styles.yearDropdown}>
                                <img src="/assets/calendar5.png" alt="Calendar" width="16" height="16" style={{ marginRight: "8px" }} />
                                <span>{selectedYear}</span>
                                <img src="/assets/arrow-down.png" alt="Dropdown arrow" width="12" height="12" style={{ marginLeft: "8px" }} />
                            </div>
                            <select
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                                style={styles.hiddenSelect}
                            >
                                {years.map((year, index) => (
                                    <option key={index} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Right Section: Search Bar and Add Button */}
                    <div style={styles.rightSection}>

                        {/* Search Bar */}
                        <div style={styles.searchContainer}>
                            <input
                                type="text"
                                placeholder="Search courses, rooms, teachers..."
                                value={searchText}
                                onChange={handleSearch}
                                style={styles.searchInput}
                            />
                            <div style={styles.searchIcon}>
                                <img src="/assets/search-lg.png" alt="Search" width="18" height="18" />
                            </div>
                        </div>

                        {/* Add Class Button */}
                        <button
                            style={styles.addButton}
                            onClick={() => navigate('/addclass')}
                        >
                            <img src="/assets/plus.png" alt="Add" width="16" height="16" />
                            Add Class
                        </button>
                    </div>
                </div>

                {/* Loading State */}
                {isLoading && (
                    <div style={styles.loadingContainer}>
                        <Spinner animation="border" role="status" variant="primary">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        <p style={styles.loadingText}>Loading timetable data...</p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div style={styles.errorContainer}>
                        {error}
                    </div>
                )}

                {/* Empty State */}
                {!isLoading && !error && filteredData.length === 0 && (
                    <div style={styles.emptyContainer}>
                        <div style={styles.emptyIcon}>
                            <img src="/assets/calendar-empty.png" alt="Empty calendar" width="24" height="24" />
                        </div>
                        <h4 style={styles.emptyTitle}>No classes found</h4>
                        <p style={styles.emptyText}>
                            Try adjusting your search or filters to find what you're looking for.
                        </p>
                        <button
                            style={styles.clearButton}
                            onClick={() => {
                                setSearchText("");
                                setSelectedDepartment("");
                                setSelectedYear("2025");
                            }}
                        >
                            Clear filters
                        </button>
                    </div>
                )}

                {/* Subject Cards Section */}
                {!isLoading && !error && filteredData.length > 0 && (
                    <div style={{ marginTop: "20px" }}>
                        {filteredData.map((card) => (
                            <SubjectCard key={card.id} card={card} />
                        ))}
                    </div>
                )}
            </main>
        </Container>
    );
}

const styles = {
    container: {
        maxWidth: "100%"
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
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "20px 0"
    },
    leftFilters: {
        display: "flex",
        gap: "12px"
    },
    dropdown: {
        position: "relative"
    },
    select: {
        padding: "8px 16px",
        border: "1px solid #E5E7EB",
        borderRadius: "8px",
        fontSize: "14px",
        fontWeight: "500",
        color: "#111827",
        backgroundColor: "white",
        appearance: "none",
        paddingRight: "32px",
        cursor: "pointer"
    },
    yearDropdown: {
        display: "flex",
        alignItems: "center",
        padding: "8px 16px",
        border: "1px solid #E5E7EB",
        borderRadius: "8px",
        fontSize: "14px",
        fontWeight: "500",
        color: "#111827",
        backgroundColor: "white",
        cursor: "pointer"
    },
    hiddenSelect: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        opacity: 0,
        cursor: "pointer"
    },
    rightSection: {
        display: "flex",
        gap: "12px"
    },
    searchContainer: {
        position: "relative"
    },
    searchInput: {
        padding: "8px 12px 8px 40px",
        border: "1px solid #E5E7EB",
        borderRadius: "8px",
        fontSize: "14px",
        width: "240px"
    },
    searchIcon: {
        position: "absolute",
        left: "12px",
        top: "47%",
        transform: "translateY(-50%)"
    },
    addButton: {
        backgroundColor: "#1F2937",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        padding: "8px 16px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        fontSize: "14px",
        fontWeight: "600",
        cursor: "pointer"
    },
    loadingContainer: {
        textAlign: "center",
        padding: "50px 0"
    },
    loadingText: {
        marginTop: "16px"
    },
    errorContainer: {
        padding: "16px",
        backgroundColor: "#FEE2E2",
        color: "#B91C1C",
        borderRadius: "6px",
        margin: "20px 0"
    },
    emptyContainer: {
        textAlign: "center",
        padding: "50px 0"
    },
    emptyIcon: {
        width: "64px",
        height: "64px",
        backgroundColor: "#F3F4F6",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto 16px"
    },
    emptyTitle: {
        fontSize: "18px",
        fontWeight: "600",
        color: "#111827"
    },
    emptyText: {
        fontSize: "14px",
        color: "#6B7280",
        maxWidth: "300px",
        margin: "8px auto"
    },
    clearButton: {
        padding: "8px 16px",
        backgroundColor: "transparent",
        border: "1px solid #D1D5DB",
        borderRadius: "6px",
        fontSize: "14px",
        fontWeight: "500",
        marginTop: "16px",
        cursor: "pointer"
    },
    sectionCard: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px",
        border: "1px solid #EAECF0",
        borderRadius: "12px",
        width: "100%",
        marginBottom: "16px"
    },
    cardLeft: {
        width: "33%"
    },
    cardTitle: {
        fontSize: "16px",
        fontWeight: "600",
        margin: "0",
        color: "#111827"
    },
    cardSubtitle: {
        fontSize: "14px",
        color: "#6B7280",
        margin: "4px 0 0 0"
    },
    cardMiddle: {
        width: "33%",
        display: "flex",
        alignItems: "center"
    },
    avatarGroup: {
        display: "flex",
        position: "relative",
        alignItems: "center"
    },
    avatar: {
        width: "24px",
        height: "24px",
        borderRadius: "50%",
        border: "1px solid white",
        overflow: "hidden",
        position: "relative",
        background: "#D9D9D9",
        backgroundSize: "cover",
        backgroundPosition: "center"
    },
    avatarExtra: {
        width: "24px",
        height: "24px",
        borderRadius: "50%",
        border: "1px solid white",
        marginLeft: "-8px",
        backgroundColor: "#D9D9D9",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "10px",
        fontWeight: "500",
        color: "#6D7280",
        zIndex: 0
    },
    strengthText: {
        fontSize: "12px",
        color: "#98A2B3",
        marginLeft: "8px",
        fontWeight: '500'
    },
    cardRight: {
        width: "33%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    roomText: {
        fontSize: "16px",
        color: "#000",
        fontWeight: '600'
    },
    actionButtons: {
        display: "flex",
        gap: "8px"
    },
    actionButton: {
        background: "transparent",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "4px"
    },
    scheduleText: {
        fontSize: "12px",
        color: "#6B7280",
        margin: "2px 0"
    }
};

export default Timetable;