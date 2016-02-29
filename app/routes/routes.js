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
		var userData = setMentorOrMentee(req);
		res.render('index', extend(userData, data));
	});

	app.get('/index_2', function(req, res){
		var userData = setMentorOrMentee(req);
		res.render('index_2', extend(userData, data));
	});

	app.get('/browse', function(req, res){
		var userData = setMentorOrMentee(req);

		// This code just calculates the number of mentors for each
		// college in the database and maps them to the browseData
		var reps = {
			'ucsd': 0,
			'stanford': 0,
			'harvard': 0
		};
		Mentor.find({}, function(err, mentors){
			if(!err) console.log("Browse: Error finding mentors: ", err);

			// Calculate all representatives
			for(var i=0; i<mentors.length; i++){
				if(mentors[i].college)
					reps[mentors[i].college] += 1;
			}

			// Inject that to browseData
			var colleges = browseData['browse'];
			for(var i=0; i<colleges.length; i++){
				colleges[i].representatives = reps[colleges[i].short_name];
			}
			res.render('browse', extend(userData, browseData));
		});
	});

	app.get('/collegepage', function(req, res){
		var userData = setMentorOrMentee(req);
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
				res.render('collegepage', extend(userData, college));
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

	app.get('/studentbio', function(req,res){
		res.render('studentbio', data);
	});

	app.get('/dashboard', isLoggedIn, function(req, res){
		var data = setMentorOrMentee(req);
		res.render('dashboard', extend(data, dashboardData));
	});

	app.get('/create_account_from_login', function(req, res){
		res.render('create_account_from_login');
	});

	app.get('/login_2', function(req, res){
		res.render('login_2');
	});

	app.get('/studentpage', function(req, res){
		var userData = setMentorOrMentee(req);
		Mentor.findMentor({_id: req.query.mentor})
		.then(function(mentor){
			// Set college full name
			var data = mentor.toJSON();
			data.college_name = generator.getCollegeName(data.college);
			res.render('studentpage', extend(userData,data));
		});
	});

	function isLoggedIn(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.redirect('/login');
    }
  }

  function setMentorOrMentee(req){
		var data = {};
		if(req.user && req.user.mentor) data.mentor = true;
		else if(req.user && req.user.mentee) data.mentee = true;
		return data;
  }

};
