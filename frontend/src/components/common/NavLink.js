import React from 'react';
import { useHistory } from 'react-router-dom';

const NavLink = ({ text, path, icon }) => {
  let history = useHistory();
  return (
    <li className="nav-item" onClick={() => history.push(path)}>
      <i className={`fas fa-${icon}`}></i>
      {text}
    </li>
  );
};
export default NavLink;
