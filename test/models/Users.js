import request from 'supertest'
import assert from 'assert'

// unit tests for the App component
describe('Boarding routes', () => {
  const Db = require('../../database/models/index')
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

      it('should return John seed user from database', (done) => {
        Db.User.findOne({
            where: {
                apiToken: 'demo'
            }
        }).done((res, error) => {
          if (error) return done(new Error(error));

          assert.ok(res);
          assert.equal(res.firstName, 'John');
          done();
        });
      });
    });
  });
  