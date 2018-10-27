import FundsActions from '../actions/funds.actions';

const getRange = (req, res) => {
  const page = +req.query.page;
  const limit = +req.query.limit;
  const query = req.query.q || '';

  if ((page && limit) || query) {
    return FundsActions.getRange(page, limit, query)
      .then(result => {
        const toSend = {
          funds: result.docs,
          page: result.page,
          limit: result.limit,
          pages: result.pages,
          count: result.total
        };
        res.send(toSend);
      })
      .catch(err => res.status(500).send(err));
  } else {
    return FundsActions.getCount().then(count => {
      return FundsActions.getAll()
        .then(funds => res.send({ funds, count }))
        .catch(err => res.status(500).send(err));
    });
  }
};

const getByID = (req, res) => {
  const id = +req.params.id;
  if (!id) {
    return res.status(404).send();
  }
  FundsActions.findById(id)
    .then(fund => {
      if (!fund) {
        return res.status(404).send();
      }
      return res.send({ fund });
    })
    .catch(err => res.status(500).send(err));
};

const getByQuery = (req, res) => {
  const query = '1';
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
  if (!id) {
    return res.status(404).send();
  }
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
  if (!id) {
    return res.status(404).send();
  }
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
