import React from 'react';
import { useHistory } from 'react-router-dom';

const FormSuccess = ({ message }) => {
  const history = useHistory();
  const styles = {
    height: '90%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '50px',
  };
  return (
    <>
      <div style={styles}>{message}</div>
      <a onClick={history.replace('/admins/faults')}>Go to dashboard</a>
    </>
  );
};
export default FormSuccess;
