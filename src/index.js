import app from './app';
import { env } from './config/config';

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server running on port ${port} in ${env} mode...`);
  console.log('Press CTRL-C to stop\n');
});
