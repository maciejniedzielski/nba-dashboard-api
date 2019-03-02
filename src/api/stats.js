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