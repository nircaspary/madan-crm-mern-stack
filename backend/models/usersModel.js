const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  id: {
    unique: true,
    type: String,
    required: [true, 'You must fill your ID'],
  },
  firstName: {
    type: String,
    required: [true, 'You must fill your first name'],
  },
  lastName: {
    type: String,
    required: [true, 'You must fill your last name'],
  },
  email: {
    type: String,
    required: [true, 'You must fill your email'],
  },
  cellPhone: {
    type: String,
    required: [true, 'You must fill your phone Number'],
  },
  officePhone: {
    type: String,
    minlength: 5,
  },
  faultLocation: {
    type: String,
    required: [true, 'You must fill your fault Location'],
  },
  computerName: {
    type: String,
    minlength: 5,
  },
  admin: { type: Boolean, default: false },
  password: { type: String },
});

userSchema.methods.generateAuthToken = function () {
  if (this.admin === true) {
    const token = jwt.sign(
      { id: this.id, admin: this.admin },
      process.env.JWTKEY
    );
    return token;
  }
};
const User = mongoose.model('user', userSchema);
module.exports = User;
