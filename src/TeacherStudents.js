import React, { useState, useEffect } from "react";
import { Container, Button, Table, Image, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";




function Quizzes() {
    const [tableData, setTableData] = useState([]); // All data
    const navigate = useNavigate();

    const [searchText, setSearchText] = useState("");




    // Props for Header
    const dropdownOptions = [
        { label: "ICS" },
        { label: "Section 1" },
    ];
    const searchPlaceholder = "Search";
    const sortButtonText = "Sort";
    const createQuizButtonText = "Create Quiz";





    // Fetch or generate data
    useEffect(() => {
        const fetchAssignmentsData = async () => {
            try {
                const response = await fetch("/api/assignments");
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const data = await response.json();
                setTableData(data);
            } catch {
                // Use fallback data in case of an error
                setTableData(generateFallbackData());
            }
        };

        fetchAssignmentsData();
    }, []);

    const generateFallbackData = () => {
        return Array.from({ length: 12 }, (_, i) => {
            const attendance = `${90 - (i % 3) * 5}%`; // Example attendance (85%, 90%, 92%)
            return {
                id: i + 1,
                name: `Demo Name ${i + 1}`,
                studentId: `12345678`,
                department: `Demo Department`,
                attendance: attendance,
                profileImage: "/assets/Avatar6.png", // Dynamically assign Avatar6.png
                buttonImage: "/assets/view-btn.png", // For the View button image (if required)
            };
        });
    };




    const getAttendanceColor = (attendance) => {
        const percentage = parseInt(attendance, 10); // Convert attendance to integer
        if (percentage >= 90) return "green";  // Green for good attendance
        if (percentage >= 75) return "orange"; // Orange for medium attendance
        return "red"; // Red for low attendance
    };





    const handleRowClick = () => {
        navigate('/TeacherStudentsDetails'); // Adjust the path if needed
    };

    return (
        <Container fluid className="p-0 d-flex">


            <main className="flex-grow-1 p-3">
                {/* Header Section */}
                <header className="d-flex justify-content-between align-items-center mb-4" >
                    <div className="d-flex align-items-center">
                        <Image
                            src="/assets/arrow-left.png"
                            roundedCircle
                            width={24}
                            height={24}
                            className="me-2"
                            alt="Back Arrow"
                            style={{ cursor: "pointer" }}
                            onClick={() => navigate(-1)}
                        />
                        <h1 className="m-0" style={{ fontSize: "24px", fontWeight: "600" }}>
                            Students
                        </h1>
                    </div>

                    <div className="d-flex align-items-center">
                        <img
                            src="/assets/avatar.jpeg"
                            alt="User"
                            className="rounded-circle me-2"
                            style={{ width: "54px", height: "54px" }}
                        />
                        <div className="me-0">
                            <div style={{ fontWeight: "500", fontSize: "14px" }}>Mian Hamad Khalil</div>
                            <div style={{ fontSize: "12px", color: "#6c757d" }}>123456</div>
                        </div>
                        <button className="bg-transparent border-0">
                            <img
                                src="/assets/arrow-down.png"
                                alt="Dropdown"
                                style={{ width: "12px", height: "12px", verticalAlign: 'top' }}
                            />
                        </button>
                    </div>
                </header>

                <header className="d-flex justify-content-between align-items-center mb-4" style={{ marginTop: "15px" }}>
                    {/* Left Section: Dropdowns */}
                    <div className="d-flex align-items-center">
                        {dropdownOptions.map((option, index) => (
                            <div
                                key={index}
                                className="d-flex align-items-center me-3"
                                style={{
                                    border: "1px solid #D1D5DB",
                                    borderRadius: "8px",
                                    padding: "8px 12px",
                                    cursor: "pointer",
                                    backgroundColor: "white",
                                }}
                            >
                                <span style={{ fontSize: "14px", fontWeight: "600" }}>{option.label}</span>
                                <Image
                                    src="/assets/arrow-down.png"
                                    alt="Dropdown Icon"
                                    width={12}
                                    height={12}
                                    style={{ marginLeft: "8px" }}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Right Section: Search Bar, Sort, and Button */}
                    <div className="d-flex align-items-center">
                        {/* Search Bar */}
                        <div className="position-relative me-3">
                            <Form.Control
                                type="text"
                                placeholder={searchPlaceholder}
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
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
                        <Button
                            className="d-flex align-items-center me-3"
                            style={{
                                backgroundColor: "white",
                                color: "#374151",
                                border: "1px solid #D1D5DB",
                                borderRadius: "8px",
                                fontSize: "14px",
                                fontWeight: "600",
                                padding: "8px 12px",
                            }}
                        >
                            <Image
                                src="/assets/filter-lines.png"
                                alt="Sort Icon"
                                width={20}
                                height={20}
                                className="me-2"
                            />
                            {sortButtonText}
                        </Button>

                        {/* Create Quiz Button */}
                        {/* <Button
                            className="d-flex align-items-center"
                            style={{
                                backgroundColor: "#101828",
                                color: "white",
                                borderRadius: "8px",
                                fontSize: "14px",
                                fontWeight: "600",
                                padding: "8px 16px",
                                border: "none",
                            }}
                            onClick={() => navigate("/create-quiz")}
                        >
                            <Image
                                src="/assets/plus1.png"
                                alt="Plus Icon"
                                width={20}
                                height={20}
                                className="me-2"
                            />
                            {createQuizButtonText}
                        </Button> */}
                    </div>
                </header>


                <div className="border  p-3" style={{ border: '1px solid #EAECF0', borderRadius: '12px' }}>


                    {/* Table Section */}
                    {/* Table Section */}
                    {/* Table Section */}
                    <div style={{
                        maxHeight: "690px",
                        overflowY: "scroll",  // Allows scrolling vertically
                        overflowX: "scroll",  // Allows scrolling horizontally
                        scrollbarWidth: "none",  // Firefox hides scrollbar
                        msOverflowStyle: "none",  // Internet Explorer hides scrollbar
                    }}>
                        <Table
                            hover
                            className="mb-0"
                            style={{
                                color: "#4B5563",
                                fontFamily: "Inter",
                                fontSize: "16px",
                                fontWeight: "500",
                                borderCollapse: 'collapse',
                                width: '100%',
                            }}
                        >
                            <thead
                                style={{
                                    position: "sticky",
                                    top: 0,
                                    background: "#FFFFFF",
                                    zIndex: 1,
                                    fontStyle: 'normal',
                                    color: '#111827',
                                    fontSize: '16px',
                                    fontWeight: '500',


                                }}
                            >
                                <tr>
                                    <th style={{ fontSize: '16px', fontWeight: '500', color: '#111827', padding: '12px' }}>Sr No.</th>
                                    <th style={{ fontSize: '16px', fontWeight: '500', color: '#111827', padding: '12px' }}>Students</th>
                                    <th style={{ fontSize: '16px', fontWeight: '500', color: '#111827', padding: '12px' }}>ID</th>
                                    <th style={{ fontSize: '16px', fontWeight: '500', color: '#111827', padding: '12px' }}>Department</th>
                                    <th style={{ fontSize: '16px', fontWeight: '500', color: '#111827', padding: '12px' }}>Attendance</th>
                                    <th style={{ fontSize: '16px', fontWeight: '500', color: '#111827', padding: '12px' }}>Activity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map((row) => (
                                    <tr
                                        key={row.id}
                                        style={{
                                            borderBottom: "1px solid #D1D5DB",
                                            lineHeight: "60px",
                                            fontSize: "14px",
                                            fontWeight: "400",
                                            color: "#4B5563",
                                            fontStyle: "normal",
                                        }}
                                    >
                                        <td style={{ verticalAlign: "middle", fontSize: '14px', fontWeight: '400', color: '#4B5563', padding: '12px' }}>{row.id}</td>
                                        <td style={{ verticalAlign: "middle", fontSize: '12px', fontWeight: '500', color: '#101828', padding: '12px' }}>
                                            <img
                                                src={row.profileImage} // Use Avatar6.png dynamically for profile image
                                                alt="Student Profile"
                                                style={{
                                                    width: "36px", // Slightly larger for better visibility
                                                    height: "36px",
                                                    borderRadius: "50%", // Makes it round
                                                    marginRight: "10px",
                                                }}
                                            />
                                            {row.name}
                                        </td>
                                        <td style={{ verticalAlign: "middle", fontSize: '14px', fontWeight: '400', color: '#4B5563', padding: '12px' }}>{row.studentId}</td>
                                        <td style={{ verticalAlign: "middle", fontSize: '14px', fontWeight: '400', color: '#4B5563', padding: '12px' }}>{row.department}</td>
                                        <td style={{ verticalAlign: "middle", fontSize: '14px', fontWeight: '500', color: '#1C222E', padding: '12px' }}>
                                            {/* Dynamically color the attendance percentage */}
                                            <span
                                                style={{
                                                    color: getAttendanceColor(row.attendance), // Dynamic color based on attendance percentage
                                                    fontWeight: "400"
                                                }}
                                            >
                                                {row.attendance}
                                            </span>
                                        </td>
                                        <td
                                            style={{
                                                verticalAlign: "middle",


                                            }}

                                        >
                                            <button
                                                style={{
                                                    backgroundColor: "#9747FF",
                                                    color: "white",
                                                    border: "none",
                                                    borderRadius: "30px",
                                                    padding: "10px 25px",
                                                    fontSize: "14px",
                                                    cursor: "pointer",
                                                    fontWeight: "500",
                                                    transition: 'all 0.3s ease',
                                                    lineHeight: 'normal',
                                                }}
                                                onClick={handleRowClick}
                                            >
                                                View
                                            </button>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>


                </div>
            </main>
        </Container>
    );
}

export default Quizzes;
