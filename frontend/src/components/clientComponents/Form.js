import { React, useState, useEffect } from "react";
import "./form.css";
import schema from "../../models/FormValidationSchema";
import * as formController from "../../controllers/formController";
import * as formView from "../../views/formView.js";

const Form = () => {
  const [_id, setId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [cellPhone, setCellPhone] = useState("");
  const [officePhone, setOfficePhone] = useState("");
  const [faultLocation, setFaultLocation] = useState("");
  const [computerName, setComputerName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    _id.length === 9
      ? formController.fillUserData(_id)
      : formView.formInvisible();
    console.log(_id, firstName);
  }, [_id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendData();
  };

  const sendData = async () => {
    const user = {
      _id,
      firstName,
      lastName,
      email,
      cellPhone,
      officePhone,
      faultLocation,
      computerName,
    };

    const fault = {
      user_id: _id,
      description: description,
    };

    // Send User Data To The Users Collection
    const userRes = await formController.postData(
      `http://127.0.0.1:8000/api/v1/users/${user._id}`,
      user
    );
    // Send Fault Data To The Faults Collection
    const faultRes = await formController.postData(
      "http://127.0.0.1:8000/api/v1/faults",
      fault
    );
  };

  return (
    <form
      className="ui form"
      onSubmit={handleSubmit}
      autoComplete="off"
      noValidate
    >
      {/* <div className="header-container">
        <button className="ui button clear" onClick={onClearClick}>
          Clear Form
        </button>
      </div> */}
      <h1>Fill Form</h1>
      <div className="field user-id">
        <label>ID</label>
        <input
          type="number"
          name="_id"
          value={_id}
          onChange={(e) => setId(e.target.value)}
        />
      </div>
      <div className="two fields">
        <div className="field form-element">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="field form-element">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>
      <div className="field form-element">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="two fields">
        <div className="field form-element">
          <label>CellPhone</label>
          <input
            type="number"
            name="cellPhone"
            value={cellPhone}
            onChange={(e) => setCellPhone(e.target.value)}
          />
        </div>
        <div className="field form-element">
          <label>Office Phone Number</label>
          <input
            type="number"
            name="officePhone"
            value={officePhone}
            onChange={(e) => setOfficePhone(e.target.value)}
          />
        </div>
      </div>
      <div className="field form-element">
        <label>Fault location</label>
        <input
          type="text"
          name="faultLocation"
          value={faultLocation}
          onChange={(e) => setFaultLocation(e.target.value)}
        />
      </div>
      <div className="field form-element">
        <label>Computer Name</label>
        <input
          type="number"
          name="computerName"
          value={computerName}
          onChange={(e) => setComputerName(e.target.value)}
        />
      </div>
      <div className="field form-element">
        <label>Fault description</label>
        <textarea
          name="description"
          rows="5"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <input type="file" name="fileName" className="upload-file"></input>
      </div>

      <input type="submit" className="ui button form-element" value="Submit" />
    </form>
  );
};

export default Form;
