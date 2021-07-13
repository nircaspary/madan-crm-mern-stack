import { React } from 'react';
import User from './User';
import useHttp from '../hooks/useHttp';
import RenderLoader from './common/RenderLoader';
import './admins.css';

const Users = ({ params }) => {
  const { data, errors, isPending } = useHttp('GET', `users${params}`);

  return (
    <>
      {isPending ? (
        <RenderLoader />
      ) : errors === [] ? (
        <div>{errors}</div>
      ) : data.users ? (
        data.users.map((user) => <User user={user} key={user._id} />)
      ) : null}
    </>
  );
};
export default Users;
