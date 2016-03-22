window.CANNONICAL_COOKS = ['thomas', 'ian', 'jeff', 'adriana', 'dane'];



var prepend = function(name) {
    var cooks = readCooks();
    cooks.unshift(name);
    writeCooks(cooks); 
};

var getAt = function(i) {
  var cooks = readCooks();
  ensureIndexExists(i);
  return cooks[i];
};

var cooked = function(name) {
  var cooks = readCooks();
  generateNextCook();
  cooks.shift();
  writeCooks(cooks); 
};

var setAt = function(i, name) {
  var cooks = readCooks();
  ensureIndexExists(i);
  cooks[i] = name;
  writeCooks(cooks); 
};

var deleteAt = function(index) {
  var cooks = readCooks();
  cooks.splice(index, 1);
  writeCooks(cooks);
  generateNextCook();
}

var insertAt = function(index, name){
  var cooks = readCooks();
  cooks.splice(index, 0, name);
  writeCooks(cooks);
};

var swap = function(i1, i2) {
  var firstPerson = getAt(i1);
  var secondPerson = getAt(i2);
  setAt(i1, secondPerson);
  setAt(i2, firstPerson);
};

var ensureIndexExists = function(i) {
  var cooks = readCooks();
  var lastIndex = cooks.length - 1;
  while(i > lastIndex) {
    generateNextCook();
    cooks = readCooks();
    lastIndex = cooks.length - 1;
  }
};

var generateNextCook = function() {
  var cooks = readCooks();
  var lastIndex = cooks.length - 1;
  var lastCook = cooks[lastIndex];
  cooks.push(whoFollows(lastCook));
  writeCooks(cooks); 
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

var readCooks = function() {
  var doc = Cooks.findOne({});
  if (!doc) {
    writeCooks(window.CANNONICAL_COOKS);
    doc = Cooks.findOne({});
  }
  return doc.value;
};

var writeCooks = function(cooks) {
  Meteor.call("clearCooks");
  var doc = {value: cooks};
  Cooks.insert(doc);
};

//Public Interface

window.cookList = {
  prepend: prepend,
  getAt: getAt,
  cooked: cooked,
  setAt: setAt,
  deleteAt: deleteAt,
  insertAt: insertAt,
  swap: swap,
  generateNextCook: generateNextCook,
  readCooks: readCooks
};
