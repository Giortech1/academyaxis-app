import React, { useState, useEffect, useContext } from 'react';
import { Container, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from './UserContext.js';


function Timetable() {
            const { userData } = useContext(UserContext);

    const [tableData, setTableData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const [searchText, setSearchText] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState("Department of Computer Science");
    const [selectedYear, setSelectedYear] = useState("2023-2024");

    // Props for Header - departments would be fetched from API in real app
    const departments = [
        "Department of Computer Science",
        "Department of Engineering",
        "Department of Mathematics",
        "Department of Physics"
    ];
    const years = ["2023-2024", "2022-2023", "2021-2022"];

    // Fetch data
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                // In a real app, this would be an API call
                // Mocking data for demonstration
                const mockData = [
                    {
                        id: 1,
                        subjectName: "Introduction to Computer Science",
                        roomNo: "CS-103-B",
                        strength: 26,
                        departmentName: "Department of Computer Science",
                        participants: 17,
                        year: "2023-2024",
                        avatars: ["/assets/Avatar1.png", "/assets/Avatar2.png", "/assets/Avatar3.png", "/assets/Avatar4.png", "/assets/Avatar5.png", "/assets/Avatar6.png", "/assets/Avatar7.png"]
                    },
                    {
                        id: 2,
                        subjectName: "Data Structures & Algorithms",
                        roomNo: "CS-105-A",
                        strength: 30,
                        departmentName: "Department of Computer Science",
                        participants: 24,
                        year: "2023-2024",
                        avatars: ["/assets/Avatar4.png", "/assets/Avatar3.png", "/assets/Avatar5.png", "/assets/Avatar2.png"]
                    },
                    {
                        id: 3,
                        subjectName: "Database Management Systems",
                        roomNo: "CS-201-C",
                        strength: 32,
                        departmentName: "Department of Computer Science",
                        participants: 28,
                        year: "2023-2024",
                        avatars: ["/assets/Avatar3.png", "/assets/Avatar4.png", "/assets/Avatar1.png"]
                    },
                    {
                        id: 4,
                        subjectName: "Software Engineering",
                        roomNo: "CS-302-A",
                        strength: 25,
                        departmentName: "Department of Computer Science",
                        participants: 20,
                        year: "2023-2024",
                        avatars: ["/assets/Avatar4.png", "/assets/Avatar5.png", "/assets/Avatar3.png", "/assets/Avatar6.png", "/assets/Avatar7.png", "/assets/Avatar2.png"]
                    },
                    {
                        id: 5,
                        subjectName: "Engineering Mathematics",
                        roomNo: "EN-103-B",
                        strength: 35,
                        departmentName: "Department of Engineering",
                        participants: 30,
                        year: "2023-2024",
                        avatars: ["/assets/Avatar3.png", "/assets/Avatar5.png", "/assets/Avatar1.png", "/assets/Avatar2.png"]
                    },
                    {
                        id: 6,
                        subjectName: "Quantum Physics",
                        roomNo: "PH-101-A",
                        strength: 22,
                        departmentName: "Department of Physics",
                        participants: 18,
                        year: "2023-2024",
                        avatars: ["/assets/Avatar3.png", "/assets/Avatar5.png", "/assets/Avatar2.png"]
                    },
                    {
                        id: 7,
                        subjectName: "Advanced Calculus",
                        roomNo: "MA-202-C",
                        strength: 28,
                        departmentName: "Department of Mathematics",
                        participants: 22,
                        year: "2022-2023",
                        avatars: ["/assets/Avatar3.png", "/assets/Avatar5.png", "/assets/Avatar1.png", "/assets/Avatar4.png"]
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

        // Department filter
        if (selectedDepartment) {
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

        setFilteredData(results);
    }, [tableData, selectedDepartment, selectedYear, searchText]);

    // Handle search input
    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };

    // Subject card component that matches the requested design
    const SubjectCard = ({ card }) => {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "20px",
                    border: "1px solid #EAECF0",
                    borderRadius: "12px",
                    width: "100%",
                    marginBottom: "16px",
                }}
            >
                {/* Left Side: Subject Name */}
                <div style={{ width: "33%" }}>
                    <h5 style={{ fontSize: "16px", fontWeight: "600", margin: "0", color: "#111827" }}>
                        {card.subjectName}
                    </h5>
                </div>

                {/* Middle: Avatar Group */}
                <div style={{ width: "33%", display: "flex", alignItems: "center" }}>
                    <div style={{
                        display: "flex",
                        position: "relative",
                        alignItems: "center"
                    }}>
                        {/* Show first 5 avatars */}
                        {card.avatars.slice(0, 5).map((avatar, i) => (
                            <div
                                key={i}
                                style={{
                                    width: "24px",
                                    height: "24px",
                                    borderRadius: "50%",
                                    border: "1px solid white",
                                    marginLeft: i === 0 ? "0" : "-8px",
                                    overflow: "hidden",
                                    position: "relative",
                                    background: "#D9D9D9",
                                    backgroundImage: `url(${avatar})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center"
                                }}
                            />
                        ))}
                        {/* Show +X for remaining participants beyond 5 avatars */}
                        {card.participants > 5 && (
                            <div
                                style={{
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
                                }}
                            >
                                +{card.participants - 5}
                            </div>
                        )}
                        <span style={{
                            fontSize: "12px",
                            color: "#98A2B3",
                            marginLeft: "8px",
                            fontWeight: '500'
                        }}>
                            +{card.participants} Strength {card.strength}
                        </span>
                    </div>
                </div>

                {/* Right Side: Room No and Action Buttons */}
                <div style={{
                    width: "33%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <div style={{ fontSize: "16px", color: "#000", fontWeight: '600' }}>
                        Room NO {card.roomNo}
                    </div>
                    <div style={{ display: "flex", gap: "8px" }}>
                        <button style={{
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "4px"
                        }}>
                            <img src="/assets/delete.png" alt="Delete" width="20" height="20" />
                        </button>
                        <button style={{
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "4px"
                        }}>
                            <img src="/assets/edit.png" alt="Edit" width="20" height="20" />
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <Container fluid className="p-3" style={{ maxWidth: "100% ",}}>
            <main>
                {/* Header Section */}
                <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom:'20px', width: "100%" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <h1 style={{ fontSize: "24px", margin: 0, fontWeight: "600" }}>Time table</h1>
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
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    margin: "20px 0"
                }}>
                    {/* Left Filters */}
                    <div style={{ display: "flex", gap: "12px" }}>
                        {/* Department Dropdown */}
                        <div style={{ position: "relative" }}>
                            <select
                                value={selectedDepartment}
                                onChange={(e) => setSelectedDepartment(e.target.value)}
                                style={{
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
                                }}
                            >
                                {departments.map((dept, index) => (
                                    <option key={index} value={dept}>
                                        {dept}
                                    </option>
                                ))}
                            </select>
                            <div style={{
                                position: "absolute",
                                right: "12px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                pointerEvents: "none"
                            }}>
                                {/* <img src="/assets/arrow-down.png" alt="Dropdown arrow" width="12" height="12" /> */}
                            </div>
                        </div>

                        {/* Year Dropdown */}
                        <div style={{ position: "relative" }}>
                            <div style={{
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
                            }}>
                                <img src="/assets/calendar5.png" alt="Calendar" width="16" height="16" style={{ marginRight: "8px" }} />
                                <span>{selectedYear}</span>
                                <img src="/assets/arrow-down.png" alt="Dropdown arrow" width="12" height="12" style={{ marginLeft: "8px" }} />
                            </div>
                            <select
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "100%",
                                    opacity: 0,
                                    cursor: "pointer"
                                }}
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
                    <div style={{ display: "flex", gap: "12px" }}>
                        {/* Search Bar */}
                        <div style={{ position: "relative" }}>
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchText}
                                onChange={handleSearch}
                                style={{
                                    padding: "8px 12px 8px 40px",
                                    border: "1px solid #E5E7EB",
                                    borderRadius: "8px",
                                    fontSize: "14px",
                                    width: "240px"
                                }}
                            />
                            <div style={{
                                position: "absolute",
                                left: "12px",
                                top: "47%",
                                transform: "translateY(-50%)"
                            }}>
                                <img src="/assets/search-lg.png" alt="Search" width="18" height="18" />
                            </div>
                        </div>

                        {/* Add Class Button */}
                        <button
                            style={{
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
                            }}
                            onClick={() => navigate('/addclass')}
                        >
                            <img src="/assets/plus.png" alt="Add" width="16" height="16" />
                            Add Class
                        </button>
                    </div>
                </div>

                {/* Loading State */}
                {isLoading && (
                    <div style={{ textAlign: "center", padding: "50px 0" }}>
                        <Spinner animation="border" role="status" variant="primary">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        <p style={{ marginTop: "16px" }}>Loading timetable data...</p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div style={{
                        padding: "16px",
                        backgroundColor: "#FEE2E2",
                        color: "#B91C1C",
                        borderRadius: "6px",
                        margin: "20px 0"
                    }}>
                        {error}
                    </div>
                )}

                {/* Empty State */}
                {!isLoading && !error && filteredData.length === 0 && (
                    <div style={{ textAlign: "center", padding: "50px 0" }}>
                        <div style={{
                            width: "64px",
                            height: "64px",
                            backgroundColor: "#F3F4F6",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "0 auto 16px"
                        }}>
                            <img src="/assets/calendar-empty.png" alt="Empty calendar" width="24" height="24" />
                        </div>
                        <h4 style={{ fontSize: "18px", fontWeight: "600", color: "#111827" }}>No classes found</h4>
                        <p style={{ fontSize: "14px", color: "#6B7280", maxWidth: "300px", margin: "8px auto" }}>
                            Try adjusting your search or filters to find what you're looking for.
                        </p>
                        <button
                            style={{
                                padding: "8px 16px",
                                backgroundColor: "transparent",
                                border: "1px solid #D1D5DB",
                                borderRadius: "6px",
                                fontSize: "14px",
                                fontWeight: "500",
                                marginTop: "16px",
                                cursor: "pointer"
                            }}
                            onClick={() => {
                                setSearchText("");
                                setSelectedDepartment(departments[0]);
                                setSelectedYear("2023-2024");
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

export default Timetable;