import FundsActions from '../actions/funds.actions';

const getRange = (req, res) => {
  const page = +req.query.page;
  const limit = +req.query.limit;

  FundsActions.getCount().then(count => {
    if (page && limit) {
      return FundsActions.getRange(page, limit)
        .then(result => {
          const toSend = {
            funds: result.docs,
            page: result.page,
            limit: result.limit,
            pages: result.pages,
            count
          };
          res.send(toSend);
        })
        .catch(err => res.status(500).send(err));
    } else {
      return FundsActions.getAll()
        .then(funds => res.send({ funds, count }))
        .catch(err => res.status(500).send(err));
    }
  });
};

const getByID = (req, res) => {
  const id = +req.params.id;
  FundsActions.findById(id)
    .then(fund => {
      if (!fund) {
        return res.status(404).send();
      }
      return res.send({ fund });
    })
    .catch(err => res.status(500).send(err));
};

const post = (req, res) => {
  const data = req.body;

  if (Object.keys(data).length === 0) {
    return res.status(400).send();
  }

  FundsActions.add(data)
    .then(fund => res.status(201).send({ fund }))
    .catch(err => res.status(400).send(err));
};

const patch = (req, res) => {
  const id = +req.params.id;
  const data = req.body;

  FundsActions.modify(id, data)
    .then(fund => {
      if (!fund) {
        return res.status(404).send();
      }

      return res.send({ fund });
    })
    .catch(err => res.status(500).send(err));
};

const deleteAll = (req, res) => {
  FundsActions.removeAll()
    .then(response => res.send(response))
    .catch(err => res.status(500).send(err));
};

const deleteById = (req, res) => {
  const id = +req.params.id;
  FundsActions.removeById(id)
    .then(fund => {
      if (!fund) {
        return res.status(404).send();
      }
      return res.send({ fund });
    })
    .catch(err => res.status(500).send(err));
};

export default {
  getByID,
  getRange,
  post,
  patch,
  deleteAll,
  deleteById
};
