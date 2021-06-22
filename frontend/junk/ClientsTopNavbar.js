import React from 'react';
import './navbar.css';

const ClientsTopNavbar = (props) => {
  return (
    <>
      <li className="nav-item" onClick={() => props.history.push('/')}>
        <i className="fab fa-wpforms"></i>
        Fault Creation
      </li>

      <li
        className="nav-item admin-login"
        onClick={() => {
          props.history.push('/login');
        }}
      >
        <i className="fas fa-user-shield"></i>
        Admins Login
      </li>
    </>
  );
};
export default ClientsTopNavbar;
