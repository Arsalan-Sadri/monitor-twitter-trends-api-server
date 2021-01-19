const router = require('koa-router')();
const tweetController = require('../controllers/tweetController.js');
const {
  api: { twitterApi },
} = require('../utils');

const BASE = '/v1/tweets';

router
  .get(`${BASE}/search/recent`, async (ctx) => {
    const { query } = ctx.request.query;

    const { data } = await twitterApi.searchRecent(query);

    await tweetController.bulk(ctx.app.client, data, 'tweet');

  

    // ctx.body = await tweetController.insertMany(ctx.app.client);
    ctx.body = { okay: 'yessss!' };
  })

  .post(`${BASE}/search/stream`, async (ctx) => {
    // const rules = ctx.request.body;

    // const [newRule] = await twitterApi.addRules(rules);

    // await tweetController.indexOne(ctx.app.client, newRule, 'rule');

    return true;
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
