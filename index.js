var express = require('express');
var app = express();

var ejsLayouts = require('express-ejs-layouts');
var request = require('request');
var bodyParser = require('body-parser');
var db = require('./models');
var bcrypt = require('bcrypt');
var session = require('express-session');

var searchPage = require('./controllers/search');
var favoritesPage = require('./controllers/favorites');
var tagsPage = require('./controllers/tags');

app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({extended: false}));

// setting up session
app.use(session({
  secret: 'omdb search',
  resave: false,
  saveUninitialized: true
}));

//custom middleware back to last page
app.use(function(req, res, next){
  req.session.lastPage = req.header('Referer');
  res.locals.lastPage = req.session.lastPage;
  next();
});

// custom log
app.use(function(req, res, next){
  req.log = function(msg) {
    console.log(new Date(), req.originalUrl, msg);
  };
  next();
});

//render home page
app.get('/', function(req, res){
  res.render('index');
});

//set up controllers
app.use('/movies', searchPage);
app.use('/favorites', favoritesPage);
app.use('/tags', tagsPage);

app.listen(process.env.PORT || 3000);
