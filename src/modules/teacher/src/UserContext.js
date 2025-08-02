import { auth, db, storage } from "./firebaseConfig";
import React, { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut as firebaseSignOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, getDocs, collection, updateDoc, arrayUnion, setDoc, deleteDoc, addDoc, where, query, orderBy, serverTimestamp, onSnapshot, increment } from 'firebase/firestore';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { TeacherPortalLoading } from './TeacherPortalLoading';

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

            const teacherSections = [];

            for (const doc of snapshot.docs) {
                const data = doc.data();
                const teachers = data.teachers || [];

                const isTeacherMatched = teachers.some(
                    (t) => t && t.teacher_id === teacherId
                );

                if (isTeacherMatched) {
                    const studentsRef = collection(db, 'sections', doc.id, 'students');
                    const studentsSnapshot = await getDocs(studentsRef);

                    const students = studentsSnapshot.docs.map((studentDoc) => ({
                        id: studentDoc.id,
                        student_id: studentDoc.id,
                        ...studentDoc.data(),
                    }));

                    teacherSections.push({
                        id: doc.id,
                        ...data,
                        students,
                    });
                }
            }

            setSections(teacherSections);
            return { success: true, data: teacherSections };
        } catch (error) {
            console.error('Error fetching teacher sections with students:', error);
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

    const createAssignment = async (assignmentData) => {
        try {
            const assignmentsRef = collection(db, "sections", assignmentData.sectionId, "assignments");

            const assignmentToSave = {
                ...assignmentData,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            };

            const docRef = await addDoc(assignmentsRef, assignmentToSave);

            console.log("Assignment created successfully with ID:", docRef.id);

            return {
                success: true,
                message: assignmentData.isDraft
                    ? "Assignment saved as draft successfully!"
                    : "Assignment published successfully!",
                assignmentId: docRef.id
            };

        } catch (error) {
            console.error("Error creating assignment:", error);

            let errorMessage = "Failed to create assignment. Please try again.";

            if (error.code === 'permission-denied') {
                errorMessage = "You don't have permission to create assignments for this section.";
            } else if (error.code === 'not-found') {
                errorMessage = "Section not found. Please select a valid section.";
            } else if (error.code === 'unavailable') {
                errorMessage = "Service temporarily unavailable. Please try again later.";
            }

            return {
                success: false,
                message: errorMessage,
                error: error.message
            };
        }
    };

    const createQuiz = async (quizData) => {
        try {
            const assignmentsRef = collection(db, "sections", quizData?.sectionId, "quizzes");

            const quizToSave = {
                ...quizData,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            };

            const docRef = await addDoc(assignmentsRef, quizToSave);

            console.log("Quiz created successfully with ID:", docRef.id);

            return {
                success: true,
                message: quizData.isDraft
                    ? "Quiz saved as draft successfully!"
                    : "Quiz published successfully!",
                quizId: docRef.id
            };

        } catch (error) {
            console.error("Error creating quiz:", error);

            let errorMessage = "Failed to create quiz. Please try again.";

            if (error.code === 'permission-denied') {
                errorMessage = "You don't have permission to create quizzes for this section.";
            } else if (error.code === 'not-found') {
                errorMessage = "Section not found. Please select a valid section.";
            } else if (error.code === 'unavailable') {
                errorMessage = "Service temporarily unavailable. Please try again later.";
            }

            return {
                success: false,
                message: errorMessage,
                error: error.message
            };
        }
    };

    const fetchAssignments = async (sectionId) => {
        try {
            if (!sectionId) {
                throw new Error('Section ID is required');
            }

            const assignmentsRef = collection(db, 'sections', sectionId, 'assignments');
            const snapshot = await getDocs(assignmentsRef);

            const assignments = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));

            return {
                success: true,
                data: assignments,
            };
        } catch (error) {
            console.error('Error fetching assignments:', error);
            return {
                success: false,
                message: error.message,
            };
        }
    };

    const fetchQuizzes = async (sectionId) => {
        try {
            if (!sectionId) {
                throw new Error('Section ID is required');
            }

            const quizzesRef = collection(db, 'sections', sectionId, 'quizzes');
            const snapshot = await getDocs(quizzesRef);

            const quizzes = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));

            return {
                success: true,
                data: quizzes,
            };
        } catch (error) {
            console.error('Error fetching quizzes:', error);
            return {
                success: false,
                message: error.message,
            };
        }
    };

    const updateAssignmentById = async (sectionId, assignmentId, studentId, updatedSubmissionData) => {
        try {
            if (!sectionId || !assignmentId || !studentId) {
                throw new Error("Section ID, Assignment ID, and Student ID are required");
            }

            const assignmentRef = doc(db, 'sections', sectionId, 'assignments', assignmentId);
            const assignmentSnap = await getDoc(assignmentRef);

            if (!assignmentSnap.exists()) {
                throw new Error("Assignment not found");
            }

            const assignmentData = assignmentSnap.data();
            const submittedArray = Array.isArray(assignmentData.submitted) ? [...assignmentData.submitted] : [];

            const index = submittedArray.findIndex(sub => sub.studentId === studentId);

            if (index === -1) {
                throw new Error("Submission by this student not found");
            }

            submittedArray[index] = {
                ...submittedArray[index],
                ...updatedSubmissionData,
            };

            await updateDoc(assignmentRef, {
                submitted: submittedArray
            });

            return {
                success: true,
                message: "Submission updated successfully"
            };
        } catch (error) {
            console.error("Error updating assignment submission:", error);
            return {
                success: false,
                message: error.message,
            };
        }
    };

    const updateQuizById = async (sectionId, quizId, studentId, updatedSubmissionData) => {
        try {
            if (!sectionId || !quizId || !studentId) {
                throw new Error("Section ID, Assignment ID, and Student ID are required");
            }

            const quizRef = doc(db, 'sections', sectionId, 'quizzes', quizId);
            const quizSnap = await getDoc(quizRef);

            if (!quizSnap.exists()) {
                throw new Error("Quiz not found");
            }

            const quizData = quizSnap.data();
            const submittedArray = Array.isArray(quizData.submitted) ? [...quizData.submitted] : [];

            const index = submittedArray.findIndex(sub => sub.studentId === studentId);

            if (index === -1) {
                throw new Error("Submission by this student not found");
            }

            submittedArray[index] = {
                ...submittedArray[index],
                ...updatedSubmissionData,
            };

            await updateDoc(quizRef, {
                submitted: submittedArray
            });

            return {
                success: true,
                message: "Submission updated successfully"
            };
        } catch (error) {
            console.error("Error updating quiz submission:", error);
            return {
                success: false,
                message: error.message,
            };
        }
    };

    const createAnnouncement = async (announcementData) => {
        try {
            const colRef = collection(db, "announcements");
            const docRef = await addDoc(colRef, {});

            const dataWithId = { ...announcementData, id: docRef.id };
            await setDoc(docRef, dataWithId);

            console.log("Announcement created with ID:", docRef.id);
            return { success: true, id: docRef.id };
        } catch (error) {
            console.error("Error creating announcement:", error);
            return { success: false, message: error.message };
        }
    };

    const fetchAnnouncements = async (userId) => {
        try {
            const announcementsRef = collection(db, "announcements");

            const queryTeachers = query(
                announcementsRef,
                where("type", "==", "Teachers")
            );

            const queryAll = query(
                announcementsRef,
                where("type", "==", "All")
            );

            const queryByUser = query(
                announcementsRef,
                where("createdBy.id", "==", userId)
            );

            const [teachersSnap, allSnap, userSnap] = await Promise.all([
                getDocs(queryTeachers),
                getDocs(queryAll),
                getDocs(queryByUser),
            ]);

            const fromTeachers = teachersSnap.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));

            const fromAll = allSnap.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));

            const fromUser = userSnap.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));

            const combined = [...fromTeachers, ...fromAll, ...fromUser];

            const unique = Array.from(
                new Map(combined.map(item => [item.id, item])).values()
            );

            return { success: true, data: unique };
        } catch (error) {
            console.error("Error fetching announcements:", error);
            return { success: false, data: [] };
        }
    };

    const createChat = async (participantId) => {
        try {
            if (!user || !userData) {
                return { success: false, error: 'User not authenticated' };
            }

            const currentUserId = user.uid;

            const existingChat = await findExistingChat(currentUserId, participantId);
            if (existingChat.success) {
                return { success: true, chatId: existingChat.chatId, message: 'Chat already exists' };
            }

            const participantDoc = await getDoc(doc(db, 'users', participantId));
            const participantData = participantDoc.exists() ? participantDoc.data() : {};
            const currentTimestamp = new Date();

            const chatRef = await addDoc(collection(db, 'chats'), {
                participants: [currentUserId, participantId],
                participantData: {
                    [currentUserId]: {
                        name: userData?.full_name || userData?.email,
                        email: userData?.email,
                        avatar: userData?.profile_pic || null,
                        lastSeen: currentTimestamp,
                        unreadCount: 0
                    },
                    [participantId]: {
                        name: participantData?.full_name || participantData?.email || 'Unknown User',
                        email: participantData?.email || '',
                        avatar: participantData?.profile_pic || null,
                        lastSeen: currentTimestamp,
                        unreadCount: 0
                    }
                },
                messages: [],
                lastMessage: {
                    text: '',
                    senderId: '',
                    timestamp: currentTimestamp,
                    messageIndex: -1
                },
                totalMessages: 0,
                createdAt: currentTimestamp,
                updatedAt: currentTimestamp
            });

            console.log('New chat doc created!');
            return { success: true, chatId: chatRef.id };
        } catch (error) {
            console.error('Error creating chat:', error);
            return { success: false, error: error.message };
        }
    };

    const findExistingChat = async (userId1, userId2) => {
        try {
            const chatsRef = collection(db, 'chats');
            const q = query(
                chatsRef,
                where('participants', 'array-contains', userId1)
            );

            const querySnapshot = await getDocs(q);

            for (const doc of querySnapshot.docs) {
                const chatData = doc.data();
                if (chatData.participants.includes(userId2)) {
                    return { success: true, chatId: doc.id, data: chatData };
                }
            }

            return { success: false, message: 'No existing chat found' };
        } catch (error) {
            console.error('Error finding existing chat:', error);
            return { success: false, error: error.message };
        }
    };

    const getUserChats = async () => {
        try {
            if (!user) {
                return { success: false, error: 'User not authenticated' };
            }

            const chatsRef = collection(db, 'chats');
            const q = query(
                chatsRef,
                where('participants', 'array-contains', user.uid),
                orderBy('updatedAt', 'desc')
            );

            const querySnapshot = await getDocs(q);
            const chats = [];

            querySnapshot.forEach((doc) => {
                const chatData = doc.data();
                const otherUserId = chatData.participants.find(id => id !== user.uid);
                const otherUserData = chatData.participantData[otherUserId];
                const currentUserData = chatData.participantData[user.uid];

                chats.push({
                    id: doc.id,
                    ...chatData,
                    otherUser: {
                        id: otherUserId,
                        ...otherUserData
                    },
                    unreadCount: currentUserData?.unreadCount || 0
                });
            });

            return { success: true, data: chats };
        } catch (error) {
            console.error('Error getting user chats:', error);
            return { success: false, error: error.message };
        }
    };

    const sendMessage = async (chatId, messageText, messageType = 'text') => {
        try {
            if (!user || !userData) {
                return { success: false, error: 'User not authenticated' };
            }

            if (!messageText.trim()) {
                return { success: false, error: 'Message cannot be empty' };
            }

            const chatRef = doc(db, 'chats', chatId);
            const chatDoc = await getDoc(chatRef);

            if (!chatDoc.exists()) {
                return { success: false, error: 'Chat not found' };
            }

            const chatData = chatDoc.data();
            const otherUserId = chatData.participants.find(id => id !== user.uid);
            const currentTimestamp = new Date();

            const newMessage = {
                id: `${Date.now()}_${user.uid}`,
                text: messageText,
                senderId: user.uid,
                senderName: userData?.full_name || userData?.email,
                senderAvatar: userData?.profile_pic || null,
                type: messageType,
                timestamp: currentTimestamp,
                deleted: false
            };

            await updateDoc(chatRef, {
                messages: arrayUnion(newMessage),
                lastMessage: {
                    text: messageText,
                    senderId: user.uid,
                    senderName: userData?.full_name || userData?.email,
                    timestamp: currentTimestamp,
                    messageIndex: (chatData.totalMessages || 0)
                },
                totalMessages: increment(1),
                updatedAt: currentTimestamp,
                [`participantData.${user.uid}.lastSeen`]: currentTimestamp,
                [`participantData.${otherUserId}.unreadCount`]: increment(1)
            });

            return { success: true, message: 'Message sent successfully' };
        } catch (error) {
            console.error('Error sending message:', error);
            return { success: false, error: error.message };
        }
    };

    const getChatMessages = async (chatId) => {
        try {
            if (!chatId) {
                return { success: false, error: 'Chat ID is required' };
            }

            const chatRef = doc(db, 'chats', chatId);
            const chatDoc = await getDoc(chatRef);

            if (!chatDoc.exists()) {
                return { success: false, error: 'Chat not found' };
            }

            const chatData = chatDoc.data();
            const messages = chatData.messages || [];

            const sortedMessages = messages.sort((a, b) => {
                if (a.timestamp && b.timestamp) {
                    return a.timestamp.seconds - b.timestamp.seconds;
                }
                return 0;
            });

            return { success: true, data: sortedMessages };
        } catch (error) {
            console.error('Error getting chat messages:', error);
            return { success: false, error: error.message };
        }
    };

    const subscribeToMessages = (chatId, callback) => {
        try {
            if (!chatId) {
                throw new Error('Chat ID is required');
            }

            const chatRef = doc(db, 'chats', chatId);
            let lastMessageCount = 0;

            const unsubscribe = onSnapshot(chatRef, (doc) => {
                if (doc.exists()) {
                    const chatData = doc.data();
                    const messages = chatData.messages || [];

                    if (messages.length !== lastMessageCount) {
                        lastMessageCount = messages.length;

                        const sortedMessages = [...messages].sort((a, b) => {
                            const timeA = a.timestamp instanceof Date ? a.timestamp : new Date(a.timestamp);
                            const timeB = b.timestamp instanceof Date ? b.timestamp : new Date(b.timestamp);
                            return timeA - timeB;
                        });

                        callback(sortedMessages);
                    } else {
                        callback([]);
                    }
                } else {
                    callback([]);
                }
            });

            return unsubscribe;
        } catch (error) {
            console.error('Error subscribing to messages:', error);
            return null;
        }
    };

    const subscribeToUserChats = (callback) => {
        try {
            if (!user) {
                throw new Error('User not authenticated');
            }

            const chatsRef = collection(db, 'chats');
            const q = query(
                chatsRef,
                where('participants', 'array-contains', user.uid),
                orderBy('updatedAt', 'desc')
            );

            const unsubscribe = onSnapshot(q, (snapshot) => {
                const chats = [];
                snapshot.forEach((doc) => {
                    const chatData = doc.data();
                    const otherUserId = chatData.participants.find(id => id !== user.uid);
                    const otherUserData = chatData.participantData[otherUserId];
                    const currentUserData = chatData.participantData[user.uid];

                    chats.push({
                        id: doc.id,
                        ...chatData,
                        otherUser: {
                            id: otherUserId,
                            ...otherUserData
                        },
                        unreadCount: currentUserData?.unreadCount || 0
                    });
                });
                callback(chats);
            });

            return unsubscribe;
        } catch (error) {
            console.error('Error subscribing to user chats:', error);
            return null;
        }
    };

    const markMessagesAsRead = async (chatId) => {
        try {
            if (!user || !chatId) {
                return { success: false, error: 'User not authenticated or chat ID missing' };
            }

            const chatRef = doc(db, 'chats', chatId);
            const currentTimestamp = new Date();

            await updateDoc(chatRef, {
                [`participantData.${user.uid}.lastSeen`]: currentTimestamp,
                [`participantData.${user.uid}.unreadCount`]: 0
            });

            return { success: true };
        } catch (error) {
            console.error('Error marking messages as read:', error);
            return { success: false, error: error.message };
        }
    };

    const deleteMessage = async (chatId, messageId) => {
        try {
            if (!user) {
                return { success: false, error: 'User not authenticated' };
            }

            const chatRef = doc(db, 'chats', chatId);
            const chatDoc = await getDoc(chatRef);

            if (!chatDoc.exists()) {
                return { success: false, error: 'Chat not found' };
            }

            const chatData = chatDoc.data();
            const messages = chatData.messages || [];

            const updatedMessages = messages.map(msg => {
                if (msg.id === messageId && msg.senderId === user.uid) {
                    return {
                        ...msg,
                        text: 'This message was deleted',
                        deleted: true,
                        deletedAt: serverTimestamp()
                    };
                }
                return msg;
            });

            await updateDoc(chatRef, {
                messages: updatedMessages,
                updatedAt: serverTimestamp()
            });

            return { success: true, message: 'Message deleted successfully' };
        } catch (error) {
            console.error('Error deleting message:', error);
            return { success: false, error: error.message };
        }
    };

    const searchUsers = async (searchTerm) => {
        try {
            if (!searchTerm.trim()) {
                return { success: false, error: 'Search term is required' };
            }

            const usersRef = collection(db, 'users');
            const querySnapshot = await getDocs(usersRef);

            const users = [];
            querySnapshot.forEach((doc) => {
                const userData = doc.data();
                const searchFields = [
                    userData.full_name || '',
                    userData.email || '',
                    userData.student_id || '',
                    userData.teacher_id || ''
                ].join(' ').toLowerCase();

                if (searchFields.includes(searchTerm.toLowerCase()) && doc.id !== user.uid) {
                    users.push({
                        id: doc.id,
                        ...userData
                    });
                }
            });

            return { success: true, data: users };
        } catch (error) {
            console.error('Error searching users:', error);
            return { success: false, error: error.message };
        }
    };

    const getChatStats = async (chatId) => {
        try {
            if (!chatId) {
                return { success: false, error: 'Chat ID is required' };
            }

            const chatRef = doc(db, 'chats', chatId);
            const chatDoc = await getDoc(chatRef);

            if (!chatDoc.exists()) {
                return { success: false, error: 'Chat not found' };
            }

            const chatData = chatDoc.data();
            const messages = chatData.messages || [];

            const stats = {
                totalMessages: messages.length,
                myMessages: messages.filter(msg => msg.senderId === user.uid).length,
                otherMessages: messages.filter(msg => msg.senderId !== user.uid).length,
                createdAt: chatData.createdAt,
                lastActivity: chatData.updatedAt
            };

            return { success: true, data: stats };
        } catch (error) {
            console.error('Error getting chat stats:', error);
            return { success: false, error: error.message };
        }
    };

    const batchDeleteMessages = async (chatId, messageIds) => {
        try {
            if (!user || !messageIds.length) {
                return { success: false, error: 'Invalid parameters' };
            }

            const chatRef = doc(db, 'chats', chatId);
            const chatDoc = await getDoc(chatRef);

            if (!chatDoc.exists()) {
                return { success: false, error: 'Chat not found' };
            }

            const chatData = chatDoc.data();
            const messages = chatData.messages || [];

            const updatedMessages = messages.map(msg => {
                if (messageIds.includes(msg.id) && msg.senderId === user.uid) {
                    return {
                        ...msg,
                        text: 'This message was deleted',
                        deleted: true,
                        deletedAt: serverTimestamp()
                    };
                }
                return msg;
            });

            await updateDoc(chatRef, {
                messages: updatedMessages,
                updatedAt: serverTimestamp()
            });

            return { success: true, message: 'Messages deleted successfully' };
        } catch (error) {
            console.error('Error batch deleting messages:', error);
            return { success: false, error: error.message };
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
        getAttendanceSummary,
        createAssignment,
        createQuiz,
        fetchAssignments,
        fetchQuizzes,
        updateAssignmentById,
        updateQuizById,
        createAnnouncement,
        fetchAnnouncements,

        createChat,
        findExistingChat,
        getUserChats,
        sendMessage,
        getChatMessages,
        subscribeToMessages,
        subscribeToUserChats,
        markMessagesAsRead,
        deleteMessage,
        searchUsers,
        getChatStats,
        batchDeleteMessages,


    };

    if (isLoading) {
        return <TeacherPortalLoading isLoading={isLoading} />;
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};