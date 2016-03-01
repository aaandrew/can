var mongoose = require('mongoose');
var Q = require('q');

// define the schema for appointment model
var AppointmentSchema = mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  mentee: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Mentee',
    required: true
  },
  mentor: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Mentor',
    required: true
  },
  hangout: {
    type: String,
    default: "https://hangouts.google.com"
  }
});

// Finds and returns mentor object
AppointmentSchema.statics.findAppointments = function(data) {
  var deferred = Q.defer();

  this
  .find(data)
  .populate('mentor')
  .populate('mentee')
  .exec(function(err, appointments){
    if(err || !appointments){
      console.error("Login: Unable to find appointments", err);
      deferred.reject(err);
    }else{
      deferred.resolve(appointments);
    }
  });

  return deferred.promise;
};

module.exports = mongoose.model('Appointment', AppointmentSchema);