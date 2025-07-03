import React, { useState, useEffect } from "react";
import { Container, Button, Table, Image, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";




function Assignments() {
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
    const createQuizButtonText = "Create Assignments";

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

    // Generate fallback data
    const generateFallbackData = () => {
        return Array.from({ length: 7 }, (_, i) => {
            const status = i % 2 === 0 ? "Ongoing" : "Completed";

            return {
                id: i + 1,
                name: `Demo Assignment Name ${i + 1}`,
                subject: `English`, // Example subject
                date: `2024-05-${String(i + 1).padStart(2, "0")}`,
                status: status,
                // Removed avatars data and extraCount
            };
        });
    };

    // Render status dot based on status
    const renderStatusDot = (status) => {
        const color = status === "Ongoing" ? "green" : "orange";
        return (
            <span
                style={{
                    height: "8px",
                    width: "8px",
                    backgroundColor: color,
                    borderRadius: "50%",
                    display: "inline-block",
                    marginRight: "8px",
                }}
            />
        );
    };

    // Render avatars with extra count
    const renderAvatars = (avatars, extraCount) => {
        return (
            <div style={{ display: "flex", alignItems: "center" }}>
                {avatars.map((avatar, index) => (
                    <img
                        key={index}
                        src={avatar}
                        alt={`Avatar ${index + 1}`}
                        style={{
                            width: "24px",
                            height: "24px",
                            borderRadius: "50%",
                            border: "1.5px solid white",
                            marginRight: index < 4 ? "-10px" : "0",
                        }}
                    />
                ))}
                {extraCount > 0 && (
                    <div
                        style={{
                            width: "24px",
                            height: "24px",
                            borderRadius: "50%",
                            border: "1.5px solid #fff",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            background: "#F2F4F7",
                            fontSize: "12px",
                            color: "#4B5563",
                            marginLeft: "-8px",
                            fontWeight: "500",
                        }}
                    >
                        +{extraCount}
                    </div>
                )}
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
                        // marginBottom: '20px',
                        padding: '10px',
                        paddingtop: '0px',
                        width: '100%',

                    }}
                >
                    {/* Left side: Arrow and Heading */}
                    <div style={{ display: 'flex', alignItems: 'center' }}>

                        <h1 style={{ fontSize: '24px', margin: 0, fontWeight: '600' }}>Assignments</h1>
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
                                    width: '110px',
                                    justifyContent: 'center'
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
                        <Button
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
                            onClick={() => navigate("/create-assignments")}
                        >
                            <Image
                                src="/assets/plus1.png"
                                alt="Plus Icon"
                                width={20}
                                height={20}
                                className="me-2"
                            />
                            {createQuizButtonText}
                        </Button>

                    </div>
                </header>


                <div className="border rounded p-3" style={{ height: "750px" }}>


                    {/* Table Section */}
                    <div style={{ maxHeight: "690px", overflowY: "auto", overflowX: "auto" }}>
                        <Table
                            hover
                            className="mb-0"
                            style={{
                                color: "#4B5563",
                                fontFamily: "Inter",
                                fontSize: "16px",
                                fontWeight: "500",
                            }}
                        >
                            <thead
                                style={{
                                    position: "sticky",
                                    top: 0,
                                    background: "#FFFFFF",
                                    zIndex: 1,
                                    fontStyle: "normal",
                                    color: "#111827",
                                    fontSize: "16px",
                                    fontWeight: "500",
                                    fontFamily: "Inter",
                                }}
                            >
                                <tr style={{ fontSize: '16px', fontWeight: '500', color: '#111827' }}>
                                    <th>Sr No.</th>
                                    <th>Name</th>
                                    <th>Subject</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>View</th>
                                    <th></th> {/* For the vertical dots image */}
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
                                        <td style={{ verticalAlign: "middle", fontSize: '14px', fontWeight: '400', color: '#4B5563', fontStyle: 'normal' }}>{row.id}</td>
                                        <td style={{ verticalAlign: "middle", fontSize: '14px', fontWeight: '400', color: '#4B5563', fontStyle: 'normal' }}>{row.name}</td>
                                        <td style={{ verticalAlign: "middle", fontSize: '14px', fontWeight: '400', color: '#4B5563', fontStyle: 'normal' }}>{row.subject}</td>
                                        <td style={{ verticalAlign: "middle", fontSize: '14px', fontWeight: '400', color: '#4B5563', fontStyle: 'normal' }}>{row.date}</td>
                                        <td style={{ verticalAlign: "middle" }}>
                                            {renderStatusDot(row.status)} {row.status}
                                        </td>
                                        <td
                                            style={{
                                                verticalAlign: "middle",
                                                // textAlign: "center",

                                            }}

                                        >
                                            <img
                                                src="/assets/view-btn.png" // Image button for view
                                                alt="View Assignment"
                                                style={{ width: '24px', height: '24px', cursor: "pointer", }} // Adjust size as needed
                                                onClick={() => navigate(`/TeacherAssignmentDetails?id=${row.id}`)} // Pass row ID as query parameter
                                            />
                                        </td>
                                        {/* <td style={{ verticalAlign: "middle", textAlign: "center" }}>
                                            <img
                                                src="/assets/dots-vertical.png"
                                                alt="Options"
                                                style={{ cursor: "pointer", width: "20px", height: "20px" }}
                                                onClick={() => alert(`Options for ${row.name}`)}
                                            />
                                        </td> */}
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

export default Assignments;
