import React, { useState, useEffect, useCallback } from "react";
import { Container, Button, Form, Table, Row, Col, Nav, Spinner, Alert, Dropdown, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

// Mock data for pending students
const MOCK_PENDING_DATA = {
  students: [
    {
      id: 1,
      name: "Demo Name",
      studentId: "CS123456",
      challanNo: "458962140",
      issueDate: "2024-09-25",
      amount: "37000",
      status: "Pending",
      action: "Reminder",
      avatar: "/assets/avatar1.png"
    },
    {
      id: 2,
      name: "Demo Name",
      studentId: "CS123456",
      challanNo: "458962140",
      issueDate: "2024-07-18",
      amount: "40000",
      status: "Pending",
      action: "Reminder",
      avatar: "/assets/avatar2.png"
    },
    {
      id: 3,
      name: "Demo Name",
      studentId: "CS123456",
      challanNo: "458962140",
      issueDate: "2024-06-18",
      amount: "39000",
      status: "Pending",
      action: "Reminder",
      avatar: "/assets/avatar3.png"
    },
    {
      id: 4,
      name: "Demo Name",
      studentId: "CS123456",
      challanNo: "458962140",
      issueDate: "2024-02-19",
      amount: "45000",
      status: "Pending",
      action: "Reminder",
      avatar: "/assets/avatar4.png"
    },
    {
      id: 5,
      name: "Demo Name",
      studentId: "CS123456",
      challanNo: "458962140",
      issueDate: "2024-01-12",
      amount: "38000",
      status: "Pending",
      action: "Reminder",
      avatar: "/assets/avatar5.png"
    },
    {
      id: 6,
      name: "Demo Name",
      studentId: "CS123456",
      challanNo: "458962140",
      issueDate: "2024-01-12",
      amount: "38000",
      status: "Pending",
      action: "Reminder",
      avatar: "/assets/avatar1.png"
    },
    {
      id: 7,
      name: "Demo Name",
      studentId: "CS123456",
      challanNo: "458962140",
      issueDate: "2024-01-12",
      amount: "38000",
      status: "Pending",
      action: "Reminder",
      avatar: "/assets/avatar2.png"
    },
    {
      id: 8,
      name: "Demo Name",
      studentId: "CS123456",
      challanNo: "458962140",
      issueDate: "2024-01-12",
      amount: "38000",
      status: "Pending",
      action: "Reminder",
      avatar: "/assets/avatar3.png"
    },
    {
      id: 9,
      name: "Demo Name",
      studentId: "CS123456",
      challanNo: "458962140",
      issueDate: "2024-01-12",
      amount: "38000",
      status: "Pending",
      action: "Reminder",
      avatar: "/assets/avatar4.png"
    },
    {
      id: 10,
      name: "Demo Name",
      studentId: "CS123456",
      challanNo: "458962140",
      issueDate: "2024-01-12",
      amount: "38000",
      status: "Pending",
      action: "Reminder",
      avatar: "/assets/avatar5.png"
    }
  ],
  fines: [
    {
      id: 1,
      name: "Demo Name",
      studentId: "CS123456",
      challanNo: "458962140",
      issueDate: "2024-09-25",
      amount: "5000",
      status: "Pending",
      action: "Reminder",
      avatar: "/assets/avatar1.png"
    },
    {
      id: 2,
      name: "Demo Name",
      studentId: "CS123456",
      challanNo: "458962140",
      issueDate: "2024-07-18",
      amount: "3000",
      status: "Pending",
      action: "Reminder",
      avatar: "/assets/avatar2.png"
    },
    {
      id: 3,
      name: "Demo Name",
      studentId: "CS123456",
      challanNo: "458962140",
      issueDate: "2024-06-18",
      amount: "4000",
      status: "Pending",
      action: "Reminder",
      avatar: "/assets/avatar3.png"
    }
  ]
};

// Helper function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { day: "2-digit", month: "short", year: "numeric" };
  return date.toLocaleDateString("en-GB", options);
};

// Helper function to format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN").format(amount);
};

function FeesPending() {
  const navigate = useNavigate();
  
  // State variables
  const [searchText, setSearchText] = useState("");
  const [department, setDepartment] = useState("Department of Computer Science");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [activeTab, setActiveTab] = useState("fees");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [sendingReminder, setSendingReminder] = useState(false);
  const [reminderSuccess, setReminderSuccess] = useState(false);

  // Available departments
  const departments = [
    "Department of Computer Science",
    "Department of Physics",
    "Department of Mathematics",
    "Department of Chemistry",
    "Department of Biology"
  ];

  // Fetch data from the API
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // In a real application, these would be API calls
      // For demo purposes, we're using mock data with a timeout to simulate network latency
      setTimeout(() => {
        if (activeTab === "fees") {
          setData(MOCK_PENDING_DATA.students);
          setFilteredData(MOCK_PENDING_DATA.students);
        } else {
          setData(MOCK_PENDING_DATA.fines);
          setFilteredData(MOCK_PENDING_DATA.fines);
        }
        
        setIsLoading(false);
      }, 1000);
      
      // In a real app, you would use:
      // const response = await fetch(`${apiBaseUrl}/pending-${activeTab}?department=${department}&date=${selectedDate.toISOString()}`);
      // const data = await response.json();
      // setData(data);
      // setFilteredData(data);

    } catch (err) {
      setError("Failed to load data. Please try again later.");
      setIsLoading(false);
    }
  }, [department, selectedDate, activeTab]);

  // Initialize data on component mount and when filters or tab changes
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Filter data based on search text
  useEffect(() => {
    if (searchText.trim() === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter(
        (item) =>
          item.name.toLowerCase().includes(searchText.toLowerCase()) ||
          item.studentId.toLowerCase().includes(searchText.toLowerCase()) ||
          item.challanNo.includes(searchText)
      );
      setFilteredData(filtered);
    }
  }, [searchText, data]);

  // Handle department change
  const handleDepartmentChange = (dept) => {
    setDepartment(dept);
  };

  // Handle date selection
  const handleDateChange = (date) => {
    // Make sure date is valid
    if (date && !isNaN(date.getTime())) {
      setSelectedDate(date);
    }
  };

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // View student details
  const viewStudentDetails = (studentId) => {
    navigate(`/student-profile/${studentId}`);
  };

  // Handle back button
  const handleBack = () => {
    navigate("/fees");
  };

  // Show reminder modal
  const openReminderModal = (student) => {
    setSelectedStudent(student);
    setShowReminderModal(true);
    setReminderSuccess(false);
  };

  // Send reminder to student
  const sendReminder = async () => {
    if (!selectedStudent) return;
    
    setSendingReminder(true);
    
    try {
      // In a real app, this would be an API call
      // await fetch(`${apiBaseUrl}/send-reminder`, { ... });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update the local state to reflect the change
      const updatedData = data.map(student => {
        if (student.id === selectedStudent.id) {
          return { ...student, action: "Sent" };
        }
        return student;
      });
      
      setData(updatedData);
      
      // Also update the filtered data
      setFilteredData(prevFiltered => 
        prevFiltered.map(student => {
          if (student.id === selectedStudent.id) {
            return { ...student, action: "Sent" };
          }
          return student;
        })
      );
      
      // Show success message
      setReminderSuccess(true);
      
      // Close modal after a delay
      setTimeout(() => {
        setShowReminderModal(false);
        setSelectedStudent(null);
      }, 2000);
      
    } catch (err) {
      setError("Failed to send reminder. Please try again.");
    } finally {
      setSendingReminder(false);
    }
  };

  return (
    <Container fluid className="p-3 d-flex">
      <main className="flex-grow-1 ">
        {/* Header Section */}
        <header
          className="d-flex flex-wrap justify-content-between align-items-center  mb-3 w-100"
          style={{ paddingTop: "0px" }}
        >
          <div className="d-flex align-items-center mb-2 mb-md-0">
            <Button
              variant="link"
              className="p-0 me-2"
              onClick={handleBack}
              style={{ color: "#000", textDecoration: "none" }}
            >
              <img 
                src="/assets/arrow-left.png" 
                alt="Back" 
                style={{ width: "24px", height: "24px" }} 
              />
            </Button>
            <h1 style={{ fontSize: "24px", margin: 0, fontWeight: "600" }}>Pending Payments</h1>
          </div>
          <div className="d-flex align-items-center">
            <img
              src="/assets/avatar.png"
              alt="User"
              style={{ borderRadius: "50%", width: "54px", height: "54px", marginRight: "10px" }}
            />
            <div style={{ marginRight: "10px" }}>
              <div style={{ fontWeight: "500", fontSize: "14" }}>Zuhran Ahmad</div>
              <div style={{ fontSize: "12px", color: "#6c757d" }}>14785200</div>
            </div>
          </div>
        </header>

        {/* Error message if any */}
        {error && (
          <Alert variant="danger" onClose={() => setError(null)} dismissible>
            {error}
          </Alert>
        )}

        {/* Filter Section */}
        <div
          className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3"
          style={{ marginTop: "15px", width: "100%" }}
        >
          <div className="d-flex flex-wrap align-items-center gap-3">
            <Dropdown>
              <Dropdown.Toggle
                variant="light"
                id="dropdown-department"
                style={{
                  border: "1px solid #EAECF0",
                  borderRadius: "8px",
                  padding: "8px 12px",
                  backgroundColor: "white",
                  color: "#111827",
                  fontWeight: 500,
                  fontSize: "14px"
                }}
              >
                {department}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {departments.map((dept, index) => (
                  <Dropdown.Item 
                    key={index} 
                    onClick={() => handleDepartmentChange(dept)}
                    active={department === dept}
                  >
                    {dept}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>

            <div
              className="d-flex align-items-center mb-2 mb-md-0 position-relative"
              style={{
                border: "1px solid #EAECF0",
                borderRadius: "8px",
                padding: "8px 12px",
                backgroundColor: "white",
                cursor: "pointer",
              }}
              onClick={() => setShowDatePicker(!showDatePicker)}
            >
              <img
                src="/assets/calendar1.png"
                alt="Calendar Icon"
                width={20}
                height={20}
                className="me-2"
              />
              <span style={{ fontSize: "14px", fontWeight: "600", color: "#111827" }}>
                {selectedDate.toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric"
                })}
              </span>
              
              {showDatePicker && (
                <div 
                  style={{ 
                    position: "absolute", 
                    top: "100%", 
                    left: 0, 
                    zIndex: 1000,
                    backgroundColor: "#fff",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    borderRadius: "8px",
                    marginTop: "4px",
                    padding: "15px",
                    width: "300px"
                  }}
                >
                  <Form.Group>
                    <Form.Label>Select Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={selectedDate.toISOString().split('T')[0]}
                      onChange={(e) => {
                        const newDate = new Date(e.target.value);
                        handleDateChange(newDate);
                      }}
                    />
                  </Form.Group>
                  <div className="d-flex justify-content-end mt-2">
                    <Button 
                      size="sm" 
                      variant="secondary" 
                      onClick={() => setShowDatePicker(false)}
                      className="me-2"
                    >
                      Cancel
                    </Button>
                    <Button 
                      size="sm" 
                      variant="primary" 
                      onClick={() => setShowDatePicker(false)}
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

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
                minWidth: "250px"
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
        </div>

        {/* Tab Navigation */}
        <div className="mb-4">
          <Nav
            variant="tabs"
            className="custom-tabs"
            activeKey={activeTab}
            onSelect={handleTabChange}
          >
            <Nav.Item>
              <Nav.Link 
                eventKey="fees" 
                className={activeTab === "fees" ? "active-tab" : ""}
                style={{
                  fontWeight: "500",
                  color: activeTab === "fees" ? "#9747FF" : "#6C757D",
                  borderBottom: activeTab === "fees" ? "2px solid #9747FF" : "none",
                  backgroundColor: "transparent",
                  borderTop: "none",
                  borderLeft: "none",
                  borderRight: "none",
                  paddingBottom: "10px"
                }}
              >
                Fees
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link 
                eventKey="fines" 
                className={activeTab === "fines" ? "active-tab" : ""}
                style={{
                  fontWeight: "500",
                  color: activeTab === "fines" ? "#9747FF" : "#6C757D",
                  borderBottom: activeTab === "fines" ? "2px solid #9747FF" : "none",
                  backgroundColor: "transparent",
                  borderTop: "none",
                  borderLeft: "none",
                  borderRight: "none",
                  paddingBottom: "10px"
                }}
              >
                Fines
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>

        {/* Loading indicator */}
        {isLoading ? (
          <div className="d-flex justify-content-center my-5">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <>
            {/* Students Table */}
            <div
              style={{
                width: "100%",
                marginTop: "20px",
              }}
            >
              <div
                style={{
                  border: "1px solid #EAECF0",
                  borderRadius: "12px",
                  overflow: "hidden"
                }}
              >
                {filteredData.length === 0 ? (
                  <div className="text-center py-5">
                    <p>No pending {activeTab} records found with the current filters.</p>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <Table hover className="table mb-0">
                      <thead style={{ backgroundColor: "#F9FAFB" }}>
                        <tr>
                          <th style={{ padding: "16px 16px", fontSize: "16px", fontWeight: "500", color: "#111827" }}>
                            Students
                          </th>
                          <th style={{ padding: "16px 16px", fontSize: "16px", fontWeight: "500", color: "#111827" }}>
                            Student ID
                          </th>
                          <th style={{ padding: "16px 16px", fontSize: "16px", fontWeight: "500", color: "#111827" }}>
                            Challan no
                          </th>
                          <th style={{ padding: "16px 16px", fontSize: "16px", fontWeight: "500", color: "#111827" }}>
                            Issue Date
                          </th>
                          <th style={{ padding: "16px 16px", fontSize: "16px", fontWeight: "500", color: "#111827" }}>
                            Amount
                          </th>
                          <th style={{ padding: "16px 16px", fontSize: "16px", fontWeight: "500", color: "#111827" }}>
                            Status
                          </th>
                          <th style={{ padding: "16px 16px", fontSize: "16px", fontWeight: "500", color: "#111827" }}>
                            Action
                          </th>
                          <th style={{ padding: "16px 16px", fontSize: "16px", fontWeight: "500", color: "#111827", textAlign: "center" }}>
                            View
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredData.map((item) => (
                          <tr key={item.id} style={{ borderBottom: "1px solid #EAECF0" }}>
                            <td style={{ padding: "16px", verticalAlign: "middle" }}>
                              <div className="d-flex align-items-center">
                                <img
                                  src={item.avatar}
                                  alt={item.name}
                                  style={{ width: "36px", height: "36px", borderRadius: "50%", marginRight: "12px" }}
                                />
                                <span style={{ fontSize: "14px", color: "#101828", fontWeight: '500' }}>{item.name}</span>
                              </div>
                            </td>
                            <td style={{ padding: "16px", verticalAlign: "middle", fontSize: "12px", color: "#4B5563", fontWeight: '400' }}>
                              {item.studentId}
                            </td>
                            <td style={{ padding: "16px", verticalAlign: "middle", fontSize: "12px", color: "#4B5563", fontWeight: '400' }}>
                              {item.challanNo}
                            </td>
                            <td style={{ padding: "16px", verticalAlign: "middle", fontSize: "12px", color: "#4B5563", fontWeight: '400' }}>
                              {formatDate(item.issueDate)}
                            </td>
                            <td style={{ padding: "16px", verticalAlign: "middle", fontSize: "12px", color: "#4B5563", fontWeight: '400' }}>
                              {formatCurrency(item.amount)}
                            </td>
                            <td style={{ padding: "16px", verticalAlign: "middle" }}>
                              <div className="d-flex align-items-center">
                                <div
                                  style={{
                                    width: "8px",
                                    height: "8px",
                                    borderRadius: "50%",
                                    backgroundColor: "#D92D20", // Red for pending status
                                    marginRight: "8px"
                                  }}
                                ></div>
                                <span style={{ fontSize: "14px", color: "#1C222E", fontWeight: '500' }}>{item.status}</span>
                              </div>
                            </td>
                            <td style={{ padding: "16px", verticalAlign: "middle" }}>
                              <Button
                                onClick={() => openReminderModal(item)}
                                disabled={item.action === "Sent"}
                                style={{
                                  backgroundColor: "transparent",
                                  border: "1px solid #F04438",
                                  borderRadius: "20px",
                                  padding: "6px 16px",
                                  fontSize: "14px",
                                  fontWeight: "500",
                                  color: item.action === "Sent" ? "#6B7280" : "#F04438",
                                  borderColor: item.action === "Sent" ? "#D1D5DB" : "#F04438",
                                  display: "inline-block",
                                  minWidth: "100px",
                                  textAlign: "center"
                                }}
                              >
                                {item.action}
                              </Button>
                            </td>
                            <td style={{ padding: "16px", verticalAlign: "middle", textAlign: "center" }}>
                              <Button
                                style={{
                                  backgroundColor: "#9747FF",
                                  border: "none",
                                  borderRadius: "20px",
                                  padding: "6px 16px",
                                  fontSize: "14px",
                                  fontWeight: "500",
                                  color: "#FFFFFF",
                                  display: "inline-block",
                                  width: "100px",
                                  textAlign: "center"
                                }}
                                onClick={() => viewStudentDetails(item.id)}
                              >
                                View
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* Reminder Modal */}
        <Modal show={showReminderModal} onHide={() => setShowReminderModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Send Fee Reminder</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {reminderSuccess ? (
              <Alert variant="success">
                Reminder sent successfully to {selectedStudent?.name}!
              </Alert>
            ) : (
              <>
                {selectedStudent && (
                  <div>
                    <p>You are about to send a fee reminder to:</p>
                    <div className="d-flex align-items-center mb-3">
                      <img
                        src={selectedStudent.avatar}
                        alt={selectedStudent.name}
                        style={{ width: "48px", height: "48px", borderRadius: "50%", marginRight: "16px" }}
                      />
                      <div>
                        <h5 style={{ margin: 0, fontSize: "16px" }}>{selectedStudent.name}</h5>
                        <div style={{ fontSize: "14px", color: "#6B7280" }}>Challan No: {selectedStudent.challanNo}</div>
                        <div style={{ fontSize: "14px", color: "#6B7280" }}>Amount: {formatCurrency(selectedStudent.amount)} Rs</div>
                      </div>
                    </div>
                    <Form.Group className="mb-3">
                      <Form.Label>Message (Optional)</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Add a custom message to the reminder..."
                      />
                    </Form.Group>
                  </div>
                )}
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            {!reminderSuccess && (
              <>
                <Button variant="secondary" onClick={() => setShowReminderModal(false)}>
                  Cancel
                </Button>
                <Button 
                  variant="danger" 
                  onClick={sendReminder}
                  disabled={sendingReminder}
                >
                  {sendingReminder ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="me-2"
                      />
                      Sending...
                    </>
                  ) : (
                    "Send Reminder"
                  )}
                </Button>
              </>
            )}
          </Modal.Footer>
        </Modal>

        {/* CSS for making elements responsive */}
        <style jsx="true">{`
          @media (max-width: 767.98px) {
            .responsive-text {
              font-size: 20px !important;
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

          .custom-tabs {
            border-bottom: 1px solid #EAECF0;
          }

          .active-tab {
            color: #9747FF !important;
            border-bottom: 2px solid #9747FF !important;
          }
        `}</style>
      </main>
    </Container>
  );
}

export default FeesPending;