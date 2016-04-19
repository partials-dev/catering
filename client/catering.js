import moment from 'moment';

Template.body.helpers({
  rehearsals: function() {
    return Rehearsals.find().fetch().filter(futureRehearsals).sort(compareStartTime).map(formatDate);
  }
});

var compareStartTime = function(a, b) { //sorts calendar events by date
  var isBefore =  moment(a.start.dateTime).isBefore(b.start.dateTime);
  if (isBefore)
    return -1;
  if (!isBefore)
    return 1;
  return 0;
};

var formatDate = function(rehearsal, index) {
  var start = moment(rehearsal.start.dateTime);
  var date = start.format('MMM Do'); 
  var weekDay = start.format('dddd');
  return {date: date, weekDay: weekDay, index: index};
};

function futureRehearsals(rehearsal) {
  const now = moment();
  return moment(rehearsal.start.dateTime).isAfter(now);
}
