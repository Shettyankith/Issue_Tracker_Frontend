import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaBug,
  FaHome,
  FaListAlt,
  FaPlusCircle,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";

import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto h-16 flex items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg text-white">
            <FaBug />
          </div>

          <div>
            <h1 className="font-bold text-lg md:text-xl">
              Issue Tracker
            </h1>

            <p className="hidden sm:block text-xs text-gray-500">
              Manage your work efficiently
            </p>
          </div>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-3">
          <NavLink to="/dashboard" className={navClass}>
            <FaHome />
            Dashboard
          </NavLink>

          <NavLink to="/issues" className={navClass}>
            <FaListAlt />
            Issues
          </NavLink>

          <NavLink to="/issues/new" className={navClass}>
            <FaPlusCircle />
            New Issue
          </NavLink>
        </nav>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-4">
          <div className="text-right">
            <p className="font-semibold">{user?.name}</p>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg bg-red-500 hover:bg-red-600 px-4 py-2 text-white transition"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t bg-white shadow-lg">
          <div className="flex flex-col p-4 gap-2">
            <NavLink
              to="/dashboard"
              className={navClass}
              onClick={closeMenu}
            >
              <FaHome />
              Dashboard
            </NavLink>

            <NavLink
              to="/issues"
              className={navClass}
              onClick={closeMenu}
            >
              <FaListAlt />
              Issues
            </NavLink>

            <NavLink
              to="/issues/new"
              className={navClass}
              onClick={closeMenu}
            >
              <FaPlusCircle />
              New Issue
            </NavLink>

            <div className="border-t pt-3 mt-3">
              <p className="font-semibold mb-3">{user?.name}</p>

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white rounded-lg py-3"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;