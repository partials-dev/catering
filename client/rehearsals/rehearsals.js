//Lazy List

var cooks = ['thomas', 'ian', 'jeff', 'adriana', 'dane'];

var prepend = function(name) {
  cooks.unshift(name);
};

var getAt = function(i) {
  ensureIndexExists(i);
  return cooks[i];
};

var cooked = function(name) {
  generateNextCook();
  cooks.shift();
};

var setAt = function(i, name) {
  ensureIndexExists(i);
  cooks[i] = name;
};

var ensureIndexExists = function(i) {
  var lastIndex = array.length - 1;
  while(i > lastIndex) {
    generateNextCook();
  }
};

var generateNextCook = function() {
  var lastIndex = array.length - 1;
  var lastCook = cooks[lastIndex];
  return whoFollows(lastCook);
};

var whoFollows = function(name) {
  var followers = {
    'thomas': 'ian',
    'ian': 'jeff',
    'jeff': 'adriana',
    'adriana': 'dane',
    'dane': 'thomas'
  };
  return followers[name];
};

Template.body.helpers({
  rehearsals: function() {
    return Rehearsals.find({}).fetch().sort(compareStartTime).map(formatDate);
  },
});

Template.rehearsal.helpers({
  swap: function(i1, i2) {
    var firstPerson = getAt(i1);
    var secondPerson = getAt(i2);
    setAt(i1, secondPerson);
    setAt(i2, firstPerson);
  },
  cookData: function() {
    var index = this.index;
    var name = cooks[index];
    var cookData = {name: name, index: this.index};
    return cookData;
  }
});

var formatDate = function(rehearsal, index) {
  var start = moment(rehearsal.start.dateTime);
  var date = start.format('MMM Do'); 
  var weekDay = start.format('dddd');
  console.log(JSON.stringify(start));
  return {date: date, weekDay: weekDay, index: index};
};

var compareStartTime = function(a, b) { //sorts calendar events by date
  var isBefore =  moment(a.start.dateTime).isBefore(b.start.dateTime);
  
  if (isBefore)
    return -1;
  if (!isBefore)
    return 1;
  return 0;
};

Template.rehearsal.events({
  "click .swap-button": function(event, template) {
    console.log("swap button clicked:" + this.index);
  }
});
