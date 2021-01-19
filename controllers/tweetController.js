module.exports = {
  indexOne: async (client, doc, type) => {
    doc.type = type;

    const res = await client.index({
      index: 'twitter',
      refresh: 'true',
      body: doc,
    });

    if (res.statusCode !== 201) {
      throw new Error(res.body);
    }
  },

  bulk: async (client, docs, type) => {
    dataSet = docs.map((doc) => {
      doc, type;
    });
    console.log(dataSet);

    // const res = await client.bulk({
    //   index: 'twitter',
    //   refresh: 'true',
    //   body: doc,
    // });

    // console.log(res);
  },

  getAll: async (client) => {
    const { body } = await client.search({
      index: 'game-of-thrones',
      body: {
        query: {
          match_all: {},
        },
      },
    });

    return body.hits.hits;
  },

  deleteOne: ({ params }) => {
    const { make, model, year } = params;
    return client.Car.findOneAndDelete({ make, model, year });
  },

  updateOne: ({ params: { make, model, year }, request: { body } }) => {
    return client.Car.findOneAndUpdate({ make, model, year }, body);
  },
};
