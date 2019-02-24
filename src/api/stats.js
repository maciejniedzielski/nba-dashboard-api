import { Router } from 'express';
import axios from 'axios';

export const statsEndpoints = Router();

statsEndpoints.get('/players', (req, res) => {
  axios.get('http://stats.nba.com/stats/commonallplayers?IsOnlyCurrentSeason=1&LeagueID=00&Season=2016-17')
    .then(function (response) {
      console.log(response.data);
      res.send(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
});

statsEndpoints.get('/player', (req, res) => {  
  axios.get('http://stats.nba.com/stats/commonplayerinfo/?playerId=201935&leagueId=00')
    .then(function (response) {
      console.log(response.data);
      res.send(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
});

statsEndpoints.get('/dupa', (req, res) => {
  res.jsonp({'dupa': 1})
})
