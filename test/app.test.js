const { assert } = require('chai');
const request = require('./global-setup.js');

describe('GET /cars', function () {
  it(`Should status = 200 and JSON body, with object keys = 'make', 'model', 'year'`, async function () {
    await request
      .get('/api/cars')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(({ body }) => {
        assert.isObject(body);
        assert.hasAllKeys(body, ['make', 'model', 'year']);
      });
  });
});
