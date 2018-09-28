import { funds } from '../../src/data/data';
import FundsActions from '../../src/actions/funds.actions';

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
  const seedCopy = JSON.parse(JSON.stringify(seedFunds));
  seedCopy.forEach(fund => FundsActions.add(fund));
};
