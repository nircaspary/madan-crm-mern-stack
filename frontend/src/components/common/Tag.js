import React from 'react';

const Tag = ({ filter }) => {
  return (
    <a className="ui label">
      {`${filter[0]}: `}
      <b style={{ color: '#498FFF' }}>{`${filter[1]}`}</b>
      <i className="delete icon" onClick={() => console.log('hey')}></i>
    </a>
  );
};
export default Tag;
