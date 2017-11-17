import request from 'supertest'
import assert from 'assert'

// unit tests for the App component
describe('Boarding routes', () => {
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

      it('should return John seed user from database', async () => {
        const Db = await require('../../database/models/index');
        const User = Db.User;

        const jhon = await User.findOne({
            where: {
                apiToken: 'demo'
            }
        });

        assert.ok(jhon);
        assert.equal(jhon.firstName, 'John');
      });
    });
  });
  