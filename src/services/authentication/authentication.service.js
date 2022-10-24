/* eslint-disable comma-dangle */
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc } from "firebase/firestore";
import { auth, db } from "../../../firebase-config";
export const loginRequest = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const docRef = doc(db, "users", userCredential.user.uid);
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
  }
};
