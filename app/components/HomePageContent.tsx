"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import HeroSlider from "./HeroSlider";

const Hero = dynamic(() => import("./Hero"), { ssr: false });
const EventsSection = dynamic(() => import("./Events"), { ssr: false });
const Expectations = dynamic(() => import("./Expectations"), { ssr: false });
const UsSection = dynamic(() => import("./UseSection"), { ssr: false });
const WhyChooseUs = dynamic(() => import("./WhyChooseUs"), { ssr: false });

export default function HomePageContent() {
  return (
    <>
      <HeroSlider />
      <Suspense fallback={<div className="w-full h-[95vh] bg-slate-50 animate-pulse" />}>
        <Hero />
      </Suspense>
      <Suspense fallback={<div className="w-full h-[800px] bg-slate-50 animate-pulse" />}>
        <UsSection />
      </Suspense>
      <Suspense fallback={<div className="w-full h-[700px] bg-slate-50 animate-pulse" />}>
        <EventsSection />
      </Suspense>
      <Suspense fallback={<div className="w-full h-[600px] bg-slate-50 animate-pulse" />}>
        <Expectations />
      </Suspense>
      <Suspense fallback={<div className="w-full h-[1200px] bg-slate-50 animate-pulse" />}>
        <WhyChooseUs />
      </Suspense>
    </>
  );
}
