import React, { useContext, useEffect, useState } from 'react';
import Dropdown from './common/Dropdown';
import auth from '../models/Auth';
import Tag from './common/Tag';
import { serializeUrl } from '../helpers/serializeUrl';
import { addFilter } from '../helpers/addFilter';
import SerachFiltering from './SearchFiltering';
import { filtersContext } from '../contexts/loggedInContexts';
import { useHistory } from 'react-router';
import './admins.css';

const Filter = () => {
  const { filters, setFilters } = useContext(filtersContext);
  const activeFilters = { ...filters };
  const history = useHistory();
  const params = serializeUrl(filters);
  useEffect(() => history.push(`?${params}`), [filters]);

  const teams = ['help desk', 'info', 'lab', 'tech'];
  return (
    <div className="ui form" style={{ width: '90%', paddingTop: '10px' }}>
      <div className="three fields">
        {auth.user().role === 'admin' && (
          <Dropdown
            label={'Team'}
            options={teams}
            header={'Select Team'}
            onChange={(e) => addFilter(activeFilters, 'team', e.target.value, setFilters)}
          />
        )}
        <SerachFiltering />
        <Dropdown
          label={'status'}
          options={['Uncompleted', 'Completed']}
          header={'Select Status'}
          onChange={(e) => addFilter(activeFilters, 'isDone', e.target.value, setFilters)}
        />
      </div>

      <div className="tags-container" style={{ paddingTop: '10px' }}>
        {/* {tags.map((tag) => {
          return <Tag key={`Filter ${tag}`} filter={tag} />;
        })} */}
      </div>
    </div>
  );
};
export default Filter;
