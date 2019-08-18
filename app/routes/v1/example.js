const express = require('express');
const { validationResult } = require('express-validator');
const {
  validator: exampleValidator,
  readAllOperation: exampleReadAll,
  createOperation: exampleCreate,
  readOperation: exampleRead,
  updateOperation: exampleUpdate,
  deleteOperation: exampleDelete,
} = require('../../model/example');

const router = express.Router();

// Read all
router.get('/', (req, res) => {
  exampleReadAll().then((data) => {
    res.send(data);
  }).catch((err) => {
    res.status(422).json({ err });
  });
});

// Create
router.post('/', exampleValidator, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }
  exampleCreate(req.body).then((data) => {
    res.send(data);
  }).catch((err) => {
    res.status(422).json({ err });
  });
});

// Read
router.get('/:id', (req, res) => {
  exampleRead(req.params.id).then((data) => {
    if (data.length === 0) { res.status(404).json({}); } else { res.send(data); }
  }).catch((err) => {
    res.status(422).json({ err });
  });
});

// Update
router.put('/:id', exampleValidator, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }
  exampleUpdate(req.params.id, req.body).then((data) => {
    if (data.length === 0) { res.status(404).json({}); } else { res.send(data); }
  }).catch((err) => {
    res.status(422).json({ err });
  });
});

// Delete
router.delete('/:id', (req, res) => {
  exampleDelete(req.params.id).then((data) => {
    if (data.length === 0) { res.status(404).json({}); } else { res.send(data); }
  }).catch((err) => {
    res.status(422).json({ err });
  });
});

module.exports = router;
