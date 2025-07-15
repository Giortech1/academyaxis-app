import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Table } from 'react-bootstrap';

// Mock teachers data 
const teachersData = [
    {
        id: 1,
        name: "Demo Name",
        teacherId: "12345678",
        role: "Assist Prof",
        assignedCourses: 2,
        assignedClass: 2,
        lastActive: 2,
        image: "/assets/student1.jpg"
    },
    {
        id: 2,
        name: "Demo Name",
        teacherId: "12345678",
        role: "Lecturer",
        assignedCourses: 3,
        assignedClass: 3,
        lastActive: 3,
        image: "/assets/student2.jpg"
    },
    {
        id: 3,
        name: "Demo Name",
        teacherId: "12345678",
        role: "Senior Lecturer",
        assignedCourses: 1,
        assignedClass: 1,
        lastActive: 1,
        image: "/assets/student3.jpg"
    },
    {
        id: 4,
        name: "Demo Name",
        teacherId: "12345678",
        role: "Assist Prof",
        assignedCourses: 2,
        assignedClass: 2,
        lastActive: 2,
        image: "/assets/student4.jpg"
    },
    {
        id: 5,
        name: "Demo Name",
        teacherId: "12345678",
        role: "Lecturer",
        assignedCourses: 3,
        assignedClass: 2,
        lastActive: 2,
        image: "/assets/student5.jpg"
    },
    {
        id: 6,
        name: "Demo Name",
        teacherId: "12345678",
        role: "Senior Lecturer",
        assignedCourses: 1,
        assignedClass: 3,
        lastActive: 3,
        image: "/assets/student1.jpg"
    },
    {
        id: 7,
        name: "Demo Name",
        teacherId: "12345678",
        role: "Assist Prof",
        assignedCourses: 2,
        assignedClass: 1,
        lastActive: 1,
        image: "/assets/student2.jpg"
    },
    {
        id: 8,
        name: "Demo Name",
        teacherId: "12345678",
        role: "Lecturer",
        assignedCourses: 3,
        assignedClass: 2,
        lastActive: 2,
        image: "/assets/student3.jpg"
    },
    {
        id: 9,
        name: "Demo Name",
        teacherId: "12345678",
        role: "Senior Lecturer",
        assignedCourses: 1,
        assignedClass: 2,
        lastActive: 2,
        image: "/assets/student4.jpg"
    },
    {
        id: 10,
        name: "Demo Name",
        teacherId: "12345678",
        role: "Assist Prof",
        assignedCourses: 2,
        assignedClass: 3,
        lastActive: 3,
        image: "/assets/student5.jpg"
    },
    {
        id: 11,
        name: "Demo Name",
        teacherId: "12345678",
        role: "Lecturer",
        assignedCourses: 3,
        assignedClass: 1,
        lastActive: 1,
        image: "/assets/student1.jpg"
    },
    {
        id: 12,
        name: "Demo Name",
        teacherId: "12345678",
        role: "Senior Lecturer",
        assignedCourses: 1,
        assignedClass: 2,
        lastActive: 2,
        image: "/assets/student2.jpg"
    },
    {
        id: 13,
        name: "Demo Name",
        teacherId: "12345678",
        role: "Assist Prof",
        assignedCourses: 2,
        assignedClass: 2,
        lastActive: 2,
        image: "/assets/student3.jpg"
    },
    {
        id: 14,
        name: "Demo Name",
        teacherId: "12345678",
        role: "Lecturer",
        assignedCourses: 3,
        assignedClass: 3,
        lastActive: 3,
        image: "/assets/student4.jpg"
    },
    {
        id: 15,
        name: "Demo Name",
        teacherId: "12345678",
        role: "Senior Lecturer",
        assignedCourses: 1,
        assignedClass: 1,
        lastActive: 1,
        image: "/assets/student5.jpg"
    },
    {
        id: 16,
        name: "Demo Name",
        teacherId: "12345678",
        role: "Assist Prof",
        assignedCourses: 2,
        assignedClass: 2,
        lastActive: 2,
        image: "/assets/student1.jpg"
    },
    {
        id: 17,
        name: "Demo Name",
        teacherId: "12345678",
        role: "Lecturer",
        assignedCourses: 3,
        assignedClass: 2,
        lastActive: 2,
        image: "/assets/student2.jpg"
    }
];

const TeachersList = () => {
    const navigate = useNavigate();

    // State variables
    const [teachers, setTeachers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredTeachers, setFilteredTeachers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Get teacher data
    useEffect(() => {
        setLoading(true);
        setTeachers(teachersData);
        setFilteredTeachers(teachersData);
        setLoading(false);
    }, []);

    // Handle search functionality
    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredTeachers(teachers);
        } else {
            const filtered = teachers.filter(teacher =>
                teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                teacher.teacherId.includes(searchTerm) ||
                teacher.role.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredTeachers(filtered);
        }
    }, [searchTerm, teachers]);

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Handle going back
    const handleBack = () => {
        navigate(-1);
    };

    // Handle view teacher details
    const handleViewTeacher = (teacherId) => {
        navigate(`/teacher-profile/${teacherId}`);
    };
    const navigateToAddStudent = () => {
        navigate('/add-teacher', {
        });
    };



    return (
        <Container fluid className="p-0">
            {/* Header */}
            <div style={{
                backgroundColor: '#fff',
                padding: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
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
                    <h5 className="mb-0" style={{ fontSize: '24px', fontWeight: '600', color: '#111827' }}>Teachers In Demo Section</h5>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                        borderRadius: '50%',
                        overflow: 'hidden',
                        width: '36px',
                        height: '36px'
                    }}>
                        <img
                            src="/assets/profile.jpg"
                            alt="Profile"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'%3E%3C/path%3E%3Ccircle cx='12' cy='7' r='4'%3E%3C/circle%3E%3C/svg%3E";
                            }}
                        />
                    </div>
                    <div>
                        <div style={{ fontWeight: '500', fontSize: '14px', color: '#1F2937' }}>Mian Hamad Khalil</div>
                        <div style={{ fontSize: '12px', color: '#9CA3AF', fontWeight: '400' }}>14785200</div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="p-4">
                {/* Filters and Search */}
                <div className="d-flex justify-content-between align-items-center mb-4">
    {/* Teachers button stays on the left */}
    <Button
        variant="dark"
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
        <img
            src="/assets/user.png"
            alt="User Icon"
            style={{ width: '16px', height: '16px' }}
            onError={(e) => {
                e.target.onerror = null;
                e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'%3E%3C/path%3E%3Ccircle cx='12' cy='7' r='4'%3E%3C/circle%3E%3C/svg%3E";
            }}
        />
        <span>Teachers</span>
    </Button>

    {/* Right-side container for search and add button */}
    <div className="d-flex align-items-center gap-3">
        {/* Search field now on right side before Add Teacher button */}
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

        {/* Add Teacher button */}
        <Button
            variant="primary"
            style={{
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '14px',
                padding: '8px 16px',
                backgroundColor: '#1F2937',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                border: 'none'
            }}
            onClick={navigateToAddStudent}
        >
            <span>+ Add Teacher</span>
        </Button>
    </div>
</div>

                {/* Loading State */}
                {loading ? (
                    <div className="text-center py-5">
                        <p>Loading Teachers...</p>
                    </div>
                ) : (
                    <>
                        {/* Teachers Table */}
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
                                            Teachers
                                        </th>
                                        <th style={{
                                            fontSize: '16px',
                                            fontWeight: '500',
                                            color: '#111827',
                                            padding: '17px 16px'
                                        }}>
                                            Teacher ID
                                        </th>
                                        <th style={{
                                            fontSize: '16px',
                                            fontWeight: '500',
                                            color: '#111827',
                                            padding: '17px 16px'
                                        }}>
                                            Role
                                        </th>
                                        <th style={{
                                            fontSize: '16px',
                                            fontWeight: '500',
                                            color: '#111827',
                                            padding: '17px 16px'
                                        }}>
                                            Assigned Courses
                                        </th>
                                        <th style={{
                                            fontSize: '16px',
                                            fontWeight: '500',
                                            color: '#111827',
                                            padding: '17px 16px'
                                        }}>
                                            Assigned Class
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
                                    {filteredTeachers.map(teacher => (
                                        <tr key={teacher.id}>
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
                                                            src={teacher.image}
                                                            alt={teacher.name}
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
                                                    <span style={{ fontSize: '14px', fontWeight: '500', color: '#101828' }}>{teacher.name}</span>
                                                </div>
                                            </td>
                                            <td style={{
                                                padding: '16px 16px',
                                                fontSize: '14px',
                                                fontWeight: '400',
                                                color: '#4B5563',
                                                verticalAlign: 'middle'
                                            }}>
                                                {teacher.teacherId}
                                            </td>
                                            <td style={{
                                                padding: '16px 16px',
                                                fontSize: '14px',
                                                fontWeight: '400',
                                                color: '#4B5563',
                                                verticalAlign: 'middle'
                                            }}>
                                                {teacher.role}
                                            </td>
                                            <td style={{
                                                padding: '16px 16px',
                                                fontSize: '14px',
                                                fontWeight: '400',
                                                color: '#4B5563',
                                                verticalAlign: 'middle',
                                                // textAlign: 'center'
                                            }}>
                                                {teacher.assignedCourses}
                                            </td>
                                            <td style={{
                                                padding: '16px 16px',
                                                fontSize: '14px',
                                                fontWeight: '400',
                                                color: '#4B5563',
                                                verticalAlign: 'middle',
                                                // textAlign: 'center'
                                            }}>
                                                {teacher.assignedClass}
                                            </td>
                                            <td style={{
                                                padding: '16px 16px',
                                                fontSize: '14px',
                                                fontWeight: '400',
                                                color: '#4B5563',
                                                verticalAlign: 'middle',
                                                // textAlign: 'center'
                                            }}>
                                                {teacher.lastActive}
                                            </td>
                                            <td style={{
                                                padding: '16px 16px',
                                                verticalAlign: 'middle'
                                            }}>
                                                <Button
                                                    onClick={() => handleViewTeacher(teacher.id)}
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
                        {filteredTeachers.length === 0 && !loading && (
                            <div className="text-center py-5">
                                <p>No teachers found.</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </Container>
    );
};

export default TeachersList;