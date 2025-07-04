import React from "react";
import { Card, Form, InputGroup, Image, Button, Dropdown } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

const NewsAndAnnouncements = () => {
    const navigate = useNavigate();
    const announcements = [
        {
            id: 1,
            name: "Arsalan Mushtaq",
            role: "Teacher",
            avatar: "/assets/Avatar3.png",
            content:
                "This is a demo announcement by teacher for students. This is a demo announcement by teacher for students.",
            time: "Thu, 19 Sep 2024 12:40 PM",
            bgColor: "#F9FAFB",
        },
        {
            id: 2,
            name: "Arsalan Mushtaq",
            role: "Teacher",
            avatar: "/assets/Avatar4.png",
            content:
                "This is a demo announcement by teacher for students. This is a demo announcement by teacher for students.",
            time: "Thu, 19 Sep 2024 12:40 PM",
            bgColor: "#E0E7FF",
        },
        {
            id: 3,
            name: "Arsalan Mushtaq",
            role: "Teacher",
            avatar: "/assets/Avatar5.png",
            content:
                "This is a demo announcement by teacher for students. This is a demo announcement by teacher for students.",
            time: "Thu, 19 Sep 2024 12:40 PM",
            bgColor: "#FFEBEB",
        },
        {
            id: 4,
            name: "Arsalan Mushtaq",
            role: "Teacher",
            avatar: "/assets/Avatar5.png",
            content:
                "This is a demo announcement by teacher for students. This is a demo announcement by teacher for students.",
            time: "Thu, 19 Sep 2024 12:40 PM",
            bgColor: "#FFEBEB",
        },
        {
            id: 5,
            name: "Arsalan Mushtaq",
            role: "Teacher",
            avatar: "/assets/Avatar5.png",
            content:
                "This is a demo announcement by teacher for students. This is a demo announcement by teacher for students.",
            time: "Thu, 19 Sep 2024 12:40 PM",
            bgColor: "#FFEBEB",
        },
        {
            id: 6,
            name: "Arsalan Mushtaq",
            role: "Teacher",
            avatar: "/assets/Avatar5.png",
            content:
                "This is a demo announcement by teacher for students. This is a demo announcement by teacher for students.",
            time: "Thu, 19 Sep 2024 12:40 PM",
            bgColor: "#FFEBEB",
        },
    ];

    return (
        <div style={{ padding: "15px" }}>
            {/* Header */}
            <header className="d-flex justify-content-between align-items-center mb-4" id="news-header" >
                <div className="d-flex align-items-center">
                    <Image
                    id="arrow-left"
                        src="/assets/arrow-left.png"
                        roundedCircle
                        width={24}
                        height={24}
                        className="me-2"
                        alt="Back Arrow"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate(-1)}
                    />
                    <h1 id="news-heading" className="m-0" style={{ fontSize: "24px", fontWeight: "600" }}>
                        News And Annoucements
                    </h1>
                </div>

                <div className="d-flex align-items-center">
                    <img
                    id="avatar-img"
                        src="/assets/avatar.jpeg"
                        alt="User"
                        className="rounded-circle me-2"
                        style={{ width: "54px", height: "54px" }}
                    />
                    <div className="me-0">
                        <div style={{ fontWeight: "500", fontSize: "14px" }}>Mian Hamad Khalil</div>
                        <div style={{ fontSize: "12px", color: "#6c757d" }}>123456</div>
                    </div>
                  
                </div>
            </header>

            <Card style={{ border: "1px solid #E5E7EB", borderRadius: "8px" }}>
                {announcements.map((announcement, index) => (
                    <div
                        key={announcement.id}
                        style={{
                            padding: "16px",
                            borderTop: index === 0 ? "none" : "1px solid #E5E7EB",
                            display: "flex",
                            alignItems: "flex-start",
                            position: "relative", // To position the dots at the top-right corner
                            flexDirection: "column", // Ensure content and time are displayed below user info
                        }}
                    >
                        {/* Avatar and User Info Section */}
                        <div style={{ display: "flex", alignItems: "flex-start" }}>
                            <Image
                                src={announcement.avatar}
                                roundedCircle
                                style={{
                                    width: "44px",
                                    height: "44px",
                                    marginRight: "12px",
                                    border: `2px solid ${announcement.bgColor}`,
                                }}
                            />
                            <div>
                                <h6 className="mb-0" style={{ fontWeight: "500", fontSize: '16px' }}>
                                    {announcement.name}
                                </h6>
                                <span
                                    style={{
                                        fontSize: "14px",
                                        fontWeight: "400",
                                        color: "#6B7280",
                                        display: "inline-flex",
                                        alignItems: "center",

                                    }}
                                >
                                    <Image
                                        src="/assets/teacher.png" // Replace with your small image
                                        style={{
                                            width: "12px",
                                            height: "12px",
                                            marginRight: "4px",
                                        }}
                                    />
                                    {announcement.role}
                                </span>
                            </div>

                        </div>

                        {/* Content Section */}
                        <div
                            style={{
                                marginTop: "8px",
                                position: "relative", // Establish a positioning context for the image
                                display: 'flex',
                                justifyContent: 'space-between',
                                width: '100%',
                            }}
                        >
                            <p
                                className="mb-1"
                                style={{ fontSize: "12px", fontWeight: '400', color: "#374151", marginRight: "24px" }} // Space for the image
                            >
                                {announcement.content}
                            </p>
                            <Image
                                src="/assets/thumb.png" // Replace with your image path
                                style={{
                                    width: "14px",
                                    height: "14px",
                                    position: "absolute", // Place the image relative to the container
                                    top: "0", // Align vertically at the top
                                    right: "0", // Align horizontally to the right
                                }}
                            />
                        </div>


                        {/* Date-Time Section */}
                        <div style={{ marginTop: "4px", fontSize: '12px', fontWeight: '400' }}>
                            <small className="text-muted">{announcement.time}</small>
                        </div>

                       
                    </div>
                ))}
            </Card>


        </div>
    );
};

export default NewsAndAnnouncements;
