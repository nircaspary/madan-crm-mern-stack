import * as yup from 'yup';

const regex = {
  email: /^(?!.*\.\.)[\w.\-#!$%&'*+\/=?^_`{}|~]{1,35}@[\w.\-]+\.[a-zA-Z]{2,15}$/,
  cellPhone: /^0[2-9]\d{7,8}$/,
};

const schema = yup.object().shape({
  // id: yup.string().length(9, { message: 'Id must be 9 characters long' }),
  // firstName: yup.string().required({ message: 'You must provide a first name' }),
  // lastName: yup.string().required({ message: 'You must provide a last name' }),
  // email: yup.string().required({ message: 'You must provide an Email adress' }).matches(regex.email, { message: 'Please enter a valid email' }),
  // cellPhone: yup
  //   .string()
  //   .length(10, { message: 'Cell phone must be 10 characters long' })
  //   .matches(regex.cellPhone, { message: 'Please enter a valid phone number' }),
  // officePhone: yup.string().length(7, { message: 'Office phone must be 7 characters long' }),
  // computerName: yup.string().length(5, { message: 'Computer name Must be 5 digit number' }),
  // description: yup
  //   .string()
  //   .required({ message: 'You must provide a description' })
  //   .max(4000, { message: 'Too many characters, please write less than 4000 characters' }),
  // password: yup.string().required({ message: 'You must provide a password' }),
});

export default schema;
