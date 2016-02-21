var querystring = require('querystring');

var Mentor = require('../models/mentor');
var Mentee = require('../models/mentee');

module.exports = function (app) {

  app.get('/login', function(req, res){
    res.render('login');
  });

  app.post('/login', function(req, res){
    Mentor.findMentor(req.body)
    .then(function(mentor){
      res.redirect('/dashboard');
      res.end();
    })
    .catch(function(err){
      res.redirect('/login');
      res.end();
    });
  });

};