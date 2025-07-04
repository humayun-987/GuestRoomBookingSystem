import "./css/SponsorsMarquee.css";
import SizedBox from "./SizedBox";

const SponsorsData = [
  {
    logo: "/images/sponsers/extramarks.png",
    name: "Extramarks",
    website: "#",
  },
  {
    logo: "/images/sponsers/physics_wallah.png",
    name: "Physicas Wallah",
    website: "#",
  },
  {
    logo: "/images/sponsers/speedexam.png",
    name: "SpeedExam",
    website: "#",
  },
  {
    logo: "/images/sponsers/extramarks.png",
    name: "Extramarks",
    website: "#",
  },
  {
    logo: "/images/sponsers/physics_wallah.png",
    name: "Physicas Wallah",
    website: "#",
  },
  {
    logo: "/images/sponsers/speedexam.png",
    name: "SpeedExam",
    website: "#",
  },
];

export default function SponsorsMarquee() {
  let cardWidth = 120;
  let cardGap = 50;
  let animationDuration = 20;
  let itemCount = SponsorsData.length;

  return (
    <SizedBox>
      <div className="sponcers-marquee">
        {SponsorsData.map((sponsor, i) => {
          return (
            <div
              className="sponsor-card"
              style={{
                "--card-width": `${cardWidth}px`,
                "--card-gap": `${cardGap}px`,
                left: `max(${(cardGap + cardWidth) * itemCount}px, 100%)`,
                animationDuration: `${animationDuration}s`,
                animationDelay: `${
                  (animationDuration / itemCount) * (i - itemCount - 1)
                }s`,
              }}
              key={i}
            >
              <img src={sponsor.logo} alt={sponsor.name} />
            </div>
          );
        })}
      </div>
    </SizedBox>
  );
}
