exports.view = function (app) {
	app.get('/', function(req, res){
		var create_mentee_login = req.params.student;
		res.render('create_mentee_login');
	});
};