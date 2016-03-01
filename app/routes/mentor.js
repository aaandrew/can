var Mentor = require('../models/mentor');

var helpers = require('./helpers');

// Function used to merge json objects
var extend = require('util')._extend;

module.exports = function (app, passport) {

  // Loads page for creating a new mentor account
  app.get('/signup/mentor', function(req, res){
    res.render('create_mentor_login', {message: req.flash('signup-message')});
  });

  // Creates new mentor account
  app.post('/signup/mentor',
    passport.authenticate('local-signup', {
      successRedirect: '/edit/mentor',
      failureRedirect: '/signup/mentor',
      failureFlash: true
    }));

  // Loads page for editing mentor account
  // Redirects to login page if user is not logged in
  app.get('/edit/mentor', isMentor, function(req, res){
    var userData = helpers.setMentorOrMentee(req);
    Mentor.findMentor({_id: req.user.mentor})
    .then(function(mentor){
      res.render('edit_mentor', extend(userData, mentor.toJSON()));
    });
  });

  app.post('/edit/mentor', isMentor, function(req, res){
    Mentor.findMentor({_id: req.user.mentor})
    .then(function(mentor){
      // Update fields
      mentor.name = req.body.name;
      mentor.college = req.body.college;
      mentor.major = req.body.major;
      mentor.year = req.body.year;
      mentor.background = req.body.background;
      mentor.help = req.body.help;
      mentor.interests = req.body.interests;
      mentor.save();
      res.redirect('/dashboard');
      res.end();
    });
  });

  // Middleware to check if user is logged in
  function isMentor(req, res, next) {
    if (req.user && req.user.mentor) {
      next();
    } else {
      res.redirect('/login');
    }
  }

};