var mongoose = require('mongoose');
var Q = require('q');

var MentorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  college: {
    type: String
  },
  background: {
    type: String
  },
  help: {
    type: String
  },
  interests: {
    type: String
  },
  year: {
    type: String
  },
  major: {
    type: String
  },
  image: {
    type: String
  },
  appointments: {
    type: Number,
    default: 0
  }
});


// Finds and returns mentor object
MentorSchema.statics.findMentor = function(data) {
  var deferred = Q.defer();

  this.findOne(data, function(err, mentor){
    if(err || !mentor){
      console.error("Login: Unable to find mentor", err);
      deferred.reject(err);
    }else{
      deferred.resolve(mentor);
    }
  });

  return deferred.promise;
};

module.exports = mongoose.model('Mentor', MentorSchema);
