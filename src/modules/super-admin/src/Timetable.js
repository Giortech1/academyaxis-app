import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';


function Timetable() {
    const [tableData, setTableData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

  const handleClick = () => {
    navigate('/addclass');
  };

    const [searchText, setSearchText] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState("Department of Computer Science");
    const [selectedYear, setSelectedYear] = useState("2023-2024");

    // Modal form states
    const [modalDepartment, setModalDepartment] = useState("");
    const [modalRoom, setModalRoom] = useState("");

    // Props for Header - departments would be fetched from API in real app
    const departments = [
        "Department of Computer Science",
        "Department of Engineering",
        "Department of Mathematics",
        "Department of Physics"
    ];
    
    const rooms = [
        "CS-103-B",
        "CS-105-A",
        "CS-201-C",
        "CS-302-A",
        "EN-103-B",
        "PH-101-A",
        "MA-202-C"
    ];
    
    const years = ["2023-2024", "2022-2023", "2021-2022"];

    // Fetch data
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                // Mock data for demonstration
                const mockData = [
                    {
                        id: 1,
                        subjectName: "Demo Department Name",
                        roomNo: "CS-103-B",
                        strength: 26,
                        departmentName: "Department of Computer Science",
                        participants: 17,
                        year: "2023-2024"
                    },
                    {
                        id: 2,
                        subjectName: "Demo Department Name",
                        roomNo: "CS-103-B",
                        strength: 30,
                        departmentName: "Department of Computer Science",
                        participants: 24,
                        year: "2023-2024"
                    },
                    {
                        id: 3,
                        subjectName: "Demo Department Name",
                        roomNo: "CS-103-B",
                        strength: 32,
                        departmentName: "Department of Computer Science",
                        participants: 28,
                        year: "2023-2024"
                    },
                    {
                        id: 4,
                        subjectName: "Demo Department Name",
                        roomNo: "CS-103-B",
                        strength: 25,
                        departmentName: "Department of Computer Science",
                        participants: 20,
                        year: "2023-2024"
                    },
                    {
                        id: 5,
                        subjectName: "Demo Department Name",
                        roomNo: "CS-103-B",
                        strength: 35,
                        departmentName: "Department of Engineering",
                        participants: 30,
                        year: "2023-2024"
                    },
                    {
                        id: 6,
                        subjectName: "Demo Department Name",
                        roomNo: "CS-103-B",
                        strength: 22,
                        departmentName: "Department of Physics",
                        participants: 18,
                        year: "2023-2024"
                    },
                    {
                        id: 7,
                        subjectName: "Demo Department Name",
                        roomNo: "CS-103-B",
                        strength: 28,
                        departmentName: "Department of Mathematics",
                        participants: 22,
                        year: "2022-2023"
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

    // Modal handlers
    const openModal = () => {
        setShowModal(true);
        setModalDepartment("");
        setModalRoom("");
    };

    const closeModal = () => {
        setShowModal(false);
        setModalDepartment("");
        setModalRoom("");
    };

    const handleSave = () => {
        // Here you would typically save the data to your backend
        console.log("Saving:", { department: modalDepartment, room: modalRoom });
        closeModal();
    };

    // Subject card component that matches the design
    const SubjectCard = ({ card }) => {
        return (
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px 24px",
                backgroundColor: "#F8F9FA",
                borderRadius: "12px",
                marginBottom: "8px",
                border: "1px solid #E9ECEF"
            }}>
                {/* Left Side: Subject Name and Room */}
                <div style={{ flex: 1 }}>
                    <div style={{
                        fontSize: "16px",
                        fontWeight: "600",
                        color: "#1F2937",
                        marginBottom: "4px"
                    }}>
                        {card.subjectName}
                    </div>
                    <div style={{
                        fontSize: "14px",
                        color: "#6B7280"
                    }}>
                        Room NO {card.roomNo}
                    </div>
                </div>

                {/* Right Side: Action Button */}
                <div>
      <button 
        onClick={handleClick}
        style={{ 
          width: "40px", 
          height: "40px", 
          borderRadius: "50%", 
          backgroundColor: "transparent", 
          border: "none", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center", 
          cursor: "pointer",
        }}
      >
        <img 
          src="/assets/arrow-right1.png" 
          alt="Arrow" 
          width="24" 
          height="24" 
        />
      </button>
    </div>
            </div>
        );
    };

    // Modal Component
    const Modal = () => {
        if (!showModal) return null;
        
        return (
            <div style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1000
            }}>
                <div style={{
                    backgroundColor: "white",
                    borderRadius: "12px",
                    padding: "24px",
                    width: "400px",
                    maxWidth: "90vw",
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)"
                }}>
                    <h3 style={{
                        fontSize: "18px",
                        fontWeight: "600",
                        color: "#1F2937",
                        marginBottom: "20px",
                        marginTop: "0"
                    }}>
                        Add Room
                    </h3>

                    {/* Department Dropdown */}
                    <div style={{ marginBottom: "16px" }}>
                        <div style={{ position: "relative" }}>
                            <select
                                value={modalDepartment}
                                onChange={(e) => setModalDepartment(e.target.value)}
                                style={{
                                    width: "100%",
                                    padding: "12px 16px",
                                    border: "1px solid #D1D5DB",
                                    borderRadius: "8px",
                                    fontSize: "14px",
                                    color: modalDepartment ? "#1F2937" : "#9CA3AF",
                                    backgroundColor: "white",
                                    appearance: "none",
                                    paddingRight: "40px",
                                    cursor: "pointer"
                                }}
                            >
                                <option value="">Select Department</option>
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
                                <img src="/assets/arrow-down.png" alt="Dropdown arrow" width="12" height="12" />
                            </div>
                        </div>
                    </div>

                    {/* Room Dropdown */}
                    <div style={{ marginBottom: "24px" }}>
                        <div style={{ position: "relative" }}>
                            <select
                                value={modalRoom}
                                onChange={(e) => setModalRoom(e.target.value)}
                                style={{
                                    width: "100%",
                                    padding: "12px 16px",
                                    border: "1px solid #D1D5DB",
                                    borderRadius: "8px",
                                    fontSize: "14px",
                                    color: modalRoom ? "#1F2937" : "#9CA3AF",
                                    backgroundColor: "white",
                                    appearance: "none",
                                    paddingRight: "40px",
                                    cursor: "pointer"
                                }}
                            >
                                <option value="">Select Room</option>
                                {rooms.map((room, index) => (
                                    <option key={index} value={room}>
                                        {room}
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
                                <img src="/assets/arrow-down.png" alt="Dropdown arrow" width="12" height="12" />
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: "12px"
                    }}>
                        <button
                            onClick={closeModal}
                            style={{
                                padding: "8px 16px",
                                backgroundColor: "#EAECF0",
                                border: "1px solid #EAECF0",
                                borderRadius: "100px",
                                fontSize: "18px",
                                fontWeight: "400",
                                color: "#667085",
                                cursor: "pointer"
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            style={{
                                padding: "8px 20px",
                                backgroundColor: "#8B5CF6",
                                border: "none",
                                borderRadius: "100px",
                                fontSize: "18px",
                                fontWeight: "500",
                                color: "white",
                                cursor: "pointer"
                            }}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div style={{ 
            maxWidth: "100%", 
            margin: "0 auto", 
            padding: "20px",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        }}>
            {/* Header Section */}
            <header style={{ 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center", 
                marginBottom: "24px" 
            }}>
                <div>
                    <h1 style={{ 
                        fontSize: "24px", 
                        margin: 0, 
                        fontWeight: "600", 
                        color: "#1F2937" 
                    }}>
                        Time table
                    </h1>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <img 
                        src="/assets/avatar.jpeg" 
                        alt="User Avatar" 
                        style={{
                            width: "54px",
                            height: "54px",
                            borderRadius: "50%",
                            marginRight: "12px",
                            objectFit: "cover"
                        }}
                    />
                    <div>
                        <div style={{ fontWeight: "500", fontSize: "14px", color: "#1F2937" }}>
                            Dem Parent Name
                        </div>
                        <div style={{ fontSize: "12px", color: "#9CA3AF", fontWeight:'400' }}>
                            Class VIII
                        </div>
                    </div>
                  
                </div>
            </header>

            {/* Filter Section */}
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px"
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
                            <img src="/assets/arrow-down.png" alt="Dropdown arrow" width="12" height="8" />
                        </div>
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
                            top: "50%",
                            transform: "translateY(-50%)"
                        }}>
                            <img src="/assets/search-lg.png" alt="Search" width="18" height="18" />
                        </div>
                    </div>

                    {/* Add Class Button */}
                    <button
                        onClick={openModal}
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
                    >
                        <img src="/assets/plus.png" alt="Add" width="16" height="16" style={{ filter: "brightness(0) invert(1)" }} />
                        Add Class
                    </button>
                </div>
            </div>

            {/* Loading State */}
            {isLoading && (
                <div style={{ textAlign: "center", padding: "50px 0" }}>
                    <div style={{
                        width: "32px",
                        height: "32px",
                        border: "3px solid #f3f3f3",
                        borderTop: "3px solid #8B5CF6",
                        borderRadius: "50%",
                        animation: "spin 1s linear infinite",
                        margin: "0 auto"
                    }}></div>
                    <p style={{ marginTop: "16px", color: "#6B7280" }}>Loading timetable data...</p>
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
                    <h4 style={{ fontSize: "18px", fontWeight: "600", color: "#111827" }}>
                        No classes found
                    </h4>
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
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    {filteredData.map((card) => (
                        <SubjectCard key={card.id} card={card} />
                    ))}
                </div>
            )}

            {/* Modal */}
            <Modal />

            <style jsx>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}

export default Timetable;