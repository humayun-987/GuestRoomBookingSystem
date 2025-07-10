import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import SizedBox from "./SizedBox";
import { onAuthStateChanged } from "firebase/auth";
import { HashLink } from "react-router-hash-link";
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
    to: "https://drive.google.com/uc?export=download&id=1bkV3ZTR2b8pnVE0uvT98L1Fh5xR2e4Ob",
  },
  {
    label: "Contact",
    to: "/#contact",
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
            {NavItems.map((e, i) =>
              e.to.includes("#") ? (
                <HashLink
                  smooth
                  to={e.to}
                  key={i}
                  onClick={(event) => {
                    const id = e.to.split("#")[1];
                    const target = document.getElementById(id);
                    if (target) {
                      target.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  {e.label}
                </HashLink>
              ) : (
                <Link to={e.to} key={i}>
                  {e.label}
                </Link>
              )
            )}
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
