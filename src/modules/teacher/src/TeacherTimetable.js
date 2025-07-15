import React, { useState, useEffect, useContext } from "react";
import { Container, Button, Image, Form, Spinner, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

function Timetable() {
    const { userData, sections } = useContext(UserContext);
    const [tableData, setTableData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const [searchText, setSearchText] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState("All");
    const [selectedYear, setSelectedYear] = useState("2024-2025");
    const [sortBy, setSortBy] = useState("courseName");
    const [sortOrder, setSortOrder] = useState("asc");
    const departments = ["All", ...new Set(sections.map(section => section?.department?.name))];
    const years = ["2024-2025", "2023-2024", "2022-2023", "2021-2022"];
    const searchPlaceholder = "Search courses, rooms, departments...";
    const sortOptions = [
        { value: "courseName", label: "Course Name" },
        { value: "department", label: "Department" },
        { value: "studentCount", label: "Student Count" },
        { value: "section", label: "Section" },
    ];

    const convertTo12Hour = (time24) => {
        if (!time24) return "N/A";
        const [hours, minutes] = time24.split(':');
        const hour = parseInt(hours, 10);
        const period = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour % 12 || 12;
        return `${hour12}:${minutes} ${period}`;
    };

    const getScheduleText = (schedule) => {
        if (!schedule || !schedule.days || !schedule.start_time || !schedule.end_time) {
            return "No schedule set";
        }

        const days = schedule.days.join(', ');
        const timeRange = `${convertTo12Hour(schedule.start_time)} - ${convertTo12Hour(schedule.end_time)}`;
        return `${days} | ${timeRange}`;
    };

    const getTeacherNames = (teachers) => {
        if (!teachers || teachers.length === 0) {
            return "No teacher assigned";
        }

        return teachers.map(teacher =>
            `${teacher.first_name} ${teacher.last_name}`
        ).join(', ');
    };

    useEffect(() => {
        const convertSectionsToTimetable = () => {
            if (!sections || sections.length === 0) {
                setTableData([]);
                setFilteredData([]);
                setIsLoading(false);
                return;
            }

            try {
                const timetableData = sections.map((section, index) => {
                    const teacher = section?.teachers && section.teachers.length > 0 ? section.teachers[0] : null;
                    const studentCount = section.students ? section.students.length : 0;

                    const avatars = section?.students
                        .filter(student => student.profile_pic && typeof student.profile_pic === 'string')
                        .map(student => student.profile_pic);

                    return {
                        id: section.id || `section-${index}`,
                        courseName: section?.course?.name || "Unknown Course",
                        roomNo: section.room_no || "TBA",
                        studentCount: studentCount,
                        department: section?.department?.name || "Unknown Department",
                        section: section?.section || "N/A",
                        teacher: teacher,
                        teacherName: getTeacherNames(section?.teachers),
                        schedule: section?.schedule,
                        scheduleText: getScheduleText(section?.schedule),
                        avatars: avatars,
                        year: "2024-2025",
                        originalSection: section
                    };
                });

                setTableData(timetableData);
                setFilteredData(timetableData);
            } catch (err) {
                console.error('Error converting sections to timetable:', err);
                setError("Failed to load timetable data. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        convertSectionsToTimetable();
    }, [sections]);

    useEffect(() => {
        let results = [...tableData];

        if (selectedDepartment !== "All") {
            results = results.filter(item => item?.department?.name === selectedDepartment);
        }

        if (selectedYear) {
            results = results.filter(item => item.year === selectedYear);
        }

        if (searchText) {
            const searchLower = searchText.toLowerCase();
            results = results.filter(item =>
                item.courseName.toLowerCase().includes(searchLower) ||
                item.roomNo.toLowerCase().includes(searchLower) ||
                item.department.toLowerCase().includes(searchLower) ||
                item.teacherName.toLowerCase().includes(searchLower) ||
                item.section.toLowerCase().includes(searchLower)
            );
        }

        results.sort((a, b) => {
            let comparison = 0;

            if (sortBy === "studentCount") {
                comparison = a[sortBy] - b[sortBy];
            } else {
                const aValue = a[sortBy] || "";
                const bValue = b[sortBy] || "";
                comparison = aValue.toString().localeCompare(bValue.toString());
            }

            return sortOrder === "asc" ? comparison : -comparison;
        });

        setFilteredData(results);
    }, [tableData, selectedDepartment, selectedYear, searchText, sortBy, sortOrder]);

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };

    const currentSortLabel = sortOptions.find(option => option.value === sortBy)?.label || "Sort";

    const handleViewSection = (section) => {
        navigate("/subject", {
            state: { selectedSectionId: section.id }
        });
    };

    const SubjectCard = ({ card }) => {
        return (
            <div className="subject-card">
                {/* Left Side: Course Name and Room */}
                <div className="subject-info">
                    <h5 className="course-name">
                        {card.courseName}
                    </h5>
                    <p className="room-info">
                        Room: {card.roomNo} • Section {card.section}
                    </p>
                </div>

                {/* Middle: Profile Pictures */}
                <div className="avatars-section">
                    <div className="avatars-container">
                        {/* Profile pictures stack */}
                        {card.avatars.slice(0, 4).map((avatar, i) => (
                            <div key={i} className={`avatar ${i > 0 ? 'overlapped' : ''}`}>
                                <img
                                    src={avatar}
                                    alt={`Student ${i + 1}`}
                                    className="avatar-image"
                                />
                            </div>
                        ))}
                        {card.studentCount > card.avatars.length && (
                            <div className="avatar-count">
                                +{card.studentCount - card.avatars.length}
                            </div>
                        )}
                    </div>
                    <p className="strength-text">
                        Students: {card.studentCount}
                    </p>
                </div>

                {/* Right Side: Department Name and View Button */}
                <div className="department-section">
                    <p className="department-name">
                        {card.department}
                    </p>
                </div>

                <div className="action-section">
                    <Button
                        className="view-button"
                        onClick={() => handleViewSection(card)}
                    >
                        View Details
                    </Button>
                </div>
            </div>
        );
    };

    return (
        <Container fluid className="p-0 d-flex">
            <main className="flex-grow-1 p-3">
                {/* Header Section */}
                <header className="main-header">
                    {/* Left side: Heading */}
                    <div className="header-left">
                        <h1 className="page-title">Timetable</h1>
                    </div>

                    {/* Right side: User Info and Dropdown */}
                    <div className="header-right">
                        <img
                            src="/assets/avatar.jpeg"
                            alt="User"
                            className="user-avatar"
                        />
                        <div className="user-info">
                            <div className="user-name">
                                {userData?.first_name && userData?.last_name
                                    ? `${userData.first_name} ${userData.last_name}`
                                    : "John Doe"}
                            </div>
                            <div className="user-id">
                                {userData?.teacher_id || "123456"}
                            </div>
                        </div>
                        <button className="dropdown-btn">
                            <img
                                src="/assets/arrow-down.png"
                                alt="Dropdown"
                                className="dropdown-arrow"
                            />
                        </button>
                    </div>
                </header>

                <header className="filter-header">
                    {/* Left Section: Dropdowns */}
                    <div className="filters-left">
                        {/* Department Dropdown */}
                        <div className="dropdown me-3">
                            <div
                                className="filter-dropdown"
                                id="departmentDropdown"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <span>{selectedDepartment}</span>
                                <Image
                                    src="/assets/arrow-down.png"
                                    alt="Dropdown Icon"
                                    width={12}
                                    height={12}
                                    className="dropdown-icon"
                                />
                            </div>
                            <ul className="dropdown-menu" aria-labelledby="departmentDropdown">
                                {departments.map((dept, index) => (
                                    <li key={index}>
                                        <button
                                            className="dropdown-item"
                                            onClick={() => setSelectedDepartment(dept)}
                                        >
                                            {dept}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Year Dropdown */}
                        <div className="dropdown me-3">
                            <div
                                className="filter-dropdown"
                                id="yearDropdown"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <Image
                                    src="/assets/calendar1.png"
                                    alt="Calendar Icon"
                                    width={16}
                                    height={16}
                                    className="calendar-icon"
                                />
                                <span>{selectedYear}</span>
                                <Image
                                    src="/assets/arrow-down.png"
                                    alt="Dropdown Icon"
                                    width={12}
                                    height={12}
                                    className="dropdown-icon"
                                />
                            </div>
                            <ul className="dropdown-menu" aria-labelledby="yearDropdown">
                                {years.map((year, index) => (
                                    <li key={index}>
                                        <button
                                            className="dropdown-item"
                                            onClick={() => setSelectedYear(year)}
                                        >
                                            {year}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Right Section: Search Bar and Sort */}
                    <div className="filters-right">
                        {/* Search Bar */}
                        <div className="search-container">
                            <Form.Control
                                type="text"
                                placeholder={searchPlaceholder}
                                value={searchText}
                                onChange={handleSearch}
                                className="search-input"
                            />
                            <Image
                                src="/assets/search-lg.png"
                                alt="Search Icon"
                                width={20}
                                height={20}
                                className="search-icon"
                            />
                        </div>

                        {/* Sort Button */}
                        <div className="dropdown me-3">
                            <Button
                                className="sort-button"
                                id="sortDropdown"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <Image
                                    src="/assets/filter-lines.png"
                                    alt="Sort Icon"
                                    width={20}
                                    height={20}
                                    className="me-2"
                                />
                                {currentSortLabel} {sortOrder === "asc" ? "↑" : "↓"}
                            </Button>
                            <ul className="dropdown-menu" aria-labelledby="sortDropdown">
                                {sortOptions.map((option, index) => (
                                    <li key={index}>
                                        <button
                                            className="dropdown-item"
                                            onClick={() => {
                                                if (sortBy === option.value) {
                                                    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                                                } else {
                                                    setSortBy(option.value);
                                                    setSortOrder("asc");
                                                }
                                            }}
                                        >
                                            {option.label} {sortBy === option.value ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </header>

                {/* Loading State */}
                {isLoading && (
                    <div className="loading-container">
                        <Spinner animation="border" role="status" variant="primary">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        <p className="loading-text">Loading timetable data...</p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <Alert variant="danger" className="mt-4">
                        {error}
                    </Alert>
                )}

                {/* Empty State */}
                {!isLoading && !error && filteredData.length === 0 && (
                    <div className="empty-state">
                        <div className="empty-content">
                            <h4 className="empty-title">No courses found</h4>
                            <p className="empty-description">
                                {searchText || selectedDepartment !== "All"
                                    ? "Try adjusting your search or filters to find what you're looking for."
                                    : "No courses are assigned to you yet. Please contact the administrator."
                                }
                            </p>
                            {(searchText || selectedDepartment !== "All") && (
                                <Button
                                    variant="outline-primary"
                                    className="clear-filters-btn"
                                    onClick={() => {
                                        setSearchText("");
                                        setSelectedDepartment("All");
                                        setSelectedYear("2024-2025");
                                    }}
                                >
                                    Clear filters
                                </Button>
                            )}
                        </div>
                    </div>
                )}

                {/* Subject Cards Section */}
                {!isLoading && !error && filteredData.length > 0 && (
                    <div className="subjects-container">
                        <div className="results-summary">
                            <p>Showing {filteredData.length} course{filteredData.length !== 1 ? 's' : ''}</p>
                        </div>
                        {filteredData.map((card) => (
                            <SubjectCard key={card.id} card={card} />
                        ))}
                    </div>
                )}
            </main>

            <TimetableStyles />
        </Container>
    );
}

// Separated Styles Component
const TimetableStyles = () => (
    <style>
        {`
        /* Main Header Styles */
        .main-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            padding-top: 0px;
            width: 100%;
            margin-bottom: 1rem;
        }

        .header-left {
            display: flex;
            align-items: center;
        }

        .page-title {
            font-size: 24px;
            margin: 0;
            font-weight: 600;
            color: #111827;
        }

        .header-right {
            display: flex;
            align-items: center;
        }

        .user-avatar {
            border-radius: 50%;
            width: 54px;
            height: 54px;
            margin-right: 10px;
            object-fit: cover;
        }

        .user-info {
            margin-right: 10px;
        }

        .user-name {
            font-weight: 500;
            font-size: 14px;
        }

        .user-id {
            font-size: 12px;
            color: #6c757d;
        }

        .dropdown-btn {
            background-color: transparent;
            border: none;
            cursor: pointer;
        }

        .dropdown-arrow {
            width: 12px;
            height: 12px;
        }

        /* Filter Header Styles */
        .filter-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 15px;
            margin-bottom: 1.5rem;
            flex-wrap: wrap;
            gap: 1rem;
        }

        .filters-left {
            display: flex;
            align-items: center;
        }

        .filters-right {
            display: flex;
            align-items: center;
        }

        .filter-dropdown {
            display: flex;
            align-items: center;
            border: 1px solid #D1D5DB;
            border-radius: 8px;
            padding: 8px 12px;
            cursor: pointer;
            background-color: white;
            font-size: 14px;
            font-weight: 600;
            color: #374151;
            transition: all 0.2s ease;
        }

        .filter-dropdown:hover {
            background-color: #f9fafb;
            border-color: #9ca3af;
        }

        .dropdown-icon {
            margin-left: 8px;
        }

        .calendar-icon {
            margin-right: 8px;
        }

        .search-container {
            position: relative;
            margin-right: 1rem;
        }

        .search-input {
            border-radius: 8px !important;
            padding-left: 40px !important;
            font-size: 14px !important;
            font-weight: 400 !important;
            color: #98A2B3 !important;
            border: 1px solid #D1D5DB !important;
            width: 300px !important;
        }

        .search-input:focus {
            border-color: #8B5CF6 !important;
            box-shadow: 0 0 0 0.2rem rgba(139, 92, 246, 0.25) !important;
        }

        .search-icon {
            position: absolute;
            top: 50%;
            left: 12px;
            transform: translateY(-50%);
        }

        .sort-button {
            display: flex !important;
            align-items: center !important;
            background-color: white !important;
            color: #374151 !important;
            border: 1px solid #D1D5DB !important;
            border-radius: 8px !important;
            font-size: 14px !important;
            font-weight: 600 !important;
            padding: 8px 12px !important;
            transition: all 0.2s ease !important;
        }

        .sort-button:hover {
            background-color: #f9fafb !important;
            border-color: #9ca3af !important;
        }

        /* Loading State */
        .loading-container {
            text-align: center;
            margin: 3rem 0;
        }

        .loading-text {
            margin-top: 0.5rem;
            color: #6b7280;
        }

        /* Empty State */
        .empty-state {
            text-align: center;
            margin: 3rem 0;
        }

        .empty-content {
            max-width: 400px;
            margin: 0 auto;
        }

        .empty-title {
            color: #111827;
            margin-bottom: 0.5rem;
        }

        .empty-description {
            color: #6b7280;
            margin-bottom: 1.5rem;
        }

        .clear-filters-btn {
            border-radius: 8px !important;
        }

        /* Results Summary */
        .subjects-container {
            margin-top: 1rem;
        }

        .results-summary {
            margin-bottom: 1rem;
            color: #6b7280;
            font-size: 14px;
        }

        .results-summary p {
            margin: 0;
        }

        /* Subject Card Styles */
        .subject-card {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 24px;
            background-color: white;
            border-radius: 12px;
            border: 1px solid #E5E7EB;
            margin-bottom: 16px;
            transition: all 0.2s ease;
        }

        .subject-card:hover {
            border-color: #8B5CF6;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            transform: translateY(-1px);
        }

        .subject-info {
            flex: 1;
            margin-right: 1rem;
        }

        .course-name {
            font-size: 18px;
            font-weight: 600;
            margin: 0;
            color: #111827;
            margin-bottom: 0.25rem;
        }

        .room-info {
            font-size: 14px;
            color: #6B7280;
            margin: 0;
            margin-bottom: 0.25rem;
        }

        .schedule-info {
            font-size: 13px;
            color: #8B5CF6;
            margin: 0;
            margin-bottom: 0.25rem;
            font-weight: 500;
        }

        .teacher-info {
            font-size: 13px;
            color: #059669;
            margin: 0;
            font-weight: 500;
        }

        /* Avatars Section */
        .avatars-section {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 0 1rem;
        }

        .avatars-container {
            display: flex;
            position: relative;
            height: 40px;
            margin-bottom: 0.5rem;
        }

        .avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: 3px solid white;
            overflow: hidden;
            position: relative;
            z-index: 1;
        }

        .avatar.overlapped {
            margin-left: -12px;
        }

        .avatar-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .avatar-count {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: 3px solid white;
            margin-left: -12px;
            background-color: #6B7280;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: 600;
            color: #FFF;
            z-index: 0;
        }

        .strength-text {
            font-size: 14px;
            color: #6B7280;
            margin: 0;
            text-align: center;
        }

        /* Department Section */
        .department-section {
            display: flex;
            align-items: center;
            margin: 0 1rem;
        }

        .department-name {
            font-size: 16px;
            font-weight: 500;
            margin: 0;
            color: #111827;
            text-align: center;
        }

        /* Action Section */
        .action-section {
            display: flex;
            align-items: center;
        }

        .view-button {
            background-color: #8B5CF6 !important;
            border: none !important;
            border-radius: 50px !important;
            padding: 10px 24px !important;
            font-size: 14px !important;
            font-weight: 500 !important;
            color: #FFFFFF !important;
            min-width: 120px !important;
            transition: all 0.2s ease !important;
        }

        .view-button:hover {
            background-color: #7C3AED !important;
            transform: translateY(-1px);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .filter-header {
                flex-direction: column;
                align-items: stretch;
            }

            .filters-left,
            .filters-right {
                justify-content: center;
                flex-wrap: wrap;
            }

            .search-input {
                width: 250px !important;
            }

            .subject-card {
                flex-direction: column;
                gap: 1rem;
                text-align: center;
            }

            .subject-info {
                margin-right: 0;
            }

            .avatars-section,
            .department-section {
                margin: 0;
            }

            .course-name {
                font-size: 16px;
            }
        }

        @media (max-width: 576px) {
            .main-header {
                flex-direction: column;
                gap: 1rem;
                align-items: stretch;
            }

            .header-right {
                justify-content: center;
            }

            .search-input {
                width: 200px !important;
            }

            .subject-card {
                padding: 16px;
            }

            .view-button {
                min-width: 100px !important;
                padding: 8px 16px !important;
            }
        }
        `}
    </style>
);

export default Timetable;