import mongoose, { MongooseDocument } from 'mongoose';
import chalk from 'chalk';

mongoose.Promise = global.Promise;

export const connect = () => {
  const dbURL = process.env.MONGODB_URI;
  mongoose.connect(dbURL);
  const db = mongoose.connection;

  db.on('error', err => {
    if (
      err.message &&
      err.message.match(/failed to connect to server .* on first connect/)
    ) {
      console.log(chalk.red(new Date()), err.toString());
      setTimeout(function() {
        console.log('Retrying first connect...');
        db.openUri(dbURL).catch(() => {});
      }, 5 * 1000);
    } else {
      console.error(chalk.red(new Date()), err.toString());
    }
  });

  db.once('open', function() {
    console.log(chalk.green('Connection to db established.'));
  });

  return db;
};
