const { check, validationResult } = require('express-validator');
const {
  dbCreate,
  dbReadByEmail,
  dbReadByUsername,
  dbReadAll,
  dbUpdate,
  dbDelete,
} = require('../../db/user');

const emailValidator = [
  check('email')
    .isEmail()
    .withMessage('Email inválido')
    .custom(async (email) => {
      if (email === null) return;
      await dbReadByEmail(email).then((user) => {
        if (user.length !== 0) {
          return Promise.reject(new Error('O email já está sendo usado'));
        }
        return true;
      });
    }),
];

const passwordValidator = [
  check('password')
    .isLength({ min: 6, max: 32 })
    .withMessage('A senha deve ter de 5 a 32 caracteres'),
];

const usernameValidator = [
  check('username')
    .isLength({ min: 5 })
    .withMessage('O nome deve ter pelo menos 5 caracteres')
    .custom(async (username) => {
      await dbReadByUsername(username).then((user) => {
        if (user.length !== 0) {
          return Promise.reject(new Error('O usuário já existe'));
        }
        return true;
      });
    }),
];

const createValidator = [
  usernameValidator,
  passwordValidator,
  emailValidator,
];
const updateValidator = [
  emailValidator[0].optional(),
  passwordValidator[0].optional(),
];

const create = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }
  dbCreate(req.body).then((data) => {
    res.send(data);
  }).catch((err) => {
    res.status(422).json({ err });
  });
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

const del = (req, res) => {
  dbDelete(req.params.username).then((data) => {
    if (data.length === 0) res.status(404).json({});
    else res.send(data);
  }).catch((err) => {
    res.status(422).json({ err });
  });
};

module.exports = {
  create,
  createValidator,
  read,
  readAll,
  update,
  updateValidator,
  del,
};
