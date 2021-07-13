import { React, useState, useEffect } from 'react';
import { filtersContext } from '../contexts/loggedInContexts';
import Faults from './Faults';
import AddButton from './common/AddButton';
import Users from './Users';
import TableHeader from './common/TableHeader';
import Filter from './Filter';
import TableFooter from './TableFooter';
import './admins.css';
import { Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Admins = () => {
  const [filters, setFilters] = useState({});
  const params = useLocation().search;
  const location = useLocation().pathname;
  useEffect(() => setFilters({ page: 1 }), [location]);

  const faultsHeaders = [
    'Fault id',
    'Name',
    'Office Number',
    'Location',
    'Computer Name',
    'Description',
    'Team',
    'Date Added',
    'Completed At',
    'Completed',
  ];

  const usersHeaders = ['User Id', 'Name', 'Email', 'Role', 'Location', 'Team', 'Cell Phone'];

  return (
    <filtersContext.Provider value={{ filters, setFilters }}>
      <Filter />
      <AddButton />
      <div className="table-container" style={{ textAlign: 'center', width: '100%' }}>
        <div>
          <Route exact path="/admins/users" render={(props) => <TableHeader {...props} headers={usersHeaders} />} />
          <Route exact path="/admins/faults" render={(props) => <TableHeader {...props} headers={faultsHeaders} />} />
        </div>

        <div>
          <Route exact path="/admins/users" render={(props) => <Users {...props} params={params} />} />
          <Route exact path="/admins/faults" render={(props) => <Faults {...props} params={params} />} />
        </div>

        <div className="table-row ui table-footer">
          <Route exact path="/admins/users" render={(props) => <TableFooter {...props} headerLenght={usersHeaders.length} contentLenght={25} />} />
          <Route exact path="/admins/faults" render={(props) => <TableFooter {...props} headerLenght={faultsHeaders.length} contentLenght={25} />} />
        </div>
      </div>
    </filtersContext.Provider>
  );
};
export default Admins;
