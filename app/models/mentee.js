var mongoose = require('mongoose');

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
  location: {
    type: String
  },
  bio: {
    type: String
  }
});

module.exports = mongoose.model('Mentee', MenteeSchema);
