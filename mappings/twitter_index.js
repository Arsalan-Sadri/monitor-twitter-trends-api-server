const { client } = require('../config.js');

client.indices.create({
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
