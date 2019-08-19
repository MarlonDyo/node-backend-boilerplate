const { check, validationResult } = require('express-validator');
const JWT = require('jsonwebtoken');
const {
  dbCreate,
  dbReadByEmail,
  dbReadByUsername,
  dbReadAll,
  dbUpdate,
  dbDelete,
} = require('../../db/user');
const { jwtSecret } = require('../../config');

const emailValidator = check('email')
  .optional()
  .isEmail()
  .custom(async (email) => {
    if (email === null) return;
    await dbReadByEmail(email).then((user) => {
      if (user.length !== 0) {
        return Promise.reject(new Error('O email já está sendo usado'));
      }
      return true;
    });
  })
  .withMessage('Email inválido');

const passwordValidator = check('password')
  .optional()
  .isLength({ min: 6, max: 32 })
  .withMessage('A senha deve ter de 5 a 32 caracteres');

const usernameValidator = check('username')
  .optional()
  .isLength({ min: 5 })
  .custom(async (username) => {
    await dbReadByUsername(username).then((user) => {
      if (user.length !== 0) {
        return Promise.reject(new Error('O usuário já existe'));
      }
      return true;
    });
  })
  .withMessage('O nome deve ter pelo menos 5 caracteres');

const createValidator = [
  check('username').exists().withMessage('O nome do usuário é necessário'),
  check('password').exists().withMessage('A senha é necessária'),
  check('email').exists().withMessage('O email é necessário'),
  usernameValidator,
  passwordValidator,
  emailValidator,
];

const updateValidator = [
  emailValidator,
  passwordValidator,
];

const signToken = (user) => {
  // current time + 1 day
  const expiration = new Date().setDate(new Date().getDate() + 1);
  const issueAt = new Date().getTime();
  return JWT.sign({
    iss: 'node-backend-boilerplate', // issuer
    sub: user.username, // subject
    iat: issueAt,
    exp: expiration,
  }, jwtSecret);
};

const readAll = async (req, res) => {
  dbReadAll().then((data) => {
    res.send(data);
  }).catch((err) => {
    res.status(422).json({ err });
  });
};

const read = async (req, res) => {
  dbReadByUsername(req.params.username).then((data) => {
    if (data.length === 0) res.status(404).json({});
    else res.send(data);
  }).catch((err) => {
    res.status(422).json({ err });
  });
};

const update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }
  dbUpdate(req.params.username, req.body).then((data) => {
    if (data.length === 0) res.status(404).json({});
    else res.send(data);
  }).catch((err) => {
    res.status(422).json({ err });
  });
};

const del = async (req, res) => {
  dbDelete(req.params.username).then((data) => {
    if (data.length === 0) res.status(404).json({});
    else res.send(data);
  }).catch((err) => {
    res.status(422).json({ err });
  });
};

const signUp = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }
  dbCreate(req.body).then((data) => {
    if (data.length === 0) res.status(500).json({});
    const token = signToken(data[0]);
    res.status(200).json({ token });
  }).catch((err) => {
    res.status(422).json({ err });
  });
};

const signIn = async (req, res) => {
  try {
    const token = signToken(req.body.username);
    res.status(200).json({ token });
  } catch (err) {
    res.status(422).json({ err });
  }
};

const secret = async (req, res) => {
  res.status(200).json({ msg: 'success' });
};

module.exports = {
  createValidator,
  read,
  readAll,
  update,
  updateValidator,
  del,
  signUp,
  signIn,
  secret,
};
