import React from 'react';
import '.././clientComponents/navbar.css';
const AdminsTopNavbar = (props) => {
  return (
    <>
      <li className="nav-item" onClick={() => props.history.push('/admins/faults')}>
        <i className="fas fa-tools"></i>
        Faults
      </li>

      <li
        className="nav-item admin-login"
        onClick={() => {
          props.history.push('/admins/users');
        }}
      >
        <i className="fas fa-user"></i>
        Users
      </li>
    </>
  );
};
export default AdminsTopNavbar;
