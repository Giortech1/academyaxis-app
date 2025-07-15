import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import { ToastContainer, toast } from 'react-toastify';

const CourseManagement = () => {
    const { userData, deptsData, deleteCourse, refreshDeptsData } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state;
    const [program, setProgram] = useState([]);
    const [courses, setCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (deptsData) {
            const department = deptsData.find(dept => dept.id === data?.department_id);

            if (department) {
                const programIndex = department?.programs.findIndex(p => p.program_id === data?.program_id);
                const programData = department?.programs[programIndex];

                if (programData) {
                    programData.department_id = department?.id;
                    programData.department = department?.name;
                }

                setProgram(programData);


                const allCourses = [];

                const semesters = programData?.semesters || [];
                semesters.forEach(semester => {
                    const courses = semester.courses || [];
                    courses.forEach(course => {
                        allCourses.push({
                            ...course,
                            program: programData?.name || '',
                            department: programData?.department || ''
                        });
                    });
                });

                setCourses(allCourses);

            }
        }
    }, [deptsData]);

    const handleDelete = async (course) => {
        try {
            const result = await deleteCourse(
                program?.department_id,
                program?.program_id,
                course?.semester,
                course?.course_id,
            );

            if (result?.success) {
                await refreshDeptsData();
                toast.success("Course deleted successfully!");
            } else {
                toast.error(result?.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const filteredCourses = courses.filter(course =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={styles.container}>
            {/* Header */}
            <header style={styles.header}>
                <div style={styles.headerLeft}>
                    <img
                        src="/assets/arrow-left.png"
                        alt="Back Arrow"
                        style={styles.backArrow}
                        onClick={() => navigate(-1)}
                    />
                    <h4 style={styles.headerTitle}>Courses</h4>
                </div>
                <div style={styles.headerRight}>
                    <img
                        src="/assets/avatar.jpeg"
                        alt="Profile"
                        style={styles.profileImage}
                    />
                    <div>
                        <div style={styles.profileName}>
                            {userData?.full_name}
                        </div>
                        <div style={styles.profileId}>
                            {userData?.user_id}
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div>
                {/* Program Title */}
                <div style={styles.programHeader}>
                    <h2 style={styles.programTitle}>
                        {program?.name}
                    </h2>
                    <button onClick={() => navigate('/add-course', { state: program })} style={styles.addCourseButton}>
                        <span style={styles.addCourseIcon}>+</span>
                        Add Course
                    </button>
                </div>

                {/* Top Section */}
                <div style={styles.topSection}>
                    {/* Total Courses Card */}
                    <div style={styles.statsCard}>
                        <div style={styles.statsCardHeader}>
                            <img
                                src="/assets/building.png"
                                alt="Courses"
                                style={styles.statsCardIcon}
                            />
                            <span style={styles.statsCardText}>Total Courses</span>
                        </div>
                        <div style={styles.statsCardNumber}>{courses?.length}</div>
                    </div>

                    {/* Right Controls */}
                    <div style={styles.controls}>
                        {/* Search */}
                        <div style={styles.searchContainer}>
                            <img
                                src="/assets/search-lg.png"
                                alt="Search"
                                style={styles.searchIcon}
                            />
                            <input
                                type="text"
                                placeholder="Search Courses"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={styles.searchInput}
                            />
                        </div>

                        {/* Sort */}
                        <button style={styles.sortButton}>
                            <img
                                src="/assets/filter-lines.png"
                                alt="Sort"
                                style={styles.sortIcon}
                            />
                            Sort
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div style={styles.tableContainer}>
                    {/* Table Header */}
                    <div style={styles.tableHeader}>
                        <div>Course Name</div>
                        <div>Course Code</div>
                        <div>Program</div>
                        <div>Credit hour</div>
                        <div>Semester</div>
                        <div>Status</div>
                        <div>Action</div>
                    </div>

                    {/* Table Body */}
                    {filteredCourses.map((course, index) => (
                        <div
                            key={course?.code}
                            style={{
                                ...styles.tableRow,
                                borderBottom: index < filteredCourses.length - 1 ? '1px solid #EAECF0' : 'none'
                            }}
                        >
                            <div style={styles.cellPrimary}>
                                {course?.name}
                            </div>
                            <div style={styles.cellSecondary}>
                                {course?.code}
                            </div>
                            <div style={styles.cellSecondary}>
                                {course?.program}
                            </div>
                            <div style={styles.cellSecondary}>
                                {course?.credit_hours}
                            </div>
                            <div style={styles.cellSecondary}>
                                {course?.semester}
                            </div>
                            <div>
                                <span style={styles.statusBadge}>
                                    <span style={{
                                        ...styles.statusDot,
                                        backgroundColor: course.status === 'Active' ? '#10B981' : '#EF4444'
                                    }}></span>
                                    {course?.status}
                                </span>
                            </div>
                            <div style={styles.actionContainer}>
                                <button
                                    onClick={() => navigate('/add-course', { state: { program, course } })}
                                    style={styles.actionButton}
                                >
                                    <img
                                        src="/assets/edit.png"
                                        alt="Edit"
                                        style={styles.actionIcon}
                                    />
                                </button>
                                <button
                                    onClick={() => handleDelete(course)}
                                    style={styles.actionButton}
                                >
                                    <img
                                        src="/assets/delete.png"
                                        alt="Delete"
                                        style={styles.actionIcon}
                                    />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

const styles = {
    // Main Container
    container: {
        minHeight: '100vh',
        padding: '15px',
    },

    // Header Styles
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px'
    },
    headerLeft: {
        display: 'flex',
        alignItems: 'center',
        fontSize: '24px',
        fontWeight: '600'
    },
    backArrow: {
        width: '24px',
        height: '24px',
        cursor: 'pointer',
        marginRight: '8px',
        borderRadius: '50%'
    },
    headerTitle: {
        fontWeight: 'bold',
        margin: '0'
    },
    headerRight: {
        display: 'flex',
        alignItems: 'center'
    },
    profileImage: {
        width: '54px',
        height: '54px',
        borderRadius: '50%',
        marginRight: '8px'
    },
    profileName: {
        fontSize: '14px',
        fontWeight: '500',
        color: '#1F2937'
    },
    profileId: {
        fontSize: '12px',
        color: '#9CA3AF',
        fontWeight: '400'
    },

    // Program Header
    programHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '15px 0px',
        alignItems: 'center'
    },
    programTitle: {
        fontSize: '24px',
        fontWeight: '500',
        color: '#000',
    },
    addCourseButton: {
        backgroundColor: '#1F2937',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        padding: '10px 16px',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    addCourseIcon: {
        fontSize: '18px'
    },

    // Top Section
    topSection: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: '32px',
        gap: '32px'
    },

    // Stats Card
    statsCard: {
        background: '#8B5CF6',
        borderRadius: '16px',
        padding: '24px',
        color: 'white',
        width: '200px',
        height: '140px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    statsCardHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    statsCardIcon: {
        width: '20px',
        height: '20px'
    },
    statsCardText: {
        fontSize: '14px',
        fontWeight: '500'
    },
    statsCardNumber: {
        fontSize: '64px',
        fontWeight: '500',
        lineHeight: '1'
    },

    // Controls Section
    controls: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        flex: '1',
        justifyContent: 'flex-end'
    },

    // Search
    searchContainer: {
        position: 'relative'
    },
    searchIcon: {
        position: 'absolute',
        left: '16px',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '16px',
        height: '16px',
        opacity: '0.5'
    },
    searchInput: {
        padding: '10px 16px 10px 48px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        fontSize: '16px',
        width: '240px',
        outline: 'none',
        backgroundColor: 'white'
    },

    // Sort Button
    sortButton: {
        padding: '10px 10px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: 'white',
        cursor: 'pointer',
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontWeight: '600',
        color: '#374151'
    },
    sortIcon: {
        width: '16px',
        height: '16px'
    },

    // Table Container
    tableContainer: {
        backgroundColor: 'white',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid #EAECF0'
    },

    // Table Header
    tableHeader: {
        display: 'grid',
        gridTemplateColumns: '2.5fr 1fr 2.5fr 1fr 1.5fr 1fr 1fr',
        gap: '20px',
        padding: '20px 24px',
        borderBottom: '1px solid #EAECF0',
        fontSize: '16px',
        fontWeight: '500',
        color: '#111827'
    },

    // Table Row
    tableRow: {
        display: 'grid',
        gridTemplateColumns: '2.5fr 1fr 2.5fr 1fr 1.5fr 1fr 1fr',
        gap: '20px',
        padding: '15px 24px',
        fontSize: '14px',
        alignItems: 'center'
    },

    // Table Cells
    cellPrimary: {
        fontWeight: '500',
        color: '#101828',
        fontSize: '12px'
    },
    cellSecondary: {
        color: '#4B5563',
        fontWeight: '400',
        fontSize: '12px'
    },

    // Status Badge
    statusBadge: {
        padding: '6px 12px',
        borderRadius: '20px',
        fontSize: '14px',
        fontWeight: '500',
        backgroundColor: 'none',
        color: '#1C222E',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px'
    },
    statusDot: {
        width: '8px',
        height: '8px',
        borderRadius: '50%'
    },

    // Action Buttons
    actionContainer: {
        display: 'flex',
        gap: '12px'
    },
    actionButton: {
        background: 'none',
        border: '1px solid #EAECF0',
        cursor: 'pointer',
        padding: '6px',
        borderRadius: '100px'
    },
    actionIcon: {
        width: '20px',
        height: '20px'
    },
};

export default CourseManagement;