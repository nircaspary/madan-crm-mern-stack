import { React, useState, useEffect } from 'react';
import Input from './common/Input';
import * as Http from '../models/Http';
import { useHistory } from 'react-router-dom';

const ForgotPasswordEmail = () => {
  const [email, setEmail] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await Http.post('auth/forgotPassword', { email });
      if (res) history.replace('/login/forgotPassword/auth');
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  return (
    <form className="ui form login-form" autoComplete="off" noValidate onSubmit={handleSubmit}>
      <h1>Forgot your password?</h1>
      <p style={{ textAlign: 'center' }}>please enter your email address for validation</p>
      <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ex: user@gmail.com" />
      <Input type="submit" value="Get verification code" className="ui button form-element" />
    </form>
  );
};

export default ForgotPasswordEmail;
