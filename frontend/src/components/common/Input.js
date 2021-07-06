import React from 'react';

const Input = ({ label, register, errors, ...rest }) => {
  const removeSpaces = (str) => str.charAt(0).toLowerCase() + str.replace(/\s+/g, '').slice(1);
  return (
    <div className="field form-element">
      <label>{label}</label>
      {register ? (
        <>
          {rest.type === 'textarea' ? (
            <textarea {...register(removeSpaces(label))} {...rest} />
          ) : (
            <input {...register(removeSpaces(label))} {...rest} />
          )}
        </>
      ) : (
        <>{rest.type === 'textarea' ? <textarea {...rest} /> : <input {...rest} />}</>
      )}

      {errors && errors.message && <p style={{ color: '#DC3545' }}>{errors.message.message}</p>}
    </div>
  );
};
export default Input;
