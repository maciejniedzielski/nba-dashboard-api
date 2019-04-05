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
			const filteredTeamConfigData = teamConfigData.data.teams.config.find(team => team.teamId == teamId)
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

dataEndpoints.get('/team/getConfigData/:teamTricode', (req,res) => {	
	const teamTricode = req.params.teamTricode;
	
	axios.get('http://data.nba.net/prod/2018/teams_config.json')
		.then(teamConfigData => {
			const filteredTeamConfigData = teamConfigData.data.teams.config.find(team => team.tricode == teamTricode)
			res.send(filteredTeamConfigData);
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


// TODO:  zmienić na samo /roster/:teamNickame
dataEndpoints.get('/teams/roster/:nickname', (req, res) => {
	const teamNickname = req.params.nickname;
	
	axios.get(`http://data.nba.net/json/cms/noseason/team/${ teamNickname }/roster.json`)
	// axios.get(`http://data.nba.net/prod/v1/2016/teams/${ teamId }/roster.json`)
		.then(({ data }) => {
			res.send(data.sports_content.roster)
		})
		.catch(error => {
			const customError = {
				status: false,
				data: {
					msg: 'Problem with fetching team roster'
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

dataEndpoints.get('/players/:playerId', (req, res) => {
	const playerId = req.params.playerId;

	axios.get(`https://www.nba.com/players/active_players.json`)
		.then(({ data }) => {
			const filteredPlayer = data.find(player => +player.personId == +playerId);
			res.send(filteredPlayer);
		})
		.catch(error => {
			const customError = {
				status: false,
				data: {
					msg: 'Problem with getting player data'
				}
			}
			res.send(customError);
		});
});

dataEndpoints.get('/players/playerProfile/:playerId', (req, res) => {
	const playerId = req.params.playerId;

	axios.get(`http://data.nba.net/prod/v1/2018/players/${playerId}_profile.json`)
		.then(({ data }) => {
			res.send(data.league.standard.stats);
		})
		.catch(error => {
			const customError = {
				status: false,
				data: {
					msg: 'Sorry! There are no stats available for this player.'
				}
			}
			res.send(customError);
		});
});


// TO DO STATSÓW PRZENIEŚĆ

// dataEndpoints.get('/players/:id', (req, res) => {
// 	const playerId = req.params.id;
// 	axios.get(`https://data.nba.net/prod/v1/2018/players/${ playerId }_profile.json`)
// 		.then(({ data }) => {
// 			res.send(data.league.standard);
// 		})
// 		.catch(error => {
// 			const customError = {
// 				status: false,
// 				data: {
// 					msg: 'Problem with fetching active players'
// 				}
// 			}
// 			res.send(customError);
// 		});
// });

// ^ .nugget player of the game w każdym obiekcie tego repsonsu, wiec łatwo znalezc jakiegos player of the day moze