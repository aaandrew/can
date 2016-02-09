exports.view = function (app) {
	app.get('/', function(req, res){
		var harvard = req.params.harvard;
		res.render('harvard');
	});
};