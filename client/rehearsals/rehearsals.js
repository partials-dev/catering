//Lazy List

Session.set('cooks', ['thomas', 'ian', 'jeff', 'adriana', 'dane']);

var prepend = function(name) {
    var cooks = Session.get('cooks');
    cooks.unshift(name);
    Session.set('cooks', cooks); 
};

var getAt = function(i) {
  var cooks = Session.get('cooks');
  ensureIndexExists(i);
  return cooks[i];
};

var cooked = function(name) {
  var cooks = Session.get('cooks');
  generateNextCook();
  cooks.shift();
  Session.set('cooks', cooks); 
};

var setAt = function(i, name) {
  var cooks = Session.get('cooks');
  ensureIndexExists(i);
  cooks[i] = name;
  Session.set('cooks', cooks); 
};

var swap = function(i1, i2) {
  var firstPerson = getAt(i1);
  var secondPerson = getAt(i2);
  setAt(i1, secondPerson);
  setAt(i2, firstPerson);
};

var ensureIndexExists = function(i) {
  var cooks = Session.get('cooks');
  var lastIndex = cooks.length - 1;
  while(i > lastIndex) {
    generateNextCook();
    cooks = Session.get('cooks');
    lastIndex = cooks.length - 1;
  }
};

var generateNextCook = function() {
  var cooks = Session.get('cooks');
  var lastIndex = array.length - 1;
  var lastCook = cooks[lastIndex];
  cooks.push(whoFollows(lastCook));
  Session.set('cooks', cooks); 
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


Template.rehearsal.helpers({
  cookData: function() {
    var cooks = Session.get('cooks');
    var index = this.index;
    var name = cooks[index];
    var cookData = {name: name, index: this.index, className: 'card-bubble'};
    return cookData;
  },
  getSelectedClass: function(index) {
    if (Session.get("swap-button-selected-" + index)) {
      return "mdl-button--colored";
    } else {
      return "";
    }
  }
});

var previouslyChecked = null;
Template.rehearsal.events({
  "click .swap-button": function(event, template) {
    if (previouslyChecked) {
      Session.set("swap-button-selected-" + previouslyChecked.index, false)
      swap(this.index, previouslyChecked.index);
      previouslyChecked = null;
    } else {
      previouslyChecked = this;
      Session.set("swap-button-selected-" + this.index, true)
    }
  }
});

