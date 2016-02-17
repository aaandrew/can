exports.view = function (app) {
	app.get('/', function(req, res){
		var create_mentor_login = req.params.student;
		res.render('create_mentor_login');
	});
};
