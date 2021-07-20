import React, { useContext, useEffect } from 'react';
import { filtersContext } from '../../contexts/loggedInContexts';
import { useLocation } from 'react-router';

const Tag = ({ filter }) => {
  const { filters, setFilters } = useContext(filtersContext);
  const activeFilters = { ...filters };
  const tag = filter.replace(/\+/g, ' ').split('=');

  const handleRemoveFilter = () => {
    activeFilters[tag[0]] = activeFilters[tag[0]].filter((val) => val !== tag[1]);
    setFilters(activeFilters);
  };

  return (
    <a className="ui label">
      {`${tag[0]}: `}
      <b style={{ color: '#498FFF' }}>{tag[1]}</b>
      <i className="delete icon" onClick={handleRemoveFilter}></i>
    </a>
  );
};
export default Tag;
