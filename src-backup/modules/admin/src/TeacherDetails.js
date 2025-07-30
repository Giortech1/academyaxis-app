import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Container, Form, Button, Table, Modal } from 'react-bootstrap';
import { UserContext } from './UserContext.js';

const TeacherDetails = () => {
    const { userData, sections } = useContext(UserContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const selectedData = location.state?.selectedData;

    const [sectionData, setSectionData] = useState(null);
    const [teachers, setTeachers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredTeachers, setFilteredTeachers] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState(null);

    useEffect(() => {
        setLoading(true);

        if (selectedData) {
            setSectionData(selectedData);
            if (selectedData.teachers) {
                setTeachers(selectedData.teachers);
                setFilteredTeachers(selectedData.teachers);
            }
        } else if (id && sections) {
            const section = sections.find(s => s.id === id);
            if (section) {
                setSectionData(section);
                if (section.teachers) {
                    setTeachers(section.teachers);
                    setFilteredTeachers(section.teachers);
                }
            }
        }

        setLoading(false);
    }, [selectedData, id, sections]);

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredTeachers(teachers);
        } else {
            const filtered = teachers.filter(teacher =>
                teacher.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                teacher.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                teacher.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                teacher.teacher_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                teacher.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                teacher.specialization?.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredTeachers(filtered);
        }
    }, [searchTerm, teachers]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleBack = () => {
        navigate(-1);
    };

    const handleDeleteModal = (teacher) => {
        setSelectedTeacher(teacher);
        setShowDeleteModal(true);
    };

    const handleDeleteTeacher = () => {
        const updatedTeachers = teachers.filter(teacher =>
            teacher.teacher_id !== selectedTeacher.teacher_id
        );

        setTeachers(updatedTeachers);
        setFilteredTeachers(updatedTeachers);
        setShowDeleteModal(false);
    };

    const formatTime = (startTime, endTime) => {
        if (!startTime || !endTime) return "N/A";
        return `${startTime} - ${endTime}`;
    };

    const formatDays = (days) => {
        if (!days || !Array.isArray(days)) return "N/A";
        return days.map(day => day.charAt(0).toUpperCase() + day.slice(1)).join(", ");
    };

    const getStatusStyle = (status) => {
        const baseStyle = { ...styles.statusBadge };
        switch (status?.toLowerCase()) {
            case 'active':
                return { ...baseStyle, ...styles.activeStatus };
            case 'in-progress':
                return { ...baseStyle, ...styles.inProgressStatus };
            case 'withdraw':
            case 'inactive':
                return { ...baseStyle, ...styles.withdrawStatus };
            default:
                return baseStyle;
        }
    };

    const formatSubjects = (subjects) => {
        if (!subjects || !Array.isArray(subjects)) return "N/A";
        return subjects.join(", ");
    };

    return (
        <Container fluid style={styles.container}>
            <div style={styles.header}>
                <div style={styles.headerLeft}>
                    <Button
                        variant="link"
                        className="p-0"
                        onClick={handleBack}
                        style={styles.backButton}
                    >
                        <img
                            src="/assets/arrow-left.png"
                            alt="Back"
                            style={styles.backIcon}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cline x1='19' y1='12' x2='5' y2='12'%3E%3C/line%3E%3Cpolyline points='12 19 5 12 12 5'%3E%3C/polyline%3E%3C/svg%3E";
                            }}
                        />
                    </Button>
                    <h5 style={styles.title}>
                        Teachers in {sectionData?.course?.name || 'Section'} - Section {sectionData?.section || 'A'}
                    </h5>
                </div>

                <div style={styles.userInfo}>
                    <img
                        src={userData?.profile_pic || "/assets/avatar.jpeg"}
                        alt="User"
                        style={styles.userImage}
                    />
                    <div style={{ marginRight: '10px' }}>
                        <div style={styles.userName}>
                            {userData?.first_name} {userData?.last_name}
                        </div>
                        <div style={styles.userId}>{userData?.admin_id}</div>
                    </div>
                </div>
            </div>

            {sectionData && (
                <div style={styles.sectionInfo}>
                    <div style={styles.sectionTitle}>Section Information</div>
                    <div style={styles.sectionDetails}>
                        <div style={styles.sectionDetail}>
                            <strong style={styles.sectionDetailValue}>Course:</strong> {sectionData.course?.name} ({sectionData.course?.code})
                        </div>
                        <div style={styles.sectionDetail}>
                            <strong style={styles.sectionDetailValue}>Section:</strong> {sectionData.section}
                        </div>
                        <div style={styles.sectionDetail}>
                            <strong style={styles.sectionDetailValue}>Room:</strong> {sectionData.room_no}
                        </div>
                        <div style={styles.sectionDetail}>
                            <strong style={styles.sectionDetailValue}>Schedule:</strong> {formatTime(sectionData.schedule?.start_time, sectionData.schedule?.end_time)}
                        </div>
                        <div style={styles.sectionDetail}>
                            <strong style={styles.sectionDetailValue}>Days:</strong> {formatDays(sectionData.schedule?.days)}
                        </div>
                        <div style={styles.sectionDetail}>
                            <strong style={styles.sectionDetailValue}>Status:</strong>
                            <span style={getStatusStyle(sectionData.status)}>{sectionData.status}</span>
                        </div>
                        <div style={styles.sectionDetail}>
                            <strong style={styles.sectionDetailValue}>Students:</strong> {sectionData.students ? sectionData.students.length : 0}/{sectionData.maxStrength}
                        </div>
                        <div style={styles.sectionDetail}>
                            <strong style={styles.sectionDetailValue}>Credit Hours:</strong> {sectionData.course?.credit_hours}
                        </div>
                    </div>
                </div>
            )}

            <div style={styles.mainContent}>
                <div style={styles.filtersSection}>
                    <Button
                        variant="dark"
                        style={styles.allTeachersButton}
                    >
                        <img
                            src="/assets/user.png"
                            alt="User Icon"
                            style={{ width: '16px', height: '16px' }}
                        />
                        <span>All Teachers ({filteredTeachers.length})</span>
                    </Button>

                    <div style={styles.filtersRight}>
                        <div style={styles.searchContainer}>
                            <Form.Control
                                type="text"
                                placeholder="Search teachers..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                                style={styles.searchInput}
                            />
                            <div style={styles.searchIcon}>
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
                            style={styles.addButton}
                        >
                            <span>+ Add Teacher</span>
                        </Button>
                    </div>
                </div>

                {loading ? (
                    <div style={styles.loadingState}>
                        <p>Loading teachers...</p>
                    </div>
                ) : (
                    <>
                        <div style={styles.tableContainer}>
                            <Table responsive hover style={styles.table}>
                                <thead style={styles.tableHeader}>
                                    <tr>
                                        <th style={styles.tableHeaderCell}>Teacher</th>
                                        <th style={styles.tableHeaderCell}>Teacher ID</th>
                                        <th style={styles.tableHeaderCell}>Email</th>
                                        <th style={styles.tableHeaderCell}>Phone</th>
                                        <th style={styles.tableHeaderCell}>Specialization</th>
                                        <th style={styles.tableHeaderCell}>Salary</th>
                                        <th style={styles.tableHeaderCell}>Status</th>
                                        <th style={styles.tableHeaderCell}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredTeachers.map(teacher => (
                                        <tr key={teacher.teacher_id}>
                                            <td style={styles.tableCell}>
                                                <div style={styles.teacherInfo}>
                                                    <div style={styles.teacherImage}>
                                                        <img
                                                            src={teacher.profile_pic || "/assets/avatar.jpeg"}
                                                            alt={teacher.full_name || teacher.first_name}
                                                            style={styles.teacherImageImg}
                                                            onError={(e) => {
                                                                e.target.onerror = null;
                                                                e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'%3E%3C/path%3E%3Ccircle cx='12' cy='7' r='4'%3E%3C/circle%3E%3C/svg%3E";
                                                            }}
                                                        />
                                                    </div>
                                                    <div>
                                                        <span style={styles.teacherName}>
                                                            {teacher.full_name || `${teacher.first_name} ${teacher.last_name}`}
                                                        </span>
                                                        <div style={{ fontSize: '12px', color: '#6B7280' }}>
                                                            {teacher.employment_type} • {teacher.teaching_expirience} years exp
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td style={{ ...styles.tableCell, ...styles.tableCellText }}>
                                                {teacher.teacher_id}
                                            </td>
                                            <td style={{ ...styles.tableCell, ...styles.tableCellText }}>
                                                {teacher.email || 'N/A'}
                                            </td>
                                            <td style={{ ...styles.tableCell, ...styles.tableCellText }}>
                                                {teacher.phone_no || 'N/A'}
                                            </td>
                                            <td style={{ ...styles.tableCell, ...styles.tableCellText }}>
                                                <div>
                                                    <div>{teacher.specialization || 'N/A'}</div>
                                                    <div style={{ fontSize: '12px', color: '#6B7280' }}>
                                                        {formatSubjects(teacher.subjects)}
                                                    </div>
                                                </div>
                                            </td>
                                            <td style={{ ...styles.tableCell, ...styles.salaryText }}>
                                                {teacher.salary ? `$${teacher.salary}` : 'N/A'}
                                            </td>
                                            <td style={styles.tableCell}>
                                                <span style={getStatusStyle(teacher.status)}>
                                                    {teacher.status || 'Active'}
                                                </span>
                                            </td>
                                            <td style={styles.tableCell}>
                                                <div style={styles.actionButtons}>
                                                    <Button
                                                        variant="link"
                                                        className="p-0"
                                                        style={styles.actionButton}
                                                    >
                                                        <img
                                                            src="/assets/edit.png"
                                                            alt="Edit"
                                                            style={styles.actionIcon}
                                                            onError={(e) => {
                                                                e.target.onerror = null;
                                                                e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='%234F46E5' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 20h9'%3E%3C/path%3E%3Cpath d='M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z'%3E%3C/path%3E%3C/svg%3E";
                                                            }}
                                                        />
                                                    </Button>
                                                    <Button
                                                        variant="link"
                                                        className="p-0"
                                                        onClick={() => handleDeleteModal(teacher)}
                                                        style={styles.actionButton}
                                                    >
                                                        <img
                                                            src="/assets/delete.png"
                                                            alt="Delete"
                                                            style={styles.actionIcon}
                                                            onError={(e) => {
                                                                e.target.onerror = null;
                                                                e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='%23F43F5E' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='3 6 5 6 21 6'%3E%3C/polyline%3E%3Cpath d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'%3E%3C/path%3E%3C/svg%3E";
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

                        {filteredTeachers.length === 0 && !loading && (
                            <div style={styles.emptyState}>
                                <p>No teachers found in this section.</p>
                            </div>
                        )}
                    </>
                )}
            </div>

            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete {selectedTeacher?.full_name || `${selectedTeacher?.first_name} ${selectedTeacher?.last_name}`}? This action cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button
                        variant="danger"
                        onClick={handleDeleteTeacher}
                    >
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

const styles = {
    container: {
        padding: '12px'
    },
    header: {
        backgroundColor: '#fff',
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerLeft: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
    },
    backButton: {
        color: '#000',
        padding: 0
    },
    backIcon: {
        width: '24px',
        height: '24px'
    },
    title: {
        fontSize: '24px',
        fontWeight: '600',
        color: '#111827',
        marginBottom: 0
    },
    userInfo: {
        display: 'flex',
        alignItems: 'center'
    },
    userImage: {
        borderRadius: '50%',
        width: '54px',
        height: '54px',
        marginRight: '10px'
    },
    userName: {
        fontWeight: '500',
        fontSize: '14px'
    },
    userId: {
        fontSize: '12px',
        color: '#6c757d'
    },
    mainContent: {
        padding: 0
    },
    filtersSection: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px'
    },
    allTeachersButton: {
        borderRadius: '8px',
        fontWeight: '600',
        fontSize: '14px',
        padding: '8px 16px',
        backgroundColor: '#101828',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    filtersRight: {
        display: 'flex',
        gap: '12px'
    },
    searchContainer: {
        position: 'relative',
        width: '240px'
    },
    searchInput: {
        borderRadius: '8px',
        border: '1px solid #EAECF0',
        padding: '8px 16px 8px 40px',
        fontSize: '14px'
    },
    searchIcon: {
        position: 'absolute',
        left: '16px',
        top: '45%',
        transform: 'translateY(-50%)',
        color: '#6B7280'
    },
    addButton: {
        borderRadius: '8px',
        fontWeight: '600',
        fontSize: '14px',
        padding: '8px 16px',
        backgroundColor: '#1F2937',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        border: 'none'
    },
    tableContainer: {
        borderRadius: '12px',
        border: '1px solid #EAECF0',
        overflow: 'hidden'
    },
    table: {
        marginBottom: 0
    },
    tableHeader: {
        backgroundColor: '#F9FAFB'
    },
    tableHeaderCell: {
        fontSize: '16px',
        fontWeight: '500',
        color: '#111827',
        padding: '17px 16px'
    },
    tableCell: {
        padding: '16px 16px',
        verticalAlign: 'middle'
    },
    teacherInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    teacherImage: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        overflow: 'hidden'
    },
    teacherImageImg: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    },
    teacherName: {
        fontSize: '14px',
        fontWeight: '500',
        color: '#101828'
    },
    tableCellText: {
        fontSize: '14px',
        fontWeight: '400',
        color: '#4B5563'
    },
    salaryText: {
        fontSize: '16px',
        color: '#059669',
        fontWeight: '500'
    },
    actionButtons: {
        display: 'flex',
        gap: '12px'
    },
    actionButton: {
        background: 'transparent',
        border: 'none',
        padding: 0
    },
    actionIcon: {
        width: '36px',
        height: '36px',
        border: '1px solid #EAECF0',
        borderRadius: '100px',
        padding: '6px'
    },
    loadingState: {
        textAlign: 'center',
        paddingTop: '40px',
        paddingBottom: '40px'
    },
    emptyState: {
        textAlign: 'center',
        paddingTop: '40px',
        paddingBottom: '40px'
    },
    statusBadge: {
        padding: '4px 12px',
        borderRadius: '16px',
        fontSize: '12px',
        fontWeight: '500',
        textTransform: 'capitalize'
    },
    activeStatus: {
        backgroundColor: '#DCFCE7',
        color: '#166534'
    },
    inProgressStatus: {
        backgroundColor: '#FEF3C7',
        color: '#92400E'
    },
    withdrawStatus: {
        backgroundColor: '#FEE2E2',
        color: '#991B1B'
    },
    sectionInfo: {
        backgroundColor: '#F8FAFC',
        padding: '16px',
        borderRadius: '8px',
        marginBottom: '20px',
        border: '1px solid #E2E8F0'
    },
    sectionTitle: {
        fontSize: '18px',
        fontWeight: '600',
        color: '#1E293B',
        marginBottom: '8px'
    },
    sectionDetails: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '12px'
    },
    sectionDetail: {
        fontSize: '14px',
        color: '#64748B'
    },
    sectionDetailValue: {
        fontWeight: '500',
        color: '#1E293B'
    }
};

export default TeacherDetails;