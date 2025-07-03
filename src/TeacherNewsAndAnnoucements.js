import { color, fontString } from "chart.js/helpers";
import React, { useState, useRef } from "react";
import { Form, Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const DropdownWithArrow = ({ value, onChange, options, width = "130px" }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleSelect = (option) => {
        onChange(option);
        setIsOpen(false);
    };


    return (
        <div style={{ position: "relative", width }}>
            <Button
                onClick={toggleDropdown}
                style={{
                    borderRadius: "8px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#111827",
                    border: "1px solid #D1D5DB",
                    background: "transparent",
                    padding: "10px 20px",
                }}
            >
                {value} <img src="/assets/arrow-down.png" alt="Dropdown" style={{ marginLeft: "5px", width: "12px", height: "12px" }} />
            </Button>
            {isOpen && (
                <div
                    style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        background: "white",
                        border: "1px solid #D1D5DB",
                        borderRadius: "8px",
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                        zIndex: 10,
                        width: "100%",
                    }}
                >
                    {options.map((option) => (
                        <div
                            key={option}
                            onClick={() => handleSelect(option)}
                            style={{
                                padding: "10px 20px",
                                cursor: "pointer",
                                borderBottom: "1px solid #E5E7EB",
                            }}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const TeacherCreateAnnouncements = () => {
    const [announcementTitle, setAnnouncementTitle] = useState("Demo Title");
    const [description, setDescription] = useState(
        "This is a demo announcement by teacher to student. This is demo by teacher. This is demo announcement by teacher to student. This is demo."
    );

    const applyFormatting = (command) => {
        // Execute the command on the selected text in the contentEditable area
        document.execCommand(command, false, null);
    };
    const [scheduleAnnouncement, setScheduleAnnouncement] = useState(true);
    const [day, setDay] = useState("Monday");
    const [month, setMonth] = useState("Sep");
    const [time, setTime] = useState("00:00");
    const [period, setPeriod] = useState("PM");
    const [icsSelected, setIcsSelected] = useState("Sections");
    const [sectionSelected, setSectionSelected] = useState("Classes");

    const navigate = useNavigate();




    return (
        <div style={{ padding: "20px", fontFamily: "Inter, sans-serif", margin: "auto" }}>
            {/* Header Section */}
            <header className="d-flex align-items-center mb-4">
                <Image
                    src="/assets/arrow-left.png"
                    roundedCircle
                    width={24}
                    height={24}
                    className="me-2"
                    alt="Back Arrow"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(-1)}
                />
                <h1 className="m-0" style={{ fontSize: "24px", fontWeight: "600" }}>
                    News And Announcements
                </h1>
            </header>

            <header className="d-flex justify-content-between align-items-center mb-4">
                {/* Left Section: "Create Announcements" */}
                <div className="d-flex align-items-center">
                    <h1 className="m-0" style={{ fontSize: "18px", fontWeight: '600', fontWeight: "600" }}>
                        Create Announcements
                    </h1>
                </div>

                {/* Right Section: Dropdowns for ICS and Section */}
                <div style={{ display: "flex", gap: "0px", }}>
                    <DropdownWithArrow
                        value={icsSelected}
                        onChange={setIcsSelected}
                        options={["Section1", "Section2", "Section3"]}
                    />
                    <DropdownWithArrow
                        value={sectionSelected}
                        onChange={setSectionSelected}
                        options={["Class1", "class2", "class3"]}
                    />
                </div>
            </header>
            <div style={{ borderBottom: '1px solid #EAECF0', marginTop: '20px' }}></div>


            {/* Announcement Title */}
            <Form.Group className="mb-3" style={{ marginTop: '15px' }}>
                <Form.Label style={{ fontSize: "14px", fontWeight: "500", color: "#344054" }}>
                    Announcement Title
                </Form.Label>
                <Form.Control
                    type="text"
                    value={announcementTitle}
                    onChange={(e) => setAnnouncementTitle(e.target.value)}
                    style={{
                        borderRadius: "8px",
                        fontSize: "16px",
                        color: "#475467",
                        padding: "10px",
                        border: "1px solid #D0D5DD",
                        width: "50%",
                        fontWeight: '400',
                        color: '#101828'
                    }}
                />
            </Form.Group>

            <div style={{ borderBottom: '1px solid #EAECF0', marginTop: '20px' }}></div>

            <Form.Group className="mb-3" style={{ marginTop: '15px' }}>
                <Form.Label style={{ fontSize: "16px", fontWeight: "500", color: "#344054" }}>
                    <h5 style={{ fontSize: '14px', fontWeight: '500', color: '#344054', marginTop: '10px' }}>Announcement</h5>
                    <p style={{ fontSize: '14px', fontWeight: '500', color: '#475467', marginBottom: '20px' }}>Write announcement here.</p>
                </Form.Label>

                {/* Formatting Toolbar */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: '10px',
                        backgroundColor: "#F9FAFB",
                    }}
                >
                    <Form.Select
                        defaultValue="Regular"
                        style={{
                            border: "1px solid #D1D5DB",
                            borderRadius: "8px",
                            fontSize: "16px",
                            fontWeight: "500",
                            color: "#111827",
                            width: "250px",
                            height: '40px',
                            padding: "5px",
                        }}
                    >
                        <option value="Regular">Regular</option>
                        <option value="Heading">Heading</option>
                        <option value="Subheading">Subheading</option>
                    </Form.Select>
                    <Button
                        onClick={() => applyFormatting("bold")}
                        style={{
                            background: "none",
                            border: 'none',
                        }}
                    >
                        <img src="/assets/bold.png" alt="Bold" style={{ width: "32px", height: "32px" }} />
                    </Button>
                    <Button
                        onClick={() => applyFormatting("italic")}
                        style={{
                            background: "none",
                            border: 'none',
                        }}
                    >
                        <img src="/assets/italic.png" alt="Italic" style={{ width: "32px", height: "32px" }} />
                    </Button>
                    <Button
                        onClick={() => applyFormatting("underline")}
                        style={{
                            background: "none",
                            border: 'none',
                        }}
                    >
                        <img src="/assets/editor.png" alt="Underline" style={{ width: "32px", height: "32px" }} />
                    </Button>


                    {/* Bullet and Numbered Lists */}
                    <Button
                        onClick={() => applyFormatting("insertUnorderedList")}
                        style={{
                            background: "none",
                            border: 'none',
                        }}
                    >
                        <img src="/assets/editor2.png" alt="Bullet" style={{ width: "32px", height: "32px" }} />
                    </Button>

                    <Button
                        onClick={() => applyFormatting("insertOrderedList")}
                        style={{
                            background: "none",
                            border: 'none',
                        }}
                    >
                        <img src="/assets/editor3.png" alt="Number" style={{ width: "32px", height: "32px" }} />
                    </Button>
                </div>

                {/* ContentEditable div */}
                <div
                    contentEditable
                    style={{
                        borderRadius: "8px",
                        fontSize: "16px",
                        color: '#101828',
                        fontWeight: '400',
                        padding: "10px",
                        border: '1px solid #D0D5DD',
                        width: '50%',
                        minHeight: '150px',
                        backgroundColor: '#fff',
                        lineHeight: '1.5',
                    }}
                    dangerouslySetInnerHTML={{ __html: description }}
                    onInput={(e) => setDescription(e.target.innerHTML)}  // Save the updated content
                />

                <div style={{ borderBottom: '1px solid #EAECF0', marginTop: '20px' }}></div>
            </Form.Group>

            {/* Schedule Announcement */}
            <Form.Check
                type="checkbox"
                label="Schedule an announcement."
                checked={scheduleAnnouncement}
                onChange={(e) => setScheduleAnnouncement(e.target.checked)}
                style={{ fontSize: "12px", color: "#374151", fontWeight: "500", marginBottom: "15px" }}
            />

            {scheduleAnnouncement && (
                <div>
                    <Form.Label
                        style={{ fontSize: "14px", fontWeight: "500", color: "#4B5563", marginBottom: "8px", display: "block" }}
                    >
                        Announcement publish time
                    </Form.Label>

                    <div
                        style={{
                            display: "flex",
                            // gap: "10px",
                            alignItems: "center",
                            flexWrap: "wrap",
                        }}
                    >
                        <DropdownWithArrow
                            value={day}
                            onChange={setDay}
                            options={["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]}
                            buttonStyle={{
                                color: "var(--Neutral-900, #111827)",
                                fontFamily: "Inter",
                                fontSize: "12px",
                                fontStyle: "normal",
                                fontWeight: "600",
                                lineHeight: "20px", /* 166.667% */
                            }}
                        />
                        <DropdownWithArrow
                            value={month}
                            onChange={setMonth}
                            options={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]}
                            width="103px"

                            buttonStyle={{
                                color: "var(--Neutral-900, #111827)",
                                fontFamily: "Inter",
                                fontSize: "12px",
                                fontStyle: "normal",
                                fontWeight: "600",
                                lineHeight: "20px", /* 166.667% */
                            }}
                        />
                        <Form.Control
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            style={{
                                borderRadius: "8px",
                                fontSize: "14px",
                                padding: "10px",
                                fontWeight: "500",
                                color: "#111827",
                                border: "1px solid #E5E7EB",
                                width: "120px",
                            }}
                        />
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginLeft: '12px'
                            }}
                        >
                            <DropdownWithArrow
                                value={period}
                                onChange={setPeriod}
                                options={["AM", "PM"]}
                                width="120px"

                                buttonStyle={{
                                    color: "var(--Neutral-900, #111827)",
                                    fontFamily: "Inter",
                                    fontSize: "12px",
                                    fontStyle: "normal",
                                    fontWeight: "600",
                                    lineHeight: "20px", /* 166.667% */
                                    border: '1px solid #E5E7EB'
                                }}
                            />
                        </div>

                    </div>

                </div>
            )}
            <div style={{ borderBottom: '1px solid #EAECF0', marginTop: '20px' }}></div>

            {/* Publish Button */}
            <div className="d-flex justify-content-end" style={{ marginTop: "20px" }}>
                <Button
                    style={{
                        borderRadius: "8px",
                        fontSize: "16px",
                        fontWeight: "500",
                        color: "white",
                        background: "#000000",
                        border: "none",
                        padding: "10px 20px",
                        width: "100px",
                    }}
                >
                    Publish
                </Button>
            </div>

        </div>
    );
};

export default TeacherCreateAnnouncements;
