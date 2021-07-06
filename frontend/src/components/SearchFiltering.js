import React, { useState, useContext } from 'react';
import Dropdown from './common/Dropdown';
import Input from './common/Input';
import { filtersContext } from '../contexts/loggedInContexts';
import { addFilter } from '../helpers/addFilter';

const SerachFiltering = () => {
  const { filters, setFilters } = useContext(filtersContext);
  const activeFilters = { ...filters };
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const styles = { width: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' };
  const options = ['first name', 'Location', 'Computer Name', 'description'];

  return (
    <div className="three-fields" style={styles}>
      <Dropdown options={options} header={'Select Filter'} onChange={(e) => setKey(e.target.value)} />
      <Input placeholder="Search..." label={'Filter Selection'} style={{ width: '300px' }} onChange={(e) => setValue(e.target.value)} />
      <button className="ui button" onClick={() => addFilter(activeFilters, key, value, setFilters)}>
        Search
      </button>
    </div>
  );
};
export default SerachFiltering;
