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
    <div className="w-full bg-gray-900 text-white flex items-center justify-between px-6 py-4 shadow-md fixed top-0 z-50 border-b border-gray-800">
      {/* Sidebar Toggle */}
      <div
        className="text-2xl cursor-pointer hover:text-blue-400 transition duration-300"
        onClick={() => setIsSidebarOpen(true)}
      >
        <FiMenu />
      </div>

      {/* Logo */}
      <div
        className="text-2xl font-bold cursor-pointer text-center flex-1 hover:text-blue-400 transition duration-300"
        onClick={() => navigate("/")}
      >
        MyNotes
      </div>

      {/* User Icon with Dropdown */}
      <div className="relative">
        <div
          className="text-lg cursor-pointer flex items-center gap-2 hover:text-blue-400 transition duration-300"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <div className="flex items-center gap-2 py-1 px-3 rounded-full border border-gray-700 bg-gray-800 hover:border-blue-500 transition-all duration-300">
            <FiUser />
            {token && <span className="hidden md:block">{username}</span>}
          </div>
        </div>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 bg-gray-800 text-white rounded-lg shadow-lg py-1 w-40 border border-gray-700 overflow-hidden">
            {token ? (
              <p
                className="px-4 py-2 hover:bg-gray-700 cursor-pointer transition duration-300 text-sm"
                onClick={logoutHandler}
              >
                Logout
              </p>
            ) : (
              <>
                <p
                  className="px-4 py-2 hover:bg-gray-700 cursor-pointer transition duration-300 text-sm"
                  onClick={() => {
                    navigate("/page/login");
                    setIsDropdownOpen(false);
                  }}
                >
                  Login
                </p>
                <p
                  className="px-4 py-2 hover:bg-gray-700 cursor-pointer transition duration-300 text-sm"
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
          className="fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm"
          onClick={closeSidebar}
        >
          <div
            className="fixed top-0 left-0 w-64 bg-gray-900 text-white h-full shadow-xl z-50 transform transition-transform duration-300"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the sidebar
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800">
              <h2 className="text-lg font-light">Menu</h2>
              <AiOutlineClose
                className="text-xl cursor-pointer hover:text-blue-400 transition duration-300"
                onClick={closeSidebar}
              />
            </div>
            <div className="flex flex-col p-6 space-y-6">
              <div 
                className="cursor-pointer hover:text-blue-400 transition duration-300 flex items-center gap-3"
                onClick={() => {
                  navigate("/");
                  closeSidebar();
                }}
              >
                <div className="w-1 h-1 rounded-full bg-blue-500"></div>
                <span>Home</span>
              </div>
              <div
                className="cursor-pointer hover:text-blue-400 transition duration-300 flex items-center gap-3"
                onClick={() => {
                  navigate("/notes");
                  closeSidebar();
                }}
              >
                <div className="w-1 h-1 rounded-full bg-blue-500"></div>
                <span>Notes</span>
              </div>
              {token && (
                <div className="mt-8 pt-6 border-t border-gray-800">
                  <div className="flex items-center gap-3 text-gray-400">
                    <FiUser />
                    <span>{username}</span>
                  </div>
                  <button 
                    onClick={logoutHandler}
                    className="mt-4 w-full py-2 border border-gray-700 rounded-lg text-sm hover:bg-gray-800 transition duration-300"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;