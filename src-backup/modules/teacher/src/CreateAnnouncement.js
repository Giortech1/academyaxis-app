import React, { useState, useContext } from "react";
import { Form, Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { toast, ToastContainer } from "react-toastify";

const CreateAnnouncement = () => {
    const { user, userData, sections, createAnnouncement } = useContext(UserContext);
    const navigate = useNavigate();

    const [announcementTitle, setAnnouncementTitle] = useState("");
    const [description, setDescription] = useState("");
    const [scheduleAnnouncement, setScheduleAnnouncement] = useState(false);
    const [scheduleDate, setScheduleDate] = useState(new Date());
    const [scheduleTime, setScheduleTime] = useState("09:00 AM");
    const [sectionSelected, setSectionSelected] = useState(null);
    const [isPublishing, setIsPublishing] = useState(false);

    const applyFormatting = (command) => {
        document.execCommand(command, false, null);
    };

    const createScheduledDateTime = (date, timeStr) => {
        const time24 = convertTo24Hour(timeStr);
        const [hours, minutes] = time24.split(':');

        const scheduleDateTime = new Date(date);
        scheduleDateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

        return scheduleDateTime.toISOString();
    };

    const convertTo24Hour = (timeStr) => {
        const [time, period] = timeStr.split(' ');
        const [hours, minutes] = time.split(':');
        let hour24 = parseInt(hours);

        if (period === 'PM' && hour24 !== 12) {
            hour24 += 12;
        } else if (period === 'AM' && hour24 === 12) {
            hour24 = 0;
        }

        return `${hour24.toString().padStart(2, '0')}:${minutes}`;
    };

    const validateForm = () => {
        if (!announcementTitle.trim()) {
            toast.error("Please enter an announcement title.");
            return false;
        }

        if (!description.trim()) {
            toast.error("Please enter announcement description.");
            return false;
        }

        if (!sectionSelected) {
            toast.error("Please select a section.");
            return false;
        }

        if (scheduleAnnouncement) {
            const scheduledDateTime = createScheduledDateTime(scheduleDate, scheduleTime);
            if (new Date(scheduledDateTime) <= new Date()) {
                toast.error("Schedule time must be in the future");
                return false;
            }
        }

        return true;
    };

    const handlePublish = async () => {
        if (!validateForm()) return;
        
        setIsPublishing(true);

        let scheduledDateTime = null;
        if (scheduleAnnouncement) {
            scheduledDateTime = createScheduledDateTime(scheduleDate, scheduleTime);
        }

        const payload = {
            title: announcementTitle.trim(),
            description: description.trim(),
            course: sectionSelected.course,
            department: sectionSelected.department,
            program: sectionSelected.program,
            sectionId: sectionSelected?.id,
            isScheduled: scheduleAnnouncement,
            student_ids: sectionSelected?.student_ids,
            scheduleDateTime: scheduledDateTime,
            scheduleDate: scheduleAnnouncement ? scheduleDate.toISOString() : null,
            scheduleTime: scheduleAnnouncement ? scheduleTime : null,
            type: 'Students',
            createdBy: {
                name: userData?.full_name,
                profile_pic: userData?.profile_pic || null,
                doc_id: user?.uid,
                id: userData?.teacher_id,
                type: "Teacher"
            },
            createdAt: new Date().toISOString(),
        };

        try {
            const result = await createAnnouncement(payload);
            if (result?.success) {
                toast.success("Announcement published successfully!");
                setTimeout(() => {
                    navigate(-1);
                }, 1500);
            } else {
                toast.error(result?.message || "Failed to publish announcement");
                setIsPublishing(false);
            }
        } catch (error) {
            console.error("Error publishing announcement:", error);
            toast.error("Failed to publish announcement.");
            setIsPublishing(false);
        }
    };

    const handleSectionChange = (e) => {
        const value = e.target.value;
        if (value) {
            setSectionSelected(JSON.parse(value));
        } else {
            setSectionSelected(null);
        }
    };

    return (
        <div style={styles.container}>
            {/* Header */}
            <header className="d-flex align-items-center mb-4">
                <Image
                    src="/assets/arrow-left.png"
                    roundedCircle
                    width={24}
                    height={24}
                    className="me-2"
                    alt="Back Arrow"
                    style={styles.backArrow}
                    onClick={() => navigate(-1)}
                />
                <h1 className="m-0" style={styles.mainHeading}>News And Announcements</h1>
            </header>

            {/* Subheader */}
            <header className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="m-0" style={styles.subHeader}>Create Announcements</h1>

                {/* Section Dropdown */}
                <div style={styles.selectWrapper}>
                    <select
                        name="Select Section"
                        className="form-control"
                        style={styles.select}
                        onChange={handleSectionChange}
                        value={sectionSelected ? JSON.stringify(sectionSelected) : ""}
                    >
                        <option value="">Select Section</option>
                        {sections?.map((option) => (
                            <option key={option?.name} value={JSON.stringify(option)}>
                                {option?.course?.name} (Section {option?.section})
                            </option>
                        ))}
                    </select>
                    <img src="/assets/arrow-down.png" alt="Dropdown" style={styles.arrowIcon} />
                </div>
            </header>

            <div style={styles.divider}></div>

            {/* Title Input */}
            <Form.Group className="mb-3" style={{ marginTop: "15px" }}>
                <Form.Label style={styles.label}>Announcement Title *</Form.Label>
                <Form.Control
                    type="text"
                    value={announcementTitle}
                    onChange={(e) => setAnnouncementTitle(e.target.value)}
                    placeholder="Enter announcement title"
                    style={styles.titleInput}
                    disabled={isPublishing}
                />
            </Form.Group>

            <div style={styles.divider}></div>

            {/* Description */}
            <Form.Group className="mb-3" style={{ marginTop: "15px" }}>
                <Form.Label>
                    <h5 style={styles.announcementHeader}>Announcement *</h5>
                    <p style={styles.announcementSubtext}>Write announcement here.</p>
                </Form.Label>

                {/* Formatting Toolbar */}
                <div style={styles.toolbar}>
                    <Form.Select defaultValue="Regular" style={styles.formatSelect}>
                        <option value="Regular">Regular</option>
                        <option value="Heading">Heading</option>
                        <option value="Subheading">Subheading</option>
                    </Form.Select>
                    <Button onClick={() => applyFormatting("bold")} style={styles.formatButton}>
                        <img src="/assets/bold.png" alt="Bold" width="32" height="32" />
                    </Button>
                    <Button onClick={() => applyFormatting("italic")} style={styles.formatButton}>
                        <img src="/assets/italic.png" alt="Italic" width="32" height="32" />
                    </Button>
                    <Button onClick={() => applyFormatting("underline")} style={styles.formatButton}>
                        <img src="/assets/editor.png" alt="Underline" width="32" height="32" />
                    </Button>
                    <Button onClick={() => applyFormatting("insertUnorderedList")} style={styles.formatButton}>
                        <img src="/assets/editor2.png" alt="Bullet" width="32" height="32" />
                    </Button>
                    <Button onClick={() => applyFormatting("insertOrderedList")} style={styles.formatButton}>
                        <img src="/assets/editor3.png" alt="Number" width="32" height="32" />
                    </Button>
                </div>

                <Form.Control
                    as="textarea"
                    rows={5}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter announcement description..."
                    style={styles.textarea}
                    disabled={isPublishing}
                />

                <div style={styles.divider}></div>
            </Form.Group>

            {/* Schedule */}
            <Form.Check
                type="checkbox"
                label="Schedule an announcement."
                checked={scheduleAnnouncement}
                onChange={(e) => setScheduleAnnouncement(e.target.checked)}
                style={styles.scheduleCheckbox}
                disabled={isPublishing}
            />

            {scheduleAnnouncement && (
                <div>
                    <Form.Label style={styles.scheduleLabel}>
                        Announcement publish date and time
                    </Form.Label>
                    <div style={styles.scheduleControls}>
                        <Form.Control
                            type="date"
                            value={scheduleDate.toISOString().split("T")[0]}
                            onChange={(e) => setScheduleDate(new Date(e.target.value))}
                            style={styles.scheduleDateInput}
                            min={new Date().toISOString().split("T")[0]}
                            disabled={isPublishing}
                        />

                        <div style={styles.timeContainer}>
                            <img src="/assets/clock2.png" alt="Clock Icon" style={styles.clockIcon} />
                            <Form.Control
                                as="select"
                                value={scheduleTime}
                                onChange={(e) => setScheduleTime(e.target.value)}
                                style={styles.scheduleTimeSelect}
                                disabled={isPublishing}
                            >
                                {Array.from({ length: 24 }).map((_, i) => {
                                    const hour = i % 12 || 12;
                                    const period = i < 12 ? "AM" : "PM";
                                    const value = `${hour.toString().padStart(2, "0")}:00 ${period}`;
                                    return (
                                        <option key={value} value={value}>
                                            {value}
                                        </option>
                                    );
                                })}
                            </Form.Control>
                            <img src="/assets/arrow-down.png" alt="Arrow Down" style={styles.arrowIcon} />
                        </div>
                    </div>

                    <div style={styles.schedulePreview}>
                        <small style={styles.schedulePreviewText}>
                            This announcement will be published on {scheduleDate.toLocaleDateString()} at {scheduleTime}
                        </small>
                    </div>
                </div>
            )}

            <div style={styles.divider}></div>

            {/* Publish Button */}
            <div className="d-flex justify-content-end" style={{ marginTop: "20px" }}>
                <Button 
                    onClick={handlePublish} 
                    style={styles.publishButton}
                    disabled={isPublishing}
                >
                    {isPublishing ? "Publishing..." : "Publish"}
                </Button>
            </div>

            <ToastContainer 
                position="top-right"
                autoClose={1200}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
};

const styles = {
    container: {
        padding: "20px",
        fontFamily: "Inter, sans-serif",
        margin: "auto"
    },
    backArrow: {
        cursor: "pointer"
    },
    mainHeading: {
        fontSize: "24px",
        fontWeight: "600"
    },
    subHeader: {
        fontSize: "18px",
        fontWeight: "600"
    },
    selectWrapper: {
        position: "relative",
        marginBottom: "12px"
    },
    select: {
        height: "45px",
        appearance: "none",
        WebkitAppearance: "none",
        MozAppearance: "none",
        paddingRight: "30px",
        borderRadius: "8px",
        fontSize: "14px",
        fontWeight: "600",
        color: "#111827",
        border: "1px solid #D1D5DB",
        background: "transparent"
    },
    formatSelect: {
        height: "36px",
        minWidth: "120px",
        appearance: "none",
        WebkitAppearance: "none",
        MozAppearance: "none",
        paddingRight: "30px",
        borderRadius: "4px",
        fontSize: "14px",
        fontWeight: "500",
        color: "#111827",
        border: "1px solid #D1D5DB",
        background: "white",
        marginRight: "8px"
    },
    arrowIcon: {
        position: "absolute",
        right: "10px",
        top: "50%",
        transform: "translateY(-50%)",
        width: "12px",
        height: "12px",
        pointerEvents: "none"
    },
    divider: {
        borderBottom: '1px solid #EAECF0',
        marginTop: '20px'
    },
    titleInput: {
        borderRadius: "8px",
        fontSize: "16px",
        color: "#101828",
        padding: "10px",
        border: "1px solid #D0D5DD",
        width: "50%",
        fontWeight: '400'
    },
    label: {
        fontSize: "14px",
        fontWeight: "500",
        color: "#344054"
    },
    announcementHeader: {
        fontSize: '14px',
        fontWeight: '500',
        color: '#344054',
        marginTop: '10px'
    },
    announcementSubtext: {
        fontSize: '14px',
        fontWeight: '500',
        color: '#475467',
        marginBottom: '20px'
    },
    toolbar: {
        display: "flex",
        alignItems: "center",
        marginBottom: '10px',
        backgroundColor: "#F9FAFB",
        padding: "8px",
        borderRadius: "6px",
        border: "1px solid #E5E7EB"
    },
    formatButton: {
        background: "none",
        border: "none",
        padding: "4px",
        marginLeft: "4px",
        borderRadius: "4px",
        transition: "background-color 0.2s"
    },
    textarea: {
        borderRadius: "8px",
        fontSize: "16px",
        fontWeight: "400",
        padding: "10px",
        border: "1px solid #D0D5DD",
        width: "50%",
        fontFamily: "inherit",
        lineHeight: "1.5",
        resize: "vertical"
    },
    scheduleCheckbox: {
        fontSize: "12px",
        color: "#374151",
        fontWeight: "500",
        marginBottom: "15px"
    },
    scheduleLabel: {
        fontSize: "14px",
        fontWeight: "500",
        color: "#4B5563",
        marginBottom: "8px",
        display: "block"
    },
    scheduleControls: {
        display: "flex",
        gap: "10px",
        alignItems: "center"
    },
    scheduleDateInput: {
        borderRadius: "8px",
        fontSize: "14px",
        padding: "10px",
        fontWeight: "500",
        color: "#111827",
        border: "1px solid #E5E7EB",
        width: "200px"
    },
    timeContainer: {
        position: "relative"
    },
    clockIcon: {
        position: "absolute",
        left: "10px",
        width: "20px",
        height: "20px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 1
    },
    scheduleTimeSelect: {
        border: "1px solid #D0D5DD",
        borderRadius: "8px",
        padding: "10px 30px 10px 40px",
        fontSize: "14px",
        width: "180px",
        appearance: "none",
        background: "white"
    },
    schedulePreview: {
        marginTop: "10px",
        padding: "8px",
        backgroundColor: "#F3F4F6",
        borderRadius: "6px",
        border: "1px solid #E5E7EB"
    },
    schedulePreviewText: {
        color: "#6B7280",
        fontSize: "12px",
        fontStyle: "italic"
    },
    publishButton: {
        borderRadius: "8px",
        fontSize: "16px",
        fontWeight: "500",
        color: "white",
        background: "#000000",
        border: "none",
        padding: "10px 20px",
        width: "120px",
        transition: "background-color 0.2s",
        opacity: 1
    }
};

export default CreateAnnouncement;