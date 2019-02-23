import express from 'express';
import { api } from './api/index';

const app = express();
const port = process.env.PORT || 8000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
})

app.use('/api', api);

app.listen(port, () => console.log(`Server run on port ${ port }`));