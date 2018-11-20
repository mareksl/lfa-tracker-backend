import { User } from '../models/User.model';

const authenticate = token => {
  return User.findByToken(token);
};

const findByUserID = id => {
  return User.findOne({ userID: id });
};

const create = data => {
  const user = new User(data);

  return user
    .save()
    .then(() => user.generateAuthToken())
    .then(token => ({ user, token }));
};

const login = data => {
  return User.findByCredentials(data.userID, data.password).then(user => {
    if (!user.active) {
      throw new Error('User inactive');
    }
    return user.generateAuthToken().then(token => ({ user, token }));
  });
};

const logout = (user, token) => {
  return user.removeToken(token);
};

const patch = (id, data) => {
  return User.findByIdAndUpdate(
    id,
    {
      $set: data
    },
    {
      new: true,
      runValidators: true
    }
  );
};

const getAll = () => {
  return User.find({});
};

export default {
  authenticate,
  findByUserID,
  create,
  login,
  logout,
  patch,
  getAll
};
