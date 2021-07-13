import React, { useState, useEffect } from 'react';
import Dropdown from './common/Dropdown';
import { buildings, floors, roomNumbers } from '../helpers/locations';

const Location = ({ passLocation, userLocation }) => {
  const [location, setLocation] = useState({ building: userLocation.building, floor: userLocation.floor, roomNumber: userLocation.roomNumber });

  useEffect(() => passLocation(location), [location]);

  return (
    <>
      <div className="field form-element">
        <Dropdown
          label="Building"
          header={location.building || 'Select Building'}
          options={buildings}
          onChange={(e) => setLocation({ ...location, building: e.target.value })}
        />
      </div>
      <div className="field form-element">
        <Dropdown
          label="Floor"
          header={location.floor || 'Select Floor'}
          options={floors(8)}
          onChange={(e) => setLocation({ ...location, floor: e.target.value })}
        />
      </div>
      <div className="field form-element">
        <Dropdown
          label="Room Number"
          header={location.roomNumber || 'Select Room Number'}
          options={roomNumbers(location.floor)}
          onChange={(e) => setLocation({ ...location, roomNumber: e.target.value })}
        />
      </div>
    </>
  );
};
export default Location;
