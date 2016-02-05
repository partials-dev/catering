Template.body.helpers({
  rehearsals: function() {
    return Rehearsals.find({}).fetch().sort(compareStartTime).map(formatDate);
  }
});

var formatDate = function(rehearsal) {
  var startTime = moment(rehearsal.start.dateTime).format('ddd MMM Do'); 
  return {startTime: startTime};
};

var compareStartTime = function(a, b) {
  var isBefore =  moment(a.start.dateTime).isBefore(b.start.dateTime);
  
  if (isBefore)
    return -1;
  if (!isBefore)
    return 1;
  return 0;
};
