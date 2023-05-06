const { Category } = require('../models/categoryModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllCategory = (req, res, next) => {
  const categories = Category.find();
  if (!categories) return next(new AppError('No category found!!!', 400));

  res.status(200).json({
    status: 'success',
    results: categories.length,
    data: {
      categories,
    },
  });
};

exports.getOne = catchAsync(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  if (!category) return next(new AppError('No category found', 400));

  res.status(200).json({
    status: 'success',
    data: {
      category,
    },
  });
});

exports.createOne = catchAsync(async (req, res, next) => {
  const newCategory = await Category.create(req.body);
  if (!newCategory) return next(new AppError('Cannot create category', 400));

  res.status(201).json({
    status: 'success',
    data: {
      newCategory,
    },
  });
});

exports.updateOne = catchAsync(async (req, res, next) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!category) return next(new AppError('Cannot update category', 400));

  res.status(203).json({
    status: 'success',
    data: {
      category,
    },
  });
});

exports.deleteOne = catchAsync(async (req, res, next) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) return next(new AppError('No category found!!!', 400));
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
