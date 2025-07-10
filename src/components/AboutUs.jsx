import { motion } from "motion/react";
import SizedBox from "./SizedBox";
import SwipeUp from "./SwipeUp";
import "./css/AboutUs.css";
import Conduction from "./Conduction";

export default function AboutUs() {
  return (
    <SizedBox>
      <div id="about" className="about-us section-box">
        <div className="basic-info">
          <div className="img-section">
            <div>
              <div className="section-name">About Us</div>
            </div>
            <div>
              <img src="/images/about_us/about_us.svg" alt="About Us" />
            </div>
          </div>
          <div className="content-section">
            <SwipeUp>
              <motion.h1 className="section-heading">
                Empowering Future Champions
              </motion.h1>
              <motion.p className="section-content">
                UNOSQ is not just a quiz; it's a celebration of intellect and
                sportsmanship, offering participants the chance to interact with
                academic luminaries and celebrated sports personalities through
                specially curated seminars and workshops.
              </motion.p>
              <motion.div className="stats">
                <div className="stats-data-card">
                  <div className="stats-data section-sub-heading">5+ Years</div>
                  <div className="stats-label section-content">Education</div>
                </div>
                <div className="stats-data-card">
                  <div className="stats-data section-sub-heading">5000+</div>
                  <div className="stats-label section-content">Students</div>
                </div>
                <div className="stats-data-card">
                  <div className="stats-data section-sub-heading">100+</div>
                  <div className="stats-label section-content">Schools</div>
                </div>
                <div className="stats-data-card">
                  <div className="stats-data section-sub-heading">25+</div>
                  <div className="stats-label section-content">Mentors</div>
                </div>
              </motion.div>
            </SwipeUp>
          </div>
        </div>
        <Conduction/>
      </div>
    </SizedBox>
  );
}
