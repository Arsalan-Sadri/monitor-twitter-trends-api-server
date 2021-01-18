const { ID, USERNAME, PASSWORD } = require('../config.js');

const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://localhost:9200' });

module.exports = {
  addOne: (ctx) => {
    return client.Car.create(ctx.request.body);
  },
  findAll: async (ctx) => {
    const { body } = await client.search({
      index: 'game-of-thrones',
      body: {
        query: {
          match: { quote: 'winter' },
        },
      },
    });
    console.log(body.hits.hits);
    return JSON.stringify(body.hits.hits)
  },
  deleteOne: ({ params }) => {
    const { make, model, year } = params;
    return client.Car.findOneAndDelete({ make, model, year });
  },
  updateOne: ({ params: { make, model, year }, request: { body } }) => {
    return client.Car.findOneAndUpdate({ make, model, year }, body);
  },
};
