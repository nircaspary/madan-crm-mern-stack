const User = require('../models/usersModel');
const APIFeatures = require('.././utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(User.find(), req.query).filter().sort().limitFields().paginate();
  const users = await features.query;

  res.status(200).json({
    status: 'succses',
    data: {
      users,
    },
  });
});

exports.findUser = catchAsync(async (req, res, next) => {
  if (req.params.id === 'me') return next();
  const user = await User.findOne({ id: req.params.id });
  if (!user) return next(new AppError('there is no user with that id', 404));
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.getMe = catchAsync(async (req, res, next) => {
  const me = await User.findOne({ id: req.user.id });

  res.status(200).json({
    status: 'succses',
    data: {
      user: me,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  console.log(req.params.id);
  const user = await User.findOneAndUpdate({ id: req.params.id });
  console.log(user);
  res.status(201).json({
    status: 'success',
    data: user,
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // Create error if user POST password data
  if (req.body.password || req.body.passwordConfirm)
    return next(new AppError('This Route is not for password update, please use /updateMyPassword', 400));
  // Check if a user tries to change his role
  if (req.body.role) return next(new AppError('You not allowed to change your role!', 403));
  // Update user document
  const updatedMe = await User.findOneAndUpdate({ id: req.user.id }, req.body, { new: true, runValidators: true });
  res.status(200).json({
    status: 'success',
    updatedMe,
  });
});

exports.deleteUser = catchAsync(async (req, res) => {
  const user = await User.findOneAndDelete({ id: req.params.id });
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
