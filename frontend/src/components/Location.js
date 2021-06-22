import React, { useState, useEffect } from 'react';
import Dropdown from './common/Dropdown';
import { buildings, floors, roomNumbers } from '../helpers/locations';

const Location = ({ passLocation, user }) => {
  const propsLocation = { building: user.building, floor: user.floor, roomNumber: user.roomNumber };
  const [building, setBuilding] = useState('');
  const [floor, setfloor] = useState('');
  const [roomNumber, setroomNumber] = useState('');
  const [location, setLocation] = useState(propsLocation);

  const createLocation = () => {
    const locations = [building, floor, roomNumber];
    const locationCopy = { ...location };
    let cnt = 0;
    for (let i in locationCopy) {
      locationCopy[i] = locations[cnt];
      cnt++;
    }
    return locationCopy;
  };

  useEffect(() => (building && floor ? setLocation(createLocation()) : null), [roomNumber]);
  useEffect(() => passLocation(location), [location]);
  return (
    <>
      <div className="field form-element">
        <label>Building</label>
        <Dropdown options={buildings} header={location.building || 'Select Building'} getSelected={(e) => setBuilding(e)} />
      </div>
      <div className="field form-element">
        <label>Floor</label>
        <Dropdown options={floors(8)} header={location.floor || 'Select Floor'} getSelected={(e) => setfloor(e)} />
      </div>
      <div className="field form-element">
        <label>Room Number</label>
        <Dropdown options={roomNumbers(floor)} header={location.roomNumber || 'Select Room Number'} getSelected={(e) => setroomNumber(e)} />
      </div>
    </>
  );
};
export default Location;
