const bcrypt = require('bcryptjs');
const User = require('../models/user');

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

module.exports = {
  createUser,
};
