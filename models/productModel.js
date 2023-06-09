const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  description: { type: String, default: '' },
  richDescription: {
    type: String,
    default: '',
  },
  images: [
    {
      type: String,
    },
  ],
  brand: { type: String, default: '' },
  price: {
    type: Number,
    default: 0,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
  rating: {
    type: Number,
    default: 0,
  },
  numReviews: {
    type: Number,
    default: 0,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

productSchema.set('toJSON', {
  virtuals: true,
});

exports.Product = mongoose.model('Product', productSchema);
