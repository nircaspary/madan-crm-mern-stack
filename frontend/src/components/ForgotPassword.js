import { React } from 'react';
import ForgotPasswordAuth from './ForgotPasswordAuth';
import ForgotPasswordEmail from './ForgotPasswordEmail';
import { Route } from 'react-router-dom';

const ForgotPassword = () => {
  return (
    <>
      <Route exact path="/login/forgotPassword" component={ForgotPasswordEmail} />;
      <Route exact path="/login/forgotPassword/auth" component={ForgotPasswordAuth} />;
    </>
  );
};

export default ForgotPassword;
