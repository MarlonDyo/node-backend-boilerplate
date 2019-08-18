const { check, validationResult } = require('express-validator');
const {
  dbCreate,
  dbRead,
  dbReadAll,
  dbUpdate,
  dbDelete,
} = require('../../db/example');

const nameValidator = [
  check('name')
    .isLength({ min: 5 })
    .withMessage('O nome deve ter pelo menos 5 caracteres'),
];

const valueValidator = [
  check('value')
    .isFloat({ min: 0, max: 10 })
    .withMessage('O valor deve estar entre 0 e 10'),
];

const createValidator = [
  nameValidator,
  valueValidator,
];
const updateValidator = [
  nameValidator[0].optional(),
  valueValidator[0].optional(),
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
  dbRead(req.params.id).then((data) => {
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
  dbUpdate(req.params.id, req.body).then((data) => {
    if (data.length === 0) res.status(404).json({});
    else res.send(data);
  }).catch((err) => {
    res.status(422).json({ err });
  });
};

const del = (req, res) => {
  dbDelete(req.params.id).then((data) => {
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