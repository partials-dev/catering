import * as cooks from '../lib/cooks-list'

const originalReadCooks = cooks.readCooks.bind(cooks);
const originalWriteCooks = cooks.writeCooks.bind(cooks);
Session.set('cooks', originalReadCooks());

cooks.readCooks = function () {
  if (Meteor.user()) {
    return originalWriteCooks();
  } else {
    return Session.get('cooks');
  }
}

cooks.writeCooks = function () {
  if (Meteor.user()) {
    return originalWriteCooks();
  } else {
    Session.set('cooks', cooks); 
  }
}
