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
  return User.findById(id).then(user => {
    if (!user) {
      throw new Error('User not found');
    }
    user.set(data);
    return user.save();
  });
};

const getAll = () => {
  return User.find({});
};

const removeById = id => {
  return User.findByIdAndDelete(id);
};

export default {
  authenticate,
  findByUserID,
  create,
  login,
  logout,
  patch,
  getAll,
  removeById
};
