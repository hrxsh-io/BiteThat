
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  ClipboardList,
  Store,
  Home,
  LogOut,
  UserCircle,
} from "lucide-react";

import logo from "../../assets/logo.jpeg";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navigate = useNavigate();

  const { user, isAuthenticated, logout } = useAuth();

  const closeMenu = () => setMenuOpen(false);

  /*
  ============================================================
  USER INITIALS
  ============================================================
  */

  const initials = useMemo(() => {
    if (!user?.name) return "BT";

    return user.name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0].toUpperCase())
      .join("");
  }, [user]);

  /*
  ============================================================
  LOGOUT
  ============================================================
  */

  const handleLogout = () => {
    logout();

    setProfileOpen(false);
    closeMenu();

    navigate("/");
  };

  /*
  ============================================================
  NAV LINK STYLE
  ============================================================
  */

  const navLinkStyle = ({ isActive }) =>
    `flex items-center gap-2 font-medium transition-all duration-300 ${
      isActive
        ? "text-violet-600"
        : "text-gray-700 hover:text-violet-600 hover:-translate-y-0.5"
    }`;

  return (
    <nav className="sticky top-0 z-50 border-b border-violet-100 bg-white/90 shadow-md backdrop-blur-md">

      {/* =====================================================
          MAIN NAVBAR
      ===================================================== */}

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">

        {/* ===================================================
            LOGO
        =================================================== */}

        <NavLink
          to="/"
          className="group flex items-center gap-3"
          onClick={closeMenu}
        >
          <img
            src={logo}
            alt="BiteThat Logo"
            className="h-11 w-11 rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
          />

          <h1 className="text-2xl font-extrabold tracking-tight">
            <span className="text-violet-600">bite</span>
            <span className="text-gray-900">That</span>
          </h1>
        </NavLink>

        {/* ===================================================
            SEARCH
        =================================================== */}

        <div className="relative hidden xl:block">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search restaurants or dishes..."
            className="w-80 rounded-full border border-slate-200 bg-slate-100 py-3 pl-11 pr-4 outline-none transition-all focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
          />
        </div>

        {/* ===================================================
            DESKTOP NAVIGATION
        =================================================== */}

        <div className="hidden items-center gap-7 md:flex">

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

          {/* Cart */}

          <NavLink
            to="/cart"
            className="relative text-gray-700 transition hover:text-violet-600"
          >
            <ShoppingCart size={24} />

            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-violet-600 text-xs font-semibold text-white">
              0
            </span>
          </NavLink>

          {/* =================================================
              AUTHENTICATION
          ================================================= */}

          {!isAuthenticated ? (

            /* ---------------- LOGIN ---------------- */

            <NavLink
              to="/login"
              className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2 text-white transition-all duration-300 hover:scale-105 hover:bg-violet-700"
            >
              <User size={18} />
              Login
            </NavLink>

          ) : (

            /* ---------------- PROFILE ---------------- */

            <div className="relative">

              <button
                type="button"
                onClick={() => setProfileOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white p-1.5 pr-3 shadow-sm transition hover:border-violet-200 hover:shadow-md"
                aria-label="Open profile menu"
              >

                {/* Avatar */}

                <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-xs font-bold text-white">

                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name || "Profile"}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    initials
                  )}

                </div>

                {/* Name */}

                <div className="hidden max-w-28 text-left lg:block">
                  <p className="truncate text-xs font-bold text-slate-800">
                    {user?.name || "Profile"}
                  </p>

                  <p className="text-[10px] text-slate-400">
                    My account
                  </p>
                </div>

              </button>

              {/* =================================================
                  PROFILE DROPDOWN
              ================================================= */}

              {profileOpen && (
                <>

                  {/* Invisible backdrop */}

                  <button
                    type="button"
                    aria-label="Close profile menu"
                    className="fixed inset-0 z-40 cursor-default"
                    onClick={() => setProfileOpen(false)}
                  />

                  <div className="absolute right-0 top-14 z-50 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10">

                    {/* User info */}

                    <div className="border-b border-slate-100 bg-slate-50 px-4 py-4">

                      <p className="truncate text-sm font-bold text-slate-900">
                        {user?.name || "BiteThat User"}
                      </p>

                      <p className="mt-1 truncate text-xs text-slate-400">
                        {user?.email}
                      </p>

                    </div>

                    {/* Menu */}

                    <div className="p-2">

                      <button
                        type="button"
                        onClick={() => {
                          setProfileOpen(false);
                          navigate("/profile");
                        }}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-violet-50"
                      >
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                          <UserCircle size={18} />
                        </span>

                        <div>
                          <p className="text-sm font-semibold text-slate-800">
                            My profile
                          </p>

                          <p className="text-[11px] text-slate-400">
                            Account & preferences
                          </p>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setProfileOpen(false);
                          navigate("/orders");
                        }}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-violet-50"
                      >
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                          <ClipboardList size={18} />
                        </span>

                        <div>
                          <p className="text-sm font-semibold text-slate-800">
                            My orders
                          </p>

                          <p className="text-[11px] text-slate-400">
                            Track your orders
                          </p>
                        </div>
                      </button>

                      <div className="my-2 border-t border-slate-100" />

                      {/* Logout */}

                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-red-500 transition hover:bg-red-50"
                      >
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50">
                          <LogOut size={18} />
                        </span>

                        <div>
                          <p className="text-sm font-semibold">
                            Sign out
                          </p>

                          <p className="text-[11px] text-red-300">
                            End your session
                          </p>
                        </div>
                      </button>

                    </div>

                  </div>
                </>
              )}

            </div>
          )}

        </div>

        {/* ===================================================
            MOBILE MENU BUTTON
        =================================================== */}

        <button
          type="button"
          className="text-gray-700 md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

      </div>

      {/* =====================================================
          MOBILE MENU
      ===================================================== */}

      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          menuOpen
            ? "max-h-[700px] border-t border-gray-200"
            : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-5 bg-white px-6 py-5">

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

          {/* Mobile authentication */}

          {!isAuthenticated ? (

            <NavLink
              to="/login"
              onClick={closeMenu}
              className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 py-3 text-white transition hover:bg-violet-700"
            >
              <User size={18} />
              Login
            </NavLink>

          ) : (

            <>

              {/* Mobile profile */}

              <NavLink
                to="/profile"
                onClick={closeMenu}
                className="flex items-center gap-3 rounded-2xl border border-violet-100 bg-violet-50 px-4 py-3"
              >

                <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-xs font-bold text-white">

                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name || "Profile"}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    initials
                  )}

                </div>

                <div>
                  <p className="text-sm font-bold text-slate-800">
                    {user?.name || "My profile"}
                  </p>

                  <p className="text-xs text-slate-400">
                    View profile
                  </p>
                </div>

              </NavLink>

              {/* Mobile logout */}

              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 rounded-xl border border-red-200 py-3 text-red-500 transition hover:bg-red-50"
              >
                <LogOut size={18} />
                Sign out
              </button>

            </>

          )}

        </div>
      </div>

    </nav>
  );
};

export default Navbar;

