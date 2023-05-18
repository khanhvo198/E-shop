const { User } = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  if (!users) {
    return next(new AppError('Cannot find users', 400));
  }

  res.status(200).json({
    results: users.length,
    data: {
      users,
    },
    status: 'success',
  });
});

exports.deleteUser = factory.deleteOne(User);
exports.updateUser = factory.updateOne(User);
