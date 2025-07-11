import React, { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut as firebaseSignOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, getDocs, collection, updateDoc, arrayUnion, setDoc, deleteDoc, addDoc, where, query, orderBy } from 'firebase/firestore';
import { auth, db } from './firebaseConfig';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [adminData, setAdminData] = useState([]);
    const [deptsData, setDeptsData] = useState([]);
    const [sections, setSections] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
            try {
                if (authUser) {
                    setUser(authUser);
                    const userDoc = await getDoc(doc(db, 'users', authUser.uid));
                    setUserData(userDoc.exists() ? userDoc.data() : null);

                    await refreshAdminData();
                    await refreshDeptsData();
                    await refreshTeacherSection(userDoc.data()?.teacher_id);
                } else {
                    setUser(null);
                    setUserData(null);
                }
            } catch (error) {
                console.error('Error in onAuthStateChanged:', error);
            } finally {
                setIsLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);


    const registerUser = async (data) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
            const user = userCredential.user;

            await setDoc(doc(db, 'users', user.uid), data);

            {/*  toast.success("Registration Successful! You can now explore and enjoy all the features.");*/ }
            console.log('User registered and data saved in Firestore:', user);

            return { success: true, uid: user.uid };

        } catch (error) {
            console.log('Error creating user or saving data:', error);
            let errorMessage = "";

            switch (error.code) {
                case 'auth/email-already-in-use':
                    errorMessage = 'The email address is already in use by another account.';
                    break;
                case 'auth/invalid-email':
                    errorMessage = 'The email address is badly formatted.';
                    break;
                case 'auth/weak-password':
                    errorMessage = 'The password is too weak. It must be at least 6 characters long.';
                    break;
                case 'auth/operation-not-allowed':
                    errorMessage = 'Email/password accounts are not enabled.';
                    break;
                case 'auth/user-disabled':
                    errorMessage = 'The user account has been disabled by an administrator.';
                    break;
                default:
                    errorMessage = 'An unknown error occurred. Please try again.';
            }

            return { success: false, error: errorMessage };
        }
    };

    const login = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const userDoc = await getDoc(doc(db, 'users', user.uid));
            if (userDoc.exists()) {
                const data = userDoc.data();
                setUserData(data);

                toast.success("Login Successful! Welcome back.");
                navigate('/TDashboard');

                return { success: true };
            } else {
                console.warn('No user data found.');
                setUserData(null);
                return { success: false, error: "No user data found." };
            }
        } catch (error) {
            console.log('Error logging in:', error);

            let errorMessage = "Something went wrong, please try again later.";

            if (error.code === "auth/invalid-credential") {
                errorMessage = "Invalid email or password";
            } else if (error.code === "auth/user-not-found") {
                errorMessage = "No user found with this email";
            } else if (error.code === "auth/wrong-password") {
                errorMessage = "Incorrect password";
            } else if (error.code === "auth/too-many-requests") {
                errorMessage = "Too many failed login attempts, Try again later.";
            } else if (error.code === "auth/network-request-failed") {
                errorMessage = "Network error, Please check your internet connection.";
            } else if (error.code === "auth/user-disabled") {
                errorMessage = "This account has been disabled";
            } else if (error.code === "auth/invalid-email") {
                errorMessage = "Please enter a valid email address";
            }

            toast.error(`Authentication Failed! ${errorMessage}`);

            return { success: false, error: errorMessage };
        }
    };

    const fetchDocById = async (collection, id) => {
        try {
            const docRef = doc(db, collection, id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log('user data refresh successfully!');
                return { success: true, data: docSnap.data() };
            } else {
                return { success: false, error: 'Doc not found' };
            }
        } catch (error) {
            console.error('Error getting Doc data:', error);
            return { success: false, error: error.message };
        }
    };

    const fetchCollection = async (collectionName) => {
        try {
            const collectionRef = collection(db, collectionName);
            const querySnapshot = await getDocs(collectionRef);

            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({ id: doc.id, ...doc.data() });
            });

            console.log(`${collectionName} documents fetched successfully!`);
            return { success: true, data: docs };
        } catch (error) {
            console.error('Error fetching documents by collection:', error);
            return { success: false, error: error.message };
        }
    };

    const signOut = async (navigation) => {
        try {
            await firebaseSignOut(auth);
            setUser(null);
            setUserData(null);
            navigate('/');

        } catch (error) {
            console.error('Error signing out:', error);

            toast.error("Sign Out Failed! An error occurred while signing out. Please try again.");
        }
    };

    const refreshUserData = async () => {
        try {
            const userDocRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userDocRef);
            setUserData(userDoc.data());

            if (userDoc.exists()) {
                console.log('user data refresh successfully!');
                return { success: true, data: userDoc.data() };
            } else {
                return { success: false, error: 'User not found' };
            }
        } catch (error) {
            console.error('Error refresh user data:', error);
            return { success: false, error: error.message };
        }
    };

    const refreshDeptsData = async () => {
        try {
            const collectionRef = collection(db, 'departments');
            const querySnapshot = await getDocs(collectionRef);

            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({ id: doc.id, ...doc.data() });
            });

            setDeptsData(docs);

            console.log(`Departments data refresh successfully!`);
            return { success: true, data: docs };
        } catch (error) {
            console.error('Error resfreshing departments data:', error);
            return { success: false, error: error.message };
        }
    };

    const refreshTeacherSection = async (teacherId) => {
        try {
            const sectionsRef = collection(db, 'sections');
            const snapshot = await getDocs(sectionsRef);

            const teacherSections = snapshot.docs
                .filter((doc) => {
                    const teachers = doc.data().teachers || [];
                    return teachers.some((t) => t && t.teacher_id === teacherId);
                })
                .map((doc) => ({ id: doc.id, ...doc.data() }));

            setSections(teacherSections);
            return { success: true, data: teacherSections };
        } catch (error) {
            console.error(error);
            return { success: false, message: error.message };
        }
    };

    const refreshAdminData = async () => {
        try {
            const userDocRef = doc(db, 'data', 'data');
            const userDoc = await getDoc(userDocRef);
            setAdminData(userDoc.data());

            if (userDoc.exists()) {
                console.log('Admin data refresh successfully!');
                return { success: true, data: userDoc.data() };
            } else {
                return { success: false, error: 'Doc not found' };
            }
        } catch (error) {
            console.error('Error refresh admin data:', error);
            return { success: false, error: error.message };
        }
    };

    const updateDocById = async (collectionName, docId, updatedFields) => {
        try {
            const docRef = doc(db, collectionName, docId);
            await updateDoc(docRef, updatedFields);
            console.log(`Document in collection ${collectionName} with ID ${docId} successfully updated.`);
            return { success: true };
        } catch (error) {
            console.error(`Error updating document in collection ${collectionName} with ID ${docId}:`, error);
            return { success: false, error: error.message };
        }
    };

    const deleteDocById = async (collection, doc_id) => {
        try {
            const docRef = doc(db, collection, doc_id);
            const docSnapshot = await getDoc(docRef);

            if (!docSnapshot.exists()) {
                console.log(`Document with ID ${doc_id} does not exist.`);
                return { success: true, message: 'Document not found. No deletion needed.' };
            }

            await deleteDoc(docRef);
            console.log(`Document with ID ${doc_id} has been deleted successfully.`);
            return { success: true };
        } catch (error) {
            console.error(`Error deleting document with ID ${doc_id}:`, error.message);
            return { success: false, error: error.message };
        }
    };

    const fetchAllUsers = async () => {
        try {
            const usersRef = collection(db, "users");
            const querySnapshot = await getDocs(usersRef);

            const users = [];

            querySnapshot.forEach((doc) => {
                users.push({ id: doc.id, ...doc.data() });
            });

            return { users, status: true };
        } catch (error) {
            console.error("Error fetching users:", error);
            return { users: [], status: false };
        }
    };

    const fetchUsersByRole = async (role) => {
        try {
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("role", "==", role));
            const querySnapshot = await getDocs(q);

            const users = querySnapshot.docs.map(doc => ({
                doc_id: doc.id,
                ...doc.data()
            }));

            console.log(`${role} fetch successfully`);
            return { success: true, data: users };
        } catch (error) {
            console.error("Error fetching users by role:", error);
            return { success: true, data: [] };
        }
    };

    const updateArrayItemById = async (
        collectionId,
        docId,
        arrayFieldName,
        itemId,
        newItem
    ) => {
        try {
            const docRef = doc(db, collectionId, docId);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                return { status: false, message: "Document not found." };
            }

            const data = docSnap.data();
            const array = data[arrayFieldName];

            if (!Array.isArray(array)) {
                return { status: false, message: `'${arrayFieldName}' is not an array.` };
            }

            const index = array.findIndex(item => item.id === itemId);

            if (index === -1) {
                return { status: false, message: "Item with given ID not found in array." };
            }

            array[index] = newItem;

            await updateDoc(docRef, {
                [arrayFieldName]: array
            });

            return { success: true };
        } catch (error) {
            console.error("Error updating array item by ID:", error);
            return { success: false, message: error.message };
        }
    };

    const deleteArrayItemById = async (
        collectionId,
        docId,
        arrayFieldName,
        itemId
    ) => {
        try {
            const docRef = doc(db, collectionId, docId);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                return { success: false, message: "Document not found." };
            }

            const data = docSnap.data();
            const array = data[arrayFieldName];

            if (!Array.isArray(array)) {
                return { success: false, message: `'${arrayFieldName}' is not an array.` };
            }

            const updatedArray = array.filter(item => item.id !== itemId);

            await updateDoc(docRef, {
                [arrayFieldName]: updatedArray
            });

            return { success: true };
        } catch (error) {
            console.error("Error deleting array item by ID:", error);
            return { success: false, message: error.message };
        }
    };
    
    const saveAttendance = async (sectionId, attendanceData) => {
        try {
            const { date, teacherId, courseName, students } = attendanceData;

            const attendanceRef = doc(db, 'sections', sectionId, 'attendance', date);

            const attendanceDoc = {
                date: date,
                teacherId: teacherId,
                sectionId: sectionId,
                courseName: courseName,
                createdAt: new Date(),
                updatedAt: new Date(),
                totalStudents: students.length,
                presentCount: students.filter(s => s.status === 'Present').length,
                absentCount: students.filter(s => s.status === 'Absent').length,
                students: students.map(student => ({
                    studentId: student.studentId,
                    name: student.name,
                    status: student.status,
                    markedAt: new Date()
                }))
            };

            await setDoc(attendanceRef, attendanceDoc);

            console.log('Attendance saved successfully for date:', date);
            return { success: true, message: 'Attendance saved successfully' };

        } catch (error) {
            console.error('Error saving attendance:', error);
            return { success: false, message: 'Failed to save attendance', error };
        }
    };

    const getAttendanceByDate = async (sectionId, date) => {
        try {
            const attendanceRef = doc(db, 'sections', sectionId, 'attendance', date);
            const attendanceSnap = await getDoc(attendanceRef);

            if (attendanceSnap.exists()) {
                return { success: true, data: attendanceSnap.data() };
            } else {
                return { success: false, message: 'No attendance found for this date' };
            }
        } catch (error) {
            console.error('Error getting attendance:', error);
            return { success: false, message: 'Failed to get attendance', error };
        }
    };

    const getAllAttendanceForSection = async (sectionId) => {
        try {
            const attendanceCollectionRef = collection(db, 'sections', sectionId, 'attendance');
            const attendanceQuery = query(attendanceCollectionRef, orderBy('date', 'desc'));
            const attendanceSnap = await getDocs(attendanceQuery);

            const attendanceRecords = [];
            attendanceSnap.forEach((doc) => {
                attendanceRecords.push({
                    id: doc.id,
                    ...doc.data()
                });
            });

            return { success: true, data: attendanceRecords };
        } catch (error) {
            console.error('Error getting all attendance:', error);
            return { success: false, message: 'Failed to get attendance records', error };
        }
    };

    const updateAttendance = async (sectionId, date, updatedStudents) => {
        try {
            const attendanceRef = doc(db, 'sections', sectionId, 'attendance', date);

            const existingDoc = await getDoc(attendanceRef);
            if (!existingDoc.exists()) {
                return { success: false, message: 'Attendance record not found' };
            }

            const updateData = {
                students: updatedStudents.map(student => ({
                    studentId: student.studentId,
                    name: student.name,
                    status: student.status,
                    markedAt: new Date()
                })),
                updatedAt: new Date(),
                totalStudents: updatedStudents.length,
                presentCount: updatedStudents.filter(s => s.status === 'Present').length,
                absentCount: updatedStudents.filter(s => s.status === 'Absent').length,
            };

            await setDoc(attendanceRef, updateData, { merge: true });

            return { success: true, message: 'Attendance updated successfully' };
        } catch (error) {
            console.error('Error updating attendance:', error);
            return { success: false, message: 'Failed to update attendance', error };
        }
    };

    const getStudentAttendanceStats = async (sectionId, studentId) => {
        try {
            const attendanceCollectionRef = collection(db, 'sections', sectionId, 'attendance');
            const attendanceSnap = await getDocs(attendanceCollectionRef);

            let totalClasses = 0;
            let presentClasses = 0;
            let absentClasses = 0;
            const attendanceHistory = [];

            attendanceSnap.forEach((doc) => {
                const data = doc.data();
                const studentRecord = data.students.find(s => s.studentId === studentId);

                if (studentRecord) {
                    totalClasses++;
                    if (studentRecord.status === 'Present') {
                        presentClasses++;
                    } else {
                        absentClasses++;
                    }

                    attendanceHistory.push({
                        date: data.date,
                        status: studentRecord.status,
                        markedAt: studentRecord.markedAt
                    });
                }
            });

            const percentage = totalClasses > 0 ? Math.round((presentClasses / totalClasses) * 100) : 0;

            return {
                success: true,
                data: {
                    totalClasses,
                    presentClasses,
                    absentClasses,
                    percentage,
                    attendanceHistory: attendanceHistory.sort((a, b) => new Date(b.date) - new Date(a.date))
                }
            };
        } catch (error) {
            console.error('Error getting student attendance stats:', error);
            return { success: false, message: 'Failed to get student stats', error };
        }
    };

    const getAttendanceSummary = async (sectionId, startDate, endDate) => {
        try {
            const attendanceCollectionRef = collection(db, 'sections', sectionId, 'attendance');
            const attendanceQuery = query(
                attendanceCollectionRef,
                where('date', '>=', startDate),
                where('date', '<=', endDate),
                orderBy('date', 'desc')
            );

            const attendanceSnap = await getDocs(attendanceQuery);

            let totalClasses = 0;
            let totalPresent = 0;
            let totalAbsent = 0;
            const dailyStats = [];

            attendanceSnap.forEach((doc) => {
                const data = doc.data();
                totalClasses++;
                totalPresent += data.presentCount;
                totalAbsent += data.absentCount;

                dailyStats.push({
                    date: data.date,
                    presentCount: data.presentCount,
                    absentCount: data.absentCount,
                    totalStudents: data.totalStudents
                });
            });

            return {
                success: true,
                data: {
                    totalClasses,
                    totalPresent,
                    totalAbsent,
                    averageAttendance: totalClasses > 0 ? Math.round((totalPresent / (totalPresent + totalAbsent)) * 100) : 0,
                    dailyStats
                }
            };
        } catch (error) {
            console.error('Error getting attendance summary:', error);
            return { success: false, message: 'Failed to get attendance summary', error };
        }
    };

    const value = {
        user,
        userData,
        adminData,
        deptsData,
        sections,
        isLoading,
        isAdmin: userData?.role === 'admin',
        isTeacher: userData?.role === 'teacher',
        isStudend: userData?.role === 'student',
        login,
        registerUser,
        signOut,
        fetchCollection,
        refreshUserData,
        refreshAdminData,
        refreshDeptsData,
        refreshTeacherSection,
        updateDocById,
        deleteDocById,
        fetchAllUsers,
        fetchUsersByRole,
        fetchDocById,
        updateArrayItemById,
        deleteArrayItemById,
        saveAttendance,
        getAttendanceByDate,
        getAllAttendanceForSection,
        updateAttendance,
        getStudentAttendanceStats,
        getAttendanceSummary
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};
