import { React, useState } from 'react';
import Faults from './Faults';
import Navbar from './Navbar';
import * as formController from '../../controllers/formController';
import { FaultsContext } from '../../contexts/FaultsContext';
import './admins.css';

const rules = ['Help Desk', 'Technitions', 'Lab', 'Information Systems'];
const Admins = () => {
  const [faults, setFaults] = useState([]);

  return (
    <>
      <FaultsContext.Provider value={{ faults, setFaults }}>
        <Navbar rules={rules} />

        <Faults />
      </FaultsContext.Provider>
    </>
  );
};
export default Admins;
