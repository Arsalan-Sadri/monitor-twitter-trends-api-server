require('dotenv').config();
const { Client } = require('@elastic/elasticsearch');
const { PORT, ID, USERNAME, PASSWORD } = require('./config.js');
const app = require('./app.js');

app.client = new Client({ node: 'http://localhost:9200' });

// const client = await Client({
//   cloud: {
//     id: ID,
//   },
//   auth: {
//     username: USERNAME,
//     password: PASSWORD,
//   },
// });

app.listen(PORT, () =>
  app.env === 'development'
    ? console.log(`Server is running on http://localhost:${PORT}`)
    : true
);
