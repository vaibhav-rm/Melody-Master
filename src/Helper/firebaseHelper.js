// src/firebaseHelper.js
import { auth, db } from "../firebase"; // Import Firebase auth and db
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

// Function to sign in a user
export const signInUser  = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user; // Return the user object
  } catch (error) {
    throw new Error(error.message);
  }
};

// Function to register a new user
export const registerUser  = async (username, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Store user details in Firestore
    await setDoc(doc(db, "users", user.uid), {
      username,
      email,
      createdAt: new Date(),
    });

    return user; // Return the user object
  } catch (error) {
    throw new Error(error.message);
  }
};

// Function to check authentication status
export const checkAuthStatus = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    callback(user); // Call the callback with the user object (or null if not authenticated)
  });
};

// Function to get the current user
export const getCurrentUser  = () => {
  return auth.currentUser ;
};

// Function to sign out the user
export const signOutUser  = async () => {
  await auth.signOut();
};