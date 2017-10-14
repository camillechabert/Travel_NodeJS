import request from 'supertest'
import assert from 'assert'

// unit tests for the App component
describe('Bording routes', () => {
  const serverPath = '../../App/server'

    describe('Get requests', () => {
      var server = null;

      beforeEach(() => {
        // free up memory from previous cached server
        delete require.cache[require.resolve(serverPath)];
        server = require(serverPath);
      });

      afterEach((done) => {
        server.close(done);
      });

      it('should return John seed user from seed', async () => {
        const User = await require('../../models/index').User;

        const jhon = await User.findOne({
            where: {
                apiToken: 'demo'
            }
        });

        assert.equal(jhon.firstName, 'John');
      });
    });
  });
  