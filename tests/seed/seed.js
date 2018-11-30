import { Fund } from '../../src/models/Fund.model';
import StatisticsActions from '../../src/actions/statistics.actions';

export const seedFunds = [
  {
    lipperID: 60081153,
    awardUniverse: ['Austria', 'Europe', 'Germany'],
    awardPeriod: [10, 5],
    highestRank: 1,
    fundName: 'HAIG Return Global P',
    domicile: 'Luxembourg',
    advisorCompanyCode: 4179290,
    advisorCompanyName: 'Reuss Private Europe AG',
    promoterCompanyCode: 1279583,
    promoterCompanyName: 'Hauck & Aufhaeuser',
    fundOwner: 'Bartlomiej Piekny',
    department: 'Gdynia - AGS',
    classificationScheme: 'Lipper Global',
    iSINCode: 'LU0140354944',
    assetTypeName: 'Absolute Return EUR High',
    classificationName: 'Mixed Assets',
    awardVerifiedNoteDate: '11-Jan-18',
    awardVerifiedNoteText: '10 , 5 y TR 29/12/2017 Verified',
    extendedLGCVerified: true,
    performanceVerified: true,
    profileDataVerified: true,
    timeSeriesVerified: true
  },
  {
    lipperID: 60003460,
    awardUniverse: [
      'Austria',
      'Europe',
      'France',
      'Netherlands',
      'Nordic',
      'Switzerland',
      'UK'
    ],
    awardPeriod: [10, 3, 5],
    highestRank: 1,
    fundName: 'JPM Global Macro Opportunities A Acc EUR',
    domicile: 'Luxembourg',
    advisorCompanyCode: 1275929,
    advisorCompanyName: 'JPMorgan Asset Management (UK) Limited',
    promoterCompanyCode: 1277699,
    promoterCompanyName: 'JPMorgan',
    fundOwner: 'Adam Kaczmarczyk',
    department: 'Gdynia - Benelux',
    classificationScheme: 'Lipper Global',
    iSINCode: 'LU0095938881',
    assetTypeName: 'Absolute Return EUR High',
    classificationName: 'Alternatives',
    awardVerifiedNoteDate: '3-Jan-18',
    awardVerifiedNoteText: '1,3,5,10 y TR to 31/12/2017 Verified',
    extendedLGCVerified: false,
    performanceVerified: false,
    profileDataVerified: true,
    timeSeriesVerified: true
  }
];

export const clearFunds = done => {
  Fund.remove({}).then(() => done());
};

export const populateFunds = done => {
  Fund.remove({})
    .then(() => {
      StatisticsActions.saveStatistics(seedFunds);
      return Fund.insertMany(seedFunds);
    })
    .then(() => done());
};
