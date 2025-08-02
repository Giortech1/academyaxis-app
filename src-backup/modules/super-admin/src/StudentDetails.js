import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Table } from 'react-bootstrap';

// Mock class data (this would normally come from an API or parent component)
const classesData = [
    {
        id: 1,
        subject: "Basic English",
        time: "09:00-10:00",
        date: "12/3/2025",
        room: "CS-101",
        duration: "1 Hour",
        students: "45/53",
        semester: "Semester 1"
    },
    {
        id: 2,
        subject: "Basic Science",
        time: "11:00-12:00",
        date: "12/3/2025",
        room: "CS-101",
        duration: "1 Hour",
        students: "51/57",
        semester: "Semester 1"
    },
    {
        id: 3,
        subject: "Computer English",
        time: "10:00-11:00",
        date: "12/3/2025",
        room: "CS-101",
        duration: "1 Hour",
        students: "38/40",
        semester: "Semester 2"
    },
    {
        id: 4,
        subject: "Basic Physics",
        time: "08:00-09:00",
        date: "12/3/2025",
        room: "CS-101",
        duration: "1 Hour",
        students: "20/32",
        semester: "Semester 2"
    },
    {
        id: 5,
        subject: "Special English",
        time: "07:00-08:00",
        date: "12/3/2025",
        room: "CS-101",
        duration: "1 Hour",
        students: "45/53",
        semester: "Semester 3"
    },
    {
        id: 6,
        subject: "Basic Math",
        time: "12:00-01:00",
        date: "12/3/2025",
        room: "CS-101",
        duration: "1 Hour",
        students: "41/50",
        semester: "Semester 3"
    },
    {
        id: 7,
        subject: "Textile Wat",
        time: "11:00-12:00",
        date: "12/3/2025",
        room: "CS-101",
        duration: "1 Hour",
        students: "39/45",
        semester: "Semester 2"
    },
];

// Mock student data - Modified to show all students when no specific class ID is provided
const allStudents = [
    {
        id: 1,
        name: "John Smith",
        rollNo: "12345678",
        section: "Section-II",
        subject: "ICS",
        totalCGPA: "4.3",
        image: "/assets/student1.jpg",
        classIds: [1, 3, 5]
    },
    {
        id: 2,
        name: "Sarah Johnson",
        rollNo: "87654321",
        section: "Section-I",
        subject: "Computer Science",
        totalCGPA: "4.1",
        image: "/assets/student2.jpg",
        classIds: [1, 2]
    },
    {
        id: 3,
        name: "Mike Wilson",
        rollNo: "11223344",
        section: "Section-III",
        subject: "Physics",
        totalCGPA: "3.9",
        image: "/assets/student3.jpg",
        classIds: [1, 4]
    },
    {
        id: 4,
        name: "Emily Davis",
        rollNo: "55667788",
        section: "Section-II",
        subject: "Mathematics",
        totalCGPA: "4.5",
        image: "/assets/student4.jpg",
        classIds: [1, 6]
    },
    {
        id: 5,
        name: "David Brown",
        rollNo: "99887766",
        section: "Section-I",
        subject: "ICS",
        totalCGPA: "3.8",
        image: "/assets/student5.jpg",
        classIds: [2, 3]
    },
    {
        id: 6,
        name: "Lisa Anderson",
        rollNo: "44556677",
        section: "Section-II",
        subject: "Computer Science",
        totalCGPA: "4.2",
        image: "/assets/student1.jpg",
        classIds: [2, 5]
    },
    {
        id: 7,
        name: "Tom Martinez",
        rollNo: "33445566",
        section: "Section-III",
        subject: "Physics",
        totalCGPA: "3.7",
        image: "/assets/student2.jpg",
        classIds: [2, 4]
    },
    {
        id: 8,
        name: "Anna Taylor",
        rollNo: "22334455",
        section: "Section-I",
        subject: "Mathematics",
        totalCGPA: "4.4",
        image: "/assets/student3.jpg",
        classIds: [3, 4]
    },
    {
        id: 9,
        name: "Chris Lee",
        rollNo: "77889900",
        section: "Section-II",
        subject: "ICS",
        totalCGPA: "4.0",
        image: "/assets/student4.jpg",
        classIds: [3, 6]
    },
    {
        id: 10,
        name: "Rachel Green",
        rollNo: "66778899",
        section: "Section-III",
        subject: "Computer Science",
        totalCGPA: "3.9",
        image: "/assets/student5.jpg",
        classIds: [3, 5]
    },
    {
        id: 11,
        name: "Kevin White",
        rollNo: "55443322",
        section: "Section-I",
        subject: "Physics",
        totalCGPA: "4.1",
        image: "/assets/student1.jpg",
        classIds: [4, 5]
    },
    {
        id: 12,
        name: "Jessica Clark",
        rollNo: "88776655",
        section: "Section-II",
        subject: "Mathematics",
        totalCGPA: "4.3",
        image: "/assets/student2.jpg",
        classIds: [4, 6]
    },
    {
        id: 13,
        name: "Mark Thompson",
        rollNo: "11335577",
        section: "Section-III",
        subject: "ICS",
        totalCGPA: "3.6",
        image: "/assets/student3.jpg",
        classIds: [5, 6]
    },
    {
        id: 14,
        name: "Amy Rodriguez",
        rollNo: "99224466",
        section: "Section-I",
        subject: "Computer Science",
        totalCGPA: "4.2",
        image: "/assets/student4.jpg",
        classIds: [1, 5]
    },
    {
        id: 15,
        name: "James Miller",
        rollNo: "77553311",
        section: "Section-II",
        subject: "Physics",
        totalCGPA: "3.8",
        image: "/assets/student5.jpg",
        classIds: [1, 6]
    },
    {
        id: 16,
        name: "Sophie Turner",
        rollNo: "44667799",
        section: "Section-III",
        subject: "Mathematics",
        totalCGPA: "4.5",
        image: "/assets/student1.jpg",
        classIds: [2, 6]
    },
];

const StudentDetails = () => {
    // Get class ID from URL params
    const { id } = useParams();
    const navigate = useNavigate();

    // State variables
    const [classInfo, setClassInfo] = useState(null);
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredStudents, setFilteredStudents] = useState([]);

    // Get class information and filtered students based on class ID
    useEffect(() => {
        if (id && id !== 'total') {
            // If we have a specific class ID, filter students for that class
            const classId = parseInt(id);
            const currentClass = classesData.find(cls => cls.id === classId);
            setClassInfo(currentClass);

            // Filter students who are in this class
            const classStudents = allStudents.filter(student =>
                student.classIds && student.classIds.includes(classId)
            );

            setStudents(classStudents);
            setFilteredStudents(classStudents);
        } else {
            // If no specific class ID or 'total', show all students
            setClassInfo({ subject: "All Classes" });
            setStudents(allStudents);
            setFilteredStudents(allStudents);
        }
    }, [id]);

    // Handle search functionality
    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredStudents(students);
        } else {
            const filtered = students.filter(student =>
                student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                student.rollNo.includes(searchTerm)
            );
            setFilteredStudents(filtered);
        }
    }, [searchTerm, students]);

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Handle going back
    const handleBack = () => {
        navigate(-1);
    };

    // Navigate to add student page
    const navigateToAddStudent = () => {
        navigate('/add-student', { 
            state: { classId: parseInt(id), className: classInfo?.subject } 
        });
    };

    // Navigate to student profile
    const navigateToStudentProfile = (studentId) => {
        navigate(`/student-profile/${studentId}`, {
            state: { 
                classId: parseInt(id), 
                className: classInfo?.subject,
                fromClass: true
            }
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
                    <h5 className="mb-0" style={{ fontSize: '24px', fontWeight: '600', color: '#111827' }}>
                        Students In {classInfo?.subject || 'Loading...'} Section
                    </h5>
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
                        <div style={{ fontWeight: '500', fontSize: '14px', color: '#1F2937' }}>Mian Hamed Khalil</div>
                        <div style={{ fontSize: '12px', color: '#9CA3AF', fontWeight: '400' }}>{new Date().toLocaleDateString()}</div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="p-4">
                {/* Filters and Search */}
                <div className="d-flex justify-content-between align-items-center mb-4">
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
                        />
                        <span>All Students ({filteredStudents.length})</span>
                    </Button>

                    <div className="d-flex gap-3">
                        <div style={{
                            position: 'relative',
                            width: '240px'
                        }}>
                            <Form.Control
                                type="text"
                                placeholder="Search by name or roll number"
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
                            <span>+ Add Student</span>
                        </Button>
                    </div>
                </div>

                {/* Students Table */}
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
                                    Students
                                </th>
                                <th style={{
                                    fontSize: '16px',
                                    fontWeight: '500',
                                    color: '#111827',
                                    padding: '17px 16px'
                                }}>
                                    Roll no
                                </th>
                                <th style={{
                                     fontSize: '16px',
                                     fontWeight: '500',
                                     color: '#111827',
                                     padding: '17px 16px'
                                }}>
                                    Section
                                </th>
                                <th style={{
                                   fontSize: '16px',
                                   fontWeight: '500',
                                   color: '#111827',
                                   padding: '17px 16px'
                                }}>
                                    Subject
                                </th>
                                <th style={{
                                   fontSize: '16px',
                                   fontWeight: '500',
                                   color: '#111827',
                                   padding: '17px 16px'
                                }}>
                                    Total CGPA
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
                            {filteredStudents.map(student => (
                                <tr key={student.id}>
                                    <td style={{
                                        padding: '16px 16px',
                                        verticalAlign: 'middle'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{
                                                width: '36px',
                                                height: '36px',
                                                borderRadius: '50%',
                                                overflow: 'hidden',
                                                backgroundColor: '#F3F4F6'
                                            }}>
                                                <img
                                                    src={student.image}
                                                    alt={student.name}
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover'
                                                    }}
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'%3E%3C/path%3E%3Ccircle cx='12' cy='7' r='4'%3E%3C/circle%3E%3C/svg%3E";
                                                    }}
                                                />
                                            </div>
                                            <span style={{ fontSize: '14px', fontWeight:'500', color:'#101828' }}>{student.name}</span>
                                        </div>
                                    </td>
                                    <td style={{
                                        padding: '16px 16px',
                                        fontSize: '14px',
                                        fontWeight:'400',
                                        color:'#4B5563',
                                        verticalAlign: 'middle'
                                    }}>
                                        {student.rollNo}
                                    </td>
                                    <td style={{
                                        padding: '16px 16px',
                                        fontSize: '14px',
                                        fontWeight:'400',
                                        color:'#4B5563',
                                        verticalAlign: 'middle'
                                    }}>
                                        {student.section}
                                    </td>
                                    <td style={{
                                        padding: '16px 16px',
                                        fontSize: '14px',
                                        fontWeight:'400',
                                        color:'#4B5563',
                                        verticalAlign: 'middle'
                                    }}>
                                        {student.subject}
                                    </td>
                                    <td style={{
                                        padding: '16px 16px',
                                        fontSize: '18px',
                                        color: '#22C55E',
                                        fontWeight: '500',
                                        verticalAlign: 'middle'
                                    }}>
                                        {student.totalCGPA}
                                    </td>
                                    <td style={{
                                        padding: '16px 16px',
                                        verticalAlign: 'middle'
                                    }}>
                                        <Button
                                            variant="primary"
                                            onClick={() => navigateToStudentProfile(student.id)}
                                            style={{
                                                borderRadius: '100px',
                                                fontWeight: '500',
                                                fontSize: '14px',
                                                padding: '8px 20px',
                                                backgroundColor: '#9747FF',
                                                border: 'none',
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
                {filteredStudents.length === 0 && (
                    <div className="text-center py-5">
                        <p style={{ fontSize: '16px', color: '#6B7280' }}>
                            {searchTerm ? 'No students found matching your search.' : 'No students found for this class.'}
                        </p>
                    </div>
                )}
            </div>
        </Container>
    );
};

export default StudentDetails;