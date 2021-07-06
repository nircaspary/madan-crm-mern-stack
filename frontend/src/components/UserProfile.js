import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Input from './common/Input';
import auth from '../models/Auth';
import Location from './Location';
import RenderLoader from './common/RenderLoader';
import schema from '../models/FormValidationSchema';
import * as Http from '../models/Http';
import './form.css';

const MyProfile = (props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  let userId;
  useParams().id === 'my-profile' ? (userId = auth.user().id) : (userId = useParams().id);
  const [location, setLocation] = useState({});
  const [loader, setLoader] = useState(true);

  const fillUserData = async (id) => {
    const { data } = await Http.get(`users/${id}`);
    // Set Form Values If User Exists
    if (data.data.user) {
      const { id, firstName, lastName, email, cellPhone, officePhone, location, computerName } = data.data.user;
      reset({ id, firstName, lastName, email, cellPhone, officePhone, computerName });
      setLocation(location);
    } else {
      reset({ id: '', firstName: '', lastName: '', email: '', cellPhone: '', officePhone: '', computerName: '' });
      setLocation({});
    }
    setTimeout(() => setLoader(false), 1000);
  };

  useEffect(() => fillUserData(userId), []);

  const onSubmit = async (data) => {
    const { id, firstName, lastName, email, cellPhone, officePhone, computerName } = data;
    const user = { id, firstName, lastName, email, cellPhone, officePhone, location, computerName };
    const updatedUser = await Http.patch(`users/${userId}`, user);
  };

  return loader ? (
    <RenderLoader />
  ) : (
    <form className="ui form fault-form" onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>
      <h1>{`${'firstName'}'s ${'lastName'} Profile`}</h1>
      <input type="button" className="ui button form-element" value="Edit User" />
      <input
        type="button"
        className="ui button form-element red"
        value="Delete User"
        onClick={() => props.history.push(`/admins/user/delete/${userId}`)}
      />
      <Input label="Email" register={register} errors={errors.email} />
      <div className="two fields">
        <Input label="Cell Phone" register={register} errors={errors.cellPhone} />
        <Input label="Office Phone" register={register} errors={errors.officePhone} />
      </div>
      <div className="three fields">
        <Location passLocation={(location) => setLocation(location)} userLocation={location} />
      </div>
      <Input label="Computer Name" register={register} errors={errors.computerName} />
      <Input type="submit" value="Submit" className="ui button form-element" />
    </form>
  );
};
export default MyProfile;
