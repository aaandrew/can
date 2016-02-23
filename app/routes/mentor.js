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
    // Grab user from session
    var user = {
      name: req.user.name,
      email: req.user.email
    };
    res.render('edit_mentor', user);
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