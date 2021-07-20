import { React, useState } from 'react';
import Input from './common/Input';
import * as Http from '../models/Http';
import { useHistory } from 'react-router-dom';
import RenderLoader from './common/RenderLoader';
import FormSuccess from './common/FormSuccess';

const ForgotPasswordAuth = (props) => {
  const history = useHistory();
  const [authToken, setAuthToken] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [serverErrors, setServerErrors] = useState('');
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    try {
      const res = await Http.patch(`auth/resetPassword/${authToken}`, { password, passwordConfirm });
      if (res) {
        localStorage.setItem('token', res.data.token);
        history.replace('/admins/faults');
      }
    } catch (err) {
      if (err.response.data.message) {
        setServerErrors(err.response.data.message);
        setIsPending(false);
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
          <Input label="token from email" value={authToken} onChange={(e) => setAuthToken(e.target.value)} />
          <Input type="password" label="Set New Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Input type="password" label="Confirm Password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
          <Input type="submit" value="Set New Password" className="ui button form-element" />
          {serverErrors && <p>{serverErrors}</p>}
        </form>
      )}
    </>
  );
};

export default ForgotPasswordAuth;
