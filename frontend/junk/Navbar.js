import { React, useState, useContext } from 'react';
import * as formController from '../src/controllers/formController';
import { FaultsContext } from '../src/contexts/FaultsContext';

const Navbar = ({ roles }) => {
  const [selected, setSelected] = useState(null);
  const { setFaults } = useContext(FaultsContext);

  const handleClick = (i, item) => {
    setSelected(i);
  };
  return (
    <div className="admins-navbar">
      <div className="admins-nav-side left">
        <h2>Faults</h2>
        <ul className="admins-nav-links">
          {roles.map((role, i) => {
            const activeBgc = i === selected ? 'white' : '';
            const activeBorder = i === selected ? 'none' : '';
            return (
              <li
                key={role}
                style={{ backgroundColor: activeBgc, borderBottom: activeBorder }}
                className={`link`}
                onClick={async () => {
                  handleClick(i, role);
                  const faults = await formController.getData(
                    `http://127.0.0.1:8000/api/v1/faults`,
                    localStorage.getItem('token'),
                    role
                  );
                  setFaults(faults.data.data.faults);
                }}
              >
                {role}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="admins-nav-side right">
        <h3>Last Login</h3>
        <p>lorem ipsum</p>
      </div>
    </div>
  );
};
export default Navbar;
