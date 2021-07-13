import { React } from 'react';
import useHttp from '../hooks/useHttp';
import Fault from './Fault';
import RenderLoader from './common/RenderLoader';

const Faults = ({ params }) => {
  const { data, errors, isPending } = useHttp('GET', `faults${params}`);

  return (
    <>
      {isPending ? (
        <RenderLoader />
      ) : errors === [] ? (
        <div>{errors}</div>
      ) : data.faults ? (
        data.faults.map((fault) => <Fault fault={fault} key={fault._id} />)
      ) : null}
    </>
  );
};
export default Faults;
