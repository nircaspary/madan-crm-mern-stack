import React from "react";

import { useForm } from "react-hook-form";
import "./form.css";
import schema from "../../models/FormValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as formController from "../../controllers/formController.js";
import * as formView from "../../views/formView.js";

const Form = () => {
  const { register, handleSubmit, setValue, watch, errors } = useForm({
    resolver: zodResolver(schema),
  });
  const idInput = watch("id", "");
  // Check If The Id Input Equals 9!
  if (idInput.length === 9) {
    (async (idInput) => {
      const { data } = await formController.getUserData(
        `http://127.0.0.1:8000/api/v1/users/${idInput}`
      );
      // Set Form Values If User Exists
      if (data.data.user) {
        for (let i = 2; i < Object.values(data.data.user).length; i++) {
          setValue(
            Object.keys(data.data.user)[i],
            Object.values(data.data.user)[i]
          );
        }
      }

      // Set Form Values To Empty String If User Not Exists
      else {
        formView.clearForm();
      }
      // Make Form Visible
      formView.formVisible();
    })(idInput);
  } else {
    // Make Form Invisible If Id Input Not Equals 9
    formView.formInvisible();
  }

  const onSubmit = async (data) => {
    const user = {
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      cellPhone: data.cellPhone,
      officePhone: data.officePhone,
      faultLocation: data.faultLocation,
      computerName: data.computerName,
    };
    const fault = {
      user_id: data.id,
      description: data.description,
    };
    // Send User Data To The Users Collection
    const userRes = await formController.postData(
      `http://127.0.0.1:8000/api/v1/users/${user.id}`,
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
      onSubmit={handleSubmit(onSubmit)}
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
        <input type="number" name="id" ref={register} />
        <p>{errors.id?.message}</p>
      </div>
      <div className="two fields">
        <div className="field form-element">
          <label>First Name</label>
          <input type="text" name="firstName" ref={register} />
          <p>{errors.firstName?.message}</p>
        </div>
        <div className="field form-element">
          <label>Last Name</label>
          <input type="text" name="lastName" ref={register} />
          <p>{errors.lastName?.message}</p>
        </div>
      </div>
      <div className="field form-element">
        <label>Email</label>
        <input type="email" name="email" ref={register} />
        <p>{errors.email?.message}</p>
      </div>
      <div className="two fields">
        <div className="field form-element">
          <label>CellPhone</label>
          <input type="number" name="cellPhone" maxLength="9" ref={register} />
          <p>{errors.cellPhone?.message}</p>
        </div>
        <div className="field form-element">
          <label>Office Phone Number</label>
          <input
            type="number"
            name="officePhone"
            maxLength="7"
            ref={register}
          />
          <p>{errors.officePhone?.message}</p>
        </div>
      </div>
      <div className="field form-element">
        <label>Fault location</label>
        <input type="text" name="faultLocation" ref={register} />
        <p>{errors.faultLocation?.message}</p>
      </div>
      <div className="field form-element">
        <label>Computer Name</label>
        <input type="number" name="computerName" maxLength="5" ref={register} />
        <p>{errors.computerName?.message}</p>
      </div>
      <div className="field form-element">
        <label>Fault description</label>
        <textarea name="description" ref={register} rows="5"></textarea>
        <input type="file" name="fileName" className="upload-file"></input>
      </div>

      <input type="submit" className="ui button form-element" value="Submit" />
    </form>
  );
};

// export default Form;
