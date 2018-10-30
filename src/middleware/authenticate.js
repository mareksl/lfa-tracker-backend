import User from '../models/User.model';

export const authenticate = (req, res, next) => {
  const token = req.header('x-auth');

  User.findByToken(token)
    .then(user => {
      if (!user) {
        return Promise.reject(new Error('User not found'));
      }

      req.user = user;
      req.token = token;
      next();
    })
    .catch(err => res.status(401).send(err));
};
