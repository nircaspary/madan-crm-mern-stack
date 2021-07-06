import { React, useState, useEffect } from 'react';
import schema from '../models/FormValidationSchema';
import Input from './common/Input';
import Location from './Location';
import * as Http from '../models/Http';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import './form.css';
import { useForm } from 'react-hook-form';

const Form = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [display, setDisplay] = useState(false);
  const [id, setId] = useState('');
  const [location, setLocation] = useState({});

  const onSubmit = async (data) => {
    const { firstName, lastName, email, cellPhone, officePhone, computerName, description, imagesUpload } = data;
    const user = { firstName, lastName, email, cellPhone, officePhone, location, computerName };
    // Send User Data To The Users Collection
    const userRes = await Http.post(`auth/signup/${id}`, user);
    const user_id = userRes.data.data.user._id;

    const fault = new FormData();
    fault.append('user_id', user_id);
    fault.append('description', description);
    for (let e of imagesUpload) fault.append('images', e);

    // Send Fault Data To The Faults Collection
    const faultRes = await axios.post('http://127.0.0.1:8000/api/v1/faults', fault, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  };

  const fillUserData = async (id) => {
    const { data } = await Http.get(`users/${id}`);
    if (data.data.user) {
      // Set Form Values If User Exists
      const { firstName, lastName, email, cellPhone, officePhone, location, computerName } = data.data.user;
      reset({ firstName, lastName, email, cellPhone, officePhone, computerName });
      setLocation(location);
    } else {
      reset({ firstName: '', lastName: '', email: '', cellPhone: '', officePhone: '', computerName: '' });
      setLocation({});
    }
    setDisplay(true);
  };

  useEffect(() => (id.length === 9 ? fillUserData(id) : setDisplay(false)), [id]);

  return (
    <form className="ui form fault-form" onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>
      <h1>Fill Form</h1>
      <input label="id" value={id} onChange={(e) => setId(e.target.value)} />
      {display && (
        <>
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
          <Input label="Description" type="textarea" col="50" register={register} errors={errors.description} />
          <Input label="Images Upload" type="file" multiple={true} register={register} />
          <input type="submit" className="ui button form-element" />
        </>
      )}
    </form>
  );
};

export default Form;
