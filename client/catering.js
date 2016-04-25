import moment from 'moment';

var allRehearsals = new ReactiveVar([]);
var cateredRehearsals = new ReactiveVar([]);

Template.body.helpers({
  rehearsals: function() {
    allRehearsals.set(Rehearsals.find().fetch().filter(futureRehearsals).sort(compareStartTime));
    return allRehearsals.get().map(formatData);
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

var formatData = function(rehearsal, index) {
  var start = moment(rehearsal.start.dateTime);
  var date = start.format('MMM Do'); 
  var weekDay = start.format('dddd');
  var description = rehearsal.description || "";
  var uncatered = description.match(/uncatered/i);

  return {date: date, weekDay: weekDay, index: index, isCatered: !uncatered};
};

function futureRehearsals(rehearsal) {
  const now = moment();
  return moment(rehearsal.start.dateTime).isAfter(now);
}
