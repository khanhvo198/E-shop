const multer = require('multer');
const sharp = require('sharp');
const factory = require('./handlerFactory');
const { Product } = require('../models/productModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find();
  if (!products) return next(new AppError('No products found!!!', 400));

  res.status(200).json({
    status: 'success',
    results: products.length,
    data: {
      products,
    },
  });
});
exports.getProduct = factory.getOne(Product);

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(null, new AppError('Please upload an image', 400));
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
exports.uploadImageProduct = upload.single('image');
exports.resizeImageProduct = catchAsync(async (req, res, next) => {
  const filename = `product-${req.body.name}-${Date.now()}.jpeg`;
  req.file.filename = filename;
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/product/${filename}`);
  next();
});

exports.createProduct = catchAsync(async (req, res, next) => {
  const filteredBody = filterObj(
    req.body,
    'name',
    'description',
    'richDescription',
    'brand',
    'price',
    'category',
    'stock',
    'isFeatured'
  );
  if (req.file) filteredBody.image = req.file.filename;

  const newProduct = await Product.create(filteredBody);
  if (!newProduct) return next(new AppError('Cannot create product', 400));
  res.status(201).json({
    status: 'success',
    data: {
      newProduct,
    },
  });
});

exports.updateProduct = factory.updateOne(Product);
exports.deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return next(new AppError('No Product found!!!', 400));
  const restProducts = await Product.find();
  res.status(200).json({
    status: 'success',
    results: restProducts.length,
    data: {
      products: restProducts,
    },
  });
});
