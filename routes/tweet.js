const router = require('koa-router')();
const tweetController = require('../controllers/tweetController.js');

router
  .post('/api/tweets', async (ctx) => {
    const dbCar = await tweetController.addOne(ctx);
    ctx.body = JSON.stringify(dbCar);
  })
  .get('/api/tweets', async (ctx) => {
    ctx.body = await tweetController.getAll(ctx.app.client);
  })
  .delete('/api/tweets/:make/:model/:year', async (ctx, next) => {
    await tweetController.deleteOne(ctx);
    ctx.status = 200;
  })
  .put('/api/tweets/:make/:model/:year', async (ctx, next) => {
    await tweetController.updateOne(ctx);
    ctx.status = 200;
  });

module.exports = router.routes();
