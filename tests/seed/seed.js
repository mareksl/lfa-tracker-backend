import { funds } from '../../src/data/data';

let x = 0;

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
  console.log(funds);
  funds.push(...seedFunds);
  console.log(funds);
};
