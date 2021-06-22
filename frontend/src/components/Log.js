import React from 'react';
import { format } from '../helpers/formatDateTime';
import './css/log.css';

const Log = ({ description, createdAt }) => {
  return (
    <div className="log">
      <p>{description}</p>
      <p>{format(createdAt)}</p>
    </div>
  );
};

export default Log;
