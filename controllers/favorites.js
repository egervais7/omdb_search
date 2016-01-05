var express = require('express');
var db = require('./../models');
var router = express.Router();

router.get('/', function(req, res){
  db.favorite.findAll().then(function(favorites){
    res.render('favorites', {favorites: favorites});
  });
});

router.post('/', function(req, res){
  var newFav = {
      imdbId : req.body.imdbID,
      title: req.body.title,
      year: parseInt(req.body.year),
      poster: req.body.poster
   };
   db.favorite.create(newFav).then(function(){
     res.redirect('favorites');
 });
});

router.delete('/:id', function(req, res){
  db.favorite.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(){
    res.send('success');
  });
});

router.get('/:id/comments', function(req, res){
  var id = req.params.id;
  db.favorite.findById(id).then(function(favorite){
    favorite.getComments().then(function(comments){
      res.render('comments', {comments: comments, favorite:favorite});
    });
  });
});

router.post('/:id/comments', function(req, res){
  var id = req.params.id;
  db.favorite.findById(id).then(function(favorite){
    favorite.createComment({
      text: req.body.text,
      author: req.body.author
    }).then(function(comment){
      res.redirect('/favorites/' + id + '/comments');
    });
  });
});

router.delete('/:id/comments', function(req, res){
  db.comment.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(){
    res.send('success');
  });
});

router.get('/:id/tags', function(req, res){
  var favoriteId = req.params.id;
  db.favorite.findById(favoriteId).then(function(favorite){
    favorite.getTags().then(function(tags){
      res.render('tags', {tags:tags, favorite:favorite});
    });
  });
});

module.exports = router;
