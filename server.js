require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app.js');
const { PORT, MONGODB_URI } = require('./config.js');

(async function () {
  await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  app.listen(PORT, () =>
    app.env === 'development'
      ? console.log(`Server is running on http://localhost:${PORT}`)
      : true
  );
})().catch((err) => console.error(err));
