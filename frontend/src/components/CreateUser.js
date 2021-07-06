import { React, useState, useEffect } from 'react';
import Input from './common/Input';
import Location from './Location';
import Dropdown from './common/Dropdown';
import * as Http from '../models/Http';
import './form.css';

const CreateUser = () => {
  const [id, setId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [cellPhone, setCellPhone] = useState('');
  const [officePhone, setOfficePhone] = useState('');
  const [computerName, setComputerName] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [location, setLocation] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    sendData();
  };

  const sendData = async () => {
    const user = { id, firstName, lastName, email, cellPhone, location, officePhone, computerName, role, password, passwordConfirm };
    // Send User Data To The Users Collection
    const userRes = await Http.post('users', user);
  };

  return (
    <form className="ui form fault-form" onSubmit={handleSubmit} autoComplete="off" noValidate>
      <h1> Create User </h1>
      <Input label="ID" value={id} onChange={(e) => setId(e.target.value)} />
      <div className="two fields">
        <Input label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <Input label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </div>
      <Input label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <div className="two fields">
        <Input label="Cell Phone" value={cellPhone} type="number" onChange={(e) => setCellPhone(e.target.value)} />
        <Input label="Office Phone" value={officePhone} onChange={(e) => setOfficePhone(e.target.value)} />
      </div>
      <div className="three fields">
        <Location passLocation={(location) => setLocation(location)} />
      </div>
      <Input label="Computer Name" value={computerName} type="number" onChange={(e) => setComputerName(e.target.value)} />
      <div className="field form-element">
        <label>Role</label>
        <Dropdown options={['admin', 'lab', 'info', 'help desk']} header="Choose A role" getSelected={(e) => setRole(e)} />
      </div>
      <div className="two fields">
        <Input label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Input label="passwordConfirm" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
      </div>
      <Input type="submit" value="Submit" className="ui button form-element" />
    </form>
  );
};

export default CreateUser;
