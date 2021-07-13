import { React, useState, useEffect } from 'react';
import Input from './common/Input';
import * as Http from '../models/Http';
import { useHistory } from 'react-router-dom';

const ForgotPasswordEmail = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await Http.post('auth/forgotPassword', { email });
      if (res) history.replace('/login/forgot-password/auth');
    } catch (err) {
      setErrors(err.response.data.message);
    }
  };

  return (
    <form className="ui form login-form" autoComplete="off" noValidate onSubmit={handleSubmit}>
      <h1>Forgot your password?</h1>
      <p style={{ textAlign: 'center' }}>please enter your email address for validation</p>
      <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ex: user@gmail.com" />
      <input type="submit" value="Get verification code" className="ui button form-element" />
      <p style={{ textAlign: 'center', color: 'red', fontSize: '20px' }}>{errors}</p>
    </form>
  );
};

export default ForgotPasswordEmail;
