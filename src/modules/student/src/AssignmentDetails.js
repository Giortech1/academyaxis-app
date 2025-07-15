import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { uploadDocument, validateFileSize, validateFileType } from "./utilityFunctions";

function AssignmentDetails() {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { userData } = useContext(UserContext);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [selectedFile, setSelectedFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const assignment = location.state?.assignment;
    const sectionId = location.state?.sectionId;

    useEffect(() => {
        if (assignment?.status === "Submitted" ||
            (assignment?.submitted && assignment.submitted.some(sub => sub.studentId === userData?.student_id))) {
            setIsSubmitted(true);
        }
    }, [assignment, userData]);

    const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain'
    ];

    const maxFileSize = 10;

    useEffect(() => {
        if (!assignment?.dueDate) return;

        const calculateTimeLeft = () => {
            const now = new Date();
            const deadline = new Date(assignment.dueDate);
            const difference = deadline - now;

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                setTimeLeft({ days, hours, minutes, seconds });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, [assignment?.dueDate]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (!validateFileType(file, allowedTypes)) {
            alert("Please select a valid file type (PDF, DOC, DOCX, or TXT)");
            return;
        }

        if (!validateFileSize(file, maxFileSize)) {
            alert(`File size must be less than ${maxFileSize}MB`);
            return;
        }

        setSelectedFile(file);
    };

    const handleSubmitAssignment = async () => {
        if (!selectedFile) {
            alert("Please select a file first");
            return;
        }

        if (!userData?.student_id) {
            alert("User information not available");
            return;
        }

        if (!sectionId || !assignment?.id) {
            alert("Assignment information not available");
            return;
        }

        setIsUploading(true);
        setUploadProgress(0);

        try {
            const uploadOptions = {
                folder: 'assignments',
                id: userData.student_id,
                nameSlug: `${assignment.name.replace(/\s+/g, '_')}_${assignment.id}`
            };

            const downloadURL = await uploadDocument(selectedFile, uploadOptions);

            const submissionData = {
                studentId: userData.student_id,
                studentName: userData.full_name || `${userData.first_name} ${userData.last_name}`,
                studentEmail: userData.email,
                submittedAt: new Date().toISOString(),
                fileName: selectedFile.name,
                fileSize: selectedFile.size,
                fileType: selectedFile.type,
                downloadURL: downloadURL,
                assignmentId: assignment.id,
                assignmentName: assignment.name,
                sectionId: sectionId
            };

            const sectionRef = doc(db, 'sections', sectionId);
            const assignmentRef = doc(db, 'sections', sectionId, 'assignments', assignment.id);

            await updateDoc(assignmentRef, {
                submitted: arrayUnion(submissionData)
            });

            const sectionDoc = await getDoc(sectionRef);
            if (sectionDoc.exists()) {
                const sectionData = sectionDoc.data();
                const assignments = sectionData.assignments || [];
                const assignmentIndex = assignments.findIndex(a => a.id === assignment.id);

                if (assignmentIndex !== -1) {
                    assignments[assignmentIndex].submitted = assignments[assignmentIndex].submitted || [];
                    assignments[assignmentIndex].submitted.push(submissionData);

                    await updateDoc(sectionRef, {
                        assignments: assignments
                    });
                }
            }

            setIsSubmitted(true);
            setSelectedFile(null);
            alert("Assignment submitted successfully!");

        } catch (error) {
            console.error("Error submitting assignment:", error);
            alert("Failed to submit assignment. Please try again.");
        } finally {
            setIsUploading(false);
            setUploadProgress(0);
        }
    };

    const handleMessageTeacher = () => {
        console.log("Opening message to teacher");
        alert("Message feature coming soon!");
    };

    const formatTime = (time) => {
        return time.toString().padStart(2, '0');
    };

    const getFileTypeDescription = (type) => {
        const typeMap = {
            'application/pdf': 'PDF Document',
            'application/msword': 'Word Document',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'Word Document',
            'text/plain': 'Text File'
        };
        return typeMap[type] || 'Document';
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    if (!assignment) {
        return (
            <Container fluid style={styles.container}>
                <div style={styles.mainContent}>
                    <div style={{ textAlign: 'center', padding: '40px' }}>
                        <h3>Assignment not found</h3>
                        <p>The assignment details could not be loaded.</p>
                        <Button onClick={() => navigate(-1)}>Go Back</Button>
                    </div>
                </div>
            </Container>
        );
    }

    return (
        <Container fluid style={styles.container}>
            <main style={styles.mainContent}>
                {/* Header Section */}
                <header style={styles.header}>
                    <div style={styles.headerLeft}>
                        <Image
                            src="/assets/arrow-left.png"
                            roundedCircle
                            width={24}
                            height={24}
                            alt="Back"
                            onClick={() => navigate(-1)}
                            style={styles.backButton}
                        />
                        <h1 style={styles.headerTitle}>Assignment Details</h1>
                    </div>

                    <div className="d-flex align-items-center">
                        <Image
                            src={userData?.profile_pic || "/assets/avatar.jpeg"}
                            roundedCircle
                            width={54}
                            height={54}
                            className="me-2"
                            alt="User Avatar"
                            style={styles.userAvatar}
                        />
                        <div className="me-2">
                            <div style={styles.userName}>
                                {userData?.full_name ||
                                    (userData?.first_name && userData?.last_name
                                        ? `${userData.first_name} ${userData.last_name}`
                                        : "Student")}
                            </div>
                            <div style={styles.userId}>
                                {userData?.student_id || userData?.id || "ID"}
                            </div>
                        </div>
                    </div>
                </header>

                <Row style={{ padding: '0px' }}>
                    {/* Main Assignment Section */}
                    <Col lg={8} md={12} style={{ borderRadius: '12px', borderColor: '#E5E7EB' }}>
                        <div style={styles.assignmentCard}>
                            {/* Assignment Header */}
                            <div className="d-flex justify-content-between align-items-center">
                                <h4 style={styles.assignmentHeader}>
                                    Assignment Details
                                </h4>
                            </div>

                            {/* Assignment Info */}
                            <div style={styles.assignmentInfo}>
                                <Image
                                    src="/assets/assignment-icon.png"
                                    roundedCircle
                                    width={44}
                                    height={44}
                                    className="me-3"
                                    alt="Assignment Avatar"
                                    style={styles.assignmentAvatar}
                                />
                                <div>
                                    <div style={styles.assignmentTitle}>{assignment.name}</div>
                                    <div style={styles.assignmentSubject}>
                                        {assignment.subject}
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div style={styles.description}>
                                {assignment.description || "No description provided for this assignment."}
                            </div>

                            {/* Instructions Section */}
                            <div style={styles.section}>
                                <h5 style={styles.sectionTitle}>
                                    Instructions
                                </h5>
                                <div style={styles.sectionText}>
                                    {assignment.description || "Please follow the instructions carefully and submit your work before the deadline."}
                                </div>

                                {/* Links Section */}
                                {assignment.attachmentLink && (
                                    <div className="d-flex justify-content-start mt-3" style={{ flexDirection: 'column' }}>
                                        <a
                                            href={assignment.attachmentLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={styles.linkText}
                                        >
                                            Assignment Resource Link
                                        </a>
                                    </div>
                                )}
                            </div>

                            {/* Due Date Section */}
                            <div style={styles.section}>
                                <h5 style={styles.sectionTitle}>
                                    Due Date
                                </h5>
                                <div style={styles.sectionText}>
                                    {new Date(assignment.dueDate).toLocaleDateString("en-US", {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </div>
                            </div>

                            {/* Teacher Section */}
                            <div style={styles.section}>
                                <h5 style={styles.sectionTitle}>
                                    Teacher
                                </h5>
                                <div style={styles.sectionText}>
                                    {assignment.teacher}
                                </div>
                            </div>

                            {/* Department & Section */}
                            <div style={styles.section}>
                                <h5 style={styles.sectionTitle}>
                                    Course Details
                                </h5>
                                <div style={styles.sectionText}>
                                    {assignment.department} • Section {assignment.section}
                                </div>
                            </div>
                        </div>

                        {/* Submit Assignment Section */}
                        <Col lg={12} md={12} style={styles.submitSection}>
                            <div style={styles.submitCard}>
                                <div style={styles.submitHeader}>
                                    <h4 style={styles.submitTitle}>Submit Assignment</h4>
                                </div>

                                {/* File Upload Area */}
                                <div style={styles.fileUpload}>
                                    <Image
                                        src="/assets/plus.png"
                                        alt="Upload Icon"
                                        style={styles.uploadIcon}
                                    />
                                    <p style={styles.uploadText}>
                                        {isSubmitted ? 'Assignment has been submitted' :
                                            selectedFile ? selectedFile.name :
                                                "Drag and drop or choose a file to upload"}
                                    </p>
                                    <p style={styles.uploadSubtext}>
                                        PDF, DOC, DOCX, or TXT (Max {maxFileSize}MB)
                                    </p>

                                    {/* Upload Progress */}
                                    {isUploading && (
                                        <div style={{ width: '100%', marginTop: '10px' }}>
                                            <div style={{
                                                width: '100%',
                                                height: '8px',
                                                backgroundColor: '#e0e0e0',
                                                borderRadius: '4px',
                                                overflow: 'hidden'
                                            }}>
                                                <div style={{
                                                    width: `${uploadProgress}%`,
                                                    height: '100%',
                                                    backgroundColor: '#9747FF',
                                                    transition: 'width 0.3s ease'
                                                }} />
                                            </div>
                                            <p style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                                                Uploading... {uploadProgress}%
                                            </p>
                                        </div>
                                    )}

                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        accept=".pdf,.doc,.docx,.txt"
                                        style={{ display: 'none' }}
                                        id="fileInput"
                                        disabled={isUploading || isSubmitted}
                                    />
                                    <Button
                                        onClick={() => document.getElementById('fileInput').click()}
                                        disabled={isUploading || isSubmitted}
                                        style={{
                                            backgroundColor: isSubmitted ? '#9CA3AF' : '#6B7280',
                                            border: 'none',
                                            borderRadius: '8px',
                                            padding: '8px 16px',
                                            fontSize: '14px',
                                            marginTop: '8px',
                                            cursor: (isUploading || isSubmitted) ? 'not-allowed' : 'pointer'
                                        }}
                                    >
                                        {isSubmitted ? 'Already Submitted' : 'Choose File'}
                                    </Button>

                                    {/* File Info */}
                                    {selectedFile && !isSubmitted && (
                                        <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
                                            <p>📄 {getFileTypeDescription(selectedFile.type)}</p>
                                            <p>📊 Size: {formatFileSize(selectedFile.size)}</p>
                                            <p>📅 Selected: {new Date().toLocaleDateString()}</p>
                                        </div>
                                    )}

                                    {/* Submission Status */}
                                    {isSubmitted && (
                                        <div style={{
                                            marginTop: '15px',
                                            padding: '10px',
                                            backgroundColor: '#F0FDF4',
                                            borderRadius: '8px',
                                            border: '1px solid #22C55E'
                                        }}>
                                            <p style={{ color: '#22C55E', fontSize: '14px', fontWeight: '500', margin: '0' }}>
                                                ✅ Assignment Successfully Submitted
                                            </p>
                                            <p style={{ color: '#666', fontSize: '12px', margin: '4px 0 0 0' }}>
                                                Your assignment has been submitted and is now being reviewed by your teacher.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Col>
                    </Col>

                    {/* Time Left Section */}
                    <Col lg={4} md={12}>
                        <div style={styles.timeLeftCard}>
                            <h4 style={styles.timeLeftTitle}>
                                Time Left
                            </h4>
                            <div style={styles.timeDisplay}>
                                <div style={styles.timeNumbers}>
                                    <span style={{ display: "flex", gap: "5px", alignItems: 'center' }}>
                                        {[
                                            formatTime(timeLeft.days).charAt(0),
                                            formatTime(timeLeft.days).charAt(1),
                                            ":",
                                            formatTime(timeLeft.hours).charAt(0),
                                            formatTime(timeLeft.hours).charAt(1),
                                            ":",
                                            formatTime(timeLeft.minutes).charAt(0),
                                            formatTime(timeLeft.minutes).charAt(1)
                                        ].map((char, index) => (
                                            <span
                                                key={index}
                                                style={{
                                                    border: char === ":" ? "none" : "1px solid #E5E7EB",
                                                    padding: char === ":" ? "0" : "4px 8px",
                                                    fontSize: "20px",
                                                    fontWeight: "600",
                                                    borderRadius: "4px",
                                                    color: "#111827",
                                                }}
                                            >
                                                {char}
                                            </span>
                                        ))}
                                    </span>
                                </div>
                                <div style={styles.timeLabels}>
                                    <span style={styles.timeLabel}>Days</span>
                                    <span style={styles.timeLabel}>Hours</span>
                                    <span style={styles.timeLabel}>Minutes</span>
                                </div>
                            </div>

                            <div style={styles.timeDescription}>
                                Stay focused and manage your time wisely. Completing tasks ahead of
                                deadlines ensures smooth progress in your coursework.
                            </div>

                            <div style={styles.teacherInfo}>
                                <img
                                    src={assignment.teacherProfile || "/assets/avatar.jpeg"}
                                    alt="Teacher Avatar"
                                    style={styles.teacherAvatar}
                                />
                                <div style={styles.teacherDetails}>
                                    <h5 style={styles.teacherName}>
                                        {assignment.teacher}
                                    </h5>
                                    <div style={styles.teacherRole}>
                                        <img
                                            src="/assets/teacher.png"
                                            alt="Teacher Role"
                                            style={styles.teacherIcon}
                                        />
                                        <p style={styles.teacherLabel}>
                                            Teacher
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div style={styles.buttonSection}>
                                <button
                                    onClick={handleMessageTeacher}
                                    style={styles.messageButton}
                                >
                                    <img
                                        src="/assets/messages-3.png"
                                        alt="Message Icon"
                                        style={styles.messageIcon}
                                    />
                                    Message Teacher
                                </button>
                            </div>
                        </div>
                    </Col>

                    {/* Submit Button */}
                    <div className="col-lg-8" style={styles.submitButtonContainer}>
                        <button
                            onClick={handleSubmitAssignment}
                            disabled={isUploading || isSubmitted || !selectedFile}
                            style={{
                                ...styles.submitButton,
                                backgroundColor: isSubmitted ? '#22C55E' : (isUploading || !selectedFile) ? '#9CA3AF' : '#9747FF',
                                cursor: (isUploading || isSubmitted || !selectedFile) ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {isUploading ? 'Submitting...' : isSubmitted ? 'Assignment Submitted ✓' : 'Submit Assignment'}
                        </button>
                    </div>
                </Row>
            </main>

            <AssignmentDetailStyles />
        </Container>
    );
}

// Separated Styles Component
const AssignmentDetailStyles = () => (
    <style jsx>{`
    .submit-button:hover {
      background-color: #8433E0;
    }

    .submit-button:active {
      background-color: #7020D0;
      transform: translateY(1px);
    }

    .submit-button:disabled {
      background-color: #9CA3AF;
      cursor: not-allowed;
    }

    .message-button:hover {
      background-color: #374151;
    }

    .file-upload:hover {
      border-color: #9747FF;
    }

    @media (max-width: 768px) {
      .main-content {
        padding: 8px !important;
      }

      .header {
        flex-direction: column !important;
        align-items: flex-start !important;
        gap: 12px;
      }

      .header-title {
        font-size: 20px !important;
      }

      .user-avatar {
        width: 48px !important;
        height: 48px !important;
      }

      .assignment-card {
        margin-bottom: 16px;
      }

      .time-left-card {
        height: auto !important;
        margin-top: 16px;
      }

      .file-upload {
        width: 100% !important;
        padding: 16px !important;
      }

      .submit-button-container {
        padding: 16px !important;
        justify-content: center !important;
      }

      .submit-button {
        width: 100% !important;
        max-width: 300px;
      }

      .time-numbers {
        flex-wrap: wrap;
        gap: 4px !important;
      }

      .time-labels {
        gap: 15px !important;
      }

      .teacher-info {
        flex-direction: column !important;
        text-align: center;
      }

      .teacher-avatar {
        margin-bottom: 8px !important;
      }

      .message-button {
        width: 100% !important;
        max-width: 200px;
      }

      .assignment-info {
        flex-direction: column !important;
        text-align: center;
      }

      .assignment-avatar {
        margin-bottom: 8px !important;
      }

      .section {
        padding: 8px !important;
      }

      .section-title {
        font-size: 13px !important;
      }

      .section-text {
        font-size: 11px !important;
      }

      .description {
        font-size: 11px !important;
      }
    }

    @media (max-width: 576px) {
      .time-left-card {
        padding: 8px !important;
      }

      .time-left-title {
        font-size: 14px !important;
      }

      .time-display {
        font-size: 12px !important;
      }

      .time-description {
        font-size: 11px !important;
      }

      .upload-text {
        font-size: 12px !important;
      }

      .upload-subtext {
        font-size: 10px !important;
      }
    }
  `}</style>
);

const styles = {
    container: {
        padding: "0",
        display: "flex"
    },
    mainContent: {
        flexGrow: 1,
        padding: "12px"
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "16px"
    },
    headerLeft: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    backButton: {
        cursor: "pointer",
        marginRight: "8px"
    },
    headerTitle: {
        fontSize: "24px",
        fontWeight: "600",
        display: "contents"
    },
    userAvatar: {
        width: "54px",
        height: "54px"
    },
    userName: {
        fontWeight: "500",
        fontSize: "14px"
    },
    userId: {
        fontSize: "12px",
        color: "#6c757d"
    },
    assignmentCard: {
        border: "1px solid #E5E7EB",
        borderRadius: "12px",
        padding: "0"
    },
    assignmentHeader: {
        fontSize: "16px",
        fontWeight: "600",
        padding: "8px",
        margin: "0"
    },
    assignmentInfo: {
        display: "flex",
        alignItems: "center",
        padding: "8px"
    },
    assignmentAvatar: {
        width: "44px",
        height: "44px",
        marginRight: "12px"
    },
    assignmentTitle: {
        fontSize: "14px",
        fontWeight: "500"
    },
    assignmentSubject: {
        fontSize: "12px",
        color: "#475467",
        fontWeight: "400"
    },
    description: {
        fontSize: "12px",
        color: "#000",
        padding: "8px",
        fontWeight: "400"
    },
    section: {
        borderTop: "1px solid #E5E7EB",
        marginTop: "16px",
        paddingLeft: "8px"
    },
    sectionTitle: {
        fontSize: "14px",
        fontWeight: "500",
        marginTop: "8px",
        marginBottom: "8px",
        color: "#101828"
    },
    sectionText: {
        fontSize: "12px",
        color: "#4B5563",
        fontWeight: "400",
        marginBottom: "10px"
    },
    linkText: {
        fontSize: "12px",
        fontWeight: "400",
        color: "#1D4ED8",
        textDecoration: "none",
        display: "block",
        marginBottom: "4px"
    },
    submitSection: {
        marginTop: "24px"
    },
    submitCard: {
        padding: "12px",
        border: "0.5px dashed #6B7280",
        borderRadius: "8px"
    },
    submitHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "12px"
    },
    submitTitle: {
        fontSize: "16px",
        fontWeight: "600"
    },
    fileUpload: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "24px",
        border: "0.5px dashed #6B7280",
        borderRadius: "12px",
        textAlign: "center",
        width: "350px",
        margin: "auto"
    },
    uploadIcon: {
        width: "60px",
        height: "60px",
        marginBottom: "16px",
        backgroundColor: "#667085",
        borderRadius: "100px"
    },
    uploadText: {
        fontSize: "14px",
        fontWeight: "400",
        color: "#4B5563",
        marginBottom: "8px"
    },
    uploadSubtext: {
        fontSize: "11px",
        color: "#6B7280",
        marginBottom: "16px",
        fontWeight: "400"
    },
    timeLeftCard: {
        border: "1px solid #dee2e6",
        backgroundColor: "#f8f9fa",
        height: "720px",
        borderRadius: "8px",
        padding: "12px"
    },
    timeLeftTitle: {
        fontSize: "16px",
        fontWeight: "600",
        color: "#343a40",
        marginBottom: "12px"
    },
    timeDisplay: {
        fontSize: "14px",
        color: "#495057",
        lineHeight: "1.5",
        textAlign: "center"
    },
    timeNumbers: {
        display: "flex",
        justifyContent: "center",
        marginBottom: "10px"
    },
    timeLabels: {
        display: "flex",
        justifyContent: "center",
        borderBottom: "1px solid #E5E7EB",
        paddingBottom: "10px",
        gap: "25px"
    },
    timeLabel: {
        fontSize: "14px",
        fontWeight: "500",
        color: "#6c757d"
    },
    timeDescription: {
        marginTop: "10px",
        fontSize: "12px",
        color: "#6c757d",
        lineHeight: "1.4"
    },
    teacherInfo: {
        marginTop: "20px",
        display: "flex",
        paddingTop: "10px",
        alignItems: "center",
        justifyContent: "space-between"
    },
    teacherAvatar: {
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        marginRight: "10px"
    },
    teacherDetails: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    teacherName: {
        fontSize: "14px",
        fontWeight: "600",
        color: "#111827",
        marginBottom: "0px"
    },
    teacherRole: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    teacherIcon: {
        width: "12px",
        height: "12px",
        marginRight: "5px"
    },
    teacherLabel: {
        fontSize: "12px",
        color: "#6c757d",
        marginBottom: "0"
    },
    buttonSection: {
        marginTop: "20px",
        borderTop: "1px solid #dee2e6",
        paddingTop: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    messageButton: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        width: "176px",
        height: "35px",
        padding: "10px",
        fontSize: "12px",
        fontWeight: "400",
        color: "#fff",
        backgroundColor: "#111827",
        border: "none",
        borderRadius: "12px",
        cursor: "pointer"
    },
    messageIcon: {
        width: "20px",
        height: "20px"
    },
    submitButtonContainer: {
        padding: "20px",
        display: "flex",
        justifyContent: "flex-end"
    },
    submitButton: {
        backgroundColor: "#9747FF",
        color: "white",
        border: "none",
        borderRadius: "50px",
        padding: "10px 30px",
        fontSize: "16px",
        fontWeight: "500",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
        fontFamily: "Arial, sans-serif"
    }
};

export default AssignmentDetails;