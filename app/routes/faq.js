exports.view = function (app) {
	app.get('/', function(req, res){
		var faq = req.params.faq;
		res.render('faq');
	});
};