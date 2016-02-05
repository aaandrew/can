var http = require('http');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars');

var app = express();


// Configuration
app.engine('handlebars', handlebars({defaultLayout: 'layout'}));
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.set('port', process.env.PORT || 3000);

// Load routes
require('./app/routes/routes')(app);
var ucsd = require('./app/routes/ucsd');
app.get('./views/ucsd', ucsd.view);
var about = require('./app/routes/about');
app.get('./views/about', about.view);
var faq = require('./app/routes/faq');
app.get('./views/faq', faq.view);
var contactus = require('./app/routes/contactus');
app.get('.views/contactus', contactus.view);

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});