exports.setMentorOrMentee = function (req) {
  var data = {};
  if(req.user && req.user.mentor) data.mentor = true;
  else if(req.user && req.user.mentee) data.mentee = true;
  return data;
};