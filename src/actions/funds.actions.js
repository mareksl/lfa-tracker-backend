import { Fund } from '../models/Fund.model';

const getAll = () => {
  return Fund.find({})
    .sort('fundName')
    .exec();
};

const getRange = (page, limit, query) => {
  const regex = new RegExp(query, 'gi');
  return Fund.paginate(
    { fundName: regex },
    { page, limit, sort: { fundName: 1 } }
  );
};

const getCount = () => {
  return Fund.estimatedDocumentCount();
};

const getAllToExport = () => {
  return Fund.find({})
    .lean()
    .exec()
    .then(funds =>
      funds.map(fund => {
        delete fund._id;
        for (let key in fund) {
          if (fund.hasOwnProperty(key)) {
            if (fund[key] instanceof Array) {
              fund[key] = fund[key].join(',');
            }
          }
        }
        return fund;
      })
    );
};

const add = data => {
  const fund = new Fund(data);
  return fund.save();
};

const findById = id => {
  return Fund.findOne({ lipperID: id });
};

const findByQuery = query => {
  return Fund.find(query);
};

const modify = (id, data) => {
  return Fund.findOneAndUpdate(
    { lipperID: id },
    {
      $set: data
    },
    { runValidators: true, new: true }
  );
};

const removeAll = () => {
  return Fund.deleteMany({});
};

const removeById = id => {
  return Fund.findOneAndDelete({ lipperID: id });
};

const addMany = funds => {
  return Fund.upsertMany(funds, ['lipperID']);
};

export default {
  add,
  addMany,
  findById,
  findByQuery,
  modify,
  removeAll,
  removeById,
  getAll,
  getAllToExport,
  getRange,
  getCount
};
