import React, { useState, useEffect, useContext } from 'react';
import { filtersContext } from '../contexts/loggedInContexts';
import * as Http from '../models/Http';
import { formatDateTime } from '../helpers/formatDateTime';
import { useHistory } from 'react-router-dom';
import './css/fault.css';

const Fault = (props) => {
  const [fault, setFault] = useState(props.fault);
  const [expand, setExpand] = useState('');
  const [lastLog, setLastLog] = useState('');
  const history = useHistory();

  useEffect(() => {
    (async () => {
      try {
        if (expand && !lastLog) {
          const { data } = await Http.get(`faults/${fault._id}/faultLogs`);
          data.data.faultLogs[data.data.faultLogs.length - 1]
            ? setLastLog(data.data.faultLogs[data.data.faultLogs.length - 1])
            : setLastLog('There is no logs to this fault yet');
        }
      } catch (err) {
        console.log(err.response.data.message);
      }
    })();
  }, [expand]);

  const handleChange = async (id, fault) => await Http.patch(`faults/${id}`, fault);

  const handleIsDone = () => {
    const updatedFault = { ...fault };
    if (fault.isDone) {
      updatedFault.isDone = false;
      updatedFault.completed_at = 'Not complete';
    } else {
      updatedFault.isDone = true;
      updatedFault.completed_at = formatDateTime(Date.now());
    }
    setFault(updatedFault);
    handleChange(fault._id, updatedFault);
  };

  const handleTeamChange = (e) => {
    const updatedFault = { ...fault, team: e.target.value };
    setFault(updatedFault);
    handleChange(fault._id, updatedFault);
  };

  const expandFault = (e) => {
    if (e.target.type) return;
    expand ? setExpand('') : setExpand('active');
  };

  const roles = ['help desk', 'tech', 'lab', 'info'].filter((role) => role !== fault.team);

  return (
    <div className="ui styled fluid accordion">
      <div className={`table-row ui ${expand} title`} onClick={expandFault} onDoubleClick={() => history.push(`/admins/faults/${fault._id}`)}>
        <div className="cell">{`${fault._id.substr(fault._id.length - 5)}`}</div>
        <div className="cell">{`${fault.user_id.firstName} ${fault.user_id.lastName}`}</div>

        <div className="cell">{fault.user_id.officePhone}</div>
        <div className="cell">
          {fault.user_id.location.building}
          <br />
          Floor{` ${fault.user_id.location.floor}`}
          <br /> Room {` ${fault.user_id.location.roomNumber}`}
        </div>
        <div className="cell">{fault.user_id.computerName}</div>
        <div className="cell line-description">{fault.description}</div>
        <div className="cell">
          <select className="browser-default custom-select" onChange={(e) => handleTeamChange(e)}>
            <option value={fault.team}>{fault.team}</option>
            {roles.map((role) => {
              return (
                <option key={role} value={role}>
                  {role}
                </option>
              );
            })}
          </select>
        </div>
        <div className="cell">{formatDateTime(fault.createdAt)}</div>
        <div className="cell">{fault.completed_at}</div>
        <div className="cell">
          <input type="checkbox" checked={fault.isDone} onChange={() => handleIsDone()} style={{ transform: 'scale(1.5)' }} />
        </div>
      </div>
      {/* Fault Description And Now */}
      <div className={`table-row ${expand} content`}>
        <div className="content-container">
          <div className="cell description">
            <h4>Fault Description</h4>
            {fault.description}
            <br />
            <small>{formatDateTime(fault.createdAt)}</small>
          </div>
          <div className="cell description">
            <h4>Fault Description Up to date</h4>
            {lastLog.description || lastLog}
            <br />
            <small>{lastLog.createdAt && formatDateTime(lastLog.createdAt)}</small>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Fault;
