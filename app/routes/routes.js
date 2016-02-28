var data = require("../../data.json");
var browseData = require("../data/browse.json");
var dashboardData = require("../data/dashboard_data.json");
var studentData = require("../data/student.json");
var collegepageData = require("../data/collegepage.json");

var Mentor = require('../models/mentor');

var generator = require('./generator');

// Function used to merge json objects
var extend = require('util')._extend;

module.exports = function (app, passport) {
	app.get('/', function(req, res){
		res.render('index', data);
	});

	app.get('/index_2', function(req, res){
		res.render('index_2', data);
	});

	app.get('/browse', function(req, res){
		res.render('browse', browseData);
	});

	app.get('/collegepage', function(req, res){
		// Get collegepage info from data
		var college = collegepageData[req.query.name];
		// Get mentors
		college.mentors = data.ucsdstudents2;

		Mentor.find({college: req.query.name}, function(err, mentors){
			if(err){
				res.redirect('/');
				res.end();
			}else{
				college.mentors = college.mentors.concat(mentors);
				// Set college name
				college.college_name = generator.getCollegeName(college.mentors[0].college);
				console.log("aaaaa", mentors);
				res.render('collegepage', college);
			}
		});
	});

	app.get('/ucsd', function(req,res){
		res.render('ucsd', data);
	});

	app.get('/ucsd_2', function(req,res){
		res.render('ucsd_2', data);
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
		Mentor.findMentor({_id: req.query.mentor})
		.then(function(mentor){
			// Set college full name
			var data = mentor.toJSON();
			data.college_name = generator.getCollegeName(data.college);
			res.render('studentpage', data);
		});
	});

	function isLoggedIn(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.redirect('/login');
    }
  }
};
