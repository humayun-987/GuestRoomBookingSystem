import NavigationBar from "../components/NavigationBar";
import Hero from "../components/Hero";
import SponsorsMarquee from "../components/SponsorsMarquee";
import AboutUs from "../components/AboutUs";
import PerksRewards from "../components/PerksRewards";
import Timeline from "../components/Timeline";
import SamplePapers from "../components/SamplePapers";
import Sponsors from "../components/Sponsors";
import TeamSection from "../components/TeamSection";
import FooterUn from "../components/FooterUn";

function Home() {
  return (
    <>
      <NavigationBar />
      <Hero />
      <SponsorsMarquee />
      <AboutUs />
      <Timeline />
      <SamplePapers />
      {/* <Sponsors /> */}
      <PerksRewards />
      {/* <TeamSection /> */}
      <FooterUn/>
    </>
  );
}

export default Home;
