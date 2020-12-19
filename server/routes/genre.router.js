const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')


router.get('/', (req, res) => {
  const queryText = 'SELECT * FROM genres';
  console.log ('in Genres get')
  pool.query(queryText)
    .then((result) => { res.send(result.rows); })
    .catch((err) => {
      console.log('Error completing SELECT movie query', err);
      res.sendStatus(500);
    });
}); 

router.get('/detail/:id', (req, res) => {
  let reqId = req.params.id;
  const queryText = 'SELECT movies.id, genres.name FROM genres JOIN movies_genres ON genres.id = movies_genres.genre_id JOIN movies ON movies.id = movies_genres.movie_id WHERE movies.id=$1;'
  console.log ('in Genres Detail GET:', reqId)
  pool.query(queryText, [reqId])
    .then((result) => { res.send(result.rows); })
    .catch((err) => {
      console.log('Error completing SELECT movie query', err);
      res.sendStatus(500);
    });
}); 


module.exports = router; 