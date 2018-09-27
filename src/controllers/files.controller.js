import xlsx from 'xlsx';

import { funds } from '../data/data';

export default {
  get: (req, res) => {
    const file = res.locals.file;

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.end(file);
  },
  post: (req, res) => {
    const data = res.locals.data;
    
    const addedFunds = data.map(fund => {
      return {
        id: `${fund.id}`,
        name: `${fund.name}`
      };
    });

    funds.push(...addedFunds);

    return res.status(201).send({ funds });
  }
};
