require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { rateLimit } = require('express-rate-limit');

const routes = require('./routes');
const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { NotFoundError } = require('./errors');

const app = express();

app.set('trust proxy', 1);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: 'Too many requests. Please try again later.',
  },
});

const {
  PORT = 3000,
  DATABASE_URL = 'mongodb://127.0.0.1:27017/news-explorer',
} = process.env;

app.use(helmet());
app.use(requestLogger);
app.use(limiter);
app.use(express.json());

app.use('/', routes);

app.use((_req, _res, next) => {
  next(new NotFoundError());
});

app.use(errorLogger);
app.use(errorHandler);

mongoose
  .connect(DATABASE_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
  });
