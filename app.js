const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(morgan('dev'));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const categoryRouter = require('./routes/categoryRoutes');
const productRouter = require('./routes/productRoutes');
const authRouter = require('./routes/authRoutes');

app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/auth', authRouter);

module.exports = app;
