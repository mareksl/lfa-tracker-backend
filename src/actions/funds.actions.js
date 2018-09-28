import { funds } from '../data/data';
import { Fund } from '../models/Fund.model';

const getAll = () => {
  return funds.slice();
};

const add = data => {
  const fund = new Fund(`${data.id}`, `${data.name}`);
  funds.push(fund);
  return fund;
};

const findById = id => {
  return funds.find(result => result.id === id);
};

const modify = (fund, data) => {
  fund.modify(data);
  return fund;
};

const removeById = id => {
  const pos = funds.findIndex(result => result.id === id);
  if (pos === -1) {
    return null;
  }
  return funds.splice(pos, 1)[0];
};

export default {
  add,
  findById,
  modify,
  removeById,
  getAll
};
