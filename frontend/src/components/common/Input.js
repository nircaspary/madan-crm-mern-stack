import React from 'react';

const Input = ({ label, type = 'text', message, ...rest }) => {
  return (
    <div className="field form-element">
      <label>{label}</label>
      {type === 'textarea' ? <textarea {...rest} rows="5" /> : <input type={type} {...rest} />}
      {message && <p className="error">{message}</p>}
    </div>
  );
};
export default Input;
