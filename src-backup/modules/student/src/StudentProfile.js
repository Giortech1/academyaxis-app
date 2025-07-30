import React from "react";
import { useNavigate } from 'react-router-dom';


const StudentProfileScreen = () => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate('/student-transcript'); // Update the path here
    };
    return (
        <div className="container-fluid py-0">
            <div className="row">
                {/* Left Column - 8 Columns */}
                <div className="col-md-8 p-3">
                    <h4 className="mb-5" style={{ fontSize: '24px', fontWeight: '600', color: '#111827' }}>Student Profile</h4>

                    <div className="row g-3 mb-5">
                        <div className="col-md-6">
                            <div className="card-box d-flex align-items-center gap-3">
                                <img src="/assets/2.png" alt="Semester" className="card-icon" />
                                <div>
                                    <h5 className="card-title mb-0">5th</h5>
                                    <small className="card-subtitle">Current Semester</small>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div
                                className="card-box d-flex align-items-center gap-3"
                                onClick={handleCardClick}
                                style={{ cursor: 'pointer' }}
                            >
                                <img src="/assets/3.png" alt="CGPA" className="card-icon" />
                                <div>
                                    <h5 className="card-title mb-0">3.95</h5>
                                    <small className="card-subtitle">Current CGPA</small>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card-box d-flex align-items-center gap-3">
                                <img src="/assets/4.png" alt="Attendance" className="card-icon" />
                                <div>
                                    <h5 className="card-title mb-0">96%</h5>
                                    <small className="card-subtitle">Overall Attendance</small>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card-box d-flex align-items-center gap-3">
                                <img src="/assets/5.png" alt="Courses" className="card-icon" />
                                <div>
                                    <h5 className="card-title mb-0">5</h5>
                                    <small className="card-subtitle">Enrolled Courses</small>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* Academic History */}
                    <div className="mb-4">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h6 className="academic-heading mb-0">Academic History</h6>
                            {/* <a href="#" className="view-all">View all</a> */}
                        </div>
                        <div className="academic-table">
                            <table className="academic-custom-table">
                                <thead>
                                    <tr>
                                        <th>Degree</th>
                                        <th>Total Marks</th>
                                        <th>Obtained</th>
                                        <th>Percentage</th>
                                        <th>Year</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="degree">Intermediate</td>
                                        <td>1200</td>
                                        <td>713</td>
                                        <td>69.3%</td>
                                        <td className="year">2022</td>
                                    </tr>
                                    <tr>
                                        <td className="degree">Matric</td>
                                        <td>1100</td>
                                        <td>684</td>
                                        <td>74.21%</td>
                                        <td className="year">2020</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Progress in Degree */}
                    <div className="mb-4">
                        <h6 className="degree-progress-heading mb-4">Progress in Degree</h6>
                        <div className="progress-table-container">
                            <table className="progress-table">
                                <thead>
                                    <tr>
                                        <th>Degree</th>
                                        <th>Starting Year</th>
                                        <th>Year 1</th>
                                        <th>Year 2</th>
                                        <th>Year 3</th>
                                        <th>Year 4</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="bold-cell">BSCS</td>
                                        <td className="bold-cell">2020</td>
                                        <td><span className="dot green"></span>Completed</td>
                                        <td><span className="dot green"></span>Completed</td>
                                        <td><span className="dot orange"></span>In Progress</td>
                                        <td className="not-started">Not Started</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="d-flex justify-content-between mt-2 footer-info">
                                <span className="footer-text">Estimated Graduation: May 2026</span>
                                <span className="footer-text">Remaining Credits: 36</span>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Right Column - 4 Columns */}
                <div className="col-md-4">
                    <div className="p-3  text-dark" style={{ backgroundColor: "#FCFCFC" }}>
                        <div className="text-center mb-4">
                            <img
                                src="/assets/Avatar6.png"
                                alt="Profile"
                                className="profile-image mb-3"
                            />
                            <h5 className="profile-name mb-0">Iqra Hayat</h5>
                            <small className="profile-email">Demo@student.edu.com</small>
                            <p className="profile-degree mt-1 mb-2">BSCS</p>
                            <div className="button-container">
                                <button className="edit-profile-btn">
                                    <img src="/assets/6.png" alt="Edit" className="edit-icon me-1" />
                                    Edit Profile
                                </button>
                            </div>
                        </div>

                        <div className="bg-white p-3 mb-3 rounded  custom-card">
                            <h6 className=" mb-2">Information</h6>
                            <p className="text-uppercase text-muted mb-0 custom-label">Full Name</p>
                            <p className="mb-2 custom-value custom-border">Demo Name</p>
                            <p className="text-uppercase text-muted mb-0 custom-label">Father Name</p>
                            <p className="mb-0 custom-value">Demo Name</p>
                        </div>

                        <div className="bg-white p-3 mb-3 rounded custom-card">
                            <h6 className=" mb-2">Academic Info</h6>
                            <p className="text-uppercase text-muted mb-0 custom-label">Academic Year</p>
                            <p className="mb-2 custom-value custom-border">2022-2026</p>
                            <p className="text-uppercase text-muted mb-0 custom-label">Student ID</p>
                            <p className="mb-2 custom-value custom-border">123567</p>
                            <p className="text-uppercase text-muted mb-0 custom-label">Email</p>
                            <p className="mb-0 custom-value">Demo@student.edu.com</p>
                        </div>

                        <div className="bg-white p-3 rounded  custom-card">
                            <h6 className=" mb-2">Location</h6>
                            <p className="text-uppercase text-muted mb-0 custom-label">Address</p>
                            <p className="mb-0 custom-value">LOT PT2045K WALTON ROAD STREET#4</p>
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

  .card-icon {
    width: 60px;
    height: 60px;
  }

  .card-title {
    color: #000;
    font-family: 'Inter', sans-serif;
    font-size: 28px;
    font-style: normal;
    font-weight: 600;
    line-height: 28px;
  }

  .card-subtitle {
    color: #475467;
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 28px;
  }

  .academic-heading,
  .degree-progress-heading {
    color: #000;
    font-family: 'Inter', sans-serif;
    font-size: 18px;
    font-weight: 500;
    line-height: 28px;
  }

  .view-all {
    color: #9747FF;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-weight: 400;
    text-decoration: none;
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
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-weight: 500;
  }

  .academic-custom-table td {
    padding: 16px;
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    color: #4B5563;
    font-weight: 400;
    border-bottom: 1px solid #F1F3F9;
  }

  .academic-custom-table tr:last-child td {
    border-bottom: none;
  }

  .academic-custom-table td.degree,
  .academic-custom-table td.year {
    font-weight: 500;
    color: #000;
    text-align: left;
  }

  /* Progress Table Styles */
  .progress-table-container {
    background: #fff;
    border: 1px solid #EAECF0;
    border-radius: 16px;
    padding: 16px;
  }

  .progress-table {
    width: 100%;
    border-collapse: collapse;
  }

  .progress-table thead {
    border-bottom: 1px solid #EAECF0;
  }

  .progress-table th {
    text-align: left;
    padding: 12px 16px;
    color: #111827;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-weight: 500;
  }

  .progress-table td {
    padding: 16px;
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    line-height: 18px;
    font-style: normal;
    font-weight: 500;
    color: #1C222E;
    border-bottom: 1px solid #F1F3F9;
  }

  .progress-table tr:last-child td {
    border-bottom: none;
  }

  .bold-cell {
    color: #000;
    font-weight: 500;
  }

  .dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 6px;
    vertical-align: middle;
  }

  .green {
    background-color: #12B76A;
  }

  .orange {
    background-color: #F79009;
  }

  .not-started {
    color: #667085 !important;
    font-family: 'Inter', sans-serif;
    font-weight: 400;
  }

  .footer-info span {
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    color: #1C222E;
    line-height: 18px;
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
      font-family: 'Inter', sans-serif;
      font-size: 28px;
      font-style: normal;
      font-weight: 500;
      line-height: 25px;
    }

    .profile-email {
      color: #000;
      text-align: center;
      font-family: 'Inter', sans-serif;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px;
    }

    .profile-degree {
      color: #000;
      text-align: center;
      font-family: 'Inter', sans-serif;
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
      font-family: 'Inter', sans-serif;
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
    font-family: 'Inter', sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
  }

  .custom-label {
    color: #667085;
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
    text-transform: uppercase;
  }

  .custom-value {
    color: #000;
    font-family: 'Inter', sans-serif;
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
