import UsersActions from '../actions/users.actions';
import { IUserRequest } from '../interfaces/request';
import { Response, NextFunction } from 'express';

export const authenticate = (
  req: IUserRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header('x-auth');

  if (!token) {
    return res.status(401).send(new Error('No token sent'));
  }

  UsersActions.authenticate(token)
    .then(user => {
      if (!user) {
        return Promise.reject(new Error('User not found'));
      }

      req.user = user;
      req.token = token;
      next();
    })
    .catch((err: Error) => {
      return res.status(401).send(err);
    });
};

export const checkRole = (roles: string[]) => {
  return (req: IUserRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    if (user && roles.includes(user.role)) {
      return next();
    }
    return res.status(401).send();
  };
};
