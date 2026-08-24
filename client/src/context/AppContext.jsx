import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [shows, setShows] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  const image_base_url = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

  const { user } = useUser();
  const { getToken } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Check whether the logged-in user is an admin
  const fetchIsAdmin = async () => {
    try {
      if (!user) {
        setIsAdmin(false);
        return false;
      }

      const token = await getToken();

      if (!token) {
        setIsAdmin(false);
        return false;
      }

      const { data } = await axios.get("/api/admin/is-admin", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const adminStatus = Boolean(data.isAdmin);

      setIsAdmin(adminStatus);

      if (!adminStatus && location.pathname.startsWith("/admin")) {
        navigate("/");
        toast.error("You are not authorized to access the SidFlix admin panel");
      }

      return adminStatus;
    } catch (error) {
      console.error(
        "Error checking admin status:",
        error.response?.data || error.message
      );

      setIsAdmin(false);
      return false;
    }
  };

  // Fetch all available movie shows
  const fetchShows = async () => {
    try {
      const { data } = await axios.get("/api/show/all");

      if (data.success) {
        setShows(data.shows || []);
      } else {
        setShows([]);
        toast.error(data.message || "Unable to fetch SidFlix shows");
      }
    } catch (error) {
      console.error(
        "Error fetching shows:",
        error.response?.data || error.message
      );
      setShows([]);
      toast.error("Unable to fetch SidFlix shows");
    }
  };

  // Fetch user's favorite movies
  const fetchFavoriteMovies = async () => {
    try {
      if (!user) {
        setFavoriteMovies([]);
        return;
      }

      const token = await getToken();

      if (!token) {
        setFavoriteMovies([]);
        return;
      }

      const { data } = await axios.get("/api/user/favorites", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setFavoriteMovies(data.movies || []);
      } else {
        setFavoriteMovies([]);
      }
    } catch (error) {
      console.error(
        "Error fetching favorites:",
        error.response?.data || error.message
      );
      setFavoriteMovies([]);
    }
  };

  // Load public SidFlix shows
  useEffect(() => {
    fetchShows();
  }, []);

  // Load user-specific data after login
  useEffect(() => {
    if (user) {
      fetchIsAdmin();
      fetchFavoriteMovies();
    } else {
      setIsAdmin(false);
      setFavoriteMovies([]);
    }
  }, [user]);

  const value = {
    axios,
    user,
    getToken,
    navigate,

    // Admin
    isAdmin,
    fetchIsAdmin,

    // Shows
    shows,
    fetchShows,

    // Favorites
    favoriteMovies,
    fetchFavoriteMovies,

    // TMDB Images
    image_base_url,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);