const express = require('express');
const {
  create,
  createValidator,
  read,
  readAll,
  update,
  updateValidator,
  del,
} = require('../../model/user');

const router = express.Router();

router.post('/', createValidator, create);
router.get('/:username', read);
router.get('/', readAll);
router.put('/:username', updateValidator, update);
router.delete('/:username', del);

module.exports = router;
