if (require.main.filename.includes('twitterIndex.js')) {
  require('dotenv').config();
}

const { Client } = require('@elastic/elasticsearch');
const NODE_ENV = process.env.NODE_ENV || 'development';

if (NODE_ENV === 'development') {
  module.exports = {
    client: new Client({ node: 'http://localhost:9200' }),
  };
} else {
  const {
    ELASTIC_CLOUD_ID: ID,
    ELASTIC_CLOUD_USERNAME: USERNAME,
    ELASTIC_CLOUD_PASSWORD: PASSWORD,
  } = process.env;

  module.exports = {
    client: new Client({
      cloud: {
        id: ID,
      },
      auth: {
        username: USERNAME,
        password: PASSWORD,
      },
    }),
  };
}
