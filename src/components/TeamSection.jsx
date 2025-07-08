import React, { useState, useEffect, memo } from "react";
import { FiPhone, FiMail, FiUser } from "react-icons/fi";
import { FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import SizedBox from "./SizedBox";

// Team members data
const teamMembers = [
  {
    name: "Chasity Jones",
    role: "Founder",
    image: "/team1.jpg",
  },
  {
    name: "David Knoxville",
    role: "Lead Developer",
    image: "/team2.jpg",
  },
  {
    name: "Chris Ericson",
    role: "Design Ninja",
    image: "/team3.jpg",
  },
];

// Preload all icons once to prevent hover lag
const PreloadIcons = () => {
  return (
    <div className="invisible absolute">
      <FiPhone />
      <FaLinkedinIn />
      <FiMail />
      <FaWhatsapp />
    </div>
  );
};

// Memoized team card
const TeamCard = memo(({ member }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-lg group hover:scale-[1.03] transition-transform duration-300 will-change-transform">
      {/* Skeleton Loader */}
      {!loaded && (
        <div className="w-full h-[420px] bg-gray-200 flex items-center justify-center animate-pulse">
          <FiUser size={48} className="text-gray-400" />
        </div>
      )}

      {/* Image */}
      <img
        src={member.image}
        alt={member.name}
        onLoad={() => setLoaded(true)}
        className={`w-full h-[420px] object-cover transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
      />

      {/* Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-gray-900 to-transparent p-6 text-white z-10">
        <h3 className="text-xl font-bold">{member.name}</h3>
        <p className="text-sm opacity-90">{member.role}</p>
      </div>

      {/* Social Icons */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        {[FiPhone, FaLinkedinIn, FiMail, FaWhatsapp].map((Icon, i) => (
          <a
            key={i}
            href="#"
            className="bg-white p-3 rounded-full text-gray-700 hover:text-pink-600 hover:scale-110 transition-transform duration-300 will-change-transform"
          >
            <Icon size={18} />
          </a>
        ))}
      </div>
    </div>
  );
});

const TeamSection = () => {
  return (
    <SizedBox>
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="text-left">
            <div className="section-name mb-4">Contact Us</div>
          </div>
          <PreloadIcons />
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {teamMembers.map((member, index) => (
              <TeamCard key={index} member={member} />
            ))}
          </div>
        </div>
      </section>
    </SizedBox>
  );
};

export default TeamSection;
