import SizedBox from "./SizedBox";
import SwipeUp from "./SwipeUp";
import { motion } from "motion/react";
import { RxPaperPlane } from "react-icons/rx";
import "./css/Hero.css";
import { Link } from "react-router";

export default function Hero() {
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
                <Link to={"/register"} className="register-btn primary-btn">
                  <span>Register Now</span>
                  <RxPaperPlane />
                </Link>
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
    </SizedBox>
  );
}
