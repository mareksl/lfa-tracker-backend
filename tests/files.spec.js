import request from 'supertest';
import app from '../src/app';
import { clearFunds } from './seed/seed';

beforeAll(clearFunds);
afterAll(clearFunds);

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
        .attach('file', './tests/seed/test.xlsx')
        .expect(201)
        .expect(res => {
          expect(res.body.statistics.totalCount).toBe(3);
          expect(res.body.statistics.doneCount).toBe(2);
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
