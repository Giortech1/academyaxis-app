import React, { useContext, useEffect, useState } from "react";
import { Form, Button, Image, Tab, Nav, Table } from "react-bootstrap";
import { UserContext } from "./UserContext";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateSection = () => {
    const { adminData, deptsData, fetchUsersByRole, createSection } = useContext(UserContext);
    const [programOptions, setProgramOptions] = useState([]);
    const [courseOptions, setCourseOptions] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [selectedProgram, setSelectedProgram] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [roomNo, setRoomNo] = useState("");
    const [teachers, setTeachers] = useState([]);
    const [section, setSection] = useState("");
    const [studentStrength, setStudentStrength] = useState("50");
    const [activeTab, setActiveTab] = useState("new");
    const [students, setStudents] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [selectedTeachers, setSelectedTeachers] = useState([]);
    const [selectedDays, setSelectedDays] = useState([]);
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const navigate = useNavigate();
    const daysOfWeek = [
        { value: 'monday', label: 'Monday' },
        { value: 'tuesday', label: 'Tuesday' },
        { value: 'wednesday', label: 'Wednesday' },
        { value: 'thursday', label: 'Thursday' },
        { value: 'friday', label: 'Friday' },
        { value: 'saturday', label: 'Saturday' },
        { value: 'sunday', label: 'Sunday' }
    ];

    useEffect(() => {
        const getTeachers = async () => {
            const response = await fetchUsersByRole('teacher');
            if (response?.success) {
                setTeachers(response?.data);
            }
        };

        const getStudents = async () => {
            const response = await fetchUsersByRole('student');
            if (response?.success) {
                setStudents(response?.data);
            }
        };

        getTeachers();
        getStudents();
    }, []);

    useEffect(() => {
        if (selectedDepartment) {
            setProgramOptions(selectedDepartment?.programs || []);
            setSelectedProgram(null);
            setCourseOptions([]);
            setSelectedCourse(null);
        } else {
            setProgramOptions([]);
        }
    }, [selectedDepartment]);


    useEffect(() => {
        if (selectedProgram && selectedProgram?.semesters) {
            const allCourses = selectedProgram.semesters.flatMap(
                semester => semester?.courses || []
            );
            setCourseOptions(allCourses);
            setSelectedCourse(null);
        }
    }, [selectedProgram]);

    const toggleTeacher = (teacher) => {
        const alreadySelected = selectedTeachers.some(
            (t) => t?.teacher_id === teacher?.teacher_id
        );

        if (alreadySelected) {
            setSelectedTeachers((prev) =>
                prev.filter((t) => t.teacher_id !== teacher.teacher_id)
            );
        } else {
            setSelectedTeachers((prev) => [...prev, teacher]);
        }
    };

    const toggleStudent = (student) => {
        const studentId = String(student?.student_id);

        const alreadySelected = selectedStudents.some(
            (s) => String(s?.student_id) === studentId
        );

        if (alreadySelected) {
            setSelectedStudents((prev) =>
                prev.filter((s) => String(s?.student_id) !== studentId)
            );
        } else {
            setSelectedStudents((prev) => [...prev, student]);
        }
    };

    const toggleDay = (dayValue) => {
        setSelectedDays(prev => {
            if (prev.includes(dayValue)) {
                return prev.filter(day => day !== dayValue);
            } else {
                return [...prev, dayValue];
            }
        });
    };

    const handleSave = async () => {
        if (!selectedDepartment) {
            return toast.error("Please select the department");
        } else if (!selectedProgram) {
            return toast.error("Please select the department");
        } else if (!selectedCourse) {
            return toast.error("Please select the department");
        } else if (!roomNo) {
            return toast.error("Please enter the room no");
        } else if (!section) {
            return toast.error("Please enter the section");
        }else if (!studentStrength) {
            return toast.error("Please enter the student strength");
        } else if (selectedStudents?.length === 0) {
            return toast.error("Please select at least one student");
        } else if (selectedTeachers?.length === 0) {
            return toast.error("Please select at least one teacher");
        } else if (selectedDays?.length === 0) {
            return toast.error("Please select at least one day");
        } else if (!startTime) {
            return toast.error("Please select start time");
        } else if (!endTime) {
            return toast.error("Please select end time");
        } else if (startTime >= endTime) {
            return toast.error("End time must be after start time");
        }

        const teacher_ids = selectedTeachers?.map(teacher => teacher.teacher_id);
        const student_ids = selectedStudents?.map(student => student.student_id);

        try {
            const response = await createSection({
                room_no: roomNo,
                department: {
                    code: selectedDepartment?.code,
                    name: selectedDepartment?.name,
                    id: selectedDepartment?.id,
                },
                program: {
                    code: selectedProgram?.code,
                    name: selectedProgram?.name,
                    id: selectedProgram?.program_id,
                },
                course:{
                    code: selectedCourse?.code,
                    name: selectedCourse?.name,
                    id: selectedCourse?.course_id,
                    semester: selectedCourse?.semester,
                    credit_hours: selectedCourse?.credit_hours,
                    type: selectedCourse?.type
                },
                section,
                teachers: selectedTeachers,
                student_ids,
                teacher_ids,
                schedule: {
                    days: selectedDays,
                    start_time: startTime,
                    end_time: endTime
                },
                maxStrength: studentStrength,
                createdAt: new Date().toISOString(),
                status: 'in-progress'
            }, selectedStudents);

            if (response?.success) {
                toast.success("Section created successfully!");
                navigate(-1);
            }
        } catch (error) {
            console.log('Error creating section: ', error);
        }
    };

    return (
        <div style={styles.container}>
            {/* Header Section */}
            <header className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-center">
                    <Image
                        src="/assets/arrow-left.png"
                        roundedCircle
                        width={24}
                        height={24}
                        className="me-2"
                        alt="Back Arrow"
                        style={styles.backButton}
                        onClick={() => navigate(-1)}
                    />
                    <h1 className="m-0" style={styles.mainTitle}>
                        Create Section
                    </h1>
                </div>
            </header>

            {/* Subheader */}
            <header style={styles.header}>
                {/* Left side: Heading */}
                <div style={styles.subHeaderText}>
                    Enter Information for creating a section.
                </div>
            </header>

            {/* Form Fields */}
            <div style={styles.formContainer}>
                {/* Department */}
                <Form.Group>
                    <Form.Label style={styles.formLabel}>
                        Department
                    </Form.Label>
                    <div style={styles.selectContainer}>
                        <Form.Select
                            value={selectedDepartment?.name || ""}
                            onChange={(e) => {
                                const dept = deptsData.find(d => d.name === e.target.value);
                                setSelectedDepartment(dept || null);
                            }}
                            style={styles.selectInput}
                        >
                            <option value="">Select Department</option>
                            {deptsData?.map((dept, index) => (
                                <option key={index} value={dept.name}>
                                    {dept?.name}
                                </option>
                            ))}
                        </Form.Select>
                    </div>
                </Form.Group>


                {/* Program */}
                <Form.Group>
                    <Form.Label style={styles.formLabel}>Program</Form.Label>
                    <div style={styles.selectContainer}>
                        <Form.Select
                            value={selectedProgram?.name || ""}
                            onChange={(e) => {
                                const program = programOptions.find(p => p.name === e.target.value);
                                setSelectedProgram(program || null);
                            }}
                            style={styles.selectInput}
                        >
                            <option value="">
                                {selectedDepartment ? 'Select Program' : 'Select department first'}
                            </option>
                            {programOptions?.map((prog, index) => (
                                <option key={index} value={prog.name}>
                                    {prog.name}
                                </option>
                            ))}
                        </Form.Select>
                    </div>
                </Form.Group>


                {/* Course */}
                <Form.Group>
                    <Form.Label style={styles.formLabel}>Course</Form.Label>
                    <div style={styles.selectContainer}>
                        <Form.Select
                            value={selectedCourse?.name || ""}
                            onChange={(e) => {
                                const course = courseOptions.find(c => c.name === e.target.value);
                                setSelectedCourse(course || null);
                            }}
                            style={styles.selectInput}
                        >
                            <option value="">
                                {selectedProgram ? 'Select Course' : 'Select department and program first'}
                            </option>
                            {courseOptions?.map((course, index) => (
                                <option key={index} value={course.name}>
                                    {course?.name} (Semester {course?.semester})
                                </option>
                            ))}
                        </Form.Select>
                    </div>
                </Form.Group>


                {/* Room No */}
                <Form.Group>
                    <Form.Label style={styles.formLabel}>
                        Select Room No
                    </Form.Label>
                    <div style={styles.selectContainer}>
                        <Form.Select
                            value={roomNo}
                            onChange={(e) => setRoomNo(e.target.value)}
                            style={styles.selectInput}
                        >
                            <option value="">Select</option>
                            {adminData?.rooms?.map((data, index) => (
                                <option key={index} value={data?.name}>
                                    {data?.name} - {data?.type}
                                </option>
                            ))}
                        </Form.Select>
                    </div>
                </Form.Group>

                {/* Section Name */}
                <Form.Group>
                    <Form.Label style={styles.formLabel}>
                        Section
                    </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Section"
                        value={section}
                        onChange={(e) => setSection(e.target.value)}
                        style={styles.textInput}
                    />
                </Form.Group>

                {/* Class Teacher */}
                <Form.Group>
                    <Form.Label style={styles.formLabel}>Class Teacher</Form.Label>
                    <div style={styles.teacherContainer}>
                        <div style={styles.teacherTags}>
                            {teachers?.map((teacher, index) => {
                                const isSelected = selectedTeachers.some(
                                    (t) => t.teacher_id === teacher?.teacher_id
                                );

                                return (
                                    <div
                                        key={index}
                                        style={{
                                            ...styles.teacherTag,
                                            backgroundColor: isSelected ? '#d1e7dd' : '#f8f9fa',
                                            border: isSelected ? '2px solid #0f5132' : '1px solid #ccc',
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => toggleTeacher(teacher)}
                                    >
                                        <span style={styles.teacherName}>
                                            {teacher?.first_name} {teacher?.last_name}
                                        </span>
                                        {isSelected && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleTeacher(teacher);
                                                }}
                                                style={styles.removeButton}
                                            >
                                                <span style={styles.removeButtonText}>×</span>
                                            </button>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </Form.Group>

                {/* Student Strength */}
                <Form.Group>
                    <Form.Label style={styles.formLabel}>
                        Student Strength
                    </Form.Label>
                    <div style={styles.selectContainer}>
                        <Form.Select
                            value={studentStrength}
                            onChange={(e) => setStudentStrength(e.target.value)}
                            style={styles.selectInput}
                        >
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="40">40</option>
                            <option value="50">50</option>
                            <option value="60">60</option>
                            <option value="70">70</option>
                        </Form.Select>
                    </div>
                </Form.Group>

                <div style={styles.timingSection}>
                    <h3 style={styles.timingSectionTitle}>Section Timing</h3>

                    {/* Days Selection */}
                    <Form.Group>
                        <Form.Label style={styles.formLabel}>Select Days</Form.Label>
                        <div style={styles.daysContainer}>
                            {daysOfWeek?.map((day) => {
                                const isSelected = selectedDays.includes(day.value);
                                return (
                                    <div
                                        key={day.value}
                                        style={{
                                            ...styles.dayTag,
                                            backgroundColor: isSelected ? '#000' : '#f8f9fa',
                                            color: isSelected ? '#fff' : '#111827',
                                            border: isSelected ? '2px solid #000' : '1px solid #ccc'
                                        }}
                                        onClick={() => toggleDay(day.value)}
                                    >
                                        {day.label}
                                    </div>
                                );
                            })}
                        </div>
                    </Form.Group>

                    {/* Time Selection */}
                    <div style={styles.timeInputsContainer}>
                        <Form.Group style={styles.timeInputGroup}>
                            <Form.Label style={styles.formLabel}>Start Time</Form.Label>
                            <Form.Control
                                type="time"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                style={styles.timeInput}
                            />
                        </Form.Group>

                        <Form.Group style={styles.timeInputGroup}>
                            <Form.Label style={styles.formLabel}>End Time</Form.Label>
                            <Form.Control
                                type="time"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                style={styles.timeInput}
                            />
                        </Form.Group>
                    </div>

                    {/* Selected Schedule Display */}
                    {selectedDays.length > 0 && startTime && endTime && (
                        <div style={styles.schedulePreview}>
                            <h4 style={styles.schedulePreviewTitle}>Schedule Preview:</h4>
                            <p style={styles.schedulePreviewText}>
                                {selectedDays?.map(day =>
                                    daysOfWeek.find(d => d.value === day)?.label
                                ).join(', ')} from {startTime} to {endTime}
                            </p>
                        </div>
                    )}
                </div>

                <div style={styles.studentsHeader}>
                    <h2 style={styles.studentsTitle}>Add Students</h2>
                    <span style={styles.studentsCount}>1/50</span>
                </div>

                {/* Add Students Section */}
                <div style={styles.studentsContainer}>
                    {/* Tabs */}
                    <div style={styles.tabsContainer}>
                        <Nav variant="tabs" style={styles.navTabs}>
                            <Nav.Item>
                                <Nav.Link
                                    active={activeTab === "new"}
                                    onClick={() => setActiveTab("new")}
                                    style={{
                                        ...styles.tabLink,
                                        ...(activeTab === "new" ? styles.activeTab : styles.inactiveTab)
                                    }}
                                >
                                    New Admissions
                                </Nav.Link>
                            </Nav.Item>

                            <Nav.Item>
                                <Nav.Link
                                    active={activeTab === "other"}
                                    onClick={() => setActiveTab("other")}
                                    style={{
                                        ...styles.tabLink,
                                        ...(activeTab === "other" ? styles.activeTab : styles.inactiveTab)
                                    }}
                                >
                                    Other Sections
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>

                    <div style={styles.tableContainer}>
                        {/* Table container with scrollable body */}
                        <div className="hide-scrollbar" style={styles.scrollableBody}>
                            <Table responsive borderless style={styles.table}>
                                <thead style={styles.tableHead}>
                                    <tr style={styles.tableHeaderRow}>
                                        <th style={{ ...styles.tableHeaderCellFirst, width: '8%' }}>Sr No.</th>
                                        <th style={{ ...styles.tableHeaderCell, width: '25%' }}>Students</th>
                                        <th style={{ ...styles.tableHeaderCell, width: '15%' }}>Roll No</th>
                                        <th style={{ ...styles.tableHeaderCell, width: '20%' }}>Programme</th>
                                        <th style={{ ...styles.tableHeaderCell, width: '15%' }}>Department</th>
                                        <th style={{ ...styles.tableHeaderCell, width: '17%' }}>Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {students?.map((student, index) => (
                                        <tr
                                            key={student?.student_id}
                                            style={{
                                                ...styles.tableRow,
                                                borderBottom: index !== students.length - 1 ? "1px solid #E5E7EB" : "none"
                                            }}
                                        >
                                            <td style={styles.tableCellFirst}>{index + 1}</td>
                                            <td>
                                                <div style={styles.studentInfo}>
                                                    <Image
                                                        src={student?.profile_pic}
                                                        roundedCircle
                                                        width={32}
                                                        height={32}
                                                        className="me-2"
                                                        alt={student?.full_name}
                                                        style={styles.studentImage}
                                                    />
                                                    {student?.full_name}
                                                </div>
                                            </td>
                                            <td style={styles.tableCell}>{student?.student_id}</td>
                                            <td style={styles.tableCell}>{student?.program?.name}</td>
                                            <td style={styles.tableCell}>{student?.department?.name}</td>
                                            <td>
                                                <Button
                                                    style={{
                                                        ...styles.addButton,
                                                        ...(selectedStudents.some(
                                                            (s) => s.student_id === student?.student_id)
                                                            ? styles.addButtonAdded
                                                            : styles.addButtonActive)
                                                    }}
                                                    onClick={() => toggleStudent(student)}
                                                >
                                                    {selectedStudents.some(
                                                        (s) => s.student_id === student?.student_id
                                                    ) ? "Added" : "+ Add"}
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </div>

                    {/* Footer Buttons */}
                    <div style={styles.footerButtons}>
                        <Button
                            style={styles.discardButton}
                            onClick={() => setSelectedStudents([])}
                        >
                            Discard
                        </Button>
                        <Button
                            style={styles.saveButton}
                            onClick={handleSave}
                        >
                            Save
                        </Button>
                    </div>

                    <style jsx>{`
                        .hide-scrollbar {
                            overflow-y: auto;
                            scrollbar-width: none; /* Firefox */
                            -ms-overflow-style: none; /* IE 10+ */
                        }

                        .hide-scrollbar::-webkit-scrollbar {
                            display: none; /* Chrome, Safari and Opera */
                        }
                    `}</style>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

const styles = {
    container: {
        padding: "20px",
        fontFamily: "Inter, sans-serif"
    },

    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px"
    },

    backButton: {
        cursor: "pointer"
    },

    mainTitle: {
        fontSize: "24px",
        fontWeight: "600"
    },

    subHeaderText: {
        fontSize: "18px",
        fontWeight: "600",
        color: "#111827"
    },

    departmentSelect: {
        border: "1px solid #EAECF0",
        borderRadius: "8px",
        padding: "10px 12px",
        backgroundColor: "white",
        cursor: "pointer"
    },

    departmentSelectInput: {
        border: "none",
        fontWeight: 500,
        fontSize: "14px",
        color: "#111827",
        backgroundColor: "transparent",
        outline: "none",
        width: "100%"
    },

    formContainer: {
        display: "flex",
        flexDirection: "column",
        gap: "24px"
    },

    formLabel: {
        fontSize: "14px",
        fontWeight: "500",
        color: "#000",
        paddingBottom: "10px"
    },

    selectContainer: {
        position: "relative",
        width: "50%"
    },

    selectInput: {
        borderRadius: "12px",
        fontSize: "14px",
        color: "#475467",
        fontWeight: '400',
        padding: "10px",
        border: "1px solid #EAECF0",
        appearance: "none"
    },

    textInput: {
        borderRadius: "12px",
        fontSize: "14px",
        color: "#475467",
        padding: "10px",
        border: "1px solid #EAECF0",
        width: '50%'
    },

    teacherContainer: {
        width: "50%",
        padding: "10px",
        border: "1px solid #EAECF0",
        borderRadius: "12px",
        minHeight: "64px",
        height: '15vh'
    },

    teacherTags: {
        display: "flex",
        flexWrap: "wrap",
        gap: "8px"
    },

    teacherTag: {
        display: "flex",
        alignItems: "center",
        backgroundColor: "#F3EAFF",
        color: "#101828",
        borderRadius: "100px",
        padding: "4px 12px",
        fontSize: '12px',
        fontWeight: '500'
    },

    teacherName: {
        fontSize: "14px"
    },

    removeButton: {
        marginLeft: "8px",
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "0",
        display: "flex",
        alignItems: "center"
    },

    removeButtonText: {
        fontSize: "16px"
    },

    timingSection: {
        padding: "20px",
        border: "1px solid #EAECF0",
        borderRadius: "12px",
    },

    timingSectionTitle: {
        fontSize: "18px",
        fontWeight: "600",
        color: "#111827",
        marginBottom: "16px"
    },

    daysContainer: {
        display: "flex",
        flexWrap: "wrap",
        gap: "8px",
        marginBottom: "20px"
    },

    dayTag: {
        padding: "8px 16px",
        borderRadius: "8px",
        fontSize: "14px",
        fontWeight: "500",
        cursor: "pointer",
        transition: "all 0.2s ease",
        userSelect: "none"
    },

    timeInputsContainer: {
        display: "flex",
        gap: "20px",
        marginBottom: "16px"
    },

    timeInputGroup: {
        flex: 1,
        maxWidth: "200px"
    },

    timeInput: {
        borderRadius: "8px",
        fontSize: "14px",
        color: "#475467",
        padding: "10px",
        border: "1px solid #EAECF0"
    },

    schedulePreview: {
        marginTop: "16px",
        padding: "12px",
        backgroundColor: "#e0f2fe",
        borderRadius: "8px",
        border: "1px solid #0891b2"
    },

    schedulePreviewTitle: {
        fontSize: "14px",
        fontWeight: "600",
        color: "#0f172a",
        margin: "0 0 4px 0"
    },

    schedulePreviewText: {
        fontSize: "14px",
        color: "#475569",
        margin: 0
    },


    studentsHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "0px"
    },

    studentsTitle: {
        fontSize: "24px",
        fontWeight: "500",
        color: "#000",
        margin: 0
    },

    studentsCount: {
        color: "#475467",
        fontSize: "14px",
        fontWeight: '500'
    },

    studentsContainer: {
        marginTop: "10px",
        border: '1px solid #EAECF0',
        borderRadius: '12px',
        padding: '15px'
    },

    tabsContainer: {
        marginBottom: "16px"
    },

    navTabs: {
        border: "none",
        gap: "15px"
    },

    tabLink: {
        border: "1px solid #EAECF0",
        borderRadius: "8px",
        fontSize: "14px",
        fontWeight: "600",
        padding: "8px 16px"
    },

    activeTab: {
        backgroundColor: "#000",
        color: "#fff"
    },

    inactiveTab: {
        backgroundColor: "transparent",
        color: "#111827"
    },

    tableContainer: {
        border: 'none',
        borderRadius: '8px',
        overflow: 'hidden',
        maxHeight: '70vh'
    },

    scrollableBody: {
        maxHeight: 'calc(70vh - 45px)',
        overflowY: 'auto'
    },

    table: {
        fontSize: "14px",
        marginBottom: 0
    },

    tableHead: {
        backgroundColor: "#F9FAFB",
        position: "sticky",
        top: 0,
        zIndex: 2
    },

    tableHeaderRow: {
        color: "#111827",
        fontWeight: "500",
        fontSize: '14px',
        borderBottom: "1px solid #E5E7EB"
    },

    tableHeaderCell: {
        fontSize: '14px',
        fontWeight: '500',
        color: '#111827'
    },

    tableHeaderCellFirst: {
        fontSize: '14px',
        fontWeight: '500',
        color: '#111827',
        paddingLeft: 0
    },

    tableRow: {
        verticalAlign: "middle"
    },

    tableCellFirst: {
        paddingLeft: 0,
        fontSize: '14px',
        fontWeight: '400',
        color: '#4B5563'
    },

    studentInfo: {
        display: "flex",
        alignItems: "center",
        fontSize: '12px',
        fontWeight: '500',
        color: '#101828'
    },

    studentImage: {
        objectFit: "cover"
    },

    tableCell: {
        fontSize: '14px',
        fontWeight: '400',
        color: '#4B5563'
    },

    addButton: {
        borderRadius: "8px",
        fontSize: "14px",
        padding: "6px 12px",
        fontWeight: "400"
    },

    addButtonActive: {
        backgroundColor: "#111827",
        border: "none",
        color: "#FFFFFF"
    },

    addButtonAdded: {
        backgroundColor: "#98A2B3",
        border: "1px solid #98A2B3",
        color: "#fff"
    },

    footerButtons: {
        display: "flex",
        justifyContent: "flex-end",
        gap: "12px",
        marginTop: "24px"
    },

    discardButton: {
        backgroundColor: "#F9FAFB",
        color: "#111827",
        border: "1px solid #D1D5DB",
        borderRadius: "8px",
        padding: "8px 16px",
        fontWeight: "500"
    },

    saveButton: {
        backgroundColor: "#111827",
        color: "#FFFFFF",
        border: "none",
        borderRadius: "8px",
        padding: "8px 16px",
        fontWeight: "500"
    }
};

export default CreateSection;