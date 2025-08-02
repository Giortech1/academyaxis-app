import React, { useState, useEffect, useContext } from "react";
import { Container, Button, Form, Table, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

function Admin() {
    const { userData, fetchUsersByRole } = useContext(UserContext);
    const [adminData, setAdminData] = useState([]);
    const [statsData, setStatsData] = useState([]);
    const [filteredAdmins, setFilteredAdmins] = useState(adminData);
    const [searchText, setSearchText] = useState("");
    const navigate = useNavigate();
    const currentDate = new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    useEffect(() => {
        const getAdmins = async () => {
            const response = await fetchUsersByRole('admin');

            if (response?.success) {
                setAdminData(response?.data);
                setFilteredAdmins(response?.data);
            }
        };

        getAdmins();
    }, []);

    useEffect(() => {
        if (adminData?.length === 0) return;

        setStatsData([
            {
                title: "Total Admins",
                count: adminData?.length,
                icon: "/assets/totalclasses.png",
                bgColor: "#F9F5FF",
                navigateTo: "/admin-details/1"
            },
            {
                title: "New Admins",
                count: adminData?.length,
                icon: "/assets/8.png",
                bgColor: "#E1F2FC",
            },
            {
                title: "Admins Left",
                count: adminData?.filter(admin => admin?.status !== "Active").length,
                icon: "/assets/9.png",
                bgColor: "#FEF3F2",
            }
        ]);
    }, [adminData]);

    useEffect(() => {
        filterAdmins();
    }, [searchText]);

    const filterAdmins = () => {
        let filtered = adminData;

        if (searchText.trim() !== "") {
            filtered = adminData.filter((admin) =>
                admin?.first_name.toLowerCase().includes(searchText.toLowerCase()) ||
                admin?.last_name.toLowerCase().includes(searchText.toLowerCase()) ||
                admin?.admin_id.includes(searchText)
            );
        }

        setFilteredAdmins(filtered);
    };

    const handleStatsCardClick = (stat) => {
        if (stat.navigateTo) {
            navigate(stat.navigateTo);
        }
    };

    return (
        <Container fluid className="p-0 d-flex">
            <main className="flex-grow-1 p-3">
                {/* Header Section */}
                <header
                    className="d-flex flex-wrap justify-content-between align-items-center mb-3 w-100"
                    style={{ paddingTop: "0px" }}
                >
                    <div className="d-flex align-items-center mb-2 mb-md-0">
                        <h1 style={{ fontSize: "24px", margin: 0, fontWeight: "600" }}>Admin</h1>
                    </div>
                    <div className="d-flex align-items-center">
                        <img
                            src="/assets/avatar.png"
                            alt="User"
                            style={{ borderRadius: "50%", width: "54px", height: "54px", marginRight: "10px" }}
                        />
                        <div style={{ marginRight: "10px" }}>
                            <div style={{ fontWeight: "500", fontSize: "14" }}>{userData?.full_name}</div>
                            <div style={{ fontSize: "12px", color: "#6c757d" }}>{userData?.user_id}</div>
                        </div>
                    </div>
                </header>

                {/* Filter Section */}
                <div
                    className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3"
                    style={{ marginTop: "15px", width: "100%" }}
                >
                    <div className="d-flex flex-wrap align-items-center gap-3">
                        <div
                            className="d-flex align-items-center mb-2 mb-md-0"
                            style={{
                                border: "1px solid #EAECF0",
                                borderRadius: "8px",
                                padding: "8px 12px",
                                backgroundColor: "white",
                                cursor: "pointer",
                            }}
                        >
                            <img
                                src="/assets/calendar1.png"
                                alt="Calendar Icon"
                                width={20}
                                height={20}
                                className="me-2"
                            />
                            <span style={{ fontSize: "14px", fontWeight: "600", color: "#111827" }}>
                                {currentDate}
                            </span>
                        </div>
                    </div>

                    <div className="d-flex flex-wrap align-items-center gap-3">
                        <div className="position-relative mb-2 mb-md-0">
                            <Form.Control
                                type="text"
                                placeholder="Search roll number"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                style={{
                                    borderRadius: "8px",
                                    paddingLeft: "36px",
                                    fontSize: "14px",
                                    fontWeight: "400",
                                    color: "#98A2B3",
                                    border: "1px solid #EAECF0",
                                    width: "100%",
                                    minWidth: "200px"
                                }}
                            />
                            <img
                                src="/assets/search-lg.png"
                                alt="Search Icon"
                                width={18}
                                height={18}
                                style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "10px",
                                    transform: "translateY(-50%)",
                                }}
                            />
                        </div>

                        <Button
                            style={{
                                backgroundColor: "#1F2937",
                                border: "none",
                                borderRadius: "8px",
                                padding: "10px 16px",
                                fontWeight: "600",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                            }}
                            onClick={() => navigate('/add-admin')}
                        >
                            <img src="/assets/plus2.png" alt="Add" width={16} height={16} />
                            <span className="d-none d-sm-inline">Add Admin</span>
                            <span className="d-inline d-sm-none">Add</span>
                        </Button>
                    </div>
                </div>

                {/* Stats Cards - Only 3 cards */}
                <Row className="mx-0">
                    {statsData.map((stat, index) => (
                        <Col xs={12} sm={6} md={6} lg={4} key={index} className="mb-3 px-2">
                            <Card
                                style={{
                                    border: "1px solid #E5E7EB",
                                    borderRadius: "12px",
                                    backgroundColor: "#FFFFFF",
                                    height: "100%",
                                    cursor: stat.navigateTo ? "pointer" : "default"
                                }}
                                onClick={() => handleStatsCardClick(stat)}
                            >
                                <Card.Body style={{ padding: "16px 24px" }}>
                                    <Row className="align-items-center">
                                        <Col xs={3} className="d-flex justify-content-center align-items-center">
                                            <div
                                                style={{
                                                    backgroundColor: stat.bgColor,
                                                    borderRadius: "50%",
                                                    padding: "16px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    width: "60px",
                                                    height: "60px",
                                                }}
                                            >
                                                <img
                                                    src={stat.icon}
                                                    alt={stat.title}
                                                    style={{
                                                        width: "30px",
                                                        height: "30px",
                                                    }}
                                                />
                                            </div>
                                        </Col>
                                        <Col xs={9} className="d-flex flex-column justify-content-center">
                                            <Card.Text
                                                style={{
                                                    fontSize: "28px",
                                                    fontWeight: "600",
                                                    color: "#111827",
                                                    marginBottom: "0",
                                                }}
                                                className="responsive-text"
                                            >
                                                {stat.count}
                                            </Card.Text>
                                            <Card.Title style={{ fontSize: "14px", fontWeight: "500", color: "#475467" }}>
                                                {stat.title}
                                            </Card.Title>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                {/* Admin Table */}
                <div
                    style={{
                        borderCollapse: "collapse",
                        width: "100%",
                        border: "1px solid #EAECF0",
                        borderRadius: "12px",
                        marginTop: "20px",
                        overflow: "hidden"
                    }}
                >

                    <div className="table-responsive">
                        <Table
                            hover
                            className="table mb-0"
                        >
                            <thead style={{ position: "sticky", top: 0, backgroundColor: "#F9FAFB", zIndex: 1 }}>
                                <tr>
                                    <th
                                        style={{
                                            background: "#F9FAFB",
                                            padding: "15px",
                                            fontSize: "16px",
                                            fontWeight: "500",
                                            color: "#111827",
                                            letterSpacing: "0.5px"
                                        }}
                                    >
                                        Admin
                                    </th>
                                    <th
                                        style={{
                                            background: "#F9FAFB",
                                            padding: "15px",
                                            fontSize: "16px",
                                            fontWeight: "500",
                                            color: "#111827",
                                            letterSpacing: "0.5px"
                                        }}
                                    >
                                        Admin ID
                                    </th>
                                    <th
                                        className="d-none d-md-table-cell"
                                        style={{
                                            background: "#F9FAFB",
                                            padding: "15px",
                                            fontSize: "16px",
                                            fontWeight: "500",
                                            color: "#111827",
                                            letterSpacing: "0.5px"
                                        }}
                                    >
                                        Role
                                    </th>
                                    <th
                                        className="d-none d-lg-table-cell"
                                        style={{
                                            background: "#F9FAFB",
                                            padding: "15px",
                                            fontSize: "16px",
                                            fontWeight: "500",
                                            color: "#111827",
                                            letterSpacing: "0.5px"
                                        }}
                                    >
                                        Permission
                                    </th>
                                    <th
                                        className="d-none d-lg-table-cell"
                                        style={{
                                            background: "#F9FAFB",
                                            padding: "15px",
                                            fontSize: "16px",
                                            fontWeight: "500",
                                            color: "#111827",
                                            letterSpacing: "0.5px"
                                        }}
                                    >
                                        Last Active
                                    </th>
                                    <th
                                        style={{
                                            background: "#F9FAFB",
                                            padding: "15px",
                                            fontSize: "16px",
                                            fontWeight: "500",
                                            color: "#111827",
                                            letterSpacing: "0.5px"
                                        }}
                                    >
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAdmins.length > 0 ? (
                                    filteredAdmins.map((admin, index) => (
                                        <tr key={index} style={{ borderBottom: "1px solid #EAECF0" }}>
                                            <td
                                                style={{
                                                    padding: "15px",
                                                    verticalAlign: "middle"
                                                }}
                                            >
                                                <div className="d-flex align-items-center">
                                                    <img
                                                        src={admin?.profile_pic}
                                                        alt={admin?.first_name}
                                                        style={{
                                                            width: "40px",
                                                            height: "40px",
                                                            borderRadius: "50%",
                                                            marginRight: "12px"
                                                        }}
                                                    />
                                                    <span style={{
                                                        fontSize: "14px",
                                                        fontWeight: "500",
                                                        color: "#111827"
                                                    }}>
                                                        {admin?.full_name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td
                                                style={{
                                                    padding: "15px",
                                                    verticalAlign: "middle",
                                                    fontSize: "14px",
                                                    fontWeight: "400",
                                                    color: "#475467"
                                                }}
                                            >
                                                {admin?.admin_id}
                                            </td>
                                            <td
                                                className="d-none d-md-table-cell"
                                                style={{
                                                    padding: "15px",
                                                    verticalAlign: "middle",
                                                    fontSize: "14px",
                                                    fontWeight: "400",
                                                    color: "#475467"
                                                }}
                                            >
                                                {admin?.admin_type}
                                            </td>
                                            <td
                                                className="d-none d-lg-table-cell"
                                                style={{
                                                    padding: "15px",
                                                    verticalAlign: "middle"
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        padding: "4px 8px",
                                                        borderRadius: "16px",
                                                        color: '#4B5563',
                                                        fontWeight: "400",
                                                        fontSize: "14px"
                                                    }}
                                                >
                                                    {admin?.custom_roles?.length}
                                                </span>
                                            </td>
                                            <td
                                                className="d-none d-lg-table-cell"
                                                style={{
                                                    padding: "15px",
                                                    verticalAlign: "middle",
                                                    fontSize: "14px",
                                                    fontWeight: "400",
                                                    color: "#475467"
                                                }}
                                            >
                                                {admin?.lastActive}
                                            </td>
                                            <td
                                                style={{
                                                    padding: "15px",
                                                    verticalAlign: "middle"
                                                }}
                                            >
                                                <Button
                                                    style={{
                                                        backgroundColor: "#7C3AED",
                                                        border: "none",
                                                        borderRadius: "100px",
                                                        padding: "8px 20px",
                                                        fontSize: "14px",
                                                        fontWeight: "500",
                                                        color: "white"
                                                    }}
                                                    onClick={() => navigate(`/admin-profile/${admin?.adminId}`)}
                                                >
                                                    View
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center py-4">
                                            No admins found for the selected criteria
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </div>
                </div>

                {/* CSS for making text responsive */}
                <style jsx="true">{`
                    @media (max-width: 767.98px) {
                        .responsive-text {
                            font-size: 24px !important;
                        }
                    }
                    
                    .table-hover > tbody > tr:hover > * {
                        --bs-table-color-state: var(--bs-table-hover-color);
                        --bs-table-bg-state: #F9FAFB !important;
                    }
                    
                    @media (max-width: 576px) {
                        select {
                            max-width: 100%;
                            min-width: 150px;
                        }
                    }
                `}</style>
            </main>
        </Container>
    );
}



export default Admin;