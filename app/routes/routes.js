var data = require("../../data.json");
var browseData = require("../data/browse.json");
var dashboardData = require("../data/dashboard_data.json");
var studentData = require("../data/student.json");

// Function used to merge json objects
var extend = require('util')._extend;

module.exports = function (app, passport) {
	app.get('/', function(req, res){
		res.render('index', data);
	});

	app.get('/browse', function(req, res){
		res.render('browse', browseData);
	});

	app.get('/ucsd', function(req,res){
		res.render('ucsd', data);
	});

	app.get('/student', function(req, res){
		res.render('student', studentData);
	});

	app.get('/done', function(req, res){
		res.render('done', data);
	});

	app.get('/stanford', function(req, res){
		res.render('stanford', data);
	});

	app.get('/harvard', function(req, res){
		res.render('harvard', data);
	});

	app.get('/appointments', function(req,res){
		res.render('appointments', data);

	});

	app.get('/studentbio', function(req,res){
		res.render('studentbio', data);
	});

	app.get('/dashboard', isLoggedIn, function(req, res){
		var data = {};
		if(req.user.mentor) data.mentor = true;
		else if(req.user.mentee) data.mentee = true;
		res.render('dashboard', extend(data, dashboardData));
	});

	app.get('/create_account_from_login', function(req, res){
		res.render('create_account_from_login');
	});

	app.get('/studentpage', function(req, res){
		res.render('studentpage');
	});

	function isLoggedIn(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.redirect('/login');
    }
  }
};
