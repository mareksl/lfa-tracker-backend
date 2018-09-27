import request from 'supertest';
import app from '../src/app';

import { seedFunds, populateFunds } from './seed/seed';

beforeAll(populateFunds);

describe('/funds', () => {
  describe('GET /funds', () => {
    it('should return list of funds', done => {
      request(app)
        .get('/funds')
        .expect(200)
        .expect(res => {
          expect(res.body.funds.length).toBe(2);
          done();
        })
        .catch(err => done(err));
    });
  });

  describe('GET /funds/:id', () => {
    it('should return fund by id', done => {
      const id = seedFunds[0].id;

      request(app)
        .get(`/funds/${id}`)
        .expect(200)
        .expect(res => {
          expect(res.body.fund.id).toBe(id);
          expect(res.body.fund.name).toBe(seedFunds[0].name);
          done();
        })
        .catch(err => done(err));
    });

    it('should return 404 if fund not found', done => {
      const id = 'asd';

      request(app)
        .get(`/funds/${id}`)
        .expect(404)
        .end(done);
    });
  });

  describe('POST /funds', () => {
    it('should create new fund', done => {
      const fund = {
        id: '3',
        name: 'Fund Three'
      };

      request(app)
        .post('/funds')
        .send({ fund })
        .expect(201)
        .expect(res => {
          expect(res.body.fund.id).toBe(fund.id);
          expect(res.body.fund.name).toBe(fund.name);
          done();
        })
        .end((err, res) => {
          if (err) return done(err);

          request(app)
            .get('/funds')
            .expect(200)
            .expect(res => {
              expect(res.body.funds.length).toBe(3);
              done();
            })
            .catch(err => done(err));
        });
    });
  });

  describe('PATCH /funds/:id', () => {
    const id = seedFunds[0].id;
    const name = 'ModifiedFund';

    it('should modify the fund by id', done => {
      request(app)
        .patch(`/funds/${id}`)
        .send({ name })
        .expect(200)
        .expect(res => {
          expect(res.body.fund.name).toBe(name);
          done();
        })
        .end((err, res) => {
          if (err) return done(err);

          request(app)
            .get('/funds')
            .expect(200)
            .expect(res => {
              expect(res.body.funds[0].name).toBe(name);
              done();
            })
            .catch(err => done(err));
        });
    });

    it('should return 404 if fund not found', done => {
      const id = 'asd';

      request(app)
        .patch(`/funds/${id}`)
        .send({ name })
        .expect(404)
        .end(done);
    });
  });

  describe('DELETE /funds/:id', () => {
    it('should delete fund by id', done => {
      const id = seedFunds[1].id;

      request(app)
        .delete(`/funds/${id}`)
        .expect(200)
        .expect(res => {
          expect(res.body.fund.id).toBe(id);
          done();
        })
        .end((err, res) => {
          if (err) return done(err);

          request(app)
            .get('/funds')
            .expect(200)
            .expect(res => {
              expect(res.body.funds.length).toBe(2);
              done();
            })
            .catch(err => done(err));
        });
    });

    it('should return 404 if fund not found', done => {
      const id = 'asd';

      request(app)
        .delete(`/funds/${id}`)
        .expect(404)
        .end(done);
    });
  });
});
