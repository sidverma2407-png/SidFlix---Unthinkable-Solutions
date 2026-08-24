import { Film, Search, Sparkles } from "lucide-react";
import BlurCircle from "../components/BlurCircle";
import MovieCard from "../components/MovieCard";
import { useAppContext } from "../context/AppContext";

const Movies = () => {
  const { shows } = useAppContext();

  return (
    <main className="relative min-h-screen pt-32 pb-24 px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden">
      <BlurCircle top="120px" left="-50px" />
      <BlurCircle bottom="50px" right="-50px" />

      {/* Header */}
      <div className="relative max-w-7xl mx-auto mb-12">
        <div className="flex items-center gap-2 text-primary text-sm font-semibold uppercase tracking-[0.2em] mb-3">
          <Film className="w-4 h-4" />
          SidFlix Movie Collection
        </div>

        <h1 className="text-4xl md:text-5xl font-bold">
          Now <span className="text-primary">Showing</span>
        </h1>

        <p className="text-gray-400 mt-4 max-w-2xl leading-relaxed">
          Explore the latest movies, discover your next favorite story, and
          book your seats for an unforgettable cinema experience.
        </p>

        {shows.length > 0 && (
          <div className="flex items-center gap-2 mt-5 text-sm text-gray-500">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>
              {shows.length} {shows.length === 1 ? "movie" : "movies"} available
              to book
            </span>
          </div>
        )}
      </div>

      {/* Movies Grid */}
      {shows.length > 0 ? (
        <div className="relative max-w-7xl mx-auto flex flex-wrap justify-center lg:justify-start gap-8">
          {shows.map((movie) => (
            <MovieCard movie={movie} key={movie._id} />
          ))}
        </div>
      ) : (
        <div className="relative max-w-2xl mx-auto mt-10 border border-white/10 bg-white/[0.02] rounded-2xl p-10 md:p-14 text-center">
          <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-primary/10 mb-5">
            <Search className="w-7 h-7 text-primary" />
          </div>

          <h2 className="text-2xl font-bold">No Movies Available Yet</h2>

          <p className="text-gray-400 mt-3 leading-relaxed">
            We’re updating the SidFlix collection. Check back soon for new
            movies and showtimes.
          </p>
        </div>
      )}
    </main>
  );
};

export default Movies;