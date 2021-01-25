const express = require('express');
const app = express();
const User = require('../models/usersModel');
const _ = require('lodash');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
  //Check for user id
  const user = await User.findOne({ id: req.body.id });
  if (!user)
    return res.status(401).json({
      err: {
        status: 'Failed',
        message: 'Invalid ID or password',
      },
    });
  //Check for password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(401).json({
      err: {
        status: 'Failed',
        message: 'Invalid ID or password',
      },
    });

  res.status(200).json({
    status: 'Succsses',
    message: 'Login successful',
    token: user.generateAuthToken(),
  });
};
