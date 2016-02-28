var mongoose = require('mongoose');


// define the schema for appointment model
var appointmentSchema = mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  mentee: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Mentee'
    required: true
  },
    mentor: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Mentor'
  }
});


module.exports = mongoose.model('Mentee', appointmentSchema);