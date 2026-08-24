import AdminNavbar from "../../components/admin/AdminNavbar";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { Outlet } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";

const Layout = () => {
  const { isAdmin, fetchIsAdmin } = useAppContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        await fetchIsAdmin();
      } catch (error) {
        console.error("Error checking admin access:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-black">
        <div className="text-center border border-primary/20 bg-primary/5 rounded-2xl p-8 max-w-md">
          <p className="text-primary text-sm font-semibold tracking-widest uppercase">
            SidFlix Admin
          </p>

          <h1 className="text-2xl font-bold mt-3">
            Access Restricted
          </h1>

          <p className="text-gray-400 text-sm mt-3 leading-relaxed">
            You don't have permission to access the SidFlix admin dashboard.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <AdminNavbar />

      <div className="flex">
        <AdminSidebar />

        <main className="flex-1 px-4 py-8 md:px-10 md:py-10 h-[calc(100vh-64px)] overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;