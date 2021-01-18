require('dotenv').config();
const app = require('./app.js');
const { PORT } = require('./config.js');

(async function () {
  // const client = await Client({
  //   cloud: {
  //     id: ID,
  //   },
  //   auth: {
  //     username: USERNAME,
  //     password: PASSWORD,
  //   },
  // });

  app.listen(PORT, () =>
    app.env === 'development'
      ? console.log(`Server is running on http://localhost:${PORT}`)
      : true
  );
})().catch((err) => console.error(err));
