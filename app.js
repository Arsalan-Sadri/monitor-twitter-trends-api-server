const Koa = require('koa');
const logger = require('koa-logger');
const koaBody = require('koa-body');
const carRouter = require('./routes/car.js');

const app = new Koa();

if (app.env === 'development') app.use(logger());
app.use(koaBody());

app.use(carRouter);

module.exports = app;
