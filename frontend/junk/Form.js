import { React, useState, useEffect } from 'react';
import { useInput } from '../src/hooks/useInput';
import Joi from 'joi-browser';
import Dropdown from '../src/components/common/Dropdown';
import * as Http from '../src/models/Http';
import { buildings, buildingsNames } from '../src/models/Building';
import './form.css';

const Form = () => {
  const [display, setDisplay] = useState('none');
  const { value: id, bind: bindId, reset: resetId } = useInput('');
  const { value: firstName, fetch: fetchFirstName, bind: bindFirstName, reset: resetFirstName } = useInput('');
  const { value: lastName, fetch: fetchLastName, bind: bindLastName, reset: resetLastName } = useInput('');
  const { value: email, fetch: fetchEmail, bind: bindEmail, reset: resetEmail } = useInput('');
  const { value: cellPhone, fetch: fetchCellPhone, bind: bindCellPhone, reset: resetCellPhone } = useInput('');
  const { value: officePhone, fetch: fetchOfficePhone, bind: bindOfficePhone, reset: resetOfficePhone } = useInput('');
  const { value: faultLocation, fetch: fetchFaultLocation, bind: bindFaultLocation, reset: resetFaultLocation } = useInput('');
  const { value: computerName, fetch: fetchComputerName, bind: bindComputerName, reset: resetComputerName } = useInput('');
  const { value: description, bind: bindDescription, reset: resetDescription } = useInput('');

  const data = { id, firstName, lastName, email, cellPhone, officePhone, computerName, description };

  const schema = {
    id: Joi.string().required().trim().max(9).min(9),
    firstName: Joi.string().required().trim().min(2),
    lastName: Joi.string().required().trim().min(2),
    email: Joi.string().required().trim().email(),
    cellPhone: Joi.string()
      .trim()
      .required()
      .length(10)
      .regex(/^0[2-9]\d{7,8}$/),
    officePhone: Joi.string().trim().required().length(7),
    computerName: Joi.string().trim().required().length(5),
    description: Joi.string().trim().required().min(1).max(4000),
  };

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(data, schema, options);
    if (!error) return 'valid';

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  const fillUserData = async (id) => {
    const { data } = await Http.get(`http://127.0.0.1:8000/api/v1/users/${id}`);
    // Set Form Values If User Exists
    if (data.data.user) {
      const { firstName, lastName, email, cellPhone, officePhone, faultLocation, computerName } = data.data.user;
      fetchFirstName(firstName);
      fetchLastName(lastName);
      fetchEmail(email);
      fetchCellPhone(cellPhone);
      fetchOfficePhone(officePhone);
      fetchFaultLocation(faultLocation);
      fetchComputerName(computerName);
    }
    setDisplay('initial');
  };

  const clearInputs = () => {
    resetFirstName();
    resetLastName();
    resetCellPhone();
    resetOfficePhone();
    resetFaultLocation();
    resetComputerName();
    resetDescription();
    resetEmail();
    setDisplay('none');
  };

  useEffect(() => (id.length === 9 ? fillUserData(id) : clearInputs()), [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate() === 'valid') {
      clearInputs();
      resetId();
      sendData();
    }
  };

  const sendData = async () => {
    const user = {
      id,
      firstName,
      lastName,
      email,
      cellPhone,
      officePhone,
      faultLocation,
      computerName,
    };
    // Send User Data To The Users Collection
    const userRes = await Http.post(`http://127.0.0.1:8000/api/v1/users/${user.id}`, user);

    const fault = {
      user_id: userRes.data.data.user._id,
      description,
    };
    // Send Fault Data To The Faults Collection
    const faultRes = await Http.post('http://127.0.0.1:8000/api/v1/faults', fault);
  };

  return (
    <form className="ui form fault-form" onSubmit={handleSubmit} autoComplete="off" noValidate>
      <h1>Fill Form</h1>
      <div className="field user-id">
        <label>ID</label>
        <input type="number" name="id" {...bindId} />
        <small style={{ color: 'red' }}>{validate().id}</small>
      </div>
      <div className="two fields">
        <div className="field form-element" style={{ display: display }}>
          <label>First Name</label>
          <input type="text" name="firstName" {...bindFirstName} />
          <small style={{ color: 'red' }}>{validate().firstName}</small>
        </div>
        <div className="field form-element" style={{ display: display }}>
          <label>Last Name</label>
          <input type="text" name="lastName" {...bindLastName} />
          <small style={{ color: 'red' }}>{validate().lastName}</small>
        </div>
      </div>
      <div className="field form-element" style={{ display: display }}>
        <label>Email</label>
        <input type="email" name="email" {...bindEmail} />
        <small style={{ color: 'red' }}>{validate().email}</small>
      </div>
      <div className="two fields">
        <div className="field form-element" style={{ display: display }}>
          <label>CellPhone</label>
          <input type="number" name="cellPhone" {...bindCellPhone} />
          <small style={{ color: 'red' }}>{validate().cellPhone}</small>
        </div>
        <div className="field form-element" style={{ display: display }}>
          <label>Office Phone Number</label>
          <input type="number" name="officePhone" {...bindOfficePhone} />
          <small style={{ color: 'red' }}>{validate().officePhone}</small>
        </div>
      </div>

      <div className="three fields">
        <div className="field form-element" style={{ display: display }}>
          <label>Building</label>
          <Dropdown options={buildingsNames} />
        </div>
        <div className="field form-element" style={{ display: display }}>
          <label>Floor</label>
          <Dropdown options={buildingsNames} />
        </div>
        <div className="field form-element" style={{ display: display }}>
          <label>Room Number</label>
          <Dropdown options={buildingsNames} />
        </div>
      </div>
      <div className="field form-element" style={{ display: display }}>
        <label>Computer Name</label>
        <input type="number" name="computerName" {...bindComputerName} />
        <small style={{ color: 'red' }}>{validate().computerName}</small>
      </div>
      <div className="field form-element " style={{ display: display }}>
        <label>Fault description</label>
        <textarea name="description" rows="5" {...bindDescription}></textarea>
        <input type="file" name="fileName" className="upload-file" style={{ display: display }}></input>
      </div>

      <input type="submit" className="ui button form-element" value="Submit" style={{ display: display }} />
    </form>
  );
};

export default Form;
