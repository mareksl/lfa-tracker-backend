import { funds } from '../../src/data/data';

export const seedFunds = [
  {
    id: '1',
    name: 'Fund One'
  },
  {
    id: '2',
    name: 'Fund Two'
  }
];

export const populateFunds = () => {
  funds.length = 0;
  funds.push(...JSON.parse(JSON.stringify(seedFunds)));
};
