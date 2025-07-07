
import { motion } from "motion/react";
import SizedBox from "./SizedBox";
import SwipeUp from "./SwipeUp";
import "./css/FooterUn.css";
import { Link } from "react-router-dom";

const QuickLinks = [
  {
    label: "About",
    to: "/",
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

export default function PerksRewards() {
  return (
    <SizedBox outerClassName="footer-outer">
      <div className="footer section-box">
        <div className="info-box">
          <div className="info">
            <h1>UNOSQ</h1>
            <h4>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis,
              repellendus vitae voluptas fugit nemo corrupti consectetur
              officiis dignissimos delectus similique asperiores sed saepe
              necessitatibus placeat?
            </h4>
          </div>
          <div className="quick-links">
            <h2>Quick Links</h2>
            <ul>
              {QuickLinks.map((e) => (
                <li>
                  <Link to={e.to}>{e.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="contact">
            <h2>Contact Info</h2>
            <div className="address">IIT Kanpur, UP 208018</div>
            <div className="email">unosq@iitk.ac.in</div>
            <div className="mobile">+91 123 456 7891</div>
          </div>
        </div>
        <div className="credits">
          @ 2025 UNOSQ - IIT Kanpur. All rights reserved.
        </div>
      </div>
    </SizedBox>
  );
}
