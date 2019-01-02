import { Schema, Query, Model, DocumentQuery, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { pick } from '../utils/utils';
import { IUserDocument } from '../interfaces/user';

export interface IUser extends IUserDocument {
  generateAuthToken(): Promise<string>;

  removeToken(token: string): Query<any>;

  toJSON(): Pick<
    any,
    '_id' | 'userID' | 'role' | 'firstName' | 'lastName' | 'active'
  >;
}
export interface IUserModel extends Model<IUser> {
  findByToken(token: string): DocumentQuery<IUser | null, IUser, {}>;

  findByCredentials(userID: number, password: string): Promise<IUser>;
}

const UserSchema: Schema = new Schema({
  userID: {
    type: Number,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    trim: true,
    required: true,
    default: 'analyst',
    enum: ['analyst', 'admin', 'manager', 'super']
  },
  active: {
    type: Boolean,
    default: false
  },
  firstName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  tokens: [
    {
      access: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }
  ]
});

UserSchema.methods.generateAuthToken = function() {
  const user = <IUserDocument>this;

  const access = 'auth';

  const token = jwt
    .sign(
      {
        _id: user._id.toHexString(),
        access,
        exp: Math.floor(Date.now() / 1000) + 60 * 60
      },
      <string>process.env.JWT_SECRET
    )
    .toString();

  user.tokens = user.tokens.concat([{ access, token }]);
  return user.save().then(() => token);
};

UserSchema.methods.removeToken = function(token: string) {
  const user = <IUserDocument>this;

  return user.update({
    $pull: {
      tokens: { token }
    }
  });
};

UserSchema.statics.findByToken = function(token: string) {
  const User = this;

  let decoded;
  try {
    decoded = jwt.verify(token, <string>process.env.JWT_SECRET);
  } catch (e) {
    return Promise.reject(new Error('JWT verificaiton failed'));
  }

  return User.findOne({
    _id: (<any>decoded)._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

UserSchema.statics.findByCredentials = function(
  userID: number,
  password: string
): Promise<IUser> {
  const User = this;

  return User.findOne({ userID }).then((user: IUser | null) => {
    if (!user) {
      return Promise.reject(new Error('User not found'));
    }

    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (_err, res) => {
        if (res) {
          resolve(user);
        } else {
          reject(new Error('Wrong password'));
        }
      });
    });
  });
};

UserSchema.methods.toJSON = function() {
  const user = <IUserDocument>this;
  const userObject = user.toObject();

  return pick(userObject, [
    '_id',
    'userID',
    'role',
    'firstName',
    'lastName',
    'active'
  ]);
};

UserSchema.pre('save', function(next) {
  const user = <IUserDocument>this;

  if (user.isModified('password')) {
    bcrypt.genSalt(10, (_err, salt) => {
      bcrypt.hash(user.password, salt, (_err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

UserSchema.plugin(uniqueValidator);

export const User: IUserModel = model<IUser, IUserModel>('User', UserSchema);
