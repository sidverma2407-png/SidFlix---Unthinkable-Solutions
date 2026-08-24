import {
  ChartLineIcon,
  CircleDollarSignIcon,
  PlayCircleIcon,
  StarIcon,
  UsersIcon,
  Clapperboard,
  TrendingUp,
  Ticket,
} from "lucide-react";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import Title from "../../components/admin/Title";
import BlurCircle from "../../components/BlurCircle";
import { dateFormat } from "../../lib/dateFormat";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { axios, getToken, user, image_base_url } = useAppContext();

  const currency = import.meta.env.VITE_CURRENCY || "₹";

  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    activeShows: [],
    totalUser: 0,
  });

  const [loading, setLoading] = useState(true);

  const dashboardCards = [
    {
      title: "Total Bookings",
      value: dashboardData.totalBookings ?? 0,
      icon: Ticket,
      description: "Tickets reserved on SidFlix",
    },
    {
      title: "Total Revenue",
      value: `${currency}${dashboardData.totalRevenue ?? 0}`,
      icon: CircleDollarSignIcon,
      description: "Revenue generated from bookings",
    },
    {
      title: "Active Shows",
      value: dashboardData.activeShows?.length ?? 0,
      icon: PlayCircleIcon,
      description: "Movies currently available",
    },
    {
      title: "Total Users",
      value: dashboardData.totalUser ?? 0,
      icon: UsersIcon,
      description: "Registered SidFlix users",
    },
  ];

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get("/api/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });

      if (data.success) {
        setDashboardData({
          totalBookings: data.dashboardData?.totalBookings ?? 0,
          totalRevenue: data.dashboardData?.totalRevenue ?? 0,
          activeShows: data.dashboardData?.activeShows ?? [],
          totalUser: data.dashboardData?.totalUser ?? 0,
        });
      } else {
        toast.error(data.message || "Unable to load dashboard");
      }
    } catch (error) {
      console.log(error);
      toast.error("Unable to fetch dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="relative min-h-full">
      <BlurCircle top="-120px" left="-120px" />

      {/* Header */}
      <div className="relative z-10">
        <div className="flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-[0.22em] mb-3">
          <Clapperboard className="w-4 h-4" />
          SidFlix Administration
        </div>

        <Title text1="Admin" text2="Dashboard" />

        <p className="text-sm text-gray-400 mt-3">
          Monitor your cinema shows, bookings, revenue and audience from one
          place.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-8">
        {dashboardCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="group relative overflow-hidden bg-white/[0.04] border border-white/10 hover:border-primary/40 rounded-2xl p-5 transition duration-300 hover:-translate-y-1"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />

              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">
                    {card.title}
                  </p>

                  <p className="text-2xl md:text-3xl font-bold mt-3">
                    {card.value}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-primary/10 border border-primary/15">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
              </div>

              <p className="relative text-xs text-gray-500 mt-4">
                {card.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Active Shows */}
      <section className="relative z-10 mt-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-[0.2em]">
              <TrendingUp className="w-4 h-4" />
              Currently Running
            </div>

            <h2 className="text-2xl md:text-3xl font-bold mt-2">
              Active <span className="text-primary">Shows</span>
            </h2>

            <p className="text-sm text-gray-400 mt-2">
              Movies currently available for booking on SidFlix.
            </p>
          </div>

          <div className="text-sm text-gray-500">
            {dashboardData.activeShows?.length ?? 0} active shows
          </div>
        </div>

        {dashboardData.activeShows?.length > 0 ? (
          <div className="relative flex flex-wrap gap-5">
            <BlurCircle top="100px" left="-10%" />

            {dashboardData.activeShows.map((show) => (
              <div
                key={show._id}
                className="relative z-10 group w-full sm:w-[220px] overflow-hidden rounded-2xl bg-white/[0.04] border border-white/10 hover:border-primary/40 transition duration-300 hover:-translate-y-1"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={image_base_url + show.movie.poster_path}
                    alt={show.movie.title}
                    className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  <div className="absolute bottom-3 left-3 bg-primary/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold">
                    ACTIVE
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold truncate">
                    {show.movie.title}
                  </h3>

                  <div className="flex items-center justify-between mt-3">
                    <p className="text-lg font-bold text-primary">
                      {currency}
                      {show.showPrice}
                    </p>

                    <div className="flex items-center gap-1 text-sm text-gray-400">
                      <StarIcon className="w-4 h-4 text-primary fill-primary" />
                      {show.movie.vote_average?.toFixed(1) || "N/A"}
                    </div>
                  </div>

                  <div className="border-t border-white/10 mt-4 pt-3">
                    <p className="text-xs text-gray-500">NEXT SHOW</p>

                    <p className="text-xs text-gray-300 mt-1">
                      {show.showDateTime
                        ? dateFormat(show.showDateTime)
                        : "Schedule unavailable"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-white/10 bg-white/[0.03] rounded-2xl p-10 text-center">
            <PlayCircleIcon className="w-10 h-10 text-primary mx-auto mb-4" />

            <h3 className="text-xl font-semibold">No Active Shows</h3>

            <p className="text-sm text-gray-400 mt-2">
              Add a movie show from the admin panel to start accepting
              bookings.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;