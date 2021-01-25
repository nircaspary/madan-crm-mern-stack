import { React, useState, useContext } from 'react';
import * as formController from '../../controllers/formController';
import { FaultsContext } from '../../contexts/FaultsContext';

const Navbar = ({ rules }) => {
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
          {rules.map((rule, i) => {
            const activeBgc = i === selected ? 'white' : '';
            const activeBorder = i === selected ? 'none' : '';
            return (
              <li
                key={rule}
                style={{ backgroundColor: activeBgc, borderBottom: activeBorder }}
                className={`link`}
                onClick={async () => {
                  handleClick(i, rule);
                  const faults = await formController.getData(
                    `http://127.0.0.1:8000/api/v1/faults`,
                    localStorage.getItem('token'),
                    rule
                  );
                  setFaults(faults.data.data.faults);
                }}
              >
                {rule}
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
