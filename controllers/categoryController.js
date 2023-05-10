const sharp = require('sharp');
const multer = require('multer');
const { Category } = require('../models/categoryModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getAllCategory = catchAsync(async (req, res, next) => {
  const categories = await Category.find();
  if (!categories) return next(new AppError('No category found!!!', 400));

  res.status(200).json({
    status: 'success',
    results: categories.length,
    data: {
      categories,
    },
  });
});

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(null, new AppError('Please upload an image', 400));
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadImageCategory = upload.single('image');
exports.resizeImageCategory = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  const filename = `category-${req.body.name}-${Date.now()}.jpeg`;
  req.file.filename = filename;
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/category/${filename}`);
});

exports.getCategory = factory.getOne(Category);
exports.createCategory = factory.createOne(Category);
exports.updateCategory = factory.updateOne(Category);
exports.deleteCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) return next(new AppError('No document found!!!', 400));
  const restCategories = await Category.find();
  res.status(200).json({
    status: 'success',
    results: restCategories.length,
    data: {
      categories: restCategories,
    },
  });
});
