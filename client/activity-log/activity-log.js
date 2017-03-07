import Actions from '../../lib/collections/actions';
import moment from 'moment';
import CookList from '../session-cooks-list'

const cookList = new CookList();

function capitalize (word) {
  if (word){
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
}

var showingSnackbar = false;
function snackbarMessage (data) {
  var snackbarContainer = document.querySelector('#catering-snackbar');
  if (!this.showingSnackbar) {
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
    this.showingSnackbar = true
    window.setTimeout( () => {this.showingSnackbar = false;}, data.timeout);
  }
}

function undoAction (action) {
  if (action){
    switch (action.type) {
      case 'cooked':
        cookList.setAt(0, action.name, false, true);
        break;
      case 'set':
        cookList.setAt(action.index, action.previousCook, false, true);
        break;
      case 'delete':
        cookList.insertAt(action.index, action.name, true);
        break;
      case 'insert':
        cookList.deleteAt(action.index, true);
        break;
      case 'swap':
        cookList.swap(action.index[0], action.index[1], true);
        break;
    }
    console.log(`${capitalize(action.type)} undone.`);
    Actions.remove(action._id);

    var snackbarData = { message: `${capitalize(action.type)} undone.`, timeout: 2000 };
    snackbarMessage(snackbarData);

  } else {
    var snackbarData = { message: "No recent activity found.", timeout: 2000 };
    snackbarMessage(snackbarData);
  }
}

Template.activityLog.helpers({
  logEntries: function() {
    return Actions.find( {}, {sort: { createdAt : -1 } });
  }
})

Template.logEntry.helpers({
  getTime: function(createdAt) {
    date = moment(createdAt).calendar(moment(), {
      sameDay: '[Today]',
      nextDay: '[Tomorrow]',
      nextWeek: 'dddd',
      lastDay: '[Yesterday]',
      lastWeek: '[Last] dddd',
      sameElse: 'DD/MM/YYYY'
    });
    return date;
  },
  generateActionText: function(type, name, index){
    switch(type) {
      case 'cooked':
        return capitalize(name) + ' cooked for rehearsal.';
        break;
      case 'set':
        return capitalize(name) + ' set at index: ' + index;
        break;
      case 'delete':
        return capitalize(name) + ' deleted from index: ' + index;
        break;
      case 'insert':
        return capitalize(name) + ' inserted at index: ' + index;
        break;
      case 'swap':
        return `${capitalize(name[0])} (${index[0]}) swapped with ${capitalize(name[1])} (${index[1]})`;
        break;
    }
  }
})

Template.activityLog.events({
  'click .close-activity-log-modal': function(event, template) {
    var dialog = $('.activity-log-modal')[0];
    dialog.close();
  },
  'click .undo-action-button': function(event, template) {
    lastAction = Actions.find().fetch().slice(-1)[0];
    undoAction(lastAction);
  }
})


Tracker.autorun(function () {
  if (Meteor.user()) {
    var dialog = $('.activity-log-modal')[0];
    if (dialog.attributes.open) {
      dialog.close()
    }
  }
})
