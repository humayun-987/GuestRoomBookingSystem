import NavigationBar from "../components/NavigationBar";
import Hero from "../components/Hero";
import SponsorsMarquee from "../components/SponsorsMarquee";
import AboutUs from "../components/AboutUs";
import Timeline from "../components/Timeline";
import PerksRewards from "../components/PerksRewards";
import FooterUn from "../components/FooterUn";

function Home() {
  return (
    <>
      <NavigationBar />
      <Hero />
      <SponsorsMarquee />
      <AboutUs />
      <Timeline/>
      <PerksRewards />
      <FooterUn/>
    </>
  );
}

export default Home;
