import React, { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut as firebaseSignOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, getDocs, collection, updateDoc, arrayUnion, setDoc, deleteDoc, addDoc, where, query } from 'firebase/firestore';
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
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
            try {
                if (authUser) {
                    setUser(authUser);
                    const userDoc = await getDoc(doc(db, 'users', authUser.uid));
                    setUserData(userDoc.exists() ? userDoc.data() : null);

                    const result = await fetchDocById('data', 'data');
                    setAdminData(result?.data);

                    const response = await fetchCollection('departments');
                    setDeptsData(response?.data);
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
                navigate('/dashboard');

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

    const addDepartment = async (departmentData) => {
        try {
            const colRef = collection(db, "departments");
            const docRef = await addDoc(colRef, {});

            const dataWithId = { ...departmentData, id: docRef.id };
            await setDoc(docRef, dataWithId);

            console.log("Department saved with ID:", docRef.id);
            return { success: true, id: docRef.id };
        } catch (error) {
            console.error("Error saving department:", error);
            return { success: false, message: error.message };
        }
    };

    const addCourse = async (departmentDocId, programId, semesterNumber, courseData) => {
        try {
            const docRef = doc(db, 'departments', departmentDocId);
            const snapshot = await getDoc(docRef);

            if (!snapshot.exists()) {
                return { success: false, message: 'Department not found' };
            }

            const data = snapshot.data();
            const programs = data.programs || [];

            const programIndex = programs.findIndex(p => p.program_id === programId);
            if (programIndex === -1) {
                return { success: false, message: 'Program not found' };
            }

            const semesters = programs[programIndex].semesters || [];
            const semesterIndex = semesters.findIndex(s => s.number === Number(semesterNumber));
            if (semesterIndex === -1) {
                return { success: false, message: 'Semester not found' };
            }

            if (!semesters[semesterIndex].courses) {
                semesters[semesterIndex].courses = [];
            }

            semesters[semesterIndex].courses.push(courseData);

            programs[programIndex].semesters = semesters;

            await updateDoc(docRef, {
                programs: programs
            });

            console.log('Course added successfully');
            return { success: true, message: 'Course added successfully' };
        } catch (error) {
            console.error('Error adding course:', error.message);
            return { success: false, message: error.message };
        }
    };

    const editCourse = async (departmentDocId, programId, courseId, oldSemesterNumber, newSemesterNumber, updatedCourseData) => {
        try {
            const docRef = doc(db, 'departments', departmentDocId);
            const snapshot = await getDoc(docRef);

            if (!snapshot.exists()) {
                return { success: false, message: 'Department not found' };
            }

            const data = snapshot.data();
            const programs = data.programs || [];

            const programIndex = programs.findIndex(p => p.program_id === programId);
            if (programIndex === -1) {
                return { success: false, message: 'Program not found' };
            }

            const semesters = programs[programIndex].semesters || [];

            const oldSemesterIndex = semesters.findIndex(s => s.number === Number(oldSemesterNumber));
            if (oldSemesterIndex === -1) {
                return { success: false, message: 'Old semester not found' };
            }

            const courseIndex = semesters[oldSemesterIndex].courses?.findIndex(c => c.course_id === courseId);
            if (courseIndex === -1) {
                return { success: false, message: 'Course not found in old semester' };
            }

            const existingCourse = semesters[oldSemesterIndex].courses[courseIndex];

            semesters[oldSemesterIndex].courses.splice(courseIndex, 1);

            const newSemesterIndex = semesters.findIndex(s => s.number === Number(newSemesterNumber));
            if (newSemesterIndex === -1) {
                return { success: false, message: 'New semester not found' };
            }

            const updatedCourse = {
                ...existingCourse,
                ...updatedCourseData,
                semester: newSemesterNumber,
                updatedAt: new Date().toISOString()
            };

            if (!semesters[newSemesterIndex].courses) {
                semesters[newSemesterIndex].courses = [];
            }
            semesters[newSemesterIndex].courses.push(updatedCourse);

            programs[programIndex].semesters = semesters;

            await updateDoc(docRef, {
                programs: programs
            });

            console.log('Course updated and moved successfully');
            return { success: true, message: 'Course updated and moved to new semester successfully' };
        } catch (error) {
            console.error('Error updating course:', error.message);
            return { success: false, message: error.message };
        }
    };

    const deleteCourse = async (departmentDocId, programId, semesterNumber, courseId) => {
        try {
            const docRef = doc(db, 'departments', departmentDocId);
            const snapshot = await getDoc(docRef);

            if (!snapshot.exists()) {
                return { success: false, message: 'Department not found' };
            }

            const data = snapshot.data();
            const programs = data.programs || [];

            const programIndex = programs.findIndex(p => p.program_id === programId);
            if (programIndex === -1) {
                return { success: false, message: 'Program not found' };
            }

            const semesters = programs[programIndex].semesters || [];

            const semesterIndex = semesters.findIndex(s => s.number === Number(semesterNumber));
            if (semesterIndex === -1) {
                return { success: false, message: 'Semester not found' };
            }

            const courseIndex = semesters[semesterIndex].courses?.findIndex(c => c.course_id === courseId);
            if (courseIndex === -1) {
                return { success: false, message: 'Course not found in the semester' };
            }

            semesters[semesterIndex].courses.splice(courseIndex, 1);

            programs[programIndex].semesters = semesters;

            await updateDoc(docRef, {
                programs: programs
            });

            console.log('Course deleted successfully');
            return { success: true, message: 'Course deleted successfully' };
        } catch (error) {
            console.error('Error deleting course:', error.message);
            return { success: false, message: error.message };
        }
    };

    const editProgram = async (departmentId, programId, updatedData) => {
        try {
            const docRef = doc(db, 'departments', departmentId);
            const snapshot = await getDoc(docRef);

            if (!snapshot.exists()) {
                return { success: false, message: 'Department not found' };
            }

            const data = snapshot.data();
            const programs = data.programs || [];

            const programIndex = programs.findIndex(p => p.program_id === programId);
            if (programIndex === -1) {
                return { success: false, message: 'Program not found in department' };
            }

            programs[programIndex].name = updatedData?.programName;
            programs[programIndex].code = updatedData?.programCode;
            programs[programIndex].type = updatedData?.programType;
            programs[programIndex].degree_award = updatedData?.degreeAwarded;
            programs[programIndex].credit_hours = updatedData?.creditHours;
            programs[programIndex].status = updatedData?.status;


            await updateDoc(docRef, { programs });

            return { success: true, message: 'Program name updated successfully' };
        } catch (error) {
            console.error("Error updating program name:", error);
            return { success: false, message: error.message };
        }
    };

    const deleteProgram = async (departmentId, programId) => {
        try {
            const docRef = doc(db, 'departments', departmentId);
            const snapshot = await getDoc(docRef);

            if (!snapshot.exists()) {
                return { success: false, message: 'Department not found' };
            }

            const data = snapshot.data();
            const programs = data.programs || [];

            const updatedPrograms = programs.filter(p => p.program_id !== programId);

            await updateDoc(docRef, { programs: updatedPrograms });

            return { success: true, message: 'Program deleted successfully!' };
        } catch (error) {
            console.log(error);
            return { success: false, message: error.message };
        }
    };

    const value = {
        user,
        userData,
        adminData,
        deptsData,
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
        updateDocById,
        deleteDocById,
        fetchAllUsers,
        fetchUsersByRole,
        fetchDocById,
        updateArrayItemById,
        deleteArrayItemById,
        addDepartment,
        addCourse,
        editCourse,
        deleteCourse,
        editProgram,
        deleteProgram,
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};
