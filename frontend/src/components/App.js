import React, { Fragment } from 'react';
import { Navbar } from './clientComponents/Navbar';
import Form from './clientComponents/Form';
import AdminLogin from './clientComponents/AdminLogin';
import Admins from './adminComponents/Admins';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './app.css';

class App extends React.Component {
  render() {
    return (
      <div className="ui container">
        <Router>
          <Route path="/" component={Navbar} />
          <div className="ui form-container">
            <Route exact path="/" component={Form} />
            <Route exact path="/admin-login" component={AdminLogin} />
            <Route exact path="/admins" component={Admins} />
          </div>
        </Router>
      </div>
    );
  }
}
export default App;
