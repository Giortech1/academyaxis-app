import { initializeApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBwdQ6_r1zAXCtaG441B685vMqEa6oD_Cg",
  authDomain: "axisacademy-f7da2.firebaseapp.com",
  projectId: "axisacademy-f7da2",
  storageBucket: "axisacademy-f7da2.firebasestorage.app",
  messagingSenderId: "381815643866",
  appId: "1:381815643866:web:3e5a551938c1e78cf98fe3",
  measurementId: "G-SLK84VSP1X"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const storage = getStorage(app);

const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
}, 'academyaxisdb1sa');

export { auth, storage, db };

