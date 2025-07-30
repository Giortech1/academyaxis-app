import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";
import { arrayUnion } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

function DepartmentRoomsDashboard() {
    const { userData, adminData, deptsData, updateDocById, refreshAdminData, updateArrayItemById, deleteArrayItemById, addDepartment, refreshDeptsData, deleteDocById } = useContext(UserContext);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("Departments");
    const [searchText, setSearchText] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedItem, setSelectedItem] = useState('');
    const [isDepartmentModalOpen, setIsDepartmentModalOpen] = useState(false);
    const [isRoomModalOpen, setIsRoomModalOpen] = useState(false);
    const [departmentsData, setDepartmentsData] = useState([]);
    const [roomsData, setRoomsData] = useState([]);
    const [programsData, setProgramsData] = useState([]);
    const [departmentFormData, setDepartmentFormData] = useState({
        departmentName: "",
        departmentCode: "",
        status: "Active",
        establishedDate: ""
    });
    const [roomFormData, setRoomFormData] = useState({
        roomName: "",
        roomType: "",
        department: "",
        capacity: "",
        establishedDate: ""
    });

    useEffect(() => {
        if (adminData?.length !== 0) {
            setRoomsData(adminData?.rooms || []);
        }

        if (deptsData?.length !== 0) {
            setDepartmentsData(deptsData || []);

            const allPrograms = deptsData.flatMap(dept =>
                (dept.programs || []).map(program => {
                    const semesters = program.semesters || [];
                    const courses_no = semesters.reduce((total, semester) => {
                        return total + (semester?.courses?.length || 0);
                    }, 0);

                    return {
                        ...program,
                        department_id: dept?.id,
                        department: dept?.name,
                        courses_no,
                    };
                })
            );

            setProgramsData(allPrograms);

        }
    }, [adminData, deptsData]);

    const totalDepartments = departmentsData.length;
    const totalPrograms = programsData?.length;
    const totalRooms = departmentsData.reduce((sum, dept) => sum + dept.rooms, 0);

    let totalCourses = 0;
    programsData.forEach(program => {
        totalCourses = totalCourses + program?.courses_no || 0;
    });
    const totalRoomsCount = roomsData.length;
    const availableRooms = roomsData.filter(room => room.status === "Available").length;
    const occupiedRooms = roomsData.filter(room => room.status === "Occupied").length;

    useEffect(() => {
        if (departmentsData?.length > 0 || roomsData?.length > 0) {

            const dataToFilter = activeTab === "Departments" ? departmentsData : (activeTab === "Rooms" ? roomsData : programsData);
            let filtered = dataToFilter;


            if (activeTab === "Departments" || activeTab === "Programs") {
                filtered = dataToFilter?.filter(item =>
                    (item?.name?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
                        item?.code?.toLowerCase()?.includes(searchText?.toLowerCase())) &&
                    (item?.department === selectedDepartment || selectedDepartment === '')
                );

            } else {
                filtered = dataToFilter.filter(item =>
                    item?.roomName?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
                    item?.roomType?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
                    item?.department?.toLowerCase()?.includes(searchText?.toLowerCase()) &&
                    (item?.department?.toLowerCase()?.includes(selectedDepartment?.toLowerCase()) || selectedDepartment === '')
                );
            }

            setFilteredData(filtered);
        }

    }, [searchText, activeTab, departmentsData, roomsData, selectedDepartment]);

    const handleAddNew = () => {
        setSelectedItem('');
        if (activeTab === "Departments") {
            setIsDepartmentModalOpen(true);
        } else {
            setIsRoomModalOpen(true);
        }
    };

    const handleEditItem = (item) => {
        setSelectedItem(item);
        if (activeTab === "Departments") {
            setDepartmentFormData({
                departmentName: item?.name,
                departmentCode: item?.code,
                status: item?.status,
                establishedDate: item?.createdAt,
            });
            setIsDepartmentModalOpen(true);
        } else {
            setRoomFormData({
                roomName: item?.name,
                roomType: item?.type,
                department: item?.department,
                capacity: item?.capacity,
                establishedDate: item?.createdAt
            });
            setIsRoomModalOpen(true);
        }
    };

    const handleViewAll = () => {
        if (activeTab === "Departments") {
            window.location.href = '/all-departments';
        } else if (activeTab === "Rooms") {
            window.location.href = '/all-rooms';
        }
    };

    const handleDepartmentModalClose = () => {
        setSelectedItem('');
        setIsDepartmentModalOpen(false);
        setDepartmentFormData({
            departmentName: "",
            departmentCode: "",
            status: "Active",
            establishedDate: ""
        });
    };

    const handleRoomModalClose = () => {
        setSelectedItem('');
        setIsRoomModalOpen(false);
        setRoomFormData({
            roomName: "",
            roomType: "",
            department: "",
            capacity: "",
            establishedDate: ""
        });
    };

    const handleDepartmentInputChange = (field, value) => {
        setDepartmentFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleRoomInputChange = (field, value) => {
        setRoomFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleDepartmentSave = async () => {
        if (!departmentFormData?.departmentName ||
            !departmentFormData?.departmentCode ||
            !departmentFormData?.establishedDate ||
            !departmentFormData?.status) {
            toast.error('Please fill all field to add department');
            return;
        }

        try {
            const result = await addDepartment({
                name: departmentFormData?.departmentName,
                code: departmentFormData?.departmentCode,
                createdAt: departmentFormData?.establishedDate,
                status: departmentFormData?.status,
                rooms: 0,
                programs: [],
            })
            if (result?.success) {
                await refreshDeptsData();
                toast.success("Department added successfully!");
            } else {
                toast.error("Something went wrong, please try again later");
            }
        } catch (error) {
            console.log(error);
        } finally {
            handleDepartmentModalClose();
        }
    };

    const handleRoomSave = async () => {
        if (!roomFormData?.roomName ||
            !roomFormData?.roomType ||
            !roomFormData?.establishedDate ||
            !roomFormData?.capacity ||
            !roomFormData?.department) {
            toast.error('Please fill all field to add room');
            return;
        }

        try {
            const result = await updateDocById('data', 'data', {
                rooms: arrayUnion({
                    name: roomFormData?.roomName,
                    type: roomFormData?.roomType,
                    createdAt: roomFormData?.establishedDate,
                    capacity: roomFormData?.capacity,
                    department: roomFormData?.department,
                    status: 'Available',
                    id: `ROOM-${generateUniqueCode()}`,
                })
            })
            if (result?.success) {
                await refreshAdminData();
                toast.success("Room added successfully!");
            } else {
                toast.error("Something went wrong, please try again later");
            }
        } catch (error) {
            console.log(error);
        } finally {
            handleRoomModalClose();
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

    const handleEditDept = async () => {
        if (!departmentFormData?.departmentName ||
            !departmentFormData?.departmentCode ||
            !departmentFormData?.establishedDate ||
            !departmentFormData?.status) {
            toast.error('Please fill all field to edit department');
            return;
        }

        try {
            const result = await updateDocById('departments', selectedItem?.id, {
                name: departmentFormData?.departmentName,
                code: departmentFormData?.departmentCode,
                status: departmentFormData?.status,
                createdAt: departmentFormData?.establishedDate,
            })
            if (result?.success) {
                await refreshDeptsData();
                toast.success('Department edited successfully!');
            } else {
                toast.error("Something went wrong, please try again later");
            }
        } catch (error) {
            console.log(error);
        } finally {
            handleDepartmentModalClose();
        }
    };

    const handleEditRoom = async () => {
        if (!departmentFormData?.departmentName ||
            !departmentFormData?.departmentCode ||
            !departmentFormData?.establishedDate ||
            !departmentFormData?.status) {
            toast.error('Please fill all field to edit department');
            return;
        }

        try {
            const result = await updateArrayItemById('data', 'data', 'rooms', selectedItem?.id, {
                name: departmentFormData?.departmentName,
                code: departmentFormData?.departmentCode,
                createdAt: departmentFormData?.establishedDate,
                status: departmentFormData?.status,
                rooms: selectedItem?.rooms,
                id: selectedItem?.id,
            })
            if (result?.success) {
                await refreshAdminData();
                toast.success(`Room edited successfully!`);
            } else {
                toast.error("Something went wrong, please try again later");
            }
        } catch (error) {
            console.log(error);
        } finally {
            handleRoomModalClose();
        }
    };

    const handleDeleteDept = async (id) => {
        try {
            const result = await deleteDocById('departments', id)
            if (result?.success) {
                await refreshDeptsData();
                toast.success(`Department deleted successfully!`);
            } else {
                toast.error("Something went wrong, please try again later");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteRoom = async (id) => {
        try {
            const result = await deleteArrayItemById('data', 'data', 'rooms', id)
            if (result?.success) {
                await refreshAdminData();
                toast.success(`Room deleted successfully!`);
            } else {
                toast.error("Something went wrong, please try again later");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const StatusBadge = ({ status }) => (
        <div style={styles.statusBadge}>
            <img
                src={status === "Active" || status === "Available" ? "assets/active-icon.png" :
                    status === "Occupied" ? "assets/occupied-icon.png" : "assets/inactive-icon.png"}
                alt={status}
                style={styles.statusIcon}
                onError={(e) => {
                    e.target.style.display = 'none';
                    const dot = document.createElement('div');
                    dot.style.width = '8px';
                    dot.style.height = '8px';
                    dot.style.borderRadius = '50%';
                    dot.style.backgroundColor = status === "Active" || status === "Available" ? '#22c55e' :
                        status === "Occupied" ? '#f59e0b' : '#ef4444';
                    e.target.parentNode.insertBefore(dot, e.target);
                }}
            />
            <span style={styles.statusText}>
                {status}
            </span>
        </div>
    );

    if (activeTab === "Rooms") {
        return (
            <div style={styles.container}>
                {/* Header */}
                <div style={styles.header}>
                    <h1 style={styles.headerTitle}>
                        Departments, Programs & Rooms
                    </h1>
                    <div style={styles.headerUserSection}>
                        <div style={styles.headerAvatar}>
                            <img
                                src="assets/Avatar3.png"
                                alt="User Avatar"
                                style={styles.headerAvatarImg}
                                onError={(e) => {
                                    e.target.style.backgroundColor = '#a0aec0';
                                    e.target.alt = 'ZA';
                                }}
                            />
                        </div>
                        <div>
                            <div style={styles.headerUserName}>
                                {userData?.full_name}
                            </div>
                            <div style={styles.headerUserId}>
                                {userData?.user_id}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Tabs and Search */}
                <div style={styles.navContainer}>
                    <div style={styles.navTabs}>
                        <button
                            onClick={() => setActiveTab("Departments")}
                            style={{
                                ...styles.tabButton,
                                ...styles.tabButtonInactive
                            }}
                        >
                            Departments
                        </button>
                        <button
                            onClick={() => setActiveTab("Rooms")}
                            style={{
                                ...styles.tabButton,
                                ...styles.tabButtonActive
                            }}
                        >
                            Rooms
                        </button>
                        <button
                            onClick={() => setActiveTab("Programs")}
                            style={{
                                ...styles.tabButton,
                                ...styles.tabButtonInactive
                            }}
                        >
                            Programs
                        </button>
                    </div>

                    <div style={styles.searchContainer}>
                        <img
                            src="assets/search-lg.png"
                            alt="Search"
                            style={styles.searchIcon}
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.parentElement.style.paddingLeft = '16px';
                            }}
                        />
                        <input
                            type="text"
                            placeholder="Search departments"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            style={styles.searchInput}
                        />
                    </div>
                </div>

                {/* Header with Department Selector and Add Button */}
                <div style={styles.contentHeader}>
                    <h2 style={styles.contentTitle}>
                        Rooms
                    </h2>
                    <div style={styles.contentActions}>
                        <div style={styles.dropdown}>
                            <select
                                value={selectedDepartment}
                                onChange={(e) => setSelectedDepartment(e.target.value)}
                                style={styles.select}
                            >
                                <option value="">All Department</option>
                                {departmentsData?.map((dept, index) => (
                                    <option key={index} value={dept?.name}>
                                        {dept?.name}
                                    </option>
                                ))}
                            </select>
                            <img
                                src="assets/arrow-down.png"
                                alt="Dropdown"
                                style={styles.dropdownIcon}
                                onError={(e) => {
                                    e.target.innerHTML = '▼';
                                    e.target.style.fontSize = '10px';
                                    e.target.style.color = '#9CA3AF';
                                }}
                            />
                        </div>
                        <button
                            onClick={handleAddNew}
                            style={styles.addButton}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#2d3748'}
                            onMouseOut={(e) => e.target.style.backgroundColor = '#1a202c'}
                        >
                            <img
                                src="assets/plus.png"
                                alt="Add"
                                style={styles.addButtonIcon}
                                onError={(e) => {
                                    e.target.innerHTML = '+';
                                    e.target.style.display = 'flex';
                                    e.target.style.alignItems = 'center';
                                    e.target.style.justifyContent = 'center';
                                    e.target.style.fontSize = '16px';
                                    e.target.style.fontWeight = 'bold';
                                }}
                            />
                            <span>Add Room</span>
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div style={styles.statsContainer}>
                    {/* Total Rooms Card */}
                    <div style={styles.statsCardRoomsPrimary}>
                        <div style={styles.statsCardHeaderRooms}>
                            <img
                                src="assets/totalrooms.png"
                                alt="Total Rooms"
                                style={styles.statsCardIconRooms}
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                            <span style={styles.statsCardText}>
                                Total Rooms
                            </span>
                        </div>
                        <div style={styles.statsCardNumberRooms}>
                            {totalRoomsCount}
                        </div>
                    </div>

                    {/* Rooms Available Card */}
                    <div style={styles.statsCardRoomsAvailable}>
                        <div style={styles.statsCardHeaderRooms}>
                            <img
                                src="assets/roomsavailable.png"
                                alt="Available"
                                style={styles.statsCardIconAvailable}
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                            <span style={styles.statsCardTextAvailable}>
                                Rooms Available
                            </span>
                        </div>
                        <div style={styles.statsCardNumberAvailable}>
                            {availableRooms}
                        </div>
                    </div>

                    {/* Rooms Occupied Card */}
                    <div style={styles.statsCardRoomsOccupied}>
                        <div style={styles.statsCardHeaderRooms}>
                            <img
                                src="assets/roomsoccupied.png"
                                alt="Occupied"
                                style={styles.statsCardIconOccupied}
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                            <span style={styles.statsCardTextOccupied}>
                                Rooms Occupied
                            </span>
                        </div>
                        <div style={styles.statsCardNumberOccupied}>
                            {occupiedRooms}
                        </div>
                    </div>
                </div>

                {/* Rooms Table */}
                <div style={styles.tableContainer}>
                    <div style={styles.tableHeaderRooms}>
                        <button
                            onClick={handleViewAll}
                            style={styles.viewAllButtonRooms}
                        >
                            View all
                        </button>
                    </div>

                    <div style={styles.tableWrapper}>
                        <table style={styles.table}>
                            <thead>
                                <tr style={styles.tableHeaderRow}>
                                    <th style={{ ...styles.headerCell, textAlign: 'left' }}>Room Name</th>
                                    <th style={{ ...styles.headerCell, textAlign: 'left' }}>Room Type</th>
                                    <th style={{ ...styles.headerCell, textAlign: 'left' }}>Department</th>
                                    <th style={{ ...styles.headerCell, textAlign: 'left' }}>Capacity</th>
                                    <th style={{ ...styles.headerCell, textAlign: 'left' }}>Created On</th>
                                    <th style={{ ...styles.headerCell, textAlign: 'left' }}>Status</th>
                                    <th style={{ ...styles.headerCell, textAlign: 'left' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((item, index) => (
                                    <tr key={item.id} style={{
                                        borderBottom: index < filteredData.length - 1 ? '1px solid #f1f5f9' : 'none'
                                    }}>
                                        <td style={styles.cell}>{item?.name}</td>
                                        <td style={styles.cellSecondary}>{item?.type}</td>
                                        <td style={styles.cellSecondary}>{item?.department}</td>
                                        <td style={styles.cellSecondary}>{item?.capacity}</td>
                                        <td style={styles.cellSecondary}>{item?.createdAt}</td>
                                        <td style={styles.cell}>
                                            <StatusBadge status={item?.status} />
                                        </td>
                                        <td style={styles.cell}>
                                            <div style={styles.actionButtonContainer}>
                                                <button
                                                    onClick={() => handleEditItem(item)}
                                                    style={styles.actionButton}
                                                >
                                                    <img
                                                        src="assets/edit.png"
                                                        alt="Edit"
                                                        style={styles.actionIcon}
                                                        onError={(e) => {
                                                            e.target.innerHTML = '✏️';
                                                            e.target.style.fontSize = '14px';
                                                        }}
                                                    />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteRoom(item.id)}
                                                    style={styles.actionButton}
                                                >
                                                    <img
                                                        src="assets/delete.png"
                                                        alt="Delete"
                                                        style={styles.actionIcon}
                                                        onError={(e) => {
                                                            e.target.innerHTML = '🗑️';
                                                            e.target.style.fontSize = '14px';
                                                        }}
                                                    />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Empty State */}
                    {filteredData.length === 0 && (
                        <div style={styles.emptyState}>
                            No rooms found
                        </div>
                    )}
                </div>

                {/* Room Modal */}
                {isRoomModalOpen && (
                    <div style={styles.modalOverlay}>
                        <div style={styles.modal}>
                            <h3 style={styles.modalTitleRoom}>
                                {selectedItem ? 'Edit Room' : 'Add Room'}
                            </h3>

                            <div style={styles.modalForm}>
                                <div style={styles.modalField}>
                                    <label style={styles.modalLabel}>
                                        Room Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Room name here..."
                                        value={roomFormData.roomName}
                                        onChange={(e) => handleRoomInputChange('roomName', e.target.value)}
                                        style={styles.modalInput}
                                    />
                                </div>

                                <div style={styles.modalField}>
                                    <label style={styles.modalLabel}>
                                        Room Type
                                    </label>
                                    <div style={styles.modalIconContainer}>
                                        <select
                                            value={roomFormData.roomType}
                                            onChange={(e) => handleRoomInputChange('roomType', e.target.value)}
                                            style={styles.modalSelect}
                                        >
                                            <option value="">Select room type</option>
                                            <option value="Class Room">Class Room</option>
                                            <option value="Computer Lab">Computer Lab</option>
                                            <option value="Study Room">Study Room</option>
                                            <option value="Library">Library</option>
                                        </select>
                                        <img
                                            src="assets/arrow-down.png"
                                            alt="Dropdown"
                                            style={{ ...styles.modalIcon, width: '12px', height: '12px' }}
                                            onError={(e) => {
                                                e.target.innerHTML = '▼';
                                                e.target.style.fontSize = '10px';
                                                e.target.style.color = '#9CA3AF';
                                            }}
                                        />
                                    </div>
                                </div>

                                <div style={styles.modalField}>
                                    <label style={styles.modalLabel}>
                                        Department
                                    </label>
                                    <div style={styles.modalIconContainer}>
                                        <select
                                            value={roomFormData.department}
                                            onChange={(e) => handleRoomInputChange('department', e.target.value)}
                                            style={styles.modalSelect}
                                        >
                                            <option value="">Select a Department</option>
                                            {departmentsData?.map((dept, index) => (
                                                <option key={index} value={dept.name}>
                                                    {dept.name}
                                                </option>
                                            ))}
                                        </select>
                                        <img
                                            src="assets/arrow-down.png"
                                            alt="Dropdown"
                                            style={{ ...styles.modalIcon, width: '12px', height: '12px' }}
                                            onError={(e) => {
                                                e.target.innerHTML = '▼';
                                                e.target.style.fontSize = '10px';
                                                e.target.style.color = '#9CA3AF';
                                            }}
                                        />
                                    </div>
                                </div>

                                <div style={styles.modalField}>
                                    <label style={styles.modalLabel}>
                                        Student's Capacity
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="50"
                                        value={roomFormData.capacity}
                                        onChange={(e) => handleRoomInputChange('capacity', e.target.value)}
                                        style={styles.modalInput}
                                    />
                                </div>

                                <div style={styles.modalField}>
                                    <label style={styles.modalLabel}>
                                        Established Date
                                    </label>
                                    <div style={styles.modalIconContainer}>
                                        <input
                                            type="date"
                                            value={roomFormData.establishedDate}
                                            onChange={(e) => handleRoomInputChange('establishedDate', e.target.value)}
                                            style={styles.modalDateInput}
                                        />
                                        <img
                                            src="assets/calendar.png"
                                            alt="Calendar"
                                            style={styles.modalIcon}
                                            onError={(e) => {
                                                e.target.innerHTML = '📅';
                                                e.target.style.fontSize = '14px';
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div style={styles.modalActions}>
                                <button
                                    onClick={handleRoomModalClose}
                                    style={styles.modalCancelButton}
                                    onMouseOver={(e) => e.target.style.backgroundColor = '#f9fafb'}
                                    onMouseOut={(e) => e.target.style.backgroundColor = 'white'}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => selectedItem ? handleEditRoom() : handleRoomSave()}
                                    style={styles.modalSaveButton}
                                    onMouseOver={(e) => e.target.style.backgroundColor = '#7c3aed'}
                                    onMouseOut={(e) => e.target.style.backgroundColor = '#8b5cf6'}
                                >
                                    {selectedItem ? 'Edit' : 'Save'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                <ToastContainer />
            </div>
        );
    }

    if (activeTab === "Programs") {
        return (
            <div style={styles.container}>
                {/* Header */}
                <div style={styles.header}>
                    <h1 style={styles.headerTitle}>
                        Departments, Programs & Rooms
                    </h1>
                    <div style={styles.headerUserSection}>
                        <div style={styles.headerAvatar}>
                            <img
                                src="assets/Avatar3.png"
                                alt="User Avatar"
                                style={styles.headerAvatarImg}
                                onError={(e) => {
                                    e.target.style.backgroundColor = '#a0aec0';
                                    e.target.alt = 'ZA';
                                }}
                            />
                        </div>
                        <div>
                            <div style={styles.headerUserName}>
                                {userData?.full_name}
                            </div>
                            <div style={styles.headerUserId}>
                                {userData?.user_id}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Tabs and Search */}
                <div style={styles.navContainer}>
                    <div style={styles.navTabs}>
                        <button
                            onClick={() => setActiveTab("Departments")}
                            style={{
                                ...styles.tabButton,
                                ...styles.tabButtonInactive
                            }}
                        >
                            Departments
                        </button>
                        <button
                            onClick={() => setActiveTab("Rooms")}
                            style={{
                                ...styles.tabButton,
                                ...styles.tabButtonInactive
                            }}
                        >
                            Rooms
                        </button>
                        <button
                            onClick={() => setActiveTab("Programs")}
                            style={{
                                ...styles.tabButton,
                                ...styles.tabButtonActive
                            }}
                        >
                            Programs
                        </button>
                    </div>

                    <div style={styles.searchContainer}>
                        <img
                            src="assets/search-lg.png"
                            alt="Search"
                            style={styles.searchIcon}
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.parentElement.style.paddingLeft = '16px';
                            }}
                        />
                        <input
                            type="text"
                            placeholder="Search program & courses"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            style={styles.searchInput}
                        />
                    </div>
                </div>

                {/* Header with Department Selector and Add Button */}
                <div style={styles.contentHeader}>
                    <h2 style={styles.contentTitle}>
                        Program & Courses
                    </h2>
                    <div style={styles.contentActions}>
                        <div style={styles.dropdown}>
                            <select
                                value={selectedDepartment}
                                onChange={(e) => setSelectedDepartment(e.target.value)}
                                style={styles.select}
                            >
                                <option value="">All Department</option>
                                {departmentsData?.map((dept, index) => (
                                    <option key={index} value={dept?.name}>
                                        {dept?.name}
                                    </option>
                                ))}
                            </select>
                            <img
                                src="assets/arrow-down.png"
                                alt="Dropdown"
                                style={styles.dropdownIcon}
                                onError={(e) => {
                                    e.target.innerHTML = '▼';
                                    e.target.style.fontSize = '10px';
                                    e.target.style.color = '#9CA3AF';
                                }}
                            />
                        </div>
                        <button style={styles.sortButton}>
                            <img
                                src="/assets/filter-lines.png"
                                alt="Sort"
                                style={styles.sortButtonImg}
                            />
                            Sort
                        </button>
                        <button
                            onClick={() => navigate('/add-program')}
                            style={styles.addButton}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#2d3748'}
                            onMouseOut={(e) => e.target.style.backgroundColor = '#1a202c'}
                        >
                            <img
                                src="assets/plus.png"
                                alt="Add"
                                style={styles.addButtonIcon}
                                onError={(e) => {
                                    e.target.innerHTML = '+';
                                    e.target.style.display = 'flex';
                                    e.target.style.alignItems = 'center';
                                    e.target.style.justifyContent = 'center';
                                    e.target.style.fontSize = '16px';
                                    e.target.style.fontWeight = 'bold';
                                }}
                            />
                            <span>Add Program</span>
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div style={styles.statsContainer}>
                    {/* Total Programs Card */}
                    <div style={styles.statsCardProgramsPrimary}>
                        <div style={styles.statsCardHeaderPrograms}>
                            <img
                                src="assets/totalprogram.png"
                                alt="Total Program"
                                style={styles.statsCardIconPrograms}
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                            <span style={styles.statsCardTextPrograms}>
                                Total Program
                            </span>
                        </div>
                        <div style={styles.statsCardNumberPrograms}>
                            {totalPrograms}
                        </div>
                    </div>
                </div>

                {/* Programs Grid */}
                <div style={styles.programsContainer}>
                    <div style={styles.programsGrid}>
                        {filteredData.map((program) => (
                            <div key={program?.program_id} style={styles.programCard}>
                                {/* Action Button */}
                                <button
                                    onClick={() => navigate('/add-program', { state: program })}
                                    style={styles.actionProgramButton}
                                >
                                    <img
                                        src="/assets/edit.png"
                                        alt="Edit"
                                        style={styles.actionIcon}
                                    />
                                </button>

                                {/* Program Title */}
                                <h3 style={styles.programTitle}>
                                    {program?.name}
                                </h3>

                                {/* Program Code */}
                                <p style={styles.programCode}>
                                    {program?.code}
                                </p>

                                {/* Total Courses Label */}
                                <p style={styles.programCoursesLabel}>
                                    Total Courses
                                </p>

                                {/* Course Number - Large Number */}
                                <div style={styles.programCoursesNumber}>
                                    {program?.courses_no}
                                </div>

                                {/* Department Info */}
                                <div style={styles.programInfoRow}>
                                    <img
                                        src="/assets/depart.png"
                                        alt="Department"
                                        style={styles.programInfoIcon}
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            const fallback = document.createElement('div');
                                            fallback.style.width = '16px';
                                            fallback.style.height = '16px';
                                            fallback.style.borderRadius = '2px';
                                            e.target.parentNode.insertBefore(fallback, e.target);
                                        }}
                                    />
                                    <span style={styles.programInfoText}>
                                        {program?.department}
                                    </span>
                                </div>

                                {/* Semesters Info */}
                                <div style={styles.programInfoRow}>
                                    <img
                                        src="/assets/smes.png"
                                        alt="Semesters"
                                        style={styles.programInfoIcon}
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            const fallback = document.createElement('div');
                                            fallback.style.width = '16px';
                                            fallback.style.height = '16px';
                                            fallback.style.borderRadius = '2px';
                                            e.target.parentNode.insertBefore(fallback, e.target);
                                        }}
                                    />
                                    <span style={styles.programInfoText}>
                                        {program?.semesters?.length} Semesters
                                    </span>
                                </div>

                                {/* Arrow Button */}
                                <div style={styles.programArrowContainer}>
                                    <button
                                        style={styles.programArrowButton}
                                        onClick={() => navigate('/course-management', { state: program })}
                                    >
                                        <img
                                            src="/assets/probtn.png"
                                            alt="Arrow Right"
                                            style={styles.programArrowIcon}
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                e.target.parentNode.innerHTML = '→';
                                                e.target.parentNode.style.fontSize = '18px';
                                                e.target.parentNode.style.fontWeight = 'bold';
                                            }}
                                        />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredData.length === 0 && (
                        <div style={styles.emptyState}>
                            No programs found
                        </div>
                    )}
                </div>
                <ToastContainer />
            </div>
        );
    }

    return (
        <div style={styles.container}>
            {/* Header */}
            <div style={styles.header}>
                <h1 style={styles.headerTitle}>
                    Departments, Programs & Rooms
                </h1>
                <div style={styles.headerUserSection}>
                    <div style={styles.headerAvatar}>
                        <img
                            src="assets/Avatar3.png"
                            alt="User Avatar"
                            style={styles.headerAvatarImg}
                            onError={(e) => {
                                e.target.style.backgroundColor = '#a0aec0';
                                e.target.alt = 'ZA';
                            }}
                        />
                    </div>
                    <div>
                        <div style={styles.headerUserName}>
                            {userData?.full_name}
                        </div>
                        <div style={styles.headerUserId}>
                            {userData?.user_id}
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs and Search */}
            <div style={styles.navContainer}>
                <div style={styles.navTabs}>
                    <button
                        onClick={() => setActiveTab("Departments")}
                        style={{
                            ...styles.tabButton,
                            ...styles.tabButtonActive
                        }}
                    >
                        Departments
                    </button>
                    <button
                        onClick={() => setActiveTab("Rooms")}
                        style={{
                            ...styles.tabButton,
                            ...styles.tabButtonInactive
                        }}
                    >
                        Rooms
                    </button>
                    <button
                        onClick={() => setActiveTab("Programs")}
                        style={{
                            ...styles.tabButton,
                            ...styles.tabButtonInactive
                        }}
                    >
                        Programs
                    </button>
                </div>

                <div style={styles.searchContainer}>
                    <img
                        src="assets/search-lg.png"
                        alt="Search"
                        style={styles.searchIcon}
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.style.paddingLeft = '16px';
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Search departments"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        style={styles.searchInput}
                    />
                </div>
            </div>

            {/* Header with Add Button */}
            <div style={styles.contentHeader}>
                <h2 style={styles.contentTitle}>
                    Departments
                </h2>
                <div style={styles.contentActions}>
                    <button
                        onClick={handleAddNew}
                        style={styles.addButton}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#2d3748'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#1a202c'}
                    >
                        <img
                            src="assets/plus.png"
                            alt="Add"
                            style={styles.addButtonIcon}
                            onError={(e) => {
                                e.target.innerHTML = '+';
                                e.target.style.display = 'flex';
                                e.target.style.alignItems = 'center';
                                e.target.style.justifyContent = 'center';
                                e.target.style.fontSize = '16px';
                                e.target.style.fontWeight = 'bold';
                            }}
                        />
                        <span>Add Department</span>
                    </button>
                </div>
            </div>

            {/* Stats Section */}
            <div style={styles.statsContainer}>
                {/* Total Departments Card */}
                <div style={styles.statsCardPrimary}>
                    <div style={styles.statsCardHeader}>
                        <img
                            src="assets/building.png"
                            alt="Building"
                            style={styles.statsCardIcon}
                            onError={(e) => {
                                e.target.style.display = 'none';
                            }}
                        />
                        <span style={styles.statsCardText}>
                            Total Department
                        </span>
                    </div>
                    <div style={styles.statsCardNumber}>
                        {totalDepartments}
                    </div>
                </div>

                {/* Total Programs Card */}
                <div style={styles.statsCardPrimary}>
                    <div style={styles.statsCardHeader}>
                        <img
                            src="assets/building.png"
                            alt="Building"
                            style={styles.statsCardIcon}
                            onError={(e) => {
                                e.target.style.display = 'none';
                            }}
                        />
                        <span style={styles.statsCardText}>
                            Total Programs
                        </span>
                    </div>
                    <div style={styles.statsCardNumber}>
                        {totalPrograms}
                    </div>
                </div>

                {/* Total Courses Card */}
                <div style={styles.statsCardPrimary}>
                    <div style={styles.statsCardHeader}>
                        <img
                            src="assets/building.png"
                            alt="Building"
                            style={styles.statsCardIcon}
                            onError={(e) => {
                                e.target.style.display = 'none';
                            }}
                        />
                        <span style={styles.statsCardText}>
                            Total Courses
                        </span>
                    </div>
                    <div style={styles.statsCardNumber}>
                        {totalCourses}
                    </div>
                </div>
            </div>

            {/* Main Content Card */}
            <div style={styles.tableContainer}>
                {/* Content Header */}
                <div style={styles.tableHeader}>
                    <button
                        onClick={handleViewAll}
                        style={styles.viewAllButton}
                    >
                        View all
                    </button>
                </div>

                {/* Table */}
                <div style={styles.tableWrapper}>
                    <table style={styles.table}>
                        <thead>
                            <tr style={styles.tableHeaderRow}>
                                <th style={styles.headerCell}>Department</th>
                                <th style={styles.headerCell}>Code</th>
                                <th style={styles.headerCell}>Rooms</th>
                                <th style={styles.headerCell}>Created On</th>
                                <th style={styles.headerCell}>Status</th>
                                <th style={styles.headerCell}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((item, index) => (
                                <tr key={item.id} style={{
                                    borderBottom: index < filteredData.length - 1 ? '1px solid #f1f5f9' : 'none'
                                }}>
                                    <td style={styles.cell}>{item?.name}</td>
                                    <td style={styles.cellSecondary}>{item?.code}</td>
                                    <td style={styles.cellSecondary}>{item?.rooms === 0 ? '--' : item?.rooms}</td>
                                    <td style={styles.cellSecondary}>{item?.createdAt}</td>
                                    <td style={styles.cell}>
                                        <StatusBadge status={item?.status} />
                                    </td>
                                    <td style={styles.cell}>
                                        <div style={styles.actionButtonContainer}>
                                            <button
                                                onClick={() => handleEditItem(item)}
                                                style={styles.actionButton}
                                            >
                                                <img
                                                    src="assets/edit.png"
                                                    alt="Edit"
                                                    style={styles.actionIcon}
                                                    onError={(e) => {
                                                        e.target.innerHTML = '✏️';
                                                        e.target.style.fontSize = '14px';
                                                    }}
                                                />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteDept(item?.id)}
                                                style={styles.actionButton}
                                            >
                                                <img
                                                    src="assets/delete.png"
                                                    alt="Delete"
                                                    style={styles.actionIcon}
                                                    onError={(e) => {
                                                        e.target.innerHTML = '🗑️';
                                                        e.target.style.fontSize = '14px';
                                                    }}
                                                />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Empty State */}
                {filteredData.length === 0 && (
                    <div style={styles.emptyState}>
                        No departments found
                    </div>
                )}
            </div>

            {/* Department Modal */}
            {isDepartmentModalOpen && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modal}>
                        <h3 style={styles.modalTitle}>
                            {selectedItem ? 'Edit Department' : 'Add Department'}
                        </h3>

                        <div style={styles.modalForm}>
                            <div style={styles.modalField}>
                                <label style={styles.modalLabel}>
                                    Department Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Department name here..."
                                    value={departmentFormData.departmentName}
                                    onChange={(e) => handleDepartmentInputChange('departmentName', e.target.value)}
                                    style={styles.modalInput}
                                />
                            </div>

                            <div style={styles.modalField}>
                                <label style={styles.modalLabel}>
                                    Department Code
                                </label>
                                <input
                                    type="text"
                                    placeholder="Department code here..."
                                    value={departmentFormData.departmentCode}
                                    onChange={(e) => handleDepartmentInputChange('departmentCode', e.target.value)}
                                    style={styles.modalInput}
                                />
                            </div>

                            <div style={styles.modalField}>
                                <label style={styles.modalLabel}>
                                    Status
                                </label>
                                <div style={styles.modalIconContainer}>
                                    <select
                                        value={departmentFormData.status}
                                        onChange={(e) => handleDepartmentInputChange('status', e.target.value)}
                                        style={styles.modalSelect}
                                    >
                                        <option value="Active">Active</option>
                                        <option value="In-active">In-active</option>
                                    </select>
                                    <img
                                        src="assets/arrow-down.png"
                                        alt="Dropdown"
                                        style={{ ...styles.modalIcon, width: '12px', height: '12px' }}
                                        onError={(e) => {
                                            e.target.innerHTML = '▼';
                                            e.target.style.fontSize = '10px';
                                            e.target.style.color = '#9CA3AF';
                                        }}
                                    />
                                </div>
                            </div>

                            <div style={styles.modalField}>
                                <label style={styles.modalLabel}>
                                    Established Date
                                </label>
                                <div style={styles.modalIconContainer}>
                                    <input
                                        type="date"
                                        value={departmentFormData.establishedDate}
                                        onChange={(e) => handleDepartmentInputChange('establishedDate', e.target.value)}
                                        style={styles.modalDateInput}
                                    />
                                    <img
                                        src="assets/calendar.png"
                                        alt="Calendar"
                                        style={styles.modalIcon}
                                        onError={(e) => {
                                            e.target.innerHTML = '📅';
                                            e.target.style.fontSize = '14px';
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div style={styles.modalActions}>
                            <button
                                onClick={handleDepartmentModalClose}
                                style={styles.modalCancelButton}
                                onMouseOver={(e) => e.target.style.backgroundColor = '#f9fafb'}
                                onMouseOut={(e) => e.target.style.backgroundColor = 'white'}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => selectedItem ? handleEditDept() : handleDepartmentSave()}
                                style={styles.modalSaveButton}
                                onMouseOver={(e) => e.target.style.backgroundColor = '#7c3aed'}
                                onMouseOut={(e) => e.target.style.backgroundColor = '#8b5cf6'}
                            >
                                {selectedItem ? 'Edit' : 'Save'}
                            </button>
                        </div>
                    </div>

                </div>
            )}
            <ToastContainer />
        </div>
    );
}

const styles = {
    // Container Styles
    container: {
        minHeight: '100vh',
        backgroundColor: '#f8fafc',
        padding: '15px',
        position: 'relative'
    },

    // Header Styles
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '32px'
    },
    headerTitle: {
        fontSize: '24px',
        fontWeight: '600',
        color: '#111827',
        margin: 0
    },
    headerUserSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    headerAvatar: {
        width: '54px',
        height: '54px',
        borderRadius: '50%',
        overflow: 'hidden'
    },
    headerAvatarImg: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        backgroundColor: '#a0aec0'
    },
    headerUserName: {
        fontSize: '14px',
        fontWeight: '500',
        color: '#1F2937'
    },
    headerUserId: {
        fontSize: '12px',
        color: '#9CA3AF',
        fontWeight: '400'
    },

    // Navigation Styles
    navContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '24px',
        gap: '16px'
    },
    navTabs: {
        display: 'flex',
        gap: '8px'
    },
    tabButton: {
        padding: '8px 24px',
        fontSize: '16px',
        fontWeight: '500',
        borderRadius: '20px',
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.2s'
    },
    tabButtonActive: {
        backgroundColor: '#8b5cf6',
        color: '#ffffff'
    },
    tabButtonInactive: {
        backgroundColor: '#f1f5f9',
        color: '#475467'
    },

    // Search Styles
    searchContainer: {
        position: 'relative',
        width: '300px'
    },
    searchIcon: {
        position: 'absolute',
        left: '12px',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '20px',
        height: '20px',
        opacity: 0.5
    },
    searchInput: {
        width: '100%',
        paddingLeft: '40px',
        paddingRight: '16px',
        paddingTop: '10px',
        paddingBottom: '10px',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        fontSize: '14px',
        outline: 'none',
        fontWeight: '400'
    },

    // Content Header Styles
    contentHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px'
    },
    contentTitle: {
        fontSize: '24px',
        fontWeight: '500',
        color: '#111827',
        margin: 0
    },
    contentActions: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
    },

    // Dropdown Styles
    dropdown: {
        position: 'relative'
    },
    select: {
        padding: '8px 32px 8px 16px',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '500',
        backgroundColor: 'white',
        cursor: 'pointer',
        outline: 'none',
        appearance: 'none',
        color: '#111827'
    },
    dropdownIcon: {
        position: 'absolute',
        right: '12px',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '12px',
        height: '12px',
        pointerEvents: 'none'
    },

    // Button Styles
    addButton: {
        backgroundColor: '#1a202c',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '8px',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '14px',
        fontWeight: '600',
        transition: 'all 0.2s'
    },
    addButtonIcon: {
        width: '16px',
        height: '16px',
        filter: 'brightness(0) invert(1)'
    },

    // Stats Cards Styles
    statsContainer: {
        display: 'flex',
        gap: '24px',
        marginBottom: '24px'
    },
    statsCardPrimary: {
        background: '#9747FF',
        borderRadius: '12px',
        padding: '20px',
        color: 'white',
        minWidth: '160px',
        position: 'relative'
    },
    statsCardSecondary: {
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '20px',
        minWidth: '160px',
        border: '1px solid #e2e8f0'
    },
    statsCardRoomsPrimary: {
        background: '#8b5cf6',
        borderRadius: '12px',
        padding: '20px',
        color: 'white',
        minWidth: '180px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    statsCardRoomsAvailable: {
        backgroundColor: '#ECFDF3',
        borderRadius: '12px',
        padding: '20px',
        minWidth: '180px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    statsCardRoomsOccupied: {
        backgroundColor: '#FFFAEB',
        borderRadius: '12px',
        padding: '20px',
        minWidth: '180px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    statsCardHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '8px'
    },
    statsCardHeaderRooms: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '12px'
    },
    statsCardIcon: {
        width: '24px',
        height: '24px',
        filter: 'brightness(0) invert(1)'
    },
    statsCardIconRooms: {
        width: '18px',
        height: '18px',
        filter: 'brightness(0) invert(1)'
    },
    statsCardIconAvailable: {
        width: '18px',
        height: '18px'
    },
    statsCardIconOccupied: {
        width: '18px',
        height: '18px'
    },
    statsCardText: {
        fontSize: '14px',
        fontWeight: '500'
    },
    statsCardTextSecondary: {
        fontSize: '14px',
        fontWeight: '500',
        color: '#475467'
    },
    statsCardTextAvailable: {
        fontSize: '14px',
        fontWeight: '500',
        color: '#22c55e'
    },
    statsCardTextOccupied: {
        fontSize: '14px',
        fontWeight: '500',
        color: '#f59e0b'
    },
    statsCardNumber: {
        fontSize: '64px',
        fontWeight: '500',
        display: 'flex',
        justifyContent: 'center'
    },
    statsCardNumberSecondary: {
        fontSize: '64px',
        fontWeight: '500',
        color: '#475467',
        display: 'flex',
        justifyContent: 'center'
    },
    statsCardNumberRooms: {
        fontSize: '48px',
        fontWeight: '600'
    },
    statsCardNumberAvailable: {
        fontSize: '48px',
        fontWeight: '600',
        color: '#22c55e'
    },
    statsCardNumberOccupied: {
        fontSize: '48px',
        fontWeight: '600',
        color: '#f59e0b'
    },

    // Table Styles
    tableContainer: {
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        overflow: 'hidden'
    },
    tableHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 24px',
        borderBottom: '1px solid #e2e8f0',
        justifyContent: 'flex-end'
    },
    tableHeaderRooms: {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: '16px 24px',
        borderBottom: '1px solid #e2e8f0'
    },
    viewAllButton: {
        color: '#9747FF',
        fontSize: '14px',
        fontWeight: '500',
        border: 'none',
        background: 'none',
        cursor: 'pointer'
    },
    viewAllButtonRooms: {
        color: '#8b5cf6',
        fontSize: '14px',
        fontWeight: '500',
        border: 'none',
        background: 'none',
        cursor: 'pointer'
    },
    tableWrapper: {
        overflowX: 'auto'
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        backgroundColor: 'white'
    },
    tableHeaderRow: {
        backgroundColor: '#f8fafc'
    },
    tableRow: {
        borderBottom: '1px solid #f1f5f9'
    },
    emptyState: {
        textAlign: 'center',
        padding: '48px',
        color: '#718096',
        fontSize: '14px'
    },

    // Table Cell Styles
    headerCell: {
        padding: '12px 24px',
        textAlign: 'left',
        fontSize: '16px',
        fontWeight: '500',
        color: '#111827',
        letterSpacing: '0.025em'
    },
    cell: {
        padding: '16px 24px',
        fontSize: '12px',
        color: '#101828',
        verticalAlign: 'middle',
        fontWeight: '500'
    },
    cellSecondary: {
        fontSize: '12px',
        fontWeight: '500',
        color: '#4B5563',
        padding: '12px 24px'
    },

    // Status Badge Styles
    statusBadge: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '14px',
        fontWeight: '500'
    },
    statusIcon: {
        width: '8px',
        height: '8px'
    },
    statusText: {
        color: '#1C222E'
    },

    // Action Button Styles
    actionButton: {
        backgroundColor: 'transparent',
        border: '1px solid #EAECF0',
        borderRadius: '100px',
        padding: '8px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s',
        width: '32px',
        height: '32px'
    },
    actionProgramButton: {
        backgroundColor: 'transparent',
        border: '1px solid #EAECF0',
        borderRadius: '100px',
        padding: '8px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s',
        width: '32px',
        height: '32px',
        position: 'absolute',
        top: 20,
        right: 20,
    },
    actionButtonContainer: {
        display: 'flex',
        gap: '8px'
    },
    actionIcon: {
        width: '16px',
        height: '16px'
    },

    // Modal Styles
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
    },
    modal: {
        backgroundColor: 'white',
        borderRadius: '22px',
        padding: '24px',
        width: '480px',
        maxWidth: '90vw',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
    },
    modalTitle: {
        fontSize: '18px',
        fontWeight: '600',
        color: '#111827',
        margin: '0 0 24px 0'
    },
    modalTitleRoom: {
        fontSize: '18px',
        fontWeight: '500',
        color: '#111827',
        margin: '0 0 24px 0'
    },
    modalForm: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    },
    modalField: {
        // Container for each form field
    },
    modalLabel: {
        display: 'block',
        fontSize: '14px',
        fontWeight: '500',
        color: '#000',
        marginBottom: '8px'
    },
    modalInput: {
        width: '100%',
        padding: '12px 16px',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        fontSize: '14px',
        outline: 'none',
        boxSizing: 'border-box'
    },
    modalSelect: {
        width: '100%',
        padding: '12px 40px 12px 16px',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        fontSize: '14px',
        outline: 'none',
        appearance: 'none',
        backgroundColor: 'white',
        cursor: 'pointer',
        boxSizing: 'border-box'
    },
    modalDateInput: {
        width: '100%',
        padding: '12px 40px 12px 16px',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        fontSize: '14px',
        outline: 'none',
        boxSizing: 'border-box'
    },
    modalActions: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '12px',
        marginTop: '32px'
    },
    modalCancelButton: {
        padding: '10px 20px',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        backgroundColor: 'white',
        color: '#374151',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.2s'
    },
    modalSaveButton: {
        padding: '10px 20px',
        border: 'none',
        borderRadius: '8px',
        backgroundColor: '#8b5cf6',
        color: 'white',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.2s'
    },
    modalIconContainer: {
        position: 'relative'
    },
    modalIcon: {
        position: 'absolute',
        right: '12px',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '16px',
        height: '16px',
        pointerEvents: 'none'
    },

    // Stats Card Styles for Programs
    statsCardProgramsPrimary: {
        background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
        borderRadius: '12px',
        padding: '15px',
        color: 'white',
        width: '200px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    statsCardHeaderPrograms: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '12px'
    },
    statsCardIconPrograms: {
        width: '18px',
        height: '18px',
        filter: 'brightness(0) invert(1)'
    },
    statsCardTextPrograms: {
        fontSize: '14px',
        fontWeight: '500'
    },
    statsCardNumberPrograms: {
        fontSize: '48px',
        fontWeight: '600'
    },

    // Programs Container and Grid
    programsContainer: {
        marginBottom: '24px'
    },
    programsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
        marginBottom: '24px'
    },

    // Program Card Styles
    programCard: {
        borderRadius: '12px',
        padding: '24px',
        border: '1px solid #E5E7EB',
        position: 'relative',
        minHeight: '280px',
        backgroundColor: 'white'
    },
    programTitle: {
        fontSize: '18px',
        fontWeight: '600',
        color: '#111827',
        marginBottom: '8px',
        marginTop: '0',
        lineHeight: '1.4'
    },
    programCode: {
        fontSize: '12px',
        color: '#667085',
        marginBottom: '24px',
        margin: '0 0 24px 0',
        fontWeight: '400'
    },
    programCoursesLabel: {
        fontSize: '16px',
        color: '#374151',
        marginBottom: '8px',
        margin: '0 0 8px 0',
        fontWeight: '500'
    },
    programCoursesNumber: {
        fontSize: '36px',
        fontWeight: '600',
        color: '#667085',
        marginBottom: '24px',
        lineHeight: '1'
    },
    programInfoRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '12px'
    },
    programInfoIcon: {
        width: '14px',
        height: '14px'
    },
    programInfoText: {
        fontSize: '12px',
        color: '#1D2939',
        fontWeight: '400'
    },
    programArrowContainer: {
        position: 'absolute',
        bottom: '24px',
        right: '24px'
    },
    programArrowButton: {
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        padding: '0',
        width: '24px',
        height: '24px'
    },
    programArrowIcon: {
        width: '24px',
        height: '24px'
    },

    // Sort Button Style
    sortButton: {
        padding: '10px 10px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: 'white',
        cursor: 'pointer',
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontWeight: '600',
        color: '#374151'
    },
    sortButtonImg: {
        width: '16px',
        height: '16px'
    }
};

export default DepartmentRoomsDashboard;