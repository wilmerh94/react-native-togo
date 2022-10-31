import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, Timestamp } from "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Authentication
const auth = getAuth(app);

// Firestore Database
const db = getFirestore(app);

// TimeStamp
const timestampNow = Timestamp.fromDate(new Date());

export { db, auth, timestampNow };
