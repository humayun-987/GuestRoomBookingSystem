import { motion } from "motion/react";
import SizedBox from "./SizedBox";
import SwipeUp from "./SwipeUp";
import "./css/FooterUn.css";
import { Link } from "react-router-dom";
import { BiLogoFacebook, BiLogoInstagram, BiLogoYoutube, BiLogoWhatsapp, BiLogoLinkedin, BiLogoTwitter } from "react-icons/bi";

const QuickLinks = [
  {
    label: "About",
    to: "/#about",
  },
  {
    label: "Brochure",
    to: "https://drive.google.com/uc?export=download&id=1WZc74KWeDX9V8KYyEHcJ49bUcjv-Puq6",
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
            <div className="email">
              <a href="mailto:Unosq.udghosh@gmail.com">Unosq.udghosh@gmail.com</a>
            </div>
            <div className="mobile">+91 8619757403</div>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="social-links">
  <a href="https://www.facebook.com/udghosh.iitk" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
    <BiLogoFacebook className="icon" />
  </a>
  <a href="https://www.instagram.com/udghosh_iitk/?hl=en" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
    <BiLogoInstagram className="icon" />
  </a>
  <a href="https://www.youtube.com/channel/UCWA2to9SqSEWHOU7MmiTPCw" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
    <BiLogoYoutube className="icon" />
  </a>
  <a href="https://whatsapp.com/channel/0029Vb5lN5wHQbS9nLwj9A0d" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
    <BiLogoWhatsapp className="icon" />
  </a>
  <a href="https://www.linkedin.com/company/udghosh-iit-kanpur-fest/mycompany/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
    <BiLogoLinkedin className="icon" />
  </a>
  <a href="https://twitter.com/udghoshiitk23" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
    <BiLogoTwitter className="icon" />
  </a>
</div>



        <div className="credits flex justify-center">
          <span>@ 2025</span>{" "}
          <a href="https://udghosh.org.in/home">Udghosh</a>
          <span> - IIT Kanpur. All rights reserved.</span>
        </div>
      </div>
    </SizedBox>
  );
}
