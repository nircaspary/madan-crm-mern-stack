import { React, useState, useEffect } from 'react';
import Input from './common/Input';
import auth from '../models/Auth';
import Location from './Location';
import * as Http from '../models/Http';
import './form.css';
import { useParams } from 'react-router';
import RenderLoader from './common/RenderLoader';

const MyProfile = (props) => {
  let userId;
  useParams().id === 'my-profile' ? (userId = auth.user().id) : (userId = useParams().id);

  const [id, setId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [cellPhone, setCellPhone] = useState('');
  const [officePhone, setOfficePhone] = useState('');
  const [computerName, setComputerName] = useState('');
  const [location, setFaultLocation] = useState({});
  const [loader, setLoader] = useState(true);

  const fillUserData = async (id) => {
    const { data } = await Http.get(`users/${id}`);
    // Set Form Values If User Exists
    if (data.data.user) {
      const { id, firstName, lastName, email, cellPhone, officePhone, location, computerName } = data.data.user;
      setId(id);
      setFirstName(firstName);
      setLastName(lastName);
      setEmail(email);
      setCellPhone(cellPhone);
      setOfficePhone(officePhone);
      setComputerName(computerName);
      setFaultLocation(location);
      setTimeout(() => setLoader(false), 1000);
    }
  };
  useEffect(() => fillUserData(userId), []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { firstName, lastName, email, cellPhone, officePhone, computerName, location };
    const updatedUser = await Http.patch(`users/${userId}`, user);
  };

  return loader ? (
    <RenderLoader />
  ) : (
    <form className="ui form fault-form" onSubmit={handleSubmit} autoComplete="off" noValidate>
      <h1>{`${firstName}'s ${lastName} Profile`}</h1>
      <input type="button" className="ui button form-element" value="Edit User" />
      <input
        type="button"
        className="ui button form-element red"
        value="Delete User"
        onClick={() => props.history.push(`/admins/user/delete/${userId}`)}
      />
      <div className="field user-id">
        <Input label="id" value={id} type="number" onChange={(e) => setId(e.target.value)} />
      </div>
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
        <Location passLocation={(location) => setFaultLocation(location)} user={location} />
      </div>
      <Input label="Computer Name" value={computerName} type="number" onChange={(e) => setComputerName(e.target.value)} />
      <Input type="submit" value="Submit" className="ui button form-element" />
    </form>
  );
};
export default MyProfile;
