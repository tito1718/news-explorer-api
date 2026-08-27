require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

const {
  PORT = 3000,
  DATABASE_URL = 'mongodb://127.0.0.1:27017/news-explorer',
} = process.env;

app.use(express.json());

app.use('/', routes);

app.use((req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

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
