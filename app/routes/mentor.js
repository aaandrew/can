var querystring = require('querystring');

var Mentor = require('../models/mentor');

module.exports = function (app) {
  app.get('/create/mentor', function(req, res){
    res.render('create_mentor_login');
  });  

  app.get('/edit/mentor', function(req, res){
    console.log("yas", req.query);
    res.render('edit_mentor', req.query);
  });

  app.post('/create/mentor', function(req, res){
    // Create mentor
    var mentor =  new Mentor(req.body);
    mentor.save(function(err){
      if(err) console.error("Error saving mentor", err);
    });

    // Redirect to edit page with passed in param body
    var editMentorUrl = '/edit/mentor?' + querystring.stringify(req.body); 
    res.redirect(editMentorUrl);
    res.end();
  });

};