import {
  CalendarPlus,
  LayoutDashboard,
  List,
  ReceiptText,
  ShieldCheck,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const AdminSidebar = () => {
  const { user } = useUser();

  const adminNavlinks = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Add Shows",
      path: "/admin/add-shows",
      icon: CalendarPlus,
    },
    {
      name: "List Shows",
      path: "/admin/list-shows",
      icon: List,
    },
    {
      name: "Bookings",
      path: "/admin/list-bookings",
      icon: ReceiptText,
    },
  ];

  return (
    <aside className="h-[calc(100vh-64px)] flex flex-col w-16 md:w-64 shrink-0 border-r border-primary/15 bg-black/40">
      
      {/* Admin Profile */}
      <div className="flex flex-col items-center md:items-start md:flex-row gap-3 px-3 md:px-5 pt-7 pb-6 border-b border-primary/10">
        {user?.imageUrl ? (
          <img
            src={user.imageUrl}
            alt="Admin profile"
            className="h-10 w-10 md:h-11 md:w-11 rounded-full border border-primary/30"
          />
        ) : (
          <div className="h-10 w-10 md:h-11 md:w-11 rounded-full bg-primary/20 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-primary" />
          </div>
        )}

        <div className="hidden md:block min-w-0">
          <p className="font-semibold truncate">
            {user?.fullName || user?.firstName || "SidFlix Admin"}
          </p>
          <p className="text-xs text-primary mt-0.5">
            Administrator
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 w-full py-5">
        <p className="hidden md:block px-5 mb-3 text-[10px] uppercase tracking-[0.2em] text-gray-500">
          Management
        </p>

        {adminNavlinks.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/admin"}
              className={({ isActive }) =>
                `relative flex items-center justify-center md:justify-start gap-3 mx-2 md:mx-3 mb-2 px-3 md:px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-primary text-white shadow-lg"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <Icon className="w-5 h-5 shrink-0" />

              <span className="hidden md:block text-sm font-medium">
                {link.name}
              </span>
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Branding */}
      <div className="hidden md:flex items-center gap-2 px-5 py-5 border-t border-primary/10">
        <ShieldCheck className="w-4 h-4 text-primary" />

        <div>
          <p className="text-xs font-medium">SidFlix Control</p>
          <p className="text-[10px] text-gray-500">
            Cinema Management
          </p>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;