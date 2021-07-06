import { React, useState, useEffect } from 'react';
import { faultsContext, usersContext, filtersContext } from '../contexts/loggedInContexts';
import * as Http from '../models/Http';
import Faults from './Faults';
import AddButton from './common/AddButton';
import RenderLoader from './common/RenderLoader';
import Users from './Users';
import TableHeader from './common/TableHeader';
import Filter from './Filter';
import TableFooter from './TableFooter';
import { serializeUrl } from '../helpers/serializeUrl';
import './admins.css';
import { Route, useLocation, useHistory, useParams } from 'react-router-dom';

const Admins = () => {
  const [filters, setFilters] = useState([]);
  const [faults, setFaults] = useState([]);
  const [users, setUsers] = useState([]);
  const [loader, setLoader] = useState(true);

  const location = useLocation();
  const history = useHistory();
  const page = location.pathname.split('/').pop();
  const params = location.search;
  const queryString = serializeUrl(filters).toString();

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

  useEffect(() => history.push(`?${queryString}`), [filters]);
  useEffect(() => setFilters(''), [page]);
  useEffect(() => {
    (async () => {
      const res = await Http.get(`${page}${params}`);
      if (res) setTimeout(() => setLoader(false), 1000);
      page === 'faults' ? setFaults(res.data.data.faults) : page === 'users' ? setUsers(res.data.data.users) : 'Error';
    })();
  }, [location]);

  return (
    <filtersContext.Provider value={{ filters, setFilters }}>
      <Filter />
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
