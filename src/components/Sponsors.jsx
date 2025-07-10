import React from "react";
import "./PhotoTicker.css";
import SizedBox from "./SizedBox";

const SponsorsData = [
  {
    logo: "/images/sponsers/extramarks.png",
    name: "Extramarks",
    website: "https://www.extramarks.com",
  },
  {
    logo: "/images/sponsers/physics_wallah.png",
    name: "Physics Wallah",
    website: "https://www.pw.live",
  },
  {
    logo: "/images/sponsers/speedexam.png",
    name: "SpeedExam",
    website: "https://www.speedexam.net",
  },
  {
    logo: "/images/sponsers/extramarks.png",
    name: "Extramarks",
    website: "https://www.extramarks.com",
  },
  {
    logo: "/images/sponsers/physics_wallah.png",
    name: "Physics Wallah",
    website: "https://www.pw.live",
  },
  {
    logo: "/images/sponsers/speedexam.png",
    name: "SpeedExam",
    website: "https://www.speedexam.net",
  },
];

const Sponsors = () => {
  const doubledSponsors = SponsorsData.concat(SponsorsData); // Loop for scroll

  return (
    <SizedBox>
      <section id="sponsors" className="py-20 overflow-hidden bg-[hsl(27, 100%, 98%)]">
        <div className="flex flex-col gap-10 max-w-6xl mx-auto px-4">
          <div className="text-left m-4 md:m-8">
            <div className="inline-block bg-[#fde7d6] text-black font-semibold rounded-full px-6 py-2 text-sm border-2 border-[#fde7d6]">
              PREVIOUS SPONSORS
            </div>
          </div>

          <div className="relative">
            {/* Edge fade */}
            <div className="fade-left hidden md:block"></div>
            <div className="fade-right hidden md:block"></div>

            <div className="photo-ticker flex items-center">
              {doubledSponsors.map((sponsor, index) => (
                <a
                  href={sponsor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={index}
                  className="ticker-card flex justify-center items-center"
                >
                  <img
                    src={sponsor.logo}
                    alt={sponsor.name}
                    className="ticker-img"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SizedBox>
  );
};

export default Sponsors;