var http = require('http');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars');
var dotenv = require('dotenv');
var mongoose = require('mongoose');

var app = express();

// Load environment variables
dotenv.load();

// Configuration
app.engine('handlebars', handlebars({defaultLayout: 'layout'}));
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.set('port', process.env.PORT || 3000);

//connect to database
mongoose.connect(process.env.MONGOLAB_URI);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log("Database connected succesfully.");
});

// Load routes
require('./app/routes/routes')(app);
require('./app/routes/login')(app);
require('./app/routes/mentor')(app);
require('./app/routes/mentee')(app);

/*
var ucsd = require('./app/routes/ucsd');
app.get('./views/ucsd', ucsd.view);
var about = require('./app/routes/about');
app.get('./views/about', about.view);
var faq = require('./app/routes/faq');
app.get('./views/faq', faq.view);
var contactus = require('./app/routes/contactus');
app.get('.views/contactus', contactus.view);
var stanford = require('./app/routes/stanford');
app.get('./views/stanford', stanford.view);
var harvard = require('./app/routes/harvard');
app.get('./views/harvard', harvard.view);
var appointments = require('./app/routes/appointments');
app.get('./views/appointments', appointments.view);

*/

var json = require('./data.json');
app.get('/', function(req,res){
	res.json(json);
});


app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
