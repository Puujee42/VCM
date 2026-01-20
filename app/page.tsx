import Image from "next/image";
import HeroSlider from "./components/HeroSlider";
import Hero from "./components/Hero";
import EventsSection from "./components/Events";
import Expectations from "./components/Expectations";
import UsSection from "./components/UseSection";
import WhyChooseUs from "./components/WhyChooseUs";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <Hero />
      <UsSection />
      <EventsSection />
      <Expectations />
      <WhyChooseUs />
    </>
  );
}
