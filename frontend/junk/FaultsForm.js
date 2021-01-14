import React from "react";
import "./form.css";
import axios from "axios";

class FaultsForm extends React.Component {
  state = {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    cellPhone: "",
    officePhone: "",
    faultLocation: "",
    computerName: "",
    description: "",
  };

  handleSubmit = (event) => {
    (async () => {
      try {
        const res = await axios.post(
          "http://127.0.0.1:8000/api/v1/faults",
          this.state
        );
        console.log(res);
      } catch (err) {
        console.error(err);
      }
    })();
    event.preventDefault();
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <form className="ui form" onSubmit={this.handleSubmit}>
        <h1>Fill Form</h1>
        <div className="field">
          <label>ID</label>
          <input
            placeholder="Enter ID"
            type="text"
            name="id"
            value={this.state.id}
            onChange={this.handleChange}
          />
        </div>
        <div className="two fields">
          <div className="field">
            <label>First Name</label>
            <input
              placeholder="Enter First Name"
              type="text"
              name="firstName"
              value={this.state.firstName}
              onChange={this.handleChange}
            />
          </div>
          <div className="field">
            <label>Last Name</label>
            <input
              placeholder="Enter Last Name"
              type="text"
              name="lastName"
              value={this.state.lastName}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="field">
          <label>Email</label>
          <input
            placeholder="Enter Email"
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </div>
        <div className="field">
          <label>CellPhone</label>
          <input
            placeholder="Enter CellPhone"
            type="text"
            name="cellPhone"
            value={this.state.cellPhone}
            onChange={this.handleChange}
          />
        </div>
        <div className="field">
          <label>Office Phone Number</label>
          <input
            placeholder="Enter Office Phone Number"
            type="text"
            name="officePhone"
            value={this.state.officePhone}
            onChange={this.handleChange}
          />
        </div>
        <div className="field">
          <label>Fault location</label>
          <input
            placeholder="Enter Fault Location"
            type="text"
            name="faultLocation"
            value={this.state.faultLocation}
            onChange={this.handleChange}
          />
        </div>
        <div className="field">
          <label>Computer Name</label>
          <input
            placeholder="Enter Computer Name"
            type="text"
            name="computerName"
            value={this.state.computerName}
            onChange={this.handleChange}
          />
        </div>
        <div className="field">
          <label>Fault description</label>
          <textarea
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
          ></textarea>
          <input type="file" name="fileName"></input>
        </div>

        <submit className="ui submit button primary">Submit</submit>
      </form>
    );
  }
}

export default FaultsForm;
