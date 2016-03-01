var mongoose = require('mongoose');
var Q = require('q');

var MenteeSchema = new mongoose.Schema({
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
  image: {
    type: String
  },
  location: {
    type: String
  },
  interests: {
    type: String
  }
});

// Finds and returns mentor object
MenteeSchema.statics.findMentee = function(data) {
  var deferred = Q.defer();

  this.findOne(data, function(err, mentee){
    if(err || !mentee){
      console.error("Login: Unable to find mentee", err);
      deferred.reject(err);
    }else{
      deferred.resolve(mentee);
    }
  });

  return deferred.promise;
};

module.exports = mongoose.model('Mentee', MenteeSchema);
