const { client } = require('../config.js');

(async function run() {
  let res;

  res = await client.indices.exists({
    index: 'twitter',
  });

  if (res.statusCode === 200) {
    await client.indices.delete({
      index: 'twitter',
    });
  }

  await client.indices.create({
    index: 'twitter',
    body: {
      mappings: {
        properties: {
          type: {
            type: 'keyword',
          },
          name: {
            type: 'text',
          },
          username: {
            type: 'keyword',
          },
          email: {
            type: 'keyword',
          },
          id: {
            type: 'keyword',
          },
          text: {
            type: 'text',
          },
          created_at: {
            type: 'date',
          },
          author_id: {
            type: 'keyword',
          },
        },
      },
    },
  });

  res = await client.indices.getMapping({
    index: 'twitter',
  });

  if (res.statusCode === 200) console.log(res.body.twitter.mappings);
})();
