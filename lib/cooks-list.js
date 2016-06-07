import Cooks from './collections/cooks';

// DON'T FORGET TO REFRESH THE COOKS COLLECTION IF YOU MAKE CHANGES!
export const CANNONICAL_COOKS = ['thomas', 'ian', 'alex', 'jeff', 'adriana', 'dane'];

const cooksDep = new Tracker.Dependency;

function generateFollowers () {
  var followers = {}  
  for (var i = 0; i < CANNONICAL_COOKS.length; i++) {
    var thisCook = CANNONICAL_COOKS[i];
    var nextCook = null
    if (CANNONICAL_COOKS[i + 1]){
      nextCook = CANNONICAL_COOKS[i + 1];
    } else {
      nextCook = CANNONICAL_COOKS[0]; 
    }
    followers[thisCook] = nextCook;
  }
  return followers;
}

var followers = generateFollowers();

export default class CooksList {
  constructor() {
    this.dependency = cooksDep;
  }

  prepend(name) {
    var cooks = this.readCooks();
    cooks.unshift(name);
    this.writeCooks(cooks);
  }

  getAt(i) {
    var cooks = this.readCooks();
    this.ensureIndexExists(i);
    return cooks[i];
  }

  cooked() {
    this.generateNextCook();
    var cooks = this.readCooks();
    cooks.shift();
    this.writeCooks(cooks);
  }

  setAt(i, name) {
    var cooks = this.readCooks();
    this.ensureIndexExists(i);
    cooks[i] = name;
    this.writeCooks(cooks);
  }

  deleteAt(index) {
    this.generateNextCook();
    var cooks = this.readCooks();
    cooks.splice(index, 1);
    this.writeCooks(cooks);
  }

  insertAt(index, name){
    var cooks = this.readCooks();
    cooks.splice(index, 0, name);
    this.writeCooks(cooks);
  }

  swap(i1, i2) {
    var firstPerson = this.getAt(i1);
    var secondPerson = this.getAt(i2);
    this.setAt(i1, secondPerson);
    this.setAt(i2, firstPerson);
  }

  ensureIndexExists(i) {
    var cooks = this.readCooks();
    var lastIndex = cooks.length - 1;
    while(i > lastIndex) {
      this.generateNextCook();
      cooks = this.readCooks();
      lastIndex = cooks.length - 1;
    }
  }

  generateNextCook() {
    var cooks = this.readCooks();
    var lastIndex = cooks.length - 1;
    var lastCook = cooks[lastIndex];
    const nextCook = this.whoFollows(lastCook)
    cooks.push(nextCook);
    this.writeCooks(cooks);
  }

  whoFollows(name) {
    return followers[name];
  }

  readCooks() {
    cooksDep.depend();
    this.checkCooks();
    var doc = Cooks.findOne({});
    if (doc) {
      return doc.value;
    }
  }

  checkCooks() {
    if (Meteor.isServer) {
      const docs = Cooks.find({}).fetch();
      if(docs.length > 1) {
        throw new Error(`Found more than one cooks document in the cooks collection: ${JSON.stringify(docs)}`);
      } else if (docs.length === 0) {
        throw new Error('No documents in Cooks collection.');
      } else if (docs[0] && !docs[0].value) {
        throw new Error('Document is missing value property');
      }
    }
  }

  writeCooks(cooks) {
    this.checkCooks();
    var doc = Cooks.findOne({});
    if (doc) {
      Cooks.update(doc._id, {$set: {value: cooks}});
    } else {
      console.log('Inserting cooks')
      Cooks.insert({value: cooks})
    }
    cooksDep.changed();
  }

  count() {
    return this.readCooks().length;
  }
}
