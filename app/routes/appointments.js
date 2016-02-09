exports.view = function (app) {
	app.get('/', function(req, res){
		var appointments = req.params.appointments;
		res.render('appointments');
	});
};
