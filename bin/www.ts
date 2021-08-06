import config from 'config';
import app from '../api';

const port = config.get('app.port');

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
