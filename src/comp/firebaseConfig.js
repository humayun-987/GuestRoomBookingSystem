// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyAuOtlHe1QQaZRgpXaFVC3cgPgcmhp68IY",
//   authDomain: "my-unosq.firebaseapp.com",
//   projectId: "my-unosq",
//   storageBucket: "my-unosq.firebasestorage.app",
//   messagingSenderId: "412356665697",
//   appId: "1:412356665697:web:306d3e0a80d6606614e520",
//   measurementId: "G-9X1R7E85K2"
// };
// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app);

// export const db=getFirestore(app);

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAPJyLwFTSVaBj9H3JyB81EdJaSE4hjluM",
  authDomain: "unosq-23-1.firebaseapp.com",
  databaseURL: "https://unosq-23-1-default-rtdb.firebaseio.com",
  projectId: "unosq-23-1",
  storageBucket: "unosq-23-1.firebasestorage.app",
  messagingSenderId: "842602193414",
  appId: "1:842602193414:web:5a67f90ba1cd1e041bd987",
  measurementId: "G-4GZNPN14WH"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db=getFirestore(app);
