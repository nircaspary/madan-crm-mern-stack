import { React, useState, useEffect } from 'react';
import './form.css';
import * as formController from '../../controllers/formController';
import { useInput } from '../../hooks/useInput';

const Form = () => {
  const [visibility, setVisibility] = useState('inline');
  const { value: id, bind: bindId, reset: resetId } = useInput('');
  const { value: firstName, fetch: fetchFirstName, bind: bindFirstName, reset: resetFirstName } = useInput('');
  const { value: lastName, fetch: fetchLastName, bind: bindLastName, reset: resetLastName } = useInput('');
  const { value: email, fetch: fetchEmail, bind: bindEmail, reset: resetEmail } = useInput('');
  const { value: cellPhone, fetch: fetchCellPhone, bind: bindCellPhone, reset: resetCellPhone } = useInput('');
  const { value: officePhone, fetch: fetchOfficePhone, bind: bindOfficePhone, reset: resetOfficePhone } = useInput('');
  const { value: faultLocation, fetch: fetchFaultLocation, bind: bindFaultLocation, reset: resetFaultLocation } = useInput('');
  const { value: computerName, fetch: fetchComputerName, bind: bindComputerName, reset: resetComputerName } = useInput('');
  const { value: description, bind: bindDescription, reset: resetDescription } = useInput('');

  const fillUserData = async (id) => {
    const { data } = await formController.getUserData(`http://127.0.0.1:8000/api/v1/users/${id}`);
    // Set Form Values If User Exists
    if (data.data.user) {
      const { id, firstName, lastName, email, cellPhone, officePhone, faultLocation, computerName } = data.data.user;
      fetchFirstName(firstName);
      fetchLastName(lastName);
      fetchEmail(email);
      fetchCellPhone(cellPhone);
      fetchOfficePhone(officePhone);
      fetchFaultLocation(faultLocation);
      fetchComputerName(computerName);
    }
    setVisibility('visible');
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
    setVisibility('hidden');
  };

  useEffect(() => {
    id.length === 9 ? fillUserData(id) : clearInputs();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    clearInputs();
    resetId();
    sendData();
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

    const fault = {
      user_id: id,
      description: description,
    };

    // Send User Data To The Users Collection
    const userRes = await formController.postData(`http://127.0.0.1:8000/api/v1/users/${user.id}`, user);
    // Send Fault Data To The Faults Collection
    const faultRes = await formController.postData('http://127.0.0.1:8000/api/v1/faults', fault);
  };

  return (
    <form className="ui form fault-form" onSubmit={handleSubmit} autoComplete="off" noValidate>
      <h1>Fill Form</h1>
      <div className="field user-id">
        <label>ID</label>
        <input type="number" name="id" {...bindId} />
      </div>
      <div className="two fields">
        <div className="field form-element" style={{ visibility: visibility }}>
          <label>First Name</label>
          <input type="text" name="firstName" {...bindFirstName} />
        </div>
        <div className="field form-element" style={{ visibility: visibility }}>
          <label>Last Name</label>
          <input type="text" name="lastName" {...bindLastName} />
        </div>
      </div>
      <div className="field form-element" style={{ visibility: visibility }}>
        <label>Email</label>
        <input type="email" name="email" {...bindEmail} />
      </div>
      <div className="two fields">
        <div className="field form-element" style={{ visibility: visibility }}>
          <label>CellPhone</label>
          <input type="number" name="cellPhone" {...bindCellPhone} />
        </div>
        <div className="field form-element" style={{ visibility: visibility }}>
          <label>Office Phone Number</label>
          <input type="number" name="officePhone" {...bindOfficePhone} />
        </div>
      </div>
      <div className="field form-element" style={{ visibility: visibility }}>
        <label>Fault location</label>
        <input type="text" name="faultLocation" {...bindFaultLocation} />
      </div>
      <div className="field form-element" style={{ visibility: visibility }}>
        <label>Computer Name</label>
        <input type="number" name="computerName" {...bindComputerName} />
      </div>
      <div className="field form-element " style={{ visibility: visibility }}>
        <label>Fault description</label>
        <textarea name="description" rows="5" {...bindDescription}></textarea>
        <input type="file" name="fileName" className="upload-file" style={{ visibility: visibility }}></input>
      </div>

      <input type="submit" className="ui button form-element" value="Submit" style={{ visibility: visibility }} />
    </form>
  );
};

export default Form;
