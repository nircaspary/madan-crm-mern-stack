import { React } from 'react';
import useHttp from '../hooks/useHttp';
import Fault from './Fault';
import RenderLoader from './common/RenderLoader';

const Faults = ({ params }) => {
  const { data, errors, isPending } = useHttp(`faults${params}`);
  console.log(isPending);
  return (
    <>
      {isPending && <RenderLoader />}
      {data.faults && data.faults.map((fault) => <Fault fault={fault} key={fault._id} />)}
      {errors && <p>{errors}</p>}
    </>
  );
};
export default Faults;
