export const CANNONICAL_COOKS = ['thomas', 'ian', 'jeff', 'adriana', 'dane'];

export function prepend(name) {
    var cooks = readCooks();
    cooks.unshift(name);
    writeCooks(cooks); 
};

export function getAt(i) {
  var cooks = readCooks();
  ensureIndexExists(i);
  return cooks[i];
};

export function cooked() {
  generateNextCook();
  var cooks = readCooks();
  cooks.shift();
  writeCooks(cooks); 
};

export function setAt(i, name) {
  var cooks = readCooks();
  ensureIndexExists(i);
  cooks[i] = name;
  writeCooks(cooks); 
};

export function deleteAt(index) {
  //console.log(`Deleting at ${index}`)
  generateNextCook();
  var cooks = readCooks();
  //console.log(`Cooks: ${JSON.stringify(cooks)}`)
  cooks.splice(index, 1);
  //console.log(`Cooks: ${JSON.stringify(cooks)}`)
  writeCooks(cooks);
  //console.log(`Cooks: ${JSON.stringify(readCooks())}`)
}

export function insertAt(index, name){
  var cooks = readCooks();
  cooks.splice(index, 0, name);
  writeCooks(cooks);
};

export function swap(i1, i2) {
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

export function generateNextCook() {
  var cooks = readCooks();
  var lastIndex = cooks.length - 1;
  var lastCook = cooks[lastIndex];
  cooks.push(whoFollows(lastCook));
  writeCooks(cooks); 
};

var followers = {
  'thomas': 'ian',
  'ian': 'jeff',
  'jeff': 'adriana',
  'adriana': 'dane',
  'dane': 'thomas'
};

export function whoFollows(name) {
  return followers[name];
};

export function readCooks() {
  var doc = Cooks.findOne({});
  if (!doc) {
    writeCooks(CANNONICAL_COOKS);
    doc = Cooks.findOne({});
  }
  return doc.value;
};

export function writeCooks(cooks) {
  Meteor.call("clearCooks");
  var doc = {value: cooks};
  Cooks.insert(doc);
};
