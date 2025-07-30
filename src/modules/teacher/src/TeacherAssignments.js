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
                    ...styles.statusDot,
                    backgroundColor: color,
                }}
            />
        );
    };

    return (
        <Container fluid className="p-0 d-flex">
            <main className="flex-grow-1 p-3">
                {/* Header Section */}
                <header style={styles.header}>
                    {/* Left side: Arrow and Heading */}
                    <div style={styles.headerLeft}>
                        <Image
                            src="/assets/arrow-left.png"
                            roundedCircle
                            width={24}
                            height={24}
                            className="me-2"
                            alt="Back Arrow"
                            style={styles.backArrow}
                            onClick={() => navigate(-1)}
                        />
                        <h1 style={styles.headerTitle}>Assignments</h1>
                    </div>

                    {/* Right side: User Info and Dropdown */}
                    <div style={styles.headerRight}>
                        {/* User Info */}
                        <img
                            src={userData?.profile_pic || "/assets/avatar.jpeg"}
                            alt="User"
                            style={styles.userImage}
                        />
                        <div style={styles.userInfo}>
                            <div style={styles.userName}>{userData?.full_name}</div>
                            <div style={styles.userTeacherId}>{userData?.teacher_id}</div>
                        </div>
                        <button style={styles.dropdownButton}>
                            <img
                                src="/assets/arrow-down.png"
                                alt="Dropdown"
                                style={styles.dropdownIcon}
                            />
                        </button>
                    </div>
                </header>

                <header className="d-flex justify-content-between align-items-center mb-4" style={styles.subHeader}>
                    {/* Left Section*/}
                    <div className="d-flex align-items-center">
                        <div
                            className="d-flex align-items-center me-3"
                            style={styles.sectionBox}
                        >
                            <span style={styles.sectionText}>
                                {sectionData?.course?.name}
                            </span>
                        </div>

                        <div
                            className="d-flex align-items-center me-3"
                            style={styles.sectionBox}
                        >
                            <span style={styles.sectionText}>
                                Section {sectionData?.section}
                            </span>
                        </div>
                    </div>

                    {/* Right Section: Search Bar, Sort, and Button */}
                    <div className="d-flex align-items-center">
                        {/* Search Bar */}
                        <div className="position-relative me-3" style={styles.searchContainer}>
                            <Form.Control
                                type="text"
                                placeholder={"Search"}
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                style={styles.searchInput}
                            />
                            <Image
                                src="/assets/search-lg.png"
                                alt="Search Icon"
                                width={20}
                                height={20}
                                style={styles.searchIcon}
                            />
                        </div>

                        {/* Create Quiz Button */}
                        <Button
                            className="d-flex align-items-center"
                            style={styles.createButton}
                            onClick={() => navigate(`/create-assignments/${sectionData?.id}`)}
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

                <div className="border rounded p-3" style={styles.tableContainer}>
                    {/* Table Section */}
                    <div style={styles.tableScrollContainer}>
                        <Table
                            hover
                            className="mb-0"
                            style={styles.table}
                        >
                            <thead style={styles.tableHead}>
                                <tr style={styles.tableHeaderRow}>
                                    <th>Sr No.</th>
                                    <th>Name</th>
                                    <th>Start Date</th>
                                    <th>Deadline</th>
                                    <th>Schedule</th>
                                    <th>Status</th>
                                    <th>View</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {assignmentsData.map((row, index) => (
                                    <tr
                                        key={row?.id}
                                        style={styles.tableBodyRow}
                                    >
                                        <td style={styles.tableCell}>{index + 1}</td>
                                        <td style={styles.tableCell}>{row?.title}</td>
                                        <td style={styles.tableCell}>{formatDate(row?.startDate)}</td>
                                        <td style={styles.tableCell}>{formatDate(row?.endDate)}</td>
                                        <td style={styles.tableCell}>{row?.isScheduled ? formatDate(row?.scheduleDateTime) : 'None'}</td>
                                        <td style={styles.tableCell}>
                                            {renderStatusDot(row?.status)} {row?.status === 'published' ? 'Active' : 'Draft'}
                                        </td>
                                        <td style={styles.tableCell}>
                                            <img
                                                src="/assets/view-btn.png"
                                                alt="View Assignment"
                                                style={styles.viewIcon}
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

const styles = {
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
        paddingTop: '0px',
        width: '100%',
    },
    headerLeft: {
        display: 'flex',
        alignItems: 'center',
    },
    backArrow: {
        cursor: "pointer"
    },
    headerTitle: {
        fontSize: '24px',
        margin: 0,
        fontWeight: '600',
    },
    headerRight: {
        display: 'flex',
        alignItems: 'center',
    },
    userImage: {
        borderRadius: '50%',
        width: '54px',
        height: '54px',
        marginRight: '10px',
    },
    userInfo: {
        marginRight: '10px',
    },
    userName: {
        fontWeight: '500',
        fontSize: '14',
    },
    userTeacherId: {
        fontSize: '12px',
        color: '#6c757d',
    },
    dropdownButton: {
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
    },
    dropdownIcon: {
        width: '12px',
        height: '12px',
    },
    subHeader: {
        marginTop: "15px",
    },
    sectionBox: {
        border: "1px solid #D1D5DB",
        borderRadius: "8px",
        padding: "8px 12px",
        cursor: "pointer",
        backgroundColor: "white",
        justifyContent: "center",
        width: "auto",
    },
    sectionText: {
        fontSize: "14px",
        fontWeight: "600",
    },
    searchContainer: {
        position: "relative",
    },
    searchInput: {
        borderRadius: "8px",
        paddingLeft: "40px",
        fontSize: "14px",
        fontWeight: "400",
        color: "#98A2B3",
        border: "1px solid #D1D5DB",
        width: "300px",
    },
    searchIcon: {
        position: "absolute",
        top: "50%",
        left: "12px",
        transform: "translateY(-50%)",
    },
    createButton: {
        backgroundColor: "#101828",
        color: "white",
        borderRadius: "8px",
        fontSize: "14px",
        fontWeight: "600",
        padding: "8px 16px",
        border: "none",
    },
    tableContainer: {
        height: "750px",
    },
    tableScrollContainer: {
        maxHeight: "690px",
        overflowY: "auto",
        overflowX: "auto",
    },
    table: {
        color: "#4B5563",
        fontFamily: "Inter",
        fontSize: "16px",
        fontWeight: "500",
    },
    tableHead: {
        position: "sticky",
        top: 0,
        background: "#FFFFFF",
        zIndex: 1,
        fontStyle: "normal",
        color: "#111827",
        fontSize: "16px",
        fontWeight: "500",
        fontFamily: "Inter",
    },
    tableHeaderRow: {
        fontSize: '16px',
        fontWeight: '500',
        color: '#111827',
    },
    tableBodyRow: {
        borderBottom: "1px solid #D1D5DB",
        lineHeight: "60px",
        fontSize: "14px",
        fontWeight: "400",
        color: "#4B5563",
        fontStyle: "normal",
    },
    tableCell: {
        verticalAlign: "middle",
        fontSize: '14px',
        fontWeight: '400',
        color: '#4B5563',
        fontStyle: 'normal',
    },
    statusDot: {
        height: "8px",
        width: "8px",
        borderRadius: "50%",
        display: "inline-block",
        marginRight: "8px",
    },
    viewIcon: {
        width: '24px',
        height: '24px',
        cursor: "pointer",
    },
};

export default Assignments;