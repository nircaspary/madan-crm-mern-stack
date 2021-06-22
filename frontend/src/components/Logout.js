import auth from '../models/Auth';

const Logout = (props) => {
  auth.logout();
  props.history.replace('/login');

  return null;
};
export default Logout;
