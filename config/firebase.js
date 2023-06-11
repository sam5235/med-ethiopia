// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAcKnJeITheUkC4NtoXTA8LEbGgYnBejVY",
  authDomain: "medical-records-fe307.firebaseapp.com",
  projectId: "medical-records-fe307",
  storageBucket: "medical-records-fe307.appspot.com",
  messagingSenderId: "723563462553",
  appId: "1:723563462553:web:79391c11fdc54b75acdd08",
  measurementId: "G-BRQ79WWDBD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const secondaryApp = initializeApp(firebaseConfig, "Secondary");
export const secondaryAuth = getAuth(secondaryApp);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
