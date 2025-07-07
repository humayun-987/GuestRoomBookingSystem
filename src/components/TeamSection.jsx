// import React from "react";
// import { FiPhone, FiMail } from "react-icons/fi";
// import { FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
// import SizedBox from "./SizedBox";

// const teamMembers = [
//   {
//     name: "Chasity Jones",
//     role: "Founder",
//     image: "/team1.jpg",
//   },
//   {
//     name: "David Knoxville",
//     role: "Lead Developer",
//     image: "/team2.jpg",
//   },
//   {
//     name: "Chris Ericson",
//     role: "Design Ninja",
//     image: "/team3.jpg",
//   },
// ];

// const TeamSection = () => {
//   return (
//     <SizedBox>
//       <section className="py-16">
//         <div className="max-w-6xl mx-auto px-4 text-center">
//           {/* <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-12">
//             Meet The Team
//           </h2> */}
//           <div className="text-left">
//             <div className="section-name mb-4">Contact Us</div>
//           </div>
//           <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
//             {teamMembers.map((member, index) => (
//               <div
//                 key={index}
//                 className="relative rounded-2xl overflow-hidden shadow-lg group hover:scale-105 transition-transform duration-300"
//               >
//                 {/* Team Image */}
//                 <img
//                   src={member.image}
//                   alt={member.name}
//                   className="w-full h-[420px] object-cover"
//                 />

//                 {/* Gradient Overlay */}
//                 <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-pink-600/90 to-transparent p-6 text-white z-10">
//                   <h3 className="text-xl font-bold">{member.name}</h3>
//                   <p className="text-sm opacity-90">{member.role}</p>
//                 </div>

//                 {/* Social Icons */}
//                 <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
//                   <a href="#" className="bg-white p-3 rounded-full text-gray-700 hover:text-pink-600 hover:scale-110 transition-transform duration-300">
//                     <FiPhone size={18} />
//                   </a>
//                   <a href="#" className="bg-white p-3 rounded-full text-gray-700 hover:text-pink-600 hover:scale-110 transition-transform duration-300">
//                     <FaLinkedinIn size={18} />
//                   </a>
//                   <a href="#" className="bg-white p-3 rounded-full text-gray-700 hover:text-pink-600 hover:scale-110 transition-transform duration-300">
//                     <FiMail size={18} />
//                   </a>
//                   <a href="#" className="bg-white p-3 rounded-full text-gray-700 hover:text-pink-600 hover:scale-110 transition-transform duration-300">
//                     <FaWhatsapp size={18} />
//                   </a>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </SizedBox>
//   );
// };

// export default TeamSection;

import React, { useState } from "react";
import { FiPhone, FiMail } from "react-icons/fi";
import { FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import SizedBox from "./SizedBox";

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

const TeamCard = ({ member }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-lg group hover:scale-105 transition-transform duration-300">
      {/* Skeleton Placeholder */}
      {!loaded && (
        <div className="w-full h-[420px] bg-gray-200 flex items-center justify-center animate-pulse">
          <div className="border-4 border-gray-400 rounded-full p-4">
            <FiUser size={48} className="text-gray-400" />
          </div>
        </div>
      )}

      {/* Team Image */}
      <img
        src={member.image}
        alt={member.name}
        onLoad={() => setLoaded(true)}
        className={`w-full h-[420px] object-cover transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"
          }`}
      />

      {/* Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-gray-900 to-transparent p-6 text-white z-10">
        <h3 className="text-xl font-bold">{member.name}</h3>
        <p className="text-sm opacity-90">{member.role}</p>
      </div>

      {/* Social Icons */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <a
          href="#"
          className="bg-white p-3 rounded-full text-gray-700 hover:text-pink-600 hover:scale-110 transition-transform duration-300"
        >
          <FiPhone size={18} />
        </a>
        <a
          href="#"
          className="bg-white p-3 rounded-full text-gray-700 hover:text-pink-600 hover:scale-110 transition-transform duration-300"
        >
          <FaLinkedinIn size={18} />
        </a>
        <a
          href="#"
          className="bg-white p-3 rounded-full text-gray-700 hover:text-pink-600 hover:scale-110 transition-transform duration-300"
        >
          <FiMail size={18} />
        </a>
        <a
          href="#"
          className="bg-white p-3 rounded-full text-gray-700 hover:text-pink-600 hover:scale-110 transition-transform duration-300"
        >
          <FaWhatsapp size={18} />
        </a>
      </div>
    </div>
  );
};

const TeamSection = () => {
  return (
    <SizedBox>
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="text-left">
            <div className="section-name mb-4">Contact Us</div>
          </div>
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
