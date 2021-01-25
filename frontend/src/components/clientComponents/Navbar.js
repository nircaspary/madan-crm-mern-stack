import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { ProtectedRoute } from '../.././models/ProtectedRoutes';
import AdminsNavbar from '../adminComponents/AdminsNavbar';
import auth from '../../models/Auth';
import Admins from '../adminComponents/Admins';
import './navbar.css';
export const Navbar = (props) => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li className="logo">CRM-MADAN</li>
        <li className="nav-item" onClick={() => props.history.push('/')}>
          <i className="fab fa-wpforms"></i>
          Fault Creation
        </li>
        <li
          className="nav-item admin-login"
          onClick={() => {
            props.history.push('/admin-login');
          }}
        >
          <i className="fas fa-user-shield"></i>
          Admins
        </li>
      </ul>

      <ProtectedRoute path="/" component={AdminsNavbar} />
    </nav>
  );
};
