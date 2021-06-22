import React, { useState } from 'react';

const SerachFiltering = ({ getSelected }) => {
  const [value, setValue] = useState('');
  const [filterBy, setFilterBy] = useState('');

  const filters = ['first name', 'Location', 'Computer Name', 'description'];

  const handleKeydown = (e) => {
    e.key === 'Enter' ? getSelected(filterBy, value) : null;
  };

  return (
    <div className="ui action input" style={{ width: '100%' }}>
      <select className="ui compact selection dropdown" onChange={(e) => setFilterBy(e.target.value)}>
        <option value="">Select Filter</option>
        {filters.map((filter) => {
          return (
            <option key={filter} value={filter}>
              {filter}
            </option>
          );
        })}
      </select>
      <input placeholder="Search..." onChange={(e) => setValue(e.target.value)} onKeyDown={handleKeydown} value={value} style={{ width: '50%' }} />
      <button className="ui button" onClick={() => getSelected(filterBy, value)}>
        Search
      </button>
    </div>
  );
};
export default SerachFiltering;
