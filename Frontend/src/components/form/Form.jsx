import React, { useContext, useState, useEffect } from "react";
import { BiSolidUserCircle } from "react-icons/bi";
import { FaLock } from "react-icons/fa";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { CSSTransition } from 'react-transition-group';

const Form = ({ name }) => {
  const { setToken, setUser } = useContext(AppContext);
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isReverse, setIsReverse] = useState(false);
  const [formData, setFormData] = useState({ name: "", pass: "" });
  const isLogin = name === "LOGIN";

  useEffect(() => {
    setIsReverse(isLogin);
  }, [name]);

  const changeHandler = (event) => {
    setFormData(prev => ({
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
    <div className="form-wrapper">
      <CSSTransition
        in={true}
        appear={true}
        timeout={500}
        classNames={isReverse ? "slide-reverse" : "slide"}
      >
        <div className="form-content">
          <div className="auth-container">
            {/* Animated Side Panel */}
            <div className={`side-panel ${isLogin ? 'left' : 'right'}`}>
              <div className="panel-content">
                <h1 className="panel-title">
                  {isLogin ? "Welcome Back" : "Join Us"}
                </h1>
                <p className="panel-description">
                  {isLogin 
                    ? "Sign in to continue your journey with us" 
                    : "Join our community and start your journey today"
                  }
                </p>
                <div className="decorative-circle"></div>
              </div>
            </div>

            {/* Form Panel */}
            <div className={`form-panel ${isLogin ? 'right' : 'left'}`}>
              <div className="form-inner">
                <h2 className="form-title">
                  {isLogin ? "Sign In" : "Create Account"}
                </h2>
                
                <form onSubmit={isLogin ? submitHandlerLogin : submitHandlerSignup}>
                  <div className="input-group">
                    <label htmlFor="name">Username</label>
                    <div className="input-wrapper">
                      <BiSolidUserCircle className="input-icon" />
                      <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Enter your username"
                        onChange={changeHandler}
                        className="auth-input"
                      />
                    </div>
                  </div>

                  <div className="input-group">
                    <label htmlFor="pass">Password</label>
                    <div className="input-wrapper">
                      <FaLock className="input-icon" />
                      <input
                        id="pass"
                        type="password"
                        name="pass"
                        placeholder="Enter your password"
                        onChange={changeHandler}
                        className="auth-input"
                      />
                    </div>
                  </div>

                  <button type="submit" className="submit-button">
                    {isLogin ? "Sign In" : "Create Account"}
                  </button>
                </form>
                
                <div className="auth-footer">
                  <p>
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                    <span
                      onClick={() => navigate(isLogin ? "/page/signup" : "/page/login")}
                      className="auth-link"
                    >
                      {isLogin ? "Sign Up" : "Sign In"}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};

export default Form;