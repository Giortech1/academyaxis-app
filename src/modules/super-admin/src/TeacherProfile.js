import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from 'react-router-dom';

// Import mock data from the FeesPending component
// In a real application, this would be fetched from an API
const MOCK_PENDING_DATA = {
  students: [
    {
      id: 1,
      name: "Kamran Shahid",
      studentId: "CS123456",
      challanNo: "4589621420",
      issueDate: "2024-09-25",
      amount: "37000",
      status: "Pending",
      action: "Reminder",
      avatar: "/assets/Avatar6.png"
    },
    {
      id: 2,
      name: "Kamran Shahid",
      studentId: "CS123456",
      challanNo: "4589621420",
      issueDate: "2024-07-18",
      amount: "40000",
      status: "Pending",
      action: "Reminder",
      avatar: "/assets/Avatar6.png"
    },
    {
      id: 3,
      name: "Kamran Shahid",
      studentId: "CS123456",
      challanNo: "4589621420",
      issueDate: "2024-06-18",
      amount: "39000",
      status: "Paid",
      action: "Reminder",
      avatar: "/assets/Avatar6.png"
    },
    {
      id: 4,
      name: "Kamran Shahid",
      studentId: "CS123456",
      challanNo: "4589621420",
      issueDate: "2024-02-19",
      amount: "45000",
      status: "Paid",
      action: "Reminder",
      avatar: "/assets/Avatar6.png"
    },
    {
      id: 5,
      name: "Kamran Shahid",
      studentId: "CS123456",
      challanNo: "4589621420",
      issueDate: "2024-01-12",
      amount: "38000",
      status: "Paid",
      action: "Reminder",
      avatar: "/assets/Avatar6.png"
    },
    {
      id: 6,
      name: "Kamran Shahid",
      studentId: "CS123456",
      challanNo: "4589621420",
      issueDate: "2024-01-12",
      amount: "38000",
      status: "Pending",
      action: "Reminder",
      avatar: "/assets/Avatar6.png"
    },
    {
      id: 7,
      name: "Kamran Shahid",
      studentId: "CS123456",
      challanNo: "4589621420",
      issueDate: "2024-01-12",
      amount: "38000",
      status: "Paid",
      action: "Reminder",
      avatar: "/assets/Avatar6.png"
    },
    {
      id: 8,
      name: "Kamran Shahid",
      studentId: "CS123456",
      challanNo: "4589621420",
      issueDate: "2024-01-12",
      amount: "38000",
      status: "Paid",
      action: "Reminder",
      avatar: "/assets/Avatar6.png"
    },
    {
      id: 9,
      name: "Kamran Shahid",
      studentId: "CS123456",
      challanNo: "4589621420",
      issueDate: "2024-01-12",
      amount: "38000",
      status: "Paid",
      action: "Reminder",
      avatar: "/assets/Avatar6.png"
    },
    {
      id: 10,
      name: "Kamran Shahid",
      studentId: "CS123456",
      challanNo: "4589621420",
      issueDate: "2024-01-12",
      amount: "38000",
      status: "Paid",
      action: "Reminder",
      avatar: "/assets/Avatar6.png"
    },
    {
      id: 11,
      name: "Kamran Shahid",
      studentId: "CS123456",
      challanNo: "4589621420",
      issueDate: "2024-01-12",
      amount: "38000",
      status: "Paid",
      action: "Reminder",
      avatar: "/assets/Avatar6.png"
    },
    {
      id: 12,
      name: "Kamran Shahid",
      studentId: "CS123456",
      challanNo: "4589621420",
      issueDate: "2024-01-12",
      amount: "38000",
      status: "Pending",
      action: "Reminder",
      avatar: "/assets/Avatar6.png"
    },
    {
      id: 13,
      name: "Kamran Shahid",
      studentId: "CS123456",
      challanNo: "4589621420",
      issueDate: "2024-01-12",
      amount: "38000",
      status: "Paid",
      action: "Reminder",
      avatar: "/assets/Avatar6.png"
    }
  ],
  fines: [
    {
      id: 1,
      name: "Kamran Shahid",
      studentId: "CS123456",
      challanNo: "4589621420",
      issueDate: "2024-09-25",
      amount: "5000",
      status: "Pending",
      action: "Reminder",
      avatar: "/assets/Avatar6.png"
    }
  ]
};

// Student profile data (would typically be fetched from API)
const STUDENT_PROFILE = {
  id: 1,
  name: "Kamran Shahid",
  email: "Demo@student.edu.com",
  degree: "BSCS",
  avatar: "/assets/Avatar6.png",
  fullName: "Demo Name",
  fatherName: "Demo Name",
  academicYear: "2022-2026",
  studentId: "1234567",
  address: "LOT PT2045K WALTON ROAD STREET#4"
};

// Helper function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

// Helper function to format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat().format(amount);
};

const StudentProfileScreen = () => {
  const navigate = useNavigate();
  const { studentId } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [feesHistory, setFeesHistory] = useState([]);

  // Function to handle sorting (placeholder for real implementation)
  const handleSort = () => {
    // In a real application, this would sort the feesHistory array
    console.log("Sorting fees history...");
  };

  // Fetch student data
  const fetchStudentData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // In a real app, this would be an API call
      // For demo purposes, we're using the mock data

      // Simulate network latency
      await new Promise(resolve => setTimeout(resolve, 500));

      // Get student by ID (in a real app, this would be a proper API call)
      // Using the demo data for now
      const studentInfo = STUDENT_PROFILE;

      // Get all fees for this student
      const studentFees = MOCK_PENDING_DATA.students;

      setStudentData(studentInfo);
      setFeesHistory(studentFees);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching student data:", err);
      setError("Failed to load student data. Please try again later.");
      setIsLoading(false);
    }
  }, [studentId]);

  useEffect(() => {
    fetchStudentData();
  }, [fetchStudentData]);

  const handleCardClick = () => {
    navigate('/student-transcript');
  };

  if (isLoading) {
    return <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  const handleBack = () => {
    navigate(-1); // Navigate back to previous page
  };

  return (
    <div className="container-fluid py-0">
      <div className="row">
        {/* Left Column - 8 Columns */}
        <div className="col-md-8 p-3">
          <div className="d-flex align-items-center mb-4">
            <button
              onClick={handleBack}
              className="btn p-0 me-3"
              style={{ background: 'none', border: 'none' }}
            >
              <img
                src="/assets/arrow-left.png"
                alt="Back"
                style={{ width: "24px", height: "24px" }}
              />
            </button>
            <h4 style={{ fontSize: '24px', fontWeight: '600', color: '#111827', margin: 0 }}>Teacher Profile</h4>
          </div>
          {/* Fees History */}
          <div className="mb-4">

            <div className="academic-table">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h6 className="academic-heading mb-0">Fees History</h6>
                <button className="sort-button" onClick={handleSort}>
                <img 
                  src="/assets/filter-lines.png" 
                  alt="Sort Icon" 
                  style={{ width: "20px", height: "20px", marginRight: "8px" }} 
                />
                Sort
              </button>
              </div>
              <table className="academic-custom-table">

                <thead>
                  <tr>
                    <th>Sr No.</th>
                    <th>Challan no</th>
                    <th>Dead line</th>
                    <th>Dead line</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {feesHistory.map((fee, index) => (
                    <tr key={fee.id}>
                      <td>{index + 1}</td>
                      <td>{fee.challanNo}</td>
                      <td>{formatDate(fee.issueDate)}</td>
                      <td>{formatDate(fee.issueDate)}</td>
                      <td>{formatCurrency(fee.amount)}</td>
                      <td>
                        <span className={`status-indicator ${fee.status.toLowerCase() === 'paid' ? 'paid' : 'unpaid'}`}></span>
                        {fee.status.toLowerCase() === 'paid' ? 'Paid' : 'Unpaid'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column - 4 Columns */}
<div className="col-md-4">
  <div className="p-3 text-dark" style={{ backgroundColor: "#FCFCFC" }}>
    <div className="text-center mb-4">
      <img
        src={studentData.avatar}
        alt="Profile"
        className="profile-image mb-3"
      />
      <h5 className="profile-name mb-0">{studentData.name}</h5>
      <small className="profile-email">{studentData.email}</small>
      <p className="profile-degree mt-1 mb-2">{studentData.degree}</p>
      <div className="button-container">
        <button className="edit-profile-btn">
          <img src="/assets/6.png" alt="Edit" className="edit-icon me-1" />
          Edit
        </button>
      </div>
    </div>
    
    <div className="bg-white p-3 mb-3 rounded custom-card">
      <h6 className="mb-2">Information</h6>
      <p className="text-uppercase text-muted mb-0 custom-label">Full Name</p>
      <p className="mb-2 custom-value custom-border">{studentData.fullName}</p>
      <p className="text-uppercase text-muted mb-0 custom-label">Father Name</p>
      <p className="mb-0 custom-value">{studentData.fatherName}</p>
    </div>
    
    <div className="bg-white p-3 mb-3 rounded custom-card">
      <h6 className="mb-2">Academic Info</h6>
      <p className="text-uppercase text-muted mb-0 custom-label">Academic Year</p>
      <p className="mb-2 custom-value custom-border">{studentData.academicYear}</p>
      <p className="text-uppercase text-muted mb-0 custom-label">Student ID</p>
      <p className="mb-2 custom-value custom-border">{studentData.studentId}</p>
      <p className="text-uppercase text-muted mb-0 custom-label">Email</p>
      <p className="mb-0 custom-value">{studentData.email}</p>
    </div>
    
    <div className="bg-white p-3 mb-3 rounded custom-card">
      <h6 className="mb-2">Location</h6>
      <p className="text-uppercase text-muted mb-0 custom-label">Address</p>
      <p className="mb-0 custom-value">{studentData.address}</p>
    </div>
    
    {/* View Button */}
    <div className="d-grid mt-3">
      <button 
        className="btn btn-primary" 
        style={{ 
          backgroundColor: "#9747FF", 
          borderColor: "#9747FF", 
          borderRadius: "12px", 
          fontWeight: "500", 
          padding: "10px", 
          fontSize: "16px" 
        }}
        onClick={() => navigate(`/teacherprofile1`)}
      >
        View Complete Profile
      </button>
    </div>
  </div>
</div>
      </div>
      <style jsx>{`
  /* Shared Styles */
  .card-box {
    padding: 16px;
    border-radius: 12px;
    border: 1px solid #EAECF0;
    background: #FFF;
    display: flex !important;
    justify-content: center;
  }

  .sort-button {
    display: flex;
    align-items: center;
    padding: 8px 16px;
    background: #FFFFFF;
    border: 1px solid #E5E7EB;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    color: #374151;
  }

  .academic-heading {
    color: #101828;
    // font-family: 'Inter', sans-serif;
    font-size: 20px;
    font-weight: 600;
    line-height: 28px;
  }

  /* Academic Table Styles */
  .academic-table {
    background: #fff;
    border: 1px solid #EAECF0;
    border-radius: 16px;
    padding: 16px;
    overflow-x: auto;
  }

  .academic-table .academic-custom-table {
    width: 100%;
    border-collapse: collapse;
  }

  .academic-custom-table thead {
    border-bottom: 1px solid #EAECF0;
  }

  .academic-custom-table th {
    text-align: left;
    padding: 12px 16px;
    color: #111827;
    // font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-weight: 500;
  }

  .academic-custom-table td {
    padding: 16px;
    // font-family: 'Inter', sans-serif;
    font-size: 12px;
    color: #4B5563;
    font-weight: 400;
    border-bottom: 1px solid #F1F3F9;
  }

  .academic-custom-table tr:last-child td {
    border-bottom: none;
  }

  .status-indicator {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 6px;
    vertical-align: middle;
  }

  .paid {
    background-color: #12B76A;
  }

  .unpaid {
    background-color: #F04438;
  }

  .profile-image {
    width: 120px;
    height: 120px;
    object-fit: cover;
    border-radius: 50%;
  }

  .profile-name {
    color: #000;
    text-align: center;
    // font-family: 'Inter', sans-serif;
    font-size: 28px;
    font-style: normal;
    font-weight: 500;
    line-height: 25px;
  }

  .profile-email {
    color: #000;
    text-align: center;
    // font-family: 'Inter', sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
  }

  .profile-degree {
    color: #000;
    text-align: center;
    // font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
  }

  .button-container {
    display: flex;
    justify-content: center;
    margin-top: 15px;
  }

  .edit-profile-btn {
    border-radius: 8px;
    border: 1px solid #E5E7EB;
    color: #000;
    // font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    padding: 8px 8px;
    background: #fff;
  }

  .edit-icon {
    width: 20px;
    height: 20px;
    object-fit: contain;
  }

  .custom-card {
    border-radius: 12px !important;
    border: 1px solid #F2F4F7;
    background: #FFF;
    color: #000;
    // font-family: 'Inter', sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
  }

  .custom-label {
    color: #667085;
    // font-family: 'Inter', sans-serif;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
    text-transform: uppercase;
  }

  .custom-value {
    color: #000;
    // font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
  }

  .custom-border {
    border-bottom: 1px solid #EAECF0;
    padding-bottom: 8px;
  }
`}</style>
    </div>
  );
};

export default StudentProfileScreen;