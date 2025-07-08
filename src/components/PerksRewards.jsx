// import { motion } from "motion/react";
// import SizedBox from "./SizedBox";
// import SwipeUp from "./SwipeUp";
// import "./css/PerksRewards.css";

// const PerksData = [
//   {
//     image: "/images/perks_rewards/lecture.jpg",
//     heading: "Guest Lectures",
//   },
//   {
//     image: "/images/perks_rewards/merch.jpg",
//     heading: "Exciting Prizes",
//   },
//   {
//     image: "/images/perks_rewards/felicitation.jpg",
//     heading: "Felicitation Ceremony",
//   },
//   {
//     image: "/images/perks_rewards/exposure.jpeg",
//     heading: "IITK Exposure",
//   },
// ];

// export default function PerksRewards() {
//   return (
//     <SizedBox>
//       <div className="perks-rewards section-box">
//         <div className="heading-section">
//           <div>
//             <div className="section-name">Perks & Rewards</div>
//           </div>
//           <SwipeUp>
//             <motion.h1 className="section-heading">
//               Inspiring rewards, exposure and intellect talks
//             </motion.h1>
//           </SwipeUp>
//         </div>
//         <div className="content-section">
//           <SwipeUp>

//           {PerksData.map((perk, i) => (
//             <motion.div
//             className="perk-card"
//             style={{ "--card-image": `url("${perk.image}")` }}
//             >
//               {perk.heading}
//             </motion.div>
//           ))}
//           </SwipeUp>
//         </div>
//       </div>
//     </SizedBox>
//   );
// }

import React from "react";
import SizedBox from "./SizedBox";
import SwipeUp from "./SwipeUp";

export default function PerksSection() {
  const perks = [
    {
      title: "Guest Lectures",
      description: "Engage with industry pioneers and thought leaders.",
      image: "/images/perks_rewards/lecture.jpg",
    },
    {
      title: "Exciting Prizes",
      description: "Win gadgets, merch, and rewards worth ₹50K+.",
      image: "/images/perks_rewards/merch.jpg",
    },
    {
      title: "Felicitation Ceremony",
      description: "Be recognized and celebrated for your achievements.",
      image: "/images/perks_rewards/felicitation.jpg",
    },
    {
      title: "IITK Exposure",
      description: "Explore the IIT Kanpur campus and its vibrant culture.",
      image: "/images/perks_rewards/exposure.jpeg",
    },
  ];

  const PerkCard = ({ title, description, image }) => (
    <div className="relative rounded-xl overflow-hidden group shadow-md cursor-pointer transition-transform duration-300 hover:scale-[1.03]">
      <img
        src={image}
        alt={title}
        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-4 left-4 right-4 text-white transform opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-200">{description}</p>
      </div>
    </div>
  );

  return (
    <SizedBox>
      <section className="py-12 px-4 bg-[#fdf6f3]">
        <div className="max-w-6xl mx-auto">
          {/* <p className="text-sm font-semibold uppercase text-orange-400 mb-2">
            Perks &amp; Rewards
          </p> */}
           <div>
             <div className="section-name mb-4">Perks & Rewards</div>
           </div>
          <h2 className="text-xl md:text-4xl font-bold text-gray-900 mb-6 md:mb-10 leading-tight">
            Inspiring rewards, exposure and intellect talks
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {perks.map((perk, idx) => (
              <PerkCard key={idx} {...perk} />
            ))}
          </div>
        </div>
      </section>
    </SizedBox>
  );
}
