import React from "react";
import { ArrowRight, CalendarIcon, ClockIcon, Ticket } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className='relative flex flex-col items-start justify-center gap-5 px-6 md:px-16 lg:px-36 bg-[url("/backgroundImage.png")] bg-cover bg-center h-screen overflow-hidden'>
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-start gap-5">
        <div className="flex items-center gap-2 text-primary font-semibold text-sm tracking-[0.25em] uppercase">
          <Ticket className="w-4 h-4" />
          SidFlix Presents
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight max-w-4xl">
          Your Next <br />
          <span className="text-primary">Cinema Experience</span>
          <br />
          Starts Here.
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-gray-300">
          <span>Movies • Shows • Premium Experiences</span>

          <div className="flex items-center gap-1">
            <CalendarIcon className="w-4 h-4" />
            2026
          </div>

          <div className="flex items-center gap-1">
            <ClockIcon className="w-4 h-4" />
            Book in Seconds
          </div>
        </div>

        <p className="max-w-xl text-gray-300 leading-relaxed">
          Discover the latest movies, choose your favorite seats, and book your
          perfect cinema experience with SidFlix.
        </p>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => navigate("/movies")}
            className="flex items-center gap-2 px-7 py-3 bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer shadow-lg"
          >
            Explore Movies
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={() => navigate("/movies")}
            className="px-7 py-3 border border-white/30 hover:bg-white/10 transition rounded-full font-medium cursor-pointer"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;