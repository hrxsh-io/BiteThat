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

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinkStyle = ({ isActive }) =>
    `flex items-center gap-2 font-medium transition-all duration-300 ${isActive
      ? "text-violet-600"
      : "text-gray-700 hover:text-violet-600 hover:scale-105"
    }`;

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-md border-b border-violet-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* ================= Logo ================= */}

        <NavLink
          to="/"
          className="flex items-center gap-2"
          onClick={closeMenu}
        >
          <img
            src="/logo.svg"
            alt="biteThat"
            className="w-10 h-10"
          />

          <span className="text-2xl font-bold text-violet-600">
            biteThat
          </span>
        </NavLink>

        {/* ================= Search ================= */}

        <div className="hidden lg:block relative ml-10">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search restaurants or dishes..."
            className="
      w-[380px]
      pl-11
      pr-4
      py-3
      rounded-full
      bg-slate-100
      border
      border-slate-200
      text-slate-800
      placeholder:text-slate-500
      outline-none
      transition-all
      duration-300
      focus:bg-white
      focus:border-violet-300
      focus:ring-4
      focus:ring-violet-100
    "
          />
        </div>

        {/* ================= Desktop Navigation ================= */}

        <div className="hidden md:flex items-center gap-8">

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

            <span className="absolute -top-2 -right-2 bg-violet-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold">
              9
            </span>
          </NavLink>

          <NavLink
            to="/login"
            className="flex items-center gap-2 bg-violet-600 text-white px-5 py-2 rounded-2xl hover:bg-violet-700 transition duration-300"
          >
            <User size={18} />
            Login
          </NavLink>

        </div>

        {/* ================= Mobile Button ================= */}

        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <X size={28} />
          ) : (
            <Menu size={28} />
          )}
        </button>
      </div>

      {/* ================= Mobile Menu ================= */}

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">

          <div className="flex flex-col px-6 py-4 space-y-5">

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
              className="flex items-center justify-center gap-2 bg-violet-600 text-white py-3 rounded-xl hover:bg-violet-700 transition"
              onClick={closeMenu}
            >
              <User size={18} />
              Login
            </NavLink>

          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;