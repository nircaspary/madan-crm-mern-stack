import React from 'react';

const dropdown = ({ options, header, getSelected, ...rest }) => {
  return (
    <select
      className="ui compact selection dropdown"
      onChange={(option) => {
        const { filterBy } = rest;
        filterBy ? getSelected(filterBy, option.target.value) : getSelected(option.target.value);
      }}
    >
      <option value="">{header}</option>
      {options
        ? options.map((value) => {
            return <option key={value}>{value}</option>;
          })
        : null}
    </select>
  );
};
export default dropdown;
