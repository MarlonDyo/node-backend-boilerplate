const express = require('express');

const router = express.Router();
const testRoute = require('./test');
const exampleRoute = require('./example');

router.use('/tests', testRoute);
router.use('/examples', exampleRoute);

module.exports = router;
