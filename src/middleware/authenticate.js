import UsersActions from '../actions/users.actions';

export const authenticate = (req, res, next) => {
  const token = req.header('x-auth');

  UsersActions.authenticate(token)
    .then(user => {
      if (!user) {
        return Promise.reject(new Error('User not found'));
      }

      req.user = user;
      req.token = token;
      next();
    })
    .catch(err => {
      return res.status(401).send(err);
    });
};

export const checkRole = roles => {
  return (req, res, next) => {
    const user = req.user;
    if (roles.includes(user.role)) {
      return next();
    }
    return res.status(401).send();
  };
};
