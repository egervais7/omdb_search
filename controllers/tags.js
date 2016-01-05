var express = require('express');
var db = require('./../models');
var router = express.Router();

router.get('/favorites/:id/tags', function(req, res){
  db.tag.findAll({
    include: [db.favorite]
  }).then(function(tag){
    res.render('tags', {tag: tag, favorites: favorites});
  });
});

router.post('/', function(req, res){
  var favoriteId = req.params.id;
  db.tag.findOrCreate({
    where: {
      tag: req.body.tag
    }
  }).spread(function(tag, created){
    db.favorite.findById(favoriteId).then(function(favorite){
      favorite.addTag(tag).then(function(){
        res.redirect('tags', {tags: tags});
      });
    });
  });
});

module.exports = router;
