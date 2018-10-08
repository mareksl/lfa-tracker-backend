import { Fund } from '../models/Fund.model';

const getAll = () => {
  return Fund.find({});
};
const getAllJSON = () => {
  return Fund.find({})
    .lean()
    .exec()
    .then(funds => funds.toJSON());
};

const add = data => {
  const fund = new Fund(data);
  return fund.save();
};

const findById = id => {
  return Fund.findOne({ lipperId: id });
};

const modify = (id, data) => {
  return Fund.findOneAndUpdate(
    { lipperId: id },
    {
      $set: data
    },
    { runValidators: true, new: true }
  );
};

const removeById = id => {
  return Fund.findOneAndDelete({ lipperId: id });
};

const addMany = funds => {
  return Fund.upsertMany(funds, ['lipperId']);
};

export default {
  add,
  addMany,
  findById,
  modify,
  removeById,
  getAll,
  getAllJSON
};
