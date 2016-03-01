var querystring = require('querystring');
var moment = require('moment');

var data = require("../../data.json");
var browseData = require("../data/browse.json");
var dashboardData = require("../data/dashboard_data.json");
var studentData = require("../data/student.json");
var collegepageData = require("../data/collegepage.json");

var Mentor = require('../models/mentor');
var Appointment = require('../models/appointment');

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
		college.mentors = [];

		Mentor.find({college: req.query.name}, function(err, mentors){
			if(err){
				res.redirect('/');
				res.end();
			}else{
				college.mentors = college.mentors.concat(mentors);
				// Set college name
				college.college_name = generator.getCollegeName(req.query.name);
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
		res.render('done', req.query);
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
		if(req.user && req.user.mentor){
			// Load appointments for mentors
			Appointment.findAppointments({mentor: req.user.mentor})
			.then(function(appointments){
				var apts = { appointments: mapMentorAppointments(appointments) };
				res.render('dashboard', extend(data, apts));
			});
		}else if(req.user && req.user.mentee){
			// Load appointments for mentees
			Appointment.findAppointments({mentee: req.user.mentee})
			.then(function(appointments){
				var apts = { appointments: mapMenteeAppointments(appointments) };
				res.render('dashboard', extend(data, apts));
			});
		}else{
			// Redirect home if something weird happens
			res.redirect('/');
		}
	});

	app.get('/create_account_from_login', function(req, res){
		res.render('create_account_from_login');
	});

	app.get('/login_2', function(req, res){
		res.render('login_2');
	});


	app.get('/studentpage', isLoggedIn, function(req, res){
		var userData = setMentorOrMentee(req);
		userData.message = req.flash('studentpage-message');
		Mentor.findMentor({_id: req.query.mentor})
		.then(function(mentor){
			// Set college full name
			var data = mentor.toJSON();
			data.college_name = generator.getCollegeName(data.college);
			res.render('studentpage', extend(userData, data));
		});
	});

	app.post('/studentpage', isLoggedIn, function(req, res){
		
		// Check if user is a mentor, if so redirect them back
		if(req.user && !req.user.mentee) {
			req.flash('studentpage-message', 'You must be logged in as a Mentee to create an appointment');
			res.redirect('back');
			return;
		}

		// Create appointment
		var appointment = new Appointment();
		appointment.date = req.body.day;
		appointment.time = req.body.radios;
		appointment.mentor = req.body.mentor;
		appointment.mentee = req.user.mentee;
		appointment.save(function(err){
			if(err) console.log("Error saving appointment: ", err);
		});

		var doneData = {
			date: req.body.day,
			time: req.body.radios
		};

		// redirect to done page with query parameters
		res.redirect('/done?' + querystring.stringify(doneData));
		res.end();
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

  // Returns new array of appointments to be properly displayed in handlebars
  // For mentors
	function mapMentorAppointments (appointments) {
		var result = [];
		var curYear = moment().year();

		for(var i=0; i<appointments.length; i++){
			var apt = {};
			// Set date
			var dateString = moment(appointments[i].date + "/" + curYear, "MM-DD-YYYY");
			apt.day = moment(dateString).format("dddd, MMMM Do YYYY");
			apt.time = appointments[i].time;
			apt.name = appointments[i].mentee.name;
			apt.college = appointments[i].mentee.location;
			apt.image = appointments[i].mentee.image;
			apt.hangout = appointments[i].hangout;
			result.push(apt);
		}

		return result;
	}

	// Returns new array of appointments to be properly displayed in handlebars
	// For mentees
	function mapMenteeAppointments (appointments) {
		var result = [];
		var curYear = moment().year();

		for(var i=0; i<appointments.length; i++){
			var apt = {};
			// Set date
			var dateString = moment(appointments[i].date + "/" + curYear, "MM-DD-YYYY");
			apt.day = moment(dateString).format("dddd, MMMM Do YYYY");
			apt.time = appointments[i].time;
			apt.name = appointments[i].mentor.name;
			apt.college = generator.getCollegeName(appointments[i].mentor.college);
			apt.image = appointments[i].mentor.image;
			apt.hangout = appointments[i].hangout;
			apt.link = "/studentpage?" + querystring.stringify({mentor: appointments[i].mentor._id + ""});
			result.push(apt);
		}

		return result;
	}

};
