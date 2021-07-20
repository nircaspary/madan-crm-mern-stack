import { React, useState, useEffect } from 'react';
import Input from './common/Input';
import * as Http from '../models/Http';
import { useHistory } from 'react-router-dom';
import RenderLoader from './common/RenderLoader';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [serverErrors, setServerErrors] = useState('');
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    try {
      const res = await Http.post('auth/forgotPassword', { email });
      if (res) {
        setIsPending(false);
        history.replace('/login/forgot-password/auth');
      }
    } catch (err) {
      if (err) {
        setIsPending(false);
        setServerErrors(err.response.data.message);
      }
    }
  };

  return (
    <>
      {isPending ? (
        <RenderLoader />
      ) : (
        <form className="ui form login-form" autoComplete="off" noValidate onSubmit={handleSubmit}>
          <h1>Forgot your password?</h1>
          <p style={{ textAlign: 'center' }}>please enter your email address for validation</p>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ex: user@gmail.com" />
          <input type="submit" value="Get verification code" className="ui button form-element" />
          {serverErrors && <p>{serverErrors}</p>}
        </form>
      )}
    </>
  );
};

export default ForgotPassword;
