const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { JWT_SECRET = 'development-secret' } = process.env;

const createUser = (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send({
      message: 'Name, email, and password are required',
    });
  }

  return bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => res.status(201).send({
      _id: user.id,
      name: user.name,
      email: user.email,
    }))
    .catch((error) => {
      if (error.code === 11000) {
        return res.status(409).send({
          message: 'An account with this email already exists',
        });
      }

      if (error.name === 'ValidationError') {
        return res.status(400).send({
          message: 'Invalid registration data',
        });
      }

      return res.status(500).send({
        message: 'An error occurred on the server',
      });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({
      message: 'Email and password are required',
    });
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user.id }, JWT_SECRET, { expiresIn: '7d' });

      return res.send({ token });
    })
    .catch(() => res.status(401).send({
      message: 'Incorrect email or password',
    }));
};

const getCurrentUser = (req, res) => User.findById(req.user._id)
  .then((user) => {
    if (!user) {
      return res.status(404).send({
        message: 'User not found',
      });
    }

    return res.send({
      _id: user.id,
      name: user.name,
      email: user.email,
    });
  })
  .catch(() => res.status(500).send({
    message: 'An error occurred on the server',
  }));

module.exports = {
  createUser,
  login,
  getCurrentUser,
};
