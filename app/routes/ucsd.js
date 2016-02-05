exports.view = function (app) {
	app.get('/', function(req, res){
		var student = req.params.student;
		res.render('student');
	});
};