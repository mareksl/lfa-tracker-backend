import request from 'supertest';
import app from '../src/app';

import { seedFunds, populateFunds, clearFunds } from './seed/seed';

beforeAll(populateFunds);
afterAll(clearFunds);

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
      const id = seedFunds[0].lipperID;

      request(app)
        .get(`/funds/${id}`)
        .expect(200)
        .expect(res => {
          expect(res.body.fund.lipperID).toBe(id);
          expect(res.body.fund.fundName).toBe(seedFunds[0].fundName);
          done();
        })
        .catch(err => done(err));
    });

    it('should return 404 if fund not found', done => {
      const id = '123asd';

      request(app)
        .get(`/funds/${id}`)
        .expect(404)
        .end(done);
    });
  });

  describe('POST /funds', () => {
    it('should create new fund', done => {
      const fund = {
        lipperID: 65000259,
        awardUniverse: 'Austria',
        awardPeriod: '3,5',
        highestRank: '1',
        fundName: 'PRO INVEST PLUS T',
        domicile: 'Austria',
        advisorCompanyCode: 1281775,
        advisorCompanyName: 'Kremser Bank & Sparkassen AG',
        promoterCompanyCode: 1278133,
        promoterCompanyName: 'Kremser Bank & Sparkassen',
        fundOwner: 'Marek Sladczyk',
        department: 'Gdynia - AGS',
        classificationScheme: 'Lipper Global',
        iSINCode: 'AT0000612718',
        assetTypeName: 'Absolute Return EUR High',
        classificationName: 'Mixed Assets',
        awardVerifiedNoteDate: '12-Jan-18',
        awardVerifiedNoteText: '3,5,10y TR to 29.12.2017',
        extendedLGCVerified: true,
        performanceVerified: true,
        profileDataVerified: true,
        timeseriesDataVerified: true
      };

      request(app)
        .post('/funds')
        .send(fund)
        .expect(201)
        .expect(res => {
          expect(res.body.fund.lipperID).toBe(fund.lipperID);
          expect(res.body.fund.fundName).toBe(fund.fundName);
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

    it('should return 400 if no data passed', done => {
      request(app)
        .post('/funds')
        .send()
        .expect(400)
        .end(done);
    });
  });

  describe('PATCH /funds/:id', () => {
    it('should modify the fund by id', done => {
      const id = seedFunds[0].lipperID;
      const isin = seedFunds[0].iSINCode;
      const fundName = 'A ModifiedFund';

      request(app)
        .patch(`/funds/${id}`)
        .send({ fundName })
        .expect(200)
        .expect(res => {
          expect(res.body.fund.fundName).toBe(fundName);
          expect(res.body.fund.iSINCode).toBe(isin);
          done();
        })
        .end((err, res) => {
          if (err) return done(err);

          request(app)
            .get('/funds')
            .expect(200)
            .expect(res => {
              expect(res.body.funds[0].fundName).toBe(fundName);
              done();
            })
            .catch(err => done(err));
        });
    });

    it('should return 404 if fund not found', done => {
      const id = 'asd';
      const fundName = 'A ModifiedFund';

      request(app)
        .patch(`/funds/${id}`)
        .send({ fundName })
        .expect(404)
        .end(done);
    });
  });

  describe('DELETE /funds/:id', () => {
    it('should delete fund by id', done => {
      const id = seedFunds[1].lipperID;

      request(app)
        .delete(`/funds/${id}`)
        .expect(200)
        .expect(res => {
          expect(res.body.fund.lipperID).toBe(id);
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
