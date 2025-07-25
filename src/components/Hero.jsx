import SizedBox from "./SizedBox";
import SwipeUp from "./SwipeUp";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import "./css/Hero.css";
import { useNavigate, Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../comp/firebaseConfig";
import { collection, getDocs, doc } from "firebase/firestore";
import { db } from "../comp/firebaseConfig";
import { IoInformationCircleSharp } from "react-icons/io5";

export default function Hero() {
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

      const contingentRef = collection(
        db,
        "Contingent Users'25",
        user.uid,
        "profiles"
      );
      const individualRef = collection(
        db,
        "Individual Users'25",
        user.uid,
        "profiles"
      );

      const [contingentSnap, individualSnap] = await Promise.all([
        getDocs(contingentRef),
        getDocs(individualRef),
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
    <SizedBox className="nav-hero-box">
      <div className="hero">
        <div className="hero-text-img-box">
          <div className="hero-text">
            <SwipeUp>
              <motion.h1>
                UNOSQ <span>Unleashing Young Minds</span>
              </motion.h1>

              <motion.h2>
                India's Premier Open Quiz Competition for School Students by IIT
                Kanpur
              </motion.h2>

              <motion.p>
                Join thousands of brilliant young minds from across the nation
                in this ultimate test of knowledge, creativity and quick
                thinking with Exciting Prizes, Inspiring Talks and much more
              </motion.p>

              <motion.div className="hero-btn-box">
                {/* <Link to={"/register"} className="register-btn primary-btn">
                  <span>Register Now</span>
                  <RxPaperPlane />
                </Link> */}
                {user ? (
                  <button
                    className="register-btn primary-btn"
                    type="button"
                    onClick={() =>
                      navigate(
                        `/${
                          userType === "contingent"
                            ? "contingent_profile"
                            : "individual_profile"
                        }/${user.uid}`
                      )
                    }
                  >
                    Your Profile
                  </button>
                ) : (
                  <button
                    className="register-btn primary-btn"
                    type="button"
                    onClick={() => setShowModal(true)}
                  >
                    Register Now
                  </button>
                )}
                <div>
                  Only <b>20</b> days left to register!
                </div>
              </motion.div>
            </SwipeUp>
          </div>

          <div className="hero-img">
            <img src="/images/hero/hero.svg" alt="Students Raising Hands" />
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-[90%] max-w-md animate-fadeIn">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
              Register As
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Choose how you'd like to register
            </p>

            <div className="flex flex-col gap-4">
              <button
                onClick={() => {
                  setShowModal(false);
                  navigate("/contingent_signup");
                }}
                className="register-type-btn bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition"
              >
                Contingent
              </button>

              <button
                onClick={() => {
                  setShowModal(false);
                  navigate("/individual_signup");
                }}
                className="register-type-btn bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition"
              >
                Individual
              </button>

              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 text-sm underline text-center mt-2"
              >
                Cancel
              </button>
              <div className="help">
                <IoInformationCircleSharp/> Watch Registration <a target="_blank" href="/videos/contingent.mp4">Contingent</a> and <a target="_blank" href="/videos/indivisual.mp4">Individual</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </SizedBox>
  );
}
