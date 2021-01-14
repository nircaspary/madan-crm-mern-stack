import React, { Fragment } from "react";
import Navbar from "./clientComponents/Navbar";
import Form from "./clientComponents/Form";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./app.css";

class App extends React.Component {
  render() {
    return (
      <div className="ui container">
        <Navbar />
        <Form />
      </div>
    );
  }
}
export default App;
