import CookList from '../lib/cooks-list'
import {CANNONICAL_COOKS} from '../lib/cooks-list'
import upcomingRehearsals from './upcoming-rehearsals'

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
  constructor () {
    super()
    Tracker.autorun(() => {
      const rehearsals = upcomingRehearsals()
      var cooks = Session.get('cooks');
      if (!cooks || !rehearsals) { return }
      if (cooks.length < rehearsals.length) {
        this.ensureIndexExists(rehearsals.length - 1)
      }
    })
    this.showingSnackbar = false
  }

  readCooks () {
    var cooks;
    if (Meteor.user()) {
      cooks = super.readCooks();
    } else {
      var cooks = Session.get('cooks');
      if (!cooks) {
        cooks = super.readCooks();
      }
      //if (!cooks) {
        //Session.set('cooks', CANNONICAL_COOKS)
        //cooks = Session.get('cooks')
      //}
    }
    return cooks;
  }

  writeCooks (cooks) {
    if (Meteor.user()) {
      return super.writeCooks(cooks);
    } else {
      Session.set('cooks', cooks); 
      this.warnChangesNotSaved();
    }
  }

  warnChangesNotSaved () {
    var snackbarContainer = document.querySelector('#catering-snackbar'); 
    var data = {
      message: "You're not logged in. Changes won't be saved to the server.",
      timeout: 2000
    };

    if (!this.showingSnackbar) {
      snackbarContainer.MaterialSnackbar.showSnackbar(data);
      this.showingSnackbar = true
      window.setTimeout( () => {this.showingSnackbar = false;}, 2000);
    }
  }
}
