import { React, useContext, useState } from 'react';
import { faultsContext } from '../contexts/loggedInContexts';
import Fault from './Fault';

const Faults = () => {
  const { faults } = useContext(faultsContext);

  return (
    <>
      {faults.map((fault) => (
        <Fault fault={fault} key={fault._id} />
      ))}
    </>
  );
};
export default Faults;
