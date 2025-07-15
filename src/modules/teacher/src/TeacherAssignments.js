import React, { useState, useEffect, useContext } from "react";
import { Container, Button, Table, Image, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { UserContext } from "./UserContext";

function Assignments() {
    const { id } = useParams();
    const { userData, sections, fetchAssignments } = useContext(UserContext);
    const [sectionData, setSectionData] = useState([]);
    const [assignmentsData, setAssignmentData] = useState([]);
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        if (!id || sections?.length === 0) return;

        const getAssignmentsData = async () => {
            try {
                const response = await fetchAssignments(id);

                if (response?.success) {
                    setAssignmentData(response?.data);

                    const matchedSection = sections.find(section => section?.id === id);
                    setSectionData(matchedSection);
                }
            } catch (error) {
                console.log('Error fetching assignments: ', error);
            }
        };

        getAssignmentsData();
    }, [id, sections]);

    const formatDate = (isoString) => {
        const date = new Date(isoString);

        return date.toLocaleString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
    };

    const renderStatusDot = (status) => {
        const color = status === "published" ? "green" : "orange";
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
                            src={userData?.profile_pic || "/assets/avatar.jpeg"}
                            alt="User"
                            style={{
                                borderRadius: '50%',
                                width: '54px',
                                height: '54px',
                                marginRight: '10px',

                            }}
                        />
                        <div style={{ marginRight: '10px' }}>
                            <div style={{ fontWeight: '500', fontSize: '14' }}>{userData?.full_name}</div>
                            <div style={{ fontSize: '12px', color: '#6c757d' }}>{userData?.teacher_id}</div>
                        </div>
                        <button
                            style={{
                                backgroundColor: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                            }}
                        >
                            <img
                                src="/assets/arrow-down.png"
                                alt="Dropdown"
                                style={{ width: '12px', height: '12px' }}
                            />
                        </button>
                    </div>
                </header>

                <header className="d-flex justify-content-between align-items-center mb-4" style={{ marginTop: "15px" }}>
                    {/* Left Section*/}
                    <div className="d-flex align-items-center">
                        <div
                            className="d-flex align-items-center me-3"
                            style={{
                                border: "1px solid #D1D5DB",
                                borderRadius: "8px",
                                padding: "8px 12px",
                                cursor: "pointer",
                                backgroundColor: "white",
                                justifyContent: "center",
                                width: "auto"
                            }}
                        >
                            <span style={{ fontSize: "14px", fontWeight: "600" }}>
                                {sectionData?.course?.name}
                            </span>
                        </div>

                        <div
                            className="d-flex align-items-center me-3"
                            style={{
                                border: "1px solid #D1D5DB",
                                borderRadius: "8px",
                                padding: "8px 12px",
                                cursor: "pointer",
                                backgroundColor: "white",
                                justifyContent: "center",
                                width: "auto"
                            }}
                        >
                            <span style={{ fontSize: "14px", fontWeight: "600" }}>
                                Section {sectionData?.section}
                            </span>
                        </div>
                    </div>


                    {/* Right Section: Search Bar, Sort, and Button */}
                    <div className="d-flex align-items-center">
                        {/* Search Bar */}
                        <div className="position-relative me-3">
                            <Form.Control
                                type="text"
                                placeholder={"Search"}
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
                            Create Assignments
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
                                    <th>Start Date</th>
                                    <th>Deadline</th>
                                    <th>Status</th>
                                    <th>View</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {assignmentsData.map((row, index) => (
                                    <tr
                                        key={row?.id}
                                        style={{
                                            borderBottom: "1px solid #D1D5DB",
                                            lineHeight: "60px",
                                            fontSize: "14px",
                                            fontWeight: "400",
                                            color: "#4B5563",
                                            fontStyle: "normal",
                                        }}
                                    >
                                        <td style={{ verticalAlign: "middle", fontSize: '14px', fontWeight: '400', color: '#4B5563', fontStyle: 'normal' }}>{index + 1}</td>
                                        <td style={{ verticalAlign: "middle", fontSize: '14px', fontWeight: '400', color: '#4B5563', fontStyle: 'normal' }}>{row?.title}</td>
                                        <td style={{ verticalAlign: "middle", fontSize: '14px', fontWeight: '400', color: '#4B5563', fontStyle: 'normal' }}>{formatDate(row?.startDate)}</td>
                                        <td style={{ verticalAlign: "middle", fontSize: '14px', fontWeight: '400', color: '#4B5563', fontStyle: 'normal' }}>{formatDate(row?.endDate)}</td>
                                        <td style={{ verticalAlign: "middle" }}>
                                            {renderStatusDot(row?.status)} {row?.status === 'published' ? 'Active' : 'Draft'}
                                        </td>
                                        <td
                                            style={{
                                                verticalAlign: "middle",
                                            }}

                                        >
                                            <img
                                                src="/assets/view-btn.png"
                                                alt="View Assignment"
                                                style={{ width: '24px', height: '24px', cursor: "pointer", }}
                                                onClick={() => navigate(`/TeacherAssignmentDetails/${sectionData?.id}/${row?.id}`)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </main>

            <ToastContainer />
        </Container>
    );
}

export default Assignments;
