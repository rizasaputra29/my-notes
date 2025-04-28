import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { FiMenu, FiUser } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import toast from "react-hot-toast";

const Navbar = () => {
  const { token, setToken, user, setUser, setAllNotes } =
    useContext(AppContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const username = user?.name;

  function logoutHandler() {
    setToken(null);
    setUser(null);
    setAllNotes(null);

    function removeCookie(name) {
      document.cookie = `${name}=; Max-Age=0; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
    removeCookie("token");

    toast.success("Logout successfully");
    setIsDropdownOpen(false);
  }

  function closeSidebar() {
    setIsSidebarOpen(false);
  }

  return (
    <div className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-between px-6 py-6 shadow-lg fixed top-0 z-50">
      {/* Sidebar Toggle */}
      <div
        className="text-3xl cursor-pointer hover:text-gray-400 transition duration-300"
        onClick={() => setIsSidebarOpen(true)}
      >
        <FiMenu />
      </div>

      {/* Logo */}
      <div
        className="text-2xl md:text-3xl font-bold cursor-pointer text-center flex-1 hover:text-gray-400 transition duration-300"
        onClick={() => navigate("/")}
      >
        MyNotes
      </div>

      {/* User Icon with Dropdown */}
      <div className="relative">
        <div
          className="text-2xl cursor-pointer flex items-center gap-2 hover:text-gray-400 transition duration-300"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <FiUser />
          {token && <span className="hidden md:block">{username}</span>}
        </div>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 bg-gray-800 text-white rounded-md shadow-lg py-2 w-40">
            {token ? (
              <p
                className="px-4 py-2 hover:bg-gray-700 cursor-pointer transition duration-300"
                onClick={logoutHandler}
              >
                Logout
              </p>
            ) : (
              <>
                <p
                  className="px-4 py-2 hover:bg-gray-700 cursor-pointer transition duration-300"
                  onClick={() => {
                    navigate("/page/login");
                    setIsDropdownOpen(false);
                  }}
                >
                  Login
                </p>
                <p
                  className="px-4 py-2 hover:bg-gray-700 cursor-pointer transition duration-300"
                  onClick={() => {
                    navigate("/page/signup");
                    setIsDropdownOpen(false);
                  }}
                >
                  Sign Up
                </p>
              </>
            )}
          </div>
        )}
      </div>

      {/* Sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeSidebar}
        >
          <div
            className="fixed top-0 left-0 w-64 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white h-full shadow-xl z-50 transform transition-transform duration-300"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the sidebar
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
              <h2 className="text-lg font-bold">Menu</h2>
              <AiOutlineClose
                className="text-xl cursor-pointer hover:text-gray-400 transition duration-300"
                onClick={closeSidebar}
              />
            </div>
            <div className="flex flex-col gap-4 p-4">
              <p
                className="cursor-pointer hover:text-gray-400 transition duration-300"
                onClick={() => {
                  navigate("/");
                  closeSidebar();
                }}
              >
                Home
              </p>
              <p
                className="cursor-pointer hover:text-gray-400 transition duration-300"
                onClick={() => {
                  navigate("/notes");
                  closeSidebar();
                }}
              >
                Notes
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
