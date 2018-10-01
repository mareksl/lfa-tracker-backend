import { funds } from '../../src/data/data';
import FundsActions from '../../src/actions/funds.actions';

export const seedFunds = [
  {
    lipperId: 60081153,
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
    isinCode: 'LU0140354944',
    assetTypeName: 'Absolute Return EUR High',
    classificationName: 'Mixed Assets',
    awardVerifiedNoteDate: '11-Jan-18',
    awardVerifiedNoteText: '10 , 5 y TR 29/12/2017 Verified',
    extendedLGCVerified: true,
    performanceVerified: true,
    profileDataVerified: true,
    timeseriesDataVerified: true
  },
  {
    lipperId: 60003460,
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
    isinCode: 'LU0095938881',
    assetTypeName: 'Absolute Return EUR High',
    classificationName: 'Alternatives',
    awardVerifiedNoteDate: '3-Jan-18',
    awardVerifiedNoteText: '1,3,5,10 y TR to 31/12/2017 Verified',
    extendedLGCVerified: true,
    performanceVerified: true,
    profileDataVerified: true,
    timeseriesDataVerified: true
  }
];

export const populateFunds = () => {
  funds.length = 0;
  const seedCopy = JSON.parse(JSON.stringify(seedFunds));
  seedCopy.forEach(fund => FundsActions.add(fund));
};
