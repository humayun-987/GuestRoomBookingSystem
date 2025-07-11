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
import { Helmet } from "react-helmet";

function Home() {
  return (
    <>
      <Helmet>
        <title>UNOSQ'25 | Udghosh, IIT Kanpur</title>
        <meta
          name="description"
          content="Register for Udghosh National Open Science Quiz 2025, conducted by Udghosh, IIT Kanpur during the Annual Sports Festival."
        />
      </Helmet>
      <NavigationBar />
      <Hero />
      <SponsorsMarquee />
      <AboutUs />
      <Timeline />
      <SamplePapers />
      {/* <Sponsors /> */}
      <PerksRewards />
      <TeamSection />
      <FooterUn />
    </>
  );
}

export default Home;
