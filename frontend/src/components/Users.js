import { React, useEffect, useState, useContext } from 'react';
import User from './User';
import * as Http from '../models/Http';
import './admins.css';
import { usersContext } from '../contexts/loggedInContexts';

const Users = (props) => {
  const { users } = useContext(usersContext);

  const handleDoubleClick = (user) => props.history.push(`/admins/users/${user.id}`);

  return (
    <>
      {users.map((user) => {
        return (
          <div key={user.id} className="ui styled fluid accordion" onDoubleClick={() => handleDoubleClick(user)}>
            <User user={user} />
          </div>
        );
      })}
    </>
  );
};
export default Users;
