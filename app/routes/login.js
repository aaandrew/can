module.exports = function (app, passport) {

  app.get('/login', function(req, res){
    res.render('login', {message: req.flash('login-message')});
  });

  app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/dashboard',
    failureRedirect : '/login',
    failureFlash : true
  }));

  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

};