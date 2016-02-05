exports.view = function (app) {
	app.get('/', function(req, res){
		var about = req.params.about;
		res.render('about');
	});
};