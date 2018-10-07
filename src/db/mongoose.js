import mongoose, { MongooseDocument } from 'mongoose';
import chalk from 'chalk';

mongoose.Promise = global.Promise;

export const connect = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log(chalk.green('Connected to database!')))
    .catch(err => console.log('Connection to database failed!', err));

  return mongoose.connection;
};
