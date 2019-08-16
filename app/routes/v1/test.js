const express = require('express');
const { check, validationResult } = require('express-validator');

const router = express.Router();

const tests = [
  { id: 1, name: 'test 1' },
  { id: 2, name: 'test 2' },
  { id: 3, name: 'test 3' },
];

const testValidator = [
  check('name')
    .isLength({ min: 5 }).withMessage('O nome deve ter pelo menos 5 caracteres'),
];

router.get('/', (req, res) => {
  res.send(tests);
});

router.get('/:id', (req, res) => {
  const test = tests.find((c) => c.id === parseInt(req.params.id, 10));
  if (!test) res.status(404).send('The test id was not found');
  res.send(test);
});

router.post('/', testValidator, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const test = {
    id: tests.length + 1,
    name: (req.body.name),
  };
  tests.push(test);
  res.send(test);
  return {};
});


router.put('/:id', testValidator, (req, res) => {
  // Look up the test
  // If not existing, return 404
  const test = tests.find((c) => c.id === parseInt(req.params.id, 10));
  if (!test) return res.status(404).send('The test id was not found');
  // Validate
  // If invalid, return 400 - Bad request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  // Update test
  test.name = req.body.name;
  // Return the updated test
  res.send(test);
  return {};
});

router.delete('/:id', (req, res) => {
  // Look up the test
  // Not existing, return 404
  const test = tests.find((c) => c.id === parseInt(req.params.id, 10));
  if (!test) return res.status(404).send('The test id was not found');

  // Delete
  const index = tests.indexOf(test);
  tests.splice(index, 1);

  // Return the same test
  res.send(test);
  return {};
});

module.exports = router;
