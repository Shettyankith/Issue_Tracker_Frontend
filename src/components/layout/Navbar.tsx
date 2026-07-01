import { NavLink, useNavigate } from "react-router-dom";
import {
  FaBug,
  FaHome,
  FaListAlt,
  FaPlusCircle,
  FaSignOutAlt,
} from "react-icons/fa";

import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

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

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto h-16 flex items-center justify-between px-6">

        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg text-white">
            <FaBug />
          </div>

          <div>
            <h1 className="font-bold text-xl">
              Issue Tracker
            </h1>

            <p className="text-xs text-gray-500">
              Manage your work efficiently
            </p>
          </div>
        </div>

        <nav className="flex items-center gap-3">

          <NavLink
            to="/dashboard"
            className={navClass}
          >
            <FaHome />
            Dashboard
          </NavLink>

          <NavLink
            to="/issues"
            className={navClass}
          >
            <FaListAlt />
            Issues
          </NavLink>

          <NavLink
            to="/issues/new"
            className={navClass}
          >
            <FaPlusCircle />
            New Issue
          </NavLink>

        </nav>

        <div className="flex items-center gap-4">

          <div className="text-right">
            <p className="font-semibold">
              {user?.name}
            </p>

            <p className="text-xs text-gray-500">
              {user?.email}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg bg-red-500 hover:bg-red-600 px-4 py-2 text-white transition"
          >
            <FaSignOutAlt />
            Logout
          </button>

        </div>
      </div>
    </header>
  );
};

export default Navbar;