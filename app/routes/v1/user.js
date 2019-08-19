const express = require('express');
const passport = require('passport');
const {
  createValidator,
  read,
  readAll,
  update,
  updateValidator,
  del,
  signUp,
  signIn,
  secret,
} = require('../../model/user');
require('../../../passport');

const router = express.Router();

router.post('/signup', createValidator, signUp);
router.post(
  '/signin',
  passport.authenticate('local', { session: false }),
  signIn,
);
router.get(
  '/secret',
  passport.authenticate('jwt', { session: false }),
  secret,
);
router.get('/:username', read);
router.get('/', readAll);
router.put('/:username', updateValidator, update);
router.delete('/:username', del);

module.exports = router;
