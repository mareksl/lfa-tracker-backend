import { pick } from '../utils/utils';
import { User } from '../models/User.model';

const createUser = (req, res) => {
  const body = pick(req.body, ['userID', 'password']);
  const user = new User(body);

  user
    .save()
    .then(() => user.generateAuthToken())
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

  User.findByCredentials(body.username, body.password)
    .then(user => {
      return user.generateAuthToken();
    })
    .then(token => {
      res.header('x-auth', token).send(user);
    });
};

const logout = (req, res) => {
  if (!req.user || !req.token) {
    return res.status(400).send();
  }

  req.user
    .removeToken(req.token)
    .then(() => res.status(200).send())
    .catch(err => res.status(400).send(err));
};

const patch = (req, res) => {
  const body = pick(req.body, ['password']);
  if (!req.user) {
    return res.status(400).send();
  }

  const id = req.user._id;

  User.findByIdAndUpdate(
    id,
    {
      $set: body
    },
    {
      new: true,
      runValidators: true
    }
  )
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
  logout
};
