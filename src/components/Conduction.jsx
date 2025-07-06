import { motion } from "motion/react";
import "./css/Conduction.css";
import SwipeUp from "./SwipeUp";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../comp/firebaseConfig";
import {
  collection,
  getDocs,
  doc
} from "firebase/firestore";
import { db } from "../comp/firebaseConfig";

export default function Conduction() {
  const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [userType, setUserType] = useState(null); // "contingent" | "individual" | null
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      });
      return () => unsubscribe();
    }, []);
  
    useEffect(() => {
      const checkUserType = async () => {
        if (!user) return;
  
        const contingentRef = collection(db, "Contingent Users'25", user.uid, "profiles");
        const individualRef = collection(db, "Individual Users'25", user.uid, "profiles");
  
        const [contingentSnap, individualSnap] = await Promise.all([
          getDocs(contingentRef),
          getDocs(individualRef)
        ]);
  
        if (!contingentSnap.empty) {
          setUserType("contingent");
        } else if (!individualSnap.empty) {
          setUserType("individual");
        } else {
          setUserType(null);
        }
      };
  
      checkUserType();
    }, [user]);
  return (
    <div className="conduction">
      <SwipeUp>
        <motion.div className="phase-card">
          <div className="header">
            <h1>Phase 1</h1>
            <h3>Online National-Level Quiz</h3>
          </div>
          <hr />
          <div className="info">
            <ul>
              <li>
                <b>Mode</b>: Online
              </li>
              <li>
                <b>Duration</b>: 90 Minutes
              </li>
              <li>
                <b>Syllabus</b>: Logical Reasoning, Verbal Ability, Quantitative
                Aptitude, Sports Trivia
              </li>
              <li>
                <b>Format</b>: Objective-type Questions
              </li>
              <li>
                <b>Selection</b>: Top 100 per pool qualify
              </li>
              <li>
                <b>Outcome</b>: Advance to Final Round
              </li>
            </ul>
          </div>
          <div className="action-tab">
            {/* <Link to={'/register'} className="primary-btn">
              <b>Register Now</b>
            </Link> */}
             {user? (
                  <button className="register-btn primary-btn" type="button" onClick={() => navigate(`/${userType === "contingent" ? "contingent_profile" : "individual_profile"}/${user.uid}`)}>Your Profile</button>
                ):(
                  <button className="register-btn primary-btn" type="button" onClick={() => setShowModal(true)}>Register Now</button>
                )}
          </div>
        </motion.div>
        <motion.div className="phase-card">
          <div className="header">
            <h1>Phase 2</h1>
            <h3>Advanced Challenge Round</h3>
          </div>
          <hr />
          <div className="info">
            <ul>
              <li>
                <b>Mode</b>: Online
              </li>
              <li>
                <b>Duration</b>: 75 Minutes
              </li>
              <li>
                <b>Syllabus</b>: Logical Reasoning, Verbal Ability, Quantitative
                Aptitude, Sports Trivia (Higher Difficulty)
              </li>
              <li>
                <b>Format</b>: Objective-type Questions
              </li>
              <li>
                <b>Special</b>: Exclusive Talks & Exhibitions
              </li>
              <li>
                <b>Selection</b>: Top 3 Winners
              </li>
              <li>
                <b>Rewards</b>: Exciting Prizes + Udghosh Pronite Passes
              </li>
            </ul>
          </div>
          <div className="action-tab">
            <button className="primary-btn">
              <b>Be Ready for Finals</b>
            </button>
          </div>
        </motion.div>
      </SwipeUp>
       {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-[90%] max-w-md animate-fadeIn">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Register As</h3>
            <p className="text-gray-600 text-center mb-6">Choose how you'd like to register</p>

            <div className="flex flex-col gap-4">
              <button
                onClick={() => {
                  setShowModal(false);
                  navigate("/contingent_signup");
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition"
              >
                Contingent
              </button>

              <button
                onClick={() => {
                  setShowModal(false);
                  navigate("/individual_signup");
                }}
                className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition"
              >
                Individual
              </button>

              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 text-sm underline text-center mt-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
