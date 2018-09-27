import request from 'supertest';
import app from '../src/app';

describe('/files', () => {
  describe('GET /files', () => {
    it('should generate and send excel file', done => {
      request(app)
        .get('/files')
        .expect(200)
        .expect(
          'Content-Type',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        )
        .end(done);
    });
  });
});
