import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { createContext, useEffect, useState } from 'react';
import { auth, db } from '../../../firebase-config';

export const AuthenticationContext = createContext();
export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    // This is an observable so It need to be disabled after I use it
    const unsubscribe = onAuthStateChanged(auth, (usr) => {
      if (usr) {
        console.log('User is Active');
        const { email, photoURL, displayName, uid } = usr;
        setUser({ email, photoURL, displayName, uid });
      } else {
        console.log('User is not Active');

        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const onLogin = async (email, password) => {
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const docRef = doc(db, 'users', userCredential.user.uid);
      setUser(docRef);
      setIsLoading(false);
      setError(null);
    } catch (e) {
      setIsLoading(false);
      setError(e.code);
    }
  };

  const onRegister = async (email, password, repeatedPassword) => {
    setIsLoading(true);
    if (password !== repeatedPassword) {
      setIsLoading(false);
      setError('Error: Passwords do not match');
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      //  Getting uid
      const userRegistered = userCredential.user;
      if (!userCredential) {
        console.error('Could not complete Sign Up');
      }
      const formDataCopy = {
        online: true,
        email
      };
      //  Creating collection of Users
      await setDoc(doc(db, 'users', userRegistered.uid), formDataCopy);
      setIsLoading(false);
      setError(null);

      console.log('User created successfully');
    } catch (e) {
      setError(e.code);
      setIsLoading(false);
      console.log(e);
    }
  };

  // Log out from firebase
  const onLogout = async () => {
    setIsLoading(true);

    try {
      const { uid } = user;
      const docRef = doc(db, 'users', uid);
      await updateDoc(docRef, {
        online: false
      });

      signOut(auth);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setError(e.code);
      setIsLoading(false);
    }
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        onLogin,
        onRegister,
        onLogout
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
