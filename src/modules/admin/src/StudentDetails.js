import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Table, Modal } from 'react-bootstrap';
import { UserContext } from './UserContext.js';


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

// Mock student data
const allStudents = [
    {
        id: 1,
        name: "Demo Name",
        rollNo: "12345678",
        section: "Section-II",
        subject: "ICS",
        totalCGPA: "4.3",
        image: "/assets/student1.jpg",
        classIds: [1, 3, 5]
    },
    {
        id: 2,
        name: "Demo Name",
        rollNo: "12345678",
        section: "Section-II",
        subject: "ICS",
        totalCGPA: "4.3",
        image: "/assets/student2.jpg",
        classIds: [1, 2]
    },
    {
        id: 3,
        name: "Demo Name",
        rollNo: "12345678",
        section: "Section-II",
        subject: "ICS",
        totalCGPA: "4.3",
        image: "/assets/student3.jpg",
        classIds: [1, 4]
    },
    {
        id: 4,
        name: "Demo Name",
        rollNo: "12345678",
        section: "Section-II",
        subject: "ICS",
        totalCGPA: "4.3",
        image: "/assets/student4.jpg",
        classIds: [1, 6]
    },
    {
        id: 5,
        name: "Demo Name",
        rollNo: "12345678",
        section: "Section-II",
        subject: "ICS",
        totalCGPA: "4.3",
        image: "/assets/student5.jpg",
        classIds: [2, 3]
    },
    {
        id: 6,
        name: "Demo Name",
        rollNo: "12345678",
        section: "Section-II",
        subject: "ICS",
        totalCGPA: "4.3",
        image: "/assets/student1.jpg",
        classIds: [2, 5]
    },
    {
        id: 7,
        name: "Demo Name",
        rollNo: "12345678",
        section: "Section-II",
        subject: "ICS",
        totalCGPA: "4.3",
        image: "/assets/student2.jpg",
        classIds: [2, 4]
    },
    {
        id: 8,
        name: "Demo Name",
        rollNo: "12345678",
        section: "Section-II",
        subject: "ICS",
        totalCGPA: "4.3",
        image: "/assets/student3.jpg",
        classIds: [3, 4]
    },
    {
        id: 9,
        name: "Demo Name",
        rollNo: "12345678",
        section: "Section-II",
        subject: "ICS",
        totalCGPA: "4.3",
        image: "/assets/student4.jpg",
        classIds: [3, 6]
    },
    {
        id: 10,
        name: "Demo Name",
        rollNo: "12345678",
        section: "Section-II",
        subject: "ICS",
        totalCGPA: "4.3",
        image: "/assets/student5.jpg",
        classIds: [3, 5]
    },
    {
        id: 11,
        name: "Demo Name",
        rollNo: "12345678",
        section: "Section-II",
        subject: "ICS",
        totalCGPA: "4.3",
        image: "/assets/student1.jpg",
        classIds: [4, 5]
    },
    {
        id: 12,
        name: "Demo Name",
        rollNo: "12345678",
        section: "Section-II",
        subject: "ICS",
        totalCGPA: "4.3",
        image: "/assets/student2.jpg",
        classIds: [4, 6]
    },
    {
        id: 13,
        name: "Demo Name",
        rollNo: "12345678",
        section: "Section-II",
        subject: "ICS",
        totalCGPA: "4.3",
        image: "/assets/student3.jpg",
        classIds: [5, 6]
    },
    {
        id: 14,
        name: "Demo Name",
        rollNo: "12345678",
        section: "Section-II",
        subject: "ICS",
        totalCGPA: "4.3",
        image: "/assets/student4.jpg",
        classIds: [1, 5]
    },
    {
        id: 15,
        name: "Demo Name",
        rollNo: "12345678",
        section: "Section-II",
        subject: "ICS",
        totalCGPA: "4.3",
        image: "/assets/student5.jpg",
        classIds: [1, 6]
    },
    {
        id: 16,
        name: "Demo Name",
        rollNo: "12345678",
        section: "Section-II",
        subject: "ICS",
        totalCGPA: "4.3",
        image: "/assets/student1.jpg",
        classIds: [2, 6]
    },
];

const StudentDetails = () => {
            const { userData } = useContext(UserContext);

    // Get class ID from URL params
    const { id } = useParams();
    const navigate = useNavigate();

    // State variables
    const [classInfo, setClassInfo] = useState(null);
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    // State for modals
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        rollNo: '',
        section: 'Section-II',
        subject: 'ICS',
        totalCGPA: ''
    });

    // Get class information and filtered students based on class ID
    useEffect(() => {
        setLoading(true);

        // Find the class info
        const classId = parseInt(id);
        const currentClass = classesData.find(cls => cls.id === classId);
        setClassInfo(currentClass);

        // Filter students who are in this class
        const classStudents = allStudents.filter(student =>
            student.classIds && student.classIds.includes(classId)
        );

        setStudents(classStudents);
        setFilteredStudents(classStudents);
        setLoading(false);
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

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle add student modal
    const handleAddModal = () => {
        setFormData({
            name: '',
            rollNo: '',
            section: 'Section-II',
            subject: 'ICS',
            totalCGPA: ''
        });
        setShowAddModal(true);
    };

    // Handle edit student
    const handleEditModal = (student) => {
        setSelectedStudent(student);
        setFormData({
            name: student.name,
            rollNo: student.rollNo,
            section: student.section,
            subject: student.subject,
            totalCGPA: student.totalCGPA
        });
        setShowEditModal(true);
    };

    // Handle delete student
    const handleDeleteModal = (student) => {
        setSelectedStudent(student);
        setShowDeleteModal(true);
    };

    // Add student submit
    const handleAddStudent = () => {
        // Normally this would make an API call to add the student
        // For this example, we'll update our local state
        const newStudent = {
            id: Math.max(...students.map(s => s.id)) + 1,
            ...formData,
            image: "/assets/student1.jpg",  // Default image
            classIds: [parseInt(id)]  // Add to current class
        };

        const updatedStudents = [...students, newStudent];
        setStudents(updatedStudents);
        setFilteredStudents(updatedStudents);
        setShowAddModal(false);
    };

    // Edit student submit
    const handleEditStudent = () => {
        // Normally this would make an API call to update the student
        // For this example, we'll update our local state
        const updatedStudents = students.map(student =>
            student.id === selectedStudent.id
                ? { ...student, ...formData }
                : student
        );

        setStudents(updatedStudents);
        setFilteredStudents(updatedStudents);
        setShowEditModal(false);
    };

    // Delete student submit
    const handleDeleteStudent = () => {
        // Normally this would make an API call to delete the student
        // For this example, we'll update our local state
        const updatedStudents = students.filter(student =>
            student.id !== selectedStudent.id
        );

        setStudents(updatedStudents);
        setFilteredStudents(updatedStudents);
        setShowDeleteModal(false);
    };

    return (
        <Container fluid className="p-3">
            {/* Header */}
            <div style={{
                backgroundColor: '#fff',
                marginBottom:'20px',
              
                // borderBottom: '1px solid #EAECF0',
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
                    <h5 className="mb-0" style={{ fontSize: '24px', fontWeight: '600', color: '#111827' }}>Students In {classInfo?.subject || 'Demo'} Section</h5>
                </div>

                <div id='user-info' style={{ display: 'flex', alignItems: 'center' }}>
                        {/* User Info */}
                        <img
                            id='info-img'
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
                            <div style={{ fontWeight: '500', fontSize: '14' }}>{userData?.first_name} {userData?.last_name}</div>
                            <div style={{ fontSize: '12px', color: '#6c757d' }}>{userData?.user_id}</div>
                        </div>

                    </div>
            </div>

            {/* Main Content */}
            <div className="p-0">
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
                        <span>All Students</span>
                    </Button>


                    <div className="d-flex gap-3">
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
                            onClick={handleAddModal}
                        >
                            <span>+ Add Student</span>
                        </Button>
                    </div>
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="text-center py-5">
                        <p>Loading students...</p>
                    </div>
                ) : (
                    <>
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
                                                        overflow: 'hidden'
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
                                                                e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'%3E%3C/path%3E%3Ccircle cx='12' cy='7' r='4'%3E%3C/circle%3E%3C/svg%3E";
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
                                                <div style={{ display: 'flex', gap: '12px' }}>
                                                    <Button
                                                        variant="link"
                                                        className="p-0"
                                                        onClick={() => handleDeleteModal(student)}
                                                        style={{
                                                            background: 'transparent',
                                                            border: 'none',
                                                            padding: 0
                                                        }}
                                                    >
                                                        <img
                                                            src="/assets/delete.png"
                                                            alt="Delete"
                                                            style={{ width: '36px', height: '36px', border:'1px solid #EAECF0', borderRadius:'100px',padding:'6px' }}
                                                            onError={(e) => {
                                                                e.target.onerror = null;
                                                                e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='%23F43F5E' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='3 6 5 6 21 6'%3E%3C/polyline%3E%3Cpath d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'%3E%3C/path%3E%3C/svg%3E";
                                                            }}
                                                        />
                                                    </Button>
                                                    <Button
                                                        variant="link"
                                                        className="p-0"
                                                        onClick={() => handleEditModal(student)}
                                                        style={{
                                                            background: 'transparent',
                                                            border: 'none',
                                                            padding: 0
                                                        }}
                                                    >
                                                        <img
                                                            src="/assets/edit.png"
                                                            alt="Edit"
                                                            style={{ width: '36px', height: '36px', border:'1px solid #EAECF0', borderRadius:'100px',padding:'6px' }}
                                                            onError={(e) => {
                                                                e.target.onerror = null;
                                                                e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='%234F46E5' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 20h9'%3E%3C/path%3E%3Cpath d='M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z'%3E%3C/path%3E%3C/svg%3E";
                                                            }}
                                                        />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>

                        {/* Empty State */}
                        {filteredStudents.length === 0 && !loading && (
                            <div className="text-center py-5">
                                <p>No students found for this class.</p>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Add Student Modal */}
            <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Student</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Enter student name"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Roll Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="rollNo"
                                value={formData.rollNo}
                                onChange={handleInputChange}
                                placeholder="Enter roll number"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Section</Form.Label>
                            <Form.Control
                                type="text"
                                name="section"
                                value={formData.section}
                                onChange={handleInputChange}
                                placeholder="Enter section"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Subject</Form.Label>
                            <Form.Control
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleInputChange}
                                placeholder="Enter subject"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>CGPA</Form.Label>
                            <Form.Control
                                type="text"
                                name="totalCGPA"
                                value={formData.totalCGPA}
                                onChange={handleInputChange}
                                placeholder="Enter CGPA"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddModal(false)}>
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleAddStudent}
                        style={{ backgroundColor: '#4F46E5', border: 'none' }}
                    >
                        Add Student
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Edit Student Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Student</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Enter student name"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Roll Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="rollNo"
                                value={formData.rollNo}
                                onChange={handleInputChange}
                                placeholder="Enter roll number"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Section</Form.Label>
                            <Form.Control
                                type="text"
                                name="section"
                                value={formData.section}
                                onChange={handleInputChange}
                                placeholder="Enter section"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Subject</Form.Label>
                            <Form.Control
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleInputChange}
                                placeholder="Enter subject"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>CGPA</Form.Label>
                            <Form.Control
                                type="text"
                                name="totalCGPA"
                                value={formData.totalCGPA}
                                onChange={handleInputChange}
                                placeholder="Enter CGPA"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleEditStudent}
                        style={{ backgroundColor: '#4F46E5', border: 'none' }}
                    >
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this student? This action cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button
                        variant="danger"
                        onClick={handleDeleteStudent}
                    >
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default StudentDetails;