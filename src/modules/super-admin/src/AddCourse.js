import React, { useContext, useState } from 'react';
import { UserContext } from './UserContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const CustomSelect = ({ label, value, options, onChange }) => (
    <div>
        <label style={{
            display: 'block',
            fontSize: '16px',
            fontWeight: '500',
            color: '#000',
            marginBottom: '8px'
        }}>
            {label}
        </label>
        <div style={{ position: 'relative' }}>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                style={{
                    width: '100%',
                    padding: '12px 40px 12px 16px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    appearance: 'none',
                    cursor: 'pointer'
                }}
            >
                <option value={''}>Select</option>
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <img
                src="/assets/arrow-down.png"
                alt="Dropdown arrow"
                style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                    width: '16px',
                    height: '16px',
                    opacity: 0.6
                }}
            />
        </div>
    </div>
);

const CustomInput = ({ label, type = 'text', value, onChange, placeholder, maxWidth }) => (
    <div>
        <label style={{
            display: 'block',
            fontSize: '16px',
            fontWeight: '500',
            color: '#000',
            marginBottom: '8px'
        }}>
            {label}
        </label>
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            style={{
                width: '100%',
                maxWidth: maxWidth || 'none',
                padding: '12px 16px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                backgroundColor: 'white',
                outline: 'none'
            }}
        />
    </div>
);

const AddCourseScreen = () => {
    const { userData, refreshDeptsData, addCourse, editCourse } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();
    const program = location.state?.program || location.state;
    const course = location.state?.course || null;
    const [formData, setFormData] = useState({
        courseName: course?.name || '',
        courseCode: course?.code || '',
        courseType: course?.type || '',
        semesterOffered: course?.semester || '',
        creditHours: course?.credit_hours || '3',
        status: 'Active',
    });

    const statusOptions = [
        { value: 'Active', label: 'Active' },
        { value: 'In-Active', label: 'In-Active' },
    ];

    const courseTypes = [
        { value: 'core', label: 'Core' },
        { value: 'elective', label: 'Elective' },
        { value: 'mandatory', label: 'Mandatory' },
        { value: 'optional', label: 'Optional' },
    ];

    const semesterOffered = Array.from({ length: program?.semesters?.length }, (_, i) => {
        const semNumber = i + 1;
        return {
            value: semNumber.toString(),
            label: `Semester ${semNumber}`
        };
    });

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSave = async () => {
        if (!formData?.courseName || !formData?.courseCode || !formData?.courseType || !formData?.creditHours || !formData?.semesterOffered || !formData?.status) {
            toast.error('Please enter and select all fields');
            return;
        }

        try {
            const result = await addCourse(program?.department_id, program?.program_id, formData?.semesterOffered, {
                name: formData?.courseName,
                code: formData?.courseCode,
                type: formData?.courseType,
                department: program?.department,
                program: program?.name,
                semester: formData?.semesterOffered,
                credit_hours: formData?.creditHours,
                status: formData?.status,
                createdAt: new Date().toISOString(),
                course_id: `COURSE-${generateUniqueCode()}`
            });
            if (result?.success) {
                await refreshDeptsData();
                toast.success("Course added successfully!");
            } else {
                toast.error(result?.message);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setTimeout(() => {
                navigate(-1);
            }, 2000);
        }
    };

    const handleEdit = async () => {
        if (!formData?.courseName || !formData?.courseCode || !formData?.courseType || !formData?.creditHours || !formData?.semesterOffered || !formData?.status) {
            toast.error('Please enter and select all fields');
            return;
        }

        try {
            const result = await editCourse(
                program?.department_id,
                program?.program_id,
                course?.course_id,
                course?.semester,
                formData?.semesterOffered,
                {
                    name: formData?.courseName,
                    code: formData?.courseCode,
                    type: formData?.courseType,
                    department: course?.department,
                    program: course?.program,
                    semester: formData?.semesterOffered,
                    credit_hours: formData?.creditHours,
                    status: formData?.status,
                    createdAt: course?.createdAt,
                    course_id: course?.course_id
                },
            );

            if (result?.success) {
                await refreshDeptsData();
                toast.success("Course edited successfully!");
            } else {
                toast.error(result?.message);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setTimeout(() => {
                navigate(-1);
            }, 2000);
        }
    };

    const generateUniqueCode = (length = 6) => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';
        for (let i = 0; i < length; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', padding: '15px' }}>
            <header className="d-flex justify-content-between align-items-center mb-4" id="syllabusheader">
                <div className="d-flex align-items-center" style={{ fontSize: '24px', fontWeight: '600' }}>
                    <img
                        id="arrow-left"
                        src="/assets/arrow-left.png"
                        width={24}
                        height={24}
                        className="me-2"
                        alt="Back Arrow"
                        style={{ cursor: "pointer" }}
                        onClick={() => window.history.back()}
                    />
                    <h4 className="fw-bold mb-0">Program & Courses</h4>
                </div>
                <div className="d-flex align-items-center" id="exam-avatar">
                    <img
                        id="info-img"
                        src="/assets/avatar.jpeg"
                        alt="Profile"
                        width={54}
                        height={54}
                        className="me-2"
                        style={{ borderRadius: '50%' }}
                    />
                    <div>
                        <div style={{ fontSize: "14px", fontWeight: "500", color: '#1F2937' }}>
                            {userData?.full_name}
                        </div>
                        <div style={{ fontSize: "12px", color: "#9CA3AF", fontWeight: '400' }}>{userData?.user_id}</div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div>
                <div style={{
                    borderRadius: '12px',
                    margin: '0 auto'
                }}>
                    <h2 style={{
                        fontSize: '24px',
                        fontWeight: '500',
                        color: '#000',
                        marginBottom: '32px'
                    }}>
                        {course ? 'Edit' : 'Add'} Course
                    </h2>

                    {/* Form Grid */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '24px',
                        marginBottom: '32px'
                    }}>
                        {/* Course Name */}
                        <CustomInput
                            label="Course Name"
                            value={formData.courseName}
                            onChange={(value) => handleInputChange('courseName', value)}
                            placeholder="Enter course name..."
                        />

                        {/* Course Code */}
                        <CustomInput
                            label="Course Code"
                            value={formData.courseCode}
                            onChange={(value) => handleInputChange('courseCode', value)}
                            placeholder="e.g., DMS, AI..."
                        />

                        {/* Course Type */}
                        <CustomSelect
                            label="Course Type"
                            value={formData?.courseType}
                            options={courseTypes}
                            onChange={(value) => handleInputChange('courseType', value)}
                        />

                        {/* Semester Offered */}
                        <CustomSelect
                            label="Semester Offered"
                            value={formData?.semesterOffered}
                            options={semesterOffered}
                            onChange={(value) => handleInputChange('semesterOffered', value)}
                        />

                        {/* Status */}
                        <CustomSelect
                            label="Status"
                            value={formData?.status}
                            options={statusOptions}
                            onChange={(value) => handleInputChange('semesterOffered', value)}
                        />

                        {/* Credit hour */}
                        <div style={{ marginBottom: '32px' }}>
                            <CustomInput
                                label="Credit Hours"
                                type="number"
                                value={formData?.creditHours}
                                onChange={(value) => handleInputChange('creditHours', value)}
                                placeholder="Enter credit hours..."
                                maxWidth="200px"
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: '12px',
                        paddingTop: '24px',
                    }}>

                        <button
                            onClick={() => course ? handleEdit() : handleSave()}
                            style={{
                                padding: '12px 24px',
                                border: 'none',
                                borderRadius: '100px',
                                backgroundColor: '#8b5cf6',
                                color: 'white',
                                fontSize: '14px',
                                fontWeight: '600',
                                cursor: 'pointer'
                            }}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default AddCourseScreen;