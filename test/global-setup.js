require('dotenv').config();
const supertest = require('supertest');
const mongoose = require('mongoose');
const { MONGODB_URI } = require('../config.js');
const app = require('../app.js');
const http = require('http');

const server = http.createServer(app.callback());
module.exports = request = supertest(server);
let db;

before('Connect database', async function () {
  db = await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
});

after('Disconnect database', function () {
  db.disconnect();
});
