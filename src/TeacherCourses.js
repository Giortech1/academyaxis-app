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

    // Data generation
const generateFallbackData = () => {
    return Array.from({ length: 7 }, (_, i) => {
        const status = i % 2 === 0 ? "Ongoing" : "Completed";
        return {
            id: i + 1,
            name: `Demo Course Name ${i + 1}`,
            subject: `Fall`,
            date: `2024-05-${String(i + 1).padStart(2, "0")}`,
            status: status,
            year: "2024-2025", // added
            duration: "4 Year", // added
        };
    });
};

// Render status dot
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

                        <h1 style={{ fontSize: '24px', margin: 0, fontWeight: '600' }}>Courses</h1>
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

                <header className="d-flex  align-items-center mb-4" style={{ marginTop: "15px", justifyContent:'flex-end' }}>
                  

                    {/* Right Section: Search Bar, Sort, and Button */}
                    <div className="d-flex align-items-center">
                        

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
            <th>Course Name</th>
            <th>Semester</th>
            <th>Teaching Hours</th>
            <th>Course Duration</th>
            <th>Year</th>
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
                <td style={{ verticalAlign: "middle" }}>{row.id}</td>
                <td style={{ verticalAlign: "middle" }}>{row.name}</td>
                <td style={{ verticalAlign: "middle" }}>{row.subject}</td>
                <td style={{ verticalAlign: "middle" }}>{row.date}</td>
                <td style={{ verticalAlign: "middle" }}>{row.duration}</td>
                <td style={{ verticalAlign: "middle" }}>{row.year}</td>
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
