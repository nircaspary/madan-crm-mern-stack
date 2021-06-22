import React from 'react';

const Sort = () => {
  return (
    <ul className="sort">
      <li>
        Name
        <div className="sort-arrows">
          <i className="fas fa-sort-up"></i>
          <i className="fas fa-sort-down"></i>
        </div>
      </li>
      <li>Office Number</li>
      <li>Location</li>
      <li>Computer Name</li>
      <li>Description</li>
      <li>Team</li>
      <li>
        Date Added
        <div className="sort-arrows">
          <i className="fas fa-sort-up"></i>
          <i className="fas fa-sort-down"></i>
        </div>
      </li>
      <li>
        Completed At
        <div className="sort-arrows">
          <i className="fas fa-sort-up"></i>
          <i className="fas fa-sort-down"></i>
        </div>
      </li>
      <li>Completed</li>
    </ul>
  );
};
export default Sort;
