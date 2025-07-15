import React, { useState } from 'react';

const FeesManagement = () => {
    // State for selected filters
    const [department, setDepartment] = useState("Department of Computer Science");
    const [semester, setSemester] = useState("Semester 2");
    const [searchText, setSearchText] = useState("");
    const [showDepartmentDropdown, setShowDepartmentDropdown] = useState(false);
    const [showSemesterDropdown, setShowSemesterDropdown] = useState(false);

    // Fee data structure
    const feesData = [
        {
            id: 1,
            icon: "/assets/12.png",
            amount: "$1300",
            label: "Monthly Fees",
            color: "#9747FF"
        },
        {
            id: 2,
            icon: "/assets/12.png",
            amount: "$11300",
            label: "Yearly Fees",
            color: "#FF4747"
        },
        {
            id: 3,
            icon: "/assets/12.png",
            amount: "$100",
            label: "Yearly Fees",
            color: "#47FFB9"
        },
        {
            id: 4,
            icon: "/assets/12.png",
            amount: "$100",
            label: "Late Fees",
            color: "#479DFF"
        },
        {
            id: 5,
            icon: "/assets/12.png",
            amount: "$1100",
            label: "Admission Fees",
            color: "#7347FF"
        },
        {
            id: 6,
            icon: "/assets/12.png",
            amount: "$200",
            label: "Paper Fund",
            color: "#B9FF47"
        },
        {
            id: 7,
            icon: "/assets/12.png",
            amount: "$100",
            label: "Tex Fees",
            color: "#FF47C9"
        },
        {
            id: 8,
            icon: "/assets/12.png",
            amount: "$400",
            label: "Event Fees",
            color: "#B447FF"
        },
        {
            id: 9,
            icon: "/assets/12.png",
            amount: "$400",
            label: "Book fees",
            color: "#47B2FF"
        },
        {
            id: 10,
            icon: "/assets/12.png",
            amount: "$100",
            label: "Tex fees",
            color: "#47FFCD"
        },
        {
            id: 11,
            icon: "/assets/12.png",
            amount: "$100",
            label: "Tex fees",
            color: "#FFFF47"
        },
        {
            id: 12,
            icon: "/assets/12.png",
            amount: "$700",
            label: "Year Event",
            color: "#FF4792"
        },
        {
            id: 13,
            icon: "/assets/12.png",
            amount: "$400",
            label: "Event",
            color: "#8447FF"
        }
    ];

    // Available departments and semesters for dropdown
    const departments = [
        "Department of Computer Science",
        "Department of Physics",
        "Department of Mathematics",
        "Department of Chemistry",
        "Department of Biology"
    ];

    const semesters = [
        "Semester 1",
        "Semester 2",
        "Semester 3",
        "Semester 4",
        "Semester 5",
        "Semester 6",
        "Semester 7",
        "Semester 8"
    ];

    // Handle department selection
    const handleDepartmentSelect = (dept) => {
        setDepartment(dept);
        setShowDepartmentDropdown(false);
    };

    // Handle semester selection
    const handleSemesterSelect = (sem) => {
        setSemester(sem);
        setShowSemesterDropdown(false);
    };

    // Fee Card component
    const FeeCard = ({ fee }) => {
        return (
            <div className="fee-card">
                <div className="fee-card-header">

                    <button className="edit-button">Edit</button>
                </div>
                <div className="fee-details">
                    <div
                        className="fee-icon-container"
                        style={{ backgroundColor: `${fee.color}20` }} // Using hex with 20% opacity
                    >
                        <img
                            src={fee.icon}
                            alt={fee.label}
                            className="fee-icon"
                        />
                    </div>
                    <div> 
                         <h3 className="fee-amount">{fee.amount}</h3>
                        <p className="fee-label">{fee.label}</p></div>
                </div>
            </div>
        );
    };

    return (
        <div className="fees-management-container p-3">
            {/* Header Section */}
            <header className="header">
                <div className="title-container">
                    <h1 className="main-title">Fees & Management</h1>
                </div>
                <div className="user-profile">
                    <img
                        src="/assets/avatar.png"
                        alt="User"
                        className="user-avatar"
                    />
                    <div className="user-info">
                        <div className="user-name">Zuhran Ahmad</div>
                        <div className="user-id">14785200</div>
                    </div>
                </div>
            </header>

            {/* Filters Section */}
            <div className="filters-section">
                {/* Department Dropdown */}
                <div className="dropdown-container">
                    <button
                        className="dropdown-button"
                        onClick={() => setShowDepartmentDropdown(!showDepartmentDropdown)}
                    >
                        {department} 
                        <img 
                            src="/assets/arrow-down.png" 
                            alt="Dropdown arrow" 
                            className="dropdown-arrow-icon"
                        />
                    </button>

                    {showDepartmentDropdown && (
                        <div className="dropdown-menu">
                            {departments.map((dept, index) => (
                                <button
                                    key={index}
                                    className={`dropdown-item ${department === dept ? 'active' : ''}`}
                                    onClick={() => handleDepartmentSelect(dept)}
                                >
                                    {dept}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Semester Dropdown */}
                <div className="dropdown-container">
                    <button
                        className="dropdown-button"
                        onClick={() => setShowSemesterDropdown(!showSemesterDropdown)}
                    >
                        {semester} 
                        <img 
                            src="/assets/arrow-down.png" 
                            alt="Dropdown arrow" 
                            className="dropdown-arrow-icon"
                        />
                    </button>

                    {showSemesterDropdown && (
                        <div className="dropdown-menu">
                            {semesters.map((sem, index) => (
                                <button
                                    key={index}
                                    className={`dropdown-item ${semester === sem ? 'active' : ''}`}
                                    onClick={() => handleSemesterSelect(sem)}
                                >
                                    {sem}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Search Box */}
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search Class room"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="search-input"
                    />
                    <img
                        src="/assets/search-lg.png"
                        alt="Search"
                        className="search-icon"
                    />
                </div>
            </div>

            {/* Fees Updates Section */}
            <section className="fees-section">
                <h2 className="section-title">Fees Updates</h2>

                <div className="fees-grid">
                    {feesData.map((fee) => (
                        <div key={fee.id} className="fee-grid-item">
                            <FeeCard fee={fee} />
                        </div>
                    ))}
                </div>
            </section>

            {/* CSS */}
            <style jsx>{`
        /* Main container */
        .fees-management-container {
          
          font-family: Arial, sans-serif;
        }

        /* Header */
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .main-title {
          font-size: 24px;
          font-weight: 600;
          margin: 0;
          color: #111827;
        }

        .user-profile {
          display: flex;
          align-items: center;
        }

        .user-avatar {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          margin-right: 10px;
        }

        .user-info {
          display: flex;
          flex-direction: column;
        }

        .user-name {
          font-size: 14px;
          font-weight: 500;
          color: #1F2937;
        }

        .user-id {
          font-size: 12px;
          font-weight:400;
          color: #9CA3AF;
        }

        /* Filters */
        .filters-section {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          margin-bottom: 30px;
          gap: 12px;
        }

        .dropdown-container {
          position: relative;
          margin-right: 12px;
        }

        .dropdown-button {
          background-color: white;
          border: 1px solid #E5E7EB;
          border-radius: 8px;
          padding: 8px 16px;
          font-size: 14px;
          font-weight: 500;
          color: #1C222E;
          cursor: pointer;
          display: flex;
          align-items: center;
        }

        .dropdown-arrow-icon {
          margin-left: 8px;
          width: 16px;
          height: 16px;
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          z-index: 10;
          background-color: white;
          border: 1px solid #E5E7EB;
          border-radius: 8px;
          // box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          margin-top: 4px;
          overflow: hidden;
          width: 100%;
          min-width: 200px;
        }

        .dropdown-item {
          display: block;
          width: 100%;
          text-align: left;
          padding: 8px 16px;
          font-size: 14px;
          color: #1C222E;
          background: none;
          border: none;
          cursor: pointer;
        }

        .dropdown-item:hover {
          background-color: #F9FAFB;
        }

        .dropdown-item.active {
          background-color: #F3F4F6;
        }

        .search-container {
          position: relative;
          margin-left: auto;
        }

        .search-input {
          padding: 8px 16px 8px 36px;
          border: 1px solid #E5E7EB;
          border-radius: 8px;
          font-size: 14px;
          color: #9CA3AF;
          width: 240px;
        }

        .search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          width: 16px;
          height: 16px;
        }

        /* Fees Section */
        .fees-section {
          margin-top: 20px;
        }

        .section-title {
          font-size: 22px;
          font-weight: 500;
          color: #1C222E;
          margin-bottom: 20px;
          padding-bottom: 12px;
         
        }

        .fees-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 20px;
        }

        /* Fee Card */
        .fee-card {
          background-color: white;
          border: 1px solid #EAECF0;
          border-radius: 12px;
          padding: 12px;
          height: 100%;
          transition: box-shadow 0.2s;
        }

        .fee-card:hover {
          // box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }

        .fee-card-header {
          display: flex;
          justify-content: flex-end;
          align-items: flex-start;
          margin-bottom: 16px;
        }

        .fee-icon-container {
          width: 65px;
          height: 65px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .fee-icon {
          width: 28px;
          height: 28px;
          object-fit: contain;
        }

        .edit-button {
          background: none;
          border: none;
          font-weight:500;
          font-size: 12px;
          cursor: pointer;
        }

        .fee-details {
          margin-top: auto;
          display:flex;
          gap:12px;
          align-items:center;
          padding-bottom: 15px;
    padding-left: 10px;
        }

        .fee-amount {
          font-size: 22px;
          font-weight: 600;
          color: #1C222E;
          margin: 0 0 4px 0;
        }

        .fee-label {
          font-size: 14px;
          color: #98A2B3;
          font-weight:500;
          margin: 0;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .fees-grid {
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          }
          
          .search-container {
            margin-left: 0;
            margin-top: 10px;
            width: 100%;
          }
          
          .search-input {
            width: 100%;
          }
        }
      `}</style>
        </div>
    );
};

export default FeesManagement;