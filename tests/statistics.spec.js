import request from 'supertest';

import app from '../src/app';

import { seedFunds, populateFunds, clearFunds } from './seed/seed';

beforeAll(populateFunds);
afterAll(clearFunds);

describe('/stats', () => {
  describe('GET /stats', () => {
    it('should return statistics', done => {
      request(app)
        .get('/stats')
        .expect(200)
        .expect(res => {
          const stats = res.body.statistics;
          expect(stats.totalCount).toBe(seedFunds.length);
          expect(stats.percentageDone).toBe(0.5);
          done();
        })
        .catch(err => done(err));
    });
  });
});
