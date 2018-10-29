import { Fund } from '../models/Fund.model';
import { makeRegexObject } from '../utils/utils';

const getAll = () => {
  return Fund.find({})
    .sort('fundName')
    .exec();
};

const getByQuery = (page, limit, query, sort) => {
  const regexQuery = makeRegexObject(query);
  return Fund.paginate(regexQuery, { page, limit, sort });
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
  modify,
  removeAll,
  removeById,
  getAll,
  getAllToExport,
  getByQuery,
  getCount
};
