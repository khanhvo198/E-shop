const { Category } = require('../models/categoryModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getAllCategory = catchAsync(async (req, res, next) => {
  const categories = Category.find();
  if (!categories) return next(new AppError('No category found!!!', 400));

  res.status(200).json({
    status: 'success',
    results: categories.length,
    data: {
      categories,
    },
  });
});

exports.getCategory = factory.getOne;
exports.createCategory = factory.createOne;
exports.updateCategory = factory.updateOne;
exports.deleteCategory = factory.deleteOne;
