import { React } from 'react';
import ForgotPasswordAuth from './ForgotPasswordAuth';
import ForgotPasswordEmail from './ForgotPasswordEmail';
import { Route } from 'react-router-dom';

const ForgotPassword = () => {
  return (
    <>
      <Route exact path="/login/forgot-password/auth" component={ForgotPasswordAuth} />;
      <Route exact path="/login/forgot-password" component={ForgotPasswordEmail} />;
    </>
  );
};

export default ForgotPassword;
