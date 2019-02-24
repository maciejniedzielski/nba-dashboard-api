import { version } from '../../package.json';
import { Router } from 'express';

export const api = Router();

api.get('/', (req, res) => {
	res.send(`Current API version: ${ version }`);
});
