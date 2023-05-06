const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

const categoryRouter = require('./routes/categoryRoutes');

app.use('/api/v1/categories', categoryRouter);

module.exports = app;
