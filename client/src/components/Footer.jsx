import React from "react";
import { Link } from "react-router-dom";
import { Ticket, Instagram, Twitter, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#09090f] border-t border-white/10">
      <div className="px-6 md:px-16 lg:px-36 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 w-fit">
              <Ticket className="w-7 h-7 text-primary" />
              <span className="text-2xl font-bold tracking-tight">
                Sid<span className="text-primary">Flix</span>
              </span>
            </Link>

            <p className="text-gray-400 mt-5 max-w-md leading-relaxed">
              SidFlix makes movie ticket booking simple and seamless. Discover
              the latest movies, choose your preferred showtime and reserve
              your favorite seats in just a few clicks.
            </p>

            <div className="flex gap-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-primary transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-5">Explore</h3>

            <div className="flex flex-col gap-3 text-gray-400">
              <Link to="/" className="hover:text-primary transition">
                Home
              </Link>

              <Link to="/movies" className="hover:text-primary transition">
                Movies
              </Link>

              <Link to="/favorite" className="hover:text-primary transition">
                Favorites
              </Link>

              <Link to="/my-bookings" className="hover:text-primary transition">
                My Bookings
              </Link>
            </div>
          </div>

          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-5">SidFlix</h3>

            <div className="flex flex-col gap-3 text-gray-400">
              <p>Movie Ticket Booking Platform</p>
              <p>Fast & Secure Booking</p>
              <p>Choose Your Favorite Seats</p>
              <p>Built for Movie Lovers 🎬</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} SidFlix. All rights reserved.
          </p>

          <p>Book. Watch. Experience. 🎬</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;