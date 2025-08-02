import React, { useState, useEffect, useCallback, useContext } from "react";
import { Container, Button, Form, Table, Row, Col, Card, Modal, Spinner, Alert, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from './UserContext.js';


// API service for fees
const feesService = {
  // Base URL for API calls - replace with your actual API endpoint
  baseURL: "https://api.yourdomain.com/api",

  // Get unpaid students
  getUnpaidStudents: async (department, date) => {
    try {
      // In a real app, you would use these parameters in your API call
      const params = new URLSearchParams();
      params.append('department', department);
      if (date) {
        params.append('date', date.toISOString());
      }

      const response = await fetch(`${feesService.baseURL}/unpaid-students?${params.toString()}`);

      if (!response.ok) {
        throw new Error('Failed to fetch unpaid students');
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching unpaid students:", error);
      throw error;
    }
  },

  // Get fee summary
  getFeeSummary: async (department, date) => {
    try {
      const params = new URLSearchParams();
      params.append('department', department);
      if (date) {
        params.append('date', date.toISOString());
      }

      const response = await fetch(`${feesService.baseURL}/fee-summary?${params.toString()}`);

      if (!response.ok) {
        throw new Error('Failed to fetch fee summary');
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching fee summary:", error);
      throw error;
    }
  },

  // Send reminder to student
  sendReminder: async (studentId) => {
    try {
      const response = await fetch(`${feesService.baseURL}/send-reminder`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ studentId })
      });

      if (!response.ok) {
        throw new Error('Failed to send reminder');
      }

      return await response.json();
    } catch (error) {
      console.error("Error sending reminder:", error);
      throw error;
    }
  }
};

// Mock data for development/demo purposes
const MOCK_DATA = {
  unpaidStudents: [
    {
      id: 1,
      name: "John Smith",
      challanNo: "4589621420",
      issueDate: "2024-09-25",
      deadLine: "2024-10-25",
      amount: "37000",
      status: "Pending",
      action: "Reminder",
      avatar: "/assets/avatar1.png"
    },
    {
      id: 2,
      name: "Emma Johnson",
      challanNo: "4589621421",
      issueDate: "2024-07-18",
      deadLine: "2024-08-18",
      amount: "40000",
      status: "Pending",
      action: "Sent",
      avatar: "/assets/avatar2.png"
    },
    {
      id: 3,
      name: "Michael Brown",
      challanNo: "4589621422",
      issueDate: "2024-06-18",
      deadLine: "2024-07-18",
      amount: "39000",
      status: "Pending",
      action: "Reminder",
      avatar: "/assets/avatar3.png"
    },
    {
      id: 4,
      name: "Sarah Davis",
      challanNo: "4589621423",
      issueDate: "2024-02-19",
      deadLine: "2024-03-19",
      amount: "45000",
      status: "Pending",
      action: "Reminder",
      avatar: "/assets/avatar4.png"
    },
    {
      id: 5,
      name: "David Wilson",
      challanNo: "4589621424",
      issueDate: "2024-01-12",
      deadLine: "2024-02-12",
      amount: "38000",
      status: "Pending",
      action: "Reminder",
      avatar: "/assets/avatar5.png"
    }
  ],
  feeSummary: {
    collected: {
      totalFees: "45000",
      totalFine: "15000",
      totalPayment: "60000"
    },
    pending: {
      totalFees: "45000",
      totalFine: "3000",
      totalPayment: "48000"
    }
  }
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

function Fees() {
          const { userData } = useContext(UserContext);

  const navigate = useNavigate();

  // State variables
  const [searchText, setSearchText] = useState("");
  const [department, setDepartment] = useState("Department of Computer Science");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [unpaidStudents, setUnpaidStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [feeSummary, setFeeSummary] = useState({
    collected: { totalFees: "0", totalFine: "0", totalPayment: "0" },
    pending: { totalFees: "0", totalFine: "0", totalPayment: "0" }
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [sendingReminder, setSendingReminder] = useState(false);
  const [reminderSuccess, setReminderSuccess] = useState(false);
  const [sortOption, setSortOption] = useState("default");

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
        // Set unpaid students
        setUnpaidStudents(MOCK_DATA.unpaidStudents);
        setFilteredStudents(MOCK_DATA.unpaidStudents);

        // Set fee summary
        setFeeSummary(MOCK_DATA.feeSummary);

        setIsLoading(false);
      }, 1000);

      // In a real app, you would use:
      // const unpaidStudentsData = await feesService.getUnpaidStudents(department, selectedDate);
      // setUnpaidStudents(unpaidStudentsData);
      // setFilteredStudents(unpaidStudentsData);

      // const feeSummaryData = await feesService.getFeeSummary(department, selectedDate);
      // setFeeSummary(feeSummaryData);
    } catch (err) {
      setError("Failed to load data. Please try again later.");
      setIsLoading(false);
    }
  }, [department, selectedDate]);

  // Initialize data on component mount and when filters change
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Filter students based on search text
  useEffect(() => {
    if (searchText.trim() === "") {
      setFilteredStudents(unpaidStudents);
    } else {
      const filtered = unpaidStudents.filter(
        (student) =>
          student.name.toLowerCase().includes(searchText.toLowerCase()) ||
          student.challanNo.includes(searchText)
      );
      setFilteredStudents(filtered);
    }
  }, [searchText, unpaidStudents]);

  // Handle department change
  const handleDepartmentChange = (dept) => {
    setDepartment(dept);
  };

  // Handle date selection
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowDatePicker(false);
  };

  // Handle sort
  const handleSort = (option) => {
    setSortOption(option);

    let sorted = [...filteredStudents];

    switch (option) {
      case "amount-asc":
        sorted.sort((a, b) =>
          parseInt(a.amount.replace(/,/g, "")) - parseInt(b.amount.replace(/,/g, ""))
        );
        break;
      case "amount-desc":
        sorted.sort((a, b) =>
          parseInt(b.amount.replace(/,/g, "")) - parseInt(a.amount.replace(/,/g, ""))
        );
        break;
      case "date-asc":
        sorted.sort((a, b) => new Date(a.deadLine) - new Date(b.deadLine));
        break;
      case "date-desc":
        sorted.sort((a, b) => new Date(b.deadLine) - new Date(a.deadLine));
        break;
      default:
        // Default order (no sorting)
        sorted = [...unpaidStudents].filter(student =>
          student.name.toLowerCase().includes(searchText.toLowerCase()) ||
          student.challanNo.includes(searchText)
        );
    }

    setFilteredStudents(sorted);
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
      // await feesService.sendReminder(selectedStudent.id);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Update the local state to reflect the change
      const updatedStudents = unpaidStudents.map(student => {
        if (student.id === selectedStudent.id) {
          return { ...student, action: "Sent" };
        }
        return student;
      });

      setUnpaidStudents(updatedStudents);

      // Also update the filtered students
      setFilteredStudents(prevFiltered =>
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

  // Navigate to student details
  const viewStudentDetails = (studentId) => {
    navigate(`/student-fees/${studentId}`);
  };

  // Refresh data
  const refreshData = () => {
    fetchData();
  };

  return (
    <Container fluid className="p-0 d-flex">
      <main className="flex-grow-1 p-3">
        {/* Header Section */}
        <header
          className="d-flex flex-wrap justify-content-between align-items-center  mb-3 w-100"
          style={{ paddingTop: "0px" }}
        >
          <div className="d-flex align-items-center mb-2 mb-md-0">
            <h1 style={{ fontSize: "24px", margin: 0, fontWeight: "600" }}>Fees</h1>
          </div>
           <div id='user-info' style={{ display: 'flex', alignItems: 'center' }}>
                        {/* User Info */}
                        <img
                            id='info-img'
                           src={userData?.profile_pic || "/assets/avatar.jpeg"} // Replace with your image path
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
                            <div style={{ fontSize: '12px', color: '#6c757d' }}>{userData?.admin_id}</div>
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
            <div
              className="d-flex align-items-center"
              style={{
                border: "1px solid #EAECF0",
                borderRadius: "8px",
                padding: "8px 12px",
                backgroundColor: "white",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  fontWeight: 500,
                  fontSize: "14px",
                  color: "#111827",
                  backgroundColor: "transparent",
                  outline: "none",
                }}
              >
                Department of Computer Science
              </div>
            </div>


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

            {/* <Button 
              variant="outline-secondary"
              onClick={refreshData}
              style={{
                border: "1px solid #EAECF0",
                borderRadius: "8px",
                padding: "8px 12px"
              }}
            >
              <i className="bi bi-arrow-clockwise"></i> Refresh
            </Button> */}
          </div>

          <div className="position-relative mb-2 mb-md-0">
            <Form.Control
              type="text"
              placeholder="Search by name or challan number"
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

        {/* Loading indicator */}
        {isLoading ? (
          <div className="d-flex justify-content-center my-5">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <>
            {/* Fee Summary Cards */}
            <Row className="mb-4">
              {/* Fees Collected Card */}
              <Col xs={12} md={6} className="mb-3 px-2">
                <Card
                  style={{
                    border: "1px solid #EAECF0",
                    borderRadius: "12px",
                    backgroundColor: "#FFFFFF",
                    height: "100%"
                  }}
                >
                  <Card.Body style={{ padding: "18px" }}>
                    <h3 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "16px", color: '#000' }}>Fees Collected</h3>

                    <div className="mb-3">
                      <div style={{ fontSize: "14px", color: "#000", marginBottom: "4px", fontWeight: '500' }}>Fees</div>
                      <div style={{ fontSize: "14px", color: "#4B5563", marginBottom: "4px", fontWeight: '400' }}>Total Fees (Paid)</div>
                      <div style={{ fontSize: "24px", fontWeight: "500", color: "#111827" }}>
                        {formatCurrency(feeSummary.collected.totalFees)} <span style={{ fontSize: "14px", fontWeight: "400", color: '#4B5563' }}>Rs</span>
                      </div>
                    </div>
                    <div style={{ borderTop: '1px solid #EAECF0', marginBottom: '10px' }}></div>

                    <div className="mb-3">
                      <div style={{ fontSize: "14px", color: "#000", marginBottom: "4px", fontWeight: '500' }}>Fine</div>
                      <div style={{ fontSize: "14px", color: "#6B7280", marginBottom: "4px", fontWeight: '400', color: '#4B5563' }}>Total Fine (Paid)</div>
                      <div style={{ fontSize: "24px", fontWeight: "500", color: "#111827" }}>
                        {formatCurrency(feeSummary.collected.totalFine)} <span style={{ fontSize: "14px", fontWeight: "400", color: '#4B5563' }}>Rs</span>
                      </div>
                    </div>
                    <div style={{ borderTop: '1px solid #EAECF0', marginBottom: '10px' }}></div>

                    <div className="mb-3 d-flex justify-content-between align-items-center">
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <div style={{ fontSize: "14px", fontWeight: '500', color: "#000", marginBottom: "4px" }}>Total Payment</div>
                        <div style={{ fontSize: "14px", fontWeight: "500", color: "#6B7280" }}>
                          {formatCurrency(feeSummary.collected.totalPayment)} Rs
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Button
                        onClick={() => navigate("/fees-collected")}
                        style={{
                          backgroundColor: "#9747FF",
                          border: "none",
                          borderRadius: "12px",
                          padding: "10px 32px",
                          fontWeight: "500",
                          fontSize: "14px"
                        }}
                      >
                        View
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              {/* Pending Payment Card */}
              <Col xs={12} md={6} className="mb-3 px-2">
                <Card
                  style={{
                    border: "1px solid #EAECF0",
                    borderRadius: "12px",
                    backgroundColor: "#FFFFFF",
                    height: "100%"
                  }}
                >
                  <Card.Body style={{ padding: "18px" }}>
                    <h3 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "16px", color: '#000' }}>Pending Payment</h3>

                    <div className="mb-3">
                      <div style={{ fontSize: "14px", color: "#000", marginBottom: "4px", fontWeight: '500' }}>Fees</div>
                      <div style={{ fontSize: "14px", color: "#4B5563", marginBottom: "4px", fontWeight: '400' }}>Total Fees (Unpaid)</div>
                      <div style={{ fontSize: "24px", fontWeight: "500", color: "#111827" }}>
                        {formatCurrency(feeSummary.pending.totalFees)} <span style={{ fontSize: "14px", fontWeight: "400", color: '#4B5563' }}>Rs</span>
                      </div>
                    </div>
                    <div style={{ borderTop: '1px solid #EAECF0', marginBottom: '10px' }}></div>

                    <div className="mb-3">
                      <div style={{ fontSize: "14px", color: "#000", marginBottom: "4px", fontWeight: '500' }}>Fine</div>
                      <div style={{ fontSize: "14px", color: "#6B7280", marginBottom: "4px", fontWeight: '400', color: '#4B5563' }}>Total Fine (Unpaid)</div>
                      <div style={{ fontSize: "24px", fontWeight: "500", color: "#111827" }}>
                        {formatCurrency(feeSummary.pending.totalFine)} <span style={{ fontSize: "14px", fontWeight: "400", color: '#4B5563' }}>Rs</span>
                      </div>
                    </div>
                    <div style={{ borderTop: '1px solid #EAECF0', marginBottom: '10px' }}></div>

                    <div className="mb-3 d-flex justify-content-between align-items-center">
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <div style={{ fontSize: "14px", fontWeight: '500', color: "#000", marginBottom: "4px" }}>Total Payment</div>
                        <div style={{ fontSize: "14px", fontWeight: "500", color: "#6B7280" }}>
                          {formatCurrency(feeSummary.pending.totalPayment)} Rs
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Button
                        onClick={() => navigate("/fees-pending")}
                        style={{
                          backgroundColor: "#9747FF",
                          border: "none",
                          borderRadius: "12px",
                          padding: "10px 32px",
                          fontWeight: "500",
                          fontSize: "14px"
                        }}
                      >
                        View
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* Top Unpaid Students Table */}
            <div
              style={{
                width: "100%",
                marginTop: "20px",
              }}
            >
              {/* Table Header */}
              <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
                <h2 style={{ fontSize: "20px", fontWeight: "500", margin: "0" }}>
                  Top Unpaid Students
                  <span className="ms-2 badge bg-secondary">{filteredStudents.length}</span>
                </h2>
                <Dropdown>
                  <Dropdown.Toggle
                    variant="light"
                    id="dropdown-sort"
                    style={{
                      color: "#111827",
                      textDecoration: "none",
                      padding: "8px 14px",
                      fontWeight: "600",
                      gap: '6px',
                      border: '1px solid #EAECF0',
                      borderRadius: '8px',
                      fontSize: '14px'
                    }}
                  >
                    <img src="/assets/filter-lines.png" alt="Sort" width={20} height={20} className="me-2" />
                    Sort
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() => handleSort("default")}
                      active={sortOption === "default"}
                    >
                      Default
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => handleSort("amount-asc")}
                      active={sortOption === "amount-asc"}
                    >
                      Amount (Low to High)
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => handleSort("amount-desc")}
                      active={sortOption === "amount-desc"}
                    >
                      Amount (High to Low)
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => handleSort("date-asc")}
                      active={sortOption === "date-asc"}
                    >
                      Deadline (Oldest First)
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => handleSort("date-desc")}
                      active={sortOption === "date-desc"}
                    >
                      Deadline (Newest First)
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>

              {/* Students Table */}
              <div
                style={{
                  border: "1px solid #EAECF0",
                  borderRadius: "12px",
                  overflow: "hidden"
                }}
              >
                {filteredStudents.length === 0 ? (
                  <div className="text-center py-5">
                    <p>No unpaid students found with the current filters.</p>
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
                            Challan no
                          </th>
                          <th style={{ padding: "16px 16px", fontSize: "16px", fontWeight: "500", color: "#111827" }}>
                            Issue Date
                          </th>
                          <th style={{ padding: "16px 16px", fontSize: "16px", fontWeight: "500", color: "#111827" }}>
                            Dead line
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
                        {filteredStudents.map((student) => (
                          <tr key={student.id} style={{ borderBottom: "1px solid #EAECF0" }}>
                            <td style={{ padding: "16px", verticalAlign: "middle" }}>
                              <div className="d-flex align-items-center">
                                <img
                                  src={student.avatar}
                                  alt={student.name}
                                  style={{ width: "36px", height: "36px", borderRadius: "50%", marginRight: "12px" }}
                                />
                                <span style={{ fontSize: "14px", color: "#101828", fontWeight: '500' }}>{student.name}</span>
                              </div>
                            </td>
                            <td style={{ padding: "16px", verticalAlign: "middle", fontSize: "12px", color: "#4B5563", fontWeight: '400' }}>
                              {student.challanNo}
                            </td>
                            <td style={{ padding: "16px", verticalAlign: "middle", fontSize: "12px", color: "#4B5563", fontWeight: '400' }}>
                              {formatDate(student.issueDate)}
                            </td>
                            <td style={{ padding: "16px", verticalAlign: "middle", fontSize: "12px", color: "#4B5563", fontWeight: '400' }}>
                              {formatDate(student.deadLine)}
                            </td>
                            <td style={{ padding: "16px", verticalAlign: "middle", fontSize: "12px", color: "#4B5563", fontWeight: '400' }}>
                              {formatCurrency(student.amount)}
                            </td>
                            <td style={{ padding: "16px", verticalAlign: "middle" }}>
                              <div className="d-flex align-items-center">
                                <div
                                  style={{
                                    width: "8px",
                                    height: "8px",
                                    borderRadius: "50%",
                                    backgroundColor: "#D92D20",
                                    marginRight: "8px"
                                  }}
                                ></div>
                                <span style={{ fontSize: "14px", color: "#1C222E", fontWeight: '500' }}>{student.status}</span>
                              </div>
                            </td>
                            <td style={{ padding: "16px", verticalAlign: "middle" }}>
                              <Button
                                onClick={() => openReminderModal(student)}
                                disabled={student.action === "Sent"}
                                style={{
                                  backgroundColor: "transparent",
                                  border: "1px solid #F04438",
                                  borderRadius: "20px",
                                  padding: "6px 16px",
                                  fontSize: "14px",
                                  fontWeight: "500",
                                  color: student.action === "Sent" ? "#6B7280" : "#F04438",
                                  borderColor: student.action === "Sent" ? "#D1D5DB" : "#F04438",
                                  display: "inline-block",
                                  width: "100px",
                                  textAlign: "center"
                                }}
                              >
                                {student.action}
                              </Button>
                            </td>
                            <td style={{ padding: "16px", verticalAlign: "middle", textAlign: "center" }}>
                              <div
                                style={{
                                  textAlign: "center",
                                  cursor: "pointer"
                                }}
                                onClick={() => viewStudentDetails(student.id)}
                              >
                                <img
                                  src="/assets/view-btn.png"
                                  alt="View"
                                  style={{ width: "24px", height: "24px" }}
                                />
                              </div>
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
        `}</style>
      </main>
    </Container>
  );
}

export default Fees;