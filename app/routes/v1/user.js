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
const tokenValidator = passport.authenticate('jwt', { session: false })
const passwordValidator = passport.authenticate('local', { session: false })

router.post('/signup' , createValidator   , signUp);
router.post('/signin' , passwordValidator , signIn );
router.get( '/secret' , tokenValidator    , secret );
router.get( '/'       , tokenValidator    , read);
router.put( '/'       , [tokenValidator, updateValidator], update );
router.delete('/'     , tokenValidator    , del);
//router.get('/', readAll);

module.exports = router;
