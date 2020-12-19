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

module.exports = router; 