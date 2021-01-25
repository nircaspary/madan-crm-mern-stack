import { React, useContext, useEffect } from 'react';
import { FaultsContext } from '../../contexts/FaultsContext';
import * as formController from '../../controllers/formController';

const Faults = () => {
  const { faults, setFaults } = useContext(FaultsContext);
  let isMounted = true;
  useEffect(() => {
    (async () => {
      const faults = await formController.getData(`http://127.0.0.1:8000/api/v1/faults`, localStorage.getItem('token'));
      if (isMounted) setFaults(faults.data.data.faults);
    })();

    return () => (isMounted = false);
  }, []);

  return (
    <ul className="faults-list">
      {faults.map((fault) => {
        return (
          <li className="fault" key={fault._id}>
            <div>{fault.user_id}</div>
            <div>{fault.description}</div>
            <div>{fault.team}</div>
            <div>{fault.createdAt}</div>
            <div>{fault.completed_at}</div>
            <div>{fault.isDone ? 'Done' : 'Not Done'}</div>
          </li>
        );
      })}
    </ul>
  );
};
export default Faults;
