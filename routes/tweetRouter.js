const router = require('koa-router')();
const tweetController = require('../controllers/tweetController.js');
const { api: { twitterApi } } = require('../utils');

const BASE = '/v1/tweets';

router
  .post(`${BASE}/search/recent/query`, async (ctx) => {
    

    ctx.body = await tweetController.insertMany(ctx.app.client);
  })

  .get(`${BASE}`, async (ctx) => {
    ctx.body = await tweetController.getAll(ctx.app.client);
  })

  .delete(`${BASE}/:make/:model/:year`, async (ctx, next) => {
    await tweetController.deleteOne(ctx);
    ctx.status = 200;
  })

  .put(`${BASE}/:make/:model/:year`, async (ctx, next) => {
    await tweetController.updateOne(ctx);
    ctx.status = 200;
  });

module.exports = router.routes();
