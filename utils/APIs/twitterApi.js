const needle = require('needle');

const {
  TWITTER_BEARER_TOKEN: TOKEN,
  TWITTER_STREAM_READ_TIMEOUT: TIMEOUT_STR,
} = process.env;

const TIMEOUT = parseInt(TIMEOUT_STR);

const RULES_BASE_ENDPOINT = 'https://api.twitter.com/2/tweets/search/stream/rules';
const STREAM_BASE_ENDPOINT = 'https://api.twitter.com/2/tweets/search/stream';

// const rules = [
//   { value: 'dog has:images -is:retweet', tag: 'dog pictures' },
//   { value: 'cat has:images -grumpy', tag: 'cat pictures' },
// ];

module.exports = {
  getAllRules: async () => {
    const response = await needle('get', RULES_BASE_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    if (response.statusCode !== 200) {
      throw new Error(response.body);
    }

    return response.body;
  },

  deleteSomeRules: async (rules) => {
    if (!Array.isArray(rules.data)) {
      return null;
    }

    const ids = rules.data.map((rule) => rule.id);

    const data = {
      delete: {
        ids: ids,
      },
    };

    const response = await needle('post', RULES_BASE_ENDPOINT, data, {
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${TOKEN}`,
      },
    });

    if (response.statusCode !== 200) {
      throw new Error(response.body);
      return null;
    }

    return response.body;
  },

  addRules: async (rules) => {
    const addRules = {
      add: rules,
    };

    const res = await needle('post', RULES_BASE_ENDPOINT, addRules, {
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${TOKEN}`,
      },
    });

    if (res.statusCode !== 201) {
      throw new Error(res.body);
    }

    console.log(res.body);
  },

  streamConnect: () => {
    const options = {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      read_timeout: TIMEOUT,
    };

    const QUERY_PARAMS = `tweet.fields=created_at&expansions=author_id`;

    const stream = needle.get(`${STREAM_BASE_ENDPOINT}?${QUERY_PARAMS}`, options);

    stream
      .on('data', (data) => {
        const json = JSON.parse(data);
        console.log(json);
      })
      .on('error', (error) => {
        if (error.code === 'ETIMEDOUT') {
          stream.emit('timeout');
          console.log('errorrrr11');
        }
      })
      .on('timeout', (ev) => {
        console.error(`timeout event:> type: ${ev}`);
        throw new Error('Timeout!');
      });
  },
};
