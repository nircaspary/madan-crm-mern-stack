import { React, useState } from 'react';
import { useParams } from 'react-router';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useHttp } from '../hooks/useHttp';
import { useHistory } from 'react-router-dom';
import Input from './common/Input';
import Dropdown from './common/Dropdown';
import Location from './Location';
import RenderLoader from './common/RenderLoader';
import schema from '../models/FormValidationSchema';
import * as Http from '../models/Http';
import auth from '../models/Auth';
import './form.css';

const UserProfile = (props) => {
  const history = useHistory();
  const resolver = { resolver: yupResolver(schema) };
  const { register, handleSubmit, formState } = useForm(resolver);
  const [location, setLocation] = useState({});
  const roles = ['admin', 'help desk', 'lab', 'info', 'tech'];
  let id;
  if (useParams().id === 'my-profile') id = 'me';
  else id = useParams().id;

  const { data, errors, isPending } = useHttp('GET', `users/${id}`);

  const onSubmit = async (data) => {
    const { firstName, lastName, email, cellPhone, officePhone, computerName, role } = data;
    const user = { firstName, lastName, email, cellPhone, officePhone, location, computerName, role };
    await Http.patch(`users/${id}`, user);
  };

  return (
    <>
      {isPending && <RenderLoader />}
      {data.user && (
        <form className="ui form fault-form" onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>
          <h1>{`User ${data.user.id}`}</h1>
          <button className="ui button form-element">Edit User</button>
          <button className="ui button form-element red" onClick={() => props.history.push(`/admins/user/delete/${id}`)}>
            Delete User
          </button>
          <div className="two fields">
            <Input label="First Name" register={register} defaultValue={data.user.firstName} />
            <Input label="Last Name" register={register} defaultValue={data.user.lastName} />
          </div>
          <Input label="Email" register={register} defaultValue={data.user.email} />
          <div className="two fields">
            <Input label="Cell Phone" register={register} defaultValue={data.user.cellPhone} />
            <Input label="Office Phone" register={register} defaultValue={data.user.email} />
          </div>
          <div className="three fields">
            <Location passLocation={(location) => setLocation(location)} userLocation={data.user.location} />
          </div>
          <Input label="Computer Name" register={register} defaultValue={data.user.computerName} />
          {auth.user().role === 'admin' && id !== 'me' && (
            <Dropdown label="Role" header={data.user.role} options={roles.filter((role) => role !== data.user.role)} />
          )}
          <input type="submit" className="ui button form-element" />
          <br />
          {id === 'me' && (
            <a style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => history.push(`change-password`)}>
              Change Password
            </a>
          )}
        </form>
      )}

      {errors && <div>{errors}</div>}
    </>
  );
};
export default UserProfile;
