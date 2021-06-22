import React, { useState } from 'react';

const User = (props) => {
  const [user, setUser] = useState(props.user);

  return (
    <div className="table-row ui">
      <div className="cell">{user.id}</div>
      <div className="cell">{`${user.firstName} ${user.lastName}`}</div>
      <div className="cell">{user.email}</div>
      <div className="cell">{user.role}</div>
      <div className="cell">
        {user.location.building}
        <br />
        Floor{` ${user.location.floor}`}
        <br /> Room {` ${user.location.roomNumber}`}
      </div>
      <div className="cell">{user.officePhone}</div>
      <div className="cell">{user.cellPhone}</div>
    </div>
  );
};
export default User;
