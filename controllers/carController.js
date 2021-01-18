const db = require('../models');

module.exports = {
  addOne: (ctx) => {
    return db.Car.create(ctx.request.body);
  },
  findAll: (ctx) => {
    return db.Car.find({});
  },
  deleteOne: ({ params }) => {
    const { make, model, year } = params;
    return db.Car.findOneAndDelete({ make, model, year });
  },
  updateOne: ({ params: { make, model, year }, request: { body } }) => {
    return db.Car.findOneAndUpdate({ make, model, year }, body);
  },
};
