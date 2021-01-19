const Koa = require('koa');
const logger = require('koa-logger');
const koaBody = require('koa-body');
const tweetRouter = require('./routes/tweetRouter.js');

const app = new Koa();

if (app.env === 'development') app.use(logger());
app.use(koaBody());

app.use(tweetRouter);

module.exports = app;
