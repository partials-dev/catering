import dialogPolyfill from '../dialog-polyfill/dialog-polyfill'

var showActivityLogModal = new ReactiveVar(false)
Template.registerHelper('showActivityLogModal', function () { return showActivityLogModal.get() })

Template.activityLogLink.helpers({
})

Template.activityLogLink.events({
  'click .toggle-activity-log-link': function (event, template) {
    var dialog = $('.activity-log-modal')[0]
    if (!dialog.showModal) {
      dialogPolyfill.registerDialog(dialog)
    }
    dialog.showModal()
  }
})
