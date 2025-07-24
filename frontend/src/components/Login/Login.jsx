import React, { useContext, useEffect, useState } from "react";
import "./Login.css";
import { NavLink } from "react-router-dom";
import { userContext } from "../../store/userContext";
import BtnLoader from "../BtnLoader/BtnLoader";

function Login() {
  const { handleLogin, loading } = useContext(userContext);

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const onchangehandler = (e) => {
    let { name, value } = e.target;
    setLoginDetails((prevdetails) => ({
      ...prevdetails,
      [name]: value,
    }));
  };

  const handleEnterPress = (e) => {
    if (e.key === "Enter") {
      handleLogin(loginDetails);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <section className="login-wrapper">
      <div className="login-container">
        <div className="login-signup-link">
          <div style={{ width: "100%" }}>
            <NavLink
              className={({ isActive }) =>
                `${isActive ? "active" : ""} signup-link`
              }
              to="/signup"
            >
              Signup
            </NavLink>
          </div>
          <div style={{ width: "100%" }}>
            <NavLink
              className={({ isActive }) =>
                `${isActive ? "active" : ""} login-link`
              }
              to="/login"
            >
              Login
            </NavLink>
          </div>
        </div>
        <h3>Login</h3>
        <p>Login to your account here.</p>
        <label htmlFor="email">Email</label>
        <input
          name="email"
          value={loginDetails.email}
          onChange={onchangehandler}
          type="email"
          placeholder="Email"
          id="email"
          onKeyDown={handleEnterPress}
        />

        <label htmlFor="email">Password</label>
        <input
          name="password"
          value={loginDetails.password}
          onChange={onchangehandler}
          type="password"
          placeholder="Password"
          id="password"
          onKeyDown={handleEnterPress}
        />

        {loading ? (
          <BtnLoader />
        ) : (
          <button
            onClick={() => handleLogin(loginDetails)}
            className="login-btnn"
          >
            Login
          </button>
        )}
      </div>
    </section>
  );
}

export default Login;
