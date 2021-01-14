import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./navbar.css";
const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li className="logo">CRM-MADAN</li>
        <li className="nav-item">
          <i className="fab fa-wpforms"></i>
          Fault Creation
        </li>
        <li className="nav-item admin-login">
          <i className="fas fa-user-shield"></i>
          Admins
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
