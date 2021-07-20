import React, { useState } from 'react';
import { useHistory } from 'react-router';
import './css/user.css';

const User = (props) => {
  const history = useHistory();
  const [user] = useState(props.user);
  const handleDoubleClick = () => history.push(`/admins/users/${user.id}`);

  return (
    <div className="ui styled fluid accordion">
      <div className="table-row ui" onClick={handleDoubleClick}>
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
    </div>
  );
};
export default User;
