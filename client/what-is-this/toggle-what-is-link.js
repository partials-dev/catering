import dialogPolyfill from '../dialog-polyfill/dialog-polyfill'

var showWhatIsModal = new ReactiveVar(false)
Template.registerHelper('showWhatIsModal', function () { return showWhatIsModal.get() })

Template.toggleWhatIsLink.helpers({
})

Template.toggleWhatIsLink.events({
  'click .toggle-what-is-link': function (event, template) {
    var dialog = $('.what-is-modal')[0]
    if (!dialog.showModal) {
      dialogPolyfill.registerDialog(dialog)
    }
    dialog.showModal()
  }
})
