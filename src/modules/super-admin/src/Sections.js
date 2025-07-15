import React, { useState, useEffect } from "react";
import { Container, Button, Form, Image, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

function Attendance() {
    const navigate = useNavigate();
    
    // Department state
    const [departmentOptions] = useState([
        "Department of Computer Science",
        "Department of Information Technology",
        "Department of Electrical Engineering"
    ]);
    const [selectedDepartment, setSelectedDepartment] = useState("Department of Computer Science");
    const [departmentDropdownOpen, setDepartmentDropdownOpen] = useState(false);

    // Semester state - numeric format
    const [semesterOptions] = useState([
        "Semester 1",
        "Semester 2",
        "Semester 3",
        "Semester 4",
        "Semester 5",
        "Semester 6",
        "Semester 7",
        "Semester 8"
    ]);
    const [selectedSemester, setSelectedSemester] = useState("Semester 1");
    const [semesterDropdownOpen, setSemesterDropdownOpen] = useState(false);

    // Section data state
    const [searchText, setSearchText] = useState("");
    const [attendanceData, setAttendanceData] = useState([]);
    const [isEditMode, setIsEditMode] = useState(false);

    // Generate comprehensive mock data with 4-5 cards for each combination
    const generateMockData = () => {
        let id = 1;
        const data = [];
        
        // Teacher names pool
        const teachers = [
            "Ahmed Mushtaq", "Sarah Johnson", "Michael Chen", "David Lee", 
            "Emily Zhang", "James Wilson", "Aisha Khan", "Robert Brown",
            "John Smith", "Maria Garcia", "Wei Zhang", "Fatima Ali", 
            "Carlos Rodriguez", "Priya Patel", "Mohammed Hassan", "Emma Watson"
        ];
        
        // Time slots pool
        const timeSlots = [
            "8:00AM to 10:00AM", "9:00AM to 11:00AM", "10:00AM to 12:00PM", 
            "11:00AM to 1:00PM", "12:00PM to 2:00PM", "1:00PM to 3:00PM", 
            "2:00PM to 4:00PM", "3:00PM to 5:00PM", "4:00PM to 6:00PM"
        ];
        
        // Generate data for Computer Science
        for (let semester = 1; semester <= 8; semester++) {
            // Create 5 sections for each semester
            for (let section = 1; section <= 5; section++) {
                const sectionName = `CS-${String.fromCharCode(64 + section)}${semester}`;
                data.push({
                    id: id++,
                    section: sectionName,
                    department: "Department of Computer Science",
                    totalStudents: Math.floor(Math.random() * 15) + 30, // Random number between 30-45
                    teacher: teachers[Math.floor(Math.random() * teachers.length)],
                    semester: `Semester ${semester}`,
                    time: timeSlots[Math.floor(Math.random() * timeSlots.length)]
                });
            }
        }
        
        // Generate data for Information Technology
        for (let semester = 1; semester <= 8; semester++) {
            // Create 4 sections for each semester
            for (let section = 1; section <= 4; section++) {
                const sectionName = `IT-${String.fromCharCode(64 + section)}${semester}`;
                data.push({
                    id: id++,
                    section: sectionName,
                    department: "Department of Information Technology",
                    totalStudents: Math.floor(Math.random() * 15) + 25, // Random number between 25-40
                    teacher: teachers[Math.floor(Math.random() * teachers.length)],
                    semester: `Semester ${semester}`,
                    time: timeSlots[Math.floor(Math.random() * timeSlots.length)]
                });
            }
        }
        
        // Generate data for Electrical Engineering
        for (let semester = 1; semester <= 8; semester++) {
            // Create 5 sections for each semester
            for (let section = 1; section <= 5; section++) {
                const sectionName = `EE-${String.fromCharCode(64 + section)}${semester}`;
                data.push({
                    id: id++,
                    section: sectionName,
                    department: "Department of Electrical Engineering",
                    totalStudents: Math.floor(Math.random() * 15) + 35, // Random number between 35-50
                    teacher: teachers[Math.floor(Math.random() * teachers.length)],
                    semester: `Semester ${semester}`,
                    time: timeSlots[Math.floor(Math.random() * timeSlots.length)]
                });
            }
        }
        
        return data;
    };

    // Create mock data once
    const [mockData] = useState(generateMockData());

    // Fetch data based on selected department and semester
    useEffect(() => {
        // Filter the mock data based on the selected department and semester
        const filteredData = mockData.filter(item => 
            item.department === selectedDepartment && 
            item.semester === selectedSemester
        );
        
        // Set the filtered data
        setAttendanceData(filteredData);
    }, [selectedDepartment, selectedSemester, mockData]);

    // Filter data based on search text
    const filteredData = attendanceData.filter((data) =>
        data.section.toLowerCase().includes(searchText.toLowerCase()) ||
        data.teacher.toLowerCase().includes(searchText.toLowerCase())
    );

    // Navigation handlers
    const handleCardClick = (data) => {
        if (!isEditMode) {
            navigate("/Allstudents", { state: { selectedData: data } });
        }
    };

    // Dropdown toggles
    const toggleDepartmentDropdown = () => {
        setDepartmentDropdownOpen(!departmentDropdownOpen);
        if (semesterDropdownOpen) setSemesterDropdownOpen(false);
    };

    const toggleSemesterDropdown = () => {
        setSemesterDropdownOpen(!semesterDropdownOpen);
        if (departmentDropdownOpen) setDepartmentDropdownOpen(false);
    };

    // Selection handlers
    const handleDepartmentSelect = (dept) => {
        setSelectedDepartment(dept);
        setDepartmentDropdownOpen(false);
    };

    const handleSemesterSelect = (semester) => {
        setSelectedSemester(semester);
        setSemesterDropdownOpen(false);
    };

    // Edit mode and card actions
    const toggleEditMode = () => {
        setIsEditMode(!isEditMode);
    };

    const handleRemoveCard = (id, e) => {
        e.stopPropagation(); // Prevent card click event
        const updatedData = attendanceData.filter(item => item.id !== id);
        setAttendanceData(updatedData);
    };

    const handleCreate = () => {
        console.log("Create button clicked");
        // Navigate to create section page
        navigate("/create-section");
    };

    return (
        <Container fluid className="p-0 d-flex">
            <main className="flex-grow-1 p-3">
                {/* Header Section */}
                <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <h1 style={{ fontSize: "24px", margin: 0, fontWeight: "600" }}>All Sections</h1>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <img src="/assets/avatar.jpeg" alt="User" style={{ borderRadius: "50%", width: "54px", height: "54px", marginRight: "10px" }} />
                        <div style={{ marginRight: "10px" }}>
                            <div style={{ fontWeight: "500", fontSize: "14px" }}>Mian Hamad Khalil</div>
                            <div style={{ fontSize: "12px", color: "#6c757d" }}>123456</div>
                        </div>
                    </div>
                </header>

                {/* Filter Section */}
                <header className="d-flex justify-content-between align-items-center mb-4" style={{ marginTop: "15px", width: "100%" }}>
                    <div className="d-flex align-items-center gap-3">
                        {/* Department Dropdown */}
                        <div className="position-relative">
                            <div
                                onClick={toggleDepartmentDropdown}
                                className="d-flex justify-content-between align-items-center"
                                style={{
                                    backgroundColor: "white",
                                    border: "1px solid #E5E7EB",
                                    borderRadius: "6px",
                                    padding: "8px 16px",
                                    cursor: "pointer",
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    color: "#111827",
                                    minWidth: "220px"
                                }}
                            >
                                <span>{selectedDepartment}</span>
                                <img
                                    src={departmentDropdownOpen ? "/assets/arrow-up.png" : "/assets/arrow-down.png"}
                                    alt="Arrow"
                                    style={{ width: "12px", height: "12px", marginLeft: "8px" }}
                                />
                            </div>
                            {departmentDropdownOpen && (
                                <div
                                    style={{
                                        position: "absolute",
                                        top: "100%",
                                        left: 0,
                                        right: 0,
                                        backgroundColor: "white",
                                        border: "1px solid #E5E7EB",
                                        borderRadius: "6px",
                                        marginTop: "2px",
                                        zIndex: 1000,
                                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"
                                    }}
                                >
                                    {departmentOptions.map((dept, index) => (
                                        <div
                                            key={index}
                                            onClick={() => handleDepartmentSelect(dept)}
                                            style={{
                                                padding: "8px 16px",
                                                cursor: "pointer",
                                                fontSize: "14px",
                                                fontWeight: "400",
                                                color: "#111827",
                                                backgroundColor: selectedDepartment === dept ? "#F3F4F6" : "white",
                                                borderBottom: index !== departmentOptions.length - 1 ? "1px solid #eee" : "none",
                                            }}
                                        >
                                            {dept}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Semester Dropdown - numeric semesters */}
                        <div className="position-relative">
                            <div
                                onClick={toggleSemesterDropdown}
                                className="d-flex justify-content-between align-items-center"
                                style={{
                                    backgroundColor: "white",
                                    border: "1px solid #E5E7EB",
                                    borderRadius: "6px",
                                    padding: "8px 16px",
                                    cursor: "pointer",
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    color: "#111827",
                                    minWidth: "120px"
                                }}
                            >
                                <span>{selectedSemester}</span>
                                <img
                                    src={semesterDropdownOpen ? "/assets/arrow-up.png" : "/assets/arrow-down.png"}
                                    alt="Arrow"
                                    style={{ width: "12px", height: "12px", marginLeft: "8px" }}
                                />
                            </div>
                            {semesterDropdownOpen && (
                                <div
                                    style={{
                                        position: "absolute",
                                        top: "100%",
                                        left: 0,
                                        right: 0,
                                        backgroundColor: "white",
                                        border: "1px solid #E5E7EB",
                                        borderRadius: "6px",
                                        marginTop: "2px",
                                        zIndex: 1000,
                                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"
                                    }}
                                >
                                    {semesterOptions.map((semester, index) => (
                                        <div
                                            key={index}
                                            onClick={() => handleSemesterSelect(semester)}
                                            style={{
                                                padding: "8px 16px",
                                                cursor: "pointer",
                                                fontSize: "14px",
                                                fontWeight: "400",
                                                color: "#111827",
                                                backgroundColor: selectedSemester === semester ? "#F3F4F6" : "white",
                                                borderBottom: index !== semesterOptions.length - 1 ? "1px solid #eee" : "none",
                                            }}
                                        >
                                            {semester}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="d-flex align-items-center gap-3">
                        {/* Search Bar */}
                        <div className="position-relative">
                            <Form.Control
                                type="text"
                                placeholder="Search sections or teachers"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                style={{
                                    borderRadius: "6px",
                                    padding: "8px 16px",
                                    paddingLeft: "40px",
                                    fontSize: "14px",
                                    fontWeight: "400",
                                    color: "#111827",
                                    border: "1px solid #E5E7EB",
                                    width: "240px",
                                }}
                            />
                            <img
                                src="/assets/search-lg.png"
                                alt="Search Icon"
                                width={16}
                                height={16}
                                style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "14px",
                                    transform: "translateY(-50%)",
                                }}
                            />
                        </div>

                        {/* Create and Edit Buttons */}
                        <Button
                            onClick={handleCreate}
                            style={{
                                backgroundColor: "#0F172A",
                                color: "white",
                                borderRadius: "6px",
                                fontSize: "14px",
                                fontWeight: "500",
                                padding: "8px 16px",
                                border: "none",
                            }}
                        >
                            Create
                        </Button>

                        <Button
                            onClick={toggleEditMode}
                            style={{
                                backgroundColor: "#0F172A",
                                color: "white",
                                borderRadius: "6px",
                                fontSize: "14px",
                                fontWeight: "500",
                                padding: "8px 16px",
                                border: "none",
                            }}
                        >
                            {isEditMode ? "Done" : "Edit"}
                        </Button>
                    </div>
                </header>

                {/* Cards Grid */}
                <Container className="mt-4 p-0" style={{ maxWidth: '100%' }}>
                    <Row className="g-4">
                        {filteredData.length > 0 ? (
                            filteredData.map((data) => (
                                <Col key={data.id} xs={12} sm={6} md={4}>
                                    <Card
                                        className={`p-3 ${isEditMode ? "edit-mode" : ""}`}
                                        style={{
                                            borderRadius: "12px",
                                            border: "1px solid #EAECF0",
                                            cursor: isEditMode ? "default" : "pointer",
                                            height: "100%",
                                            // transition: "all 0.2s ease-in-out",
                                        }}
                                        onClick={() => handleCardClick(data)}
                                    >
                                        <Card.Body className="p-0">
                                            {/* Header with section and minus button (only visible in edit mode) */}
                                            <div className="d-flex justify-content-between align-items-start">
                                                <h5 className="mb-1" style={{ fontSize:'20px',ontWeight: '600', color: '#1F2937' }}>{data.section}</h5>
                                                {isEditMode && (
                                                    <Image
                                                        src="/assets/minus.png"
                                                        width={24}
                                                        height={24}
                                                        alt="Remove"
                                                        style={{
                                                            cursor: 'pointer',
                                                            padding: '2px',
                                                            borderRadius: '50%'
                                                        }}
                                                        onClick={(e) => handleRemoveCard(data.id, e)}
                                                    />
                                                )}
                                            </div>

                                            <p className="mb-3" style={{ fontSize: '11px', color: '#475467', fontWeight:'400' }}>
                                                {data.department.replace('Department of ', '')}
                                            </p>

                                            <p className="mb-1" style={{ fontSize: '16px', color: '#101828', fontWeight:'500' }}>Total Students in Class</p>
                                            <h2 className="mb-3" style={{ fontWeight: '600', color: '#667085', fontSize: '36px' }}>{data.totalStudents}</h2>

                                            <div className="mb-2">
                                                <p className="mb-3 d-flex align-items-center" style={{ fontSize: '12px',fontWeight:'400', color: '#1D2939' }}>
                                                    <Image
                                                        src="/assets/teacher.png"
                                                        width={14}
                                                        height={14}
                                                        alt="Teacher"
                                                        className="me-2"
                                                    />
                                                    {data.teacher}
                                                </p>

                                                {/* Numeric semester display */}
                                                <p className="mb-3 d-flex align-items-center" style={{ fontSize: '12px',fontWeight:'400', color: '#1D2939' }}>
                                                    <Image
                                                        src="/assets/batch.png"
                                                        width={14}
                                                        height={14}
                                                        alt="Semester"
                                                        className="me-2"
                                                    />
                                                    {data.semester}
                                                </p>

                                                <p className="d-flex align-items-center mb-0" style={{ fontSize: '12px',fontWeight:'400', color: '#1D2939' }}>
                                                    <Image
                                                        src="/assets/clock.png"
                                                        width={14}
                                                        height={14}
                                                        alt="Time"
                                                        className="me-2"
                                                    />
                                                    {data.time}
                                                </p>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        ) : (
                            <Col xs={12}>
                                <p className="text-center py-5" style={{ color: '#6B7280', fontSize: '16px' }}>
                                    No sections found for {selectedSemester} in {selectedDepartment.replace('Department of ', '')}.
                                </p>
                            </Col>
                        )}
                    </Row>
                </Container>
            </main>

            <style>
                {`
                    .edit-mode:hover {
                        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                    }
                    
                    .card:not(.edit-mode):hover {
                        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                        transform: translateY(-2px);
                    }
                `}
            </style>
        </Container>
    );
}

export default Attendance;