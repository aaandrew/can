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
    // Grab user from session
    var user = {
      name: req.user.name,
      email: req.user.email
    };
    res.render('edit_mentee', user);
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