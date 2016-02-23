var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');
var Mentor = require('../models/mentor');
var Mentee = require('../models/mentee');

module.exports = function(passport) {

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  // Local Login
  passport.use('local-login', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  },
  function(req, email, password, done) {
    if (email){
      email = email.toLowerCase();
    }
    process.nextTick(function() {
      User.findOne({ 'email' :  email }, function(err, user) {
        console.log("USER", user);
        if (err) 
          return done(err);
        if (!user)
          return done(null, false, req.flash('login-message', 'No user found.'));
        if (!user.validPassword(password))
          return done(null, false, req.flash('login-message', 'Oops! Wrong password.'));
        else
          return done(null, user);
      });
    });

  }));

  // Local Sign up
  passport.use('local-signup', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  },
  function(req, email, password, done) {
    process.nextTick(function() {

      User.findOne({ 'email' :  email }, function(err, user) {
        if (err) return done(err);

        if (user) {
          return done(null, false, req.flash('signup-message', 'That email is already taken.'));
        }else{
          // if there is no user with that email create the user
          var newUser = new User();
          newUser.email = email;
          newUser.password = newUser.generateHash(password);
          newUser.name = req.body.name;

          var userData = {
            email: newUser.email,
            password: newUser.password,
            name: newUser.name
          };

          // Create a new mentor object or mentee object
          if(req.body.isMentor === "true"){
            // Save mentor
            var mentor =  new Mentor(userData);
            mentor.save(function(err){
              if(err) console.error("Error saving mentor", err);
            });
            // Link mentor to user
            newUser.mentor = mentor._id;
          }else{
            // Save mentee
            var mentee =  new Mentee(userData);
            mentee.save(function(err){
              if(err) console.error("Error saving mentee", err);
            });
            // Link mentee to user
            newUser.mentee = mentee._id;
          }
          // Save user
          newUser.save(function(err) {
            if (err) throw err;
            return done(null, newUser);
          });
        }
      });
    });
  }));

};