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

  describe('POST /files', () => {
    it('should import xlsx file and add funds', done => {
      request(app)
        .post('/files')
        .attach('book', './tests/seed/test.xlsx')
        .expect(201)
        .expect(res => {
          expect(res.body.funds.length).toBe(3);
          done();
        })
        .catch(err => done(err));
    });

    it('should return 400 if no file attached', done => {
      request(app)
        .post('/files')
        .expect(400)
        .end(done);
    });
  });
});
