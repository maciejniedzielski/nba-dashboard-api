import { version } from '../../package.json';
import { Router } from 'express';

import nba from 'nba.js';

export const api = Router();

api.get('/', (req, res) => {
	res.send(`Current API version: ${ version }`);
});

api.get('/standings', (req, res) => {
	nba.data.conferenceStandings({
		date: 20180223
	}).then(result => {
		res.send(result)
	});
});

api.get('/players', (req, res) => {
	nba.stats.allPlayers().then(result => {
		res.send(result)
	});
});

api.get('/player', (req, res) => {
	nba.stats.playerInfo({
		playerId: 201939
	}).then(result => {
		res.send(result)
	});
});
