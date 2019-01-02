import { Request } from 'express';
import { IUser } from '../models/User.model';

export interface IUserRequest extends Request {
  user?: IUser;
  token?: string;
}
