import AsyncStorage from '@react-native-async-storage/async-storage';

import { initializeApp } from 'firebase/app';
// import { getAuth } from "firebase/auth";
import {
  initializeAuth,
  getReactNativePersistence
} from 'firebase/auth/react-native';

import { getFirestore, Timestamp } from 'firebase/firestore';

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyC4oW4y878Z9ZXtZoomLGTOfTDguym-SL0',
  authDomain: 'mealstogo-ca4f2.firebaseapp.com',
  projectId: 'mealstogo-ca4f2',
  storageBucket: 'mealstogo-ca4f2.appspot.com',
  messagingSenderId: '395333425598',
  appId: '1:395333425598:web:8f82d59ada02d2ca16c1ef'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Authentication
// const auth = getAuth(app);
// initialize auth
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
// Firestore Database
const db = getFirestore(app);

// TimeStamp
const timestampNow = Timestamp.fromDate(new Date());

export { db, auth, timestampNow };
