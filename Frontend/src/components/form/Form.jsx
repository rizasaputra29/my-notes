import React, { useContext, useState } from "react";
import { BiSolidUserCircle } from "react-icons/bi";
import { FaLock } from "react-icons/fa";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Form = ({ name }) => {
  const { token, setToken, user, setUser } = useContext(AppContext);

  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [formData, setFormData] = useState({
    name: "",
    pass: "",
  });

  const changeHandler = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  async function submitHandlerSignup(event) {
    event.preventDefault();
    try {
      const res = await axios.post(`${backendUrl}/createUser`, formData);
      toast.success("New user created");
      navigate("/page/login");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }

  async function submitHandlerLogin(event) {
    event.preventDefault();
    try {
      let res = await axios.post(`${backendUrl}/login`, formData);
      const _token = await res.data.token;

      if (_token) {
        setToken(_token);

        function setCookie(name, value, days) {
          const tenMinutes = 10 * 60 * 1000; // 10 minutes in milliseconds
          const expires = new Date(Date.now() + tenMinutes).toUTCString();
          document.cookie = `${name}=${value}; expires=${expires}; path=/`;
        }

        setCookie("token", _token);
        setUser(res.data.userAvailable);
        navigate("/");
      }
    } catch (error) {
      toast.error(`${error?.response?.data?.message}`);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-100 mb-6">
          {name} Form
        </h2>
        <form
          onSubmit={name === "LOGIN" ? submitHandlerLogin : submitHandlerSignup}
          className="space-y-6"
        >
          {/* Username Input */}
          <div className="relative">
            <BiSolidUserCircle className="absolute text-2xl text-gray-400 left-3 top-3" />
            <input
              type="text"
              name="name"
              placeholder="Username"
              onChange={changeHandler}
              className="w-full px-10 py-3 bg-gray-700 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <FaLock className="absolute text-2xl text-gray-400 left-3 top-3" />
            <input
              type="password"
              name="pass"
              placeholder="Password"
              onChange={changeHandler}
              className="w-full px-10 py-3 bg-gray-700 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
          >
            {name === "LOGIN" ? "Login Now" : "Sign Up Now"}
          </button>
        </form>
        <p className="mt-6 text-center text-gray-400">
          {name === "LOGIN" ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            onClick={() =>
              navigate(name === "LOGIN" ? "/page/signup" : "/page/login")
            }
            className="text-blue-500 hover:underline cursor-pointer"
          >
            {name === "LOGIN" ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Form;