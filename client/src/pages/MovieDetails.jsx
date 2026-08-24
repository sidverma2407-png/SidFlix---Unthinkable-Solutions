import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BlurCircle from "../components/BlurCircle";
import {
  Heart,
  PlayCircleIcon,
  StarIcon,
  CalendarDays,
  Clock3,
  Film,
} from "lucide-react";
import timeFormat from "../lib/timeFormat";
import DateSelect from "../components/DateSelect";
import MovieCard from "../components/MovieCard";
import Loading from "../components/Loading";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const MovieDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [show, setShow] = useState(null);

  const {
    shows,
    axios,
    getToken,
    user,
    fetchFavoriteMovies,
    favoriteMovies,
    image_base_url,
  } = useAppContext();

  const getShow = async () => {
    try {
      const { data } = await axios.get(`/api/show/${id}`);

      if (data.success) {
        setShow(data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Unable to load movie details");
    }
  };

  const handleFavorite = async () => {
    try {
      if (!user) {
        return toast.error("Please sign in to add favorites");
      }

      const { data } = await axios.post(
        "/api/user/update-favorite",
        { movieId: id },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      if (data.success) {
        await fetchFavoriteMovies();
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getShow();
  }, [id]);

  if (!show) return <Loading />;

  const isFavorite = favoriteMovies.find(
    (movie) => movie._id === id
  );

  const releaseYear = show.movie.release_date
    ? show.movie.release_date.split("-")[0]
    : "N/A";

  return (
    <main className="relative min-h-screen pt-32 pb-24 px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden">
      <BlurCircle top="120px" left="-100px" />
      <BlurCircle top="400px" right="-120px" />

      {/* Movie Details */}
      <section className="relative max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          {/* Poster */}
          <div className="flex-shrink-0">
            <img
              src={image_base_url + show.movie.poster_path}
              alt={show.movie.title}
              className="mx-auto md:mx-0 rounded-2xl h-[480px] w-[320px] max-w-full object-cover border border-white/10 shadow-2xl"
            />
          </div>

          {/* Details */}
          <div className="relative flex flex-col justify-center">
            <div className="flex items-center gap-2 text-primary text-sm font-semibold uppercase tracking-[0.2em] mb-4">
              <Film className="w-4 h-4" />
              Now Showing on SidFlix
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-3xl">
              {show.movie.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mt-5 text-sm text-gray-300">
              <div className="flex items-center gap-1.5">
                <StarIcon className="w-5 h-5 text-primary fill-primary" />
                <span className="font-medium">
                  {show.movie.vote_average?.toFixed(1) || "N/A"}
                </span>
                <span className="text-gray-500">User Rating</span>
              </div>

              <span className="hidden sm:block w-1 h-1 rounded-full bg-gray-600" />

              <div className="flex items-center gap-1.5">
                <CalendarDays className="w-4 h-4 text-primary" />
                {releaseYear}
              </div>

              <span className="hidden sm:block w-1 h-1 rounded-full bg-gray-600" />

              <div className="flex items-center gap-1.5">
                <Clock3 className="w-4 h-4 text-primary" />
                {timeFormat(show.movie.runtime)}
              </div>
            </div>

            <p className="text-gray-400 mt-6 leading-relaxed max-w-2xl">
              {show.movie.overview}
            </p>

            {/* Genres */}
            <div className="flex flex-wrap gap-2 mt-6">
              {show.movie.genres?.map((genre) => (
                <span
                  key={genre.id || genre.name}
                  className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-gray-300"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center flex-wrap gap-4 mt-8">
              <a
                href="#dateSelect"
                className="flex items-center gap-2 px-7 py-3.5 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-semibold cursor-pointer active:scale-95"
              >
                <CalendarDays className="w-5 h-5" />
                Book Tickets
              </a>

              <button
                type="button"
                className="flex items-center gap-2 px-7 py-3.5 text-sm bg-white/5 border border-white/10 hover:bg-white/10 transition rounded-full font-medium cursor-pointer active:scale-95"
              >
                <PlayCircleIcon className="w-5 h-5 text-primary" />
                Watch Trailer
              </button>

              <button
                type="button"
                onClick={handleFavorite}
                aria-label="Add to favorites"
                className={`p-3.5 rounded-full border transition cursor-pointer active:scale-95 ${
                  isFavorite
                    ? "bg-primary/15 border-primary/40"
                    : "bg-white/5 border-white/10 hover:bg-white/10"
                }`}
              >
                <Heart
                  className={`w-5 h-5 ${
                    isFavorite
                      ? "fill-primary text-primary"
                      : "text-white"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Cast */}
      {show.movie.casts?.length > 0 && (
        <section className="relative max-w-6xl mx-auto mt-24">
          <div className="mb-8">
            <p className="text-primary text-sm font-semibold uppercase tracking-[0.2em]">
              The Stars
            </p>

            <h2 className="text-3xl font-bold mt-2">
              Meet the <span className="text-primary">Cast</span>
            </h2>
          </div>

          <div className="overflow-x-auto no-scrollbar pb-4">
            <div className="flex items-start gap-5 w-max">
              {show.movie.casts.slice(0, 12).map((cast, index) => (
                <div
                  key={cast.id || index}
                  className="flex flex-col items-center text-center w-24"
                >
                  {cast.profile_path ? (
                    <img
                      src={image_base_url + cast.profile_path}
                      alt={cast.name}
                      className="rounded-full h-20 w-20 object-cover border border-white/10"
                    />
                  ) : (
                    <div className="rounded-full h-20 w-20 bg-white/10 flex items-center justify-center">
                      <Film className="w-7 h-7 text-gray-500" />
                    </div>
                  )}

                  <p className="font-medium text-xs mt-3 line-clamp-2">
                    {cast.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Show Dates */}
      <section className="relative max-w-6xl mx-auto mt-24">
        <div className="mb-6">
          <p className="text-primary text-sm font-semibold uppercase tracking-[0.2em]">
            Reserve Your Seat
          </p>

          <h2 className="text-3xl font-bold mt-2">
            Choose a <span className="text-primary">Showtime</span>
          </h2>
        </div>

        <DateSelect dateTime={show.dateTime} id={id} />
      </section>

      {/* Recommendations */}
      {shows.length > 0 && (
        <section className="relative max-w-6xl mx-auto mt-24">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-primary text-sm font-semibold uppercase tracking-[0.2em]">
                More to Explore
              </p>

              <h2 className="text-3xl font-bold mt-2">
                You May Also <span className="text-primary">Like</span>
              </h2>
            </div>

            <button
              onClick={() => {
                navigate("/movies");
                window.scrollTo(0, 0);
              }}
              className="hidden sm:block text-sm text-gray-400 hover:text-primary transition cursor-pointer"
            >
              View All Movies →
            </button>
          </div>

          <div className="flex flex-wrap max-sm:justify-center gap-8">
            {shows
              .filter((movie) => movie._id !== id)
              .slice(0, 4)
              .map((movie) => (
                <MovieCard key={movie._id} movie={movie} />
              ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default MovieDetails;