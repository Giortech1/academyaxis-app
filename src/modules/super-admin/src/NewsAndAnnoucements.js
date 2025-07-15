import React, { useState } from "react";
import { Card, Form, Image, Button, Dropdown, Modal } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

const NewsAndAnnouncements = () => {
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState("");
    const [announcements, setAnnouncements] = useState([
        {
            id: 1,
            name: "Demo admin",
            role: "Admin",
            avatar: "/assets/Avatar3.png",
            content: "This is a demo announcement by teacher for students. This is a demo announcement by teacher for students.",
            time: "Thu, 19 Sep 2024 12:40 PM",
            bgColor: "#F9FAFB",
        },
        {
            id: 2,
            name: "Demo admin",
            role: "Admin",
            avatar: "/assets/Avatar4.png",
            content: "This is a demo announcement by teacher for students. This is a demo announcement by teacher for students.",
            time: "Thu, 19 Sep 2024 12:40 PM",
            bgColor: "#E0E7FF",
        },
        {
            id: 3,
            name: "Demo admin",
            role: "Admin",
            avatar: "/assets/Avatar3.png",
            content: "This is a demo announcement by teacher for students. This is a demo announcement by teacher for students.",
            time: "Thu, 19 Sep 2024 12:40 PM",
            bgColor: "#F9FAFB",
        },
        {
            id: 4,
            name: "Demo admin",
            role: "Admin",
            avatar: "/assets/Avatar4.png",
            content: "This is a demo announcement by teacher for students. This is a demo announcement by teacher for students.",
            time: "Thu, 19 Sep 2024 12:40 PM",
            bgColor: "#E0E7FF",
        },
        {
            id: 5,
            name: "Demo admin",
            role: "Admin",
            avatar: "/assets/Avatar3.png",
            content: "This is a demo announcement by teacher for students. This is a demo announcement by teacher for students.",
            time: "Thu, 19 Sep 2024 12:40 PM",
            bgColor: "#F9FAFB",
        },
        {
            id: 6,
            name: "Demo admin",
            role: "Admin",
            avatar: "/assets/Avatar4.png",
            content: "This is a demo announcement by teacher for students. This is a demo announcement by teacher for students.",
            time: "Thu, 19 Sep 2024 12:40 PM",
            bgColor: "#E0E7FF",
        },
        // More announcements...
    ]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editAnnouncement, setEditAnnouncement] = useState(null);

    const handleDelete = (id) => {
        const filteredAnnouncements = announcements.filter(announcement => announcement.id !== id);
        setAnnouncements(filteredAnnouncements);
    };

    const handleEdit = (announcement) => {
        setEditAnnouncement(announcement);
        setShowEditModal(true);
    };

    const handleSaveEdit = () => {
        const updatedAnnouncements = announcements.map(announcement =>
            announcement.id === editAnnouncement.id ? editAnnouncement : announcement
        );
        setAnnouncements(updatedAnnouncements);
        setShowEditModal(false);
    };

    const handleEditChange = (e) => {
        setEditAnnouncement({ ...editAnnouncement, content: e.target.value });
    };

     // Handle navigation on button click
  const handleAddAnnouncementClick = () => {
    navigate('/create-announcement'); // Navigate to CreateAnnouncement.js
  };

    return (
        <div className="p-3">
            {/* Header */}
            <header className="d-flex justify-content-between align-items-center mb-4">
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
                    <h1 style={{ fontSize: "24px", fontWeight: "600" }}>News And Announcements</h1>
                </div>
            </header>

            {/* Filter Header */}
            <header
                className="d-flex justify-content-between align-items-center mb-4"
                style={{ marginTop: "15px", paddingRight: "20px", width: "100%" }}
            >
                {/* Left Side - Announcements By You */}
                <div
                    className="d-flex align-items-center"
                    style={{
                        backgroundColor: "white",
                        justifyContent: "center",
                    }}
                >
                    <span style={{ fontSize: "18px", fontWeight: "600", color: "#000" }}>
                        Announcements By You
                    </span>
                </div>

                {/* Right Side - Search and Add Announcement Button */}
                <div className="d-flex align-items-center">
                    {/* Search Input */}
                    <div className="position-relative me-3">
                        <Form.Control
                            type="text"
                            placeholder="Search"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            style={{
                                borderRadius: "8px",
                                paddingLeft: "40px",
                                fontSize: "14px",
                                fontWeight: "400",
                                color: "#98A2B3",
                                border: "1px solid #D1D5DB",
                                width: "300px",
                            }}
                        />
                        <Image
                            src="/assets/search-lg.png"
                            alt="Search Icon"
                            width={20}
                            height={20}
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: "12px",
                                transform: "translateY(-50%)",
                            }}
                        />
                    </div>

                    <Button
                        className="d-flex align-items-center"
                        style={{
                            backgroundColor: "#1F2937",
                            color: "white",
                            border: "1px solid #1F2937",
                            borderRadius: "8px",
                            fontSize: "14px",
                            fontWeight: "600",
                            padding: "8px 12px",
                        }}
                        onClick={handleAddAnnouncementClick} // Attach the click handler
                    >
                        + Add Announcement
                    </Button>
                </div>
            </header>

            {/* Announcements List */}
            <Card style={{ border: "1px solid #E5E7EB", borderRadius: "8px" }}>
                {announcements.map((announcement, index) => (
                    <div
                        key={announcement.id}
                        style={{
                            padding: "16px",
                            borderTop: index === 0 ? "none" : "1px solid #E5E7EB",
                            position: "relative", // Needed for absolute positioning of dropdown
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        {/* Dots Vertical Icon (Dropdown Trigger) positioned in top-right corner */}
                        <div style={{ position: "absolute", top: "16px", right: "16px" }}>
                            <Dropdown align="end">
                                <Dropdown.Toggle
                                    variant="link"
                                    id="dropdown-custom-components"
                                    style={{ border: 'none', background: 'transparent', padding: 0 }}
                                >
                                    <Image
                                        src="/assets/dots-vertical.png"
                                        style={{
                                            width: "20px",
                                            height: "20px",
                                        }}
                                    />
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => handleEdit(announcement)}>
                                        Edit
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleDelete(announcement.id)}>
                                        Delete
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>

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
                                        src="/assets/teacher.png"
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
                                display: 'flex',
                                justifyContent: 'space-between',
                                width: '100%',
                            }}
                        >
                            <p
                                className="mb-1"
                                style={{
                                    fontSize: "12px",
                                    fontWeight: '400',
                                    color: "#374151",
                                    marginRight: "24px"
                                }}
                            >
                                {announcement.content}
                            </p>
                        </div>

                        {/* Date-Time Section */}
                        <div style={{ marginTop: "4px", fontSize: '12px', fontWeight: '400' }}>
                            <small className="text-muted">{announcement.time}</small>
                        </div>
                    </div>
                ))}
            </Card>


            {/* Edit Announcement Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Announcement</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={editAnnouncement?.content || ""}
                        onChange={handleEditChange}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveEdit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <style>{`
  .dropdown-toggle::after {
    display: inline-block;
    margin-left: 0.255em;
    vertical-align: 0.255em;
    content: "";
    border-top: 0.3em solid;
    border-right: 0.3em solid transparent;
    border-bottom: 0;
    border-left: 0.3em solid transparent;
    display:none;
  }
`}</style>

        </div>
    );
};

export default NewsAndAnnouncements;
