import React from 'react';
import { Redirect, Router, Route } from 'react-router-dom';
import auth from '../models/Auth';

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.isAuthenticated()) {
          return <Component {...props} />;
        } else {
          return <Redirect to={{ pathname: '/' }} />;
        }
      }}
    />
  );
};
