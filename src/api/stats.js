import { Router } from 'express';
import axios from 'axios';

export const statsEndpoints = Router();

statsEndpoints.get('/players', (req, res) => {
  axios.get('http://stats.nba.com/stats/commonallplayers?IsOnlyCurrentSeason=1&LeagueID=00&Season=2016-17')
    .then(({ data }) => {
      res.send(data)
    })
    .catch(function (error) {
      const customError = {
				status: false,
				data: {
					msg: 'Problem with fetching players stats'
				}
			}
			res.send(customError);
    });
});

statsEndpoints.get('/player', (req, res) => {  
  axios.get('http://stats.nba.com/stats/commonplayerinfo/?playerId=201935&leagueId=00')
    .then(({ data }) => {
      res.send(data)
    })
    .catch(function (error) {
      const customError = {
				status: false,
				data: {
					msg: 'Problem with fetching player stats'
				}
			}
			res.send(customError);
    });
});

statsEndpoints.get('/team/:id/', (req, res) => {
	const teamId = req.params.id;
	
	axios.get(`https://data.nba.net/prod/v1/current/standings_all.json`)
		.then(({ data }) => {
      const teamData = data.league.standard.teams.find(team => team.teamId === teamId)
			res.send(teamData)
		})
		.catch(error => {
			const customError = {
				status: false,
				data: {
					msg: 'Problem with fetching team stats'
				}
			}
			res.send(customError);
		});
});

statsEndpoints.get('/team/avg/:id/', (req, res) => {
	const teamId = req.params.id;
	
	axios.get(`https://data.nba.net/prod/v1/2018/team_stats_rankings.json`)
		.then(({ data }) => {
      const teamData = data.league.standard.regularSeason.teams.find(team => team.teamId === teamId)
			res.send(teamData)
		})
		.catch(error => {
			const customError = {
				status: false,
				data: {
					msg: 'Problem with fetching team stats'
				}
			}
			res.send(customError);
		});
});