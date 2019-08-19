const express = require('express');
const {
  create,
  createValidator,
  read,
  readAll,
  update,
  updateValidator,
  del,
} = require('../../model/example');

const router = express.Router();

router.post('/', createValidator, create);
router.get('/:id', read);
router.get('/', readAll);
router.put('/:id', updateValidator, update);
router.delete('/:id', del);

module.exports = router;
