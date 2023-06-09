const jwt = require('jsonwebtoken');
const { User } = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.signIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new AppError('Please provide email and password', 400));

  const user = await User.findOne({ email }).select('+password');

  if (!user || (await user.correctPassword(password, user.password))) {
    return next(new AppError('Invalid email or password', 400));
  }

  user.password = undefined;

  const token = jwt.sign(
    { email: user.email, isAdmin: user.isAdmin },
    process.env.SECRET_KEY,
    { expiresIn: process.env.EXPIRES_IN }
  );

  const cookieOptions = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  res.cookie('jwt', token, cookieOptions);

  res.status(200).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  if (!req.cookie.token) return next(new AppError('Please sign in', 401));
  const token = req.cookie.jwt;

  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  const currentUser = await User.findOne({ email: decoded.email });

  if (!currentUser) return next(new AppError("User doesn't exist", 400));

  req.user = currentUser;

  next();
});

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
