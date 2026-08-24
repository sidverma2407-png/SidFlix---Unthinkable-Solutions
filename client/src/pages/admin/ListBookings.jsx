import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import Title from "../../components/admin/Title";
import { dateFormat } from "../../lib/dateFormat";
import { useAppContext } from "../../context/AppContext";

const ListBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY;

  const { axios, getToken, user } = useAppContext();

  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAllBookings = async () => {
    try {
      const { data } = await axios.get("/api/admin/all-bookings", {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });

      if (data.success) {
        setBookings(data.bookings || []);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      getAllBookings();
    }
  }, [user]);

  if (isLoading) return <Loading />;

  return (
    <>
      <Title text1="SidFlix" text2="Bookings" />

      <div className="flex items-center justify-between mt-6 mb-4">
        <div>
          <p className="text-lg font-semibold">All Bookings</p>
          <p className="text-sm text-gray-400">
            View and manage all cinema bookings on SidFlix
          </p>
        </div>

        <p className="text-sm text-primary">
          {bookings.length} Booking{bookings.length !== 1 ? "s" : ""}
        </p>
      </div>

      {bookings.length > 0 ? (
        <div className="max-w-6xl overflow-x-auto rounded-xl border border-primary/20">
          <table className="w-full border-collapse text-nowrap">
            <thead>
              <tr className="bg-primary/20 text-left text-white">
                <th className="p-3 font-medium pl-5">Customer</th>
                <th className="p-3 font-medium">Movie</th>
                <th className="p-3 font-medium">Show Time</th>
                <th className="p-3 font-medium">Seats</th>
                <th className="p-3 font-medium">Amount</th>
                <th className="p-3 font-medium">Status</th>
              </tr>
            </thead>

            <tbody className="text-sm">
              {bookings.map((item, index) => {
                const seats = Array.isArray(item.bookedSeats)
                  ? item.bookedSeats.join(", ")
                  : Object.values(item.bookedSeats || {}).join(", ");

                return (
                  <tr
                    key={item._id || index}
                    className="border-b border-primary/10 bg-primary/5 even:bg-primary/10 hover:bg-primary/15 transition"
                  >
                    <td className="p-3 min-w-40 pl-5 font-medium">
                      {item.user?.name || "Unknown User"}
                    </td>

                    <td className="p-3 min-w-40">
                      {item.show?.movie?.title || "Unknown Movie"}
                    </td>

                    <td className="p-3 text-gray-300">
                      {item.show?.showDateTime
                        ? dateFormat(item.show.showDateTime)
                        : "N/A"}
                    </td>

                    <td className="p-3 max-w-45 truncate">
                      {seats || "N/A"}
                    </td>

                    <td className="p-3 font-medium text-primary">
                      {currency}
                      {item.amount || 0}
                    </td>

                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          item.isPaid
                            ? "bg-green-500/15 text-green-400"
                            : "bg-yellow-500/15 text-yellow-400"
                        }`}
                      >
                        {item.isPaid ? "Paid" : "Pending"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-8 py-16 text-center border border-primary/20 rounded-xl bg-primary/5">
          <p className="text-xl font-semibold">No bookings yet</p>
          <p className="text-gray-400 text-sm mt-2">
            Customer bookings will appear here once tickets are booked.
          </p>
        </div>
      )}
    </>
  );
};

export default ListBookings;