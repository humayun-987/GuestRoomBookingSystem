import { motion } from "motion/react";
import SizedBox from "./SizedBox";
import SwipeUp from "./SwipeUp";
import "./css/PerksRewards.css";

const PerksData = [
  {
    image: "/images/perks_rewards/lecture.jpg",
    heading: "Guest Lectures",
  },
  {
    image: "/images/perks_rewards/merch.jpg",
    heading: "Exciting Prizes",
  },
  {
    image: "/images/perks_rewards/felicitation.jpg",
    heading: "Felicitation Ceremony",
  },
  {
    image: "/images/perks_rewards/exposure.jpeg",
    heading: "IITK Exposure",
  },
];

export default function PerksRewards() {
  return (
    <SizedBox>
      <div className="perks-rewards section-box">
        <div className="heading-section">
          <div>
            <div className="section-name">Perks & Rewards</div>
          </div>
          <SwipeUp>
            <motion.h1 className="section-heading">
              Inspiring rewards, exposure and intellect talks
            </motion.h1>
          </SwipeUp>
        </div>
        <div className="content-section">
          <SwipeUp>

          {PerksData.map((perk, i) => (
            <motion.div
            className="perk-card"
            style={{ "--card-image": `url("${perk.image}")` }}
            >
              {perk.heading}
            </motion.div>
          ))}
          </SwipeUp>
        </div>
      </div>
    </SizedBox>
  );
}
