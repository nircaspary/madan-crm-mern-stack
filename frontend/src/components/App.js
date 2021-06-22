import { React } from 'react';
import { Navbar } from './Navbar';
import { Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from '../models/ProtectedRoutes';
import Form from './Form';
import ForgotPassword from './ForgotPassword';
import Login from './Login';
import Logout from './Logout';
import CreateUser from './CreateUser';
import Admins from './Admins';
import UserProfile from './UserProfile';
import FaultPage from './FaultPage';
import NotFound from './common/404';
import DeleteItem from './common/DeleteItem';
import './app.css';

const App = () => {
  return (
    <div className="ui container">
      <Route path="/" component={Navbar} />
      <div className="ui form-container">
        <Switch>
          <Route exact path="/" component={Form} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/login/forgotPassword" component={ForgotPassword} />
          <ProtectedRoute exact path="/logout" component={Logout} />
          <ProtectedRoute exact path="/admins/faults" component={Admins} />
          <ProtectedRoute exact path="/admins/faults/:id" component={FaultPage} />
          <ProtectedRoute exact path="/admins/create-user" component={CreateUser} isAdmin={true} />
          <ProtectedRoute exact path="/admins/users" component={Admins} isAdmin={true} />
          <ProtectedRoute exact path="/admins/user/delete/:id" component={DeleteItem} />
          <ProtectedRoute exact path="/admins/faults/delete/:id" component={DeleteItem} />
          <ProtectedRoute exact path="/admins/users/:id" component={UserProfile} />
          <Route path="/:id" component={NotFound} />
        </Switch>
      </div>
    </div>
  );
};
export default App;
