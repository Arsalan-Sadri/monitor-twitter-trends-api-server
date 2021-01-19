const router = require('koa-router')();
const tweetController = require('../controllers/tweetController.js');
const {
  api: { twitterApi },
} = require('../utils');

const BASE = '/v1/tweets';

router
  .get(`${BASE}`, async (ctx) => {
    const { client } = ctx.app;

    ctx.body = await tweetController.matchAll(client);
  })

  .get(`${BASE}/search/recent`, async (ctx) => {
    const { client } = ctx.app;
    const { query } = ctx.request.query;
    let hundreds = 0;

    let {
      data,
      meta: { next_token },
    } = await twitterApi.searchRecent(query);

    hundreds += 100;

    await tweetController.bulk(client, data, 'tweet');

    while (next_token !== null) {
      const {
        data,
        meta: { next_token: nt },
      } = await twitterApi.searchRecent(query, next_token);

      hundreds += 100;

      await tweetController.bulk(client, data, 'tweet');

      if (nt && hundreds < 10000) {
        next_token = nt;
      } else {
        next_token = null;
      }
    }

    ctx.body = await tweetController.matchAll(client);
  })

  .post(`${BASE}/search/stream`, async (ctx) => {
    const rules = ctx.request.body;

    const [newRule] = await twitterApi.addRules(rules);

    await tweetController.indexOne(ctx.app.client, newRule, 'rule');

    return true;
  })

  .get(`${BASE}`, async (ctx) => {
    ctx.body = await tweetController.getAll(ctx.app.client);
  });

module.exports = router.routes();
