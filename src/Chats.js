import React, { useState, useEffect } from "react";
import { Row, Col, FormControl } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Chat = () => {
    const [users] = useState([
        { id: 1, name: "Felecia Rower", message: "I will purchase it for sure. 👍", time: "15 min" },
        { id: 2, name: "Adalberto Granzin", message: "UI/UX Designer", time: "1 hour" },
        { id: 3, name: "Zenia Jacobs", message: "Building surveyor", time: "3 hours" },
    ]);

    const [selectedUserId, setSelectedUserId] = useState(1);
    const [messages, setMessages] = useState([
        { id: 1, userId: 1, sender: "Felecia", text: "Hey John, I am looking for the best UI template. Could you please help me?", time: "1:15 PM" },
        { id: 2, userId: 1, sender: "You", text: "How can we help? We're here for you!", time: "1:15 PM" },
        { id: 3, userId: 1, sender: "Felecia", text: "Looks clean and fresh UI. 😍", time: "1:17 PM" },
        { id: 4, userId: 2, sender: "Adalberto", text: "Hello, I need a UI design for my project.", time: "2:00 PM" },
        { id: 5, userId: 2, sender: "You", text: "Sure! What kind of UI are you looking for?", time: "2:05 PM" },
        { id: 6, userId: 3, sender: "Zenia", text: "Hey, do you offer surveying tools?", time: "3:15 PM" },
    ]);

    const [newMessage, setNewMessage] = useState("");

    // Detect mobile view
    const [isMobileView, setIsMobileView] = useState(window.innerWidth < 786);
    const [showChatOnMobile, setShowChatOnMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 786;
            setIsMobileView(mobile);
            if (!mobile) {
                setShowChatOnMobile(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            setMessages([
                ...messages,
                {
                    id: messages.length + 1,
                    userId: selectedUserId,
                    sender: "You",
                    text: newMessage,
                    time: "Just now",
                },
            ]);
            setNewMessage("");
        }
    };

    const filteredMessages = messages.filter(msg => msg.userId === selectedUserId);
    const selectedUser = users.find(u => u.id === selectedUserId);

    return (
        <div className="chat-container vh-100 d-flex justify-content-center align-items-center">
            <Row className="w-100 p-0 m-0 h-100">
                {/* Sidebar */}
                {(!isMobileView || !showChatOnMobile) && (
                    <Col xs={12} md={4} className="p-3 " style={{ backgroundColor: "#FBFBFB" }}>
                        <div className="d-flex align-items-center mb-4">
                            <img src="/assets/Avatar4.png" alt="Avatar" style={{ width: "40px", height: "40px", borderRadius: "50%" }} />
                            <div style={{ flex: 1, marginLeft: "10px", position: "relative" }}>
                                <img src="/assets/Adornment.png" alt="Search" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", width: "20px", }} />
                                <input type="text" className="form-control" placeholder="Search..." style={{ padding: "8px 12px 8px 40px", borderRadius: "20px", border: "1px solid #ddd", fontSize: "14px", }} />
                            </div>
                        </div>

                        <div className="mb-3" style={{ fontSize: "14px", fontWeight: "600", color: "#6B7280" }}>Today</div>

                        {users.map(user => (
                            <div
                                key={user.id}
                                className="d-flex align-items-center mb-3 p-2"
                                style={{
                                    borderRadius: "10px",
                                    cursor: "pointer",
                                    backgroundColor: selectedUserId === user.id ? "#4B5563" : "transparent",
                                    color: selectedUserId === user.id ? "#FFFFFF" : "#000000",
                                }}
                                onClick={() => {
                                    setSelectedUserId(user.id);
                                    if (isMobileView) setShowChatOnMobile(true);
                                }}
                            >
                                <div style={{ position: "relative", marginRight: "10px" }}>
                                    <img src="/assets/Avatar5.png" alt="Avatar" style={{ width: "40px", height: "40px", borderRadius: "50%" }} />
                                    <img src="/assets/Badge.png" alt="Badge" style={{ position: "absolute", bottom: "0px", right: "0px", width: "12px", height: "12px", border: '2px solid white', borderRadius: '100%' }} />
                                </div>
                                <div>
                                    <div style={{ fontWeight: "400", fontSize: "16px", color: selectedUserId === user.id ? "#FFFFFF" : "#000000" }}>
                                        {user.name}
                                    </div>
                                    <div style={{ fontSize: "14px", fontWeight: "400", color: selectedUserId === user.id ? "#D1D5DB" : "#6B7280" }}>
                                        {user.message}
                                    </div>
                                </div>
                                <div style={{ marginLeft: "auto", fontSize: "16px", fontWeight: "400", color: selectedUserId === user.id ? "white" : "#4B5563" }}>
                                    {user.time}
                                </div>
                            </div>
                        ))}
                    </Col>
                )}

                {/* Chat Window */}
                {(!isMobileView || showChatOnMobile) && (
                    <Col xs={12} md={8} className="p-0 d-flex flex-column h-100">
                        {/* Header */}
                        <div className="d-flex justify-content-between align-items-center p-3 ">
                            <div className="d-flex align-items-center">
                                {isMobileView && (
                                    <img
                                        id="arrow-left"
                                        src="/assets/arrow-left.png"
                                        alt="Back"
                                        style={{ width: "24px", marginRight: "10px", cursor: "pointer" }}
                                        onClick={() => setShowChatOnMobile(false)}
                                    />
                                )}
                                <div style={{ position: "relative", marginRight: "10px" }}>
                                    <img src="/assets/Avatar3.png" alt="Avatar" className="rounded-circle" style={{ width: "40px" }} />
                                    <img src="/assets/Badge.png" alt="Badge" style={{ position: "absolute", bottom: "0px", right: "0px", width: "12px", height: "12px", border: '2px solid white', borderRadius: '50%' }} />
                                </div>
                                <div>
                                    <div style={{ fontWeight: "500", fontSize: "16px" }}>
                                        {selectedUser?.name || "User"}
                                    </div>
                                    <div style={{ fontSize: "12px", color: "#22C55E" }}>Online</div>
                                </div>
                            </div>
                            <div>
                                <img src="/assets/Search3.png" alt="Search" style={{ width: "20px", marginRight: "10px", cursor: "pointer" }} />
                                <img src="/assets/MoreVert.png" alt="Menu" style={{ width: "20px", cursor: "pointer" }} />
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-grow-1 p-3" style={{ overflowY: "auto", backgroundColor: "#FFFFFF" }}>
                            {filteredMessages.map(msg => (
                                <div key={msg.id} className={`d-flex mb-3 ${msg.sender === "You" ? "justify-content-end" : "justify-content-start"}`}>
                                    {msg.sender !== "You" && (
                                        <img src="/assets/Avatar3.png" alt="Receiver Avatar" className="rounded-circle" style={{ width: "32px", height: "32px", marginRight: "10px", alignSelf: "flex-start" }} />
                                    )}
                                    <div className="d-flex flex-column">
                                        <div
                                            style={{
                                                backgroundColor: msg.sender === "You" ? "#4B5563" : "transparent",
                                                color: msg.sender === "You" ? "#FFFFFF" : "#000000",
                                                borderRadius: msg.sender === "You" ? "10px 0px 10px 10px" : "0px 10px 10px 10px", // Different border-radius for sender
                                                padding: "10px 15px",
                                                border: '1px solid #EAECF0',
                                            }}
                                        >
                                            {msg.text}
                                        </div>

                                        <div style={{ fontSize: "12px", color: "#4B5563", fontWeight: '400', marginTop: "4px", textAlign: msg.sender === "You" ? "right" : "left" }}>
                                            {msg.time}
                                        </div>
                                    </div>
                                    {msg.sender === "You" && (
                                        <img src="/assets/Avatar6.png" alt="Sender Avatar" className="rounded-circle" style={{ width: "32px", height: "32px", marginLeft: "10px", alignSelf: "flex-start" }} />
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Input Section */}
                        <div id="chat-input"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                backgroundColor: "#FBFBFB",
                                padding: "16px 16px",
                                width: '90%',
                                justifyContent: 'center',
                                alignSelf: 'center',
                                height: '50px',
                                borderRadius: '8px',
                                marginBottom: '40px',
                                border: '1px solid #EAECF0'
                            }}>
                            <FormControl
                                placeholder="Type your message here..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                style={{
                                    border: "none",
                                    outline: "none",
                                    boxShadow: "none",
                                    padding: "10px",
                                    fontSize: "14px",
                                    color: "#6B7280",
                                    flex: 1,
                                    backgroundColor: "#FBFBFB",
                                    borderRadius: "8px",
                                }}
                            />
                            <img src="/assets/Mic.png" alt="Attach" style={{ width: "22px", height: "22px", marginLeft: "12px", marginRight: "12px", cursor: "pointer" }} />
                            <img src="/assets/AttachFile.png" alt="Mic" style={{ width: "22px", height: "22px", marginRight: "12px", cursor: "pointer" }} />
                            <button onClick={handleSendMessage} style={{
                                backgroundColor: "#4B5563",
                                color: "white",
                                border: "none",
                                borderRadius: "8px",
                                fontSize: "14px",
                                fontWeight: "500",
                                padding: "8px 16px",
                                cursor: "pointer",
                            }}>SEND</button>
                        </div>
                    </Col>
                )}
            </Row>

            {/* Styled JSX for Mobile */}
            <style jsx>{`
                @media (max-width: 786px) {
                    .chat-container {
                        padding: 0 !important;
                        align-items: stretch !important;
                        height:92vh !important;
                    }

                    .chat-container .row {
                        // flex-direction: column;
                        margin: 0;
                    }

                    .chat-container .col-4,
                    .chat-container .col-md-3 {
                        width: 100% !important;
                        max-width: 100%;
                        border-right: none !important;
                        border-bottom: 1px solid #ccc;
                        padding: 16px !important;
                    }

                    .chat-container .col-8,
                    .chat-container .col-md-9 {
                        width: 100% !important;
                        max-width: 100%;
                        padding: 0 !important;
                        display: flex;
                        flex-direction: column;
                    }

                    .chat-container .border-bottom {
                        padding: 12px !important;
                    }

                    .chat-container input.form-control {
                        width: 100%;
                    }

                    .chat-container .justify-content-between {
                        flex-direction: row;
                       
                        gap: 8px;
                    }

                    .chat-container .input-section {
                        flex-direction: column;
                        gap: 12px;
                        height: auto !important;
                        padding: 12px 12px !important;
                    }

                    .chat-container .input-section img {
                        margin: 0 8px;
                    }
                }
            `}</style>
        </div>
    );
};

export default Chat;
