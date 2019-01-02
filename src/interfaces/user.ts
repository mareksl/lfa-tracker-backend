import { Document } from 'mongoose';

export enum UserRole {
  Analyst = 'analyst',
  Admin = 'admin',
  Manager = 'manager',
  Super = 'super'
}

export interface IUserData {
  userID?: number;
  password: string;
  firstName: string;
  lastName: string;
  role?: UserRole;
  active?: boolean;
  tokens?: { access: string; token: string }[];
}

export interface IUserDocument extends IUserData, Document {
  userID: number;
  tokens: { access: string; token: string }[];
  role: UserRole;
  active: boolean;
}
