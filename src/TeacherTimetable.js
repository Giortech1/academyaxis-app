import React, { useState, useEffect } from "react";
import { Container, Button, Table, Image, Form, Card, Row, Col, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

function Timetable() {
    const [tableData, setTableData] = useState([]); // All data
    const [filteredData, setFilteredData] = useState([]); // Filtered data
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const [searchText, setSearchText] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState("All");
    const [selectedYear, setSelectedYear] = useState("2023-2024");
    const [sortBy, setSortBy] = useState("subjectName"); // Default sort
    const [sortOrder, setSortOrder] = useState("asc"); // asc or desc

    // Props for Header - departments would be fetched from API in real app
    const departments = ["All", "Computer Science", "Engineering", "Mathematics", "Physics"];
    const years = ["2023-2024", "2022-2023", "2021-2022"];
    const searchPlaceholder = "Search subjects, rooms, departments...";
    const sortOptions = [
        { value: "subjectName", label: "Subject Name" },
        { value: "departmentName", label: "Department" },
        { value: "strength", label: "Class Size" },
    ];

    // Fetch data
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                // In a real app, this would be an API call
                // const response = await fetch('your-api-endpoint');
                // const data = await response.json();

                // For this example, using mock data
                const mockData = [
                    {
                        id: 1,
                        subjectName: "Demo Subject Name",
                        roomNo: "CS-104",
                        strength: 26,
                        departmentName: "Demo Department Name",
                        participants: 17,
                        year: "2023-2024",
                        avatars: ["/assets/Avatar3.png", "/assets/Avatar5.png", "/assets/avatar.png", "/assets/Avatar4.png"]
                    },
                    {
                        id: 2,
                        subjectName: "Data Structures",
                        roomNo: "CS-201",
                        strength: 32,
                        departmentName: "Computer Science",
                        participants: 21,
                        year: "2023-2024",
                        avatars: ["/assets/Avatar4.png", "/assets/Avatar3.png", "/assets/Avatar5.png"]
                    },
                    {
                        id: 3,
                        subjectName: "Physics Mechanics",
                        roomNo: "PH-101",
                        strength: 45,
                        departmentName: "Physics",
                        participants: 25,
                        year: "2023-2024",
                        avatars: ["/assets/Avatar3.png", "/assets/Avatar4.png"]
                    },
                    {
                        id: 4,
                        subjectName: "Calculus I",
                        roomNo: "MA-103",
                        strength: 38,
                        departmentName: "Mathematics",
                        participants: 19,
                        year: "2023-2024",
                        avatars: ["/assets/Avatar4.png", "/assets/Avatar5.png", "/assets/Avatar3.png"]
                    },
                    {
                        id: 5,
                        subjectName: "Engineering Materials",
                        roomNo: "EN-220",
                        strength: 30,
                        departmentName: "Engineering",
                        participants: 22,
                        year: "2022-2023",
                        avatars: ["/assets/Avatar3.png", "/assets/Avatar5.png"]
                    }
                ];

                setTableData(mockData);
                setFilteredData(mockData);
                setIsLoading(false);
            } catch (err) {
                setError("Failed to fetch data. Please try again later.");
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    // Filter and search effects
    useEffect(() => {
        let results = [...tableData];

        // Filter by department
        if (selectedDepartment !== "All") {
            results = results.filter(item => item.departmentName === selectedDepartment);
        }

        // Filter by year
        if (selectedYear) {
            results = results.filter(item => item.year === selectedYear);
        }

        // Search text
        if (searchText) {
            const searchLower = searchText.toLowerCase();
            results = results.filter(item =>
                item.subjectName.toLowerCase().includes(searchLower) ||
                item.roomNo.toLowerCase().includes(searchLower) ||
                item.departmentName.toLowerCase().includes(searchLower)
            );
        }

        // Sort results
        results.sort((a, b) => {
            let comparison = 0;

            if (sortBy === "strength") {
                comparison = a[sortBy] - b[sortBy];
            } else {
                comparison = a[sortBy].localeCompare(b[sortBy]);
            }

            return sortOrder === "asc" ? comparison : -comparison;
        });

        setFilteredData(results);
    }, [tableData, selectedDepartment, selectedYear, searchText, sortBy, sortOrder]);

    // Handle search input
    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };

    // Toggle sort order and type
    const handleSort = () => {
        // Cycle through sort options
        const currentIndex = sortOptions.findIndex(option => option.value === sortBy);
        const nextIndex = (currentIndex + 1) % sortOptions.length;

        if (currentIndex === nextIndex) {
            // If same field, toggle order
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            // If new field, set to ascending
            setSortBy(sortOptions[nextIndex].value);
            setSortOrder("asc");
        }
    };

    // Get current sort option label
    const currentSortLabel = sortOptions.find(option => option.value === sortBy)?.label || "Sort";

    // Subject card component that exactly matches the design
    const SubjectCard = ({ card }) => {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "16px 24px",
                    backgroundColor: "white",
                    borderRadius: "12px",
                    border: "1px solid #E5E7EB",
                    // boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.05)",
                    marginBottom: "16px"
                }}
            >
                {/* Left Side: Subject Name and Room */}
                <div>
                    <h5 style={{ fontSize: "16px", fontWeight: "600", margin: "0", color: "#111827" }}>
                        {card.subjectName}
                    </h5>
                    <p style={{ fontSize: "14px", color: "#6B7280", margin: "0", marginTop: "2px" }}>
                        Room No {card.roomNo}
                    </p>
                </div>

                {/* Middle: Profile Pictures */}
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}>
                    <div style={{
                        display: "flex",
                        position: "relative",
                        height: "32px"
                    }}>
                        {/* Profile pictures stack - using actual avatar images */}
                        {card.avatars.slice(0, 4).map((avatar, i) => (
                            <div
                                key={i}
                                style={{
                                    width: "32px",
                                    height: "32px",
                                    borderRadius: "50%",
                                    border: "2px solid white",
                                    marginLeft: i === 0 ? "0" : "-10px",
                                    overflow: "hidden",
                                    position: "relative",

                                }}
                            >
                                <img
                                    src={avatar}
                                    alt={`Avatar ${i + 1}`}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover"
                                    }}
                                />
                            </div>
                        ))}
                        {card.participants > card.avatars.length && (
                            <div
                                style={{
                                    width: "32px",
                                    height: "32px",
                                    borderRadius: "50%",
                                    border: "2px solid white",
                                    marginLeft: "-10px",
                                    backgroundColor: "#6B7280",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "12px",
                                    fontWeight: "500",
                                    color: "#FFF",
                                    zIndex: 0
                                }}
                            >
                                +{card.participants - card.avatars.length}
                            </div>
                        )}
                    </div>
                    <p style={{
                        fontSize: "14px",
                        color: "#6B7280",
                        margin: "0",
                        marginTop: "4px"
                    }}>
                        Strength {card.strength}
                    </p>
                </div>

                {/* Right Side: Department Name and View Button */}
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end"
                }}>
                    <p style={{
                        fontSize: "16px",
                        fontWeight: "500",
                        margin: "0",
                        marginRight: "24px",
                        color: "#111827"
                    }}>
                        {card.departmentName}
                    </p>

                </div>
                {/* Right Side: Department Name and View Button */}
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end"
                }}>

                    <Button
                        style={{
                            backgroundColor: "#8B5CF6",
                            border: "none",
                            borderRadius: "100px",
                            padding: "8px 24px",
                            fontSize: "14px",
                            fontWeight: "500",
                            color: "#FFFFFF",
                            minWidth: "80px"
                        }}
                        onClick={() => navigate(`/subject/${card.id}`)}
                    >
                        View
                    </Button>
                </div>
            </div>
        );
    };

    return (
        <Container fluid className="p-0 d-flex">
            <main className="flex-grow-1 p-3">
                {/* Header Section */}
                <header
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '10px',
                        paddingTop: '0px',
                        width: '100%',
                    }}
                >
                    {/* Left side: Arrow and Heading */}
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <h1 style={{ fontSize: '24px', margin: 0, fontWeight: '600' }}>Timetable</h1>
                    </div>
                    {/* Right side: User Info and Dropdown */}
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {/* User Info */}
                        <img
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
                            <div style={{ fontWeight: '500', fontSize: '14' }}>Jhon Deo</div>
                            <div style={{ fontSize: '12px', color: '#6c757d' }}>123456</div>
                        </div>
                        <button
                            style={{
                                backgroundColor: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                            }}
                        >
                            <img
                                src="/assets/arrow-down.png" // Replace with your dropdown icon
                                alt="Dropdown"
                                style={{ width: '12px', height: '12px' }}
                            />
                        </button>
                    </div>
                </header>

                <header className="d-flex justify-content-between align-items-center mb-4" style={{ marginTop: "15px" }}>
                    {/* Left Section: Dropdowns */}
                    <div className="d-flex align-items-center">
                        {/* Department Dropdown */}
                        <div className="dropdown me-3">
                            <div
                                className="d-flex align-items-center"
                                style={{
                                    border: "1px solid #D1D5DB",
                                    borderRadius: "8px",
                                    padding: "8px 12px",
                                    cursor: "pointer",
                                    backgroundColor: "white",
                                    fontSize: "14px",
                                    fontWeight: "600",
                                }}
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
                                    style={{ marginLeft: "8px" }}
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
                                className="d-flex align-items-center"
                                style={{
                                    border: "1px solid #D1D5DB",
                                    borderRadius: "8px",
                                    padding: "8px 12px",
                                    cursor: "pointer",
                                    backgroundColor: "white",
                                    fontSize: "14px",
                                    fontWeight: "600",
                                }}
                                id="yearDropdown"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <Image
                                    src="/assets/calendar1.png"
                                    alt="Calendar Icon"
                                    width={16}
                                    height={16}
                                    style={{ marginRight: '8px' }}
                                />
                                <span>{selectedYear}</span>
                                <Image
                                    src="/assets/arrow-down.png"
                                    alt="Dropdown Icon"
                                    width={12}
                                    height={12}
                                    style={{ marginLeft: "8px" }}
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

                    {/* Right Section: Search Bar, Sort, and Button */}
                    <div className="d-flex align-items-center">
                        {/* Search Bar */}
                        <div className="position-relative me-3">
                            <Form.Control
                                type="text"
                                placeholder={searchPlaceholder}
                                value={searchText}
                                onChange={handleSearch}
                                style={{
                                    borderRadius: "8px",
                                    paddingLeft: "40px",
                                    fontSize: "14px",
                                    fontWeight: "400",
                                    color: "#98A2B3",
                                    border: "1px solid #D1D5DB",
                                    width: "300px",
                                }}
                            />
                            <Image
                                src="/assets/search-lg.png"
                                alt="Search Icon"
                                width={20}
                                height={20}
                                style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "12px",
                                    transform: "translateY(-50%)",
                                }}
                            />
                        </div>

                        {/* Sort Button */}
                        <div className="dropdown me-3">
                            <Button
                                className="d-flex align-items-center"
                                style={{
                                    backgroundColor: "white",
                                    color: "#374151",
                                    border: "1px solid #D1D5DB",
                                    borderRadius: "8px",
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    padding: "8px 12px",
                                }}
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
                    <div className="text-center my-5">
                        <Spinner animation="border" role="status" variant="primary">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        <p className="mt-2">Loading timetable data...</p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="alert alert-danger mt-4" role="alert">
                        {error}
                    </div>
                )}

                {/* Empty State */}
                {!isLoading && !error && filteredData.length === 0 && (
                    <div className="text-center my-5">
                        <Image
                            src="/assets/empty-state.png" // Replace with your empty state image
                            alt="No results found"
                            width={120}
                            height={120}
                            className="mb-3"
                        />
                        <h4>No subjects found</h4>
                        <p className="text-muted">
                            Try adjusting your search or filters to find what you're looking for.
                        </p>
                        <Button
                            variant="outline-primary"
                            onClick={() => {
                                setSearchText("");
                                setSelectedDepartment("All");
                                setSelectedYear("2023-2024");
                            }}
                        >
                            Clear filters
                        </Button>
                    </div>
                )}

                {/* Subject Cards Section - Now using the customized component */}
                {!isLoading && !error && filteredData.length > 0 && (
                    <div className="mt-4">
                        {filteredData.map((card) => (
                            <SubjectCard key={card.id} card={card} />
                        ))}
                    </div>
                )}
            </main>
        </Container>
    );
}

export default Timetable;