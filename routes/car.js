const router = require('koa-router')();
const carController = require('../controllers/carController.js');

router
  .post('/api/cars', async (ctx) => {
    const dbCar = await carController.addOne(ctx);
    ctx.body = JSON.stringify(dbCar);
  })
  .get('/api/cars', async (ctx) => {
    const allData = await carController.findAll(ctx);
    ctx.body = allData;
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
