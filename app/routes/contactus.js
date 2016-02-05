exports.view = function (app) {
	app.get('/', function(req, res){
		var contactus = req.params.contactus;
		res.render('contactus');
	});
};