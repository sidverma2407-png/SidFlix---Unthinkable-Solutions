import { useState } from "react";
import { dummyTrailers } from "../assets/assets";
import ReactPlayer from "react-player";
import BlurCircle from "./BlurCircle";
import { PlayCircleIcon, Clapperboard } from "lucide-react";

const TrailersSection = () => {
  const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0]);

  return (
    <section
      id="trailers"
      className="relative px-6 md:px-16 lg:px-24 xl:px-44 py-20 overflow-hidden"
    >
      {/* Header */}
      <div className="max-w-[960px] mx-auto mb-8">
        <div className="flex items-center gap-2 text-primary text-sm font-semibold uppercase tracking-[0.2em] mb-3">
          <Clapperboard className="w-4 h-4" />
          SidFlix Exclusives
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">
              Watch the <span className="text-primary">Trailers</span>
            </h2>

            <p className="text-gray-400 mt-3">
              Get a preview of the biggest movies before you book your seats.
            </p>
          </div>

          <span className="text-sm text-gray-500">
            Select a trailer below
          </span>
        </div>
      </div>

      {/* Video */}
      <div className="relative max-w-[960px] mx-auto">
        <BlurCircle top="-100px" right="-100px" />

        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
          <ReactPlayer
            url={currentTrailer.videoUrl}
            controls
            className="max-w-full"
            width="100%"
            height="540px"
          />
        </div>
      </div>

      {/* Trailer Thumbnails */}
      <div className="group grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 mt-8 max-w-[960px] mx-auto">
        {dummyTrailers.map((trailer) => {
          const isActive =
            currentTrailer.videoUrl === trailer.videoUrl;

          return (
            <button
              key={trailer.image}
              type="button"
              onClick={() => setCurrentTrailer(trailer)}
              className={`relative overflow-hidden rounded-xl cursor-pointer transition duration-300
                ${
                  isActive
                    ? "ring-2 ring-primary scale-[1.02]"
                    : "opacity-70 hover:opacity-100 hover:-translate-y-1"
                }`}
            >
              <img
                src={trailer.image}
                alt="Movie trailer"
                className="w-full aspect-video object-cover brightness-75 transition duration-300 hover:brightness-100"
              />

              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <PlayCircleIcon
                  strokeWidth={1.7}
                  className="w-9 h-9 md:w-11 md:h-11 text-white drop-shadow-lg"
                />
              </div>

              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 bg-primary py-1 text-[10px] font-semibold text-center">
                  NOW PLAYING
                </div>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default TrailersSection;