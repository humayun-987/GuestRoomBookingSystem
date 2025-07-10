import React, { useState, useEffect, memo } from "react";
import { FiPhone, FiMail, FiUser } from "react-icons/fi";
import { FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import SizedBox from "./SizedBox";

// Team members data
const teamMembers = [
  {
    name: "Mantresh Dhahava",
    role: "Head, UNOSQ",
    image: "https://live.staticflickr.com/65535/54641512144_c1cf2758be_b.jpg",
    phone: "8619757403",
    email: "mantreshdhahava178@gmail.com",
    whatsapp: "8619757403"
  },
  {
    name: "Amrit Raj",
    role: "Head, UNOSQ",
    image: "https://live.staticflickr.com/65535/54644408122_14e7f4c981_b.jpg",
    phone: "7061491478",
    email: "amritr22@iitk.ac.in",
    whatsapp: "7061491478",
  },
  {
    name: "Vansh Mina",
    role: "Head, UNOSQ",
    image: "https://live.staticflickr.com/65535/54645751486_0619dd8f61_c.jpg",
    phone: "9468545955",
    email: "Vanshmeena201@gmail.com",
    whatsapp: "9468545955",
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
      {/* Skeleton Loader
      {!loaded && (
        <div className="w-full h-[420px] bg-gray-200 flex items-center justify-center animate-pulse">
          <FiUser size={48} className="text-gray-400" />
        </div>
      )} */}

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
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">

        {member.phone && (
          <a
            href={`tel:${member.phone}`}
            className="bg-white p-3 rounded-full text-gray-700 hover:text-pink-600 hover:scale-110 transition-transform duration-300"
          >
            <FiPhone size={18} />
          </a>
        )}
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-3 rounded-full text-gray-700 hover:text-pink-600 hover:scale-110 transition-transform duration-300"
          >
            <FaLinkedinIn size={18} />
          </a>
        )}
        {member.email && (
          <a
            href={`mailto:${member.email}`}
            className="bg-white p-3 rounded-full text-gray-700 hover:text-pink-600 hover:scale-110 transition-transform duration-300"
          >
            <FiMail size={18} />
          </a>
        )}
        {member.whatsapp && (
          <a
            href={`https://wa.me/${member.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-3 rounded-full text-gray-700 hover:text-pink-600 hover:scale-110 transition-transform duration-300"
          >
            <FaWhatsapp size={18} />
          </a>
        )}
      </div>
    </div>
  );
});

const TeamSection = () => {
  return (
    <SizedBox>
      <section id="contact" className="py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="text-left">
            <div className="section-name mb-8">Contact Us</div>
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
