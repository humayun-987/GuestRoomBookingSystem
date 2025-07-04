import NavigationBar from "../components/NavigationBar";
import Hero from "../components/Hero";
import SponsorsMarquee from "../components/SponsorsMarquee";
import AboutUs from "../components/AboutUs";
import PerksRewards from "../components/PerksRewards";

function Home() {
  return (
    <>
      <NavigationBar />
      <Hero />
      <SponsorsMarquee />
      <AboutUs />
      <PerksRewards />
    </>
  );
}

export default Home;
