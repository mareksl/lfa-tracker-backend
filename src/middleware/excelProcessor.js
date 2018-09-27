import xlsx from 'xlsx';
import { funds } from '../data/data';


export default {
  exportFile: (req, res, next) => {
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(funds);
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');

    const file = xlsx.write(wb, { type: 'buffer' });
    res.locals.file = file;

    next();
  },
  importFile: (req, res, next) => {
    const file = req.file;

    if (!file) {
      return res.status(400).send();
    }

    const wb = xlsx.read(file.buffer, { type: 'buffer' });
    const ws = wb.Sheets[wb.SheetNames[0]];

    const data = xlsx.utils.sheet_to_json(ws);

    res.locals.data = data;

    next();
  }
};
