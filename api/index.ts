import express from 'express';
import postUsers from './endpoints/post-users';
import getHealth from './endpoints/get-health';

const app = express();

app.use(express.json());

app.post('/users', postUsers);
app.get('/', getHealth);

export default app;
