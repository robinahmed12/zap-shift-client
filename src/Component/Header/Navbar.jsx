import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaArrowRight, FaTimes, FaBars } from "react-icons/fa";
import logo from "../Header/logo.png";
import useAuth from "../../hook/useAuth";
import axiosSecure from "../../hook/axiosSecure";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOutUser, setUser } = useAuth();

  const navItems = (
    <>
      <li className="mx-2 lg:mx-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105 ${
              isActive
                ? "text-[#E30613] font-bold border-b-2 border-[#E30613]"
                : "text-black hover:text-[#E30613]"
            }`
          }
        >
          Home
        </NavLink>
      </li>
      <li className="mx-2 lg:mx-4">
        <NavLink
          to="/coverage"
          className={({ isActive }) =>
            `px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105 ${
              isActive
                ? "text-[#E30613] font-bold border-b-2 border-[#E30613]"
                : "text-black hover:text-[#E30613]"
            }`
          }
        >
          Coverage
        </NavLink>
      </li>
      <li className="mx-2 lg:mx-4">
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105 ${
              isActive
                ? "text-[#E30613] font-bold border-b-2 border-[#E30613]"
                : "text-black hover:text-[#E30613]"
            }`
          }
        >
          About
        </NavLink>
      </li>
      <li className="mx-2 lg:mx-4">
        <NavLink
          to="/pricing"
          className={({ isActive }) =>
            `px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105 ${
              isActive
                ? "text-[#E30613] font-bold border-b-2 border-[#E30613]"
                : "text-black hover:text-[#E30613]"
            }`
          }
        >
          Pricing
        </NavLink>
      </li>

      <li className="mx-2 lg:mx-4">
        <NavLink
          to="/add-parcel"
          className={({ isActive }) =>
            `px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105 ${
              isActive
                ? "text-[#E30613] font-bold border-b-2 border-[#E30613]"
                : "text-black hover:text-[#E30613]"
            }`
          }
        >
          Add Parcel
        </NavLink>
      </li>
      <li className="mx-2 lg:mx-4">
        <NavLink
          to="/be-a-rider"
          className={({ isActive }) =>
            `px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105 ${
              isActive
                ? "text-[#E30613] font-bold border-b-2 border-[#E30613]"
                : "text-black hover:text-[#E30613]"
            }`
          }
        >
          Be a Rider
        </NavLink>
      </li>

      {user ? (
        <li className="mx-2 lg:mx-4">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105 ${
                isActive
                  ? "text-[#E30613] font-bold border-b-2 border-[#E30613]"
                  : "text-black hover:text-[#E30613]"
              }`
            }
          >
            Dashboard
          </NavLink>
        </li>
      ) : (
        ""
      )}
    </>
  );

 const handleSignOut = () => {
  signOutUser()
    .then(() => {
      // Clear user state
      setUser(null);

      // Clear Axios token
      delete axiosSecure.defaults.headers.common['Authorization'];
    })
    .catch((err) => {
      console.log(err.message);
    });
};


  return (
    <nav className=" shadow-md sticky top-0 z-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Three equal sections container */}
        <div className="flex justify-between items-center h-20">
          {/* Section 1: Logo (33%) */}
          <div className="">
            <div className="flex-shrink-0 flex items-center">
              <img className="w-10 h-10" src={logo} alt="ZapShift Logo" />
              <span className="ml-2 text-2xl font-bold text-[#E30613]">
                ZapShift
              </span>
            </div>
          </div>

          {/* Section 2: Navigation Links (33%) */}
          <div className="hidden md:flex">
            <ul className="flex items-center">{navItems}</ul>
          </div>

          {/* Section 3: Buttons (33%) */}
          <div className="flex justify-center items-center space-x-2 sm:space-x-4">
            <div className="hidden md:flex items-center space-x-2 sm:space-x-4">
              {user ? (
                <Link
                  onClick={handleSignOut}
                  className="px-3 py-2 rounded-md text-sm font-medium text-black hover:text-[#E30613] transition-colors duration-300 hover:scale-105"
                >
                  Sign Out
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="px-3 py-2 rounded-md text-sm font-medium text-black hover:text-[#E30613] transition-colors duration-300 hover:scale-105"
                >
                  Sign In
                </Link>
              )}
            </div>

            <div>
              {user ? (
                <img
                  className="w-11 h-11 rounded-full"
                  src={user?.photoURL}
                  alt=""
                  srcset=""
                />
              ) : (
                ""
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-[#E30613] hover:text-[#FFD700] focus:outline-none transition-colors duration-300"
              >
                {mobileMenuOpen ? (
                  <FaTimes className="h-6 w-6" />
                ) : (
                  <FaBars className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden bg-white shadow-xl transition-all duration-500 ease-in-out overflow-hidden ${
            mobileMenuOpen ? "max-h-screen" : "max-h-0"
          }`}
        >
          <div className="px-2 pt-2 pb-4 space-y-3 sm:px-3">
            <ul className="space-y-2">
              {React.Children.toArray(navItems).map((item, index) => (
                <li
                  key={index}
                  className="hover:bg-gray-100 px-3 py-2 rounded-md transition-all duration-300"
                >
                  {item}
                </li>
              ))}
            </ul>
            <div className="pt-4 border-t border-gray-200 space-y-3">
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-black hover:text-[#E30613] hover:bg-gray-100 transition-colors duration-300"
              >
                Sign In
              </Link>
              <Link
                to="/rider"
                className="block px-3 py-2 rounded-md text-base font-medium bg-[#E30613] text-white hover:bg-[#FFD700] hover:text-black flex items-center justify-between transition-all duration-300"
              >
                Be a Rider <FaArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
