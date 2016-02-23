exports.view = function (app, passport) {
	app.get('/', function(req, res){
		var appointments = req.params.appointments;
		res.render('appointments');
	});

  // route middleware to make sure a user is logged in
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
      return next();
    res.redirect('/');
  }

};
