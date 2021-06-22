import React, { useState, useEffect } from 'react';
import * as Http from '../models/Http';
import { useParams } from 'react-router';
import Input from './common/Input';
import { format } from '../helpers/formatDateTime';
import Dropdown from './common/Dropdown';
import Log from './Log';
import Location from './Location';
import './css/faultPage.css';

const FaultPage = () => {
  const faultId = useParams().id;
  const [id, setId] = useState('');
  const [description, setDescription] = useState('');
  const [team, setTeam] = useState('');
  const [logs, setLogs] = useState([]);
  const [createdAt, setCreatedAt] = useState('');
  const [user, setUser] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const { data } = await Http.get(`faults/${faultId}`);
        const { _id, description, logs, createdAt, team, user_id } = data.data.fault;
        setId(_id);
        setDescription(description);
        setLogs(logs);
        setCreatedAt(createdAt);
        setTeam(team);
        setUser(user_id);
      } catch (err) {
        console.log(err.response.data.message);
      }
    })();
  }, []);
  const roles = ['help desk', 'tech', 'lab', 'info'].filter((role) => role !== team);
  return (
    <div className="fault-page-container">
      <div className="fault-details">
        <h2>Fault number {id.substr(id.length - 5)}</h2>
        <form className="ui form " autoComplete="off" noValidate>
          <Input label="Description" value={description} type="textarea" onChange={(e) => setDescription(e.target.value)} />
          <Input label="Created At" value={format(createdAt)} type="text" />

          <Dropdown options={roles} header={team} getSelected={(e) => setTeam(e)} />
        </form>

        <div className="logs-container">
          {logs.map((log) => (
            <Log description={log.description} createdAt={log.createdAt} />
          ))}
        </div>
      </div>
      <div className="user-details">
        <h2>User ID {user.id}</h2>
        <form className="ui form " autoComplete="off" noValidate>
          <div className="two fields">
            <Input label="First Name" value={user.firstName} type="text" />
            <Input label="Last Name" value={user.lastName} type="text" />
          </div>
          <Location passLocation={(e) => console.log(e)} />
          <Input label="Cell Phone" value={user.cellPhone} type="text" />
          <Input label="Office Phone" value={user.officePhone} type="text" />
          <Input label="Email" value={user.email} type="text" />
          <Input label="role" value={user.role} type="text" />
        </form>
      </div>
    </div>
  );
};
export default FaultPage;
