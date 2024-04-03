// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, } from "firebase/auth"
import { getFirestore, query, getDocs, collection, where, addDoc} from "firebase/firestore"
import {getStorage} from 'firebase/storage';




const firebaseConfig = {
  // apiKey: "AIzaSyDI0NBHbwbO4SnCGDDMOqmQJYxJTf3sf-M",
  // authDomain: "napher-fd75f.firebaseapp.com",
  // projectId: "napher-fd75f",
  // storageBucket: "napher-fd75f.appspot.com",
  // messagingSenderId: "579648649760",
  // appId: "1:579648649760:web:e231ed0dc35aa13d9b1a45"

  apiKey: "AIzaSyDxHBNYJB1BfMNN2ZAsC_W86M42cXPceIU",
  authDomain: "esan-4259c.firebaseapp.com",
  projectId: "esan-4259c",
  storageBucket: "esan-4259c.appspot.com",
  messagingSenderId: "573713025791",
  appId: "1:573713025791:web:f1f44cd374b24513e6daca"
};



// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
// export const provider = new GoogleAuthProvider();


// Sign in with Gmail
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};


// Sign in with email and Password\

const logInWithEmail = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};


// Register with email and Password
const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};


// Reset Password
const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};


const logout = () => {
  signOut(auth);
};

// export default Firebase

export {
  signInWithGoogle,  
  logInWithEmail,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};