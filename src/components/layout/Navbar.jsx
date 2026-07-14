import { NavLink } from "react-router-dom";
import { useState } from "react";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  ClipboardList,
  Store,
  Home,
} from "lucide-react";

import logo from "../../assets/logo.jpeg";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const navLinkStyle = ({ isActive }) =>
    `flex items-center gap-2 font-medium transition-all duration-300 ${
      isActive
        ? "text-violet-600"
        : "text-gray-700 hover:text-violet-600 hover:-translate-y-0.5"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-md border-b border-violet-100 px-4 lg:px-8">
      <div className="flex items-center justify-between h-20">

        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-3 group"
          onClick={closeMenu}
        >
          <img
            src={logo}
            alt="BiteThat Logo"
            className="w-11 h-11 rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
          />

          <h1 className="text-2xl font-extrabold tracking-tight">
            <span className="text-violet-600">bite</span>
            <span className="text-gray-900">That</span>
          </h1>
        </NavLink>

        {/* Search */}
        <div className="hidden xl:block relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search restaurants or dishes..."
            className="w-80 pl-11 pr-4 py-3 rounded-full border border-slate-200 bg-slate-100 focus:bg-white focus:border-violet-400 focus:ring-4 focus:ring-violet-100 outline-none transition-all"
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-7">

          <NavLink to="/" className={navLinkStyle}>
            <Home size={18} />
            Home
          </NavLink>

          <NavLink to="/restaurants" className={navLinkStyle}>
            <Store size={18} />
            Restaurants
          </NavLink>

          <NavLink to="/orders" className={navLinkStyle}>
            <ClipboardList size={18} />
            Orders
          </NavLink>

          <NavLink
            to="/cart"
            className="relative text-gray-700 hover:text-violet-600 transition"
          >
            <ShoppingCart size={24} />

            <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 rounded-full bg-violet-600 text-white text-xs font-semibold">
              0
            </span>
          </NavLink>

          <NavLink
            to="/login"
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-violet-600 text-white hover:bg-violet-700 hover:scale-105 transition-all duration-300"
          >
            <User size={18} />
            Login
          </NavLink>

        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-96 border-t border-gray-200" : "max-h-0"
        }`}
      >
        <div className="bg-white px-6 py-5 flex flex-col gap-5">

          <NavLink
            to="/"
            className={navLinkStyle}
            onClick={closeMenu}
          >
            <Home size={18} />
            Home
          </NavLink>

          <NavLink
            to="/restaurants"
            className={navLinkStyle}
            onClick={closeMenu}
          >
            <Store size={18} />
            Restaurants
          </NavLink>

          <NavLink
            to="/orders"
            className={navLinkStyle}
            onClick={closeMenu}
          >
            <ClipboardList size={18} />
            Orders
          </NavLink>

          <NavLink
            to="/cart"
            className={navLinkStyle}
            onClick={closeMenu}
          >
            <ShoppingCart size={18} />
            Cart
          </NavLink>

          <NavLink
            to="/login"
            onClick={closeMenu}
            className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 py-3 text-white hover:bg-violet-700 transition"
          >
            <User size={18} />
            Login
          </NavLink>

        </div>
      </div>

    </nav>
  );
};

export default Navbar;