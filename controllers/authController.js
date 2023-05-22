const { User } = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.signIn = catchAsync(async (req, res, next) => {});

exports.signOut = catchAsync(async (req, res, next) => {});

exports.signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  res.status(200).json({
    status: 'success',
    data: {
      newUser,
    },
  });
});
