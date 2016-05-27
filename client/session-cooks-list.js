import CookList from '../lib/cooks-list'
const cookList = new CookList()
Session.set('cooks', cookList.readCooks());

Tracker.autorun(function() {
  if(Meteor.user()) {
    cookList.dependency.changed()
  } else {
    cookList.dependency.changed()
  }
})

export default class SessionCooksList extends CookList {
  readCooks () {
    var cooks;
    if (Meteor.user()) {
      cooks = super.readCooks();
    } else {
      cooks = Session.get('cooks');
    }
    return cooks;
  }
  writeCooks (cooks) {
    if (Meteor.user()) {
      return super.writeCooks(cooks);
    } else {
      Session.set('cooks', cooks); 
    }
  }
}

