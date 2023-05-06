const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ limit: '10kb' }));

const categoryRouter = require('./routes/categoryRoutes');
const productRouter = require('./routes/productRoutes');
const authRouter = require('./routes/authRoutes');

app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/auth', authRouter);

module.exports = app;
