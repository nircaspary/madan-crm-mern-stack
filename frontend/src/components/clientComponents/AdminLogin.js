import { React, useState, useEffect } from 'react';
import { useInput } from '../../hooks/useInput';
import * as formController from '../../controllers/formController';
import auth from '../../models/Auth';

const AdminLogin = (props) => {
  const { value: id, bind: bindId } = useInput('');
  const { value: password, bind: bindPassword } = useInput('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    sendData();
  };
  const sendData = async () => {
    const user = {
      id,
      password,
    };
    const res = await formController.postData(`http://127.0.0.1:8000/api/v1/auth/`, user);
    if (res.data) {
      auth.login(() => {
        const token = res.data.token;
        localStorage.setItem('token', token);
        props.history.push('/admins');
        console.log(auth.isAuthenticated());
      });
    }
  };
  return (
    <form className="ui form login-form" onSubmit={handleSubmit} autoComplete="off" noValidate>
      <h1>Admins Login</h1>
      <div className="field user-id">
        <label>ID</label>
        <input type="number" name="id" {...bindId} />
      </div>
      <div className="field user-password">
        <label>Password</label>
        <input type="password" name="password" {...bindPassword} />
      </div>
      <input type="submit" className="ui button form-element" value="Login" />
    </form>
  );
};
export default AdminLogin;
