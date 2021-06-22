import { React, useState, useEffect } from 'react';
import { faultsContext, usersContext, filtersContext, queryStringContext } from '../contexts/loggedInContexts';
import * as Http from '../models/Http';
import Faults from './Faults';
import AddButton from './common/AddButton';
import RenderLoader from './common/RenderLoader';
import Users from './Users';
import TableHeader from './common/TableHeader';
import Filter from './Filter';
import TableFooter from './common/TableFooter';
import './admins.css';
import { Route, useLocation } from 'react-router-dom';

const Admins = () => {
  const location = useLocation().pathname.split('/').pop();
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
  const [filters, setFilters] = useState([]);
  const [faults, setFaults] = useState([]);
  const [users, setUsers] = useState([]);
  const [loader, setLoader] = useState(true);
  const [queryString, setQueryString] = useState('');

  useEffect(() => {
    (async () => {
      const res = await Http.get(`${location}?${queryString}`);
      if (res) setTimeout(() => setLoader(false), 1000);

      location === 'faults' ? setFaults(res.data.data.faults) : location === 'users' ? setUsers(res.data.data.users) : 'Error';
    })();
  }, [location, queryString]);

  return (
    <filtersContext.Provider value={{ filters, setFilters }}>
      <queryStringContext.Provider value={{ queryString, setQueryString }}>
        <Filter />
      </queryStringContext.Provider>
      <AddButton />
      <div className="table-container" style={{ textAlign: 'center', width: '100%' }}>
        <div>
          <Route exact path="/admins/users" render={(props) => <TableHeader {...props} headers={usersHeaders} />} />
          <Route exact path="/admins/faults" render={(props) => <TableHeader {...props} headers={faultsHeaders} />} />
        </div>

        {loader ? (
          <RenderLoader />
        ) : (
          <div>
            <usersContext.Provider value={{ users }}>
              <Route exact path="/admins/users" component={Users} />
            </usersContext.Provider>
            <faultsContext.Provider value={{ faults }}>
              <Route exact path="/admins/faults" component={Faults} />
            </faultsContext.Provider>
          </div>
        )}

        <div className="table-row ui table-footer">
          <Route exact path="/admins/users" render={(props) => <TableFooter {...props} headerLenght={usersHeaders.length} contentLenght={25} />} />
          <Route exact path="/admins/faults" render={(props) => <TableFooter {...props} headerLenght={faultsHeaders.length} contentLenght={25} />} />
        </div>
      </div>
    </filtersContext.Provider>
  );
};
export default Admins;
