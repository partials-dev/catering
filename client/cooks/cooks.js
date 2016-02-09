//Lazy List

var cooks = ['thomas', 'ian', 'jeff', 'adriana', 'dane'];

var prepend = function(name) {
  cooks.unshift(name);
};

var swap = function(i1, i2) {
  var firstPerson = getAt(i1);
  var secondPerson = getAt(i2);
  setAt(i1, secondPerson);
  setAt(i2, firstPerson);
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

// Meteor Template

Template.cook.helpers({
  name: function() {
    var index = this.index;
    var cooks = ['thomas', 'ian', 'jeff', 'adriana', 'dane'];
    return cooks[index];
  },
  capitalize: function(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
});

// Debug functions

var debugSwapButton = function() {
  console.log("Swap button clicked");
};
