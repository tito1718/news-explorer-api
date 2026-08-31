const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
  ConflictError,
} = require('../errors');

const { JWT_SECRET = 'development-secret' } = process.env;

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;

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
        return next(
          new ConflictError('An account with this email already exists'),
        );
      }

      if (error.name === 'ValidationError') {
        return next(new BadRequestError('Invalid registration data'));
      }

      return next(error);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user.id }, JWT_SECRET, { expiresIn: '7d' });

      return res.send({ token });
    })
    .catch(() => next(new UnauthorizedError('Incorrect email or password')));
};

const getCurrentUser = (req, res, next) => User.findById(req.user._id)
  .then((user) => {
    if (!user) {
      return next(new NotFoundError('User not found'));
    }

    return res.send({
      _id: user.id,
      name: user.name,
      email: user.email,
    });
  })
  .catch(next);

module.exports = {
  createUser,
  login,
  getCurrentUser,
};
