
import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Image, Dropdown, ProgressBar, Table, Button, ListGroup, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';
import Leftside from './Leftside.js';
import { useNavigate } from "react-router-dom";
import { UserContext } from './UserContext.js';

const Dashboard = () => {
    const { userData } = useContext(UserContext);
    const [isMobile, setIsMobile] = useState(false);
    const [courses, setCourses] = useState([]);



    const handlePayWithCardClick = () => {
        navigate('/paywithcard'); // Navigate to /paywithcard
    };
      const handleViewClick = () => {
        navigate('/fees'); // Navigate to /paywithcard
    };

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 700);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const paymentInfo = {
        amountPaidToday: 145000,
        totalPaid: 145000,
        challanNumber: "754896212",
        challanStatus: "Unpaid",
        challanAmount: 45000,
        fineNumber: "985",
        fineStatus: "Unpaid",
        fineAmount: 3000,
        totalDue: 48000, // You can also compute: challanAmount + fineAmount
    };

    const navigate = useNavigate();
    const stats = [
        {
            label: 'Total Students',
            value: 469,
            icon: '/assets/admin1.png',
            bg: '#D6BBFB',
        },
        {
            label: 'Total Teachers',
            value: 412,
            icon: '/assets/admin1.png',
            bg: '#D6BBFB',
        },
        {
            label: 'Total Classes',
            value: 469,
            icon: '/assets/admin1.png',
            bg: '#D6BBFB',
        },
        {
            label: 'Total Subjects',
            value: 469,
            icon: '/assets/admin1.png',
            bg: '#D6BBFB',
        },
        {
            label: 'Total Exams',
            value: 58,
            icon: '/assets/admin1.png',
            bg: '#D6BBFB',
        },
        {
            label: 'Total Courses',
            value: 120,
            icon: '/assets/admin1.png',
            bg: '#D6BBFB',
        }
    ];

    // Custom function to format the date as "29 April 2025"
    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('en-GB', options); // Using English (GB) locale for the required format
    };

    const currentDate = formatDate(new Date()); // Get today's date in the required format



    const announcements = [
        {
            name: "Arsalan Mushtaq",
            message:
                "This is a demo announcement by teacher for students this is a demo announcement by teacher for students. This is a demo announcement by teacher for students this is a demo announcement by teacher for students",
            time: "Thu, 19 Sep 2024 12:40 PM",
            profile: "assets/Avatar3.png",
            roleIcon: "assets/teacher.png",
            role: "Teacher",
            thumb: "assets/thumb.png",
            options: "assets/dots-vertical.png",
        },

    ];
    const sara = {
        name: "Sara Khan",
        message: "Important notice for all students: Exams start next week!",
        time: "Mon, 23 Sep 2024 9:00 AM",
        profile: "assets/Avatar4.png",
        roleIcon: "assets/teacher.png",
        role: "Teacher",
        thumb: "assets/Group 2.png",
        options: "assets/dots-vertical.png",
    };
    return (

        <Container fluid>
            <Row className="mt-0">

                {/* Main Content */}
                <Col md={12} className="p-3">

                    <header
                        id='dashboardheader'
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            // marginBottom: '20px',

                            paddingtop: '0px',
                            paddingBottom: '10px',
                            width: '100%',

                        }}
                    >
                        {/* Left side: Arrow and Heading */}
                        <div id='section1' style={{ display: 'flex', flexDirection: 'column', }}>

                            <h1 style={{ fontSize: '24px', margin: 0, fontWeight: '600' }}>Dashboard</h1>
                        </div>



                        {/* Right side: User Info and Dropdown */}
                        <div id='user-info' style={{ display: 'flex', alignItems: 'center' }}>
                            {/* User Info */}
                            <img
                                id='info-img'
                                src="/assets/avatar.jpeg" // Replace with your image path
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
                                <div style={{ fontSize: '12px', color: '#6c757d' }}>{userData?.user_id}</div>
                            </div>

                        </div>
                    </header>

                    <Row id='result-card'>
                        {/* Result Card */}
                        <Col md={6}>
                            <div className="teacher-dashboard px-0 py-0">
                                <Card className="mb-4" style={{ borderRadius: '12px', border: '1px solid #9747FF', background: '#9747FF' }}>
                                    <Card.Body className="d-flex align-items-center justify-content-between">
                                        {/* Left side: Profile Info */}
                                        {/* Left side: Profile Info */}
                                        <div className="d-flex align-items-center">
                                            <Image
                                                src="/assets/avatar.jpeg"
                                                roundedCircle
                                                style={{ width: '84px', height: '84px', objectFit: 'cover', marginRight: '16px' }}
                                            />
                                            <div>
                                                <p style={{ color: 'white', fontSize: '16px', fontWeight: '500', marginBottom: '0px' }}>
                                                    Welcome Back!
                                                </p>
                                                <h5 style={{ fontWeight: '600', marginBottom: 0, fontSize: '24px', color: 'white' }}>
                                                    {userData?.first_name} {userData?.last_name}
                                                </h5>
                                                <p style={{ fontSize: '16px', fontWeight: '500', color: '#D0D5DD', marginBottom: 0 }}>
                                                    {userData?.user_id}
                                                </p>
                                            </div>
                                        </div>



                                    </Card.Body>
                                </Card>
                                <div style={{ border: '1px solid #EAECF0', borderRadius: '12px', padding: '16px' }}>
                                    {/* Section Heading and Date */}
                                    <div style={{ marginBottom: '24px' }}>
                                        <h3 style={{ fontWeight: '600', fontSize: '16px', color: '#000' }}>Today's Attendance</h3>
                                        <p style={{ fontSize: '12px', color: '#374151', fontWeight: '400' }}>{currentDate}</p>
                                    </div>

                                    <Row className="g-4">
                                        {stats.map((stat, index) => (
                                            <Col key={index} xs={12} sm={6} md={4} lg={4} className="mb-0">
                                                <Card
                                                    style={{
                                                        borderRadius: '12px',
                                                        border: 'none',
                                                        backgroundColor: '#F9F5FF',
                                                        cursor: 'pointer', // make cards clickable
                                                    }}
                                                    onClick={() => {
                                                        if (stat.label === 'Total Subjects') {
                                                            navigate("/mycourse");
                                                        }
                                                    }}
                                                >
                                                    <Card.Body
                                                        className="d-flex flex-column"
                                                        style={{ gap: '16px', padding: '24px 28px', textAlign: 'left' }} // Set text alignment to left
                                                    >
                                                        {/* Icon with background */}
                                                        <div
                                                            style={{
                                                                backgroundColor: stat.bg,
                                                                borderRadius: '50%',
                                                                width: '36px',
                                                                height: '36px',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                marginBottom: '16px', // Space between icon and content
                                                            }}
                                                        >
                                                            <Image src={stat.icon} alt={stat.label} style={{ width: '24px', height: '24px' }} />
                                                        </div>

                                                        {/* Label and Value */}
                                                        <div>
                                                            <h4 style={{ margin: 0, fontWeight: '500', fontSize: '32px' }}>
                                                                {stat.value}
                                                            </h4>
                                                            <p style={{ margin: 0, fontSize: '12px', fontWeight: '500', color: '#667085' }}>
                                                                {stat.label}
                                                            </p>
                                                        </div>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        ))}
                                    </Row>

                                </div>



                                {/* Responsive Fixes */}

                            </div>


                        </Col>





                        <Col md={6} >
                            <div
                                className="p-3"
                                style={{
                                    border: '1px solid #E5E7EB',
                                    borderRadius: '12px',
                                    backgroundColor: '#fff',
                                    marginBottom: '20px'

                                }}
                            >
                                {/* Heading Section */}
                                <div>
                                    {/* Header */}
                                    <div
                                        className="d-flex justify-content-between align-items-center"
                                        style={{ marginBottom: '15px' }}
                                    >
                                        <h5 style={{ margin: 0, fontWeight: '600', fontSize: '16px' }}>
                                            News & Announcements
                                        </h5>
                                        <button
                                            className="btn border-0"
                                            style={{
                                                fontSize: "12px",
                                                padding: "5px 10px",
                                                textDecoration: "underline",
                                                background: "transparent",
                                                borderBottom: "1px solid #000",
                                                fontWeight: "500",
                                            }}
                                            onClick={() => navigate("/news-and-announcements")}
                                        >
                                            View All
                                        </button>
                                    </div>

                                    {/* Loop through announcements */}
                                    {announcements.map((item, index) => (
                                        <div key={index} style={{ marginBottom: '20px' }}>
                                            {/* User Info Section */}
                                            <div
                                                className="d-flex align-items-start justify-content-between"
                                            >
                                                <div className="d-flex align-items-start">
                                                    <img
                                                        src={item.profile}
                                                        alt="Teacher Profile"
                                                        style={{
                                                            width: '44px',
                                                            height: '44px',
                                                            borderRadius: '50%',
                                                            marginRight: '15px',
                                                        }}
                                                    />
                                                    <div>
                                                        <h6
                                                            style={{
                                                                margin: 0,
                                                                fontWeight: 500,
                                                                fontSize: '14px',
                                                                paddingTop: '2px',
                                                            }}
                                                        >
                                                            {item.name}
                                                        </h6>
                                                        <span
                                                            style={{
                                                                display: 'block',
                                                                color: '#475467',
                                                                fontSize: '12px',
                                                                fontWeight: '400',
                                                            }}
                                                        >
                                                            <img
                                                                src={item.roleIcon}
                                                                alt="Role Icon"
                                                                style={{
                                                                    width: '12px',
                                                                    height: '12px',
                                                                    marginRight: '5px',
                                                                }}
                                                            />
                                                            {item.role}
                                                        </span>
                                                    </div>
                                                </div>
                                                <img
                                                    src={item.options}
                                                    alt="Options"
                                                    style={{
                                                        width: '20px',
                                                        height: '20px',
                                                        cursor: 'pointer',
                                                        marginRight: '18px',
                                                    }}
                                                />
                                            </div>

                                            {/* Text Section */}
                                            <div style={{ marginTop: '10px' }}>
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'flex-start',
                                                        marginTop: '5px',
                                                        marginBottom: '10px',
                                                    }}
                                                >
                                                    <p
                                                        style={{
                                                            margin: 0,
                                                            color: '#374151',
                                                            fontSize: '12px',
                                                            fontWeight: '400',
                                                            flex: 1,
                                                            flexBasis: '85%',
                                                            maxWidth: '85%',
                                                        }}
                                                    >
                                                        {item.message}
                                                    </p>
                                                    <img
                                                        src={item.thumb}
                                                        alt="Thumb Icon"
                                                        style={{
                                                            width: '16px',
                                                            height: '16.5px',
                                                            marginRight: '15px',
                                                            alignSelf: 'center',
                                                        }}
                                                    />
                                                </div>
                                                <span
                                                    style={{
                                                        fontSize: '11px',
                                                        fontWeight: '400',
                                                        color: '#4B5563',
                                                    }}
                                                >
                                                    {item.time}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {/* Border with Label */}
                                <div
                                    className="d-flex justify-content-center align-items-center mt-2"
                                    style={{
                                        borderTop: '1px solid #E5E7EB',
                                        position: 'relative',
                                        paddingTop: '10px',
                                    }}
                                >
                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: '-12px',
                                            backgroundColor: '#FFF',
                                            padding: '0 12px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            zIndex: 1,
                                        }}
                                    >
                                        <span
                                            style={{
                                                color: '#9CA3AF',
                                                fontSize: '11px',
                                                fontWeight: '500',
                                                marginRight: '8px',
                                            }}
                                        >
                                            Old Announcements
                                        </span>
                                        <img
                                            src="assets/arrow-down2.png"
                                            alt="Arrow Down"
                                            style={{
                                                width: '16px',
                                                height: '16px',
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* User Info Section */}
                                <div
                                    className="d-flex align-items-start"
                                    style={{
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >
                                    <div className="d-flex align-items-start">
                                        <img
                                            src={sara.profile}
                                            alt="Teacher Profile"
                                            style={{
                                                width: '44px',
                                                height: '44px',
                                                borderRadius: '50%',
                                                marginRight: '15px',
                                            }}
                                        />
                                        <div>
                                            <h6
                                                style={{
                                                    margin: 0,
                                                    fontWeight: 500,
                                                    fontSize: '14px',
                                                    paddingTop: '2px',
                                                }}
                                            >
                                                {sara.name}
                                            </h6>
                                            <span
                                                style={{
                                                    display: 'block',
                                                    color: '#475467',
                                                    fontSize: '12px',
                                                    fontWeight: '400',
                                                }}
                                            >
                                                <img
                                                    src={sara.roleIcon}
                                                    alt="Role Icon"
                                                    style={{
                                                        width: '12px',
                                                        height: '12px',
                                                        marginRight: '5px',
                                                    }}
                                                />
                                                {sara.role}
                                            </span>
                                        </div>
                                    </div>
                                    <img
                                        src={sara.options}
                                        alt="Options"
                                        style={{
                                            width: '20px',
                                            height: '20px',
                                            cursor: 'pointer',
                                            marginRight: '18px',
                                        }}
                                    />
                                </div>

                                {/* Text Section */}
                                <div style={{ marginTop: '10px' }}>
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start',
                                            marginTop: '5px',
                                            marginBottom: '10px',
                                        }}
                                    >
                                        <p
                                            style={{
                                                margin: 0,
                                                color: '#374151',
                                                fontSize: '12px',
                                                fontWeight: '400',
                                                flex: 1,
                                                flexBasis: '85%',
                                                maxWidth: '85%',
                                            }}
                                        >
                                            {sara.message}
                                        </p>
                                        <img
                                            src={sara.thumb}
                                            alt="Thumb Icon"
                                            style={{
                                                width: '16px',
                                                height: '16.5px',
                                                marginRight: '15px',
                                                alignSelf: 'center',
                                            }}
                                        />
                                    </div>
                                    <span
                                        style={{
                                            fontSize: '11px',
                                            fontWeight: '400',
                                            color: '#4B5563',
                                        }}
                                    >
                                        {sara.time}
                                    </span>
                                </div>

                                {/* Button at the bottom */}
                                <div className="d-flex justify-content-center align-items-center mt-3">
                                    <button
                                        style={{
                                            backgroundColor: '#111827',
                                            color: '#fff',
                                            fontWeight: '400',
                                            padding: '10px 20px',
                                            border: 'none',
                                            borderRadius: '12px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '10px',
                                            cursor: 'pointer',
                                            fontSize: '12px',
                                        }}
                                        onClick={() => navigate('/create-announcement')}
                                    >
                                        <img
                                            src="assets/admin2.png"
                                            alt="Announcement Icon"
                                            style={{ width: '20px', height: '18px' }}
                                        />
                                        Create Announcement
                                    </button>
                                </div>
                            </div>
                            <Card className="p-3 mb-3" style={{ border: '1px solid #E5E7EB', borderRadius: '12px' }}>
                                {/* Header */}
                                <h5 className="fw-bold mb-3" style={{ fontSize: "16px", color: "#000", fontWeight: '600' }}>
                                    Fees and Payment Management
                                </h5>

                                {/* Amount Paid Today */}
                                <p style={{ fontSize: "14px", fontWeight: '500', color: '#111827', marginBottom: 4 }}>
                                    Amount Paid Today
                                </p>
                                <p style={{ fontSize: "14px", color: '#4B5563', fontWeight: '400', marginBottom: '0px' }}>
                                    Fees and Fines paid by today
                                </p>
                                <div style={{ display: 'flex', alignItems: 'baseline' }}>
                                    <h2 className="fw" style={{ fontSize: '24px', marginBottom: 0, fontWeight: '500' }}>
                                        {paymentInfo.amountPaidToday.toLocaleString()}
                                    </h2>
                                    <span style={{ fontSize: '14px', color: '#4B5563', paddingLeft: '6px', fontWeight: '400' }}>Rs</span>
                                </div>

                                <div style={{ borderBottom: '1px solid #EAECF0', marginTop: '10px', marginBottom: '10px' }}></div>

                                {/* Total Paid Amount */}
                                <p style={{ fontSize: '14px', fontWeight: '500', color: '#000', marginBottom: 0 }}>
                                    Total amount <span style={{ color: '#12B76A', paddingLeft: '6px', fontSize: '14px', fontWeight: '500' }}>{paymentInfo.totalPaid.toLocaleString()} Rs</span>
                                </p>

                                <div style={{ borderBottom: '1px solid #EAECF0', marginTop: '10px', marginBottom: '10px' }}></div>

                                {/* Pending Fees */}
                                <p style={{ fontSize: "14px", fontWeight: '500', color: '#111827', marginBottom: 0, marginTop: '12px' }}>
                                    Pending Fees
                                </p>
                                <p style={{ fontSize: '14px', color: '#4B5563', fontWeight: '400' }}>
                                    Fees challan number {paymentInfo.challanNumber} ({paymentInfo.challanStatus})
                                </p>
                                <div style={{ display: 'flex', alignItems: 'baseline' }}>
                                    <h4 className="fw" style={{ fontSize: '24px', marginBottom: 0, fontWeight: '500' }}>
                                        {paymentInfo.challanAmount.toLocaleString()}
                                    </h4>
                                    <span style={{ fontSize: '14px', color: '#4B5563', paddingLeft: '6px', fontWeight: '400' }}>Rs</span>
                                </div>
                                <div style={{ borderBottom: '1px solid #EAECF0', marginTop: '10px', marginBottom: '10px' }}></div>


                                {/* Pending Fines */}
                                <p style={{ fontSize: "14px", fontWeight: '500', color: '#111827', marginBottom: 0, marginTop: '12px' }}>
                                    Pending Fines
                                </p>
                                <p style={{ fontSize: '14px', color: '#4B5563', fontWeight: '400' }}>
                                    Fine number {paymentInfo.fineNumber} ({paymentInfo.fineStatus})
                                </p>
                                <div style={{ display: 'flex', alignItems: 'baseline' }}>
                                    <h4 className="fw" style={{ fontSize: '24px', fontWeight: '500', marginBottom: 0 }}>
                                        {paymentInfo.fineAmount.toLocaleString()}
                                    </h4>
                                    <span style={{ fontSize: '14px', color: '#4B5563', fontWeight: '400', paddingLeft: '6px' }}>Rs</span>
                                </div>

                                <div style={{ borderBottom: '1px solid #EAECF0', marginTop: '10px', marginBottom: '10px' }}></div>

                                {/* Total Due Amount */}
                                <p style={{ fontWeight: "500", fontSize: '14px', marginBottom: '0px', marginTop: '8px' }}>
                                    Total amount <span style={{ color: '#D92D20', fontSize: '14px', fontWeight: '500', paddingLeft: '6px' }}>{paymentInfo.totalDue.toLocaleString()} Rs</span>
                                </p>

                                {/* VIEW Button */}
                                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
                                    <Button
                                        variant="dark"
                                        onClick={handleViewClick}
                                        style={{
                                            fontSize: '14px',
                                            fontWeight: '500',
                                            height: '45px',
                                            borderRadius: '12px',
                                            padding: '0 50px',
                                            backgroundColor: '#111827',
                                            border: 'none',
                                            color: '#fff'
                                        }}
                                    >
                                        VIEW
                                    </Button>
                                </div>
                            </Card>


                        </Col>

                    </Row>


                    <Row style={{ marginTop: '0px' }}>

                        <Col md={6}>

                        </Col>
                    </Row>
                </Col>
            </Row>

        </Container>
    );
};

export default Dashboard;
