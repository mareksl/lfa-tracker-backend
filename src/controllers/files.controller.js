import xlsx from 'xlsx';
import { funds } from '../data/data';

export default {
  get: (req, res) => {
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(funds);
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');

    const file = xlsx.write(wb, { type: 'buffer' });
    
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.end(file);
  },
  post: (req, res) => {
    const file = req.file;

    if (!file) {
      return res.status(400).send();
    }

    const wb = xlsx.read(file.buffer, { type: 'buffer' });
    const ws = wb.Sheets[wb.SheetNames[0]];

    const data = xlsx.utils.sheet_to_json(ws);

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
