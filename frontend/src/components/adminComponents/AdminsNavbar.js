import React from 'react';
import auth from '../../models/Auth';
const AdminsNavbar = (props) => {
  return (
    <ul className="nav-links">
      <li className="nav-item" onClick={() => props.history.push('/')}>
        <i className="fas fa-id-badge"></i>
        My Profile
      </li>
      <li
        className="nav-item "
        onClick={() => {
          // auth.logout(() => {
          //   props.history.push('/admin-login');
          // });
        }}
      >
        <i className="fas fa-sign-out-alt"></i>
        Logout
      </li>
    </ul>
  );
};
export default AdminsNavbar;
