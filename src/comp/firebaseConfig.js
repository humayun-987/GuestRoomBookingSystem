// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAuOtlHe1QQaZRgpXaFVC3cgPgcmhp68IY",
  authDomain: "my-unosq.firebaseapp.com",
  projectId: "my-unosq",
  storageBucket: "my-unosq.firebasestorage.app",
  messagingSenderId: "412356665697",
  appId: "1:412356665697:web:306d3e0a80d6606614e520",
  measurementId: "G-9X1R7E85K2"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db=getFirestore(app);




