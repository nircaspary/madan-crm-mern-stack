import { React } from 'react';
import User from './User';
import useHttp from '../hooks/useHttp';
import RenderLoader from './common/RenderLoader';
import './admins.css';

const Users = ({ params }) => {
  const { data, errors, isPending } = useHttp(`users${params}`);

  return (
    <>
      {isPending && <RenderLoader />}
      {data.users && data.users.map((user) => <User user={user} key={user._id} />)}
      {errors && <p>{errors}</p>}
    </>
  );
};
export default Users;
