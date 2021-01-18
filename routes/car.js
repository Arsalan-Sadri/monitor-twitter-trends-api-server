const router = require('koa-router')();
const carController = require('../controllers/carController.js');

router
  .post('/api/cars', async (ctx) => {
    const dbCar = await carController.addOne(ctx);
    ctx.body = JSON.stringify(dbCar);
  })
  .get('/api/tweets', async (ctx) => {
    ctx.body = await carController.getAll(ctx.app.client);
  })
  .delete('/api/cars/:make/:model/:year', async (ctx, next) => {
    await carController.deleteOne(ctx);
    ctx.status = 200;
  })
  .put('/api/cars/:make/:model/:year', async (ctx, next) => {
    await carController.updateOne(ctx);
    ctx.status = 200;
  });

module.exports = router.routes();
