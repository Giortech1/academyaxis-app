import React from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; // Make sure this is at the top



const StudentProfileScreen = () => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate('/student-transcript'); // Update the path here
    };
    const cardData = [
        {
            img: "/assets/2.png",
            alt: "Semester",
            title: "Spring",
            subtitle: "Current Semester",
        },
        {
            img: "/assets/3.png",
            alt: "CGPA",
            title: "8 years",
            subtitle: "Experience",
            onClick: () => handleCardClick(), // Add this if a click handler is needed
        },
        {
            img: "/assets/4.png",
            alt: "Attendance",
            title: "96%",
            subtitle: "Overall Attendance",
        },
        {
            img: "/assets/5.png",
            alt: "Courses",
            title: "5",
            subtitle: "Teaching Courses",
        },
    ];
    const academicData = [
        {
            degree: "Intermediate",
            totalCGPA: 1200,
            obtained: 713,
            percentage: "69.3%",
            year: 2022,
        },
        {
            degree: "Matric",
            totalCGPA: 1100,
            obtained: 684,
            percentage: "74.21%",
            year: 2020,
        },
        // Add more records as needed
    ];
    const coursesTaught = [
        {
            name: "Introduction to programming",
            semester: "Fall 2021",
            duration: "15 weeks",
            status: "70 Hrs",
            year: 2022,
        },
        {
            name: "Data Structures",
            semester: "Spring 2024",
            duration: "18 weeks",
            status: "100 Hrs",
            year: 2020,
        },
        // Add more courses as needed
    ];
    const userProfile = {
        name: "Iqra Hayat",
        email: "Demo@student.edu.com",
        degree: "BSCS",
        image: "/assets/Avatar6.png",
        editIcon: "/assets/6.png",
    };
    const userInfo = {
        fullName: "Demo Name",
        fatherName: "Demo Name",
    };
    const professionalDetails = {
        department: "Computer Science",
        employeeId: "1234567",
        yearsOfService: "5 years in department",
    };

    const locationDetails = {
        address: "LOT PT2045K WALTON ROAD STREET#4",
    };
    return (
        <div className="container-fluid py-0">
            <div className="row">
                {/* Left Column - 8 Columns */}
                <div className="col-md-8 p-4">
                    <h4 className="mb-3" style={{ fontSize: '24px', fontWeight: '600', color: '#111827' }}>Teacher Profile</h4>

                    <div className="row g-3 mb-5">
                        {cardData.map((card, index) => (
                            <div key={index} className="col-md-6">
                                <div
                                    className="card-box d-flex align-items-center gap-4"
                                    // onClick={card.onClick}
                                    style={{ cursor: card.onClick ? "pointer" : "default" }}
                                >
                                    <img src={card.img} alt={card.alt} className="card-icon" />
                                    <div>
                                        <h5 className="card-title mb-0">{card.title}</h5>
                                        <small className="card-subtitle">{card.subtitle}</small>
                                    </div>
                                </div>
                            </div>
                        ))}
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
                                        <th>Total CGPA</th>
                                        <th>Obtained</th>
                                        <th>Percentage</th>
                                        <th>Year</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {academicData.map((record, index) => (
                                        <tr key={index}>
                                            <td className="degree">{record.degree}</td>
                                            <td>{record.totalCGPA}</td>
                                            <td>{record.obtained}</td>
                                            <td>{record.percentage}</td>
                                            <td className="year">{record.year}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Academic History */}
                    <div className="mb-4">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h6 className="academic-heading mb-0">Courses</h6>
                            <Link to="/teacher-courses" className="view-all">View all</Link>
                            </div>
                        <div className="academic-table">
                            <table className="academic-custom-table">
                                <thead>
                                    <tr>
                                        <th>Course Name</th>
                                        <th>Semester</th>
                                        <th>Course Duration</th>
                                        <th>Teaching Hours</th>
                                        <th>Year</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {coursesTaught.map((course, index) => (
                                        <tr key={index}>
                                            <td className="degree">{course.name}</td>
                                            <td>{course.semester}</td>
                                            <td>{course.duration}</td>
                                            <td>{course.status}</td>
                                            <td className="year">{course.year}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>

                {/* Right Column - 4 Columns */}
                <div className="col-md-4">
                    <div className="p-4  text-dark" style={{ backgroundColor: "#FCFCFC" }}>
                        <div className="text-center mb-4">
                            <img
                                src={userProfile.image}
                                alt="Profile"
                                className="profile-image mb-3"
                            />
                            <h5 className="profile-name mb-0">{userProfile.name}</h5>
                            <small className="profile-email">{userProfile.email}</small>
                            <p className="profile-degree mt-1 mb-2">{userProfile.degree}</p>
                            <div className="button-container">
                                <button className="edit-profile-btn">
                                    <img src={userProfile.editIcon} alt="Edit" className="edit-icon me-1" />
                                    Edit Profile
                                </button>
                            </div>
                        </div>

                        <div className="bg-white p-3 mb-3 rounded custom-card">
                            <h6 className="mb-2">Information</h6>

                            <p className="text-uppercase text-muted mb-0 custom-label">Full Name</p>
                            <p className="mb-2 custom-value custom-border">{userInfo.fullName}</p>

                            <p className="text-uppercase text-muted mb-0 custom-label">Father Name</p>
                            <p className="mb-0 custom-value">{userInfo.fatherName}</p>
                        </div>
                        {/* Professional Details */}
                        <div className="bg-white p-3 mb-3 rounded custom-card">
                            <h6 className="mb-2">Professional Details</h6>

                            <p className="text-uppercase text-muted mb-0 custom-label">Department Name</p>
                            <p className="mb-2 custom-value custom-border">{professionalDetails.department}</p>

                            <p className="text-uppercase text-muted mb-0 custom-label">Employee ID</p>
                            <p className="mb-2 custom-value custom-border">{professionalDetails.employeeId}</p>

                            <p className="text-uppercase text-muted mb-0 custom-label">Years Of Service</p>
                            <p className="mb-0 custom-value">{professionalDetails.yearsOfService}</p>
                        </div>

                        {/* Location */}
                        <div className="bg-white p-3 rounded custom-card">
                            <h6 className="mb-2">Location</h6>

                            <p className="text-uppercase text-muted mb-0 custom-label">Address</p>
                            <p className="mb-0 custom-value">{locationDetails.address}</p>
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
    font-family: 'Inter';
    font-size: 28px;
    font-style: normal;
    font-weight: 600;
    line-height: 28px;
  }

  .card-subtitle {
    color: #475467;
    font-family: 'Inter';
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 28px;
  }

  .academic-heading,
  .degree-progress-heading {
    color: #000;
    font-family: 'Inter';
    font-size: 18px;
    font-weight: 500;
    line-height: 28px;
  }

  .view-all {
    color: #9747FF;
    font-family: 'Inter';
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
    font-family: 'Inter';
    font-size: 14px;
    font-weight: 500;
  }

  .academic-custom-table td {
    padding: 16px;
    font-family: 'Inter';
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
    font-family: 'Inter';
    font-size: 14px;
    font-weight: 500;
  }

  .progress-table td {
    padding: 16px;
    font-family: 'Inter';
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
    font-family: 'Inter';
    font-weight: 400;
  }

  .footer-info span {
    font-family: 'Inter';
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
      font-family: 'Inter';
      font-size: 28px;
      font-style: normal;
      font-weight: 500;
      line-height: 25px;
    }

    .profile-email {
      color: #000;
      text-align: center;
      font-family: 'Inter';
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px;
    }

    .profile-degree {
      color: #000;
      text-align: center;
      font-family: 'Inter';
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
      font-family: 'Inter';
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
    font-family: 'Inter';
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
  }

  .custom-label {
    color: #667085;
    font-family: 'Inter';
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
    text-transform: uppercase;
  }

  .custom-value {
    color: #000;
    font-family: 'Inter';
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
