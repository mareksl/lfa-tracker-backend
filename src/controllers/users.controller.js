import { pick } from '../utils/utils';
import UsersActions from '../actions/users.actions';

const createUser = (req, res) => {
  const body = pick(req.body, ['userID', 'password']);

  UsersActions.create(body)
    .then(token => {
      res.header('x-auth', token).send(user);
    })
    .catch(err => res.status(400).send(err));
};

const getUser = (req, res) => {
  return res.send(req.user);
};

const login = (req, res) => {
  const body = pick(req.body, ['userID', 'password']);

  UsersActions.login(body).then(token => {
    res.header('x-auth', token).send(user);
  });
};

const logout = (req, res) => {
  if (!req.user || !req.token) {
    return res.status(400).send();
  }

  UsersActions.logout(req.user, req.token)
    .then(() => res.status(200).send())
    .catch(err => res.status(400).send(err));
};

const patch = (req, res) => {
  const body = pick(req.body, ['password']);
  if (!req.user) {
    return res.status(400).send();
  }

  const id = req.user._id;

  UsersActions.patch(id, body)
    .then(user => {
      if (!user) {
        return res.status(400).send();
      }
      return res.send(user);
    })
    .catch(err => res.status(400).send(err));
};

export default {
  createUser,
  getUser,
  login,
  logout,
  patch
};
