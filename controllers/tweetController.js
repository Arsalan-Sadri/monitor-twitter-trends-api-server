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
    const body = docs.flatMap((doc) => [
      { index: { _index: 'twitter' } },
      {
        ...doc,
        type,
      },
    ]);

    const res = await client.bulk({
      refresh: 'true',
      body,
    });

    if (res.statusCode !== 200) {
      throw new Error(res.body);
    }
  },

  searchAll: async (client) => {
    const res = await client.search({
      index: 'twitter',
      body: {
        query: {
          match_all: {},
        },
      },
    });

    if (res.statusCode !== 200) {
      throw new Error(res.body);
    }

    const allData = res.body.hits.hits;
    const tweets = allData.map(({ _source }) => _source);

    return tweets;
  },

  deleteOne: ({ params }) => {
    const { make, model, year } = params;
    return client.Car.findOneAndDelete({ make, model, year });
  },

  updateOne: ({ params: { make, model, year }, request: { body } }) => {
    return client.Car.findOneAndUpdate({ make, model, year }, body);
  },
};
