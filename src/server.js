import express from 'express';
import { api } from './api/index';
import { dataEndpoints } from './api/data';
import { statsEndpoints } from './api/stats';

const app = express();
const port = process.env.PORT || 8000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
})

app.use('/', api);
api.use('/data', dataEndpoints);
api.use('/stats', statsEndpoints);

app.listen(port, () => console.log(`Server run on port ${ port }`));