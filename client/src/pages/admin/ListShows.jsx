import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import Title from "../../components/admin/Title";
import { dateFormat } from "../../lib/dateFormat";
import { useAppContext } from "../../context/AppContext";

const ListShows = () => {
  const { axios, getToken, user } = useAppContext();

  const currency = import.meta.env.VITE_CURRENCY;

  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllShow = async () => {
    try {
      const { data } = await axios.get("/api/admin/all-shows", {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });

      if (data.success) {
        setShows(data.shows || []);
      }
    } catch (error) {
      console.error("Error fetching shows:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      getAllShow();
    }
  }, [user]);

  if (loading) return <Loading />;

  return (
    <>
      <Title text1="SidFlix" text2="Shows" />

      <div className="flex items-center justify-between mt-6 mb-4">
        <div>
          <p className="text-lg font-semibold">All Shows</p>
          <p className="text-sm text-gray-400">
            Manage movies currently scheduled on SidFlix
          </p>
        </div>

        <p className="text-sm text-primary">
          {shows.length} Show{shows.length !== 1 ? "s" : ""}
        </p>
      </div>

      {shows.length > 0 ? (
        <div className="max-w-5xl overflow-x-auto rounded-xl border border-primary/20">
          <table className="w-full border-collapse text-nowrap">
            <thead>
              <tr className="bg-primary/20 text-left text-white">
                <th className="p-3 font-medium pl-5">Movie Name</th>
                <th className="p-3 font-medium">Show Time</th>
                <th className="p-3 font-medium">Bookings</th>
                <th className="p-3 font-medium">Earnings</th>
              </tr>
            </thead>

            <tbody>
              {shows.map((show, index) => {
                const totalBookings = Object.keys(
                  show.occupiedSeats || {}
                ).length;

                const earnings = totalBookings * (show.showPrice || 0);

                return (
                  <tr
                    key={show._id || index}
                    className="border-b border-primary/10 bg-primary/5 even:bg-primary/10 hover:bg-primary/15 transition"
                  >
                    <td className="p-3 min-w-50 pl-5 font-medium">
                      {show.movie?.title || "Unknown Movie"}
                    </td>

                    <td className="p-3 text-gray-300">
                      {dateFormat(show.showDateTime)}
                    </td>

                    <td className="p-3">
                      {totalBookings}
                    </td>

                    <td className="p-3 text-primary font-medium">
                      {currency}
                      {earnings}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-8 py-16 text-center border border-primary/20 rounded-xl bg-primary/5">
          <p className="text-xl font-semibold">No shows available</p>
          <p className="text-gray-400 text-sm mt-2">
            Add a movie show from the Add Shows section.
          </p>
        </div>
      )}
    </>
  );
};

export default ListShows;