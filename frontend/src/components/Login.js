import { React, useState } from 'react';
import auth from '../models/Auth';
import schema from '../models/FormValidationSchema';
import Input from './common/Input';
import Location from './Location';
import * as Http from '../models/Http';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import './form.css';
import { useForm } from 'react-hook-form';

const AdminLogin = (props) => {
  const [serverErrors, setServerErrors] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      await auth.login(data.id, data.password);
      props.history.replace('/admins/faults');
    } catch (err) {
      setServerErrors(err.response.data.message);
    }
  };

  return (
    <form className="ui form login-form" onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>
      <h1>Admins Login</h1>
      <Input label="id" register={register} errors={errors.id || serverErrors} />
      <Input label="Password" type="password" register={register} errors={errors.password || serverErrors} />
      <input value="login" className="ui button form-element" type="submit" />
      <a className="forgotPassword" style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => props.history.replace('/login/forgotPassword')}>
        Forgot your password?
      </a>
    </form>
  );
};
export default AdminLogin;
