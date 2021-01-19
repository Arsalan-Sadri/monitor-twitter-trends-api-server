module.exports = {
  indexOne: async (client, doc, type) => {
    doc.type = type;

    await client.index({
      index: 'twitter',
      refresh: 'true',
      body: doc,
    });
  },

  bulk: async (client, docs, type) => {
    const body = docs.flatMap((doc) => [
      { index: { _index: 'twitter' } },
      {
        ...doc,
        type,
      },
    ]);

    await client.bulk({
      refresh: 'true',
      body,
    });
  },

  searchAll: async (client) => {
    const {
      body: {
        hits: { hits },
      },
    } = await client.search({
      index: 'twitter',
      size: 10000,
      body: {
        query: {
          match_all: {},
        },
      },
    });

    return hits.map(({ _source }) => _source);
  },

  deleteOne: ({ params }) => {
    const { make, model, year } = params;
    return client.Car.findOneAndDelete({ make, model, year });
  },

  updateOne: ({ params: { make, model, year }, request: { body } }) => {
    return client.Car.findOneAndUpdate({ make, model, year }, body);
  },
};
