import moment from 'moment'
import CookList from '../session-cooks-list'
import Actions from '../../lib/collections/actions'

const cookList = new CookList()

function capitalize (word) {
  if (word) {
    return word.charAt(0).toUpperCase() + word.slice(1)
  }
}

function snackbarMessage (data) {
  var snackbarContainer = document.querySelector('#catering-snackbar')
  snackbarContainer.MaterialSnackbar.showSnackbar(data)
}

Template.activityLog.helpers({
  logEntries: function () {
    return Actions.find({}, { sort: { createdAt: -1 } })
  }
})

Template.logEntry.helpers({
  getTime: function (createdAt) {
    var date = moment(createdAt).calendar(moment(), {
      sameDay: '[Today]',
      nextDay: '[Tomorrow]',
      nextWeek: 'dddd',
      lastDay: '[Yesterday]',
      lastWeek: '[Last] dddd',
      sameElse: 'DD/MM/YYYY'
    })
    return date
  },
  generateActionText: function (type, name, index) {
    switch (type) {
      case 'cooked':
        return capitalize(name) + ' cooked for rehearsal.'
      case 'set':
        return capitalize(name) + ' set at index: ' + index
      case 'delete':
        return capitalize(name) + ' deleted from index: ' + index
      case 'insert':
        return capitalize(name) + ' inserted at index: ' + index
      case 'swap':
        return `${capitalize(name[0])} (${index[0]}) swapped with ${capitalize(name[1])} (${index[1]})`
    }
  }
})

Template.activityLog.events({
  'click .close-activity-log-modal': function (event, template) {
    var dialog = $('.activity-log-modal')[0]
    dialog.close()
  },
  'click .undo-action-button': function (event, template) {
    var lastAction = Actions.find().fetch().slice(-1)[0]
    var snackbarData = { timeout: 2000 }
    if (lastAction) {
      cookList.undoAction(lastAction)
      snackbarData.message = `${capitalize(lastAction.type)} undone.`
      snackbarMessage(snackbarData)
    } else {
      snackbarData.message = 'No recent activity found.'
      snackbarMessage(snackbarData)
    }
  }
})

Tracker.autorun(function () {
  if (Meteor.user()) {
    var dialog = $('.activity-log-modal')[0]
    if (dialog.attributes.open) {
      dialog.close()
    }
  }
})
