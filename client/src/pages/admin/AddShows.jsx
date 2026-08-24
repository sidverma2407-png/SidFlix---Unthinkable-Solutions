import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import Title from "../../components/admin/Title";
import {
  CalendarPlus,
  CheckIcon,
  Clapperboard,
  Clock3,
  DeleteIcon,
  IndianRupee,
  Plus,
  StarIcon,
} from "lucide-react";
import { kConverter } from "../../lib/kConverter";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AddShows = () => {
  const { axios, getToken, user, image_base_url } = useAppContext();

  const currency = import.meta.env.VITE_CURRENCY || "₹";

  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [dateTimeSelection, setDateTimeSelection] = useState({});
  const [dateTimeInput, setDateTimeInput] = useState("");
  const [showPrice, setShowPrice] = useState("");
  const [addingShow, setAddingShow] = useState(false);

  const fetchNowPlayingMovies = async () => {
    try {
      const { data } = await axios.get("/api/show/now-playing", {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });

      if (data.success) {
        setNowPlayingMovies(data.movies || []);
      } else {
        toast.error(data.message || "Unable to fetch movies");
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      toast.error("Unable to fetch now playing movies");
    }
  };

  const handleDateTimeAdd = () => {
    if (!dateTimeInput) {
      return toast.error("Please select a date and time");
    }

    const [date, time] = dateTimeInput.split("T");

    if (!date || !time) {
      return toast.error("Invalid date or time");
    }

    setDateTimeSelection((prev) => {
      const times = prev[date] || [];

      if (times.includes(time)) {
        toast("This show time is already added");
        return prev;
      }

      return {
        ...prev,
        [date]: [...times, time],
      };
    });

    setDateTimeInput("");
    toast.success("Show time added");
  };

  const handleRemoveTime = (date, time) => {
    setDateTimeSelection((prev) => {
      const filteredTimes = prev[date].filter((item) => item !== time);

      if (filteredTimes.length === 0) {
        const { [date]: removedDate, ...rest } = prev;
        return rest;
      }

      return {
        ...prev,
        [date]: filteredTimes,
      };
    });
  };

  const handleSubmit = async () => {
    if (!selectedMovie) {
      return toast.error("Please select a movie");
    }

    if (Object.keys(dateTimeSelection).length === 0) {
      return toast.error("Please add at least one show time");
    }

    if (!showPrice || Number(showPrice) <= 0) {
      return toast.error("Please enter a valid show price");
    }

    try {
      setAddingShow(true);

      const showsInput = Object.entries(dateTimeSelection).map(
        ([date, time]) => ({
          date,
          time,
        })
      );

      const payload = {
        movieId: selectedMovie,
        showsInput,
        showPrice: Number(showPrice),
      };

      const { data } = await axios.post("/api/show/add", payload, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });

      if (data.success) {
        toast.success(data.message || "Show added successfully");

        setSelectedMovie(null);
        setDateTimeSelection({});
        setDateTimeInput("");
        setShowPrice("");
      } else {
        toast.error(data.message || "Unable to add show");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(
        error.response?.data?.message ||
          "An error occurred while adding the show"
      );
    } finally {
      setAddingShow(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchNowPlayingMovies();
    }
  }, [user]);

  if (nowPlayingMovies.length === 0) {
    return <Loading />;
  }

  const selectedMovieData = nowPlayingMovies.find(
    (movie) => movie.id === selectedMovie
  );

  return (
    <div className="pb-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-[0.22em] mb-3">
          <Clapperboard className="w-4 h-4" />
          SidFlix Administration
        </div>

        <Title text1="Add" text2="Shows" />

        <p className="text-sm text-gray-400 mt-3">
          Select a movie, configure show timings and publish it on SidFlix.
        </p>
      </div>

      {/* Movie Selection */}
      <section className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 md:p-6">
        <div className="flex items-center justify-between gap-4 mb-5">
          <div>
            <h2 className="text-lg font-semibold">Select a Movie</h2>
            <p className="text-sm text-gray-500 mt-1">
              Choose a currently playing movie for your cinema.
            </p>
          </div>

          <span className="text-xs text-primary bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full">
            {nowPlayingMovies.length} Movies
          </span>
        </div>

        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-max">
            {nowPlayingMovies.map((movie) => (
              <button
                type="button"
                key={movie.id}
                onClick={() => setSelectedMovie(movie.id)}
                className={`relative w-40 text-left rounded-xl overflow-hidden border transition duration-300 ${
                  selectedMovie === movie.id
                    ? "border-primary ring-2 ring-primary/30 -translate-y-1"
                    : "border-white/10 hover:border-primary/40 hover:-translate-y-1"
                }`}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={image_base_url + movie.poster_path}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

                  {selectedMovie === movie.id && (
                    <div className="absolute top-2 right-2 flex items-center justify-center bg-primary h-7 w-7 rounded-full shadow-lg">
                      <CheckIcon
                        className="w-4 h-4 text-white"
                        strokeWidth={3}
                      />
                    </div>
                  )}

                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1 bg-black/50 backdrop-blur px-2 py-1 rounded-full">
                      <StarIcon className="w-3 h-3 text-primary fill-primary" />
                      {movie.vote_average?.toFixed(1)}
                    </span>

                    <span className="bg-black/50 backdrop-blur px-2 py-1 rounded-full text-gray-300">
                      {kConverter(movie.vote_count)} votes
                    </span>
                  </div>
                </div>

                <div className="p-3">
                  <p className="font-medium text-sm truncate">{movie.title}</p>
                  <p className="text-gray-500 text-xs mt-1">
                    {movie.release_date?.split("-")[0] || "N/A"}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {selectedMovieData && (
          <div className="mt-5 flex items-center gap-3 bg-primary/5 border border-primary/20 rounded-xl p-3">
            <CheckIcon className="w-5 h-5 text-primary shrink-0" />

            <div>
              <p className="text-xs text-gray-500">SELECTED MOVIE</p>
              <p className="font-medium">{selectedMovieData.title}</p>
            </div>
          </div>
        )}
      </section>

      {/* Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
        {/* Price */}
        <section className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 md:p-6">
          <div className="flex items-center gap-2 mb-2">
            <IndianRupee className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">Ticket Price</h2>
          </div>

          <p className="text-sm text-gray-500 mb-5">
            Set the ticket price for this show.
          </p>

          <div className="flex items-center border border-white/10 focus-within:border-primary/50 bg-black/20 rounded-xl overflow-hidden">
            <span className="px-4 text-primary font-semibold">{currency}</span>

            <input
              min="1"
              type="number"
              value={showPrice}
              onChange={(e) => setShowPrice(e.target.value)}
              placeholder="Enter ticket price"
              className="w-full bg-transparent outline-none px-3 py-3 text-sm"
            />
          </div>
        </section>

        {/* Date Time */}
        <section className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 md:p-6">
          <div className="flex items-center gap-2 mb-2">
            <CalendarPlus className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">Show Schedule</h2>
          </div>

          <p className="text-sm text-gray-500 mb-5">
            Add one or multiple dates and show timings.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="datetime-local"
              value={dateTimeInput}
              onChange={(e) => setDateTimeInput(e.target.value)}
              className="flex-1 min-w-0 bg-black/20 border border-white/10 focus:border-primary/50 outline-none rounded-xl px-3 py-3 text-sm"
            />

            <button
              type="button"
              onClick={handleDateTimeAdd}
              className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-dull px-5 py-3 rounded-xl font-medium text-sm transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Add Time
            </button>
          </div>
        </section>
      </div>

      {/* Selected Schedule */}
      {Object.keys(dateTimeSelection).length > 0 && (
        <section className="mt-5 bg-white/[0.03] border border-white/10 rounded-2xl p-5 md:p-6">
          <div className="flex items-center gap-2 mb-5">
            <Clock3 className="w-5 h-5 text-primary" />
            <div>
              <h2 className="text-lg font-semibold">Selected Schedule</h2>
              <p className="text-sm text-gray-500">
                Review the timings before publishing the show.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {Object.entries(dateTimeSelection).map(([date, times]) => (
              <div
                key={date}
                className="border border-white/10 rounded-xl p-4"
              >
                <p className="font-medium mb-3">{date}</p>

                <div className="flex flex-wrap gap-2">
                  {times.map((time) => (
                    <div
                      key={time}
                      className="flex items-center gap-2 bg-primary/10 border border-primary/25 px-3 py-2 rounded-lg text-sm"
                    >
                      <Clock3 className="w-3.5 h-3.5 text-primary" />
                      <span>{time}</span>

                      <button
                        type="button"
                        onClick={() => handleRemoveTime(date, time)}
                        className="ml-1 text-gray-400 hover:text-red-400 transition cursor-pointer"
                        title="Remove time"
                      >
                        <DeleteIcon className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Submit */}
      <div className="flex items-center justify-between flex-wrap gap-4 mt-7">
        <p className="text-xs text-gray-500">
          Make sure the movie, price and schedule are correct before publishing.
        </p>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={addingShow}
          className="flex items-center gap-2 bg-primary hover:bg-primary-dull disabled:opacity-60 disabled:cursor-not-allowed text-white px-7 py-3 rounded-xl font-medium transition cursor-pointer"
        >
          <Clapperboard className="w-4 h-4" />

          {addingShow ? "Publishing..." : "Publish Show"}
        </button>
      </div>
    </div>
  );
};

export default AddShows;