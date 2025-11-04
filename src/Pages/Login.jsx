import React, { useState } from "react";
import "./loginStyle.css";
import usersData from "../data/usersData.json";
import auiLogo from "./images/auilogo.png";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const findUserInGroups = (username, password) => {
    const groups = usersData.groups || {};
    for (const groupName of Object.keys(groups)) {
      const found = groups[groupName].find((u) => u.username === username);
      if (found) {
        return {
          ...found,
          role: groupName,
          passwordMatches: found.password === password,
        };
      }
    }
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const found = findUserInGroups(formData.username, formData.password);

    if (found && found.passwordMatches) {
      setIsLoggedIn(true);
      setError("");
      console.log("login OK", found);
      return;
    }

    if (found && !found.passwordMatches) {
      setError("Invalid password");
      console.log("invalid password for user", formData.username);
      return;
    }

    setError("Invalid username");
    console.log("invalid username", formData.username);
  };

  if (isLoggedIn) {
    const user = findUserInGroups(formData.username, formData.password);
    return (
      <div> Welcome back {formData.username}</div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="main-title">Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>

      <div className="login-image-section">
        <img src={auiLogo} alt="AUI LOGO" className="login-side-image" />
      </div>
    </div>
  );
};

export default Login;
/*
    <div className="login-container">
        <div className="login-success">
          <h2>Welcome, {formData.username}!</h2>
          <p>
            You have successfully logged in as <strong>{user?.role}</strong>.
          </p>
          <button
            onClick={() => {
              setIsLoggedIn(false);
              setFormData({ username: "", password: "" });
            }}
            className="logout-btn"
          >
            Logout
          </button>
        </div>
      </div>
*/