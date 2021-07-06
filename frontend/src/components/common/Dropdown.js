const Dropdown = ({ options, label, header, ...rest }, ref) => {
  return (
    <div className="field">
      <label>{label}</label>
      <select {...rest}>
        <option value={''}>{header}</option>
        {options.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};
export default Dropdown;
