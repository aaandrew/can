module.exports = function (app) {
	app.get('/', function(req, res){
		res.render('index');
	});

	app.get('/browse', function(req, res){
		res.render('browse');
	});
};