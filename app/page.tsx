import Image from "next/image";
import dynamic from "next/dynamic";
import HeroSlider from "./components/HeroSlider";
import Hero from "./components/Hero";

const EventsSection = dynamic(() => import("./components/Events"));
const Expectations = dynamic(() => import("./components/Expectations"));
const UsSection = dynamic(() => import("./components/UseSection"));
const WhyChooseUs = dynamic(() => import("./components/WhyChooseUs"));

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
