import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Table, Row, Col } from 'react-bootstrap';
import { UserContext } from './UserContext';

// Mock admins data
const initialAdminsData = [
    {
        id: 1,
        name: "Demo Name",
        adminId: "12345678",
        department: "Department of Computer Science",
        permission: "Full Access",
        lastActive: "12-02-25",
        image: "/assets/student1.jpg"
    },
    {
        id: 2,
        name: "Demo Name",
        adminId: "12345678",
        department: "Department of Chemical Engineers",
        permission: "Full Access",
        lastActive: "12-02-25",
        image: "/assets/student2.jpg"
    },
    {
        id: 3,
        name: "Demo Name",
        adminId: "12345678",
        department: "Department of Computer Science",
        permission: "Full Access",
        lastActive: "12-02-25",
        image: "/assets/student1.jpg"
    },
    {
        id: 4,
        name: "Demo Name",
        adminId: "12345678",
        department: "Department of Chemical Engineers",
        permission: "Full Access",
        lastActive: "12-02-25",
        image: "/assets/student2.jpg"
    },
    {
        id: 5,
        name: "Demo Name",
        adminId: "12345678",
        department: "Department of Computer Science",
        permission: "Full Access",
        lastActive: "12-02-25",
        image: "/assets/student1.jpg"
    },
    {
        id: 6,
        name: "Demo Name",
        adminId: "12345678",
        department: "Department of Chemical Engineers",
        permission: "Full Access",
        lastActive: "12-02-25",
        image: "/assets/student2.jpg"
    },
    {
        id: 7,
        name: "Demo Name",
        adminId: "12345678",
        department: "Department of Computer Science",
        permission: "Full Access",
        lastActive: "12-02-25",
        image: "/assets/student1.jpg"
    },
    {
        id: 8,
        name: "Demo Name",
        adminId: "12345678",
        department: "Department of Chemical Engineers",
        permission: "Full Access",
        lastActive: "12-02-25",
        image: "/assets/student2.jpg"
    }
];

const AdminsList = () => {
    const { userData } = useContext(UserContext);
    const navigate = useNavigate();

    // State variables
    const [admins, setAdmins] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredAdmins, setFilteredAdmins] = useState([]);
    const [loading, setLoading] = useState(true);

    // Get admin data
    useEffect(() => {
        setLoading(true);
        // Simulate API call with timeout
        setTimeout(() => {
            setAdmins(initialAdminsData);
            setFilteredAdmins(initialAdminsData);
            setLoading(false);
        }, 500);
    }, []);

    // Handle search functionality
    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredAdmins(admins);
        } else {
            const filtered = admins.filter(admin =>
                admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                admin.adminId.includes(searchTerm) ||
                admin.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                admin.permission.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredAdmins(filtered);
        }
    }, [searchTerm, admins]);

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Handle going back
    const handleBack = () => {
        navigate(-1);
    };

    // Handle view admin details - Navigate to AdminProfile.js
    const handleViewAdmin = (adminId) => {
        // Navigate to AdminProfile component with the admin ID
        navigate(`/admin-profile/${adminId}`);
    };

    // Handle navigating to Add Admin page
    const handleNavigateToAddAdmin = () => {
        navigate('/add-admin');
    };

    return (
        <Container fluid className="p-3">
            {/* Header */}
            <div style={{
                backgroundColor: '#fff',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Button
                        variant="link"
                        className="p-0"
                        onClick={handleBack}
                        style={{ color: '#000' }}
                    >
                        <img
                            src="/assets/arrow-left.png"
                            alt="Back"
                            style={{ width: '24px', height: '24px' }}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cline x1='19' y1='12' x2='5' y2='12'%3E%3C/line%3E%3Cpolyline points='12 19 5 12 12 5'%3E%3C/polyline%3E%3C/svg%3E";
                            }}
                        />
                    </Button>
                    <h5 className="mb-0" style={{ fontSize: '24px', fontWeight: '600', color: '#111827' }}>Admin In Demo Section</h5>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                        borderRadius: '50%',
                        overflow: 'hidden',
                        width: '36px',
                        height: '36px'
                    }}>
                        <img
                            src={userData?.profile_pic || "/assets/avatar.jpeg"}
                            alt="Profile"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'%3E%3C/path%3E%3Ccircle cx='12' cy='7' r='4'%3E%3C/circle%3E%3C/svg%3E";
                            }}
                        />
                    </div>
                    <div>
                        <div style={{ fontWeight: '500', fontSize: '14px', color: '#1F2937' }}>{userData?.full_name}</div>
                        <div style={{ fontSize: '12px', color: '#9CA3AF', fontWeight: '400' }}>{userData?.admin_id}0</div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="p-0">
                {/* Header with Title, Search and Add Admin button in the same row */}
                <div className="d-flex justify-content-between align-items-center " style={{ padding: "30px 0px" }}>
                    {/* Page Title - Left side */}
                    <h5 className="mb-0" style={{ fontSize: '20px', fontWeight: '600', color: '#111827' }}>Admins</h5>

                    {/* Search and Add Admin - Right side */}
                    <div className="d-flex align-items-center gap-3">
                        {/* Search Field */}
                        <div style={{
                            position: 'relative',
                            width: '240px'
                        }}>
                            <Form.Control
                                type="text"
                                placeholder="Search"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                style={{
                                    borderRadius: '8px',
                                    border: '1px solid #EAECF0',
                                    padding: '8px 16px 8px 40px',
                                    fontSize: '14px'
                                }}
                            />
                            <div style={{
                                position: 'absolute',
                                left: '16px',
                                top: '45%',
                                transform: 'translateY(-50%)',
                                color: '#6B7280'
                            }}>
                                <img
                                    src="/assets/search-lg.png"
                                    alt="Search"
                                    style={{ width: '16px', height: '16px' }}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='11' cy='11' r='8'%3E%3C/circle%3E%3Cline x1='21' y1='21' x2='16.65' y2='16.65'%3E%3C/line%3E%3C/svg%3E";
                                    }}
                                />
                            </div>
                        </div>

                        {/* Add Admin Button - Now navigates to a new route */}
                        <Button
                            variant="dark"
                            onClick={handleNavigateToAddAdmin}
                            style={{
                                borderRadius: '8px',
                                fontWeight: '600',
                                fontSize: '14px',
                                padding: '8px 16px',
                                backgroundColor: '#101828',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                            }}
                        >
                            <span style={{
                                display: 'inline-block',
                                width: '20px',
                                height: '20px',
                                lineHeight: '18px',
                                textAlign: 'center',
                                fontSize: '20px'
                            }}>+</span>
                            <span>Add Admin</span>
                        </Button>
                    </div>
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="text-center py-5">
                        <p>Loading Admins...</p>
                    </div>
                ) : (
                    <>
                        {/* Admins Table */}
                        <div style={{
                            borderRadius: '12px',
                            border: '1px solid #EAECF0',
                            overflow: 'hidden'
                        }}>
                            <Table responsive hover style={{ marginBottom: 0 }}>
                                <thead style={{ backgroundColor: '#F9FAFB' }}>
                                    <tr>
                                        <th style={{
                                            fontSize: '16px',
                                            fontWeight: '500',
                                            color: '#111827',
                                            padding: '17px 16px'
                                        }}>
                                            Admin
                                        </th>
                                        <th style={{
                                            fontSize: '16px',
                                            fontWeight: '500',
                                            color: '#111827',
                                            padding: '17px 16px'
                                        }}>
                                            Admin ID
                                        </th>
                                        <th style={{
                                            fontSize: '16px',
                                            fontWeight: '500',
                                            color: '#111827',
                                            padding: '17px 16px'
                                        }}>
                                            Department
                                        </th>
                                        <th style={{
                                            fontSize: '16px',
                                            fontWeight: '500',
                                            color: '#111827',
                                            padding: '17px 16px'
                                        }}>
                                            Permission
                                        </th>
                                        <th style={{
                                            fontSize: '16px',
                                            fontWeight: '500',
                                            color: '#111827',
                                            padding: '17px 16px'
                                        }}>
                                            Last Active
                                        </th>
                                        <th style={{
                                            fontSize: '16px',
                                            fontWeight: '500',
                                            color: '#111827',
                                            padding: '17px 16px'
                                        }}>
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredAdmins.map(admin => (
                                        <tr key={admin.id}>
                                            <td style={{
                                                padding: '16px 16px',
                                                verticalAlign: 'middle'
                                            }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                    <div style={{
                                                        width: '36px',
                                                        height: '36px',
                                                        borderRadius: '50%',
                                                        overflow: 'hidden'
                                                    }}>
                                                        <img
                                                            src={admin.image}
                                                            alt={admin.name}
                                                            style={{
                                                                width: '100%',
                                                                height: '100%',
                                                                objectFit: 'cover'
                                                            }}
                                                            onError={(e) => {
                                                                e.target.onerror = null;
                                                                e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'%3E%3C/path%3E%3Ccircle cx='12' cy='7' r='4'%3E%3C/circle%3E%3C/svg%3E";
                                                            }}
                                                        />
                                                    </div>
                                                    <span style={{ fontSize: '14px', fontWeight: '500', color: '#101828' }}>{admin.name}</span>
                                                </div>
                                            </td>
                                            <td style={{
                                                padding: '16px 16px',
                                                fontSize: '14px',
                                                fontWeight: '400',
                                                color: '#4B5563',
                                                verticalAlign: 'middle'
                                            }}>
                                                {admin.adminId}
                                            </td>
                                            <td style={{
                                                padding: '16px 16px',
                                                fontSize: '14px',
                                                fontWeight: '400',
                                                color: '#4B5563',
                                                verticalAlign: 'middle'
                                            }}>
                                                {admin.department}
                                            </td>
                                            <td style={{
                                                padding: '16px 16px',
                                                fontSize: '14px',
                                                fontWeight: '400',
                                                color: '#4B5563',
                                                verticalAlign: 'middle'
                                            }}>
                                                {admin.permission}
                                            </td>
                                            <td style={{
                                                padding: '16px 16px',
                                                fontSize: '14px',
                                                fontWeight: '400',
                                                color: '#4B5563',
                                                verticalAlign: 'middle'
                                            }}>
                                                {admin.lastActive}
                                            </td>
                                            <td style={{
                                                padding: '16px 16px',
                                                verticalAlign: 'middle'
                                            }}>
                                                <Button
                                                    onClick={() => handleViewAdmin(admin.id)}
                                                    style={{
                                                        backgroundColor: '#8B5CF6',
                                                        borderRadius: '100px',
                                                        border: 'none',
                                                        padding: '8px 25px',
                                                        fontSize: '14px',
                                                        fontWeight: '500'
                                                    }}
                                                >
                                                    View
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>

                        {/* Empty State */}
                        {filteredAdmins.length === 0 && !loading && (
                            <div className="text-center py-5">
                                <p>No admins found.</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </Container>
    );
};

export default AdminsList;