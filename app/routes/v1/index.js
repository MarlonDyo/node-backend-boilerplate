const express = require('express');

const router = express.Router();
const testRoute = require('./test');
const exampleRoute = require('./example');
const userRoute = require('./user');

router.use('/tests', testRoute);
router.use('/examples', exampleRoute);
router.use('/users', userRoute);

module.exports = router;
