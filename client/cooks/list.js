window.CANNONICAL_COOKS = ['thomas', 'ian', 'jeff', 'adriana', 'dane'];

Session.set('cooks', window.CANNONICAL_COOKS);

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

var deleteAt = function(index) {
  var cooks = Session.get('cooks');
  cooks.splice(index, 1);
  Session.set('cooks', cooks);
  generateNextCook();
}

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
  var lastIndex = cooks.length - 1;
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

//Public Interface

window.cookList = {
  prepend: prepend,
  getAt: getAt,
  cooked: cooked,
  setAt: setAt,
  deleteAt: deleteAt,
  swap: swap,
  generateNextCook: generateNextCook,
};
