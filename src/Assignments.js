import React, { useState, useEffect } from "react";
import { Container, Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './Dashboard.css';

function Assignments() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("Upcoming");
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const today = new Date();

    const baseAssignments = [
      {
        id: 1,
        name: "Demo Assignment Name",
        teacher: "Munneb-ur-Rehman",
        dueDate: "2024-09-25",
        subject: "English",
        status: "Submitted",
      },
      {
        id: 2,
        name: "Demo Assignment Name",
        teacher: "Muhammad Uzair",
        dueDate: "2024-07-18",
        subject: "Computer",
        status: "Not Submitted",
      },
      {
        id: 3,
        name: "Demo Assignment Name",
        teacher: "Akram Husain",
        dueDate: "2024-06-18",
        subject: "FC",
        status: "Submitted",
      },
      {
        id: 4,
        name: "Demo Assignment Name",
        teacher: "Owais Sahil",
        dueDate: "2024-02-19",
        subject: "Commerce",
        status: "Not Submitted",
      },
      {
        id: 5,
        name: "Demo Assignment Name",
        teacher: "Ahmad Saleem",
        dueDate: "2024-01-12",
        subject: "Stats",
        status: "Submitted",
      },
    ];

    const upcomingDemo = Array.from({ length: 10 }).map((_, i) => ({
      id: 6 + i,
      name: "Demo Assignment Name",
      teacher: `Teacher ${i + 1}`,
      dueDate: new Date(today.getTime() + (5 + i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      subject: `Subject ${(i % 5) + 1}`,
      status: i % 2 === 0 ? "Submitted" : "Not Submitted",
    }));

    const combinedData = [...baseAssignments, ...upcomingDemo];

    const formatted = combinedData.map((item) => {
      const isSubmitted = item.status === "Submitted";
      const due = new Date(item.dueDate);
      const isOverdue = !isSubmitted && due < today;
      const isUpcoming = !isSubmitted && due >= today;

      return {
        ...item,
        category: isSubmitted ? "Submitted" : isOverdue ? "Overdue" : "Upcoming",
      };
    });

    setTableData(formatted);
  }, []);

  const getStatusTag = (status) => {
    const isSubmitted = status === "Submitted";
    const dotColor = isSubmitted ? "#22c55e" : "#ef4444"; // green / red

    return (
      <span style={{ fontWeight: "500", fontSize: "14px", display: "flex", alignItems: "center", gap: "6px" }}>
        <span
          style={{
            display: "inline-block",
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: dotColor,
          }}
        ></span>
        {status}
      </span>
    );
  };

  const handleViewClick = (id) => navigate(`/assignments/details/${id}`);

  const buttonStyle = {
    borderRadius: "8px",
    color: "#111827",
    fontSize: "14px",
    fontWeight: "600",
    border: "1px solid #EAECF0",
    backgroundColor: "transparent",
    padding: "10px 16px",
  };

  const activeButtonStyle = {
    backgroundColor: "black",
    color: "#F2F4F7",
  };

  const filteredRows = tableData.filter((row) => row.category === activeFilter);

  return (
    <Container fluid className="p-0">
      {/* Header Section */}
      <header className="d-flex justify-content-end align-items-center p-3 mb-3" >
        <div className="d-flex align-items-center">
          <img
            src="/assets/avatar.jpeg"
            alt="User"
            className="rounded-circle me-2"
            style={{ width: "54px", height: "54px" }}
          />
          <div className="me-2">
            <div style={{ fontWeight: "500", fontSize: "14px" }}>Jhon Deo</div>
            <div style={{ fontSize: "12px", color: "#6c757d" }}>123456</div>
          </div>
          <button className="bg-transparent border-0">
            <img
              src="/assets/arrow-down.png"
              alt="Dropdown"
              style={{ width: "12px", height: "12px" }}
            />
          </button>
        </div>
      </header>

      {/* Assignment Table Section */}
      <div className="px-3">
        <div className="border p-3" style={{ minHeight: "750px", border: '1px solid #EAECF0', borderRadius: '12px' }}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="m-0" style={{ fontSize: "20px", fontWeight: "600", color: '#111827' }}>
              Assignments
            </h4>
            <Button
              variant="outline-secondary"
              className="d-flex align-items-center"
              style={{ fontWeight: "600", fontSize: "14px", color: "#374151" }}
            >
              <img
                src="/assets/filter-lines.png"
                alt="Sort"
                className="me-2"
                style={{ width: "20px", height: "20px" }}
              />
              Sort
            </Button>
          </div>

          {/* Filter Buttons */}
          <div className="d-flex gap-2 mb-3 flex-wrap">
            {["Upcoming", "Overdue", "Submitted"].map((label) => (
              <Button
                key={label}
                style={
                  activeFilter === label
                    ? { ...buttonStyle, ...activeButtonStyle }
                    : buttonStyle
                }
                onClick={() => setActiveFilter(label)}
              >
                {label} ({tableData.filter((r) => r.category === label).length})
              </Button>
            ))}
          </div>

          {/* Table */}
          <div
            style={{
              maxHeight: "640px",
              overflowY: "auto",
              overflowX: "auto",
              width: "100%",
            }}
          >
            <Table
              hover
              responsive
              className="mb-0"
              style={{
                color: "#111827",
                fontSize: "16px",
                fontWeight: "500",
              }}
            >
              <thead
                style={{
                  position: "sticky",
                  top: 0,
                  background: "#FFFFFF",
                  zIndex: 1,
                  fontSize: '16px', fontWeight: '500', color: '#111827'
                }}
              >
                <tr>
                  <th>Sr No.</th>
                  <th>Name</th>
                  <th>Teacher</th>
                  <th>Due Date</th>
                  <th>Subject</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row, index) => (
                  <tr
                    key={row.id}
                    style={{
                      borderBottom: "1px solid #E5E7EB",
                      height: "64px",
                    }}
                  >
                    <td
                      style={{
                        color: "#4B5563",
                        fontSize: "14px",
                        fontWeight: "400",
                        verticalAlign: "middle",
                      }}
                    >
                      {index + 1}
                    </td>
                    <td
                      style={{
                        color: "#4B5563",
                        fontSize: "14px",
                        fontWeight: "400",
                        verticalAlign: "middle",
                      }}
                    >
                      {row.name}
                    </td>
                    <td
                      style={{
                        color: "#4B5563",
                        fontSize: "14px",
                        fontWeight: "400",
                        verticalAlign: "middle",
                      }}
                    >
                      {row.teacher}
                    </td>
                    <td
                      style={{
                        color: "#4B5563",
                        fontSize: "14px",
                        fontWeight: "400",
                        verticalAlign: "middle",
                      }}
                    >
                      {new Date(row.dueDate).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td
                      style={{
                        color: "#4B5563",
                        fontSize: "14px",
                        fontWeight: "400",
                        verticalAlign: "middle",
                      }}
                    >
                      {row.subject}
                    </td>
                    <td
                      style={{
                        color: "#1C222E",
                        fontSize: "14px",
                        fontWeight: "500",
                        lineHeight: "21px",
                        verticalAlign: "middle",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          backgroundColor:
                            row.status === "Submitted" ? "#12B76A" : "#D92D20",
                          marginRight: "8px",
                        }}
                      ></span>
                      {row.status}
                    </td>
                    <td style={{ verticalAlign: "middle" }}>
                      <Button
                        onClick={() => handleViewClick(row.id)}
                        style={{
                          color: "#FFF",
                          fontSize: "14px",
                          fontWeight: "500",
                          lineHeight: "normal",
                          borderRadius: "100px",
                          backgroundColor: "#9747FF",
                          padding: "10px 20px",
                          border: "none",
                          width: "90px",
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

          {/* Mobile Styles */}
          <style>
            {`
             @media (max-width: 767px) {
  /* Header spacing and alignment */
  header {
    flex-direction: column;
    align-items: flex-start !important;
    gap: 12px;
  }

  /* Filter button stack */
  .d-flex.gap-2.mb-3.flex-wrap {
    flex-direction: column;
    gap: 8px !important;
  }

  /* Table container scrolling */
  .table-responsive {
    overflow-x: auto;
  }

  table thead {
    font-size: 13px !important;
  }

  table tbody {
    font-size: 13px !important;
  }

  .table th,
  .table td {
    padding: 10px !important;
    white-space: nowrap;
    text-align: left;
    vertical-align: middle !important;
  }

  /* Button scaling */
  .btn {
    font-size: 13px !important;
    padding: 8px 12px !important;
  }

  /* Adjust View button width */
  .btn[style*="width: 90px"] {
    width: 80px !important;
    padding: 8px 16px !important;
  }

  /* Assignment container spacing */
  .px-3 {
    padding-left: 12px !important;
    padding-right: 12px !important;
  }

  /* Header user info */
  header img.rounded-circle {
    width: 48px !important;
    height: 48px !important;
  }

  header div.me-2 > div:first-child {
    font-size: 13px !important;
  }

  header div.me-2 > div:last-child {
    font-size: 11px !important;
  }

  /* Sort button adjustments */
  .btn-outline-secondary {
    font-size: 13px !important;
    padding: 6px 12px !important;
  }

  .btn-outline-secondary img {
    width: 16px !important;
    height: 16px !important;
  }
    
}

            `}
          </style>
        </div>
      </div>
    </Container>
  );
}

export default Assignments;
