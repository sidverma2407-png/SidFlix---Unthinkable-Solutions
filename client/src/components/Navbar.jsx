import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MenuIcon,
  SearchIcon,
  TicketPlus,
  XIcon,
  Film,
} from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const navigate = useNavigate();
  const { favoriteMovies } = useAppContext();

  const closeMenu = () => {
    window.scrollTo(0, 0);
    setIsOpen(false);
  };

  const scrollToSection = (sectionId) => {
    setIsOpen(false);

    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({
          behavior: "smooth",
        });
      }, 300);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-black/50 backdrop-blur-md border-b border-white/5">
      <nav className="flex items-center justify-between px-6 md:px-16 lg:px-36 py-4">
        
        {/* SIDFLIX LOGO */}
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-2 max-md:flex-1 group"
        >
          <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center group-hover:bg-primary/25 transition">
            <Film className="w-5 h-5 text-primary" />
          </div>

          <div>
            <div className="text-2xl md:text-3xl font-extrabold tracking-tight leading-none">
              Sid<span className="text-primary">Flix</span>
            </div>

            <span className="hidden sm:block mt-1 text-[8px] uppercase tracking-[0.25em] text-gray-500">
              Your Cinema Experience
            </span>
          </div>
        </Link>

        {/* NAVIGATION */}
        <div
          className={`max-md:absolute max-md:top-0 max-md:left-0 z-50
          flex flex-col md:flex-row items-center justify-center
          gap-8 md:gap-7 lg:gap-9
          max-md:h-screen
          max-md:bg-black/95
          md:bg-white/5 md:border md:border-white/10
          md:px-8 md:py-3 md:rounded-full
          backdrop-blur-xl
          overflow-hidden
          transition-[width] duration-300
          ${
            isOpen
              ? "max-md:w-full"
              : "max-md:w-0"
          }`}
        >
          <XIcon
            className="md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer hover:text-primary transition"
            onClick={() => setIsOpen(false)}
          />

          <Link
            to="/"
            onClick={closeMenu}
            className="hover:text-primary transition"
          >
            Home
          </Link>

          <Link
            to="/movies"
            onClick={closeMenu}
            className="hover:text-primary transition"
          >
            Movies
          </Link>

          <button
            onClick={() => scrollToSection("featured")}
            className="hover:text-primary transition cursor-pointer"
          >
            Theaters
          </button>

          <button
            onClick={() => navigate("/movies")}
            className="hover:text-primary transition cursor-pointer"
          >
            New Releases
          </button>

          {favoriteMovies.length > 0 && (
            <Link
              to="/favorite"
              onClick={closeMenu}
              className="hover:text-primary transition"
            >
              Favorites
            </Link>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-5 md:gap-7">
          <button
            onClick={() => navigate("/movies")}
            className="hidden md:block"
            aria-label="Search movies"
          >
            <SearchIcon className="w-5 h-5 cursor-pointer hover:text-primary transition" />
          </button>

          {!user ? (
            <button
              onClick={openSignIn}
              className="px-5 py-2 sm:px-7 sm:py-2.5 bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer shadow-lg shadow-primary/10"
            >
              Sign In
            </button>
          ) : (
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="My Bookings"
                  labelIcon={<TicketPlus width={15} />}
                  onClick={() => navigate("/my-bookings")}
                />
              </UserButton.MenuItems>
            </UserButton>
          )}
        </div>

        {/* MOBILE MENU */}
        <MenuIcon
          onClick={() => setIsOpen(!isOpen)}
          className="max-md:ml-4 md:hidden w-8 h-8 cursor-pointer hover:text-primary transition"
        />
      </nav>
    </header>
  );
};

export default Navbar;