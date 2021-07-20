import React from 'react';
const PreInput = ({ defaultValue }) => {
  const styles = { width: '10%', height: '38px', marginTop: '23px' };
  return <input readOnly={true} defaultValue={defaultValue} style={styles}></input>;
};

export default PreInput;
