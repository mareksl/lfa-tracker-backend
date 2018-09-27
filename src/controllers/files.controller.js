import { funds } from '../data/data';

const getFile = (req, res) => {
  const file = res.locals.file;

  res.attachment('data.xlsx');
  res.type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.send(file);
};

const post = (req, res) => {
  const data = res.locals.data;

  const addedFunds = data.map(fund => {
    return {
      id: `${fund.id}`,
      name: `${fund.name}`
    };
  });

  funds.push(...addedFunds);

  return res.status(201).send({ funds });
};

export default {
  getFile,
  post
};
