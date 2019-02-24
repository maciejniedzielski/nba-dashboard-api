import { Router } from 'express';
import axios from 'axios';

export const dataEndpoints = Router();

dataEndpoints.get('/standings', (req, res) => {
	axios.get('http://data.nba.net/prod/v1/current/standings_conference.json')
	.then(response => {
		res.send(response.data);
	})
	.catch(error => {
		const customError = {
			status: false,
			data: {
				msg: 'Problem with fetching current standings'
			}
		}
		res.send(customError);
	});
});

dataEndpoints.get('/teams', (req, res) => {
	axios.get('http://data.nba.net/prod/v1/2018/teams.json')
		.then(response => {
			res.send(response);
		})
		.catch(error => {
			const customError = {
				status: false,
				data: {
					msg: 'Problem with fetching teams'
				}
			}
			res.send(customError);
		});
});

dataEndpoints.get('/teams/:id', (req,res) => {
	axios.get('http://data.nba.net/prod/v1/2016/teams/1610612745/roster.json')
		.then(response => {
			res.send(response);
		})
		.catch(error => {
			const customError = {
				status: false,
				data: {
					msg: 'Team does not exist'
				}
			}
			res.send(customError);
		});
});


