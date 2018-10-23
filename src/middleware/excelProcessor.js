import xlsx from 'xlsx';
import FundsActions from '../actions/funds.actions';
import StatisticsActions from '../actions/statistics.actions';
import { toCamelCase } from '../utils/utils';

const exportFile = (req, res, next) => {
  const wb = xlsx.utils.book_new();
  FundsActions.getAllToExport()
    .then(funds => {
      const ws = xlsx.utils.json_to_sheet(funds);
      xlsx.utils.book_append_sheet(wb, ws, 'Funds');
    })
    .then(() => {
      StatisticsActions.getStatistics().then(stats => {
        const ws = xlsx.utils.json_to_sheet([stats]);
        xlsx.utils.book_append_sheet(wb, ws, 'Statistics');
        const file = xlsx.write(wb, { type: 'buffer', compression: true });

        res.locals.file = file;

        next();
      });
    });
};

const importFile = (req, res, next) => {
  const file = req.file;

  if (!file) {
    return res.status(400).send();
  }

  const wb = xlsx.read(file.buffer, { type: 'buffer', cellDates: true });
  const ws = wb.Sheets[wb.SheetNames[0]];
  const rawData = xlsx.utils.sheet_to_json(ws);

  const data = rawData.map(item => {
    return Object.keys(item).reduce((result, key) => {
      const camelCaseKey = toCamelCase(key);
      result[camelCaseKey] = item[key];
      return result;
    }, {});
  });
  res.locals.data = data;

  next();
};

export default {
  exportFile,
  importFile
};
