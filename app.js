require('dotenv').config();

const cors = require('cors');
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

const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'https://tito-wtwr.crabdance.com',
  'https://www.tito-wtwr.crabdance.com',
  'https://newsexplorer.pages.dev',
  'https://newsexplorer.ldtp.com',
];

app.use(
  cors({
    origin: allowedOrigins,
  }),
);

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
