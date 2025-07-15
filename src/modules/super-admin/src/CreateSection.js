import React, { useState } from "react";
import { Form, Button, Image, Tab, Nav, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const TeacherCreateSection = () => {
        const navigate = useNavigate();

    // State Management
    const [roomNo, setRoomNo] = useState("ICS");
    const [day, setDay] = useState("Monday");
    const [semester, setSemester] = useState("Semester");
    const [courseName, setCourseName] = useState("");
    const [startTime, setStartTime] = useState("12:00 PM");
    const [endTime, setEndTime] = useState("04:00 PM");
    const [studentStrength, setStudentStrength] = useState("50");
    const [department, setDepartment] = useState("Department of Computer Science");
    const [teachers, setTeachers] = useState([
        "Arsalan Mushtaq"
    ]);

    // State for the active tab
    const [activeTab, setActiveTab] = useState("new");

    const [students] = useState([
        { id: 1, name: "Alice Johnson", rollNo: "12345675", program: "BSCS", section: "A" },
        { id: 2, name: "Bob Smith", rollNo: "2345766", program: "BSCS", section: "B" },
        { id: 3, name: "Carol Davis", rollNo: "3456789", program: "BSCS", section: "A" },
        { id: 4, name: "Dave Wilson", rollNo: "45678901", program: "BSCS", section: "C" },
        { id: 5, name: "Eve Brown", rollNo: "567891234", program: "BSCS", section: "B" },
        { id: 6, name: "Frank Miller", rollNo: "6789123456", program: "BSCS", section: "A" },
        { id: 7, name: "Grace Taylor", rollNo: "78912345678", program: "BSCS", section: "C" },
        { id: 8, name: "Henry Clark", rollNo: "89123456789", program: "BSCS", section: "B" },
        { id: 9, name: "Ivy Martin", rollNo: "91234567890", program: "BSCS", section: "A" },
        { id: 10, name: "Jack Thompson", rollNo: "01234567891", program: "BSCS", section: "C" },
        { id: 11, name: "Kelly White", rollNo: "12345678901", program: "BSCS", section: "B" },
        { id: 12, name: "Leo Green", rollNo: "23456789012", program: "BSCS", section: "A" },
        { id: 13, name: "Mia Parker", rollNo: "34567890123", program: "BSCS", section: "C" },
        { id: 14, name: "Noah Adams", rollNo: "45678901234", program: "BSCS", section: "B" },
        { id: 15, name: "Olivia Scott", rollNo: "56789012345", program: "BSCS", section: "A" },
        { id: 16, name: "Peter Evans", rollNo: "67890123456", program: "BSCS", section: "C" },
        { id: 17, name: "Quinn Reed", rollNo: "78901234567", program: "BSCS", section: "B" },
        { id: 18, name: "Rachel Turner", rollNo: "89012345678", program: "BSCS", section: "A" },
        { id: 19, name: "Sam Baker", rollNo: "90123456789", program: "BSCS", section: "C" },
        { id: 20, name: "Tina Hall", rollNo: "01234567890", program: "BSCS", section: "B" }
    ]);

    const [selectedStudents, setSelectedStudents] = useState([]);

    const toggleStudent = (id) => {
        if (selectedStudents.includes(id)) {
            setSelectedStudents(selectedStudents.filter(studentId => studentId !== id));
        } else {
            setSelectedStudents([...selectedStudents, id]);
        }
    };

    // Function to remove a teacher
    const removeTeacher = (index) => {
        const updatedTeachers = [...teachers];
        updatedTeachers.splice(index, 1);
        setTeachers(updatedTeachers);
    };

    // Handler for going back
    const handleGoBack = () => {
        console.log("Go back");
        // In a real app, you'd use navigation
    };

    // Save handler
    const handleSave = () => {
        console.log("Saving section with selected students:", selectedStudents);
    };

    // Discard handler
    const handleDiscard = () => {
        setSelectedStudents([]);
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Inter, sans-serif" }}>
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
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate(-1)}
                    />
                    <h1 className="m-0" style={{ fontSize: "24px", fontWeight: "600" }}>
                        Create Section
                    </h1>
                </div>
            </header>

            {/* Subheader */}
            <header
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                }}
            >
                {/* Left side: Heading */}
                <div style={{ fontSize: "18px", fontWeight: "600", color: "#111827" }}>
                    Enter Information for creating a section.
                </div>

                {/* Right side: Department Dropdown (Fixed version) */}
                <div style={{ position: "relative" }}>
                    <Form.Select
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        style={{
                            borderRadius: "12px",
                            fontSize: "14px",
                            color: "#111827",
                            fontWeight: '500',
                            padding: "10px 20px",
                            border: "1px solid #E5E7EB",
                            background: "transparent",
                            appearance: "none",
                            minWidth: "250px"
                        }}
                    >
                        <option value="Department of Computer Science">Department of Computer Science</option>
                        <option value="Department of Software Engineering">Department of Software Engineering</option>
                        <option value="Department of Data Science">Department of Data Science</option>
                        <option value="Department of Artificial Intelligence">Department of Artificial Intelligence</option>
                    </Form.Select>
                    <div
                        style={{
                            position: "absolute",
                            right: "15px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            pointerEvents: "none",
                            display: 'none'

                        }}
                    >
                        <img
                            src="/assets/arrow-down.png"
                            alt="arrow down"
                            style={{
                                width: "12px",
                                height: "12px",
                            }}
                        />
                    </div>
                </div>
            </header>

            {/* Form Fields */}
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                {/* First Row - Room No, Day, Semester */}
                <div style={{ display: "flex", gap: "20px" }}>
                    {/* Room No */}
                    <Form.Group style={{ flex: 1 }}>
                        <Form.Label style={{ fontSize: "14px", fontWeight: "500", color: "#000", paddingBottom: "10px" }}>
                            Select Room No
                        </Form.Label>
                        <div style={{ position: "relative", width: "100%" }}>
                            <Form.Select
                                value={roomNo}
                                onChange={(e) => setRoomNo(e.target.value)}
                                style={{
                                    borderRadius: "8px",
                                    fontSize: "14px",
                                    color: "#475467",
                                    fontWeight: '400',
                                    padding: "10px",
                                    border: "1px solid #EAECF0",
                                    appearance: "none"
                                }}
                            >
                                <option value="ICS">ICS</option>
                                <option value="CS-1">CS-1</option>
                                <option value="CS-2">CS-2</option>
                            </Form.Select>
                            <div
                                style={{
                                    position: "absolute",
                                    right: "15px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    pointerEvents: "none",
                                    display: 'none'
                                }}
                            >
                                <img
                                    src="/assets/arrow-down.png"
                                    alt="arrow down"
                                    style={{
                                        width: "12px",
                                        height: "12px",
                                    }}
                                />
                            </div>
                        </div>
                    </Form.Group>

                    {/* Select Day */}
                    <Form.Group style={{ flex: 1 }}>
                        <Form.Label style={{ fontSize: "14px", fontWeight: "500", color: "#000", paddingBottom: "10px" }}>
                            Select Day
                        </Form.Label>
                        <div style={{ position: "relative", width: "100%" }}>
                            <Form.Select
                                value={day}
                                onChange={(e) => setDay(e.target.value)}
                                style={{
                                    borderRadius: "8px",
                                    fontSize: "14px",
                                    color: "#475467",
                                    fontWeight: '400',
                                    padding: "10px",
                                    border: "1px solid #EAECF0",
                                    appearance: "none"
                                }}
                            >
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday">Friday</option>
                                <option value="Saturday">Saturday</option>
                                <option value="Sunday">Sunday</option>
                            </Form.Select>
                            <div
                                style={{
                                    position: "absolute",
                                    right: "15px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    pointerEvents: "none",
                                    display: 'none'
                                }}
                            >
                                <img
                                    src="/assets/arrow-down.png"
                                    alt="arrow down"
                                    style={{
                                        width: "12px",
                                        height: "12px",
                                    }}
                                />
                            </div>
                        </div>
                    </Form.Group>

                    {/* Select Semester */}
                    <Form.Group style={{ flex: 1 }}>
                        <Form.Label style={{ fontSize: "14px", fontWeight: "500", color: "#000", paddingBottom: "10px" }}>
                            Select Semester
                        </Form.Label>
                        <div style={{ position: "relative", width: "100%" }}>
                            <Form.Select
                                value={semester}
                                onChange={(e) => setSemester(e.target.value)}
                                style={{
                                    borderRadius: "8px",
                                    fontSize: "14px",
                                    color: "#475467",
                                    fontWeight: '400',
                                    padding: "10px",
                                    border: "1px solid #EAECF0",
                                    appearance: "none"
                                }}
                            >
                                <option value="Semester">Semester</option>
                                <option value="Fall 2025">Fall 2025</option>
                                <option value="Spring 2025">Spring 2025</option>
                                <option value="Summer 2025">Summer 2025</option>
                            </Form.Select>
                            <div
                                style={{
                                    position: "absolute",
                                    right: "15px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    pointerEvents: "none",
                                    display: 'none'
                                }}
                            >
                                <img
                                    src="/assets/arrow-down.png"
                                    alt="arrow down"
                                    style={{
                                        width: "12px",
                                        height: "12px",
                                    }}
                                />
                            </div>
                        </div>
                    </Form.Group>
                </div>

                {/* Second Row - Course Name, Start Time, End Time */}
                <div style={{ display: "flex", gap: "20px" }}>
                    {/* Course Name */}
                    <Form.Group style={{ flex: 1 }}>
                        <Form.Label style={{ fontSize: "14px", fontWeight: "500", color: "#000", paddingBottom: "10px" }}>
                            Course Name
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter course name"
                            value={courseName}
                            onChange={(e) => setCourseName(e.target.value)}
                            style={{
                                borderRadius: "8px",
                                fontSize: "14px",
                                color: "#475467",
                                padding: "10px",
                                border: "1px solid #EAECF0",
                                width: '100%'
                            }}
                        />
                    </Form.Group>

                    {/* Start Time */}
                    <Form.Group style={{ flex: 1 }}>
                        <Form.Label style={{ fontSize: "14px", fontWeight: "500", color: "#000", paddingBottom: "10px" }}>
                            Start Time
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="12:00 PM"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            style={{
                                borderRadius: "8px",
                                fontSize: "14px",
                                color: "#475467",
                                padding: "10px",
                                border: "1px solid #EAECF0",
                                width: '100%'
                            }}
                        />
                    </Form.Group>

                    {/* End Time */}
                    <Form.Group style={{ flex: 1 }}>
                        <Form.Label style={{ fontSize: "14px", fontWeight: "500", color: "#000", paddingBottom: "10px" }}>
                            End Time
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="04:00 PM"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            style={{
                                borderRadius: "8px",
                                fontSize: "14px",
                                color: "#475467",
                                padding: "10px",
                                border: "1px solid #EAECF0",
                                width: '100%'
                            }}
                        />
                    </Form.Group>
                </div>

                {/* Class Teacher */}
                <Form.Group>
                    <Form.Label style={{ fontSize: "14px", fontWeight: "500", color: "#000", paddingBottom: "10px" }}>
                        Class Teacher
                    </Form.Label>
                    <div
                        style={{
                            width: "100%",
                            padding: "10px",
                            border: "1px solid #EAECF0",
                            borderRadius: "12px",
                            minHeight: "64px",
                            height: '15vh'
                        }}
                    >
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                            {teachers.map((teacher, index) => (
                                <div
                                    key={index}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        backgroundColor: "#F3EAFF",
                                        color: "#101828",
                                        borderRadius: "100px",
                                        padding: "4px 12px",
                                        fontSize: '12px',
                                        fontWeight: '500'
                                    }}
                                >
                                    <span style={{ fontSize: "14px" }}>{teacher}</span>
                                    <button
                                        onClick={() => removeTeacher(index)}
                                        style={{
                                            marginLeft: "8px",
                                            background: "none",
                                            border: "none",
                                            cursor: "pointer",
                                            padding: "0",
                                            display: "flex",
                                            alignItems: "center"
                                        }}
                                    >
                                        <span style={{ fontSize: "16px" }}>×</span>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </Form.Group>

                {/* Student Strength */}
                <Form.Group>
                    <Form.Label style={{ fontSize: "14px", fontWeight: "500", color: "#000", paddingBottom: "10px" }}>
                        Student Strength
                    </Form.Label>
                    <div style={{ position: "relative", width: "100%" }}>
                        <Form.Select
                            value={studentStrength}
                            onChange={(e) => setStudentStrength(e.target.value)}
                            style={{
                                borderRadius: "8px",
                                fontSize: "14px",
                                color: "#475467",
                                padding: "10px",
                                border: "1px solid #EAECF0",
                                appearance: "none"
                            }}
                        >
                            <option value="30">30</option>
                            <option value="40">40</option>
                            <option value="50">50</option>
                            <option value="60">60</option>
                        </Form.Select>
                        <div
                            style={{
                                position: "absolute",
                                right: "15px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                pointerEvents: "none",
                                display: 'none'
                            }}
                        >
                            <img
                                src="/assets/arrow-down.png"
                                alt="arrow down"
                                style={{
                                    width: "12px",
                                    height: "12px",
                                }}
                            />
                        </div>
                    </div>
                </Form.Group>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0px" }}>
                    <h2 style={{ fontSize: "24px", fontWeight: "500", color: "#000", margin: 0 }}>Add Students</h2>
                    <span style={{ color: "#475467", fontSize: "14px", fontWeight: '500' }}>1/50</span>
                </div>

                {/* Add Students Section */}
                <div style={{ marginTop: "10px", border: '1px solid #EAECF0', borderRadius: '12px', padding: '15px' }}>
                    {/* Tabs */}
                    <div style={{ marginBottom: "16px" }}>
                        <Nav variant="tabs" style={{ border: "none", gap: "15px" }}>
                            <Nav.Item>
                                <Nav.Link
                                    active={activeTab === "new"}
                                    onClick={() => setActiveTab("new")}
                                    style={{
                                        backgroundColor: activeTab === "new" ? "#000" : "transparent",
                                        color: activeTab === "new" ? "#fff" : "#111827",
                                        border: "1px solid #EAECF0",
                                        borderRadius: "8px",
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        padding: "8px 16px",
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
                                        backgroundColor: activeTab === "other" ? "#000" : "transparent",
                                        color: activeTab === "other" ? "#fff" : "#111827",
                                        border: "1px solid #EAECF0",
                                        borderRadius: "8px",
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        padding: "8px 16px",
                                    }}
                                >
                                    Other Sections
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>

                    <div style={{ border: 'none', borderRadius: '8px', overflow: 'hidden', maxHeight: '70vh' }}>
                        {/* Table container with scrollable body */}
                        <div className="hide-scrollbar" style={{ maxHeight: 'calc(70vh - 45px)', overflowY: 'auto' }}>
                            <Table responsive borderless style={{ fontSize: "14px", marginBottom: 0 }}>
                                <thead style={{ backgroundColor: "#F9FAFB", position: "sticky", top: 0, zIndex: 2 }}>
                                    <tr style={{ color: "#111827", fontWeight: "500", fontSize: '14px', borderBottom: "1px solid #E5E7EB" }}>
                                        <th style={{ width: '8%', fontSize: '14px', fontWeight: '500', color: '#111827', paddingLeft: 0 }}>Sr No.</th>
                                        <th style={{ width: '25%', fontSize: '14px', fontWeight: '500', color: '#111827' }}>Students</th>
                                        <th style={{ width: '15%', fontSize: '14px', fontWeight: '500', color: '#111827' }}>Roll No</th>
                                        <th style={{ width: '20%', fontSize: '14px', fontWeight: '500', color: '#111827' }}>Programme</th>
                                        <th style={{ width: '15%', fontSize: '14px', fontWeight: '500', color: '#111827' }}>Section</th>
                                        <th style={{ width: '17%', fontSize: '14px', fontWeight: '500', color: '#111827' }}>Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {students.map((student, index) => (
                                        <tr
                                            key={student.id}
                                            style={{
                                                verticalAlign: "middle",
                                                borderBottom: index !== students.length - 1 ? "1px solid #E5E7EB" : "none"
                                            }}
                                        >
                                            <td style={{ paddingLeft: 0, fontSize: '14px', fontWeight: '400', color: '#4B5563' }}>{student.id}</td>
                                            <td>
                                                <div style={{ display: "flex", alignItems: "center", fontSize: '12px', fontWeight: '500', color: '#101828' }}>
                                                    <Image
                                                        src={`/assets/student-${student.id % 3 + 1}.jpg`}
                                                        roundedCircle
                                                        width={32}
                                                        height={32}
                                                        className="me-2"
                                                        alt={student.name}
                                                        style={{ objectFit: "cover" }}
                                                    />
                                                    {student.name}
                                                </div>
                                            </td>
                                            <td style={{ fontSize: '14px', fontWeight: '400', color: '#4B5563' }}>{student.rollNo}</td>
                                            <td style={{ fontSize: '14px', fontWeight: '400', color: '#4B5563' }}>{student.program}</td>
                                            <td style={{ fontSize: '14px', fontWeight: '400', color: '#4B5563' }}>{student.section}</td>
                                            <td>
                                                <Button
                                                    style={{
                                                        backgroundColor: selectedStudents.includes(student.id) ? "#98A2B3" : "#111827",
                                                        border: selectedStudents.includes(student.id) ? "1px solid #98A2B3" : "none",
                                                        color: selectedStudents.includes(student.id) ? "#fff" : "#FFFFFF",
                                                        borderRadius: "100px",
                                                        fontSize: "14px",
                                                        padding: "8px 16px",
                                                        fontWeight: "400"
                                                    }}
                                                    onClick={() => toggleStudent(student.id)}
                                                >
                                                    {selectedStudents.includes(student.id) ? "Added" : "+ Add"}
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </div>

                    {/* Footer Buttons */}
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "24px" }}>
                        <Button
                            style={{
                                backgroundColor: "#EAECF0",
                                color: "#111827",
                                border: "1px solid #D1D5DB",
                                borderRadius: "8px",
                                padding: "8px 16px",
                                fontWeight: "500"
                            }}
                            onClick={handleDiscard}
                        >
                            Discard
                        </Button>
                        <Button
                            style={{
                                backgroundColor: "#111827",
                                color: "#FFFFFF",
                                border: "none",
                                borderRadius: "8px",
                                padding: "8px 16px",
                                fontWeight: "500"
                            }}
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
        </div>
    );
};

export default TeacherCreateSection;