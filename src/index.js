import chalk from 'chalk';
import app from './app';
import { env } from './config/config';

const port = process.env.PORT;

app.listen(port, () => {
  console.log(chalk.green(`Server running on port ${port} in ${env} mode...`));
  console.log('Press CTRL-C to stop\n');
});
