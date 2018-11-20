import { pick } from '../utils/utils';
import UsersActions from '../actions/users.actions';

const createUser = (req, res) => {
  const body = pick(req.body, ['userID', 'password', 'firstName', 'lastName']);

  UsersActions.create(body)
    .then(data => {
      res
        .status(201)
        .header('x-auth', data.token)
        .send(data.user);
    })
    .catch(err => res.status(400).send(err));
};

const getUser = (req, res) => {
  return res.header('x-auth', req.token).send(req.user);
};

const login = (req, res) => {
  const body = pick(req.body, ['userID', 'password']);

  UsersActions.login(body)
    .then(data => {
      return res.header('x-auth', data.token).send(data.user);
    })
    .catch(err => {
      if (err.message === 'User not found' || 'User inactive') {
        return res.status(401).send(err.message);
      }
      if (err.message === 'Wrong password') {
        return res.status(401).send(err.message);
      }
      return res.status(400).send(err);
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

const getByUserID = (req, res) => {
  const id = +req.params.id;

  UsersActions.findByUserID(id)
    .then(user => {
      if (!user) {
        return res.status(404).send();
      }
      return res.send({ user });
    })
    .catch(err => res.status(400).send(err));
};

const patchByUserID = (req, res) => {
  const body = pick(req.body, [
    'password',
    'firstName',
    'lastName',
    'active',
    'role'
  ]);
  if (!req.user) {
    return res.status(400).send();
  }

  const id = +req.params.id;

  UsersActions.findByUserID(id)
    .then(user => UsersActions.patch(user._id, body))
    .then(user => {
      if (!user) {
        return res.status(400).send();
      }
      return res.send({ user });
    })
    .catch(err => res.status(400).send(err));
};

const patchMe = (req, res) => {
  const body = pick(req.body, ['password', 'firstName', 'lastName']);
  if (!req.user) {
    return res.status(400).send();
  }

  const id = req.user._id;

  UsersActions.patch(id, body)
    .then(user => {
      if (!user) {
        return res.status(400).send();
      }
      return res.send({ user });
    })
    .catch(err => res.status(400).send(err));
};

const getAll = (req, res) => {
  UsersActions.getAll()
    .then(users => res.send({ users }))
    .catch(err => res.status(500).send(err));
};

export default {
  createUser,
  getUser,
  login,
  logout,
  patchMe,
  getByUserID,
  patchByUserID,
  getAll
};
