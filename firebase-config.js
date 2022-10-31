import AsyncStorage from "@react-native-async-storage/async-storage";

import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth/react-native";

import { getFirestore, Timestamp } from "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Authentication
// const auth = getAuth(app);
// initialize auth
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
// Firestore Database
const db = getFirestore(app);

// TimeStamp
const timestampNow = Timestamp.fromDate(new Date());

export { db, auth, timestampNow };
