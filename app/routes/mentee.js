var Mentee = require('../models/mentee');

var helpers = require('./helpers');

var extend = require('util')._extend;

module.exports = function (app, passport) {
  app.get('/signup/mentee', function(req, res){
    res.render('create_mentee_login', {message: req.flash('signup-message')});
  });

  // Creates new mentee account
  app.post('/signup/mentee',
    passport.authenticate('local-signup', {
      successRedirect: '/edit/mentee',
      failureRedirect: '/signup/mentee',
      failureFlash: true
    }));

  // Loads page for editing mentee account
  // Redirects to login page if user is not logged in
  app.get('/edit/mentee', isMentee, function(req, res){
    var userData = helpers.setMentorOrMentee(req);
    Mentee.findMentee({_id: req.user.mentee})
    .then(function(mentee){
      res.render('edit_mentee', extend(userData, mentee.toJSON()));
    });
  });

  app.post('/edit/mentee', isMentee, function(req, res){
    Mentee.findMentee({_id: req.user.mentee})
    .then(function(mentee){
       // Update fields
      mentee.name = req.body.name;
      mentee.location = req.body.location;
      mentee.interests = req.body.interests;
      mentee.save();
      res.redirect('/dashboard');
      res.end();
    });
  });

  // Middleware to check if user is logged in
  function isMentee(req, res, next) {
    if (req.user && req.user.mentee) {
      next();
    } else {
      res.redirect('/login');
    }
  }

};