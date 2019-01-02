import { pick } from '../utils/utils';
import UsersActions from '../actions/users.actions';
import { Request, Response } from 'express';
import { IUserRequest } from '../interfaces/request';
import { IUser, IUserModel } from '../models/User.model';

const createUser = (req: Request, res: Response) => {
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

const getUser = (req: IUserRequest, res: Response) => {
  return res.header('x-auth', req.token).send({ user: req.user });
};

const login = (req: Request, res: Response) => {
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

const logout = (req: IUserRequest, res: Response) => {
  if (!req.user || !req.token) {
    return res.status(400).send();
  }

  UsersActions.logout(req.user, req.token)
    .then(() => res.status(200).send())
    .catch(err => res.status(400).send(err));
};

const getByUserID = (req: Request, res: Response) => {
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

const patchByUserID = (req: IUserRequest, res: Response) => {
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
    .then(user => {
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    })
    .then(user => UsersActions.patch(user._id, body))
    .then(user => {
      if (!user) {
        return res.status(500).send();
      }
      return res.send({ user });
    })
    .catch(err => res.status(400).send(err));
};

const patchMe = (req: IUserRequest, res: Response) => {
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

const getAll = (_req: Request, res: Response) => {
  UsersActions.getAll()
    .then(users => res.send({ users }))
    .catch(err => res.status(500).send(err));
};

const removeById = (req: Request, res: Response) => {
  const id = +req.params.id;

  UsersActions.findByUserID(id)
    .then(user => {
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    })
    .then(user => UsersActions.removeById(user._id))
    .then(user => {
      if (!user) {
        return res.status(500).send();
      }
      return res.send({ user });
    })
    .catch((err: Error) => res.status(400).send(err));
};

export default {
  createUser,
  getUser,
  login,
  logout,
  patchMe,
  getByUserID,
  patchByUserID,
  getAll,
  removeById
};
