exports.view = function (app) {
	app.get('/', function(req, res){
		var stanford = req.params.stanford;
		res.render('stanford');
	});
};
