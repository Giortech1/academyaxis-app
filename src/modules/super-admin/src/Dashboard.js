import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Image, Dropdown, ProgressBar, Table, Button, ListGroup, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';
import { useNavigate } from "react-router-dom";
import { UserContext } from './UserContext';

const Dashboard = () => {
    const { userData, sections, fetchCollection, fetchLatestAnnouncements } = useContext(UserContext);
    const [isMobile, setIsMobile] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [announcements, setAnnouncements] = useState([]);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getDashboardData();
    }, []);

    const getDashboardData = async () => {
        try {
            const response = await fetchLatestAnnouncements(2);

            if (response?.success) {
                setAnnouncements(response.data || []);
            }

            const result = await fetchCollection('users');
            if (result?.success) {
                setUsers(result.data || []);
            }

            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    const calculateStats = () => {
        const teachers = users.filter(user => user.role === 'teacher');
        const students = users.filter(user => user.role === 'student');
        const admins = users.filter(user => user.role === 'admin' || user.role === 'Administration');

        const uniqueCourses = sections.reduce((acc, section) => {
            if (section.course && !acc.find(course => course.id === section.course.id)) {
                acc.push(section.course);
            }
            return acc;
        }, []);

        return [
            {
                label: 'Total Teachers',
                value: teachers.length,
                icon: '/assets/admin1.png',
                bg: '#D6BBFB',
                cardBg: '#F9F5FF',
            },
            {
                label: 'Total Students',
                value: students.length,
                icon: '/assets/user-tick.png',
                bg: '#0160EE',
                cardBg: '#E1F2FC',
            },
            {
                label: 'Total Admins',
                value: admins.length,
                icon: '/assets/user-up-02.png',
                bg: '#FF5F54',
                cardBg: '#EFF8F9',
            },
            {
                label: 'Total Classes',
                value: sections.length,
                icon: '/assets/material.png',
                bg: '#B9F2B6',
                cardBg: '#F2FFF1',
            },
            {
                label: 'Total Courses',
                value: uniqueCourses.length,
                icon: '/assets/courses.png',
                bg: '#FFD88D',
                cardBg: '#FFF8E7',
            },
            {
                label: 'Total Fees',
                value: 120,
                icon: '/assets/manage.png',
                bg: '#FFC2D1',
                cardBg: '#FFF0F4',
            }
        ];
    };

    const stats = calculateStats();

    const formatAnnouncements = () => {
        return announcements.map(announcement => ({
            name: announcement.createdBy?.name || 'Unknown',
            message: announcement.description,
            time: new Date(announcement.createdAt).toLocaleDateString('en-US', {
                weekday: 'short',
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            }),
            profile: announcement.createdBy?.profile_pic || "/assets/avatar.jpeg",
            roleIcon: "/assets/teacher.png",
            role: announcement.createdBy?.type || '',
            thumb: "/assets/thumb.png",
            options: "/assets/dots-vertical.png",
            title: announcement.title
        }));
    };

    const formattedAnnouncements = formatAnnouncements();

    const paymentInfo = {
        amountPaidToday: 145000,
        totalPaid: 145000,
        challanNumber: "754896212",
        challanStatus: "Unpaid",
        challanAmount: 45000,
        fineNumber: "985",
        fineStatus: "Unpaid",
        fineAmount: 3000,
        totalDue: 48000,
    };

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 700);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleViewClick = () => {
        navigate('/fees');
    };

    return (
        <>
            <Container fluid>
                <Row className="mt-0">
                    {/* Main Content */}
                    <Col md={12} className="p-3">
                        <header id='dashboardheader' className="dashboard-header">
                            {/* Left side: Arrow and Heading */}
                            <div id='section1' className="section-title">
                                <h1 className="main-heading">Dashboard</h1>
                            </div>

                            {/* Right side: User Info and Dropdown */}
                            <div id='user-info' className="user-info-section">
                                {/* User Info */}
                                <img
                                    id='info-img'
                                    src={userData?.profile_pic || "/assets/avatar.jpeg"}
                                    alt="User"
                                    className="user-avatar"
                                />
                                <div className="user-details">
                                    <div className="user-name">{userData?.full_name}</div>
                                    <div className="user-id">{userData?.admin_id}</div>
                                </div>
                            </div>
                        </header>

                        <Row id='result-card'>
                            {/* Result Card */}
                            <Col md={6}>
                                <div className="teacher-dashboard px-0 py-0">
                                    <Card className="mb-4 welcome-card">
                                        <Card.Body className="welcome-card-body">
                                            {/* Left side: Profile Info */}
                                            <div className="profile-info">
                                                <Image
                                                    src={userData?.profile_pic || "/assets/avatar.jpeg"}
                                                    roundedCircle
                                                    className="profile-image"
                                                />
                                                <div>
                                                    <p className="welcome-text">
                                                        Welcome Back!
                                                    </p>
                                                    <h5 className="welcome-name">
                                                        {userData?.full_name}
                                                    </h5>
                                                    <p className="welcome-id">
                                                        {userData?.admin_id}
                                                    </p>
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                    <div className="attendance-container">
                                        {/* Section Heading and Date */}
                                        <div className="attendance-header">
                                            <h3 className="attendance-title">Today's Statistics</h3>
                                            <p className="attendance-date">
                                                {new Date().toLocaleDateString('en-US', {
                                                    day: '2-digit',
                                                    month: 'long',
                                                    year: 'numeric'
                                                })}
                                            </p>
                                        </div>

                                        {isLoading ? (
                                            <div className="loading-stats">
                                                <div className="loading-spinner"></div>
                                                <p className="loading-stats-text">Loading statistics...</p>
                                            </div>
                                        ) : (
                                            <Row className="g-4">
                                                {stats.map((stat, index) => (
                                                    <Col key={index} xs={12} sm={6} md={4} lg={4} className="mb-0">
                                                        <Card
                                                            className="stat-card"
                                                            style={{ backgroundColor: stat.cardBg }}
                                                            onClick={() => {
                                                                if (stat.label === 'Total Subjects') {
                                                                    navigate("/mycourse");
                                                                }
                                                            }}
                                                        >
                                                            <Card.Body className="stat-card-body">
                                                                {/* Icon with background */}
                                                                <div
                                                                    className="stat-icon"
                                                                    style={{ backgroundColor: stat.bg }}
                                                                >
                                                                    <Image src={stat.icon} alt={stat.label} />
                                                                </div>

                                                                {/* Label and Value */}
                                                                <div>
                                                                    <h4 className="stat-value">
                                                                        {stat.value}
                                                                    </h4>
                                                                    <p className="stat-label">
                                                                        {stat.label}
                                                                    </p>
                                                                </div>
                                                            </Card.Body>
                                                        </Card>
                                                    </Col>
                                                ))}
                                            </Row>
                                        )}
                                    </div>
                                </div>
                            </Col>

                            <Col md={6}>
                                <div className="p-3 announcements-container">
                                    {/* Heading Section */}
                                    <div>
                                        <div className="announcements-header">
                                            <h5 className="announcements-title">
                                                News & Announcements
                                            </h5>
                                            <button
                                                className="view-all-btn"
                                                onClick={() => navigate("/news-and-announcements")}
                                            >
                                                View All
                                            </button>
                                        </div>

                                        {isLoading ? (
                                            <div className="loading-announcements">
                                                <div className="loading-spinner"></div>
                                                <p className="loading-announcements-text">Loading announcements...</p>
                                            </div>
                                        ) : (
                                            <>
                                                {/* Loop through real announcements */}
                                                {formattedAnnouncements.slice(0, 1).map((item, index) => (
                                                    <div key={index} className="announcement-item">
                                                        {/* User Info Section */}
                                                        <div className="announcement-user-info">
                                                            <div className="announcement-user-left">
                                                                <img
                                                                    src={item.profile}
                                                                    alt="Profile"
                                                                    className="announcement-profile"
                                                                />
                                                                <div>
                                                                    <h6 className="announcement-name">
                                                                        {item.name}
                                                                    </h6>
                                                                    <span className="announcement-role">
                                                                        <img
                                                                            src={item.roleIcon}
                                                                            alt="Role Icon"
                                                                            className="role-icon"
                                                                        />
                                                                        {item.role}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <img
                                                                src={item.options}
                                                                alt="Options"
                                                                className="announcement-options"
                                                            />
                                                        </div>

                                                        {/* Text Section */}
                                                        <div className="announcement-content">
                                                            <div className="announcement-text-section">
                                                                <p className="announcement-message">
                                                                    {item.message}
                                                                </p>
                                                            </div>
                                                            <span className="announcement-time">
                                                                {item.time}
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}

                                                {/* Border with Label */}
                                                {formattedAnnouncements.length > 1 && (
                                                    <div className="announcements-divider">
                                                        <div className="divider-label">
                                                            <span className="divider-text">
                                                                Old Announcements
                                                            </span>
                                                            <img
                                                                src="assets/arrow-down2.png"
                                                                alt="Arrow Down"
                                                                className="divider-arrow"
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Show remaining announcements */}
                                                {formattedAnnouncements.slice(1).map((item, index) => (
                                                    <div key={index + 1} className="announcement-item">
                                                        {/* User Info Section */}
                                                        <div className="announcement-user-info">
                                                            <div className="announcement-user-left">
                                                                <img
                                                                    src={item.profile}
                                                                    alt="Profile"
                                                                    className="announcement-profile"
                                                                />
                                                                <div>
                                                                    <h6 className="announcement-name">
                                                                        {item.name}
                                                                    </h6>
                                                                    <span className="announcement-role">
                                                                        <img
                                                                            src={item.roleIcon}
                                                                            alt="Role Icon"
                                                                            className="role-icon"
                                                                        />
                                                                        {item.role}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <img
                                                                src={item.options}
                                                                alt="Options"
                                                                className="announcement-options"
                                                            />
                                                        </div>

                                                        {/* Text Section */}
                                                        <div className="announcement-content">
                                                            <div className="announcement-text-section">
                                                                <p className="announcement-message">
                                                                    {item.message}
                                                                </p>
                                                                
                                                            </div>
                                                            <span className="announcement-time">
                                                                {item.time}
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </>
                                        )}
                                    </div>

                                    {/* Button at the bottom */}
                                    <div className="d-flex justify-content-center align-items-center mt-3">
                                        <button
                                            className="create-announcement-btn"
                                            onClick={() => navigate('/create-announcement')}
                                        >
                                            <img
                                                src="assets/admin2.png"
                                                alt="Announcement Icon"
                                                className="create-announcement-icon"
                                            />
                                            Create Announcement
                                        </button>
                                    </div>
                                </div>

                                <Card className="p-3 mb-3 payment-card">
                                    {/* Header */}
                                    <h5 className="fw-bold mb-3 payment-title">
                                        Fees and Payment Management
                                    </h5>

                                    {/* Amount Paid Today */}
                                    <p className="payment-section-title">
                                        Amount Paid Today
                                    </p>
                                    <p className="payment-section-desc">
                                        Fees and Fines paid by today
                                    </p>
                                    <div className="payment-amount">
                                        <h2 className="payment-amount-value">
                                            {paymentInfo.amountPaidToday.toLocaleString()}
                                        </h2>
                                        <span className="payment-currency">Rs</span>
                                    </div>

                                    <div className="payment-divider"></div>

                                    {/* Total Paid Amount */}
                                    <p className="payment-total-text">
                                        Total amount
                                        <span className="payment-total-paid">
                                            {paymentInfo.totalPaid.toLocaleString()} Rs
                                        </span>
                                    </p>

                                    <div className="payment-divider"></div>

                                    {/* Pending Fees */}
                                    <p className="payment-section-title" style={{ marginTop: '12px' }}>
                                        Pending Fees
                                    </p>
                                    <p className="payment-desc">
                                        Fees challan number {paymentInfo.challanNumber} ({paymentInfo.challanStatus})
                                    </p>
                                    <div className="payment-amount">
                                        <h4 className="payment-amount-value">
                                            {paymentInfo.challanAmount.toLocaleString()}
                                        </h4>
                                        <span className="payment-currency">Rs</span>
                                    </div>
                                    <div className="payment-divider"></div>

                                    {/* Pending Fines */}
                                    <p className="payment-section-title" style={{ marginTop: '12px' }}>
                                        Pending Fines
                                    </p>
                                    <p className="payment-desc">
                                        Fine number {paymentInfo.fineNumber} ({paymentInfo.fineStatus})
                                    </p>
                                    <div className="payment-amount">
                                        <h4 className="payment-amount-value">
                                            {paymentInfo.fineAmount.toLocaleString()}
                                        </h4>
                                        <span className="payment-currency">Rs</span>
                                    </div>

                                    <div className="payment-divider"></div>

                                    {/* Total Due Amount */}
                                    <p className="payment-total-text" style={{ marginTop: '8px' }}>
                                        Total amount
                                        <span className="payment-total-due">
                                            {paymentInfo.totalDue.toLocaleString()} Rs
                                        </span>
                                    </p>

                                    {/* VIEW Button */}
                                    <div className="view-btn-container">
                                        <Button
                                            variant="dark"
                                            onClick={handleViewClick}
                                            className="view-btn"
                                        >
                                            VIEW
                                        </Button>
                                    </div>
                                </Card>
                            </Col>
                        </Row>

                        <Row style={{ marginTop: '0px' }}>
                            <Col md={6}></Col>
                        </Row>
                    </Col>
                </Row>
            </Container>

            <style jsx>{`
                .loading-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                }
                
                .loading-stats {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 60px 20px;
                }
                
                .loading-announcements {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 40px 20px;
                }
                
                .loading-spinner {
                    width: 40px;
                    height: 40px;
                    border: 4px solid #f3f3f3;
                    border-top: 4px solid #111827;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin-bottom: 16px;
                }
                
                .loading-stats-text {
                    font-size: 14px;
                    color: #6c757d;
                    margin: 0;
                    font-weight: 500;
                }
                
                .loading-announcements-text {
                    font-size: 14px;
                    color: #6c757d;
                    margin: 0;
                    font-weight: 500;
                }
                
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                
                .dashboard-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                    width: 100%;
                }
                
                .section-title {
                    display: flex;
                    flex-direction: column;
                }
                
                .main-heading {
                    font-size: 24px;
                    margin: 0;
                    font-weight: 600;
                }
                
                .user-info-section {
                    display: flex;
                    align-items: center;
                }
                
                .user-avatar {
                    border-radius: 50%;
                    width: 54px;
                    height: 54px;
                    margin-right: 10px;
                }
                
                .user-details {
                    margin-right: 10px;
                }
                
                .user-name {
                    font-weight: 500;
                    font-size: 14px;
                }
                
                .user-id {
                    font-size: 12px;
                    color: #6c757d;
                }
                
                .welcome-card {
                    border-radius: 12px;
                    border: 1px solid #9747FF;
                    background: #9747FF;
                }
                
                .welcome-card-body {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                
                .profile-info {
                    display: flex;
                    align-items: center;
                }
                
                .profile-image {
                    width: 84px;
                    height: 84px;
                    object-fit: cover;
                    margin-right: 16px;
                }
                
                .welcome-text {
                    color: white;
                    font-size: 16px;
                    font-weight: 500;
                    margin-bottom: 0px;
                }
                
                .welcome-name {
                    font-weight: 600;
                    margin-bottom: 0;
                    font-size: 24px;
                    color: white;
                }
                
                .welcome-id {
                    font-size: 16px;
                    font-weight: 500;
                    color: #D0D5DD;
                    margin-bottom: 0;
                }
                
                .attendance-container {
                    border: 1px solid #EAECF0;
                    border-radius: 12px;
                    padding: 16px;
                }
                
                .attendance-header {
                    margin-bottom: 24px;
                }
                
                .attendance-title {
                    font-weight: 600;
                    font-size: 16px;
                    color: #000;
                }
                
                .attendance-date {
                    font-size: 12px;
                    color: #374151;
                    font-weight: 400;
                }
                
                .stat-card {
                    border-radius: 12px;
                    border: none;
                    cursor: pointer;
                }
                
                .stat-card-body {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                    padding: 24px 28px;
                    text-align: left;
                }
                
                .stat-icon {
                    border-radius: 50%;
                    width: 36px;
                    height: 36px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 16px;
                }
                
                .stat-icon img {
                    width: 24px;
                    height: 24px;
                }
                
                .stat-value {
                    margin: 0;
                    font-weight: 500;
                    font-size: 32px;
                }
                
                .stat-label {
                    margin: 0;
                    font-size: 12px;
                    font-weight: 500;
                    color: #667085;
                }
                
                .announcements-container {
                    border: 1px solid #E5E7EB;
                    border-radius: 12px;
                    background-color: #fff;
                    margin-bottom: 20px;
                }
                
                .announcements-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 15px;
                }
                
                .announcements-title {
                    margin: 0;
                    font-weight: 600;
                    font-size: 16px;
                }
                
                .view-all-btn {
                    font-size: 12px;
                    padding: 5px 10px;
                    text-decoration: underline;
                    background: transparent;
                    border-bottom: 1px solid #000;
                    font-weight: 500;
                    border: none;
                }
                
                .announcement-item {
                    margin-bottom: 20px;
                }
                
                .announcement-user-info {
                    display: flex;
                    align-items: start;
                    justify-content: space-between;
                }
                
                .announcement-user-left {
                    display: flex;
                    align-items: start;
                }
                
                .announcement-profile {
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    margin-right: 15px;
                }
                
                .announcement-name {
                    margin: 0;
                    font-weight: 500;
                    font-size: 14px;
                    padding-top: 2px;
                }
                
                .announcement-role {
                    display: block;
                    color: #475467;
                    font-size: 12px;
                    font-weight: 400;
                }
                
                .role-icon {
                    width: 12px;
                    height: 12px;
                    margin-right: 5px;
                }
                
                .announcement-options {
                    width: 20px;
                    height: 20px;
                    cursor: pointer;
                    margin-right: 18px;
                }
                
                .announcement-content {
                    margin-top: 10px;
                }
                
                .announcement-text-section {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-top: 5px;
                    margin-bottom: 10px;
                }
                
                .announcement-message {
                    margin: 0;
                    color: #374151;
                    font-size: 12px;
                    font-weight: 400;
                    flex: 1;
                    flex-basis: 85%;
                    max-width: 85%;
                }
                
                .announcement-thumb {
                    width: 16px;
                    height: 16.5px;
                    margin-right: 15px;
                    align-self: center;
                }
                
                .announcement-time {
                    font-size: 11px;
                    font-weight: 400;
                    color: #4B5563;
                }
                
                .announcements-divider {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-top: 8px;
                    border-top: 1px solid #E5E7EB;
                    position: relative;
                    padding-top: 10px;
                }
                
                .divider-label {
                    position: absolute;
                    top: -12px;
                    background-color: #FFF;
                    padding: 0 12px;
                    display: flex;
                    align-items: center;
                    z-index: 1;
                }
                
                .divider-text {
                    color: #9CA3AF;
                    font-size: 11px;
                    font-weight: 500;
                    margin-right: 8px;
                }
                
                .divider-arrow {
                    width: 16px;
                    height: 16px;
                }
                
                .create-announcement-btn {
                    background-color: #111827;
                    color: #fff;
                    font-weight: 400;
                    padding: 10px 20px;
                    border: none;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    cursor: pointer;
                    font-size: 12px;
                }
                
                .create-announcement-icon {
                    width: 20px;
                    height: 18px;
                }
                
                .payment-card {
                    border: 1px solid #E5E7EB;
                    border-radius: 12px;
                }
                
                .payment-title {
                    font-size: 16px;
                    color: #000;
                    font-weight: 600;
                }
                
                .payment-section-title {
                    font-size: 14px;
                    font-weight: 500;
                    color: #111827;
                    margin-bottom: 4px;
                }
                
                .payment-section-desc {
                    font-size: 14px;
                    color: #4B5563;
                    font-weight: 400;
                    margin-bottom: 0px;
                }
                
                .payment-amount {
                    display: flex;
                    align-items: baseline;
                }
                
                .payment-amount-value {
                    font-size: 24px;
                    margin-bottom: 0;
                    font-weight: 500;
                }
                
                .payment-currency {
                    font-size: 14px;
                    color: #4B5563;
                    padding-left: 6px;
                    font-weight: 400;
                }
                
                .payment-divider {
                    border-bottom: 1px solid #EAECF0;
                    margin-top: 10px;
                    margin-bottom: 10px;
                }
                
                .payment-total-text {
                    font-size: 14px;
                    font-weight: 500;
                    color: #000;
                    margin-bottom: 0;
                }
                
                .payment-total-paid {
                    color: #12B76A;
                    padding-left: 6px;
                    font-size: 14px;
                    font-weight: 500;
                }
                
                .payment-total-due {
                    color: #D92D20;
                    font-size: 14px;
                    font-weight: 500;
                    padding-left: 6px;
                }
                
                .payment-desc {
                    font-size: 14px;
                    color: #4B5563;
                    font-weight: 400;
                }
                
                .view-btn {
                    font-size: 14px;
                    font-weight: 500;
                    height: 45px;
                    border-radius: 12px;
                    padding: 0 50px;
                    background-color: #111827;
                    border: none;
                    color: #fff;
                }
                
                .view-btn-container {
                    display: flex;
                    justify-content: flex-end;
                    margin-top: 24px;
                }
            `}</style>
        </>
    );
};

export default Dashboard;