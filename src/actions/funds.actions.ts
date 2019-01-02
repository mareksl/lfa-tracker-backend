import { Fund, IFund } from '../models/Fund.model';
import { makeSearchQuery, hasKey } from '../utils/utils';
import { IFundData } from '../interfaces/fund';

const getAll = () => {
  return Fund.find({})
    .sort('fundName')
    .exec();
};

const getByQuery = (
  page: number,
  limit: number,
  query: Pick<
    any,
    | 'fundName'
    | 'lipperID'
    | 'fundOwner'
    | 'department'
    | 'awardUniverse'
    | 'highestRank'
  >,
  sort: { [sort: string]: number } | string
) => {
  const q = makeSearchQuery(query);
  return Fund.paginate(q, { page, limit, sort });
};

const getCount = () => {
  return Fund.estimatedDocumentCount();
};

const getAllToExport = () => {
  return Fund.find({})
    .lean()
    .exec()
    .then((funds: IFund[]) =>
      funds.map(fund => {
        delete fund._id;
        for (let key in fund) {
          if (hasKey(fund, key)) {
            if (fund[key] instanceof Array) {
              fund[key] = fund[key].join(',');
            }
          }
        }
        return fund;
      })
    );
};

const add = (data: IFundData) => {
  const fund = new Fund(data);
  return fund.save();
};

const findById = (id: number) => {
  return Fund.findOne({ lipperID: id });
};

const modify = (id: number, data: IFundData) => {
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

const removeById = (id: number) => {
  return Fund.findOneAndDelete({ lipperID: id });
};

const addMany = (funds: IFundData[]) => {
  return removeAll().then(_response => {
    return Fund.insertMany(funds);
  });
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
