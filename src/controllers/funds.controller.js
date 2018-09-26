const funds = [
  {
    id: '1',
    name: 'Fund One'
  },
  {
    id: '2',
    name: 'Fund Two'
  }
];

export default {
  get: (_req, res) => {
    res.send({ funds });
  },
  getByID: (req, res) => {
    const id = req.params.id;

    const result = funds.find(fund => fund.id === id);

    res.send({ result });
  },
  post: (req, res) => {}
};
