import React, { useState, useEffect, useContext } from "react";
import { Container, Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";


function Quizzes() {
  const { userData } = useContext(UserContext);
  const [activeFilter, setActiveFilter] = useState("Upcoming");
  const [tableData, setTableData] = useState({});
  const navigate = useNavigate();


  useEffect(() => {
    const demoData = {
      Upcoming: [...Array(5)].map((_, i) => ({
        id: i + 1,
        name: "Demo Quizzes Name",
        date: "25-Sep-2024",
        subject: ["English", "Programming", "OOP", "Data Science", "AI"][i],
        type: i % 2 === 0 ? "MCQS" : "Written",
        status: i % 2 === 0 ? "Online" : "Practically",
      })),
      Overdue: [...Array(5)].map((_, i) => ({
        id: i + 1,
        name: "Demo Quizzes Name",
        date: "25-Sep-2024",
        subject: ["English", "Programming", "OOP", "Data Science", "AI"][i],
        type: i % 2 === 0 ? "MCQS" : "Written",
        status: "Overdue",
      })),
      Submitted: [...Array(5)].map((_, i) => ({
        id: i + 1,
        name: "Demo Quizzes Name",
        date: "25-Sep-2024",
        subject: ["English", "Programming", "OOP", "Data Science", "AI"][i],
        type: i % 2 === 0 ? "MCQS" : "Written",
        status: "Submitted",
      })),
    };
    setTableData(demoData);
  }, []);

  const getStatusTag = (status) => {
    let dotColor = "#12B76A";
    if (status === "Practically") dotColor = "#F79009";
    if (status === "Overdue") dotColor = "#D92D20";
    if (status === "Submitted") dotColor = "#12B76A";

    return (
      <span style={{ fontWeight: "500", fontSize: "14px", display: "flex", alignItems: "center", gap: "6px",  }}>
        <span
          style={{
            display: "inline-block",
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: dotColor,
          }}
        ></span>
        {status}
      </span>
    );
  };

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

  return (
    <Container fluid className="p-0">
      <header className="d-flex justify-content-end align-items-center p-3 mb-3">
        <div className="d-flex align-items-center">
          <img
            src={userData?.profile_pic || "/assets/avatar.jpeg"}
            alt="User"
            className="rounded-circle me-2"
            style={{ width: "54px", height: "54px" }}
          />
          <div className="me-2">
            <div style={{ fontWeight: "500", fontSize: "14px",  }}>{userData?.full_name}</div>
            <div style={{ fontSize: "12px", color: "#6c757d",  }}>{userData?.admin_id}</div>
          </div>
          <button className="bg-transparent border-0">
            <img src="/assets/arrow-down.png" alt="Dropdown" style={{ width: "12px", height: "12px" }} />
          </button>
        </div>
      </header>

      <div className="px-3">
        <div className="border p-3" style={{ minHeight: "750px", border: '1px solid #EAECF0', borderRadius: '12px' }}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="m-0" style={{ fontSize: "20px", fontWeight: "600", color: '#111827',  }}>
              Quizzes
            </h4>
            <Button
              variant="outline-secondary"
              className="d-flex align-items-center"
              style={{ fontWeight: "600", fontSize: "14px", color: "#374151",  }}
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

          <div className="d-flex gap-2 mb-3 flex-wrap">
            {Object.keys(tableData).map((label) => (
              <Button
                key={label}
                style={
                  activeFilter === label ? { ...buttonStyle, ...activeButtonStyle } : buttonStyle
                }
                onClick={() => setActiveFilter(label)}
              >
                {label}
              </Button>
            ))}
          </div>

          <div style={{ maxHeight: "640px", overflowY: "auto", overflowX: "auto", width: "100%" }}>
            <Table
              hover
              responsive
              className="mb-0"
              style={{ color: "#111827",  fontSize: "16px", fontWeight: "500" }}
            >
              <thead style={{ position: "sticky", top: 0, background: "#FFFFFF", zIndex: 1 }}>
                <tr>
                  <th>Sr No.</th>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Subject</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tableData[activeFilter]?.map((row, index) => (
                  <tr
                    key={index}
                    style={{ borderBottom: "1px solid #E5E7EB", height: "64px" }}
                  >
                    <td style={{ color: "#4B5563",  fontSize: "14px", fontWeight: "400", verticalAlign: "middle" }}>{index + 1}</td>
                    <td style={{ color: "#4B5563",  fontSize: "14px", fontWeight: "400", verticalAlign: "middle" }}>{row.name}</td>
                    <td style={{ color: "#4B5563",  fontSize: "14px", fontWeight: "400", verticalAlign: "middle" }}>{row.date}</td>
                    <td style={{ color: "#4B5563",  fontSize: "14px", fontWeight: "400", verticalAlign: "middle" }}>{row.subject}</td>
                    <td style={{ color: "#4B5563",  fontSize: "14px", fontWeight: "400", verticalAlign: "middle" }}>{row.type}</td>
                    <td style={{ verticalAlign: "middle" }}>{getStatusTag(row.status)}</td>
                    <td style={{ verticalAlign: "middle" }}>
                    <Button
  onClick={() => navigate(`/quiz/${row.id}`)}
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
        </div>
      </div>
    </Container>
  );
}

export default Quizzes;