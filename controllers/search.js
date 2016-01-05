var express = require('express');
var request = require('request');
var router = express.Router();

router.get('/', function(req, res){
  var query = req.query.q;
  request('http://www.omdbapi.com/?s=' + query, function (error, response, body) {
    var data = JSON.parse(body);
    if (!error && response.statusCode == 200 && data.Search) {
      res.render('movies', {movies: data.Search,
                            q: query});}
  });
});

router.get('/:imdbID', function(req, res) {
  var searchQuery = req.query.q ? req.query.q : '';
  var imdbID = req.params.imdbID;
  request('http://www.omdbapi.com/?i=' + imdbID + '&plot=full', function(err, response, body) {
    res.render('show', {movie: JSON.parse(body),
                             q: searchQuery});
  });
});

module.exports = router;
