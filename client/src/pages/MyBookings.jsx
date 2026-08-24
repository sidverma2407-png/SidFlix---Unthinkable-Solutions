import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import BlurCircle from "../components/BlurCircle";
import timeFormat from "../lib/timeFormat";
import { dateFormat } from "../lib/dateFormat";
import { useAppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  Clock,
  Ticket,
  CreditCard,
  MapPin,
  Armchair,
} from "lucide-react";

const MyBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY;

  const { axios, getToken, user, image_base_url } = useAppContext();

  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getMyBookings = async () => {
    try {
      const { data } = await axios.get("/api/user/bookings", {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });

      if (data.success) {
        setBookings(data.bookings);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      getMyBookings();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="relative min-h-screen px-6 md:px-16 lg:px-32 xl:px-40 pt-32 md:pt-40 pb-24 overflow-hidden">
      {/* Background Effects */}
      <BlurCircle top="100px" left="-100px" />
      <BlurCircle bottom="100px" right="-100px" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-primary text-xs font-semibold tracking-[0.22em] uppercase">
            <Ticket className="w-4 h-4" />
            SidFlix Account
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mt-3">
            My Bookings
          </h1>

          <p className="text-gray-400 mt-2">
            Manage and view all your SidFlix cinema experiences.
          </p>
        </div>

        {/* Stats */}
        {bookings.length > 0 && (
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 min-w-40">
              <p className="text-xs text-gray-500 uppercase tracking-wider">
                Total Bookings
              </p>
              <p className="text-2xl font-bold mt-1">{bookings.length}</p>
            </div>

            <div className="bg-primary/10 border border-primary/20 rounded-xl px-5 py-4 min-w-40">
              <p className="text-xs text-gray-400 uppercase tracking-wider">
                Tickets Booked
              </p>
              <p className="text-2xl font-bold text-primary mt-1">
                {bookings.reduce(
                  (total, booking) =>
                    total + (booking.bookedSeats?.length || 0),
                  0
                )}
              </p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {bookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center min-h-[400px] bg-white/[0.03] border border-white/10 rounded-2xl p-10">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-5">
              <Ticket className="w-8 h-8 text-primary" />
            </div>

            <h2 className="text-2xl font-semibold">No bookings yet</h2>

            <p className="text-gray-400 max-w-md mt-3">
              Your next big-screen experience is waiting. Explore movies and
              book your favorite seats with SidFlix.
            </p>

            <Link
              to="/movies"
              className="mt-6 bg-primary hover:bg-primary-dull transition px-7 py-3 rounded-full font-medium"
            >
              Explore Movies
            </Link>
          </div>
        ) : (
          /* Booking Cards */
          <div className="space-y-5">
            {bookings.map((item) => (
              <div
                key={item._id}
                className="group relative flex flex-col lg:flex-row overflow-hidden bg-white/[0.04] border border-white/10 hover:border-primary/30 rounded-2xl transition duration-300"
              >
                {/* Poster */}
                <div className="relative w-full lg:w-52 shrink-0">
                  <img
                    src={image_base_url + item.show.movie.poster_path}
                    alt={item.show.movie.title}
                    className="w-full h-56 lg:h-full min-h-56 object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/40 via-transparent to-transparent" />
                </div>

                {/* Booking Details */}
                <div className="flex-1 p-5 md:p-6">
                  <div className="flex flex-col md:flex-row md:justify-between gap-5">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`text-xs px-3 py-1 rounded-full border ${
                            item.isPaid
                              ? "text-green-400 bg-green-400/10 border-green-400/20"
                              : "text-yellow-400 bg-yellow-400/10 border-yellow-400/20"
                          }`}
                        >
                          {item.isPaid ? "CONFIRMED" : "PAYMENT PENDING"}
                        </span>
                      </div>

                      <h2 className="text-xl md:text-2xl font-bold">
                        {item.show.movie.title}
                      </h2>

                      <p className="text-gray-400 text-sm mt-2">
                        {timeFormat(item.show.movie.runtime)}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="md:text-right">
                      <p className="text-xs text-gray-500 uppercase tracking-wider">
                        Total Amount
                      </p>

                      <p className="text-2xl font-bold text-primary mt-1">
                        {currency}
                        {item.amount}
                      </p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-white/10 my-5" />

                  {/* Information */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-start gap-3">
                      <CalendarDays className="w-5 h-5 text-primary shrink-0" />
                      <div>
                        <p className="text-gray-500 text-xs">DATE & TIME</p>
                        <p className="mt-1">
                          {dateFormat(item.show.showDateTime)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Armchair className="w-5 h-5 text-primary shrink-0" />
                      <div>
                        <p className="text-gray-500 text-xs">YOUR SEATS</p>
                        <p className="mt-1 font-medium">
                          {item.bookedSeats.join(", ")}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Ticket className="w-5 h-5 text-primary shrink-0" />
                      <div>
                        <p className="text-gray-500 text-xs">TICKETS</p>
                        <p className="mt-1">
                          {item.bookedSeats.length}{" "}
                          {item.bookedSeats.length === 1
                            ? "Ticket"
                            : "Tickets"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Payment */}
                  {!item.isPaid && (
                    <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-yellow-400/5 border border-yellow-400/10 rounded-xl p-4">
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-5 h-5 text-yellow-400" />

                        <div>
                          <p className="font-medium text-sm">
                            Complete your payment
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Your seats will be confirmed after payment.
                          </p>
                        </div>
                      </div>

                      <Link
                        to={item.paymentLink}
                        className="text-center bg-primary hover:bg-primary-dull transition px-5 py-2.5 text-sm rounded-full font-medium whitespace-nowrap"
                      >
                        Pay Now
                      </Link>
                    </div>
                  )}

                  {/* Confirmed Footer */}
                  {item.isPaid && (
                    <div className="mt-6 flex items-center gap-2 text-sm text-gray-400">
                      <Clock className="w-4 h-4 text-primary" />
                      Booking confirmed. Enjoy your SidFlix experience!
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;