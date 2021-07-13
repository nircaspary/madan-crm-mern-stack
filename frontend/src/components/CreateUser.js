import { React, useState, useEffect } from 'react';
import schema from '../models/FormValidationSchema';
import Input from './common/Input';
import Dropdown from './common/Dropdown';
import Location from './Location';
import * as Http from '../models/Http';
import { yupResolver } from '@hookform/resolvers/yup';
import './form.css';
import { useForm } from 'react-hook-form';

const CreateUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [serverErrors, setServerErrors] = useState('');
  const [role, setRole] = useState('');
  const [location, setLocation] = useState({});

  const onSubmit = async (data) => {
    const { firstName, lastName, email, cellPhone, officePhone, computerName, id, password, passwordConfirm } = data;
    const user = { firstName, lastName, email, cellPhone, officePhone, location, computerName, id, role, password, passwordConfirm };
    // Send User Data To The Users Collection
    const userRes = await Http.post('users', user);
  };

  return (
    <form className="ui form fault-form" onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>
      <h1>Create User</h1>
      <Input label="id" register={register} errors={errors.id} />
      <div className="two fields">
        <Input label="First Name" register={register} errors={errors.firstName} />
        <Input label="Last Name" register={register} errors={errors.lastName} />
      </div>
      <Input label="Email" register={register} errors={errors.email} />
      <div className="two fields">
        <Input label="Cell Phone" register={register} errors={errors.cellPhone} />
        <Input label="Office Phone" register={register} errors={errors.officePhone} />
      </div>
      <div className="three fields">
        <Location passLocation={(location) => setLocation(location)} userLocation={location} />
      </div>
      <Input label="Computer Name" register={register} errors={errors.computerName} />

      <Dropdown
        label={'Role'}
        options={['user', 'admin', 'help desk', 'tech', 'lab', 'info']}
        header={'Select Role'}
        onChange={(e) => setRole(e.target.value)}
      />
      {role && role !== 'user' && (
        <>
          <Input label="Password" type="password" register={register} errors={errors.password} />
          <Input label="Password Confirm" type="password" register={register} errors={errors.passwordConfirm} />
        </>
      )}

      <input type="submit" className="ui button form-element" />
      {serverErrors && <p>{serverErrors}</p>}
    </form>
  );
};

export default CreateUser;
