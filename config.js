if (require.main.filename.includes('twitterIndex.js')) {
  require('dotenv').config();
}

const { Client } = require('@elastic/elasticsearch');
const {
  NODE_ENV = 'development',
  ELASTIC_CLOUD_ID: ID,
  ELASTIC_CLOUD_USERNAME: USERNAME,
  ELASTIC_CLOUD_PASSWORD: PASSWORD,
} = process.env;

module.exports = {
  client:
    NODE_ENV === 'development'
      ? new Client({ node: 'http://localhost:9200' })
      : new Client({
          cloud: {
            id: ID,
          },
          auth: {
            username: USERNAME,
            password: PASSWORD,
          },
        }),
};
