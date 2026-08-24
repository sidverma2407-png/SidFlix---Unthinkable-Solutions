import { Link } from "react-router-dom";
import { LayoutDashboard, LogOut, ShieldCheck } from "lucide-react";
import { useClerk, UserButton } from "@clerk/clerk-react";

const AdminNavbar = () => {
  const { signOut } = useClerk();

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-10 h-16 bg-black/90 backdrop-blur-xl border-b border-primary/20">
      
      {/* SidFlix Logo */}
      <Link to="/admin" className="flex items-center gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold tracking-tight">
            Sid<span className="text-primary">Flix</span>
          </h1>

          <p className="hidden sm:block text-[9px] uppercase tracking-[0.25em] text-gray-500">
            Admin Dashboard
          </p>
        </div>

        <ShieldCheck className="w-5 h-5 text-primary" />
      </Link>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        <Link
          to="/admin"
          className="hidden sm:flex items-center gap-2 text-sm text-gray-300 hover:text-primary transition"
        >
          <LayoutDashboard className="w-4 h-4" />
          Dashboard
        </Link>

        <div className="h-7 w-px bg-gray-700 hidden sm:block"></div>

        <UserButton />

        <button
          onClick={() => signOut({ redirectUrl: "/" })}
          className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg text-sm bg-primary/10 border border-primary/20 text-primary hover:bg-primary hover:text-white transition"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </header>
  );
};

export default AdminNavbar;