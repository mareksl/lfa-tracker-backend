import xlsx from 'xlsx';
import FundsActions from '../actions/funds.actions';

const exportFile = (req, res, next) => {
  const funds = FundsActions.getAll();
  const wb = xlsx.utils.book_new();
  const ws = xlsx.utils.json_to_sheet(funds);
  xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');

  const file = xlsx.write(wb, { type: 'buffer' });
  res.locals.file = file;

  next();
};

const importFile = (req, res, next) => {
  const file = req.file;

  if (!file) {
    return res.status(400).send();
  }

  const wb = xlsx.read(file.buffer, { type: 'buffer' });
  const ws = wb.Sheets[wb.SheetNames[0]];
  const data = xlsx.utils.sheet_to_json(ws);

  res.locals.data = data;

  next();
};

export default {
  exportFile,
  importFile
};
