import { motion } from "motion/react";
import "./css/Conduction.css";
import SwipeUp from "./SwipeUp";
import { Link } from "react-router";

export default function Conduction() {
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
            <Link to={'/register'} className="primary-btn">
              <b>Register Now</b>
            </Link>
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
    </div>
  );
}
