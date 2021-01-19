const Koa = require('koa');
const logger = require('koa-logger');
const koaBody = require('koa-body');
const cors = require('@koa/cors');
const helmet = require('koa-helmet');
const tweetRouter = require('./routes/tweetRouter.js');

const app = new Koa();

app.use(cors());
app.use(logger());
app.use(helmet());
app.use(koaBody());

app.use(tweetRouter);

module.exports = app;
