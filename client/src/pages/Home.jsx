import React from "react";
import HeroSection from "../components/HeroSection";
import FeaturedSection from "../components/FeaturedSection";
import TrailersSection from "../components/TrailersSection";

const Home = () => {
  return (
    <main className="min-h-screen bg-[#09090f]">
      <HeroSection />

      <section id="featured">
        <FeaturedSection />
      </section>

      <section id="trailers">
        <TrailersSection />
      </section>
    </main>
  );
};

export default Home;