module.exports = {
  MONGODB_URI:
    process.env.NODE_ENV === 'test'
      ? process.env.MONGODB_LOCAL_URI_TEST
      : process.env.NODE_ENV === 'development'
      ? process.env.MONGODB_LOCAL_URI
      : process.env.MONGODB_PRODUCTION_URI,
  PORT: process.env.PORT,
};
