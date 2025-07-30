import React, { useContext, useEffect, useState } from "react";
import { Card, Form, InputGroup, Image, Button, Dropdown, Modal } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { UserContext } from "./UserContext";
import { toast, ToastContainer } from "react-toastify";

const NewsAndAnnouncements = () => {
    const { userData, fetchCollection, deleteDocById } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [announcements, setAnnouncements] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (userData?.admin_id) {
            getAnnouncements();
        }
    }, [userData?.admin_id]);

    const getAnnouncements = async () => {
        try {
            const response = await fetchCollection('announcements');

            if (response?.success) {
                const announcementsWithFlag = response?.data?.map(announcement => ({
                    ...announcement,
                    isMine: announcement.createdBy?.id === userData?.admin_id
                }));
                setAnnouncements(announcementsWithFlag);
            }
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    const formatDateTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        return date.toLocaleString('en-US', {
            weekday: 'short',
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    const getAnnouncementBgColor = (index) => {
        const colors = ["#F9FAFB", "#E0E7FF", "#FFEBEB", "#F0FDF4"];
        return colors[index % colors.length];
    };

    const handleDeleteClick = (announcement) => {
        setSelectedAnnouncement(announcement);
        setShowDeleteModal(true);
    };

    const handleDeleteAnnouncement = async () => {
        if (!selectedAnnouncement) {
            setShowDeleteModal(false);
        };

        setIsDeleting(true);
        try {
            const response = await deleteDocById('announcements', selectedAnnouncement?.id);

            if (response?.success) {
                await getAnnouncements();
                toast.success("Announcement deleted successfully");
            }
        } catch (error) {
            console.log('Error deleteing announcement: ', error);
            toast.error("Something went wrong, please try again later.");
        } finally {
            setShowDeleteModal(false);
            setIsDeleting(false);
        }
    };

    if (isLoading) {
        return (
            <div style={styles.loadingContainer}>
                <div>Loading announcements...</div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            {/* Header */}
            <header className="d-flex justify-content-between align-items-center mb-4" id="news-header">
                <div className="d-flex align-items-center">
                    <Image
                        id="arrow-left"
                        src="/assets/arrow-left.png"
                        roundedCircle
                        width={24}
                        height={24}
                        className="me-2"
                        alt="Back Arrow"
                        style={styles.backArrow}
                        onClick={() => navigate(-1)}
                    />
                    <h1 id="news-heading" className="m-0" style={styles.mainHeading}>
                        News And Announcements
                    </h1>
                </div>

                <div className="d-flex align-items-center">
                    <img
                        id="avatar-img"
                        src={userData?.profile_pic || "/assets/avatar.jpeg"}
                        alt="User"
                        className="rounded-circle me-2"
                        style={styles.userAvatar}
                    />
                    <div className="me-0">
                        <div style={styles.userName}>{userData?.full_name || "User Name"}</div>
                        <div style={styles.userId}>{userData?.admin_id || "ID"}</div>
                    </div>
                    <button className="bg-transparent border-0">
                        <img
                            src="/assets/arrow-down.png"
                            alt="Dropdown"
                            style={styles.dropdownArrow}
                        />
                    </button>
                </div>
            </header>

            {/* Header Section */}
            <div style={styles.headerSection}>
                <h2 style={styles.subHeader}>
                    All Announcements ({announcements.length})
                </h2>

                {/* Action Buttons */}
                <div className="d-flex">
                    <Button
                        variant="outline-secondary"
                        className="me-2"
                        style={styles.sortButton}
                    >
                        <Image
                            src="/assets/filter-lines.png"
                            width={20}
                            height={20}
                            className="me-2"
                            alt="Sort"
                        />
                        <span style={styles.sortButtonText}>Sort</span>
                    </Button>
                    <Button
                        variant="primary"
                        style={styles.addButton}
                        onClick={() => navigate('/create-announcement')}
                    >
                        <Image
                            src="/assets/plus.png"
                            width={20}
                            height={20}
                            className="me-2"
                            alt="Add"
                        />
                        <span>Add Announcement</span>
                    </Button>
                </div>
            </div>

            {/* Announcements List */}
            {announcements.length === 0 ? (
                <Card style={styles.emptyCard}>
                    <div style={styles.emptyState}>
                        <img
                            src="/assets/empty-announcements.png"
                            alt="No announcements"
                            style={styles.emptyIcon}
                        />
                        <h4 style={styles.emptyTitle}>
                            No Announcements Yet
                        </h4>
                        <p style={styles.emptyDescription}>
                            There are no announcements to display at the moment.
                        </p>
                    </div>
                </Card>
            ) : (
                <Card style={styles.announcementsCard}>
                    {announcements.map((announcement, index) => (
                        <div
                            key={announcement.id}
                            style={{
                                ...styles.announcementItem,
                                borderTop: index === 0 ? "none" : "1px solid #E5E7EB"
                            }}
                        >
                            {/* Avatar and User Info Section */}
                            <div style={styles.userInfoSection}>
                                <Image
                                    src={announcement.createdBy?.profile_pic || "/assets/avatar.jpeg"}
                                    roundedCircle
                                    style={{
                                        ...styles.announcementAvatar,
                                        border: `2px solid ${getAnnouncementBgColor(index)}`
                                    }}
                                />
                                <div>
                                    <h6 style={styles.announcerName}>
                                        {announcement.createdBy?.name}
                                        {announcement.isMine && (
                                            <span style={styles.youBadge}>You</span>
                                        )}
                                        {announcement?.type && (
                                            <span style={styles.forBadge}>For {announcement?.type}</span>
                                        )}
                                    </h6>
                                    <span style={styles.announcerRole}>
                                        <Image
                                            src="/assets/teacher.png"
                                            style={styles.roleIcon}
                                        />
                                        {announcement?.createdBy?.type === 'Teacher' ? (
                                            <>
                                                Teacher • {announcement.course?.name}
                                            </>
                                        ) : (
                                            <>
                                                {announcement?.createdBy?.type}
                                            </>
                                        )}

                                    </span>
                                </div>
                            </div>

                            {/* Title Section */}
                            <div style={styles.titleSection}>
                                <h5 style={styles.announcementTitle}>{announcement.title}</h5>
                            </div>

                            {/* Content Section */}
                            <div style={styles.contentSection}>
                                <p style={styles.announcementContent}>
                                    {announcement.description}
                                </p>

                                {/* Schedule Info */}
                                {announcement.isScheduled && (
                                    <div style={styles.scheduleInfo}>
                                        <Image
                                            src="/assets/clock2.png"
                                            style={styles.scheduleIcon}
                                        />
                                        <span style={styles.scheduleText}>
                                            Scheduled for: {formatDateTime(announcement.scheduleDateTime)}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Meta Info Section */}
                            {announcement?.createdBy?.type === 'Teacher' &&
                                <div style={styles.courseInfo}>
                                    <span style={styles.courseCode}>{announcement.course?.code}</span>
                                    <span style={styles.department}>{announcement.department?.name}</span>
                                </div>
                            }
                            <small style={styles.createdTime}>
                                {formatDateTime(announcement.createdAt || new Date().toISOString())}
                            </small>

                            <div style={styles.actionCell}>
                                <div className="d-flex">
                                    <button
                                        style={styles.deleteButton}
                                        onClick={() => handleDeleteClick(announcement)}
                                    >
                                        <img
                                            src="/assets/delete.png"
                                            alt="Delete"
                                            style={styles.deleteIcon}
                                        />
                                    </button>
                                </div>
                            </div>

                        </div>
                    ))}
                </Card>
            )}

            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete Announcemnt?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)} disabled={isDeleting}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDeleteAnnouncement} disabled={isDeleting}>
                        {isDeleting ? 'Deleting...' : 'Delete'}
                    </Button>
                </Modal.Footer>
            </Modal>

            <ToastContainer />
        </div>
    );
};

const styles = {
    container: {
        padding: "15px"
    },
    loadingContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "200px",
        fontSize: "16px",
        color: "#6B7280"
    },
    backArrow: {
        cursor: "pointer"
    },
    mainHeading: {
        fontSize: "24px",
        fontWeight: "600"
    },
    userAvatar: {
        width: "54px",
        height: "54px",
        objectFit: "cover"
    },
    userName: {
        fontWeight: "500",
        fontSize: "14px"
    },
    userId: {
        fontSize: "12px",
        color: "#6c757d"
    },
    dropdownArrow: {
        width: "12px",
        height: "12px",
        verticalAlign: 'top'
    },
    headerSection: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px"
    },
    subHeader: {
        fontSize: "18px",
        fontWeight: "600",
        color: "#111827",
        margin: "0"
    },
    sortButton: {
        border: "1px solid #E5E7EB",
        borderRadius: "8px",
        padding: "8px 12px",
        display: "flex",
        alignItems: "center",
        backgroundColor: "white"
    },
    sortButtonText: {
        fontSize: "14px",
        color: "#374151",
        fontWeight: '600'
    },
    addButton: {
        backgroundColor: "#1F2937",
        border: "none",
        borderRadius: "8px",
        padding: "8px 12px",
        display: "flex",
        alignItems: "center",
        fontSize: '14px',
        fontWeight: '600'
    },
    emptyCard: {
        border: "1px solid #E5E7EB",
        borderRadius: "8px",
        padding: "40px 20px"
    },
    emptyState: {
        textAlign: "center"
    },
    emptyIcon: {
        width: "64px",
        height: "64px",
        marginBottom: "16px",
        opacity: 0.5
    },
    emptyTitle: {
        fontSize: "18px",
        fontWeight: "600",
        color: "#111827",
        marginBottom: "8px"
    },
    emptyDescription: {
        fontSize: "14px",
        color: "#6B7280",
        marginBottom: "20px"
    },
    announcementsCard: {
        border: "1px solid #E5E7EB",
        borderRadius: "8px"
    },
    announcementItem: {
        padding: "20px",
        position: "relative",
        display: "flex",
        flexDirection: "column"
    },
    userInfoSection: {
        display: "flex",
        alignItems: "flex-start",
        marginBottom: "12px"
    },
    announcementAvatar: {
        width: "44px",
        height: "44px",
        marginRight: "12px",
        objectFit: "cover"
    },
    announcerName: {
        fontWeight: "500",
        fontSize: '16px',
        marginBottom: "4px"
    },
    youBadge: {
        backgroundColor: "#EEF2FF",
        color: "#4F46E5",
        fontSize: "10px",
        fontWeight: "600",
        padding: "2px 6px",
        borderRadius: "4px",
        marginLeft: "8px"
    },
    forBadge: {
        backgroundColor: "#FEF3C7",
        color: "#D97706",
        fontSize: "10px",
        fontWeight: "600",
        padding: "2px 6px",
        borderRadius: "4px",
        marginLeft: "8px"
    },
    announcerRole: {
        fontSize: "14px",
        fontWeight: "400",
        color: "#6B7280",
        display: "inline-flex",
        alignItems: "center"
    },
    roleIcon: {
        width: "12px",
        height: "12px",
        marginRight: "4px"
    },
    titleSection: {
        marginBottom: "8px"
    },
    announcementTitle: {
        fontSize: "16px",
        fontWeight: "600",
        color: "#111827",
        marginBottom: "0"
    },
    contentSection: {
        position: "relative",
        marginBottom: "12px"
    },
    announcementContent: {
        fontSize: "14px",
        fontWeight: '400',
        color: "#374151",
        marginBottom: "8px",
        lineHeight: "1.5"
    },
    scheduleInfo: {
        display: "flex",
        alignItems: "center",
        marginBottom: "8px",
        padding: "6px 8px",
        backgroundColor: "#FEF3C7",
        borderRadius: "6px",
        width: "fit-content"
    },
    scheduleIcon: {
        width: "14px",
        height: "14px",
        marginRight: "6px"
    },
    scheduleText: {
        fontSize: "12px",
        color: "#92400E",
        fontWeight: "500"
    },
    metaSection: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    courseInfo: {
        display: "flex",
        gap: "12px"
    },
    courseCode: {
        fontSize: "12px",
        fontWeight: "600",
        color: "#4F46E5",
        backgroundColor: "#EEF2FF",
        padding: "2px 8px",
        borderRadius: "12px"
    },
    department: {
        fontSize: "12px",
        color: "#6B7280",
        fontWeight: "500"
    },
    createdTime: {
        fontSize: '12px',
        fontWeight: '400',
        color: "#9CA3AF"
    },
    actionCell: {
        position: 'absolute',
        verticalAlign: "middle",
        right: 0,
        top: 85
    },
    deleteButton: {
        background: "none",
        border: "none",
        cursor: "pointer",
        marginRight: "0px"
    },
    deleteIcon: {
        width: "36px",
        height: "36px",
        border: '1px solid #EAECF0',
        borderRadius: '100px',
        padding: '6px'
    }
};

export default NewsAndAnnouncements;