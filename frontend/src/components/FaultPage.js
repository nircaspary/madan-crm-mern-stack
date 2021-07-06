import React, { useState, useEffect } from 'react';
import * as Http from '../models/Http';
import { useParams } from 'react-router';
import Input from './common/Input';
import RenderLoader from './common/RenderLoader';
import { format } from '../helpers/formatDateTime';
import Dropdown from './common/Dropdown';
import Log from './Log';
import './css/faultPage.css';

const FaultPage = () => {
  const faultId = useParams().id;
  const [user, setUser] = useState({});
  const [logs, setLogs] = useState([]);
  const [team, setTeam] = useState('');
  const [description, setDescription] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [loading, setLoading] = useState(true);

  const disabled = { pointerEvents: 'none' };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await Http.get(`faults/${faultId}`);
        const { description, logs, createdAt, team, user_id } = data.data.fault;
        setUser(user_id);
        setLogs(logs);
        setTeam(team);
        setLoading(false);
        setDescription(description);
        setCreatedAt(format(createdAt));
      } catch (err) {
        console.log(err.response);
      }
    })();
  }, []);

  const role = ['help desk', 'tech', 'lab', 'info'].filter((role) => role !== team);
  return (
    <div className="fault-page-container">
      {loading ? (
        <RenderLoader />
      ) : (
        <>
          <div className="fault-details">
            <h2>Fault number {faultId.substr(faultId.length - 5)}</h2>
            <form className="ui form " autoComplete="off" novalidates="true">
              <Input label="Description" type="textarea" value={description} onChange={(e) => setDescription(e.target.value)} />
              <Input label="Created At" value={createdAt} onChange={(e) => setTeam(e.target.value)} style={disabled} />
              <Dropdown label={'team'} options={role} header={team} />
            </form>

            <div className="logs-container">
              {logs ? logs.map((log) => <Log description={log.description} createdAt={log.createdAt} />) : console.log(logs)}
            </div>
          </div>
          <div className="user-details">
            <h2>User ID {user.id}</h2>
            <form className="ui form " autoComplete="off" novalidates="true" style={disabled}>
              <div className="two fields">
                <Input label="First Name" defaultValue={user.firstName} />
                <Input label="Last Name" defaultValue={user.lastName} />
              </div>
              <Input label="Building" defaultValue={user.location.building} />
              <Input label="floor" defaultValue={user.location.floor} />
              <Input label="roomNumber" defaultValue={user.location.roomNumber} />
              <Input label="Cell Phone" defaultValue={user.cellPhone} />
              <Input label="Office Phone" defaultValue={user.officePhone} />
              <Input label="Email" defaultValue={user.email} />
              <Input label="role" defaultValue={user.role} />
            </form>
          </div>
        </>
      )}
    </div>
  );
};
export default FaultPage;
