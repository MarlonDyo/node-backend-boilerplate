const app = require('./index');
const { port } = require('../config');

app.listen(port, () => console.log(`Listening on ${port}`));
