var data = require("../../data.json");
var browseData = require("../data/browse.json");
var dashboardData = require("../data/dashboard_data.json");
var studentData = require("../data/student.json");

module.exports = function (app) {
	app.get('/', function(req, res){
		res.render('index', data);
	});

	app.get('/browse', function(req, res){
		res.render('browse', browseData);
	});

	app.get('/ucsd', function(req,res){
		res.render('ucsd', data);
	});

	app.get('/about', function(req,res){
		res.render('about', data);
	});

	app.get('/faq', function(req,res){
		res.render('faq', data);
	});

	app.get('/contactus', function(req,res){
		res.render('contactus', data);
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


	app.get('/login', function(req, res) {
		res.render('login', data)
	});

	app.get('/dashboard', function(req, res){
		res.render('dashboard', dashboardData);
	});

	app.get('/create_mentee', function(req, res){
		res.render('create_account_mentee');
	});

	app.get('/create_mentee_login', function(req, res){
		res.render('create_mentee_login');
	});

	app.get('/create_mentor', function(req, res){
		res.render('create_account_mentor');
	});

	app.get('/create_mentor_login', function(req, res){
		res.render('create_mentor_login');
	});

	app.get('/create_account_from_login', function(req, res){
		res.render('create_account_from_login');
	});


	app.get('/index', function(req, res){
		res.render('index');
	});

	app.get('/editmenteeacc',function(req,res){
		res.render('editmenteeacc');
	});

	app.get('/editmentoracc',function(req,res){
		res.render('editmentoracc');
	});
};
