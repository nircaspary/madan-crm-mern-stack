import React, { useContext } from 'react';
import { filtersContext } from '../../contexts/loggedInContexts';

const Tag = (props) => {
  const { filters, setFilters } = useContext(filtersContext);
  const { filter } = props;

  const handleClick = () => setFilters(filters.filter((e) => e !== filter));

  return (
    <a className="ui label">
      {`${Object.keys(filter).toString()}: `}
      <b style={{ color: '#498FFF' }}>{`${Object.values(filter).toString()}`}</b>
      <i className="delete icon" onClick={handleClick}></i>
    </a>
  );
};
export default Tag;
