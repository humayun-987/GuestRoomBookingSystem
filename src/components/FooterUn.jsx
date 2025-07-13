import { motion } from "motion/react";
import SizedBox from "./SizedBox";
import SwipeUp from "./SwipeUp";
import "./css/FooterUn.css";
import { Link } from "react-router-dom";

const QuickLinks = [
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
  {
    label: "Contingent form",
    to: "/school_contingent_form",
  },
];

export default function PerksRewards() {
  return (
    <SizedBox outerClassName="footer-outer">
      <div className="footer section-box">
        <div className="info-box">
          <div className="info">
            <h1>UNOSQ</h1>
            <h4>
              UNOSQ is not just a quiz; it's a celebration of intellect and sportsmanship, offering participants the chance to interact with academic luminaries and celebrated sports personalities through specially curated seminars and workshops.
            </h4>
          </div>
          <div className="quick-links">
            <h2>Quick Links</h2>
            <ul>
              {QuickLinks.map((e) => (
  <li key={e.label}>
    {e.to.startsWith("/#") ? (
      <a
        href={e.to}
        onClick={(eClick) => {
          eClick.preventDefault();
          const id = e.to.replace("/#", "");
          const section = document.getElementById(id);
          if (section) {
            section.scrollIntoView({ behavior: "smooth" });
          }
        }}
      >
        {e.label}
      </a>
    ) : (
      <Link to={e.to}>{e.label}</Link>
    )}
  </li>
))}

            </ul>
          </div>
          <div className="contact">
            <h2>Contact Info</h2>
            <div className="address">IIT Kanpur, UP 208016</div>
            <div className="email"><a href={`mailto: Unosq.udghosh@gmail.com`}>Unosq.udghosh@gmail.com</a></div>
            <div className="mobile">+91 8619757403</div>
          </div>
        </div>
        <div className="credits flex">
          <span>@ 2025</span> <a href="https://udghosh.org.in/home">Udghosh</a><span> - IIT Kanpur. All rights reserved.</span>
        </div>
      </div>
    </SizedBox>
  );
}