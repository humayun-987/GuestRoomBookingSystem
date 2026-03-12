import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB5TkteFtQLNTrLp__6fpI14Dn_HE8_FbI",
  authDomain: "guest-room-ff8d5.firebaseapp.com",
  projectId: "guest-room-ff8d5",
  storageBucket: "guest-room-ff8d5.firebasestorage.app",
  messagingSenderId: "512659304864",
  appId: "1:512659304864:web:7923cecc98fa6edca7f4c5",
  measurementId: "G-XRDHT5KZP3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db=getFirestore(app);
