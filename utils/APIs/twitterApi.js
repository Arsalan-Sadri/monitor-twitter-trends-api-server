const needle = require('needle');

const {
  TWITTER_BEARER_TOKEN: TOKEN,
  TWITTER_STREAM_READ_TIMEOUT: TIMEOUT_STR,
} = process.env;

const TIMEOUT = parseInt(TIMEOUT_STR);

const RULES_BASE_URL = 'https://api.twitter.com/2/tweets/search/stream/rules';
const SEARCH_RECENT_BASE_URL = 'https://api.twitter.com/2/tweets/search/recent';
const STREAM_BASE_URL = 'https://api.twitter.com/2/tweets/search/stream';

module.exports = {
  addRules: async (rules) => {
    const addRules = {
      add: rules,
    };

    const res = await needle('post', RULES_BASE_URL, addRules, {
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${TOKEN}`,
      },
    });

    if (res.statusCode !== 201) {
      throw new Error(res.body);
    }

    return res.body.data;
  },

  getAllRules: async () => {
    const response = await needle('get', RULES_BASE_URL, {
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

    const response = await needle('post', RULES_BASE_URL, data, {
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

  searchRecent: async (query) => {
    const params = {
      'tweet.fields': 'created_at',
      expansions: 'author_id',
      max_results: 100,
      query,
    };

    const res = await needle('get', SEARCH_RECENT_BASE_URL, params, {
      headers: {
        authorization: `Bearer ${TOKEN}`,
      },
    });

    if (res.statusCode !== 200) {
      throw new Error(res.body);
    }

    return res.body;
  },

  streamConnect: () => {
    const options = {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      read_timeout: TIMEOUT,
    };

    const QUERY_PARAMS = `tweet.fields=created_at&expansions=author_id`;

    const stream = needle.get(`${STREAM_BASE_URL}?${QUERY_PARAMS}`, options);

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
