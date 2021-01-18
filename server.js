require('dotenv').config();
const app = require('./app.js');
const { client, PORT } = require('./config.js');

app.client = client;

app.listen(PORT, () =>
  app.env === 'development'
    ? console.log(`Server is running on http://localhost:${PORT}`)
    : true
);
