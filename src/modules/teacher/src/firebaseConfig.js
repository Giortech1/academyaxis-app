import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCeMk5kuSrQiQZfdJ7FOlO7VgILVyJfB2Y",
  authDomain: "academyaxis-36125.firebaseapp.com",
  projectId: "academyaxis-36125",
  storageBucket: "academyaxis-36125.firebasestorage.app",
  messagingSenderId: "1035034376174",
  appId: "1:1035034376174:web:bdffcdd2e11c74c24680ff",
  measurementId: "G-DGHXG4XJD7"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

const storage = getStorage(app);

export { auth, db, storage };
