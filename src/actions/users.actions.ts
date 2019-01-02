import { User, IUser } from '../models/User.model';
import { IUserData } from '../interfaces/user';

const authenticate = (token: string) => {
  return User.findByToken(token);
};

const findByUserID = (id: number) => {
  return User.findOne({ userID: id });
};

const create = (data: IUserData) => {
  const user = new User(data);

  return user
    .save()
    .then(() => user.generateAuthToken())
    .then(token => ({ user, token }));
};

const login = (data: { userID: number; password: string }) => {
  return User.findByCredentials(data.userID, data.password).then(user => {
    if (!user.active) {
      throw new Error('User inactive');
    }
    return user.generateAuthToken().then(token => ({ user, token }));
  });
};

const logout = (user: IUser, token: string) => {
  return user.removeToken(token);
};

const patch = (id: string, data: IUserData) => {
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

const removeById = (id: string) => {
  return User.findByIdAndDelete(id).exec();
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
