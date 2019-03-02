import { Router } from 'express';
import axios from 'axios';
import dayjs from 'dayjs'

export const dataEndpoints = Router();

dataEndpoints.get('/standings', (req, res) => {
	axios.get('http://data.nba.net/prod/v1/current/standings_conference.json')
	.then(({ data }) => {
		res.send(data['league'].standard.conference);
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
		.then(({ data }) => {
			res.send(data.league.standard.filter(team => team.isNBAFranchise));
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
	const teamId = req.params.id;
		axios.all([
			axios.get(`http://data.nba.net/prod/v1/2018/teams.json`),
			axios.get('http://data.nba.net/prod/2018/teams_config.json')
		]).then(([teamData, teamConfigData]) => {
			const filteredTeamData = teamData.data.league.standard.find(team => team.teamId == teamId);
			const filteredTeamConfigData = 	teamConfigData.data.teams.config.find(team => team.teamId == teamId)
			const resultData = Object.assign(filteredTeamData, filteredTeamConfigData);
			res.send(resultData);
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

dataEndpoints.get('/scoreboard', (req, res) => {
	axios.get(`http://data.nba.net/prod/v2/${ dayjs().format('YYYYMMDD') }/scoreboard.json`)
		.then(({ data }) => {
			res.send(data.games);
		})
		.catch(error => {
			const customError = {
				status: false,
				data: {
					msg: 'Problem with fetching scoreboard'
				}
			}
			res.send(customError);
		});
});

dataEndpoints.get('/players', (req, res) => {
	axios.get(`https://www.nba.com/players/active_players.json`)
		.then(({ data }) => {
			res.send(data);
		})
		.catch(error => {
			const customError = {
				status: false,
				data: {
					msg: 'Problem with fetching active players'
				}
			}
			res.send(customError);
		});
});

// ^ .nugget player of the game w każdym obiekcie tego repsonsu, wiec łatwo znalezc jakiegos player of the day moze