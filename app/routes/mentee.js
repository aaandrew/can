module.exports = function (app) {
  app.get('/create/mentee', function(req, res){
    res.render('create_mentee_login');
  });

  app.get('/edit/mentee', function(req, res){
    res.render('edit_mentee');
  });

};