require('dotenv').config();
const app = require('./app.js');
const { client } = require('./config.js');

app.client = client;

app.listen(process.env.PORT, () =>
  app.env === 'development'
    ? console.log(`Server is running on http://localhost:${PORT}`)
    : true
);
