import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import SizedBox from "./SizedBox";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../comp/firebaseConfig"; // make sure path is correct
import "./css/NavigationBar.css";
import {
  collection,
  getDocs,
  doc
} from "firebase/firestore";
import { db } from "../comp/firebaseConfig";

const NavItems = [
  {
    label: "About",
    to: "/#about",
  },
  {
    label: "Brochure",
    to: "https://drive.usercontent.google.com/u/0/uc?id=12eOYQRaA81OAGWeMCmwZ7xQnuFeAPvhW&export=download",
  },
  {
    label: "Contact",
    to: "#",
  },
  {
    label: "FAQs",
    to: "/FAQ",
  },
];

export default function NavigationBar() {
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
    <>
      <SizedBox outerClassName="outer-nav-box">
        <nav>
          <Link className="logo-div" to={"/"}>
            <img src="/images/UNOSQ_logo.png" alt="UNOSQ Logo" />
            UNOSQ
          </Link>

          <input
            type="checkbox"
            name="menu-toggle-checkbox"
            id="menu-toggle-checkbox"
            hidden
          />

          <label htmlFor="menu-toggle-checkbox" className="menu-toggle">
            <FiMenu />
          </label>

          <ul className="nav-links flex items-center">
            {NavItems.map((e, i) => (
              <Link to={e.to} key={i}>
                {e.label}
              </Link>
            ))}
            {/* Show Profile button only if user is logged in */}
            {user && (
              <Link
                to={`/${userType === "contingent" ? "contingent_profile" : "individual_profile"}/${user.uid}`}
                className="profile-link"
              >
                Profile
              </Link>
            )}
          </ul>
        </nav>
      </SizedBox>
    </>
  );
}
