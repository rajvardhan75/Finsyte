import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        FinSyte<span className="dot">.</span>com
      </div>

      <ul className="nav-menu">
        <li><a href="#home">Home</a></li>
        <li><a href="#services">Service</a></li>
        <li><a href="#about">About</a></li>
      </ul>

      <div className="nav-actions">
        <button className="btn login-btn">Login</button>
        <button className="btn primary-btn">SignUp</button>
      </div>
    </nav>
  );
};

export default Navbar;
