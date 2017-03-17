import Cooks from './collections/cooks';
import Actions from './collections/actions';

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

function logAction (type, name, i, previousCook, isUndo) {
  const isLoggedInClient = Meteor.isClient && Meteor.user()
  const canSaveChanges = isLoggedInClient || Meteor.isServer
  if (canSaveChanges && !isUndo){
    Actions.insert({
      type: type,
      name: name,
      index: i,
      previousCook: previousCook,
      createdAt: new Date()
    });
  }
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
    name = cooks[0]
    cooks.shift();
    this.writeCooks(cooks);
    logAction('cooked', name, 0);
  }

  setAt(i, name, isSwap, isUndo) {
    var cooks = this.readCooks();
    this.ensureIndexExists(i);
    var previousCook = cooks[i];
    cooks[i] = name;
    this.writeCooks(cooks);
    if (!isSwap) {
      logAction('set', name, i, previousCook, isUndo);
    }
  }

  deleteAt(index, isUndo) {
    this.generateNextCook();
    var cooks = this.readCooks();
    logAction('delete', cooks[index], index, null, isUndo);
    cooks.splice(index, 1);
    this.writeCooks(cooks);
  }

  insertAt(index, name, isUndo){
    var cooks = this.readCooks();
    cooks.splice(index, 0, name);
    this.writeCooks(cooks);
    logAction('insert', name, index, null, isUndo);
  }

  swap(i1, i2, isUndo) {
    var firstPerson = this.getAt(i1);
    var secondPerson = this.getAt(i2);
    this.setAt(i1, secondPerson, true);
    this.setAt(i2, firstPerson, true);
    logAction('swap', [firstPerson, secondPerson], [i1, i2], null, isUndo);
  }

  undoAction(action) {
    switch (action.type) {
      case 'cooked':
      this.setAt(0, action.name, false, true);
      break;
      case 'set':
      this.setAt(action.index, action.previousCook, false, true);
      break;
      case 'delete':
      this.insertAt(action.index, action.name, true);
      break;
      case 'insert':
      this.deleteAt(action.index, true);
      break;
      case 'swap':
      this.swap(action.index[0], action.index[1], true);
      break;
    }
    Actions.remove(action._id);
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
