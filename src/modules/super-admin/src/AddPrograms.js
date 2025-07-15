import React, { useContext, useState, useCallback, useMemo } from 'react';
import { UserContext } from './UserContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { arrayRemove, arrayUnion } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';

const CustomSelect = React.memo(({ label, value, options, onChange, field }) => (
    <div style={styles.inputContainer}>
        <label style={styles.label}>
            {label}
        </label>
        <div style={styles.selectContainer}>
            <select
                value={value}
                onChange={(e) => onChange(field, e.target.value)}
                style={styles.select}
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
                style={styles.selectArrow}
            />
        </div>
    </div>
));

const CustomInput = React.memo(({ label, type = 'text', value, onChange, placeholder, maxWidth, field }) => (
    <div style={styles.inputContainer}>
        <label style={styles.label}>
            {label}
        </label>
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(field, e.target.value)}
            style={{
                ...styles.input,
                maxWidth: maxWidth || 'none'
            }}
        />
    </div>
));

const AddProgramScreen = () => {
    const { userData, adminData, deptsData, updateDocById, refreshAdminData, updateArrayItemById, deleteArrayItemById, addDepartment, refreshDeptsData, deleteDocById, deleteProgram, editProgram } = useContext(UserContext);
    const navigation = useNavigate();
    const location = useLocation();
    const program = location.state;

    const [formData, setFormData] = useState({
        programName: program?.name || '',
        programCode: program?.code || '',
        programType: program?.type || '',
        department: program?.department || '',
        status: program?.status || 'Active',
        totalSemester: program?.semesters?.length || '',
        degreeAwarded: program?.degree_award || '',
        creditHours: program?.credit_hours || '120'
    });

    const statusOptions = useMemo(() => [
        { value: 'Active', label: 'Active' },
        { value: 'In-Active', label: 'In-Active' },
    ], []);

    const programTypes = useMemo(() => [
        { value: 'Undergraduate', label: 'Undergraduate' },
        { value: 'Postgraduate', label: 'Postgraduate' },
        { value: 'Diploma', label: 'Diploma' },
        { value: 'Certificate', label: 'Certificate' }
    ], []);

    const semesterOptions = useMemo(() => [
        { value: '2', label: '2 Semesters' },
        { value: '4', label: '4 Semesters' },
        { value: '6', label: '6 Semesters' },
        { value: '8', label: '8 Semesters' },
        { value: '10', label: '10 Semesters' },
        { value: '12', label: '12 Semesters' }
    ], []);

    const degreeOptions = useMemo(() => [
        { value: 'Associate Degree', label: 'Associate Degree' },
        { value: 'Bachelor of Engineering', label: 'Bachelor of Engineering' },
        { value: 'Bachelor of Science', label: 'Bachelor of Science' },
        { value: 'Bachelor of Arts', label: 'Bachelor of Arts' },
        { value: 'Master of Engineering', label: 'Master of Engineering' },
        { value: 'Master of Science', label: 'Master of Science' },
        { value: 'Master of Arts', label: 'Master of Arts' },
        { value: 'PhD', label: 'Doctor of Philosophy' },
        { value: 'Certificate', label: 'Certificate' },
        { value: 'Diploma', label: 'Diploma' }
    ], []);

    const handleInputChange = useCallback((field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    }, []);

    const handleSave = async () => {
        if (!formData?.programName || !formData?.programType || !formData?.programCode || !formData?.creditHours || !formData?.degreeAwarded || !formData?.department || !formData?.totalSemester || !formData?.status) {
            toast.error('Please enter and select all fields');
            return;
        }

        const selectedDepartment = deptsData.find(dept => dept?.name === formData?.department);
        const semestersArray = Array.from({ length: parseInt(formData?.totalSemester) }, (_, index) => ({
            number: index + 1,
            courses: []
        }));

        try {
            const result = await updateDocById('departments', selectedDepartment?.id, {
                programs: arrayUnion({
                    name: formData?.programName,
                    code: formData?.programCode,
                    type: formData?.programType,
                    department: formData?.department,
                    semesters: semestersArray,
                    credit_hours: formData?.creditHours,
                    degree_award: formData?.degreeAwarded,
                    program_id: `PROG-${generateUniqueCode()}`,
                    status: formData?.status,
                })
            });

            if (result?.success) {
                await refreshDeptsData();
                toast.success("Program added successfully!");
            } else {
                toast.error("Something went wrong, please try again later");
            }
        } catch (error) {
            console.log(error);
            toast.error("An error occurred while saving the program");
        } finally {
            setTimeout(() => {
                navigation(-1);
            }, 2000);
        }
    };

    const handleEdit = async () => {
        if (!formData?.programName || !formData?.programType || !formData?.programCode || !formData?.creditHours || !formData?.degreeAwarded || !formData?.department || !formData?.totalSemester || !formData?.status) {
            toast.error('Please enter and select all fields');
            return;
        }

        try {
            const result = await editProgram(program?.department_id, program?.program_id, formData);

            if (result?.success) {
                await refreshDeptsData();
                toast.success("Program edited successfully!");
            } else {
                toast.error("Something went wrong, please try again later");
            }
        } catch (error) {
            console.log(error);
            toast.error("An error occurred while editing the program");
        } finally {
            setTimeout(() => {
                navigation(-1);
            }, 2000);
        }
    };

    const handleDelete = async () => {
        try {
            const result = await deleteProgram(program?.department_id, program?.program_id);

            if (result?.success) {
                await refreshDeptsData();
                toast.success("Program deleted successfully!");
            } else {
                toast.error("Something went wrong, please try again later");
            }
        } catch (error) {
            console.log(error);
            toast.error("An error occurred while saving the program");
        } finally {
            setTimeout(() => {
                navigation(-1);
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

    const handleGoBack = useCallback(() => {
        window.history.back();
    }, []);

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <div style={styles.headerLeft}>
                    <img
                        src="/assets/arrow-left.png"
                        alt="Back Arrow"
                        style={styles.backArrow}
                        onClick={handleGoBack}
                    />
                    <h4 style={styles.headerTitle}>Department & Program</h4>
                </div>
                <div style={styles.headerRight}>
                    <img
                        src="/assets/avatar.jpeg"
                        alt="Profile"
                        style={styles.profileImage}
                    />
                    <div>
                        <div style={styles.profileName}>
                            {userData?.full_name}
                        </div>
                        <div style={styles.profileId}>
                            {userData?.user_id}
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div>
                <div style={styles.contentContainer}>
                    <h2 style={styles.pageTitle}>
                        {program ? 'Edit' : 'Add'} Program
                    </h2>

                    {/* Form Grid */}
                    <div style={styles.formGrid}>
                        {/* Program Name */}
                        <CustomInput
                            label="Program Name"
                            value={formData.programName}
                            onChange={handleInputChange}
                            placeholder="Enter program name..."
                            field="programName"
                        />

                        {/* Program Code */}
                        <CustomInput
                            label="Program Code"
                            value={formData.programCode}
                            onChange={handleInputChange}
                            placeholder="e.g., CS101, ENGR1001..."
                            field="programCode"
                        />

                        {/* Program Type */}
                        <CustomSelect
                            label="Program Type"
                            value={formData.programType}
                            options={programTypes}
                            onChange={handleInputChange}
                            field="programType"
                        />

                        {/* Department */}
                        {!program &&
                            <div style={styles.inputContainer}>
                                <label style={styles.label}>
                                    Department
                                </label>
                                <div style={styles.selectContainer}>
                                    <select
                                        value={formData?.department || 'Select Department'}
                                        onChange={(e) => handleInputChange('department', e.target.value)}
                                        style={styles.select}
                                    >
                                        <option value={''}>Select</option>
                                        {deptsData?.map((dept, index) => (
                                            <option key={dept?.id || index} value={dept?.name}>
                                                {dept?.name}
                                            </option>
                                        ))}
                                    </select>
                                    <img
                                        src="/assets/arrow-down.png"
                                        alt="Dropdown arrow"
                                        style={styles.selectArrow}
                                    />
                                </div>
                            </div>
                        }

                        {/* Total Semester */}
                        {!program &&
                            <CustomSelect
                                label="Total Semester"
                                value={formData.totalSemester}
                                options={semesterOptions}
                                onChange={handleInputChange}
                                field="totalSemester"
                            />
                        }


                        {/* Degree Awarded */}
                        <CustomSelect
                            label="Degree Awarded"
                            value={formData.degreeAwarded}
                            options={degreeOptions}
                            onChange={handleInputChange}
                            field="degreeAwarded"
                        />

                        <CustomSelect
                            label="Status"
                            value={formData?.status}
                            options={statusOptions}
                            onChange={handleInputChange}
                            field="status"
                        />
                    </div>

                    {/* Credit Hours - Full Width */}
                    <div style={styles.fullWidthField}>
                        <CustomInput
                            label="Credit Hours"
                            type="number"
                            value={formData.creditHours}
                            onChange={handleInputChange}
                            placeholder="Enter credit hours..."
                            maxWidth="200px"
                            field="creditHours"
                        />
                    </div>


                    <div style={styles.actionContainer}>
                        {/* Delete Button */}
                        {program &&
                            <button
                                onClick={handleDelete}
                                style={styles.deleteButton}
                            >
                                Delete
                            </button>
                        }

                        {/* Action Buttons */}
                        <button
                            onClick={() => program ? handleEdit() : handleSave()}
                            style={styles.saveButton}
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

const styles = {
    // Main Container
    container: {
        minHeight: '100vh',
        backgroundColor: '#f8fafc',
        padding: '15px'
    },

    // Header Styles
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px'
    },
    headerLeft: {
        display: 'flex',
        alignItems: 'center',
        fontSize: '24px',
        fontWeight: '600'
    },
    backArrow: {
        width: '24px',
        height: '24px',
        marginRight: '8px',
        cursor: 'pointer'
    },
    headerTitle: {
        fontWeight: 'bold',
        marginBottom: '0'
    },
    headerRight: {
        display: 'flex',
        alignItems: 'center'
    },
    profileImage: {
        width: '54px',
        height: '54px',
        marginRight: '8px',
        borderRadius: '50%'
    },
    profileName: {
        fontSize: '14px',
        fontWeight: '500',
        color: '#1F2937'
    },
    profileId: {
        fontSize: '12px',
        color: '#9CA3AF',
        fontWeight: '400'
    },

    // Main Content
    contentContainer: {
        borderRadius: '12px',
        margin: '0 auto'
    },
    pageTitle: {
        fontSize: '24px',
        fontWeight: '500',
        color: '#000',
        marginBottom: '32px'
    },

    // Form Styles
    formGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '24px',
        marginBottom: '32px'
    },
    fullWidthField: {
        marginBottom: '32px'
    },

    // Input Styles
    inputContainer: {
        // Container for input fields
    },
    label: {
        display: 'block',
        fontSize: '16px',
        fontWeight: '500',
        color: '#000',
        marginBottom: '8px'
    },
    input: {
        width: '100%',
        padding: '12px 16px',
        border: '1px solid #d1d5db',
        borderRadius: '8px',
        fontSize: '14px',
        backgroundColor: 'white',
        outline: 'none',
        boxSizing: 'border-box'
    },

    // Select Styles
    selectContainer: {
        position: 'relative'
    },
    select: {
        width: '100%',
        padding: '12px 40px 12px 16px',
        border: '1px solid #d1d5db',
        borderRadius: '8px',
        fontSize: '14px',
        outline: 'none',
        appearance: 'none',
        cursor: 'pointer',
        boxSizing: 'border-box'
    },
    selectArrow: {
        position: 'absolute',
        right: '12px',
        top: '50%',
        transform: 'translateY(-50%)',
        pointerEvents: 'none',
        width: '16px',
        height: '16px',
        opacity: 0.6
    },

    // Action Buttons
    actionContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '12px',
        paddingTop: '24px'
    },
    deleteButton: {
        padding: '12px 24px',
        border: 'none',
        borderRadius: '100px',
        backgroundColor: '#f65c5c',
        color: 'white',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer'
    },
    saveButton: {
        padding: '12px 24px',
        border: 'none',
        borderRadius: '100px',
        backgroundColor: '#8b5cf6',
        color: 'white',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer'
    },
};

export default AddProgramScreen;