import { useLocation, useHistory } from 'react-router-dom';

const AddButton = () => {
  const handleAddButtonClick = () => (location === 'faults' ? history.push('/') : history.push('/admins/create-user'));
  const location = useLocation().pathname.split('/').pop();
  const history = useHistory();
  return (
    <div style={{ width: '90%' }}>
      <button className="ui right floated button" style={{ width: '150px', float: 'right' }} onClick={handleAddButtonClick}>
        Add {location.substring(0, location.length - 1)}
      </button>
    </div>
  );
};
export default AddButton;
