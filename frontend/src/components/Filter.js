import React, { useContext, useEffect } from 'react';
import Dropdown from './common/Dropdown';
import Tag from './common/Tag';
import SerachFiltering from './SearchFiltering';
import { filtersContext, queryStringContext } from '../contexts/loggedInContexts';
import './admins.css';

const Filter = () => {
  const { filters, setFilters } = useContext(filtersContext);
  const { queryString, setQueryString } = useContext(queryStringContext);
  const activeFilters = [...filters];

  const addFilter = (filterBy, selectedFilterContent) => {
    let addedFilter;

    if (selectedFilterContent && filterBy) addedFilter = { [filterBy]: selectedFilterContent };
    else return;

    if (!stringsArray(activeFilters).includes(JSON.stringify(addedFilter))) {
      activeFilters.push(addedFilter);
      setFilters(activeFilters);
    } else return;
  };

  const stringsArray = (arr) => arr.map((e) => JSON.stringify(e));
  const toQueryString = (strArr) => strArr.join('').replace(/}{/g, '&').replace(/}|{|"/g, '').replace(/:/g, '=');

  setQueryString(toQueryString(stringsArray(activeFilters)));

  const teams = ['help desk', 'info', 'lab', 'tech'];
  return (
    <div className="filters-container">
      <div className="all-filters">
        <div>
          <label>By Team</label>
          <Dropdown options={teams} header={'Select Team'} getSelected={addFilter} filterBy={'role'} />
        </div>
        <div style={{ width: '40%' }}>
          <label>Filters</label>
          <SerachFiltering getSelected={addFilter} />
        </div>
        <div>
          <label>By Status</label>
          <Dropdown options={['Uncompleted', 'Completed']} header={'Select Status'} getSelected={addFilter} filterBy={'status'} />
        </div>
      </div>
      <div className="tags-container" style={{ paddingTop: '10px' }}>
        {filters.map((filter, index) => {
          return <Tag key={`Filter ${index}`} filter={filter} />;
        })}
      </div>
    </div>
  );
};
export default Filter;
