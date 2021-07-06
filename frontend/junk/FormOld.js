import { React, useState, useEffect } from 'react';
import Input from './common/Input';
import Location from './Location';
import * as Http from '../models/Http';
import axios from 'axios';
import './form.css';

const Form = () => {
  const [display, setDisplay] = useState(false);
  const [id, setId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [cellPhone, setCellPhone] = useState('');
  const [officePhone, setOfficePhone] = useState('');
  const [computerName, setComputerName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState({});
  const [images, setImages] = useState([]);

  const fillUserData = async (id) => {
    const { data } = await Http.get(`users/${id}`);
    // Set Form Values If User Exists
    if (data.data.user) {
      const { firstName, lastName, email, cellPhone, officePhone, location, computerName, description } = data.data.user;
      setFirstName(firstName);
      setLastName(lastName);
      setEmail(email);
      setCellPhone(cellPhone);
      setOfficePhone(officePhone);
      setComputerName(computerName);
      setDescription(description);
      setLocation(location);
    } else {
      setFirstName('');
      setLastName('');
      setEmail('');
      setCellPhone('');
      setOfficePhone('');
      setComputerName('');
      setDescription('');
      setLocation({});
    }
    setDisplay(true);
  };

  useEffect(() => (id.length === 9 ? fillUserData(id) : setDisplay(false)), [id]);

  const onSubmit = (e) => {
    e.preventDefault();
    sendData();
  };

  const sendData = async () => {
    const user = { id, firstName, lastName, email, cellPhone, officePhone, computerName, location };
    // Send User Data To The Users Collection
    const userRes = await Http.post(`auth/signup/${user.id}`, user);
    const user_id = userRes.data.data.user._id;

    const fault = new FormData();
    fault.append('user_id', user_id);
    fault.append('description', description);
    for (let e of images) fault.append('images', e);

    // Send Fault Data To The Faults Collection
    const faultRes = await axios.post('http://127.0.0.1:8000/api/v1/faults', fault, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  };

  return (
    <form className="ui form fault-form" onSubmit={onSubmit} autoComplete="off" noValidate>
      <h1>Fill Form</h1>
      <Input label="ID" value={id} type="number" onChange={(e) => setId(e.target.value)} />
      {display ? (
        <>
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
          <Input label="Description" value={description} type="textarea" onChange={(e) => setDescription(e.target.value)} />
          <Input label="Images Upload" type="file" multiple={true} onChange={(e) => setImages(e.target.files)} />
          <Input type="submit" value="Submit" className="ui button form-element" />
        </>
      ) : null}
    </form>
  );
};

export default Form;
