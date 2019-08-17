const express = require('express');
const cors = require('cors');
const router = require('./routes/router');

const app = express();
const { port } = require('../config');

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(port, () => console.log(`Listening on ${port}`));
