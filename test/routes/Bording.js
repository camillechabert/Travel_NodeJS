import request from 'supertest'

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

      it('should response with 200 status', (done) => {
        request(server)
          .get('/boarding')
          .set('Accept', 'application/json')
          .expect('content-type', 'application/json; charset=utf-8')
          .expect(200, done);
      });

      it('should response with 404 status', (done) => {
        request(server)
          .get('/boarding/qsdmlqkdmlqsdmlk')
          .set('Accept', 'application/json')
          .expect('content-type', 'application/json; charset=utf-8')
          .expect(404, done);
      });
    });
  });
  