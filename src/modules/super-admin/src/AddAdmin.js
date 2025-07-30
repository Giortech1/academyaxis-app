import React, { useState, useEffect, useContext } from "react";
import { Container, Button, Form, Image, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { ToastContainer, toast } from "react-toastify";
import { uploadDocument, uploadPhoto } from "./utilityFunctions";

function AddStudent() {
    const { userData, registerUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [photoPreview, setPhotoPreview] = useState(null);
    const [photoFile, setPhotoFile] = useState(null);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        dateOfBirth: "",
        gender: "",
        cnicNumber: "",
        phoneNumber: "",
        homeAddress: "",
        specialization: "",
        teachingExperience: "0",
        qualifications: [
            { university: "", graduationYear: "", degree: "" }
        ],
        documents: [],
        adminId: "ADMIN-0093-ID-23",
        basicSalary: 0,
        joiningDate: "",
        probationPeriod: "",
        workSchedule: "",
        contractDuration: "",
        customRoles: [],
        employmentType: "",
        isCustomAdmin: false,
        role: "",
    });

    useEffect(() => {
        let interval;
        if (isUploading && uploadProgress < 100) {
            interval = setInterval(() => {
                setUploadProgress(prev => {
                    const newProgress = prev + Math.floor(Math.random() * 15);
                    if (newProgress >= 100) {
                        setIsUploading(false);
                        return 100;
                    }
                    return newProgress;
                });
            }, 500);
        }

        return () => clearInterval(interval);
    }, [isUploading, uploadProgress]);


    const formatDate = (value, field) => {
        let cleaned = value.replace(/\D/g, '');
        cleaned = cleaned.substring(0, 8);
        if (cleaned.length > 4) {
            cleaned = `${cleaned.substring(0, 2)}/${cleaned.substring(2, 4)}/${cleaned.substring(4)}`;
        } else if (cleaned.length > 2) {
            cleaned = `${cleaned.substring(0, 2)}/${cleaned.substring(2)}`;
        }

        setFormData({
            ...formData,
            [field]: cleaned
        });
    };

    const handleQualificationChange = (index, field, value) => {
        const updatedQualifications = [...formData.qualifications];
        updatedQualifications[index] = {
            ...updatedQualifications[index],
            [field]: value
        };

        setFormData({
            ...formData,
            qualifications: updatedQualifications
        });
    };

    const addQualification = () => {
        setFormData({
            ...formData,
            qualifications: [
                ...formData.qualifications,
                { university: "", graduationYear: "", degree: "" }
            ]
        });
    };

    const handlePhotoUpload = (e) => {
        if (!e.target.files?.[0]) return;

        const file = e.target.files[0];
        const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];

        if (!validTypes.includes(file.type)) {
            return setErrors({ ...errors, photo: 'Please upload a JPG or PNG' });
        }
        if (file.size > 2 * 1024 * 1024) {
            return setErrors({ ...errors, photo: 'Image size must be < 2 MB' });
        }

        setPhotoPreview(URL.createObjectURL(file));
        setPhotoFile(file);

        if (errors.photo) setErrors({ ...errors, photo: null });
    };

    const handleDocumentUpload = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
            if (!validTypes.includes(file.type)) {
                setErrors({ ...errors, document: "Please upload a valid file (PDF, JPG, PNG)" });
                return;
            }

            if (file.size > 5 * 1024 * 1024) {
                setErrors({ ...errors, document: "File size should be less than 5MB" });
                return;
            }

            setUploadProgress(0);
            setIsUploading(true);

            const fileData = {
                name: file.name,
                type: file.type,
                size: file.size,
                file: file
            };

            setTimeout(() => {
                setUploadedFiles([...uploadedFiles, fileData]);
                setIsUploading(false);
                setUploadProgress(100);
            }, 2000);

            if (errors.document) {
                setErrors({ ...errors, document: null });
            }
        }
    };

    const removeUploadedFile = (index) => {
        const updatedFiles = [...uploadedFiles];
        updatedFiles.splice(index, 1);
        setUploadedFiles(updatedFiles);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "dateOfBirth" || name === "admissionDate") {
            formatDate(value, name);
        }

        setFormData({
            ...formData,
            [name]: value,
        });

        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: null
            });
        }
    };

    const goToNextStep = () => {
        if (currentStep === 1) {
            if (!photoFile) {
                return toast.error("Please Select the Profile Pic");
            }
            if (!formData.firstName) {
                return toast.error("First name is required");
            }
            if (!formData.lastName) {
                return toast.error("Last name is required");
            }
            if (!formData.email) {
                return toast.error("Email is required");
            }
            if (!formData?.password || formData.password.length < 6) {
                return toast.error("Password must be at least 6 characters long");
            }
            if (!formData.dateOfBirth) {
                return toast.error("Date of birth is required");
            }
            if (!formData.gender) {
                return toast.error("Gender is required");
            }
            if (!formData.cnicNumber) {
                return toast.error("CNIC number is required");
            }
            if (!formData.phoneNumber) {
                return toast.error("Phone number is required");
            }
            if (!formData.homeAddress) {
                return toast.error("Home address is required");
            }
        }

        else if (currentStep === 2) {
            if (!formData?.specialization) {
                return toast.error("Specialization is required");
            }
            if (!formData?.teachingExperience) {
                return toast.error("Teaching experience is required");
            }

            for (let i = 0; i < formData.qualifications.length; i++) {
                const qualification = formData.qualifications[i];
                if (!qualification?.university) {
                    return toast.error(`University is required in qualification ${i + 1}`);
                }
                if (!qualification?.graduationYear) {
                    return toast.error(`Graduation year is required in qualification ${i + 1}`);
                }
                if (!qualification?.degree) {
                    return toast.error(`Degree is required in qualification ${i + 1}`);
                }
            }

            if (uploadedFiles?.length === 0) {
                return toast.error("At least one document is required");
            }
        }

        else if (currentStep === 3) {
            if (!formData?.role) {
                return toast.error("Select the role for the admin");
            }
            if (formData?.isCustomAdmin) {
                if (formData?.customRoles?.length === 0) {
                    return toast.error("Select at least one role for custom admin");
                }
            }
        }

        setCurrentStep(currentStep + 1);
    };

    const goToPreviousStep = () => {
        setCurrentStep(currentStep - 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (currentStep === 4) {
            if (!formData?.employmentType) {
                return toast.error("Select the employment type");
            }
            if (!formData.joiningDate) {
                return toast.error("Joining date is required");
            }
            if (!formData.probationPeriod) {
                return toast.error("Probation period is required");
            }
            if (!formData.basicSalary) {
                return toast.error("Salary is required");
            }
            if (!formData.workSchedule) {
                return toast.error("Select the work schedule");
            }
            if (!formData?.contractDuration) {
                return toast.error("Select the contract duration");
            }
        }

        if (currentStep < 4) {
            goToNextStep();
        } else {
            setIsSubmitting(true);

            try {
                let photoUrl = '';
                if (photoFile) {
                    photoUrl = await uploadPhoto(photoFile, {
                        folder: 'profile_pictures',
                        uid: 'admin',
                        nameSlug: 'avatar'
                    });
                }

                let documentUrls = [];
                if (uploadedFiles.length > 0) {
                    const documentUploadPromises = uploadedFiles.map(async (fileData, index) => {
                        if (fileData.file) {
                            const url = await uploadDocument(fileData.file, {
                                folder: 'admin_documents',
                                uid: formData?.adminId || 'admin',
                                nameSlug: `document_${index}`
                            });
                            return {
                                name: fileData.name,
                                type: fileData.type,
                                size: fileData.size,
                                url: url
                            };
                        }
                        return null;
                    });

                    documentUrls = await Promise.all(documentUploadPromises);
                    documentUrls = documentUrls.filter(doc => doc !== null);
                }

                const data = {
                    first_name: formData?.firstName || "",
                    last_name: formData?.lastName || "",
                    full_name: formData?.firstName + ' ' + formData?.lastName,
                    profile_pic: photoUrl,
                    email: formData?.email || "",
                    password: formData?.password || "",
                    dateOfBirth: formData?.dateOfBirth || "",
                    gender: formData?.gender || "",
                    cnic_no: formData?.cnicNumber || "",
                    phone_no: formData?.phoneNumber || "",
                    home_address: formData?.homeAddress || "",
                    specialization: formData?.specialization || "",
                    teaching_expirience: formData?.teachingExperience || "",
                    qualifications: formData?.qualifications || [],
                    documents: documentUrls,
                    admin_id: formData?.adminId || "",
                    salary: formData?.basicSalary || "",
                    joining_date: formData?.joiningDate || "",
                    probation_period: formData?.probationPeriod || "",
                    work_schedule: formData?.workSchedule || "",
                    contract_duration: formData?.contractDuration || "",
                    custom_roles: formData?.customRoles || [],
                    employment_type: formData?.employmentType || "",
                    isCustomAdmin: formData?.isCustomAdmin || false,
                    admin_type: formData?.role || "",
                    role: 'admin',
                    createdAt: new Date().toISOString(),
                    status: 'Active'
                }

                const result = await registerUser(data);

                if (result?.success) {
                    setShowSuccessAlert(true);
                    setTimeout(() => {
                        navigate(-1);
                    }, 3000);
                } else {
                    toast.error(`Registration failed: ${result.error}`);
                }
            } catch (error) {
                console.log(error);
                toast.error(error.message || 'An error occurred during registration');
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const getStepIconColor = (stepNumber) => {
        if (stepNumber === currentStep) {
            return "#7C3AED";
        } else if (stepNumber < currentStep) {
            return "#9747FF";
        } else {
            return "#F3F4F6";
        }
    };

    const inputStyles = {
        fontSize: "14px",
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid #EAECF0",
        color: "#101828",
    };

    const renderFormStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <>
                        <h2 style={{ fontSize: "24px", fontWeight: "500", margin: "16px 0" }}>Personal Info</h2>

                        {/* Photo Upload */}
                        <div className="d-flex justify-content-center mb-4">
                            <div
                                style={{
                                    width: "150px",
                                    height: "150px",
                                    borderRadius: "50%",
                                    backgroundColor: "#F3F4F6",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    position: "relative",
                                    overflow: "hidden",
                                }}
                            >
                                {photoPreview ? (
                                    <img
                                        src={photoPreview}
                                        alt="Profile"
                                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                    />
                                ) : (
                                    <svg
                                        width="48"
                                        height="48"
                                        viewBox="0 0 48 48"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M24 24C29.5228 24 34 19.5228 34 14C34 8.47715 29.5228 4 24 4C18.4772 4 14 8.47715 14 14C14 19.5228 18.4772 24 24 24Z"
                                            stroke="#4B5563"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M40 44C40 34.0589 32.8366 26 24 26C15.1634 26 8 34.0589 8 44"
                                            stroke="#4B5563"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                )}
                            </div>
                        </div>

                        <div className="text-center mb-4">
                            <label
                                htmlFor="photoUpload"
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer",
                                    fontSize: "16px",
                                    color: "#000",
                                    fontWeight: "500",
                                    border: '1px solid #EAECF0',
                                    width: '150px',
                                    padding: '9px',
                                    margin: 'auto',
                                    borderRadius: '8px'
                                }}
                            >
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    style={{ marginRight: "8px" }}
                                >
                                    <path
                                        d="M8.00001 1.33334V14.6667M1.33334 8.00001H14.6667"
                                        stroke="#6B7280"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                Upload photo
                            </label>
                            <input
                                type="file"
                                id="photoUpload"
                                onChange={handlePhotoUpload}
                                accept="image/*"
                                style={{ display: "none" }}
                            />
                            {errors.photo && <div className="text-danger mt-1">{errors.photo}</div>}
                        </div>

                        {/* Name Fields - Two columns */}
                        <div className="row mb-3">
                            <div className="col-6">
                                <Form.Group controlId="firstName">
                                    <Form.Label style={{ fontSize: "16px", fontWeight: "500", color: '#000' }}>
                                        First Name
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="firstName"
                                        placeholder="Enter first name..."
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        style={inputStyles}
                                        className="custom-placeholder"
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-6">
                                <Form.Group controlId="lastName">
                                    <Form.Label style={{ fontSize: "16px", fontWeight: "500", color: '#000' }}>
                                        Last Name
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="lastName"
                                        placeholder="Enter last name..."
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        style={inputStyles}
                                        className="custom-placeholder"
                                    />
                                </Form.Group>
                            </div>
                        </div>

                        {/* Email */}
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label style={{ fontSize: "16px", fontWeight: "500", color: '#000' }}>
                                Email
                            </Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Enter email address..."
                                value={formData.email}
                                onChange={handleInputChange}
                                style={inputStyles}
                                className="custom-placeholder"
                            />
                        </Form.Group>

                        {/* Password */}
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label style={{ fontSize: "16px", fontWeight: "500", color: '#000' }}>
                                Password
                            </Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Create password"
                                value={formData.password}
                                onChange={handleInputChange}
                                style={inputStyles}
                                className="custom-placeholder"
                            />
                            {formData.password && (
                                <div className="mt-1" style={{ fontSize: "12px", color: formData.password.length >= 6 ? "#10B981" : "#6B7280" }}>
                                    {formData.password.length >= 6 ? "✓ " : ""}
                                    Password must be at least 6 characters
                                </div>
                            )}
                        </Form.Group>

                        {/* Date of Birth and Gender - Two columns */}
                        <div className="row mb-3">
                            <div className="col-6">
                                <Form.Group controlId="dateOfBirth">
                                    <Form.Label style={{ fontSize: "16px", fontWeight: "500", color: '#000' }}>
                                        Date of Birth
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="dateOfBirth"
                                        placeholder="DD/MM/YYYY"
                                        value={formData.dateOfBirth}
                                        onChange={(e) => formatDate(e.target.value, "dateOfBirth")}
                                        style={inputStyles}
                                        className="custom-placeholder"
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-6">
                                <Form.Group controlId="gender">
                                    <Form.Label style={{ fontSize: "16px", fontWeight: "500", color: '#000' }}>
                                        Gender
                                    </Form.Label>
                                    <Form.Select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleInputChange}
                                        style={inputStyles}
                                        className="custom-placeholder"
                                    >
                                        <option value="">Select</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </Form.Select>
                                </Form.Group>
                            </div>
                        </div>

                        {/* CNIC Number and Phone Number - Two columns */}
                        <div className="row mb-3">
                            <div className="col-6">
                                <Form.Group controlId="cnicNumber">
                                    <Form.Label style={{ fontSize: "16px", fontWeight: "500", color: '#000' }}>
                                        CNIC Number
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="cnicNumber"
                                        placeholder="12345-1234567-1"
                                        value={formData.cnicNumber}
                                        onChange={handleInputChange}
                                        style={inputStyles}
                                        className="custom-placeholder"
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-6">
                                <Form.Group controlId="phoneNumber">
                                    <Form.Label style={{ fontSize: "16px", fontWeight: "500", color: '#000' }}>
                                        Phone Number
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="phoneNumber"
                                        placeholder="0300-1234567"
                                        value={formData.phoneNumber}
                                        onChange={handleInputChange}
                                        style={inputStyles}
                                        className="custom-placeholder"
                                    />
                                </Form.Group>
                            </div>
                        </div>

                        {/* Home Address */}
                        <Form.Group className="mb-4" controlId="homeAddress">
                            <Form.Label style={{ fontSize: "16px", fontWeight: "500", color: '#000' }}>
                                Home Address
                            </Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="homeAddress"
                                placeholder="Full address"
                                value={formData.homeAddress}
                                onChange={handleInputChange}
                                style={inputStyles}
                                className="custom-placeholder"
                            />
                        </Form.Group>
                    </>
                );
            case 2:
                return (
                    <>
                        <h2 style={{ fontSize: "24px", fontWeight: "500", margin: "20px 0", color: '#000' }}>Academic Info</h2>

                        {/* Specialization/Major */}
                        <Form.Group className="mb-4" controlId="specialization">
                            <Form.Label style={{ fontSize: "16px", fontWeight: "500", color: '#000' }}>
                                Specialization/Major
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="specialization"
                                placeholder="e.g. computer, science, math"
                                value={formData.specialization}
                                onChange={handleInputChange}
                                style={inputStyles}
                                className="custom-placeholder"
                            />
                        </Form.Group>

                        {/* Teaching Experience */}
                        <Form.Group className="mb-4" controlId="teachingExperience">
                            <Form.Label style={{ fontSize: "16px", fontWeight: "500", color: '#000' }}>
                                Teaching Experience (Years)
                            </Form.Label>
                            <Form.Control
                                type="number"
                                name="teachingExperience"
                                value={formData.teachingExperience}
                                onChange={handleInputChange}
                                style={inputStyles}
                                className="custom-placeholder"
                                min="0"
                            />
                        </Form.Group>

                        {/* Qualifications */}
                        <div className="mb-4">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <Form.Label style={{ fontSize: "16px", fontWeight: "500", color: '#000', marginBottom: "0" }}>
                                    Qualifications
                                </Form.Label>
                                <Button
                                    onClick={addQualification}
                                    style={{
                                        backgroundColor: "#9747FF",
                                        border: "none",
                                        borderRadius: "50px",
                                        padding: "6px 18px",
                                        fontSize: "14px",
                                        fontWeight: "500"
                                    }}
                                >
                                    Add
                                </Button>
                            </div>

                            {/* Qualification Fields Headers */}
                            <div className="row mb-2">
                                <div className="col-4">
                                    <span style={{ fontSize: "16px", fontWeight: '500', color: '#000' }}>University/Institution</span>
                                </div>
                                <div className="col-4">
                                    <span style={{ fontSize: "16px", fontWeight: '500', color: '#000' }}>Graduation Year</span>
                                </div>
                                <div className="col-4">
                                    <span style={{ fontSize: "16px", fontWeight: '500', color: '#000' }}>Degree/Program</span>
                                </div>
                            </div>

                            {/* Qualification Input Fields */}
                            {formData.qualifications.map((qual, index) => (
                                <div className="row mb-3" key={index}>
                                    <div className="col-4">
                                        <Form.Control
                                            type="text"
                                            placeholder="Name of institute"
                                            value={qual.university}
                                            onChange={(e) => handleQualificationChange(index, 'university', e.target.value)}
                                            style={inputStyles}
                                            className="custom-placeholder"
                                        />
                                    </div>
                                    <div className="col-4">
                                        <Form.Control
                                            type="text"
                                            placeholder="Year"
                                            value={qual.graduationYear}
                                            onChange={(e) => handleQualificationChange(index, 'graduationYear', e.target.value)}
                                            style={inputStyles}
                                            className="custom-placeholder"
                                        />
                                    </div>
                                    <div className="col-4">
                                        <Form.Control
                                            type="text"
                                            placeholder="Name of degree/program"
                                            value={qual.degree}
                                            onChange={(e) => handleQualificationChange(index, 'degree', e.target.value)}
                                            style={inputStyles}
                                            className="custom-placeholder"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Document Upload Section */}
                        <div className="mb-4">
                            <div
                                style={{
                                    border: "2px dashed #667085",
                                    borderRadius: "8px",
                                    padding: "40px 20px",
                                    textAlign: "center",
                                    marginBottom: "16px",
                                    backgroundColor: "#F9FAFB",
                                    width: '50%',
                                    margin: 'auto',
                                }}
                            >
                                <div style={{ marginBottom: "16px" }}>
                                    <img
                                        src="/assets/upload.png"
                                        width="60"
                                        height="60"
                                        alt="Upload"
                                    />
                                </div>
                                <p style={{ fontSize: "16px", color: "#000", margin: "0 0 8px" }}>
                                    Drag and drop or <label htmlFor="documentUpload" style={{ color: "#7C3AED", fontWeight: "500", cursor: "pointer" }}>browse</label>
                                </p>
                                <input
                                    type="file"
                                    id="documentUpload"
                                    style={{ display: "none" }}
                                    onChange={handleDocumentUpload}
                                    accept=".pdf,.jpg,.jpeg,.png"
                                />
                                {errors.document && (
                                    <div className="text-danger mt-2">{errors.document}</div>
                                )}
                            </div>

                            {/* Currently Uploading File */}
                            {isUploading && (
                                <div className="mb-3">
                                    <div style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        marginBottom: "8px"
                                    }}>
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M17.5 12.5V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V12.5" stroke="#7C3AED" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M5.83337 8.33331L10 12.5L14.1667 8.33331" stroke="#7C3AED" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M10 12.5V2.5" stroke="#7C3AED" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <span style={{ marginLeft: "8px", fontSize: "14px", fontWeight: "500" }}>Metric.pdf</span>
                                        </div>
                                        <button
                                            type="button"
                                            style={{
                                                background: "none",
                                                border: "none",
                                                color: "#9CA3AF",
                                                cursor: "pointer",
                                                fontSize: "16px"
                                            }}
                                            onClick={() => {
                                                setIsUploading(false);
                                                setUploadedFiles([]);
                                            }}
                                        >
                                            ×
                                        </button>
                                    </div>

                                    {/* Progress bar */}
                                    <div className="progress" style={{ height: "4px", backgroundColor: "#E5E7EB" }}>
                                        <div
                                            className="progress-bar"
                                            role="progressbar"
                                            style={{
                                                width: `${uploadProgress}%`,
                                                backgroundColor: "#7C3AED",
                                                transition: "width 0.3s ease"
                                            }}
                                            aria-valuenow={uploadProgress}
                                            aria-valuemin="0"
                                            aria-valuemax="100">
                                        </div>
                                    </div>
                                    <div style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        fontSize: "12px",
                                        color: "#6B7280",
                                        marginTop: "4px"
                                    }}>
                                        <span>{isUploading ? "Uploading..." : ""}</span>
                                        <span>{uploadProgress}%</span>
                                    </div>
                                </div>
                            )}

                            {/* Uploaded Documents List */}
                            {uploadedFiles.length > 0 && (
                                <div>
                                    <h6 style={{ fontSize: "16px", fontWeight: "500", marginTop: "24px", marginBottom: "16px" }}>
                                        Uploaded Documents
                                    </h6>
                                    <div>
                                        {uploadedFiles.map((file, index) => (
                                            <div
                                                key={index}
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "space-between",
                                                    padding: "12px",
                                                    borderRadius: "8px",
                                                    backgroundColor: "#F9FAFB",
                                                    marginBottom: "8px"
                                                }}
                                            >
                                                <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
                                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M12.5 2.5H5.00004C4.55801 2.5 4.13409 2.67559 3.82153 2.98816C3.50897 3.30072 3.33337 3.72464 3.33337 4.16667V15.8333C3.33337 16.2754 3.50897 16.6993 3.82153 17.0118C4.13409 17.3244 4.55801 17.5 5.00004 17.5H15C15.4421 17.5 15.866 17.3244 16.1786 17.0118C16.4911 16.6993 16.6667 16.2754 16.6667 15.8333V6.66667L12.5 2.5Z" stroke="#7C3AED" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M12.5 2.5V6.66667H16.6667" stroke="#7C3AED" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M13.3334 10.8333H6.66675" stroke="#7C3AED" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M13.3334 14.1667H6.66675" stroke="#7C3AED" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M8.33341 7.5H6.66675" stroke="#7C3AED" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                    <div style={{ marginLeft: "12px", display: "flex", flexDirection: "column" }}>
                                                        <span style={{ fontSize: "14px", fontWeight: "500" }}>
                                                            {file.name}
                                                        </span>
                                                        <span style={{ fontSize: "12px", color: "#9CA3AF" }}>
                                                            {(file.size / 1024 / 1024).toFixed(2)} MB
                                                        </span>
                                                        {file.url && (
                                                            <a
                                                                href={file.url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                style={{
                                                                    fontSize: "12px",
                                                                    color: "#7C3AED",
                                                                    textDecoration: "none",
                                                                    marginTop: "2px"
                                                                }}
                                                            >
                                                                View Document
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    style={{
                                                        background: "none",
                                                        border: "none",
                                                        color: "#9CA3AF",
                                                        cursor: "pointer",
                                                        fontSize: "16px",
                                                        marginLeft: "12px"
                                                    }}
                                                    onClick={() => removeUploadedFile(index)}
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                );
            case 3:
                return (
                    <>
                        <h2 style={{ fontSize: "24px", fontWeight: "500", margin: "20px 0", color: '#000' }}>Role & Permissions Assignment</h2>

                        {!formData.isCustomAdmin ? (
                            // Main role selection with radio buttons
                            <Form.Group className="mb-4">
                                {/* Super Admin */}
                                <div
                                    className="d-flex justify-content-between align-items-center p-3 mb-3"
                                    style={{
                                        border: "1px solid #EAECF0",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => setFormData({ ...formData, role: "Super Admin", isCustomAdmin: false })}
                                >
                                    <div>
                                        <div style={{ fontSize: "16px", fontWeight: "500", color: '#000' }}>Super Admin</div>
                                        <div style={{ fontSize: "14px", color: '#667085' }}>Complete system control with access to all institutes and advanced settings</div>
                                    </div>
                                    <Form.Check
                                        type="radio"
                                        name="role"
                                        checked={formData.role === "Super Admin"}
                                        onChange={() => setFormData({ ...formData, role: "Super Admin", isCustomAdmin: false })}
                                        style={{
                                            transform: "scale(1.3)",
                                        }}
                                        className="custom-radio"
                                    />
                                </div>

                                {/* Academic Admin */}
                                <div
                                    className="d-flex justify-content-between align-items-center p-3 mb-3"
                                    style={{
                                        border: "1px solid #EAECF0",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => setFormData({ ...formData, role: "Academic Admin", isCustomAdmin: false })}
                                >
                                    <div>
                                        <div style={{ fontSize: "16px", fontWeight: "500", color: '#000' }}>Academic Admin</div>
                                        <div style={{ fontSize: "14px", color: '#667085' }}>Manages academic operations, courses, schedules, and educational content</div>
                                    </div>
                                    <Form.Check
                                        type="radio"
                                        name="role"
                                        checked={formData.role === "Academic Admin"}
                                        onChange={() => setFormData({ ...formData, role: "Academic Admin", isCustomAdmin: false })}
                                        style={{
                                            transform: "scale(1.3)",
                                        }}
                                        className="custom-radio"
                                    />
                                </div>

                                {/* Finance Admin */}
                                <div
                                    className="d-flex justify-content-between align-items-center p-3 mb-3"
                                    style={{
                                        border: "1px solid #EAECF0",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => setFormData({ ...formData, role: "Finance Admin", isCustomAdmin: false })}
                                >
                                    <div>
                                        <div style={{ fontSize: "16px", fontWeight: "500", color: '#000' }}>Finance Admin</div>
                                        <div style={{ fontSize: "14px", color: '#667085' }}>Handles all financial operations, fee management, and payment processing</div>
                                    </div>
                                    <Form.Check
                                        type="radio"
                                        name="role"
                                        checked={formData.role === "Finance Admin"}
                                        onChange={() => setFormData({ ...formData, role: "Finance Admin", isCustomAdmin: false })}
                                        style={{
                                            transform: "scale(1.3)",
                                        }}
                                        className="custom-radio"
                                    />
                                </div>

                                {/* HR Admin */}
                                <div
                                    className="d-flex justify-content-between align-items-center p-3 mb-3"
                                    style={{
                                        border: "1px solid #EAECF0",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => setFormData({ ...formData, role: "HR Admin", isCustomAdmin: false })}
                                >
                                    <div>
                                        <div style={{ fontSize: "16px", fontWeight: "500", color: '#000' }}>HR Admin</div>
                                        <div style={{ fontSize: "14px", color: '#667085' }}>Manages human resources, staff recruitment, and payroll operations</div>
                                    </div>
                                    <Form.Check
                                        type="radio"
                                        name="role"
                                        checked={formData.role === "HR Admin"}
                                        onChange={() => setFormData({ ...formData, role: "HR Admin", isCustomAdmin: false })}
                                        style={{
                                            transform: "scale(1.3)",
                                        }}
                                        className="custom-radio"
                                    />
                                </div>

                                {/* Student Affairs Admin */}
                                <div
                                    className="d-flex justify-content-between align-items-center p-3 mb-3"
                                    style={{
                                        border: "1px solid #EAECF0",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => setFormData({ ...formData, role: "Student Affairs Admin", isCustomAdmin: false })}
                                >
                                    <div>
                                        <div style={{ fontSize: "16px", fontWeight: "500", color: '#000' }}>Student Affairs Admin</div>
                                        <div style={{ fontSize: "14px", color: '#667085' }}>Manages student records, admissions, and student-related activities</div>
                                    </div>
                                    <Form.Check
                                        type="radio"
                                        name="role"
                                        checked={formData.role === "Student Affairs Admin"}
                                        onChange={() => setFormData({ ...formData, role: "Student Affairs Admin", isCustomAdmin: false })}
                                        style={{
                                            transform: "scale(1.3)",
                                        }}
                                        className="custom-radio"
                                    />
                                </div>

                                {/* Custom Admin */}
                                <div
                                    className="d-flex justify-content-between align-items-center p-3 mb-3"
                                    style={{
                                        border: "1px solid #EAECF0",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => setFormData({ ...formData, role: "Custom Admin", isCustomAdmin: true, customRoles: [] })}
                                >
                                    <div>
                                        <div style={{ fontSize: "16px", fontWeight: "500", color: '#000' }}>Custom Admin</div>
                                        <div style={{ fontSize: "14px", color: '#667085' }}>Custom role with specifically selected permissions for unique requirements</div>
                                    </div>
                                    <Form.Check
                                        type="radio"
                                        name="role"
                                        checked={formData.role === "Custom Admin"}
                                        onChange={() => setFormData({ ...formData, role: "Custom Admin", isCustomAdmin: true, customRoles: [] })}
                                        style={{
                                            transform: "scale(1.3)",
                                        }}
                                        className="custom-radio"
                                    />
                                </div>
                            </Form.Group>
                        ) : (
                            // Custom Admin multi-selection view
                            <>
                                <div className="mb-4">
                                    <p style={{ fontSize: "16px", color: '#6B7280', marginBottom: '20px' }}>
                                        You can select multiple roles for the Custom Admin
                                    </p>

                                    {/* Student Affairs Admin */}
                                    <div
                                        className="d-flex justify-content-between align-items-center p-3 mb-3"
                                        style={{
                                            border: "1px solid #EAECF0",
                                            borderRadius: "8px",
                                            cursor: "pointer",
                                        }}
                                        onClick={() => {
                                            const updatedRoles = formData.customRoles?.includes("Student Affairs Admin")
                                                ? formData.customRoles.filter(r => r !== "Student Affairs Admin")
                                                : [...(formData.customRoles || []), "Student Affairs Admin"];
                                            setFormData({ ...formData, customRoles: updatedRoles })
                                        }}
                                    >
                                        <div>
                                            <div style={{ fontSize: "16px", fontWeight: "500", color: '#000' }}>Student Affairs Admin</div>
                                            <div style={{ fontSize: "14px", color: '#667085' }}>Manages student records, admissions, and student-related activities</div>
                                        </div>
                                        <Form.Check
                                            type="checkbox"
                                            checked={formData.customRoles?.includes("Student Affairs Admin")}
                                            onChange={() => {
                                                const updatedRoles = formData.customRoles?.includes("Student Affairs Admin")
                                                    ? formData.customRoles.filter(r => r !== "Student Affairs Admin")
                                                    : [...(formData.customRoles || []), "Student Affairs Admin"];
                                                setFormData({ ...formData, customRoles: updatedRoles })
                                            }}
                                            style={{
                                                transform: "scale(1.3)",
                                            }}
                                            className="custom-checkbox"
                                        />
                                    </div>

                                    {/* Academic Admin */}
                                    <div
                                        className="d-flex justify-content-between align-items-center p-3 mb-3"
                                        style={{
                                            border: "1px solid #EAECF0",
                                            borderRadius: "8px",
                                            cursor: "pointer",
                                        }}
                                        onClick={() => {
                                            const updatedRoles = formData.customRoles?.includes("Academic Admin")
                                                ? formData.customRoles.filter(r => r !== "Academic Admin")
                                                : [...(formData.customRoles || []), "Academic Admin"];
                                            setFormData({ ...formData, customRoles: updatedRoles })
                                        }}
                                    >
                                        <div>
                                            <div style={{ fontSize: "16px", fontWeight: "500", color: '#000' }}>Academic Admin</div>
                                            <div style={{ fontSize: "14px", color: '#667085' }}>Manages academic operations, courses, schedules, and educational content</div>
                                        </div>
                                        <Form.Check
                                            type="checkbox"
                                            checked={formData.customRoles?.includes("Academic Admin")}
                                            onChange={() => {
                                                const updatedRoles = formData.customRoles?.includes("Academic Admin")
                                                    ? formData.customRoles.filter(r => r !== "Academic Admin")
                                                    : [...(formData.customRoles || []), "Academic Admin"];
                                                setFormData({ ...formData, customRoles: updatedRoles })
                                            }}
                                            style={{
                                                transform: "scale(1.3)",
                                            }}
                                            className="custom-checkbox"
                                        />
                                    </div>

                                    {/* Finance Admin */}
                                    <div
                                        className="d-flex justify-content-between align-items-center p-3 mb-3"
                                        style={{
                                            border: "1px solid #EAECF0",
                                            borderRadius: "8px",
                                            cursor: "pointer",
                                        }}
                                        onClick={() => {
                                            const updatedRoles = formData.customRoles?.includes("Finance Admin")
                                                ? formData.customRoles.filter(r => r !== "Finance Admin")
                                                : [...(formData.customRoles || []), "Finance Admin"];
                                            setFormData({ ...formData, customRoles: updatedRoles })
                                        }}
                                    >
                                        <div>
                                            <div style={{ fontSize: "16px", fontWeight: "500", color: '#000' }}>Finance Admin</div>
                                            <div style={{ fontSize: "14px", color: '#667085' }}>Handles all financial operations, fee management, and payment processing</div>
                                        </div>
                                        <Form.Check
                                            type="checkbox"
                                            checked={formData.customRoles?.includes("Finance Admin")}
                                            onChange={() => {
                                                const updatedRoles = formData.customRoles?.includes("Finance Admin")
                                                    ? formData.customRoles.filter(r => r !== "Finance Admin")
                                                    : [...(formData.customRoles || []), "Finance Admin"];
                                                setFormData({ ...formData, customRoles: updatedRoles })
                                            }}
                                            style={{
                                                transform: "scale(1.3)",
                                            }}
                                            className="custom-checkbox"
                                        />
                                    </div>

                                    {/* HR Admin */}
                                    <div
                                        className="d-flex justify-content-between align-items-center p-3 mb-3"
                                        style={{
                                            border: "1px solid #EAECF0",
                                            borderRadius: "8px",
                                            cursor: "pointer",
                                        }}
                                        onClick={() => {
                                            const updatedRoles = formData.customRoles?.includes("HR Admin")
                                                ? formData.customRoles.filter(r => r !== "HR Admin")
                                                : [...(formData.customRoles || []), "HR Admin"];
                                            setFormData({ ...formData, customRoles: updatedRoles })
                                        }}
                                    >
                                        <div>
                                            <div style={{ fontSize: "16px", fontWeight: "500", color: '#000' }}>HR Admin</div>
                                            <div style={{ fontSize: "14px", color: '#667085' }}>Manages human resources, staff recruitment, and payroll operations</div>
                                        </div>
                                        <Form.Check
                                            type="checkbox"
                                            checked={formData.customRoles?.includes("HR Admin")}
                                            onChange={() => {
                                                const updatedRoles = formData.customRoles?.includes("HR Admin")
                                                    ? formData.customRoles.filter(r => r !== "HR Admin")
                                                    : [...(formData.customRoles || []), "HR Admin"];
                                                setFormData({ ...formData, customRoles: updatedRoles })
                                            }}
                                            style={{
                                                transform: "scale(1.3)",
                                            }}
                                            className="custom-checkbox"
                                        />
                                    </div>

                                    {/* Back to main selection button */}
                                    {/* <Button
                            variant="outline-secondary"
                            onClick={() => setFormData({...formData, isCustomAdmin: false, role: ""})}
                            style={{
                                borderColor: "#D1D5DB",
                                color: "#6B7280",
                                background: "white",
                                marginTop: "10px"
                            }}
                        >
                            Back to single role selection
                        </Button> */}

                                    {/* Add info message if no roles selected */}
                                    {formData.customRoles?.length === 0 && (
                                        <div className="mt-3 p-2" style={{
                                            backgroundColor: "#FEF2F2",
                                            borderRadius: "4px",
                                            color: "#B91C1C",
                                            fontSize: "14px"
                                        }}>
                                            Please select at least one role to continue
                                        </div>
                                    )}
                                </div>
                            </>
                        )}

                        {/* Add custom styling for radio buttons and checkboxes */}
                        <style jsx>{`
                .custom-radio input[type="radio"],
                .custom-checkbox input[type="checkbox"] {
                    accent-color: #7C3AED;
                }
                
                .custom-radio input[type="radio"]:checked,
                .custom-checkbox input[type="checkbox"]:checked {
                    background-color: #7C3AED;
                    border-color: #7C3AED;
                }
            `}</style>
                    </>
                );
            // Replace the existing case 4 in the renderFormStep function with this code:
            case 4:
                return (
                    <>
                        <h2 style={{ fontSize: "24px", fontWeight: "500", margin: "20px 0", color: '#000' }}>Employment Details</h2>

                        {/* Employment Type */}
                        <div className="mb-4">
                            <Form.Label style={{ fontSize: "16px", fontWeight: "500", color: '#000', display: 'block', marginBottom: '8px' }}>
                                Employment Type
                            </Form.Label>
                            <div style={{
                                border: "1px solid #EAECF0",
                                borderRadius: "8px",
                                backgroundColor: "#fff",
                                position: "relative"
                            }}>
                                <Form.Select
                                    name="employmentType"
                                    value={formData.employmentType || "Select"}
                                    onChange={handleInputChange}
                                    style={{
                                        fontSize: "16px",
                                        padding: "12px 16px",
                                        width: "100%",
                                        border: "none",
                                        borderRadius: "8px",
                                        appearance: "none",
                                        backgroundColor: "transparent",
                                        color: "#101828",
                                        zIndex: 1
                                    }}
                                    className="custom-placeholder"
                                >
                                    <option value="">Select</option>
                                    <option value="Full Time">Full Time</option>
                                    <option value="Part Time">Part Time</option>
                                    <option value="Contract">Contract</option>
                                    <option value="Temporary">Temporary</option>
                                </Form.Select>
                                <div style={{
                                    position: "absolute",
                                    right: "16px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    pointerEvents: "none",
                                    zIndex: 0
                                }}>

                                </div>
                            </div>
                        </div>

                        {/* Joining Date */}
                        <div className="mb-4">
                            <Form.Label style={{ fontSize: "16px", fontWeight: "500", color: '#000', display: 'block', marginBottom: '8px' }}>
                                Joining Date
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="joiningDate"
                                placeholder="dd/mm/yyyy"
                                value={formData.joiningDate || ""}
                                onChange={(e) => formatDate(e.target.value, "joiningDate")}
                                style={{
                                    fontSize: "16px",
                                    padding: "12px 16px",
                                    border: "1px solid #EAECF0",
                                    borderRadius: "8px",
                                    color: "#101828",
                                    width: "100%"
                                }}
                                className="custom-placeholder"
                            />
                        </div>

                        {/* Basic Salary and Probation Period - Two columns */}
                        <div className="row mb-4">
                            <div className="col-6">
                                <Form.Label style={{ fontSize: "16px", fontWeight: "500", color: '#000', display: 'block', marginBottom: '8px' }}>
                                    Basic Salary
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="basicSalary"
                                    placeholder="50,000"
                                    value={formData.basicSalary || ""}
                                    onChange={handleInputChange}
                                    style={{
                                        fontSize: "16px",
                                        padding: "12px 16px",
                                        border: "1px solid #EAECF0",
                                        borderRadius: "8px",
                                        color: "#101828",
                                        width: "100%"
                                    }}
                                    className="custom-placeholder"
                                />
                            </div>
                            <div className="col-6">
                                <Form.Label style={{ fontSize: "16px", fontWeight: "500", color: '#000', display: 'block', marginBottom: '8px' }}>
                                    Probation Period (Months)
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="probationPeriod"
                                    placeholder="0"
                                    value={formData.probationPeriod}
                                    onChange={handleInputChange}
                                    style={{
                                        fontSize: "16px",
                                        padding: "12px 16px",
                                        border: "1px solid #EAECF0",
                                        borderRadius: "8px",
                                        color: "#101828",
                                        width: "100%"
                                    }}
                                    className="custom-placeholder"
                                />
                            </div>
                        </div>

                        {/* Work Schedule */}
                        <div className="mb-4">
                            <Form.Label style={{ fontSize: "16px", fontWeight: "500", color: '#000', display: 'block', marginBottom: '8px' }}>
                                Work Schedule
                            </Form.Label>
                            <div style={{
                                border: "1px solid #EAECF0",
                                borderRadius: "8px",
                                backgroundColor: "#fff",
                                position: "relative"
                            }}>
                                <Form.Select
                                    name="workSchedule"
                                    value={formData.workSchedule || "Select"}
                                    onChange={handleInputChange}
                                    style={{
                                        fontSize: "16px",
                                        padding: "12px 16px",
                                        width: "100%",
                                        border: "none",
                                        borderRadius: "8px",
                                        appearance: "none",
                                        backgroundColor: "transparent",
                                        color: "#101828",
                                        zIndex: 1
                                    }}
                                    className="custom-placeholder"
                                >
                                    <option value="">Select</option>
                                    <option value="Monday - Friday">Monday - Friday</option>
                                    <option value="Flexible">Flexible</option>
                                    <option value="Shift Work">Shift Work</option>
                                    <option value="Weekend">Weekend</option>
                                    <option value="Remote">Remote</option>
                                </Form.Select>
                                <div style={{
                                    position: "absolute",
                                    right: "16px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    pointerEvents: "none",
                                    zIndex: 0
                                }}>

                                </div>
                            </div>
                        </div>

                        {/* Contract Duration (New field) */}
                        <div className="mb-4">
                            <Form.Label style={{ fontSize: "16px", fontWeight: "500", color: '#000', display: 'block', marginBottom: '8px' }}>
                                Contract Duration (In Months)
                            </Form.Label>
                            <div style={{
                                border: "1px solid #EAECF0",
                                borderRadius: "8px",
                                backgroundColor: "#fff",
                                position: "relative"
                            }}>
                                <Form.Select
                                    name="contractDuration"
                                    value={formData.contractDuration || "Select"}
                                    onChange={handleInputChange}
                                    style={{
                                        fontSize: "16px",
                                        padding: "12px 16px",
                                        width: "100%",
                                        border: "none",
                                        borderRadius: "8px",
                                        appearance: "none",
                                        backgroundColor: "transparent",
                                        color: "#101828",
                                        zIndex: 1
                                    }}
                                    className="custom-placeholder"
                                >
                                    <option value="">Select</option>
                                    <option value="3">3</option>
                                    <option value="6">6</option>
                                    <option value="12">12</option>
                                    <option value="24">24</option>
                                    <option value="36">36</option>
                                </Form.Select>
                                <div style={{
                                    position: "absolute",
                                    right: "16px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    pointerEvents: "none",
                                    zIndex: 0
                                }}>
                                </div>
                            </div>
                        </div>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <Container fluid className="p-3">
            {/* Success Alert */}
            {showSuccessAlert && (
                <Alert
                    variant="success"
                    onClose={() => setShowSuccessAlert(false)}
                    dismissible
                    style={{
                        position: "fixed",
                        top: "20px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        zIndex: 1050,
                        width: "80%",
                        maxWidth: "500px",
                        textAlign: "center",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
                    }}
                >
                    <Alert.Heading>Success!</Alert.Heading>
                    <p>Student registration completed successfully! Redirecting...</p>
                </Alert>
            )}

            {/* Header Section */}
            {/* Header */}
            <header className="d-flex justify-content-between align-items-center mb-4" id="syllabusheader">
                <div className="d-flex align-items-center" style={{ fontSize: '24px', fontWeight: '600' }}>
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
                    <h4 className="fw-bold mb-0">Add Admin</h4>
                </div>
                <div className="d-flex align-items-center" id="exam-avatar">
                    <Image
                        id="info-img"
                        src={userData?.profile_pic || "/assets/avatar.jpeg"}
                        alt="Profile"
                        roundedCircle
                        width={54}
                        height={54}
                        className="me-2"
                    />
                    <div>
                        <div style={{ fontSize: "14px", fontWeight: "500", color: '#1F2937' }}>
                            {userData?.full_name}
                        </div>
                        <div style={{ fontSize: "12px", color: "#9CA3AF", fontWeight: '400' }}>{userData?.admin_id}</div>
                    </div>
                </div>
            </header>

            {/* Progress Steps */}
            <div style={{ display: "flex", justifyContent: "center", }}>
                {/* Step 1 */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div
                        style={{
                            backgroundColor: getStepIconColor(1),
                            borderRadius: "50%",
                            width: "60px",
                            height: "60px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginBottom: "8px",
                            transition: "background-color 0.3s ease",
                            cursor: currentStep > 1 ? "pointer" : "default"
                        }}
                        onClick={() => currentStep > 1 && setCurrentStep(1)}
                    >
                        <img
                            src="/assets/13.png"
                            width={24}
                            height={24}
                            alt="Personal"
                            style={{
                                filter: currentStep === 1 ? "brightness(0) invert(1)" : "none",
                                opacity: currentStep >= 1 ? 1 : 0.7
                            }}
                        />
                    </div>
                    {/* <span style={{
                        fontSize: "12px",
                        color: getStepTextColor(1),
                        fontWeight: "500",
                        transition: "color 0.3s ease"
                    }}>Personal Info</span> */}
                </div>

                {/* Connector */}
                <div
                    style={{
                        width: "100%",
                        height: "2px",
                        backgroundColor: currentStep > 1 ? "#9747FF" : "#E5E7EB",
                        alignSelf: "center",
                        margin: "0 4px",
                        marginTop: "-16px",
                        transition: "background-color 0.3s ease"
                    }}
                ></div>

                {/* Step 2 */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div
                        style={{
                            backgroundColor: getStepIconColor(2),
                            borderRadius: "50%",
                            width: "60px",
                            height: "60px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginBottom: "8px",
                            transition: "background-color 0.3s ease",
                            cursor: currentStep > 2 ? "pointer" : "default"
                        }}
                        onClick={() => currentStep > 2 && setCurrentStep(2)}
                    >
                        <img
                            src="/assets/18.png"
                            width={24}
                            height={24}
                            alt="Academic"
                            style={{
                                filter: currentStep >= 2 ? "brightness(0) invert(1)" : "none",
                                opacity: currentStep < 2 ? 0.5 : 1,
                                transition: "opacity 0.3s ease, filter 0.3s ease"
                            }}
                        />
                    </div>
                    {/* <span style={{
                        fontSize: "12px",
                        color: getStepTextColor(2),
                        fontWeight: "500",
                        transition: "color 0.3s ease"
                    }}>Academic Info</span> */}
                </div>

                {/* Connector */}
                <div
                    style={{
                        width: "100%",
                        height: "2px",
                        backgroundColor: currentStep > 2 ? "#9747FF" : "#E5E7EB",
                        alignSelf: "center",
                        margin: "0 4px",
                        marginTop: "-16px",
                        transition: "background-color 0.3s ease"
                    }}
                ></div>

                {/* Step 3 */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div
                        style={{
                            backgroundColor: getStepIconColor(3),
                            borderRadius: "50%",
                            width: "60px",
                            height: "60px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginBottom: "8px",
                            transition: "background-color 0.3s ease",
                            cursor: currentStep > 3 ? "pointer" : "default"
                        }}
                        onClick={() => currentStep > 3 && setCurrentStep(3)}
                    >
                        <img
                            src="/assets/20.png"
                            width={24}
                            height={24}
                            alt="Guardian"
                            style={{
                                filter: currentStep >= 3 ? "brightness(0) invert(1)" : "none",
                                opacity: currentStep < 3 ? 0.5 : 1,
                                transition: "opacity 0.3s ease, filter 0.3s ease"
                            }}
                        />
                    </div>
                    {/* <span style={{
                        fontSize: "12px",
                        color: getStepTextColor(3),
                        fontWeight: "500",
                        transition: "color 0.3s ease"
                    }}>Guardian Info</span> */}
                </div>

                {/* Connector */}
                <div
                    style={{
                        width: "100%",
                        height: "2px",
                        backgroundColor: currentStep > 3 ? "#9747FF" : "#E5E7EB",
                        alignSelf: "center",
                        margin: "0 4px",
                        marginTop: "-16px",
                        transition: "background-color 0.3s ease"
                    }}
                ></div>

                {/* Step 4 */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div
                        style={{
                            backgroundColor: getStepIconColor(4),
                            borderRadius: "50%",
                            width: "60px",
                            height: "60px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginBottom: "8px",
                            transition: "background-color 0.3s ease"
                        }}
                    >
                        <img
                            src="/assets/19.png"
                            width={24}
                            height={24}
                            alt="Additional"
                            style={{
                                filter: currentStep === 4 ? "brightness(0) invert(1)" : "none",
                                opacity: currentStep < 4 ? 0.5 : 1,
                                transition: "opacity 0.3s ease, filter 0.3s ease"
                            }}
                        />
                    </div>
                    {/* <span style={{
                        fontSize: "12px",
                        color: getStepTextColor(4),
                        fontWeight: "500",
                        transition: "color 0.3s ease"
                    }}>Additional Info</span> */}
                </div>
            </div>

            {/* Form Section */}
            <Form onSubmit={handleSubmit} className="forms">
                {renderFormStep()}

                {/* Navigation Buttons */}
                <div className="d-flex justify-content-between mb-4">
                    {currentStep > 1 ? (
                        <Button
                            type="button"
                            onClick={goToPreviousStep}
                            style={{
                                backgroundColor: "white",
                                color: "#667085",
                                border: "1px solid #EAECF0",
                                borderRadius: "8px",
                                padding: "10px 16px",
                                fontSize: "14px",
                                fontWeight: "500",
                                width: "100px",
                                transition: "all 0.2s ease"
                            }}
                            className="hover-shadow"
                        >
                            Back
                        </Button>
                    ) : (
                        <div></div> // Empty div to maintain flex spacing
                    )}
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        style={{
                            backgroundColor: "#9747FF",
                            border: "none",
                            borderRadius: "8px",
                            padding: "10px 16px",
                            fontSize: "16px",
                            fontWeight: "500",
                            width: isSubmitting ? "120px" : "100px",
                            transition: "all 0.2s ease",
                            opacity: isSubmitting ? 0.8 : 1
                        }}
                        className="hover-shadow"
                    >
                        {isSubmitting ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Submitting...
                            </>
                        ) : (
                            currentStep === 4 ? "Submit" : "Next"
                        )}
                    </Button>
                </div>
            </Form>

            {/* CSS for hover effects and placeholder styles */}
            <style jsx global>{`
        // .hover-shadow:hover {
        //   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        //   transform: translateY(-2px);
        // }
        
        .custom-placeholder::placeholder {
          color: #667085 !important;
          opacity: 1;
        }
        .custom-placeholder::-webkit-input-placeholder {
          color: #667085 !important;
        }
        .custom-placeholder::-moz-placeholder {
          color: #667085 !important;
        }
        .custom-placeholder:-ms-input-placeholder {
          color: #667085 !important;
        }
        .custom-placeholder:-moz-placeholder {
          color: #667085 !important;
        }
        
        select.custom-placeholder option {
          color: #101828;
        }
        
        select.custom-placeholder option:first-child {
          color: #667085;
        }
      `}</style>
            <ToastContainer />
        </Container>
    );
}

export default AddStudent;