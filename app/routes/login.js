exports.view = function (app) {
	app.get('/', function(req, res){
		var login = req.params.login;
		res.render('login');
	});
};