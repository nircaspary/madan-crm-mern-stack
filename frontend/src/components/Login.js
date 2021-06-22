import { React, useState } from 'react';
import auth from '../models/Auth';
import Input from './common/Input';

const AdminLogin = (props) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await auth.login(id, password);
      props.history.replace('/admins/faults');
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <form className="ui form login-form" onSubmit={handleSubmit} autoComplete="off" noValidate>
      <h1>Admins Login</h1>
      <Input label="ID" value={id} onChange={(e) => setId(e.target.value)} />
      <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Input value="login" className="ui button form-element" type="submit" style={{ width: '100%' }} message={error} />
      <a className="forgotPassword" style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => props.history.replace('/login/forgotPassword')}>
        Forgot your password?
      </a>
    </form>
  );
};
export default AdminLogin;
