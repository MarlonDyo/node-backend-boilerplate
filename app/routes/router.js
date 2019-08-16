const express = require('express');

const router = express.Router();
const v1 = require('./v1/index');

router.get('/', (req, res) => {
  res.send('Server is running');
});

router.use('/api/v1', v1);

// the catch-all route
router.all('*', (req, res) => {
  res.status(404).send({ msg: 'Not found' });
});

module.exports = router;
