import { ArrowRight, Film } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BlurCircle from "./BlurCircle";
import MovieCard from "./MovieCard";
import { useAppContext } from "../context/AppContext";

const FeaturedSection = () => {
  const navigate = useNavigate();
  const { shows } = useAppContext();

  const handleMoviesClick = () => {
    navigate("/movies");
    window.scrollTo(0, 0);
  };

  return (
    <section className="relative px-6 md:px-16 lg:px-24 xl:px-44 py-20 overflow-hidden">
      <BlurCircle top="20px" right="-80px" />

      {/* Section Header */}
      <div className="relative flex flex-col sm:flex-row sm:items-end justify-between gap-5 pb-10">
        <div>
          <div className="flex items-center gap-2 text-primary text-sm font-semibold uppercase tracking-[0.2em] mb-3">
            <Film className="w-4 h-4" />
            SidFlix Collection
          </div>

          <h2 className="text-3xl md:text-4xl font-bold">
            Now <span className="text-primary">Showing</span>
          </h2>

          <p className="text-gray-400 mt-3 max-w-md">
            Discover the latest movies and reserve your favorite seats with
            SidFlix.
          </p>
        </div>

        <button
          onClick={handleMoviesClick}
          className="group flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-primary transition cursor-pointer"
        >
          View All Movies
          <ArrowRight className="group-hover:translate-x-1 transition w-5 h-5" />
        </button>
      </div>

      {/* Movies */}
      {shows.length > 0 ? (
        <div className="relative flex flex-wrap justify-center lg:justify-start gap-8">
          {shows.slice(0, 4).map((show) => (
            <MovieCard key={show._id} movie={show} />
          ))}
        </div>
      ) : (
        <div className="relative border border-white/10 rounded-2xl p-10 text-center bg-white/[0.02]">
          <Film className="w-10 h-10 mx-auto text-primary mb-4" />

          <h3 className="text-xl font-semibold">No Movies Available Yet</h3>

          <p className="text-gray-400 mt-2">
            New movies and shows will appear here soon.
          </p>
        </div>
      )}

      {/* CTA */}
      <div className="relative flex justify-center mt-16">
        <button
          onClick={handleMoviesClick}
          className="group flex items-center gap-2 px-8 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-semibold cursor-pointer shadow-lg shadow-primary/10"
        >
          Explore All Movies
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
        </button>
      </div>
    </section>
  );
};

export default FeaturedSection;